import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { RolesGuard } from '../auth/guards/roles.guard';
// import { Roles } from '../auth/decorators/roles.decorator';

@Controller('organizations')
// @UseGuards(JwtAuthGuard, RolesGuard)
export class OrganizationsController {
    constructor(private orgService: OrganizationsService) { }

    // Update organization details
    @Put(':id')
    // @Roles('OWNER', 'ADMIN')
    updateOrg(@Param('id') id: string, @Body() dto: any) {
        return this.orgService.updateOrganization(id, dto);
    }

    // Get all members of the organization
    @Get(':id/members')
    getMembers(@Param('id') id: string) {
        return this.orgService.getMembers(id);
    }

    // Add a new member to the organization
    @Post(':id/members')
    // @Roles('OWNER', 'ADMIN')
    addMember(@Param('id') id: string, @Body() dto: any) {
        return this.orgService.addMember(id, dto);
    }

    // Remove a member
    @Delete(':id/members/:userId')
    // @Roles('OWNER', 'ADMIN')
    removeMember(@Param('id') id: string, @Param('userId') userId: string) {
        return this.orgService.removeMember(id, userId);
    }
}