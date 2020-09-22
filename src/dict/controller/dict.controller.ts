import { Controller, HttpStatus } from '@nestjs/common';
import { Get, Post, Put, Delete, Body, Param, Res, HttpException, HttpCode } from '@nestjs/common';


import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { DictService } from '../service/dict.service';
import { Matter, PMLink, IMGLink } from '../dto/dict.dto';

@ApiTags('dict')
@Controller('dict')
export class DictController {

    constructor(
        
        private dictService: DictService,
                
        ) {}

    @Get('matter')
    @HttpCode(200)
    public async getAllMatter(): Promise<Matter[]> {
        return await this.dictService.getMatter();
    }

    @Get(':id/matter')
    @HttpCode(200)
    public async getMatterById(@Param('id') id: number): Promise<Matter> {
        
        try {
            return await this.dictService.getMatterById(id);
        } catch (e) {
            throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
        }        
    }

    @Get('pm')
    @HttpCode(200)
    public async getalPMr(): Promise<PMLink[]> {
        return await this.dictService.getPMLink();
    }

    @Get(':id/pm')
    @HttpCode(200)
    public async getPMLinkById(@Param('id') id: number): Promise<PMLink> {
        
        try {
            return await this.dictService.getPMLinkById(id);
        } catch (e) {
            throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
        }        
    }


}
