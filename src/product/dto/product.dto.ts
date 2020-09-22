import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator'

@Entity({ name: 'product' })
export class Product {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    name: string;    

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    weight: number;
   
    @ApiProperty()
    @IsNotEmpty()
    @Column()
    matter: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    stone: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    stone_number: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    thumbnail: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @Column()
    jwgroup: number;
}


export class ProductUpload {
    @ApiProperty()    
    name: string;    

    @ApiProperty()    
    description: string;

    @ApiProperty()
    weight: number;
   
    @ApiProperty()
    matter: number;

    @ApiProperty()
    stone: string;

    @ApiProperty()
    stone_number: number;
       
    @ApiProperty()
    jwgroup: number;

    @ApiProperty({ type: 'string', format: 'binary' })
    @IsNotEmpty()    
    file: any;   
}

@Entity({ name: 'matter' })
export class Matter {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    name: string;    
}

@Entity({ name: 'pm_link' })
export class PMLink {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    id_product: number;    

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    id_matter: number;    
}

@Entity({ name: 'img_link' })
export class IMGLink {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    id_product: number;    

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    path: string;    
}