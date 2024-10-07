import { GymsRepositoryInterface } from '@/repositories/gyms-repository-interface';

interface CreateGymUseCaseRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepositoryInterface) {}

  async create({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest) {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return { gym };
  }
}
