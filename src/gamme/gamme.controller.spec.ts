import { Test, TestingModule } from '@nestjs/testing';
import { GammeController } from './gamme.controller';

describe('GammeController', () => {
  let controller: GammeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GammeController],
    }).compile();

    controller = module.get<GammeController>(GammeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
