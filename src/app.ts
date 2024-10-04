import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

export const app = Fastify();

const prisma = new PrismaClient();

prisma.user.create({
  data: {
    name: 'Júnior',
    email: 'valdecyborgesjr@example.com',
  },
});
