import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './modules/client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
<<<<<<< HEAD
import { SupplierModule } from './supplier/supplier.module';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig ), ClientModule, SupplierModule, PurchaseOrderModule],
=======
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), ClientModule, ProductModule],
>>>>>>> c9cf8b70cc7a6b8ef7942e48e3b7438764347bf5
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

