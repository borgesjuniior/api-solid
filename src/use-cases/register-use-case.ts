import { hash } from 'bcryptjs';
import { prisma } from '../lib/prisma';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepositoy: any) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const userWithSameEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (userWithSameEmail) {
      throw new Error('E-mail already exists.');
    }

    const password_hash = await hash(password, 6);

    await this.usersRepositoy.create({ name, email, password_hash });
  }
}
