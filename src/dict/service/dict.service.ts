import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Matter, PMLink, IMGLink } from '../dto/dict.dto';

@Injectable()
export class DictService {

    constructor(
        @InjectRepository(Matter)
        private matterRepository: Repository<Matter>,
        
        @InjectRepository(PMLink)
        private pmlinkRepository: Repository<PMLink>,

        @InjectRepository(IMGLink)
        private imglinkRepository: Repository<IMGLink>,
    ) {}

    public async getMatter(): Promise<Matter[]> {
        return await this.matterRepository.find();
    }

    public async getMatterById(id: number): Promise<Matter> {
         return await this.matterRepository.findOneOrFail(id);
    }

    public async getPMLink(): Promise<PMLink[]> {
        return await this.pmlinkRepository.find();
    }

    public async getPMLinkById(id: number): Promise<PMLink> {
        return await this.pmlinkRepository.findOneOrFail(id);
   }

}
