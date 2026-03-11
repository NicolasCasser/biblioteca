import { BaseEntity } from 'src/modules/bases/entities/base.entity';
import { Book } from 'src/modules/books/entities/book.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('rentals')
export class Rental extends BaseEntity {
  @ManyToOne(() => User, { nullable: false })
  user!: User;

  @ManyToOne(() => Book, { nullable: false })
  book!: Book;

  @Column()
  retendAt!: Date;

  @Column()
  returnDeadline!: Date;
}
