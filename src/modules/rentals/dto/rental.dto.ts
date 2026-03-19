import { BaseDTO } from 'src/modules/bases/dto/base.dto';
import { RentalStatus } from '../enum/status.enum';

export class RentalDTO extends BaseDTO {
  userId!: string;

  bookId!: string;

  reservedAt!: Date;

  pickupDeadline!: Date;

  pickedUpAt!: Date | null;

  dueDate!: Date | null;

  returnedAt!: Date | null;

  status!: RentalStatus;
}
