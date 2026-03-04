import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UserDTO } from './dto/user.dto';
import { UpdateUserInput } from './dto/update-user.input';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() data: CreateUserInput): Promise<UserDTO> {
    return this.userService.create(data);
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<UserDTO> {
    return this.userService.get(id);
  }

  @Put(':id')
  async update(
    @Body() data: UpdateUserInput,
    @Param('id') id: string,
  ): Promise<UserDTO> {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UserDTO> {
    return this.userService.delete(id);
  }
}
