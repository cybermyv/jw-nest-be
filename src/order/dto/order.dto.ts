import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'order'})
export class Order {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number;

    @ApiProperty()    
    @Column()
    description: string;    

    @ApiProperty()    
    @Column()
    client_id: number;    

    @ApiProperty()    
    @Column()
    total_cost: number;    

    @ApiProperty()    
    @Column()
    current_status_id: number;    
}