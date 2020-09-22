/* eslint-disable @typescript-eslint/camelcase */
import { Controller, HttpStatus } from '@nestjs/common';
import { Get, Post, Put, Delete, Body, Param, Res, HttpException, HttpCode } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { Product, Matter, PMLink, IMGLink } from '../dto/product.dto';
import { ProductService } from '../service/product.service';

@ApiTags('product')
@Controller('product')
export class ProductController {

    constructor (private productService: ProductService) {}

    @Get()
    @HttpCode(200)
    public async getAllProduct(): Promise<Product[]> {
        return await this.productService.getAllProduct();
    }

    @Get(':jwgroup/group')
    @HttpCode(200)
    public async getProductByGroup(@Param('jwgroup') jwgroup: number): Promise<Product[]> {
        return await this.productService.getProductByGroup(jwgroup);
    }

    @Post('create')
    @HttpCode(201)
    public async createProduct(@Body() productData: Product){

        try {
            const {name, description, weight, matter, stone, stone_number, thumbnail, jwgroup} = productData;

            return await this.productService.createProduct({name, description, weight, matter, stone, stone_number, thumbnail, jwgroup})

        } catch (e) {
            throw new HttpException('Error create product', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    } 

    @Put(':id')
    @HttpCode(200)
    public async updateProduct(
        @Param('id') id: number,
        @Body() productData: Product,
        @Res() res: Response
    ) {
        try {

            const {name, description, weight, matter, stone, stone_number, thumbnail, jwgroup} = productData;

            return await this.productService.updateProduct(id, {name, description, weight, matter, stone, stone_number, thumbnail, jwgroup});

        } catch (e) {
            throw new HttpException('Error update product', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id/delete')
    @HttpCode(200)
    public async deleteProduct(
        @Param('id') id: number,
        @Res() res: Response
    ) {
        try {

            return await this.productService.deleteProduct(id);

        } catch (e) {
            throw new HttpException('Error delete product', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
