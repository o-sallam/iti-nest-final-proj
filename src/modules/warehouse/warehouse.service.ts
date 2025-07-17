import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from './warehouse.entity';
import { CreateWarehouseDto, UpdateWarehouseDto } from './warehouse.dto';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private readonly warehouseRepo: Repository<Warehouse>,
  ) {}

  create(dto: CreateWarehouseDto) {
    const warehouse = this.warehouseRepo.create(dto);
    return this.warehouseRepo.save(warehouse);
  }

  findAll() {
    return this.warehouseRepo.find();
  }

  findOne(id: number) {
    return this.warehouseRepo.findOne({ where: { id }, relations: ['inventories'] });
  }

  async update(id: number, dto: UpdateWarehouseDto) {
    const warehouse = await this.findOne(id);
    if (!warehouse) return null;
    Object.assign(warehouse, dto);
    return this.warehouseRepo.save(warehouse);
  }

  delete(id: number) {
    return this.warehouseRepo.delete(id);
  }
}
