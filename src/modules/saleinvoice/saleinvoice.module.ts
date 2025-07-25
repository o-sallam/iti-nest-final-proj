import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleInvoiceController } from './saleinvoice.controller';
import { SaleInvoiceService } from './saleinvoice.service';
import { SaleInvoice } from './saleinvoice.entity';
import { SaleInvoiceItem } from './saleinvoice-item.entity';
import { Client } from '../client/client.entity';
import { Inventory } from '../inventory/inventory.entity';
import { User } from '../auth/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleInvoice, SaleInvoiceItem, Client, Inventory, User])],
  providers: [SaleInvoiceService],
  controllers: [SaleInvoiceController],
})
export class SaleInvoiceModule {}
