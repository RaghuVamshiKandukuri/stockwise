import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WarehousesService {
    constructor(private prisma: PrismaService) { }

    async create(orgId: string, data: any) {
        return this.prisma.warehouse.create({
            data: { ...data, organizationId: orgId },
        });
    }

    async findAll(orgId: string) {
        return this.prisma.warehouse.findMany({
            where: { organizationId: orgId, isArchived: false },
            orderBy: { name: 'asc' }, // Alphabetical order
        });
    }

    async update(orgId: string, id: string, data: any) {
        return this.prisma.warehouse.update({
            where: { id, organizationId: orgId },
            data,
        });
    }

    async archive(orgId: string, id: string) {
        // Soft delete by setting isArchived to true
        return this.prisma.warehouse.update({
            where: { id, organizationId: orgId },
            data: { isArchived: true },
        });
    }
}