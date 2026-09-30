import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SuppliersService {
    constructor(private prisma: PrismaService) { }

    async create(orgId: string, data: any) {
        return this.prisma.supplier.create({
            data: { ...data, organizationId: orgId },
        });
    }

    async findAll(orgId: string, search?: string) {
        return this.prisma.supplier.findMany({
            where: {
                organizationId: orgId,
                isArchived: false,
                OR: search ? [
                    { name: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                ] : undefined,
            },
            orderBy: { name: 'asc' },
        });
    }

    async update(orgId: string, id: string, data: any) {
        return this.prisma.supplier.update({
            where: { id, organizationId: orgId },
            data,
        });
    }

    async archive(orgId: string, id: string) {
        return this.prisma.supplier.update({
            where: { id, organizationId: orgId },
            data: { isArchived: true },
        });
    }

    async linkProduct(orgId: string, supplierId: string, productId: string) {
        return this.prisma.supplier.update({
            where: { id: supplierId, organizationId: orgId },
            data: {
                products: { connect: { id: productId } }
            }
        });
    }

    async getSupplierHistory(orgId: string, supplierId: string) {
        // Will fetch Purchase Orders once the PO module is built
        // return this.prisma.purchaseOrder.findMany({ where: { supplierId, organizationId: orgId } });
        return [];
    }
}