import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from 'src/common/enums/order-status.enum';

class PurchaseItemDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  unitPrice: number;

  @IsNumber()
  total: number;
  @IsNumber()
  warehouseId : number;

}

export class CreatePurchaseOrderDto {
  @IsNotEmpty()
  @IsString()
  invoiceNumber: string;

  @IsNumber()
  supplierId: number;

  @IsDateString()
  orderDate: string;

 
 @IsEnum(OrderStatus)
  status: OrderStatus;
 

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
paidAmount: number;


  @IsNumber()
    totalAmount: number;


}
