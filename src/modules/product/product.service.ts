import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { Inventory } from 'src/modules/inventory/inventory.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
    @InjectRepository(Inventory) private readonly inventoryRepo: Repository<Inventory>,
  ) {}

  async create(dto: CreateProductDto) {
    try{
      const product =await this.productRepo.create({
        ...dto,
        inventory:await this.inventoryRepo.create({ quantity: dto.quantity }),
      });
      let result= await this.productRepo.save(product);
      return result;
    }catch(e){
      console.error('Error creating product:', e);
      return {error:e.message || 'An error occurred while creating the product.'};
    }
    
  }

  findAll() {
    return this.productRepo.find({ relations: ['inventory'] });
  }

  findOne(id: number) {
    return this.productRepo.findOne({ where: { id }, relations: ['inventory'] });
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.productRepo.findOne({ where: { id }, relations: ['inventory'] });
    if (!product) return null;

    Object.assign(product, dto);
    if (dto.quantity !== undefined && product.inventory) {
      product.inventory.quantity = dto.quantity;
    }

    return this.productRepo.save(product);
  }

  delete(id: number) {
    return this.productRepo.delete(id);
  }
}
