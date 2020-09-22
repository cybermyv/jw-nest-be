import { Module } from '@nestjs/common';
import { ImgUploadController } from './controller/img-upload.controller';
import { ImgUploadService } from './service/img-upload.service';


@Module({
  providers: [ImgUploadService],
  controllers: [ ImgUploadController]
})
export class ImgUploadModule {}
