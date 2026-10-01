import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class OrganizationsService {
    constructor(private prisma: PrismaService) { }

    async updateOrganization(orgId: string, data: any) {
        return this.prisma.organization.update({
            where: { id: orgId },
            data: { name: data.name },
        });
    }

    async getMembers(orgId: string) {
        return this.prisma.user.findMany({
            where: { organizationId: orgId },
            select: { id: true, name: true, email: true, role: true, createdAt: true },
            orderBy: { createdAt: 'asc' }
        });
    }

    async addMember(orgId: string, data: any) {
        // Generate a random temporary password for the new member
        const tempPassword = await bcrypt.hash('defaultPassword123', 10);

        return this.prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                role: data.role,
                password: tempPassword,
                organizationId: orgId,
            },
            select: { id: true, email: true, role: true }
        });
    }

    async removeMember(orgId: string, userId: string) {
        // Ensure the user exists and belongs to this specific organization
        const user = await this.prisma.user.findUnique({ where: { id: userId } });

        if (!user || user.organizationId !== orgId) {
            throw new NotFoundException('User not found in this organization');
        }

        // Prevent removing the owner
        if (user.role === Role.OWNER) {
            throw new ForbiddenException('Cannot remove the organization owner');
        }

        return this.prisma.user.delete({
            where: { id: userId },
        });
    }
}