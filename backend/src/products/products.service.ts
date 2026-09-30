import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
    // constructor(private prisma: PrismaService) {}

    async create(orgId: string, data: any) {
        /*
        // Check for duplicate SKU
        const existing = await this.prisma.product.findFirst({
          where: { sku: data.sku, organizationId: orgId }
        });
        if (existing) throw new ConflictException('SKU already exists');
    
        return this.prisma.product.create({
          data: { ...data, organizationId: orgId },
        });
        */
    }

    async findAll(orgId: string, query: { search?: string; categoryId?: string; showArchived?: boolean }) {
        /*
        return this.prisma.product.findMany({
          where: {
            organizationId: orgId,
            isArchived: query.showArchived ? undefined : false,
            categoryId: query.categoryId || undefined,
            OR: query.search ? [
              { name: { contains: query.search, mode: 'insensitive' } },
              { sku: { contains: query.search, mode: 'insensitive' } },
              { barcode: { contains: query.search, mode: 'insensitive' } },
            ] : undefined,
          },
          include: { category: { select: { name: true } } },
          orderBy: { name: 'asc' },
        });
        */
    }

    async update(orgId: string, id: string, data: any) {
        /*
        return this.prisma.product.update({
          where: { id, organizationId: orgId },
          data,
        });
        */
    }

    async archive(orgId: string, id: string) {
        /*
        // Soft delete by setting isArchived to true
        return this.prisma.product.update({
          where: { id, organizationId: orgId },
          data: { isArchived: true },
        });
        */
    }
}