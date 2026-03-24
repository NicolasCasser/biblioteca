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
    data.password = await bcrypt.hash(data.password, 10);
    const emailExists = await this.repository.findOneBy({ email: data.email });

    if (emailExists) {
      throw new ConflictException('Email already in use');
    }

    const user = this.repository.create(data);
    return await this.repository.save(user);
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

  async getAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: User[]; total: number }> {
    const skip = (page - 1) * limit;

    const [users, total] = await this.repository.findAndCount({
      take: limit,
      skip: skip,
    });

    if (total === 0) {
      throw new NotFoundException('Users not found');
    }

    return {
      data: users,
      total,
    };
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
