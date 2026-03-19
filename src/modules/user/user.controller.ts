import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UserDTO } from './dto/user.dto';
import { UpdateUserInput } from './dto/update-user.input';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() data: CreateUserInput): Promise<UserDTO> {
    return this.userService.create(data);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async get(@Param('id') id: string): Promise<UserDTO> {
    return this.userService.get(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Body() data: UpdateUserInput,
    @Param('id') id: string,
  ): Promise<UserDTO> {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string): Promise<UserDTO> {
    return this.userService.delete(id);
  }
}
