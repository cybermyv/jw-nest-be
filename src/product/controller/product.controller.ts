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

    @Get('query')
    @HttpCode(200)
    public async getAllQuery(): Promise<Product[]> {
        return await this.productService.getAllCompositeQuery();
    }

    @Get(':id')
    @HttpCode(200)
    public async getProductById(@Param('id') id: number, @Res() res: Response): Promise<Product | object> {
        try {
           const result = await this.productService.getProductById(id);

            if(result instanceof Object) {
                return res.status(HttpStatus.OK).json(result);   
            }

            return res.status(HttpStatus.NOT_FOUND).json({error: result});

        } catch(e) {
            throw new HttpException('Error fetch product', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':jwgroup/group')
    @HttpCode(200)
    public async getProductByGroup(@Param('jwgroup') jwgroup: number): Promise<Product[]> {
        return await this.productService.getProductByGroup(jwgroup);
    }

    @Post('create')
    @HttpCode(201)
    public async createProduct(@Body() productData: Product) {
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

    // --------------------------- пример задания имени файла --------------------------------------
    // @UseInterceptors(FileInterceptor('file', {
    //     storage: diskStorage({
    //       destination: './uploads'
    //       , filename: (req, file, cb) => {
    //         // Generating a 32 random chars long string
    //         const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
    //         //Calling the callback passing the random name generated with the original extension name
    //         cb(null, `${randomName}${extname(file.originalname)}`)
    //       }
    //     })
    //   }))
    //   async upload( @UploadedFile() file) {
    //     console.log(file)
    //   }
    // ------------------------------------------------------------------------------------------------

    public async uploadProduct(
        @Body() product: ProductUpload,
        @UploadedFile() file) {        
            if (file) {
                const image = file;
                const path = image.path;
                const fileName = image.originalname;

                // -- создать из файла base64, подсунуть его в thumbnail
                const thumb = fs.readFileSync(path).toString('base64');    
                const prefix = 'data:' + image.mimetype + ';base64,';           
                
                try {
                    const thumbnail: string = prefix + thumb;
                    const { name, description, weight, matter, stone, stone_number, jwgroup, file } = product;
                    const newProduct =  await this.productService.createProduct({ name, description, weight, matter, stone, stone_number, thumbnail, jwgroup });
                    const newImageLink = await this.productService.addImageLink(newProduct.id, path);

                } catch (e) {
                    throw new HttpException('Error save product', HttpStatus.INTERNAL_SERVER_ERROR);
                }

            } else {
                console.log('file not upload');
                throw new HttpException('Error upload file', HttpStatus.INTERNAL_SERVER_ERROR);
            }

            const { name, description, weight, matter, stone, stone_number, jwgroup } = product;
    }


    @Put(':id')
    @HttpCode(200)
    public async updateProduct(
        @Param('id') id: number,
        @Body() productData: Product,
        @Res() res: Response
    ) {
        try {
            const { name, description, weight, matter, stone, stone_number, jwgroup } = productData;

            const result = await this.productService.updateProduct(id, { name, description, weight, matter, stone, stone_number, jwgroup });

            if(result instanceof Product) {
                return res.status(HttpStatus.OK).json({data: result})
            }

            return res.status(HttpStatus.NOT_FOUND).json({error: result})

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
        
        // -- при удалении изделия надо удалять картинку из хранилища 
        try {

            const result = await this.productService.deleteProduct(id);
            
            if(result instanceof Object) {
                return res.status(HttpStatus.OK).json({data: result});   
            }

            return res.status(HttpStatus.NOT_FOUND).json({error: result});

        } catch (e) {
            throw new HttpException('Error delete product', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
