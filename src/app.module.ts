import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GroupModule } from './group/group.module';

@Module({
  imports: [GroupModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'dbase/jwd.db',
      entities: [__dirname + '/**/*.dto{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
