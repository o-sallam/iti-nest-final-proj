import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { Inventory } from 'src/modules/inventory/inventory.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Inventory)
    private readonly inventoryRepo: Repository<Inventory>,
  ) {}

  private generateSKU(): string {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const timestamp = Date.now().toString().slice(-4);
    return `SKU-${random}-${timestamp}`;
  }

  async create(dto: CreateProductDto) {
    try {
      // Create the product first
      const product = this.productRepo.create({
        ...dto,
        sku: dto.sku || this.generateSKU(),
      });
      const savedProduct = await this.productRepo.save(product);
      // Create the inventory and link to product
      const inventory = this.inventoryRepo.create({
        quantity: dto.quantity,
        product: savedProduct,
      });
      await this.inventoryRepo.save(inventory);
      // Optionally, you can return the product with inventories
      return this.productRepo.findOne({
        where: { id: savedProduct.id },
        relations: ['inventories'],
      });
    } catch (e) {
      console.error('Error creating product:', e);
      return {
        error: e.message || 'An error occurred while creating the product.',
      };
    }
  }

  findAll() {
    return this.productRepo.find({ relations: ['inventories'] });
  }

  async findAllWithQuantityAndWarehouse() {
    const products = await this.productRepo
      .createQueryBuilder('product')
      .innerJoin('product.inventories', 'inventory')
      .innerJoin('inventory.warehouse', 'warehouse')
      .select([
        'product.id AS product_id',
        'product.name AS product_name',
        'warehouse.name AS warehouse_name',
        'inventory.quantity AS quantity',
      ])
      .getRawMany();

    return products;
  }

  findOne(id: number) {
    return this.productRepo.findOne({
      where: { id },
      relations: ['inventories'],
    });
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['inventories'],
    });
    if (!product) return null;

    Object.assign(product, dto);
    // Update quantity for all inventories if provided
    if (dto.quantity !== undefined && product.inventories) {
      for (const inventory of product.inventories) {
        inventory.quantity = dto.quantity;
        await this.inventoryRepo.save(inventory);
      }
    }
    return this.productRepo.save(product);
  }

  delete(id: number) {
    return this.productRepo.delete(id);
  }
}

