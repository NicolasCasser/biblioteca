import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly repository: Repository<Book>,
  ) {}

  async create(data: CreateBookInput) {
    const book = this.repository.create(data);
    return await this.repository.save(book);
  }

  async findAll(): Promise<Book[]> {
    const books = await this.repository.find();

    if (!books || books.length === 0) {
      throw new NotFoundException('No books found');
    }

    return books;
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.repository.findOneBy({ id });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async update(id: string, update: Partial<CreateBookInput>): Promise<Book> {
    const book = await this.repository.findOneBy({ id });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    Object.assign(update, book);
    return this.repository.save(book);
  }

  async delete(id: string): Promise<Book> {
    const book = await this.repository.findOneBy({ id });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return this.repository.softRemove(book);
  }
}
