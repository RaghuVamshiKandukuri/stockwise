import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InventoryService } from '../inventory/inventory.service';
// import { POStatus, MovementType } from '@prisma/client';

@Injectable()
export class PurchaseOrdersService {
    constructor(
        private prisma: PrismaService,
        private inventoryService: InventoryService
    ) { }

    async create(orgId: string, data: any) {
        return this.prisma.purchaseOrder.create({
            data: {
                organizationId: orgId,
                supplierId: data.supplierId,
                items: {
                    create: data.items // Array of { productId, quantity, unitPrice }
                }
            }
        });
    }

    async updateStatus(orgId: string, id: string, status: any /* POStatus */) {
        return this.prisma.purchaseOrder.update({
            where: { id, organizationId: orgId },
            data: { status }
        });
    }

    async receivePO(orgId: string, userId: string, poId: string, warehouseId: string) {
        const po = await this.prisma.purchaseOrder.findUnique({
            where: { id: poId, organizationId: orgId },
            include: { items: true }
        });

        if (!po || po.status !== 'APPROVED') { // Assume enum 'APPROVED'
            throw new BadRequestException('PO must be APPROVED before receiving.');
        }

        // 1. Mark PO as RECEIVED
        await this.updateStatus(orgId, poId, 'RECEIVED'); // Assume enum 'RECEIVED'

        // 2. Update Inventory and Ledger for each item
        for (const item of po.items) {
            await this.inventoryService.recordMovement(orgId, userId, {
                productId: item.productId,
                warehouseId: warehouseId,
                type: 'IN', // MovementType.IN
                quantity: item.quantity,
                reference: `PO-${po.id}`,
                reason: 'Purchase Order Received',
            });
        }

        return { message: 'PO received and inventory updated.' };
    }
}