import { Test, TestingModule } from '@nestjs/testing';
import { ImgUploadController } from './img-upload.controller';

describe('ImgUpload Controller', () => {
  let controller: ImgUploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImgUploadController],
    }).compile();

    controller = module.get<ImgUploadController>(ImgUploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
