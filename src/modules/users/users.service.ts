import { Injectable } from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../../database/entities/user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async users() {
        return this.userRepository.find();
    }

    async dashboardItems(userId: number) {
        const user = await this.userRepository
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.dashboardItems', 'dashboardItems')
            .where('users_dashboardItems.user_id = :user_id', {user_id: userId})
            .getOne();
        if (!user) {
            return [];
        }
        return user.dashboardItems;
    }

}
