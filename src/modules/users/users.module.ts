import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {UsersResolver} from './users.resolver';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../../database/entities/user.entity';
import {DashboardItem} from '../../database/entities/dashboard-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, DashboardItem])
  ],
  providers: [
    UsersService,
    UsersResolver
  ]
})
export class UsersModule {

}
