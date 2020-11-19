import { Test, TestingModule } from '@nestjs/testing';
import { UnitéService } from './unité.service';

describe('UnitéService', () => {
  let service: UnitéService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnitéService],
    }).compile();

    service = module.get<UnitéService>(UnitéService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
