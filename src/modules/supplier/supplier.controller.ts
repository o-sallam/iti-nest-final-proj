import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  create(@Body() dto: CreateSupplierDto) {
    return this.supplierService.create(dto);
  }

  @Get()
  findAll() {
    return this.supplierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.supplierService.findOne(id);
  }

 /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    return this.supplierService.update(+id, updateSupplierDto);
  }*/

   @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateSupplierDto) {
    return this.supplierService.update(id, dto);
  }

  /*@Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierService.remove(+id);
  }*/

   @Delete(':id')
  delete(@Param('id') id: number) {
    return this.supplierService.delete(id);
  }
}
