import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(data: CreateUserInput): Promise<User> {
    const emailExists = await this.repository.findOneBy({
      email: data.email,
    });

    if (emailExists) {
      throw new ConflictException('Email already in use');
    }

    const phoneExists = await this.repository.findOneBy({
      phone: data.phone,
    });

    if (phoneExists) {
      throw new ConflictException('Phone already in user');
    }

    const user = this.repository.create(data);
    return this.repository.save(user);
  }

  async get(id: string): Promise<User> {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, update: Partial<CreateUserInput>): Promise<User> {
    const user = await this.get(id);

    if (update.email) {
      const emailExists = await this.repository.findOneBy({
        email: update.email,
      });

      if (emailExists) {
        throw new ConflictException('Email already in use');
      }
    }

    Object.assign(user, update);
    return this.repository.save(user);
  }

  async delete(id: string): Promise<User> {
    const user = await this.get(id);
    await this.repository.softRemove(user);

    return user;
  }
}
