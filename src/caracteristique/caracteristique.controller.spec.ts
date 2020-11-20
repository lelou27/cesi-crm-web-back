import { Test, TestingModule } from '@nestjs/testing';
import { CaracteristiqueController } from './caracteristique.controller';

describe('CaracteristiqueController', () => {
  let controller: CaracteristiqueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaracteristiqueController],
    }).compile();

    controller = module.get<CaracteristiqueController>(CaracteristiqueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
