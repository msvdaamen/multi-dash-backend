import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../../database/entities/user.entity';
import {Repository} from 'typeorm';
import {JwtService} from '@nestjs/jwt';

import bcrypt = require('bcryptjs');
import {RegisterDto} from './dto/register.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.userRepository.findOne({
            where: {
                email
            }
        });
        if (user) {
            const correct = await bcrypt.compare(password, user.password);
            if (correct) {
                return user;
            }
        }
        return null;
    }

    async login(user: User) {
        const payload = {
            id: user.id,
            email: user.email,
            username: user.username
        };
        const token = this.jwtService.sign(payload);
        return {
            user: payload,
            access_token: token
        };
    }

    async register(registerDto: RegisterDto) {
        const user = new User();
        user.email = registerDto.email;
        user.username = registerDto.username;
        user.password = bcrypt.hashSync(registerDto.password, 10);
        await this.userRepository.insert(user);

        const payload = {
            id: user.id,
            email: user.email,
            username: user.username
        };
        const token = this.jwtService.sign(payload);
        return {
            user: payload,
            access_token: token
        };
    }

    async me(user: User) {
        const payload = {
            id: user.id,
            email: user.email,
            username: user.username
        };
        const token = this.jwtService.sign(payload);
        return {
            user: payload,
            access_token: token
        };
    }

}
