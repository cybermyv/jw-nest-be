import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'clients'})
export class Clients {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number;

    @ApiProperty()
    @Column()
    fullname: string;

    @ApiProperty()
    @Column()
    phone: string;

    @ApiProperty()
    @Column()
    email: string;
    
    @ApiProperty()
    @Column()
    address: string;
    

    @ApiProperty()
    @Column()
    note: string;
}