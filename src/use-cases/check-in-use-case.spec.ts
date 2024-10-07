import { beforeEach, describe, expect, it } from 'vitest';
import { CheckInUseCase } from './check-in-use-case';
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository';
import { randomUUID } from 'node:crypto';

let checkInRepository: InMemoryCheckInRepository;
let sut: CheckInUseCase;

describe('Check In Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository();
    sut = new CheckInUseCase(checkInRepository);
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: randomUUID(),
      gymId: randomUUID(),
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
