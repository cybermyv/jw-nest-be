import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'status_detail_history'})
export class StatusDetailHistory {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number;

    @ApiProperty()    
    @Column()
    detail_id: number;    

    @ApiProperty()    
    @Column({ default: null, nullable: true })
    start_date: Date;  

    @ApiProperty()    
    @Column({ default: null, nullable: true })
    end_date: Date;

    @ApiProperty()    
    @Column()
    staus_id: number;   
}