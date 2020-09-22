import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('user')
export class User {
      
    @ApiProperty()
    @PrimaryGeneratedColumn() id?: number;

    @ApiProperty()
    @Column({ nullable: false, unique: true }) username: string;
    
    @BeforeInsert()
    async hashPassword() {
       this.password = await bcrypt.hash(this.password, 10);
    }
    
    @ApiProperty()
    @Column({ nullable: false }) password: string;

}