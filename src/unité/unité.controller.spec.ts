import { Test, TestingModule } from '@nestjs/testing';
import { UnitéController } from './unité.controller';

describe('UnitéController', () => {
  let controller: UnitéController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitéController],
    }).compile();

    controller = module.get<UnitéController>(UnitéController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
