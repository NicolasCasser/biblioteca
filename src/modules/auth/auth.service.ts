import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthInput } from './dto/auth.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: AuthInput): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(data.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
