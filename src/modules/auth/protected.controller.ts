import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { UserRole } from './user.entity';

@Controller('protected')
export class ProtectedController {
  @Get('admin-only')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  getAdminData(@Request() req) {
    return {
      message: 'This is admin-only data',
      user: req.user,
    };
  }

  @Get('cashier-only')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CASHIER)
  getCashierData(@Request() req) {
    return {
      message: 'This is cashier-only data',
      user: req.user,
    };
  }

  @Get('both-roles')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CASHIER)
  getBothRolesData(@Request() req) {
    return {
      message: 'This data is accessible by both admin and cashier',
      user: req.user,
    };
  }

  @Get('authenticated-only')
  @UseGuards(JwtAuthGuard)
  getAuthenticatedData(@Request() req) {
    return {
      message: 'This data is accessible by any authenticated user',
      user: req.user,
    };
  }
} 