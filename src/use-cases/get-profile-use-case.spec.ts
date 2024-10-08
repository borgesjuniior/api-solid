import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { describe } from 'node:test';
import { beforeEach, expect, it } from 'vitest';
import { GetUserProfileUseCase } from './get-profile-use-case';
import { hash } from 'bcryptjs';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile User Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.name).toBe('John Doe');
  });
});
