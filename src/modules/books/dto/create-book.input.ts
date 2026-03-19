import { IsNotEmpty, IsString } from 'class-validator';

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
}
