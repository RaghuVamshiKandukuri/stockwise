import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationType } from '@prisma/client';

@Injectable()
export class NotificationsService {
    private readonly logger = new Logger(NotificationsService.name);

    constructor(private prisma: PrismaService) { }

    async create(orgId: string, data: { title: string; message: string; type: any /* NotificationType */; userId?: string }) {
        return this.prisma.notification.create({
            data: { ...data, organizationId: orgId }
        });
    }

    async getUnread(orgId: string, userId: string) {
        return this.prisma.notification.findMany({
            where: {
                organizationId: orgId,
                isRead: false,
                OR: [{ userId: null }, { userId }] // Org-wide or user-specific
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async markAsRead(id: string) {
        return this.prisma.notification.update({
            where: { id },
            data: { isRead: true }
        });
    }

    // Automatically runs every day at midnight to check for expiring products
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async checkExpiries() {
        this.logger.log('Running daily expiry check...');
        const sevenDaysFromNow = new Date();
        sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

        // Find all batches expiring in the next 7 days that have remaining stock
        const expiringBatches = await this.prisma.productBatch.findMany({
            where: {
                quantity: { gt: 0 },
                expiryDate: { lte: sevenDaysFromNow, gte: new Date() }
            },
            include: { product: true }
        });

        for (const batch of expiringBatches) {
            if (!batch.expiryDate) continue;
            await this.create(batch.warehouseId, { // Assuming batch has orgId, or derive from warehouse
                title: 'Expiry Soon',
                message: `Batch ${batch.batchNumber} of ${batch.product.name} expires on ${batch.expiryDate.toDateString()}.`,
                type: 'EXPIRY' // NotificationType.EXPIRY
            });
        }
    }
}