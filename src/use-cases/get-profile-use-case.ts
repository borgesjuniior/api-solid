import { UsersRepositoryInterface } from '@/repositories/users-repository-interface';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetUserProfileUseCaseRequest {
  userId: string;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}
  async execute({ userId }: GetUserProfileUseCaseRequest) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
