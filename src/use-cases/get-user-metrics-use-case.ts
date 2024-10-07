import { CheckInsRepositoryInterface } from '@/repositories/check-ins-repository-interface';

interface GetUserMetricsUseCaseRequest {
  userId: string;
}
interface GetUserMetricsUseCaseResponse {
  checkInsCount: number;
}

export class GetUserMetricsUseCase {
  constructor(private checkInRepository: CheckInsRepositoryInterface) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInRepository.countByUserId(userId);

    return {
      checkInsCount,
    };
  }
}
