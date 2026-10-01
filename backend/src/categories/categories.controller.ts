import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client'; // Importing the Role enum from your generated client

@Controller('categories')
@UseGuards(JwtAuthGuard, RolesGuard) // Protects all routes in this controller
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) { }

    @Post()
    @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER)
    create(@Request() req, @Body() dto: any) {
        return this.categoriesService.create(req.user.organizationId, dto);
    }

    @Get()
    // No @Roles required; any authenticated user (including VIEWERS and STAFF) can view categories
    findAll(@Request() req) {
        return this.categoriesService.findAll(req.user.organizationId);
    }

    @Put(':id')
    @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER)
    update(@Request() req, @Param('id') id: string, @Body() dto: any) {
        return this.categoriesService.update(req.user.organizationId, id, dto);
    }

    @Delete(':id')
    @Roles(Role.OWNER, Role.ADMIN) // Restrict deletion to higher roles
    remove(@Request() req, @Param('id') id: string) {
        return this.categoriesService.remove(req.user.organizationId, id);
    }
}