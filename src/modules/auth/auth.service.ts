import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthInput } from './dto/auth.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: AuthInput): Promise<{ access_token: string }> {
    const admin = await this.adminService.findByName(data.name);

    if (!admin) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await bcrypt.compare(data.password, admin.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: admin.id, username: admin.name };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
