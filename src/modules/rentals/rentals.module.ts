import { Module } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { RentalsCronService } from './rentals-cron.service';
import { Book } from '../books/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rental, Book])],
  controllers: [RentalsController],
  providers: [RentalsService, RentalsCronService],
})
export class RentalsModule {}
