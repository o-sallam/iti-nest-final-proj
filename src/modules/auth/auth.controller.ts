import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSeeder } from './auth.seeder';
import { LoginDto, LoginResponseDto, CreateUserDto } from './auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { UserRole } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authSeeder: AuthSeeder,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.createUser(
      createUserDto.username,
      createUserDto.password,
      createUserDto.role || UserRole.CASHIER
    );
    
    return {
      message: 'User created successfully',
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }

  @Get('seed')
  async seedUsers() {
    try {
      await this.authSeeder.seedUsers();
      return { message: 'Users seeded successfully' };
    } catch (error) {
      return { message: 'Seeding completed (users may already exist)' };
    }
  }

  @Get('cashiers')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getAllCashiers() {
    const cashiers = await this.authService.findAllByRole(UserRole.CASHIER);
    return cashiers.map(user => ({
      id: user.id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }
} 