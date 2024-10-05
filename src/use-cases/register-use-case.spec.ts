import { describe, it, expect } from 'vitest';
import { RegisterUseCase } from './register-use-case';
import { compare } from 'bcryptjs';

describe('Register use case', () => {
  it('should be able to hash user password', async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail() {
        return null;
      },
      async create(data) {
        return {
          id: '1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        };
      },
    });

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
