import { Injectable, BadRequestException } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
// import { MovementType } from '@prisma/client';

@Injectable()
export class InventoryService {
    // constructor(private prisma: PrismaService) {}

    async recordMovement(orgId: string, userId: string, data: any) {
        /*
        return this.prisma.$transaction(async (tx) => {
          // 1. Verify warehouse ownership
          const warehouse = await tx.warehouse.findFirst({
            where: { id: data.warehouseId, organizationId: orgId }
          });
          if (!warehouse) throw new BadRequestException('Invalid warehouse');
    
          // 2. Fetch current inventory state
          const currentInventory = await tx.inventory.findUnique({
            where: {
              productId_warehouseId: {
                productId: data.productId,
                warehouseId: data.warehouseId,
              }
            }
          });
    
          // 3. Calculate states
          const previousQuantity = currentInventory ? currentInventory.quantity : 0;
          const isOut = data.type === MovementType.OUT;
          const delta = isOut ? -Math.abs(data.quantity) : Math.abs(data.quantity);
          const newQuantity = previousQuantity + delta;
    
          if (newQuantity < 0) {
            throw new BadRequestException(`Insufficient stock. Current stock: ${previousQuantity}`);
          }
    
          // 4. Update or Create Inventory with exact new value
          const inventory = await tx.inventory.upsert({
            where: {
              productId_warehouseId: {
                productId: data.productId,
                warehouseId: data.warehouseId,
              }
            },
            create: {
              productId: data.productId,
              warehouseId: data.warehouseId,
              quantity: newQuantity,
            },
            update: {
              quantity: newQuantity
            }
          });
    
          // 5. Create immutable Ledger Entry
          await tx.stockMovement.create({
            data: {
              productId: data.productId,
              warehouseId: data.warehouseId,
              userId: userId,
              type: data.type,
              quantity: delta,
              previousQuantity: previousQuantity,
              newQuantity: newQuantity,
              reference: data.reference,
              reason: data.reason,
            }
          });
    
          return inventory;
        });
        */
    }

    // Add a method to fetch the ledger
    async getLedger(orgId: string, productId?: string, warehouseId?: string) {
        /*
        return this.prisma.stockMovement.findMany({
          where: {
            warehouse: { organizationId: orgId },
            productId: productId || undefined,
            warehouseId: warehouseId || undefined,
          },
          include: {
            user: { select: { name: true, email: true } },
            product: { select: { name: true, sku: true } },
            warehouse: { select: { name: true } }
          },
          orderBy: { createdAt: 'desc' },
        });
        */
    }
}