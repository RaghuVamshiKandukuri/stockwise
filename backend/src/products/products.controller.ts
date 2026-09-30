import { Controller, Get, Post, Put, Patch, Body, Param, Query, Request, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { RolesGuard } from '../auth/guards/roles.guard';
// import { Roles } from '../auth/decorators/roles.decorator';
// import { Role } from '../auth/enums/role.enum';

@Controller('products')
// @UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    // @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER)
    create(@Request() req, @Body() dto: any) {
        return this.productsService.create(req.user.organizationId, dto);
    }

    @Get()
    // Accessible by any authenticated user in the org
    findAll(
        @Request() req,
        @Query('search') search?: string,
        @Query('categoryId') categoryId?: string,
        @Query('showArchived') showArchived?: string,
    ) {
        const isArchived = showArchived === 'true';
        return this.productsService.findAll(req.user.organizationId, { search, categoryId, showArchived: isArchived });
    }

    @Put(':id')
    // @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER)
    update(@Request() req, @Param('id') id: string, @Body() dto: any) {
        return this.productsService.update(req.user.organizationId, id, dto);
    }

    @Patch(':id/archive')
    // @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER)
    archive(@Request() req, @Param('id') id: string) {
        return this.productsService.archive(req.user.organizationId, id);
    }
}