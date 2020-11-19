import { Test, TestingModule } from '@nestjs/testing';
import { GammeService } from './gamme.service';

describe('GammeService', () => {
  let service: GammeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GammeService],
    }).compile();

    service = module.get<GammeService>(GammeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
