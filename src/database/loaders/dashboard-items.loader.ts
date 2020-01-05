import {getRepository} from 'typeorm';
import {UserDashboardItem} from '../entities/user-dashboard-item.entity';
import DataLoader = require('dataloader');
import {User} from '../entities/user.entity';

const users = async (dashboardItemIds: number[]) => {
    const dashboardItemUsers = await getRepository(UserDashboardItem)
        .createQueryBuilder('userDashboardItems')
        .leftJoinAndSelect('userDashboardItems.users', 'users')
        .where('userDashboardItems.dashboard_item_id IN(:...ids)', {ids: dashboardItemIds})
        .getMany();
    const dashboardItemIdToUsers: {[key: string]: User[]} = {};
    dashboardItemUsers.forEach(dashboardItemUser => {
        if (!dashboardItemIdToUsers.hasOwnProperty(dashboardItemUser.dashboardItemId)) {
            dashboardItemIdToUsers[dashboardItemUser.dashboardItemId] = [dashboardItemUser.users];
        } else {
            dashboardItemIdToUsers[dashboardItemUser.dashboardItemId].push(dashboardItemUser.users);
        }
    });
    return dashboardItemIds.map(dashboardItemId => dashboardItemIdToUsers.hasOwnProperty(dashboardItemId) ? dashboardItemIdToUsers[dashboardItemId] : []);
};
const dashboardItemUsersLoader = () => new DataLoader(users);

export {
    dashboardItemUsersLoader
};
