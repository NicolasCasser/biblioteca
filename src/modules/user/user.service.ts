import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(data: CreateUserInput): Promise<User> {
    const hashPassword = await bcrypt.hash(data.password, 10);
    const emailExists = await this.repository.findOneBy({ email: data.email });

    if (emailExists) {
      throw new ConflictException('Email already in use');
    }

    return this.repository.save({ ...data, password: hashPassword });
  }

  async get(id: string): Promise<User> {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result as User;
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

    if (update.password) {
      update.password = await bcrypt.hash(update.password, 10);
    }

    Object.assign(user, update);
    return this.repository.save(user);
  }

  async delete(id: string): Promise<User> {
    const user = await this.get(id);
    await this.repository.softRemove(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
