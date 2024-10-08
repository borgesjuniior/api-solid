import { beforeEach, describe, expect, it } from 'vitest';
import { FetchUserHistoryCheckIns } from './fetch-user-history-check-ins';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserHistoryCheckIns;

describe('Fetch User History Check-ins', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserHistoryCheckIns(checkInsRepository);
  });

  it('should be able to fetch user history of check-ins', async () => {
    await checkInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    });

    await checkInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-03',
    });

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
  });

  it('should be able to fetch user history of check-ins paginated', async () => {
    for (let index = 1; index <= 22; index++) {
      await checkInsRepository.create({
        user_id: 'user-01',
        gym_id: `gym-${index}`,
      });
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ]);
  });
});
