import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProtectedController } from './protected.controller';
import { AuthService } from './auth.service';
import { AuthSeeder } from './auth.seeder';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { User } from './user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'your-secret-key',
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController, ProtectedController],
  providers: [AuthService, AuthSeeder, JwtStrategy, JwtAuthGuard, RolesGuard],
  exports: [AuthService, JwtAuthGuard, RolesGuard],
})
export class AuthModule {} 