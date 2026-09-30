import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InventoryService } from '../inventory/inventory.service';

@Injectable()
export class SalesService {
    constructor(
        private prisma: PrismaService,
        private inventoryService: InventoryService
    ) { }

    async createSale(orgId: string, userId: string, warehouseId: string, data: any) {
        // data.items = [{ productId, quantity, unitPrice }]

        let totalAmount = 0;
        data.items.forEach(item => {
            totalAmount += item.quantity * item.unitPrice;
        });

        // 1. Create the Sale record
        const sale = await this.prisma.sale.create({
            data: {
                organizationId: orgId,
                totalAmount,
                items: { create: data.items }
            }
        });

        // 2. Deduct from Inventory and record in Ledger
        for (const item of data.items) {
            await this.inventoryService.recordMovement(orgId, userId, {
                productId: item.productId,
                warehouseId: warehouseId,
                type: 'OUT', // MovementType.OUT
                quantity: item.quantity,
                reference: `SALE-${sale.id}`,
                reason: 'Product Sold',
            });
        }

        return sale;
    }
}