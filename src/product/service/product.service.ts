import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Product, Matter, PMLink, IMGLink } from '../dto/product.dto';
import e = require('express');

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

        // console.log('id', id);

        const result  = await this.productRepository.findOne(id);

        // console.log('result', result)

        return result;
    }

    public async getAllProduct(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    public async getProductByGroup(jwgroup: number): Promise<Product[]> {
        if (jwgroup == 0) { return await this.productRepository.find() }
        else {
            return await this.productRepository.find({
                where: { jwgroup: jwgroup }
            })
        }
    }

    public async createProduct(product: Product): Promise<Product> {
        return await this.productRepository.save(product);
    }

    public async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
        return await this.productRepository.query('update product set name =?, description =?, weight =?, matter =?, stone =?, stone_number =?, thumbnail =? where id =?', [
            product.name, product.description, product.weight, product.matter, product.stone, product.stone_number, product.thumbnail, id])

    }

    public async deleteProduct(id: number) {
        const exist = await this.findId(id);

        if(exist) {
            await this.productRepository.query('delete from product where id =?', [id]);

            return {id: id}
        } else {
            
            return 'Запись для удаления не найдена';
        }
    }

    public async addImageLink(id: number, path: string): Promise<IMGLink> {
        return await this.productRepository.query('insert into img_link (id_product, path) values(?, ?)', [id, path]);
    }


}
