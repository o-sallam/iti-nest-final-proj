export class CreateSaleInvoiceDto {
  clientId: number;
  paid: number;
  items: CreateSaleInvoiceItemDto[];
}

export class CreateSaleInvoiceItemDto {
  productId: number;
  quantity: number;
  price: number;
}
