import { GymsRepositoryInterface } from '@/repositories/gyms-repository-interface';
import { Gym } from '@prisma/client';

export class InMemoryGymsRepository implements GymsRepositoryInterface {
  public items: Gym[] = [];

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }
}
