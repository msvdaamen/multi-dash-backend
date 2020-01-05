import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../../database/entities/user.entity';
import {jwtConstants} from './constants';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {LocalStrategy} from './local.stragety';
import {JwtStrategy} from './jwt.stragety';
import {AuthController} from './auth.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '4h' },
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
