import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/modules/bases/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { UserRole } from '../enum/userRole';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email!: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar', nullable: false })
  password!: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
  role!: UserRole;
}
