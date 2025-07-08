import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PurchaseItemDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  unitPrice: number;

  @IsNumber()
  total: number;
}

export class CreatePurchaseOrderDto {
  @IsNotEmpty()
  @IsString()
  invoiceNumber: string;

  @IsNumber()
  supplierId: number;

  @IsDateString()
  orderDate: string;

  @IsDateString()
  dueDate: string;

  @IsEnum(['PENDING', 'RECEIVED', 'PAID'])
  status: 'PENDING' | 'RECEIVED' | 'PAID';

  @IsEnum(['cash', 'transfer', 'check'])
  paymentMethod: 'cash' | 'transfer' | 'check';

  @IsOptional()
  @IsString()
  notes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseItemDto)
  items: PurchaseItemDto[];

  @IsNumber()
    totalAmount: number;

}
