import { Module } from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';
import { PurchaseOrderController } from './purchase-order.controller';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from '../supplier/entities/supplier.entity';

@Module({
  controllers: [PurchaseOrderController],
  providers: [PurchaseOrderService],
  imports: [
    TypeOrmModule.forFeature([PurchaseOrder, Supplier]) 
  ],
})
export class PurchaseOrderModule {}
