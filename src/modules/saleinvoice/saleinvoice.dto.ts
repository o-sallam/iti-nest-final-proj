import { IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSaleInvoiceItemDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;

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
