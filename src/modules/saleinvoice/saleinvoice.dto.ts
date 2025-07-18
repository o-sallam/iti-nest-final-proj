export class CreateSaleInvoiceDto {
  warehouseId: number;
  clientId: number;
  paid: number;
  items: CreateSaleInvoiceItemDto[];
}

export class CreateSaleInvoiceItemDto {
  productId: number;
  quantity: number;
  salePrice: number;
  total: number;
}
