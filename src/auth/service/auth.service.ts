/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/service/user.service';
import { User } from 'src/user/dto/user.dto';




@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        
        const user = await this.userService.findUser(username);

        // console.log('Пользователь - ', user);

        if (user && (await this.passwordsAreEqual(user.password, pass))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
       
            return {
                 token: this.jwtService.sign(payload)               
            };
    }

    private async passwordsAreEqual(hashedPassword: string, plainPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    async register(user: User): Promise<User | string> {
        const result = await this.userService.findUser(user.username);
        if (!result) {
            return await this.userService.createUser(user);
        } else {
            return 'Пользователь с таким именем уже существует'
        }        
    }

}
