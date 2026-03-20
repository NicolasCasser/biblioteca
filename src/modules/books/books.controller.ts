import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookInput } from './dto/create-book.input';
import { AuthGuard } from '../auth/guards/auth.guard';
import { BookDTO } from './dto/book.dto';
import { UpdateBookInput } from './dto/update-book.input';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../user/enum/userRole';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createBookDto: CreateBookInput) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BookDTO> {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(
    @Param('id') id: string,
    @Body() data: UpdateBookInput,
  ): Promise<BookDTO> {
    return this.booksService.update(id, data);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  delete(@Param('id') id: string): Promise<BookDTO> {
    return this.booksService.delete(id);
  }
}
