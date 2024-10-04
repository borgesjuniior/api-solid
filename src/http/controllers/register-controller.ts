import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { UsersRepository } from '../../repositories/users-repository';
import { RegisterUseCase } from '../../use-cases/register-use-case';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const usersRepository = new UsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    await registerUseCase.execute({ name, email, password });
    return reply.status(201).send();
  } catch {
    reply.status(500).send();
  }
}
