import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepo: Repository<Supplier>,

  ) {}

  create(data: CreateSupplierDto) {
    const supplier = this.supplierRepo.create(data);
    return this.supplierRepo.save(supplier);
  }

  findAll() {
    return this.supplierRepo.find();
  }

async update(id: number, data: UpdateSupplierDto) {
  const supplier = await this.supplierRepo.findOne({ where: { id } });

  if (!supplier) {
    throw new NotFoundException(`Supplier with ID ${id} not found`);
  }

  const updated = Object.assign(supplier, data);
  return this.supplierRepo.save(updated);
}

  delete(id: number) {
    return this.supplierRepo.delete(id);
  }



async findOne(id: number): Promise<Supplier> {
  const supplier = await this.supplierRepo.findOne({
    where: { id },
  });

  if (!supplier) {
    throw new NotFoundException(`Supplier with ID ${id} not found`);
  }

  return supplier;
}



/*async findOne(id: number): Promise<Supplier> {
  const supplier = await this.supplierRepo.findOne({
    where: { id },
    relations: ['purchaseOrders'], // دي أهم حاجة: تربط المورد بأوامر الشراء
  });

  if (!supplier) {
    throw new NotFoundException(`Supplier with ID ${id} not found`);
  }

  return supplier;
}*/

}
