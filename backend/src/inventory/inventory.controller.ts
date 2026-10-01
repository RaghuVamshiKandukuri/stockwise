import { Controller, Get, Post, Body, Query, Request, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard) // Secures all routes in this controller
export class InventoryController {

    constructor(
        private inventoryService: InventoryService,
        private auditLogsService: AuditLogsService
    ) { }

    @Get()
    @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.STAFF, Role.VIEWER)
    getStock(@Request() req, @Query('warehouseId') warehouseId?: string) {
        return this.inventoryService.getStockLevels(req.user.organizationId, warehouseId);
    }

    @Post('movement')
    @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.STAFF)
    recordMovement(@Request() req, @Body() dto: any) {
        return this.inventoryService.recordMovement(
            req.user.organizationId, 
            req.user.id, 
            dto
        );
    }

    @Post('adjust')
    @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER) // Restrict adjustments to managers+
    async adjustStock(@Request() req, @Body() dto: any) {
        const result = await this.inventoryService.adjustStock(
            req.user.organizationId,
            req.user.id,
            dto
        );

        // Record the exact operation in the Audit Log
        await this.auditLogsService.logAction(
            req.user.organizationId,
            req.user.id,
            `INVENTORY_${dto.type}`, // e.g., INVENTORY_DAMAGE
            result.inventory.id,
            { productId: dto.productId, change: dto.quantity, reason: dto.reason }
        );

        return result;
    }
    
    @Get('ledger')
    @Roles(Role.OWNER, Role.ADMIN, Role.MANAGER, Role.STAFF)
    getLedger(
        @Request() req,
        @Query('productId') productId?: string,
        @Query('warehouseId') warehouseId?: string,
    ) {
        return this.inventoryService.getLedger(req.user.organizationId, productId, warehouseId);
    }
}