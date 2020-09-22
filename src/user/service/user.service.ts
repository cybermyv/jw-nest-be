import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../dto/user.dto';

@Injectable()
export class UserService {

    constructor( 
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async findUser( username: string): Promise<User | undefined> {
        return await this.userRepository.findOne({where: {username}});
    }

    async createUser (user: User): Promise<User> {

        const newUser = Object.assign(new User(), user);

        return await this.userRepository.save(newUser);

    }
}
