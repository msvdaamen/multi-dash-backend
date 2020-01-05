import {userDashboardItemsLoader, userNoteDashboardsLoader} from 'src/database/loaders/users.loader';
import {dashboardItemUsersLoader} from 'src/database/loaders/dashboard-items.loader';
import {noteBoardListLoader, noteBoardUsersLoader} from 'src/database/loaders/note-board.loader';

export interface IGraphQLContext {
    userDashboardItemsLoader: ReturnType<typeof userDashboardItemsLoader>;
    dashboardItemUsersLoader: ReturnType<typeof dashboardItemUsersLoader>;
    userNoteDashboardsLoader: ReturnType<typeof userNoteDashboardsLoader>;
    noteBoardListLoader: ReturnType<typeof noteBoardListLoader>;
    noteBoardUsersLoader: ReturnType<typeof  noteBoardUsersLoader>;
}
