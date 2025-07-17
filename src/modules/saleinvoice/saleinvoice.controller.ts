import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SaleInvoiceService } from './saleinvoice.service';
import { CreateSaleInvoiceDto } from './saleinvoice.dto';

@Controller('saleinvoices')
export class SaleInvoiceController {
  constructor(private readonly saleInvoiceService: SaleInvoiceService) {}

  @Post()
  createInvoice(@Body() createSaleInvoiceDto: CreateSaleInvoiceDto) {
    return this.saleInvoiceService.create(createSaleInvoiceDto);
  }

  @Get('with-details')
  getAllInvoicesWithDetails() {
    return this.saleInvoiceService.findAllWithDetails();
  }

  @Get(':id/with-details')
  getInvoiceWithDetails(@Param('id') id: string) {
    return this.saleInvoiceService.findOneWithDetails(+id);
  }

  @Get()
  getAllInvoices() {
    return this.saleInvoiceService.findAll();
  }
}
