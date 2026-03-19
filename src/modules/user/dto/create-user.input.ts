import {
  IsEmail,
  IsEnum,
  IsLowercase,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { UserRole } from '../enum/userRole';

export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name!: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsLowercase({ message: 'Email field must be lowercase' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password!: string;

  @IsEnum(UserRole)
  @IsNotEmpty({ message: 'User role is required' })
  role!: UserRole;
}
