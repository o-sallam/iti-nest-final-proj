import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { UpdateInventoryDto } from './inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Patch(':warehouseId/:productId')
  update(
    @Param('warehouseId') warehouseId: string,
    @Param('productId') productId: string,
    @Body() dto: UpdateInventoryDto
  ) {
    return this.service.update(+warehouseId, +productId, dto);
  }
}
