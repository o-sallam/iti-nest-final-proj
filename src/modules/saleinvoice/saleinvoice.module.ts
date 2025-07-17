import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleInvoiceController } from './saleinvoice.controller';
import { SaleInvoiceService } from './saleinvoice.service';
import { SaleInvoice } from './saleinvoice.entity';
import { SaleInvoiceItem } from './saleinvoice-item.entity';
import { Client } from '../client/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleInvoice, SaleInvoiceItem, Client])],
  providers: [SaleInvoiceService],
  controllers: [SaleInvoiceController],
})
export class SaleInvoiceModule {}
