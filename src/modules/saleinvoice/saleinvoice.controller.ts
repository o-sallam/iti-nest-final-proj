import { Controller, Get, Post, Body } from '@nestjs/common';
import { SaleInvoiceService } from './saleinvoice.service';
import { CreateSaleInvoiceDto } from './saleinvoice.dto';

@Controller('saleinvoices')
export class SaleInvoiceController {
  constructor(private readonly saleInvoiceService: SaleInvoiceService) {}
  @Post()
  createInvoice(@Body() createSaleInvoiceDto: CreateSaleInvoiceDto) {
    const result = this.saleInvoiceService.create(createSaleInvoiceDto);
    return result;
  }
}
