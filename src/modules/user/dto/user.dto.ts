import { BaseDTO } from 'src/modules/bases/dto/base.dto';
import { UserRole } from '../enum/userRole';

export abstract class UserDTO extends BaseDTO {
  name!: string;

  email!: string;

  role!: UserRole;
}
