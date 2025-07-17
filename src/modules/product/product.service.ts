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
      // First, create and save the inventory
      const inventory = this.inventoryRepo.create({ quantity: dto.quantity });
      const savedInventory = await this.inventoryRepo.save(inventory);
      // Then, create the product and assign the saved inventory
      const product = this.productRepo.create({
        ...dto,
        sku: dto.sku || this.generateSKU(),
        inventory: savedInventory,
      });
      const result = await this.productRepo.save(product);
      return result;
    } catch (e) {
      console.error('Error creating product:', e);
      return {
        error: e.message || 'An error occurred while creating the product.',
      };
    }
  }

  findAll() {
    return this.productRepo.find({ relations: ['inventory'] });
  }

  async findAllWithStockAndWarehouse() {
    const products = await this.productRepo
      .createQueryBuilder('product')
      .leftJoin('product.inventory', 'inventory')
      .leftJoin('inventory.warehouse', 'warehouse')
      .select([
        'product.id',
        'product.name',
        'product.sku',
        'inventory.quantity',
        'warehouse.name',
      ])
      .addSelect('inventory.quantity', 'stock')
      .addSelect('warehouse.name', 'warehouse_name')
      .getRawMany();

    return products.map(row => ({
      product_id: row.product_id,
      product_name: row.product_name,
      warehouse_name: row.warehouse_name,
      stock: row.stock,
    }));
  }

  findOne(id: number) {
    return this.productRepo.findOne({
      where: { id },
      relations: ['inventory'],
    });
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['inventory'],
    });
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

