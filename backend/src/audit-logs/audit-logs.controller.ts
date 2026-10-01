import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { AuditLogsService } from './audit-logs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('audit-logs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuditLogsController {
    constructor(private readonly auditLogsService: AuditLogsService) {}

    @Get()
    @Roles(Role.OWNER, Role.ADMIN) // Security: Only Owners and Admins can view audit logs
    getLogs(
        @Request() req,
        @Query('entityId') entityId?: string,
        @Query('action') action?: string,
    ) {
        return this.auditLogsService.getLogs(req.user.organizationId, entityId, action);
    }
}