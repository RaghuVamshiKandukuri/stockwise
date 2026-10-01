import { Controller, Get, Post, Put, Patch, Body, Param, Request, UseGuards } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('warehouses')
@UseGuards(JwtAuthGuard, RolesGuard) // Secures all routes in this controller
export class WarehousesController {
    constructor(private readonly warehousesService: WarehousesService) {}

    @Post()
    @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER)
    create(@Request() req, @Body() dto: any) {
        return this.warehousesService.create(req.user.organizationId, dto);
    }

    @Get()
    // Accessible by any authenticated user in the organization
    findAll(@Request() req) {
        return this.warehousesService.findAll(req.user.organizationId);
    }

    @Put(':id')
    @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER)
    update(@Request() req, @Param('id') id: string, @Body() dto: any) {
        return this.warehousesService.update(req.user.organizationId, id, dto);
    }

    @Patch(':id/archive')
    @Roles(Role.OWNER, Role.ADMIN) // Restrict archiving to higher roles
    archive(@Request() req, @Param('id') id: string) {
        return this.warehousesService.archive(req.user.organizationId, id);
    }
}