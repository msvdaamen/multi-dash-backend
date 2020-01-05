import { Module } from '@nestjs/common';
import { DashboardItemsService } from './dashboard-items.service';
import { DashboardItemsResolver } from './dashboard-items.resolver';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DashboardItem} from '../../database/entities/dashboard-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DashboardItem])
  ],
  providers: [
    DashboardItemsService,
    DashboardItemsResolver
  ]
})
export class DashboardItemsModule {}
