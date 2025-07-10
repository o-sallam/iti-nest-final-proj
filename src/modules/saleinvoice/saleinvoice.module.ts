import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleInvoiceController } from './saleinvoice.controller';
import { SaleInvoiceService } from './saleinvoice.service';
import { SaleInvoice } from './saleinvoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleInvoice])],
  providers: [SaleInvoiceService],
  controllers: [SaleInvoiceController],
})
export class SaleInvoiceModule {}
