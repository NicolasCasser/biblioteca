import { Body, Controller, Post } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('user')
  create(@Body() data: CreateUserInput): Promise<User> {
    return this.userService.create(data);
  }
}
