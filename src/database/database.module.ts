import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {DashboardItem} from './entities/dashboard-item.entity';
import {UserDashboardItem} from './entities/user-dashboard-item.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot()
    ]
})
export class DatabaseModule {}
