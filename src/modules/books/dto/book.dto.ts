import { BaseDTO } from 'src/modules/bases/dto/base.dto';

export abstract class BookDTO extends BaseDTO {
  title!: string;

  author!: string;

  available!: boolean;
}
