/* eslint-disable @typescript-eslint/camelcase */
import { Controller, HttpStatus } from '@nestjs/common';
import { Get, Post, Put, Delete, Body, Param, Res, HttpException, HttpCode } from '@nestjs/common';
import { UseInterceptors, UploadedFile, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { diskStorage } from 'multer';
import * as fs from 'fs';

import { Product, ProductUpload, Matter, PMLink, IMGLink } from '../dto/product.dto';
import { ProductService } from '../service/product.service';

@ApiTags('product')
@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) { }

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
    public async createProduct(@Body() productData: Product) {

        console.log(productData);

        try {
            const { name, description, weight, matter, stone, stone_number, thumbnail, jwgroup } = productData;

            return await this.productService.createProduct({ name, description, weight, matter, stone, stone_number, thumbnail, jwgroup })

        } catch (e) {
            throw new HttpException('Error create product', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('product-upload')
    @HttpCode(201)
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Создание нового продукта с загрузкой файла',
        type: ProductUpload,
    })

    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: 'dbase/tmp_img',
            filename: (req: any, file: any, cb: any) => {
                cb(null, `${file.originalname}`);
            }
        }),
    }))

    public async uploadProduct(
        @Body() product: ProductUpload,
        @UploadedFile() file) {



        if (!file) {
            throw new HttpException('Error upload file', HttpStatus.INTERNAL_SERVER_ERROR);

            return;
        }

        const image = file;
        const path = image.path;
        const fileName = image.originalname;



        // -- создать из файла base64, подсунуть его в thumbnail
        const thumb = fs.readFileSync(path).toString('base64');
        console.log('thumb', thumb.slice(0, 255));

        
            // throw new HttpException('Error upload file', HttpStatus.INTERNAL_SERVER_ERROR);
        


        try {
            const { name, description, weight, matter, stone, stone_number, jwgroup, thumb } = product;




            // -- создать новый продукт 1. смаппить product на структуру для записи. 2. сохранить. 3. вернуть id_product



            return await product;

        } catch (e) {
            throw new HttpException('Error save product', HttpStatus.INTERNAL_SERVER_ERROR);

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

            const { name, description, weight, matter, stone, stone_number, thumbnail, jwgroup } = productData;

            return await this.productService.updateProduct(id, { name, description, weight, matter, stone, stone_number, thumbnail, jwgroup });

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
