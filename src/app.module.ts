import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig), 
    ClientModule, 
    ProductModule, 
    SupplierModule, 
    PurchaseOrderModule, 
    InventoryModule, 
    WarehouseModule,
    SaleInvoiceModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

