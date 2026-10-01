import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
    constructor(private prisma: PrismaService) { }

    async getDashboardMetrics(orgId: string) {
        const [
            totalProducts,
            lowStockProducts,
            inventoryRecords,
            expiredBatches,
            salesTotal,
            purchasesTotal
        ] = await Promise.all([
            // Total Products
            this.prisma.product.count({ where: { organizationId: orgId, isArchived: false } }),

            // Low Stock (Requires joining inventory and checking against reorderLevel)
            this.prisma.inventory.count({
                where: {
                    warehouse: { organizationId: orgId },
                    quantity: { lte: 10 } // Simplified for MVP; ideally compare field-to-field
                }
            }),

            // Inventory Value (Fetch all stock and multiply by product cost)
            this.prisma.inventory.findMany({
                where: { warehouse: { organizationId: orgId } },
                include: { product: { select: { cost: true } } }
            }),

            // Expired Products
            this.prisma.productBatch.count({
                where: {
                    warehouse: { organizationId: orgId },
                    quantity: { gt: 0 },
                    expiryDate: { lt: new Date() }
                }
            }),

            // Sales Total
            this.prisma.sale.aggregate({
                where: { organizationId: orgId, status: 'COMPLETED' },
                _sum: { totalAmount: true }
            }),

            // Purchases Total
            this.prisma.purchaseOrder.aggregate({
                where: { organizationId: orgId, status: 'RECEIVED' },
                _sum: { totalAmount: true }
            })
        ]);

        // Calculate total items and total monetary value
        const totalInventoryItems = inventoryRecords.reduce((sum, item) => sum + item.quantity, 0);
        const inventoryValue = inventoryRecords.reduce((sum, item) => sum + (item.quantity * item.product.cost), 0);

        return {
            metrics: {
                totalProducts,
                totalInventoryItems,
                inventoryValue,
                lowStockProducts,
                expiredBatches,
                salesTotal: salesTotal._sum.totalAmount || 0,
                purchasesTotal: purchasesTotal._sum.totalAmount || 0,
            },
            // Chart placeholders for the frontend to consume
            charts: {
                salesOverTime: [],
                inventoryMovement: [],
                topProducts: [],
            }
        };
    }
}