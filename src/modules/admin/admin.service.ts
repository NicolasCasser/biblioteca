import { Injectable, NotFoundException } from '@nestjs/common';
import { Admin } from './entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly repository: Repository<Admin>,
  ) {}

  async findByName(name: string): Promise<Admin> {
    const admin = await this.repository.findOneBy({ name });

    if (!admin) {
      throw new NotFoundException('User not found');
    }

    return admin;
  }
}
