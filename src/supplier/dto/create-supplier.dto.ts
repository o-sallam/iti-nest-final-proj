import { IsString, IsEmail, IsOptional, IsIn } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  name: string;

  @IsString()
  contactNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  address: string;
  @IsOptional()
  @IsString()
  contactPerson?: string;

  @IsOptional()
  @IsString()
  taxNumber?: string;

  @IsOptional()
  @IsIn(['active', 'inactive']) 
  status?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
