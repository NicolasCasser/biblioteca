import { BaseEntity } from 'src/modules/bases/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('books')
export class Book extends BaseEntity {
  @Column({ type: 'varchar', length: '100', nullable: false })
  title!: string;

  @Column({ type: 'varchar', length: '100', nullable: false })
  author!: string;

  @Column({ type: 'varchar', length: '100', nullable: false })
  genre!: string;

  @Column({ name: 'total_quantity', type: 'int', nullable: false})
  totalQuantity!: number;

  @Column({ name: 'available_quantity', type: 'int', nullable: false})
  availableQuantity!: number;
}
