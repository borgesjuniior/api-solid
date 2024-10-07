import { CheckIn, Prisma } from '@prisma/client';
import { CheckInRepositoryInterface } from '../check-in-repository-interface';
import { randomUUID } from 'node:crypto';

export class InMemoryCheckInRepository implements CheckInRepositoryInterface {
  private database: CheckIn[] = [];

  async findByUserIdOnDate(userId: string) {
    const checkInOnSameDate = this.database.find(
      (checkIn) => checkIn.user_id === userId
    );

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.database.push(checkIn);

    return checkIn;
  }
}
