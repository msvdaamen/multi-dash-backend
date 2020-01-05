import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DashboardItem} from '../../database/entities/dashboard-item.entity';
import {Repository} from 'typeorm';

@Injectable()
export class DashboardItemsService {

    constructor(
        @InjectRepository(DashboardItem)
        private readonly dashboardItemsRepository: Repository<DashboardItem>
    ) {}

    all() {
        return this.dashboardItemsRepository.find();
    }
}
