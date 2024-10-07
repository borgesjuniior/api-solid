import { CheckIn, Prisma } from '@prisma/client';

export interface CheckInsRepositoryInterface {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  findManyById(userId: string, page: number): Promise<CheckIn[]>;
  countByUserId(userId: string): Promise<number>;
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
}
