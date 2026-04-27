import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateRentalInput {
  @IsUUID('4', { message: 'Book ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Book ID is required' })
  bookId!: string;
}
