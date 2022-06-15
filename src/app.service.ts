import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.usersRepository.find(); // SELECT * from user
  }

  async getOneById(id: number): Promise<User> {
    try {
      return await this.usersRepository.findOneOrFail({
        where: {
          id: id,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  createUser(name: string): Promise<User> {
    const newUser = this.usersRepository.create({ name });
    return this.usersRepository.save(newUser);
  }

  async updateUser(id: number, name: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: {
          id: id,
        },
      });
      user.name = name;
      return this.usersRepository.save(user);
    } catch (err) {
      throw err;
    }
  }

  async deleteUser(id: number): Promise<User> | null {
    const user = await this.getOneById(id);
    return this.usersRepository.remove(user);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
