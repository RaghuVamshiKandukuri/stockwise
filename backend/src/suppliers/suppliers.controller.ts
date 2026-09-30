import { Controller, Get, Post, Put, Patch, Body, Param, Query, Request, UseGuards } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { RolesGuard } from '../auth/guards/roles.guard';
// import { Roles } from '../auth/decorators/roles.decorator';
// import { Role } from '../auth/enums/role.enum';

@Controller('suppliers')
// @UseGuards(JwtAuthGuard, RolesGuard)
export class SuppliersController {
    constructor(private readonly suppliersService: SuppliersService) { }

    @Post()
    // @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER)
    create(@Request() req, @Body() dto: any) {
        return this.suppliersService.create(req.user.organizationId, dto);
    }

    @Get()
    findAll(@Request() req, @Query('search') search?: string) {
        return this.suppliersService.findAll(req.user.organizationId, search);
    }

    @Put(':id')
    // @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER)
    update(@Request() req, @Param('id') id: string, @Body() dto: any) {
        return this.suppliersService.update(req.user.organizationId, id, dto);
    }

    @Patch(':id/archive')
    // @Roles(Role.OWNER, Role.ADMIN)
    archive(@Request() req, @Param('id') id: string) {
        return this.suppliersService.archive(req.user.organizationId, id);
    }

    @Post(':id/products/:productId')
    // @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER)
    linkProduct(@Request() req, @Param('id') id: string, @Param('productId') productId: string) {
        return this.suppliersService.linkProduct(req.user.organizationId, id, productId);
    }
}