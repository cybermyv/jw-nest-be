import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from './dto/order.dto';
import { OrderDetail } from './dto/detail.dto';
import { Status } from './dto/status.dto';
import { StatusDetailHistory } from './dto/status-detail-history.dto';
import { StatusOrderHistory } from './dto/status-order-history.dto';


import { OrderService } from './service/order.service';
import { OrderController } from './controller/order.controller';
import { ProductService } from 'src/product/service/product.service';
import { Product, Matter, PMLink, IMGLink } from 'src/product/dto/product.dto';


@Module({
    imports: [
        TypeOrmModule.forFeature([Product,Matter, PMLink, IMGLink, Order, OrderDetail, Status, StatusOrderHistory, StatusDetailHistory])
    ],
    providers: [OrderService, ProductService],
    controllers: [OrderController],
})
export class OrderModule {}
