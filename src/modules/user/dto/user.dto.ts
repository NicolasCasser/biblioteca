import { BaseDTO } from 'src/modules/bases/dto/base.dto';

export class UserDTO extends BaseDTO {
  name!: string;

  email?: string;

  phone?: string;
}
