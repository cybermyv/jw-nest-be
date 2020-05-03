import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { GroupService } from './service/group.service';
import { GroupController } from './controller/group.controller';
import { Group } from './dto/group.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group])
  ],
  providers: [ GroupService],
  controllers: [GroupController],
})
export class GroupModule {}
