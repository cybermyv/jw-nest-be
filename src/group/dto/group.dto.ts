import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator'

@Entity({ name: 'jwgroup' })
export class Group {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id?: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    isVisible: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    description: string;
}