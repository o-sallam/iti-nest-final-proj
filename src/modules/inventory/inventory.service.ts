import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './inventory.entity';
import { Repository } from 'typeorm';
import { UpdateInventoryDto } from './inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory) private readonly inventoryRepo: Repository<Inventory>,
  ) {}

  findAll() {
    return this.inventoryRepo.find({ relations: ['product'] });
  }

  async update(warehouseId: number, productId: number, dto: UpdateInventoryDto) {
    const inventory = await this.inventoryRepo.findOneBy({ warehouseId, productId });
    if (!inventory) return null;
    inventory.quantity = dto.quantity;
    return this.inventoryRepo.save(inventory);
  }
}
