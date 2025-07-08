import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Inventory } from 'src/modules/inventory/inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Inventory])],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
