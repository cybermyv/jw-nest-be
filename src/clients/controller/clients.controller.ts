import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { Get, Param, Res, HttpException, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as _ from 'lodash';

import { Clients } from '../dto/clients.dto';
import { ClientsService } from '../service/clients.service';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
    constructor (private clientsSerervice: ClientsService) {}

    @Get()
    @HttpCode(200)
    public async getAllClients(): Promise<Clients[]> {
        return await this.clientsSerervice.getAllClients();
    }

    @Get(':id')
    @HttpCode(200)
    public async getClientsByID(
        @Param('id') id: number,
        @Res() res: Response
        ): Promise<Clients | object> {
        
            try {
                const result = await this.clientsSerervice.getClientById(id);

                if(_.isString(result)) {
                    
                    return res.status(HttpStatus.NOT_FOUND).json({error: result});
                }

                return res.status(HttpStatus.OK).json(result);


            } catch (e) {
                throw new HttpException('Error fetch product', HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }

    @Post('save')
    @HttpCode(201)
    public async saveClient(
        @Body() client: Clients
    ) {
        try {
            const {fullname, phone, email, address, note} = client;
            return await this.clientsSerervice.save({fullname, phone, email, address, note})
        } catch (e) {
            console.log(e);
            throw new HttpException('Error create product', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
// пример поиска
    // @Get('movies')
    // async getMovies(@Query('search') search: string) {
    //     if (search !== undefined && search.length > 1) {
    //         return await this.movieService.findMovies(search);
    //     }
    // }

    // axios.get(`http://localhost:3000/api/movies?search=` + this.search) пример запроса на клиенте
    
}
