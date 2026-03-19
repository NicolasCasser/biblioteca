import { UserRole } from 'src/modules/user/enum/userRole';

export interface AuthUser {
  sub: string;
  role: UserRole;
}
