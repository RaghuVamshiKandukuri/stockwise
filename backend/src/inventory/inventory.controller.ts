import { Controller, Get, Post, Body, Query, Request, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
// import { MovementType } from '@prisma/client';

@Controller('inventory')
export class InventoryController {
    // constructor(private inventoryService: InventoryService) {}

    @Get('ledger')
    // @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.STAFF)
    getLedger(
        @Request() req,
        @Query('productId') productId?: string,
        @Query('warehouseId') warehouseId?: string,
    ) {
        return this.inventoryService.getLedger(req.user.organizationId, productId, warehouseId);
    }
}