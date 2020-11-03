import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'order_detail'})
export class OrderDetail {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number;

    @ApiProperty()    
    @Column()
    order_id: number;   

    @ApiProperty()    
    @Column()
    product_id: number;   

    @ApiProperty()    
    @Column()
    price: number;   

    @ApiProperty()    
    @Column()
    note: string;    

    @ApiProperty()    
    @Column()
    current_status_id: number;    
}