import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { FetchUserHistoryCheckIns } from '../fetch-user-history-check-ins';

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new FetchUserHistoryCheckIns(checkInsRepository);

  return useCase;
}
