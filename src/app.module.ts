import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './modules/client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { SupplierModule } from './supplier/supplier.module';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig ), ClientModule, SupplierModule, PurchaseOrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
