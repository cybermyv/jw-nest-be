import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DictService } from './service/dict.service';
import { DictController } from './controller/dict.controller';
import { Matter, PMLink, IMGLink } from './dto/dict.dto';


@Module({
    imports: [
        TypeOrmModule.forFeature([Matter, PMLink, IMGLink])
      ],
      providers: [DictService],
      controllers: [DictController],
})
export class DictModule {}
