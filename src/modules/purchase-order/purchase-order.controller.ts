import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';

@Controller('purchase-orders')
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) {}

  @Post()
  create(@Body() createPurchaseOrderDto: CreatePurchaseOrderDto) {
    return this.purchaseOrderService.create(createPurchaseOrderDto);
  }

 /* @Get()
  findAll() {
    return this.purchaseOrderService.findAll();
  }*/
 @Get()
async findAll(
  @Query('search') search?: string,
  @Query('status') status: string = 'all',
  @Query('page') page: number = 1,
  @Query('limit') limit: number = 10,
) {
  return this.purchaseOrderService.findAll({ search, status, page, limit });
}


@Get('stats')
async getInvoiceStats() {
  return this.purchaseOrderService.getInvoiceStats();
}



  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.purchaseOrderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    return this.purchaseOrderService.update(id, updatePurchaseOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.purchaseOrderService.remove(id);
  }
}
