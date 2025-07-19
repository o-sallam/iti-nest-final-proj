import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { SaleInvoiceService } from './saleinvoice.service';
import { CreateSaleInvoiceDto } from './saleinvoice.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('saleinvoices')
export class SaleInvoiceController {
  constructor(private readonly saleInvoiceService: SaleInvoiceService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createInvoice(@Body() createSaleInvoiceDto: CreateSaleInvoiceDto, @Request() req) {
    return this.saleInvoiceService.create(createSaleInvoiceDto, req.user);
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
