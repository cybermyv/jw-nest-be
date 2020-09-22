import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { ProductService } from './service/product.service';
import { Product, Matter, PMLink, IMGLink } from './dto/product.dto';
import { ProductController } from './controller/product.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, Matter, PMLink, IMGLink])
      ],
    providers: [ProductService],
    controllers: [ProductController],
})
export class ProductModule {}
