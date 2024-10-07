import { CheckInRepositoryInterface } from '@/repositories/check-in-repository-interface';
import { CheckIn } from '@prisma/client';

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(private checkInRepository: CheckInRepositoryInterface) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return {
      checkIn,
    };
  }
}
