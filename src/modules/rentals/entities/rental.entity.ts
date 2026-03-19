import { BaseEntity } from 'src/modules/bases/entities/base.entity';
import { Book } from 'src/modules/books/entities/book.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { RentalStatus } from '../enum/status.enum';

@Entity('rentals')
export class Rental extends BaseEntity {
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ name: 'user_id', type: 'uuid', nullable: false })
  userId!: string;

  @ManyToOne(() => Book, { nullable: false })
  @JoinColumn({ name: 'book_id' })
  book!: Book;

  @Column({ name: 'book_id', type: 'uuid', nullable: false })
  bookId!: string;

  @Column({ type: 'timestamp' })
  reservedAt!: Date;

  @Column({ type: 'timestamp', nullable: true })
  pickupDeadline!: Date;

  @Column({ type: 'timestamp', nullable: true })
  pickedUpAt!: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  dueDate!: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  returnedAt!: Date | null;

  @Column({ type: 'enum', enum: RentalStatus, default: RentalStatus.RESERVED })
  status!: RentalStatus;
}
