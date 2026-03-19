import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RentalsService } from './rentals.service';

@Injectable()
export class RentalsCronService {
  constructor(private readonly rentalsService: RentalsService) {}

  @Cron('0 * * * *', {
    timeZone: 'America/Sao_Paulo',
  })
  async cancelExpiredReservations() {
    const now = new Date().toISOString();

    console.log(`[CRON] Iniciando cancelamento de reservas expiradas - ${now}`);

    try {
      const count = await this.rentalsService.cancelExpiredReservations();

      console.log(
        `[CRON] Finalizado com sucesso. Reservas canceladas: ${count} - ${now}`,
      );
    } catch (error) {
      console.error(
        `[CRON] Erro ao cancelar reservas expiradas - ${now}`,
        error,
      );
    }
  }
}
