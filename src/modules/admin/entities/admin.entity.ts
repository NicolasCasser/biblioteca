import { BaseEntity } from 'src/modules/bases/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('admin')
export class Admin extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @Column({ type: 'varchar', nullable: false })
  password!: string;
}
