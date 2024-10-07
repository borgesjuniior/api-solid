import { CheckInsRepositoryInterface } from '@/repositories/check-ins-repository-interface';
import { CheckIn } from '@prisma/client';

interface FetchUserHistoryCheckInsRequest {
  userId: string;
  page: number;
}

interface FetchUserHistoryCheckInsResponse {
  checkIns: CheckIn[];
}

export class FetchUserHistoryCheckIns {
  constructor(private checkInsRepository: CheckInsRepositoryInterface) {}

  async execute({
    userId,
    page,
  }: FetchUserHistoryCheckInsRequest): Promise<FetchUserHistoryCheckInsResponse> {
    const checkIns = await this.checkInsRepository.findManyById(userId, page);

    return {
      checkIns,
    };
  }
}
