import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WarehousesService {
    // constructor(private prisma: PrismaService) {}

    async create(orgId: string, data: any) {
        /*
        return this.prisma.warehouse.create({
          data: { ...data, organizationId: orgId },
        });
        */
    }

    async findAll(orgId: string) {
        /*
        return this.prisma.warehouse.findMany({
          where: { organizationId: orgId, isArchived: false },
        });
        */
    }

    async archive(orgId: string, id: string) {
        /*
        return this.prisma.warehouse.update({
          where: { id, organizationId: orgId },
          data: { isArchived: true },
        });
        */
    }
}