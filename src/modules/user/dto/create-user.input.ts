import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'Name field is required' })
  name!: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email field is required' })
  email!: string;

  @IsPhoneNumber('BR')
  @IsNotEmpty({ message: 'Phone field is required' })
  phone!: string;
}
