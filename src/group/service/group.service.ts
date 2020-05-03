import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Group } from '../dto/group.dto';


@Injectable()
export class GroupService {

    constructor (  
        @InjectRepository(Group)
        private groupRepository: Repository<Group>) {}

    private async findId(id: number): Promise<Group> {
        return await this.groupRepository.findOne(id);
    }

    public async getAll(): Promise<Group[]> {
        return await this.groupRepository.find();
    }
    public async getAllVisible(): Promise<Group[]> {
        return await this.groupRepository.find({
            where: {isVisible: true}
        })
    }

    public async create(group: Group ): Promise<Group> {
        return await this.groupRepository.save(group);
    }

    public async toggleVisible(id: number) {
        const group = await this.findId(id);
        
        if (group) {
            const isVisible = !group.isVisible;

            await this.groupRepository.query('update jwgroup set isVisible =? where id =?', [isVisible, id]);
            
            const result = await this.findId(id);

            return result;
        } else { return 'Не найдена запись!'}
    }

    public async update (id: number, group: Partial<Group>) {

        const exist = await this.findId(id);

        if (exist) {
            await this.groupRepository.query('update jwgroup set name =?, description =? where id =?', [group.name, group.description, id]);

            const result = await this.findId(id);
            return result;
        } else { return 'Не найдена запись для редактирования!'}
    }

    public async delete (id: number) {

        const exist = await this.findId(id);

        if (exist) {
            await this.groupRepository.query('delete from jwgroup where id =?', [id]);
            return {id: id};
        } else {
            return 'Запись для удаления не найдена'
        } 
    }

}
