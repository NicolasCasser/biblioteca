import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  author!: string;

  @Column({ default: true })
  available!: boolean;
}
