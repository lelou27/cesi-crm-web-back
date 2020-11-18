import { Test, TestingModule } from '@nestjs/testing';
import { CaracteristiqueService } from './caracteristique.service';

describe('CaracteristiqueService', () => {
  let service: CaracteristiqueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaracteristiqueService],
    }).compile();

    service = module.get<CaracteristiqueService>(CaracteristiqueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
