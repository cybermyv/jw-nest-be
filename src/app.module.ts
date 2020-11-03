import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GroupModule } from './group/group.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DictModule } from './dict/dict.module';
import { ImgUploadModule } from './img-upload/img-upload.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { OrderModule } from './order/order.module';

@Module({
  imports: [GroupModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'dbase/jwd.db',
      entities: [__dirname + '/**/*.dto{.ts,.js}'],
      synchronize: true,
    }),
    MulterModule.register({
      dest: 'dbase/tmp_img',
      // storage: diskStorage ({
      //   destination: './upload'
      // })
    }),
    ProductModule,
    UserModule,
    AuthModule,
    DictModule,
    ImgUploadModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule { }
