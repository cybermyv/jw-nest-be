import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Product, Matter, PMLink, IMGLink } from '../dto/product.dto';



@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,

        @InjectRepository(Matter)
        private matterRepository: Repository<Matter>,

        @InjectRepository(PMLink)
        private pmlinkRepository: Repository<PMLink>,

        @InjectRepository(IMGLink)
        private imglinkRepository: Repository<IMGLink>,
    ) { }

    private async findId(id: number): Promise<Product> {
        return await this.productRepository.findOne(id);
    }

    public async getAllProduct(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    public async getProductByGroup(jwgroup: number): Promise<Product[]> {

        if (jwgroup === 0) { return await this.productRepository.find() }
        else {

            return await this.productRepository.find({
                where: { jwgroup: jwgroup }
            })
        }
    }

    public async getProductById(id: number): Promise<Product | string> {
        const result = await this.findId(id);

        if (result) {
            return result;
        } else {
            return 'Изделие не найденo';
        }
    }

    public async createProduct(product: Product): Promise<Product> {
        return await this.productRepository.save(product);
    }

    public async updateProduct(id: number, product: Partial<Product>) {
        const exist = await this.findId(id);

        if (exist) {
            await this.productRepository.query('update product set name =?, description =?, weight =?, matter =?, stone =?, stone_number =?, jwgroup =?, price =? where id =?', [
                product.name, product.description, product.weight, product.matter, product.stone, product.stone_number, product.jwgroup, product.price, id]);

            const result = await this.findId(id);

            return result;
        } else {

            return 'Запись для обновления не найдена';
        }

    }

    public async deleteProduct(id: number) {
        const exist = await this.findId(id);

        if (exist) {
            await this.productRepository.query('delete from product where id =?', [id]);

            return { id: id }
        } else {

            return 'Запись для удаления не найдена';
        }
    }

    public async addImageLink(id: number, path: string): Promise<IMGLink> {
        return await this.productRepository.query('insert into img_link (id_product, path) values(?, ?)', [id, path]);
    }

    // --- вариант с query  и join

    // select a.*, g.name, m.name 
    // from product as a
    // left join jwgroup as g on a.jwgroup = g.id
    // left join matter as m on a.matter=m.id
    // / -- если я правильно понимаю, то так мы ничего не сджоним.
    // Во-первых - @Entity ({ name: 'izdelie' }) - должна быть таблица такая. Ее у нас естественно, нет.
    //  Во-вторых в product должно быть поле groupsId - еще и воторичный ключ. 
    // Либо мы переписываем сейчас таблицы, либо мы оставляем это все дело на обычных джойнах.

    // можно, конечно, создать таблицу, поучиться. Но как-то не охото. 
    // следующую таблиц можно сделать уже по другом. 

    // мы будем делать журнал заказов, там все и сделаем.


    public async getAllCompositeQuery(): Promise<Product[]> {

        return await this.productRepository.query("select a.*, g.name as gr, m.name as mat from product as a left join jwgroup as g on a.jwgroup = g.id left join matter as m on a.matter=m.id")
    }

   

}
