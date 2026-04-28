import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRentalInput } from './dto/create-rental.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { In, LessThan, Repository } from 'typeorm';
import { RentalStatus } from './enum/status.enum';
import { AuthUser } from 'src/common/interfaces/authUser.interface';
import { Book } from '../books/entities/book.entity';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental)
    private readonly repository: Repository<Rental>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(data: CreateRentalInput, userId: string): Promise<Rental> {
    const activeRentals = await this.repository.count({
      where: {
        userId: userId,
        status: In([RentalStatus.RESERVED, RentalStatus.BORROWED]),
      },
    });

    if (activeRentals >= 3) {
      throw new BadRequestException(
        'User already has maximum number of borrowed books',
      );
    }

    const book = await this.bookRepository.findOne({
      where: { id: data.bookId },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    if (book.availableQuantity === 0) {
      throw new BadRequestException('Book is out of stock');
    }

    const rental = this.repository.create({
      userId: userId,
      book: { id: data.bookId },
      reservedAt: new Date(),
      pickupDeadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 dias
      status: RentalStatus.RESERVED,
    });

    book.availableQuantity -= 1;

    await this.bookRepository.save(book);
    return await this.repository.save(rental);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: Rental[]; total: number }> {
    const skip = (page - 1) * limit;

    const [rentals, total] = await this.repository.findAndCount({
      relations: ['user', 'book'],
      take: limit, // Limite de itens por busca
      skip: skip, // Pula os itens das páginas anteriores
    });

    if (total === 0) {
      throw new NotFoundException('No rentals found');
    }

    return {
      data: rentals,
      total,
    };
  }

  async findMyRentals(user: AuthUser): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { userId: user.sub },
      relations: ['user', 'book'],
    });

    if (rentals.length === 0) {
      throw new NotFoundException('Rentals not found');
    }

    return rentals;
  }

  async findOne(id: string): Promise<Rental> {
    const rental = await this.repository.findOneBy({ id });

    if (!rental) {
      throw new NotFoundException('Rental not found');
    }

    return rental;
  }

  async cancelExpiredReservations(): Promise<number> {
    const expired = await this.repository.find({
      where: {
        status: RentalStatus.RESERVED,
        pickupDeadline: LessThan(new Date()),
      },
    });

    for (const rental of expired) {
      rental.status = RentalStatus.CANCELLED;
    }

    await this.repository.save(expired);
    return expired.length;
  }

  async pickupRental(id: string): Promise<Rental> {
    const rental = await this.findOne(id);

    if (!rental) {
      throw new NotFoundException('Rental not found');
    }

    if (rental.status === RentalStatus.CANCELLED) {
      throw new BadRequestException('Reservation has expired');
    }

    // Verifica se o empréstimo ainda está reservado
    if (rental.status !== RentalStatus.RESERVED) {
      throw new BadRequestException('Rental is not reserved');
    }

    // Verifica se ainda está dentro do prazo de retirada
    if (rental.pickupDeadline < new Date()) {
      throw new BadRequestException('Pickup deadline has passed');
    }

    rental.status = RentalStatus.BORROWED;
    rental.pickedUpAt = new Date();
    rental.dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 dias

    return this.repository.save(rental);
  }

  async returnRental(id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { id },
      relations: ['user', 'book'],
    });

    if (!rental) {
      throw new NotFoundException('Rental not found');
    }

    if (rental.status !== RentalStatus.BORROWED) {
      throw new BadRequestException('Only borrowed rentals can be returned');
    }

    rental.status = RentalStatus.RETURNED;
    rental.returnedAt = new Date();
    rental.book.availableQuantity += 1;
    
    await this.bookRepository.save(rental.book);
    return this.repository.save(rental);
  }

  async onModuleInit() {
    await this.cancelExpiredReservations();
  }
}
