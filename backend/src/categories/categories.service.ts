import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) { }

    async create(orgId: string, data: any) {
        return this.prisma.category.create({
            data: {
                ...data,
                organizationId: orgId,
            },
        });
    }

    async findAll(orgId: string) {
        return this.prisma.category.findMany({
            where: { organizationId: orgId },
            orderBy: { name: 'asc' },
        });
    }

    async update(orgId: string, categoryId: string, data: any) {
        return this.prisma.category.update({
            where: { id: categoryId, organizationId: orgId },
            data,
        });
    }

    async remove(orgId: string, categoryId: string) {
        try {
            return await this.prisma.category.delete({
                where: { id: categoryId, organizationId: orgId },
            });
        } catch (error) {
            // Prisma will throw an error if you try to delete a category that still has products assigned to it.
            throw new BadRequestException('Cannot delete category. Ensure no products are attached to it first.');
        }
    }
}