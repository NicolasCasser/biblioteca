import { BaseEntity } from 'src/modules/bases/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { Transform, TransformFnParams } from 'class-transformer';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  @Transform(({ value }: TransformFnParams): Date | undefined => {
    return value ?? undefined;
  }) // Se o campo for 'null', transforma em undefined para não retornar na resposta
  email!: string;

  @Column({ type: 'varchar', nullable: true })
  @Transform(({ value }: TransformFnParams): Date | undefined => {
    return value ?? undefined;
  })
  phone!: string;
}
