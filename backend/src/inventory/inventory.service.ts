import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { NotificationsService } from '../notifications/notifications.service';
import { MovementType, NotificationType } from '@prisma/client';

@Injectable()
export class InventoryService {
    private readonly logger = new Logger(InventoryService.name);

    constructor(
        private prisma: PrismaService,
        private auditLogs: AuditLogsService,
        private notificationsService: NotificationsService
    ) { }

    async adjustStock(orgId: string, userId: string, data: any) {
        // data: { productId, warehouseId, type (RETURN/DAMAGE/EXPIRY), quantity, reason, batchId? }
        return this.prisma.$transaction(async (tx) => {
            // 1. Determine quantity direction
            const isAddition = data.type === MovementType.RETURN;
            const delta = isAddition ? Math.abs(data.quantity) : -Math.abs(data.quantity);

            // 2. Get current inventory
            const currentInv = await tx.inventory.findUnique({
                where: { productId_warehouseId: { productId: data.productId, warehouseId: data.warehouseId } }
            });

            const previousQty = currentInv ? currentInv.quantity : 0;
            const newQty = previousQty + delta;

            if (newQty < 0) throw new BadRequestException('Cannot adjust below 0 stock.');

            // 3. Update main Inventory
            const inventory = await tx.inventory.upsert({
                where: { productId_warehouseId: { productId: data.productId, warehouseId: data.warehouseId } },
                create: { productId: data.productId, warehouseId: data.warehouseId, quantity: newQty },
                update: { quantity: newQty }
            });

            // 4. Update Batch Inventory (If applicable)
            if (data.batchId) {
                await tx.productBatch.update({
                    where: { id: data.batchId },
                    data: { quantity: { increment: delta } }
                });
            }

            // 5. Create immutable Stock Ledger entry
            const movement = await tx.stockMovement.create({
                data: {
                    productId: data.productId,
                    warehouseId: data.warehouseId,
                    userId: userId,
                    type: data.type,
                    quantity: delta,
                    previousQuantity: previousQty,
                    newQuantity: newQty,
                    reason: data.reason,
                    batchId: data.batchId,
                }
            });

            // 6. Trigger Low Stock Notification asynchronously
            const product = await tx.product.findUnique({ where: { id: data.productId } });
            if (product && newQty <= product.reorderLevel && previousQty > product.reorderLevel) {
                this.notificationsService.create(orgId, {
                    title: 'Low Stock Alert',
                    message: `⚠ ${product.name} has dropped below the reorder level (${newQty} remaining).`,
                    type: NotificationType.LOW_STOCK
                }).catch(err => this.logger.error('Failed to create low stock notification', err));
            }

            return { inventory, movement };
        });
    }

    async pickBatchesForDispatch(productId: string, warehouseId: string, requiredQty: number) {
        const availableBatches = await this.prisma.productBatch.findMany({
            where: { productId, warehouseId, quantity: { gt: 0 } },
            orderBy: { expiryDate: 'asc' }
        });

        let remainingToFulfill = requiredQty;
        const batchesToConsume: { batchId: string; takeQty: number }[] = [];

        for (const batch of availableBatches) {
            if (remainingToFulfill <= 0) break;

            const takeQty = Math.min(batch.quantity, remainingToFulfill);
            batchesToConsume.push({ batchId: batch.id, takeQty });
            remainingToFulfill -= takeQty;
        }

        if (remainingToFulfill > 0) {
            throw new BadRequestException('Insufficient stock across available batches.');
        }

        return batchesToConsume;
    }

    async getStockLevels(orgId: string, warehouseId?: string) {
        return this.prisma.inventory.findMany({
            where: {
                warehouse: {
                    organizationId: orgId,
                    id: warehouseId || undefined
                }
            },
            include: { product: true, warehouse: true }
        });
    }

    async recordMovement(orgId: string, userId: string, data: any) {
        return this.prisma.$transaction(async (tx) => {
            // 1. Verify warehouse ownership
            const warehouse = await tx.warehouse.findFirst({
                where: { id: data.warehouseId, organizationId: orgId }
            });
            if (!warehouse) throw new BadRequestException('Invalid warehouse');

            // 2. Fetch current inventory state
            const currentInventory = await tx.inventory.findUnique({
                where: {
                    productId_warehouseId: {
                        productId: data.productId,
                        warehouseId: data.warehouseId,
                    }
                }
            });

            // 3. Calculate states
            const previousQty = currentInventory ? currentInventory.quantity : 0;
            const isOut = data.type === MovementType.OUT;
            const delta = isOut ? -Math.abs(data.quantity) : Math.abs(data.quantity);
            const newQty = previousQty + delta;

            if (newQty < 0) {
                throw new BadRequestException(`Insufficient stock. Current stock: ${previousQty}`);
            }

            // 4. Update or Create Inventory with exact new value
            const inventory = await tx.inventory.upsert({
                where: {
                    productId_warehouseId: {
                        productId: data.productId,
                        warehouseId: data.warehouseId,
                    }
                },
                create: {
                    productId: data.productId,
                    warehouseId: data.warehouseId,
                    quantity: newQty,
                },
                update: {
                    quantity: newQty
                }
            });

            // 5. Create immutable Ledger Entry
            await tx.stockMovement.create({
                data: {
                    productId: data.productId,
                    warehouseId: data.warehouseId,
                    userId: userId,
                    type: data.type,
                    quantity: delta,
                    previousQuantity: previousQty,
                    newQuantity: newQty,
                    reference: data.reference,
                    reason: data.reason,
                }
            });

            // 6. Trigger Low Stock Notification asynchronously
            const product = await tx.product.findUnique({ where: { id: data.productId } });
            if (product && newQty <= product.reorderLevel && previousQty > product.reorderLevel) {
                this.notificationsService.create(orgId, {
                    title: 'Low Stock Alert',
                    message: `⚠ ${product.name} has dropped below the reorder level (${newQty} remaining).`,
                    type: NotificationType.LOW_STOCK
                }).catch(err => this.logger.error('Failed to create low stock notification', err));
            }

            return inventory;
        });
    }

    async getLedger(orgId: string, productId?: string, warehouseId?: string) {
        return this.prisma.stockMovement.findMany({
            where: {
                warehouse: { organizationId: orgId },
                productId: productId || undefined,
                warehouseId: warehouseId || undefined,
            },
            include: {
                user: { select: { name: true, email: true } },
                product: { select: { name: true, sku: true } },
                warehouse: { select: { name: true } }
            },
            orderBy: { createdAt: 'desc' },
        });
    }
}