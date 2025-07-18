import { Injectable, OnModuleInit } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRole } from './user.entity';

@Injectable()
export class AuthSeeder implements OnModuleInit {
  constructor(private readonly authService: AuthService) {}

  async onModuleInit() {
    // Seed users when the module initializes
    await this.seedUsers();
  }

  async seedUsers() {
    try {
      // Create admin user
      const admin = await this.authService.createUser(
        'admin',
        'admin123',
        UserRole.ADMIN
      );
      console.log('✅ Admin user created:', admin.username);

      // Create cashier user
      const cashier = await this.authService.createUser(
        'cashier',
        'cashier123',
        UserRole.CASHIER
      );
      console.log('✅ Cashier user created:', cashier.username);

      console.log('\n📋 Default Login Credentials:');
      console.log('Admin: username: admin, password: admin123');
      console.log('Cashier: username: cashier, password: cashier123\n');

      return { admin, cashier };
    } catch (error) {
      // If users already exist, just log it
      if (error.message.includes('duplicate key') || error.message.includes('UNIQUE constraint')) {
        console.log('ℹ️  Users already exist, skipping seeding');
        return;
      }
      console.error('❌ Error seeding users:', error.message);
    }
  }
} 