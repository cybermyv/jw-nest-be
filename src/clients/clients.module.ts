import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientsService } from './service/clients.service';
import { ClientsController } from './controller/clients.controller';
import { Clients } from './dto/clients.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([Clients])    
],
  providers: [ClientsService],
  controllers: [ClientsController],  
  
 
})
export class ClientsModule {}
