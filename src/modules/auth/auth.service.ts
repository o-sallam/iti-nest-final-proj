import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './user.entity';
import { LoginDto, LoginResponseDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });
    
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id, role: user.role };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  // Helper method to create a user with hashed password (for seeding)
  async createUser(username: string, password: string, role: UserRole = UserRole.CASHIER): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new Error(`User with username '${username}' already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      role,
    });
    return this.userRepository.save(user);
  }
} 