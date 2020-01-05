import {Entity, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import {User} from './user.entity';
import {DashboardItem} from './dashboard-item.entity';

@Entity({name: 'user_has_dashboard_item'})
export class UserDashboardItem {

    @PrimaryColumn({name: 'user_id'})
    userId: number;

    @PrimaryColumn({name: 'dashboard_item_id'})
    dashboardItemId: number;

    @ManyToOne(() => User, user => user.dashboardItemsConnection, {primary: true})
    @JoinColumn({name: 'user_id'})
    users: User;

    @ManyToOne(() => DashboardItem, dashboardItem => dashboardItem.userConnection, {primary: true})
    @JoinColumn({name: 'dashboard_item_id'})
    dashboardItems: DashboardItem;
}
