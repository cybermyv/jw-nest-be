import { Controller, Request, Res, Post, UseGuards, Body, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from '../service/auth.service';
import { User } from 'src/user/dto/user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @HttpCode(201)
    async login(@Body() user: User) {

        try {
            const { username, password } = user;
            return this.authService.login({ username, password });          

        } catch (e) {
            throw new HttpException('Error create', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Post('register')
    @HttpCode(201)
    async register(
        @Body() user: User,
        @Res() res: Response
    ) {
        try {
            const result = await this.authService.register(user);

            if (result instanceof User) {
                return res.status(HttpStatus.CREATED).json({data: result}) 
            }
            return res.status(HttpStatus.BAD_REQUEST).json({error: result})
        } catch (e) {
            throw new HttpException('Error register new user', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        
    }


}
