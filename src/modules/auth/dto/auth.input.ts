import { IsNotEmpty, IsString } from 'class-validator';

export class AuthInput {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
