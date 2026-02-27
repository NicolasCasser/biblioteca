import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly repository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const book = this.repository.create(createBookDto);
    return await this.repository.save(book);
  }

  async findAll() {
    return await this.repository.find();
  }
}
