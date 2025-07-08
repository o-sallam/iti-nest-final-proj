export class CreateProductDto {
  name: string;
  description?: string;
  price: number;
  quantity: number; 
}

export class UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  quantity?: number; 
}


