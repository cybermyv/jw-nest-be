import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';


import { Order } from '../dto/order.dto';
import { OrderDetail } from '../dto/detail.dto';
import { Status } from '../dto/status.dto';
import { StatusDetailHistory } from '../dto/status-detail-history.dto';
import { StatusOrderHistory } from '../dto/status-order-history.dto';

import { OrderService } from '../service/order.service';



@ApiTags('order')
@Controller('order')
export class OrderController {
    constructor (private orderService: OrderService) {}

    @Post(':id/create')
    @HttpCode(201)
    public async createOrder(
        @Param('id') id: number,
        @Res() res: Response
    ) {
        try {

            const result = await this.orderService.createOrder(id);

            // console.log(' result ',result)

            if(result instanceof Order || OrderDetail) {
                
                return res.status(HttpStatus.CREATED).json({data: result});                
            }

            return res.status(HttpStatus.NOT_FOUND).json({error: result})

        } catch(e) {
            throw new HttpException('Error create order', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Put(':id/updateDeatailPrice')
    @HttpCode(200)
    public async updateDetailPrice(
        @Param('id') id: number,
        @Body() price: number,
        @Res() res: Response
    ) {

        try {
            const param = Object.values(price)[0];

            // console.log('id ', id, 'tmp',Object.values(price)[0], 'price - ', price);
            const result = await this.orderService.updateDetailPrice(id, param);

            return res.status(HttpStatus.OK).json({data: result});

        } catch(e) {
            throw new HttpException('Error update detail price', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id/updateDeatailNote')
    @HttpCode(200)
    public async updateDetailNote(
        @Param('id') id: number,
        @Body() note: number,
        @Res() res: Response
    ) {        
        try {
            const param = Object.values(note)[0];
            console.log('id ', id, 'tmp',Object.values(note)[0], 'note - ', note);
            const result = await this.orderService.updateDetailNote(id, param);

            return res.status(HttpStatus.OK).json({data: result});

        } catch(e) {
            throw new HttpException('Error update detail note', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @Get(':id/detailsByOrder')
    // @HttpCode(200)
    // public async getDetailsByOrder(
    //     @Param('id') id: number,
    //     @Res() res: Response): Promise<OrderDetail[]> {
            
    //         try{
            
    //             const result = await this.orderService.getDetailsByOrder(id);
    //             console.log('Controller', result);

    //             // return res.status(HttpStatus.OK).json(result); 
    //             return result;
    //         } catch (e) {

    //             throw new HttpException('Error fetch detail', HttpStatus.INTERNAL_SERVER_ERROR);
    //         }        
    // }
    // } этот метод не заработал, бесконечно крутился лоадер, данных не передавал
    
    @Get(':id/detailsByOrder')
    @HttpCode(200)
    public async detailsByOrder(
        @Param('id') id: number,
        // @Res() res: Response
    ) {
        try {

            return await this.orderService.getDetailsByOrder(id);           

        } catch (e) { throw new HttpException('Error fetch detail by order', HttpStatus.INTERNAL_SERVER_ERROR); }
    } 

    @Delete(':id/detail')
    @HttpCode(200)
    public async deleteDetail(
        @Param('id') id: number,
        @Res() res: Response
    ) {
        try {
            const result = await this.orderService.deleteDetail(id);

            if (result instanceof Object) {
                return res.status(HttpStatus.OK).json({data:result});
            }

            return res.status(HttpStatus.NOT_FOUND).json({error: result});

        } catch(e) {
            throw new HttpException('Error delete detail', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Put(':id/updateOrderDesc')
    @HttpCode(200)
    public async updateOrderDesc(
        @Param('id') id: number,
        @Body() description: string,
        @Res() res: Response
    ) {
        try {

            console.log(description)
            const param = Object.values(description)[0];
            console.log(param)
            const result = await this.orderService.updateOrderDescription(id, param);
            
            
            return res.status(HttpStatus.OK).json({data: result});
        } catch(e) {
            console.log(e);
            throw new HttpException('Error update order description', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id/updateOrderCost')
    @HttpCode(200)
    public async updateOrderCost(
        @Param('id') id: number,
        @Body() cost: number,
        @Res() res: Response
    ) {
        try {
            const param = Object.values(cost)[0];
            const result = await this.orderService.updateOrderCost(id, param);
            
            return res.status(HttpStatus.OK).json({data: result});
        } catch(e) {
            console.log(e);
            throw new HttpException('Error update order description', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Get(':id/fullOrder')
    @HttpCode(200)
    public async getFullOrderById(
        @Param('id') id: number,
        // @Res() res: Response
    ) {
        try {

            return await this.orderService.getFullOrderById(id);           

        } catch (e) { throw new HttpException('Error fetch detail by order', HttpStatus.INTERNAL_SERVER_ERROR); }
    }
    
    @Post(':id/accept')
    @HttpCode(200)
    public async acceptOrder(
        @Param('id') id: number,
        @Res() res: Response)
    {
        try {

            const result = await this.orderService.acceptOrder(id);
            return res.status(HttpStatus.OK).json({data: result});

        } catch(e) {
            throw new HttpException('Error accept order', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
        
    
}
