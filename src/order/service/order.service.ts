/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Order } from '../dto/order.dto';
import { OrderDetail } from '../dto/detail.dto';
import { Status } from '../dto/status.dto';
import { StatusDetailHistory } from '../dto/status-detail-history.dto';
import { StatusOrderHistory } from '../dto/status-order-history.dto';

import { ProductService } from 'src/product/service/product.service';
import { Product } from 'src/product/dto/product.dto';
import { promises } from 'dns';
import { Stats } from 'fs';




@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,

        @InjectRepository(OrderDetail)
        private orderDetailRepository: Repository<OrderDetail>,

        @InjectRepository(Status)
        private statsuRepository: Repository<Status>,

        @InjectRepository(StatusDetailHistory)
        private statusDetailRepository: Repository<StatusDetailHistory>,

        @InjectRepository(StatusOrderHistory)
        private statusOrderRepository: Repository<StatusOrderHistory>,

        private product: ProductService,


    ) { }

    private async findNewOrder() {
        const order = await this.orderRepository.findOne({
            where: { current_status_id: 1 }
        });

        if (order) {

            return order.id;
        }

        return 0;
    }

    private defaultOrder(): Order {
        const order = new Order;
        order.description = 'Создаем новый заказа';
        order.total_cost = 0;
        order.client_id = 0;
        order.current_status_id = 1;

        return order;
    }

    public async createOrd(order: Partial<Order>): Promise<Order> {
        try {

            const result = await this.orderRepository.save(order);

            return result;

        } catch (e) {
            console.log(e);
        }
    }


    private defaultDetail(productId, orderId, price: number): OrderDetail {
        const detail = new OrderDetail;
        detail.order_id = orderId;
        detail.product_id = productId;
        detail.current_status_id = 7;
        detail.note = '';
        detail.price = price;

        return detail;
    }

    public async createDtl(detail: Partial<OrderDetail>): Promise<OrderDetail> {
        try {
            const result = await this.orderDetailRepository.save(detail);

            return result;

        } catch (e) {
            console.log(e);
        }
    }

    private async getAllDetailByOrderId(id: number): Promise<OrderDetail[]> {
        try {
            return await this.orderDetailRepository.find({
                where: { order_id: id }
            });
        } catch (e) {

            console.log(e);
         
         return null;
        }
    } 

    private async getOrderById(id: number): Promise<Order> {
        try {
            return await this.orderRepository.findOne({
                where: { id: id }
            });
        } catch (e) {

            console.log(e);
         
         return null;
        }

    }

    private async getAllStatusByOrderId(id: number): Promise<StatusOrderHistory[]> {
        try {
            return await this.statusOrderRepository.find({
                where: { order_id: id }
            });
        } catch (e) {

            console.log(e);
         
         return null;
        }
    }

    private async getAllStatusByDetailId(id: number): Promise<StatusDetailHistory[]> {
        try {
            return await this.statusDetailRepository.find({
                where: { detail_id: id }
            });
        } catch (e) {

            console.log(e);
         
         return null;
        }
    }

    

    public async createOrder(productId: number) {
        const found = await this.findNewOrder();

        let order;
        let detail;

        if (found === 0) {
            // -- если нет заказа со статусом new, создаем новый заказ с первым продуктом
            order = await this.newOrder(productId);
        } else {
            order = await this.getOrderById(found);

            // -- если найден заказ со статусом new, добавляем продукт в существующий заказ

            detail = this.defaultDetail(productId, found, 100);
            await this.createDtl(detail);
            await this.setHistoryStatus('detail', detail.current_status_id, detail.id);

        }

        // собираем полный объект и возвращаем его

        const data = Object.assign({});
        data.order = order;
        const currentStatusOrder = await this.getStatusById(order.current_status_id);
        data.order.currentStatusDescriptopn = currentStatusOrder.description;
        data.order.statusHistory = await this.getAllStatusByOrderId(order.id);
        // -- TODO - посчитать order.total_cost

        // -- получаем все детали по данному заказу.
        const detail$ = await this.getAllDetailByOrderId(order.id);
      
        data.order.detail = detail$;

          await Promise.all(data.order.detail.map( async item => {  
            // -- добавляем статутс и иторию статусов
            const currentStatusDescriptopn =  await this.getStatusById(item.current_status_id);
            item.currentStatusDescriptopn =  currentStatusDescriptopn.description; 
            item.statusHistory = await this.getAllStatusByDetailId(item.id);

            // -- добавить название изделия и еще какие-то нужные данные.
            return item;
                
        }));              

        return order;
    }


    private async newOrder(productId: number): Promise<Order | string> {
        const product: any = await this.product.getProductById(productId);

        if (product.id) {
            const data = Object.assign({});
            // -- если изделие найдено, то продолжаем     
            const order = this.defaultOrder();
            const newOrder = await this.createOrd(order);
            const newOrderStausHistory = await this.setHistoryStatus('order', order.current_status_id, order.id);

            const detail = this.defaultDetail(product.id, newOrder.id, 100);
            await this.createDtl(detail);
            await this.setHistoryStatus('detail', detail.current_status_id, detail.id);

            return newOrder;
        }
        // -- ошибка - изделие не найдено      
        return product;
    }


    private async getStatusById(id: number): Promise<Status> {
        return await this.statsuRepository.findOne({
            where: { id: id }
        });
    }

    private async getAllStausHistoryOrder(id: number): Promise<StatusOrderHistory[]> {
        let status = await this.statusOrderRepository.find({
            where: { order_id: id }
        });

        if (status) {
            
            return status
        } else {
            // - есил статусов нет, то возвращаем пустой массив
            
            return status = [];
        }
    }
// ------------------Скорее это создание первого статуса 
// -- или нет?
// -- короче, потом будем думать, как изменять статус. С заказом вроде понятно, а вот как с деталями, пока хз. ID вроде нормально подходит. Но я чот все переделал


    private async setHistoryStatus(type: string, currentStatusId: number, id: number) {

        if (type === 'order') {
            const status = new StatusOrderHistory;
            status.order_id = id;
            status.staus_id = currentStatusId;
            status.start_date = new Date();


            // - нужно выбрать все статусы из Хистори, по текущему заказу
            // - если currentStatusId нет, то предыдущий статус закрыть - задать end_date
            // - потом создать новый статус = currentStatusId

            
            // --------------- Думаю, что обновление статусов придется делать отдельно. 


            const status$ = await this.getAllStausHistoryOrder(id);
            if (status$.length > 0) {
                // -- если массив содержит записи, то взять последнюю запись, обновить дату окончания и вставить новую запись.
                const last = status$.pop();
                const endDate = new Date();

                try {
                    return await this.statusOrderRepository.update(last.id, { end_date: endDate });

                } catch (e) {
                    console.log(' update order', e);
                }
            }

            try {
                return await this.statusOrderRepository.save(status);
            } catch (e) {
                console.log('insert order', e);
            }
            // -- закончили с заказом
        }

        if (type === 'detail') {
            // -- только добавляем статус, не обновляем. История статуса будет обнавляться при явном изменении статуса детали заказа
            const status = new StatusDetailHistory;
            status.detail_id = id;
            status.staus_id = currentStatusId;
            status.start_date = new Date();

            // TODO: нужно сделать выборку всех статусов из истории статусов деталей по какому-то признаку... 
            // это самая большая проблема, потомучто ID изделия не уникальный параметр. Будет каша.
            // я не знаю, как разрулить этот момент. 
            // Может быть, вопрос решит введение параметра part, который будет уникально идентифицировать изделие.
            

            try {

                return await this.statusDetailRepository.save(status);
            } catch (e) {
                console.log('insert detail  - ', e);
            }

        }
    }

    private async findDetailById(id: any) {
        return await this.orderDetailRepository.findByIds(id, {take: 1})
    }

    public async updateDetailPrice(id: number, price: number) {

        const exist = await this.findDetailById(id);

        // console.log(' Обновление детали заказа' ,exist);

        if (exist) {
            await this.orderDetailRepository.query('update order_detail set price =? where id =?', [price, id]);

            return await this.findDetailById(id);

        } else {

            return 'Запись для обновления не найдена';
        }

    }

    public async updateDetailNote(id: number, note: string) {
        const exist = await this.findDetailById(id);
                
        if(!exist) {
            return 'Запись для обновления не найдена';
        };

        if (note === '' || note === '...') {

            return 'Значение не подходить для обновления';
        };

       await this.orderDetailRepository.query('update order_detail set note =? where id =?', [note, id])

       return await this.findDetailById(id);
    }

    public async getDetailsByOrder(id: number): Promise<any[]> {
        // TODO - проверка на валидность id order

        const detail$ = await  this.orderDetailRepository.find({
            where: { order_id: id }
        });

        const data: any = detail$;

        await Promise.all(data.map( async item => {
          const currentStatusDescriptopn =  await this.getStatusById(item.current_status_id);
          item.currentStatusDescriptopn =  currentStatusDescriptopn.description; 
                   
          return item;              
      }));

      return data;
    }

    public async deleteDetail(id: number) {
        // TODO - проверка на валидность идентификатора. Есть или нет такая деталь в заказе

        await this.orderDetailRepository.query('delete from order_detail where id =?',[id]);

        return {id: id}
    }


}
