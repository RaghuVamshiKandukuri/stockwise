import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditLogsService {
    constructor(private prisma: PrismaService) { }

    async logAction(orgId: string, userId: string, action: string, entityId: string, details?: any) {
        return this.prisma.auditLog.create({
            data: {
                organizationId: orgId,
                userId,
                action,
                entityId,
                details: details || {},
            }
        });
    }

async getLogs(orgId: string, entityId?: string, action?: string) {
    return this.prisma.auditLog.findMany({
        where: {
            organizationId: orgId,
            entityId: entityId || undefined,
            action: action || undefined,
        },
        include: {
            user: { select: { name: true, email: true } }
        },
        orderBy: { createdAt: 'desc' },
        take: 100 // Limit to recent 100 logs for performance
    });
}
}