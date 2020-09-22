import { Controller, HttpStatus } from '@nestjs/common';
import { Get, Post, Put, Delete, Body, Param, Res, HttpException, HttpCode } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { Group } from '../dto/group.dto';
import { GroupService } from '../service/group.service';



@ApiTags('jwgroup')
@Controller('jwgroup')
export class GroupController {

    constructor(private groupService: GroupService){}

    @Get()
    @HttpCode(200)
    public async getAll(): Promise<Group[]> {
        return await this.groupService.getAll();
    }

    @Get('visible')
    @HttpCode(200)
    public async getAllVisible(): Promise<Group[]> {
        return await this.groupService.getAllVisible();
    }

    @Post('create')
    @HttpCode(201)
    public async create(
        @Body() groupData: Group) {
        try {
            const {isVisible, name, description} = groupData;

            return await this.groupService.create({isVisible, name, description});
        } catch (e) {
            throw new HttpException('Error create', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id/visible')
    @HttpCode(200)
    async toggle (
        @Param('id') id: number,
        @Res() res: Response
    ) {
        try {
            const result = await this.groupService.toggleVisible(id);
            if (result instanceof Group) {
                return res.status(HttpStatus.OK).json({data: result})
            }
            return res.status(HttpStatus.NOT_FOUND).json({error: result})
        } catch (e) {
            throw new HttpException('Error toggle visible group', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    @HttpCode(200)
    async update (
        @Param('id') id: number,
        @Body() groupData: Group,
        @Res() res: Response
    ) {
        try {
            const {name, description} = groupData;
            const result = await this.groupService.update(id, {name, description});
            if (result instanceof Group) {
                return res.status(HttpStatus.OK).json({data: result})
            }
            return res.status(HttpStatus.NOT_FOUND).json({error: result})
        } catch (e) {
            throw new HttpException('Error update group', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id/delete')
    @HttpCode(200)
    async delete(
        @Param('id') id: number,
        @Res() res: Response
    ) {
        try {
            const result = await this.groupService.delete(id);
            if (result instanceof Object) {
                return res.status(HttpStatus.OK).json({data: result});                
            }
            return res.status(HttpStatus.NOT_FOUND).json({error: result});
        } catch(e) {
            throw new HttpException('Error delete group', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    
}
