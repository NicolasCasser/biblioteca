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
import { AuthGuard } from '../auth/jwt/auth.guard';
import { BookDTO } from './dto/book.dto';
import { UpdateBookInput } from './dto/update-book.input';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() data: UpdateBookInput,
  ): Promise<BookDTO> {
    return this.booksService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string): Promise<BookDTO> {
    return this.booksService.delete(id);
  }
}
