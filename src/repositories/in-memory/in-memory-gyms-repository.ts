import { GymsRepositoryInterface } from '@/repositories/gyms-repository-interface';
import { Gym, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';

export class InMemoryGymsRepository implements GymsRepositoryInterface {
  private database: Gym[] = [];

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    };

    this.database.push(gym);

    return gym;
  }

  async findById(id: string) {
    const gym = this.database.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }
}
