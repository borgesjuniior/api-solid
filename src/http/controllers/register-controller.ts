import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { RegisterUseCase } from '../../use-cases/register-use-case';
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    await registerUseCase.execute({ name, email, password });
    return reply.status(201).send();
  } catch {
    reply.status(500).send();
  }
}
