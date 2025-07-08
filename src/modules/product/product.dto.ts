import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  description?: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;
}

export class UpdateProductDto {
  @IsString()
  name?: string;

  @IsString()
  sku?: string;

  @IsString()
  description?: string;

  @IsNumber()
  price?: number;

  @IsNumber()
  quantity?: number;
}

