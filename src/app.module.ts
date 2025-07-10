import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './modules/client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { SupplierModule } from './modules/supplier/supplier.module';
import { PurchaseOrderModule } from './modules/purchase-order/purchase-order.module';
import { ProductModule } from './modules/product/product.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { WarehouseModule } from './modules/warehouse/warehouse.module';
import { SaleInvoiceModule } from './modules/saleinvoice/saleinvoice.module';


@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), ClientModule, ProductModule, SupplierModule, PurchaseOrderModule, InventoryModule, WarehouseModule,SaleInvoiceModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

