import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
  Query,
  Req,
} from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { CreateRentalInput } from './dto/create-rental.input';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../user/enum/userRole';
import { Roles } from '../../common/decorators/roles.decorator';
import { RentalDTO } from './dto/rental.dto';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { AuthUser } from 'src/common/interfaces/authUser.interface';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Post()
  create(@Body() data: CreateRentalInput, @CurrentUser() user: AuthUser) {
    return this.rentalsService.create(data, user.sub);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ data: RentalDTO[]; total: number }> {
    return this.rentalsService.findAll(page, limit);
  }

  @Get('my')
  findMyRentals(@CurrentUser() user: AuthUser) {
    return this.rentalsService.findMyRentals(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<RentalDTO> {
    return this.rentalsService.findOne(id);
  }

  @Patch(':id/pickup')
  @Roles(UserRole.ADMIN)
  async pickup(@Param('id') id: string): Promise<RentalDTO> {
    const rental = await this.rentalsService.pickupRental(id);
    return rental;
  }

  @Patch(':id/return')
  @Roles(UserRole.ADMIN)
  async return(@Param('id') id: string): Promise<RentalDTO> {
    return await this.rentalsService.returnRental(id);
  }
}
