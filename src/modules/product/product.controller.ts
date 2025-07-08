import { Controller, Get } from '@nestjs/common';

@Controller('product')
export class ProductController {
  @Get()
  findAll() {
    const products = [
      { id: 1, name: 'Product 1', price: 100 },
      { id: 2, name: 'Product 2', price: 200 },
    ];
    return products;
  }
}

