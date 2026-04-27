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

  @Column({ name: 'reserved_at', type: 'timestamp' })
  reservedAt!: Date;

  @Column({ name: 'pickup_deadline', type: 'timestamp', nullable: true })
  pickupDeadline!: Date;

  @Column({ name: 'picked_up_at', type: 'timestamp', nullable: true })
  pickedUpAt!: Date | null;

  @Column({ name: 'due_date', type: 'timestamp', nullable: true })
  dueDate!: Date | null;

  @Column({ name: 'returned_at', type: 'timestamp', nullable: true })
  returnedAt!: Date | null;

  @Column({ type: 'enum', enum: RentalStatus, default: RentalStatus.RESERVED })
  status!: RentalStatus;
}
