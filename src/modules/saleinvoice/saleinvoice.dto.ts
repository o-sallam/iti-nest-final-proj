export class CreateSaleInvoiceDto {
  warehouseId: number;
  clientId: number;
  paid: number;
  items: CreateSaleInvoiceItemDto[];
}

export class CreateSaleInvoiceItemDto {
  productId: number;
  productName: string;
  quantity: number;
  salePrice: number;
  total: number;
}
