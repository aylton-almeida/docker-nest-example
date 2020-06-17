import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import * as crypto from 'crypto';
import { IdAndEmailPayload, EmailAndPasswordPayload } from './users.payloads';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository
      .createQueryBuilder('users')
      .where('users.email = :email')
      .setParameter('email', email)
      .getOne();
  }

  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<IdAndEmailPayload> {
    const passHash = crypto.createHmac('sha256', password).digest('hex');
    return await this.usersRepository
      .createQueryBuilder('users')
      .where('users.email = :email and users.password = :password')
      .setParameter('email', email)
      .setParameter('password', passHash)
      .getOne();
  }

  async create(user: EmailAndPasswordPayload): Promise<User> {
    const oldUser = await this.findByEmail(user.email);

    if (oldUser) {
      throw new NotAcceptableException(
        'User with provided email already created.',
      );
    }

    return await this.usersRepository.save(this.usersRepository.create(user));
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
