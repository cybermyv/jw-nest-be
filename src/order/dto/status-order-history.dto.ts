import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'status_order_history'})
export class StatusOrderHistory {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number;

    @ApiProperty()    
    @Column()
    order_id: number;    

    @ApiProperty()    
    @Column({ default: null, nullable: true })
    start_date?: Date;  

    @ApiProperty()    
    @Column({ default: null, nullable: true })
    end_date?: Date;

    @ApiProperty()    
    @Column()
    staus_id: number;   

}