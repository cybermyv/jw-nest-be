import { Controller, HttpCode, HttpException, HttpStatus, Param, Post, Res } from '@nestjs/common';
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
    
}
