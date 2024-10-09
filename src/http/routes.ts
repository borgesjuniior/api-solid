import { FastifyInstance } from 'fastify';
import { register } from './controllers/users/register-controller';
import { profile } from './controllers/users/profile-controller';
import { authenticate } from './controllers/users/authenticate-controller';
import { verifyJwt } from './middlewares/verify-jwt';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  app.get('/me', { onRequest: [verifyJwt] }, profile);
}
