import { User, Prisma } from '@prisma/client';
import { UsersRepositoryInterface } from '../users-repository-interface';
import { randomUUID } from 'crypto';

export class InMemoryUsersRepository implements UsersRepositoryInterface {
  private database: User[] = [];

  async findById(id: string) {
    const user = this.database.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = this.database.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.database.push(user);

    return user;
  }
}
