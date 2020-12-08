import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Clients } from '../dto/clients.dto';


@Injectable()
export class ClientsService {

    constructor (
        @InjectRepository(Clients)
        private clientsRepository: Repository<Clients>,
    ) {}

    public async getAllClients(): Promise<Clients[]> {
        return await this.clientsRepository.find();
    }

    public async getClientById(id: number): Promise<Clients | string> {
        const result = await this.clientsRepository.findOne(id);
        if(result) {
        
            return result;
        }

        return `клиент с идентификатором ${id} не найден`;
    }

    public async save(data: Clients): Promise<Clients> {
        
        return await this.clientsRepository.save(data);
    }
}
