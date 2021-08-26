import { Test, TestingModule } from '@nestjs/testing';
import { ClientImageController } from './client-image.controller';

describe('ClientImageController', () => {
  let controller: ClientImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientImageController],
    }).compile();

    controller = module.get<ClientImageController>(ClientImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
