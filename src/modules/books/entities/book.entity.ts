import { BaseEntity } from 'src/modules/bases/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('books')
export class Book extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  author!: string;

  @Column()
  genre!: string;
}
