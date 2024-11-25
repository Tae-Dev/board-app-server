import { Test, TestingModule } from '@nestjs/testing';
import { PostTypeController } from './post-type.controller';

describe('PostTypeController', () => {
  let controller: PostTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostTypeController],
    }).compile();

    controller = module.get<PostTypeController>(PostTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
