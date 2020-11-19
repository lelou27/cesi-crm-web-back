import { Test, TestingModule } from '@nestjs/testing';
import { ComposantController } from './composant.controller';

describe('ComposantController', () => {
  let controller: ComposantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComposantController],
    }).compile();

    controller = module.get<ComposantController>(ComposantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
