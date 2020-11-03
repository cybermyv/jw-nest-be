import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'status'})
export class Status {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number;

    @ApiProperty()    
    @Column()
    type: string;    

    @ApiProperty()    
    @Column()
    name: string;    

    @ApiProperty()    
    @Column()
    description: number;    

    @ApiProperty()    
    @Column()
    actual: boolean;    

    @ApiProperty()    
    @Column()
    following: boolean;    
}