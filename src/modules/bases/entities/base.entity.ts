import { Transform, TransformFnParams } from 'class-transformer';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @Transform(({ value }: TransformFnParams): Date | undefined => {
    return value ?? undefined;
  }) // Se o campo for 'null', transforma em undefined para não retornar na resposta
  deletedAt?: Date;
}
