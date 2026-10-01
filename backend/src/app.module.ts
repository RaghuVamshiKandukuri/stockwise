import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

// Root
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Global & Core Modules
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AuditLogsModule } from './audit-logs/audit-logs.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AnalyticsModule } from './analytics/analytics.module';

// Feature Modules
import { OrganizationsModule } from './organizations/organizations.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { InventoryModule } from './inventory/inventory.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { PurchaseOrdersModule } from './purchase-orders/purchase-orders.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [
    // 1. Initialize environment variables globally (reads from .env)
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // 2. Enable background jobs (for daily expiry checks in Notifications)
    ScheduleModule.forRoot(),

    // 3. Database
    PrismaModule,

    // 4. Authentication & Security
    AuthModule,

    // 5. Core Operational Features
    OrganizationsModule,
    CategoriesModule,
    ProductsModule,
    WarehousesModule,
    SuppliersModule,
    
    // 6. Transactions & Ledger
    PurchaseOrdersModule,
    SalesModule,
    InventoryModule,
    
    // 7. Tracking & Reporting
    AuditLogsModule,
    NotificationsModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}