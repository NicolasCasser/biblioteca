import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateBookInput {
  @IsString()
  @IsNotEmpty({ message: 'title is required' })
  title!: string;

  @IsString()
  @IsNotEmpty({ message: 'author is required' })
  author!: string;

  @IsString()
  @IsNotEmpty({ message: 'genre is required' })
  genre!: string;

  @IsNumber()
  @IsNotEmpty({ message: 'total quantity is required'})
  totalQuantity!: number;
}
