import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from './user.entity';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}

export class LoginResponseDto {
  access_token: string;
  user: {
    id: number;
    username: string;
    role: string;
  };
} 