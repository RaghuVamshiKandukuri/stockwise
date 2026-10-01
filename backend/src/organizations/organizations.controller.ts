import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('organizations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrganizationsController {
    constructor(private orgService: OrganizationsService) { }

    // Update organization details
    @Put()
    @Roles(Role.OWNER, Role.ADMIN)
    updateOrg(@Request() req, @Body() dto: any) {
        return this.orgService.updateOrganization(req.user.organizationId, dto);
    }

    // Get all members of the organization
    @Get('members')
    getMembers(@Request() req) {
        return this.orgService.getMembers(req.user.organizationId);
    }

    // Add a new member to the organization
    @Post('members')
    @Roles(Role.OWNER, Role.ADMIN)
    addMember(@Request() req, @Body() dto: any) {
        return this.orgService.addMember(req.user.organizationId, dto);
    }

    // Remove a member
    @Delete('members/:userId')
    @Roles(Role.OWNER, Role.ADMIN)
    removeMember(@Request() req, @Param('userId') userId: string) {
        return this.orgService.removeMember(req.user.organizationId, userId);
    }
}