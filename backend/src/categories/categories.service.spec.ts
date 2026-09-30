import { Injectable, NotFoundException } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  // constructor(private prisma: PrismaService) {}

  async create(orgId: string, data: any) { // Use CreateCategoryDto
    /*
    return this.prisma.category.create({
      data: {
        ...data,
        organizationId: orgId,
      },
    });
    */
  }

  async findAll(orgId: string) {
    /*
    return this.prisma.category.findMany({
      where: { organizationId: orgId },
      orderBy: { name: 'asc' },
    });
    */
  }

  async update(orgId: string, categoryId: string, data: any) { // Use UpdateCategoryDto
    /*
    return this.prisma.category.update({
      where: { id: categoryId, organizationId: orgId },
      data,
    });
    */
  }

  async remove(orgId: string, categoryId: string) {
    /*
    // Best practice: Check if products exist in this category before deleting, 
    // or implement soft-delete (archive) by adding an 'isArchived' boolean to the schema.
    return this.prisma.category.delete({
      where: { id: categoryId, organizationId: orgId },
    });
    */
  }
}