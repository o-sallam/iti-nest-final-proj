import { IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSaleInvoiceItemDto {
  @Type(() => Number)
  @IsNumber()
  productId: number;

  @Type(() => Number)
  @IsNumber()
  quantity: number;

  @Type(() => Number)
  @IsNumber()
  salePrice: number;
}

export class CreateSaleInvoiceDto {
  @IsNumber()
  warehouseId: number;

  @IsNumber()
  clientId: number;

  @IsNumber()
  paid: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSaleInvoiceItemDto)
  items: CreateSaleInvoiceItemDto[];
}
