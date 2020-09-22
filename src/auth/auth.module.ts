import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './service/auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './jwt.constants';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './controller/auth.controller';



@Module({
    imports: [
        UserModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false
        }),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1m' }
            
        })

    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [PassportModule, LocalStrategy, AuthService],
    controllers: [AuthController]
})
export class AuthModule { }
