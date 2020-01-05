import {userDashboardItemsLoader, userNoteDashboardsLoader} from 'src/database/loaders/users.loader';
import {dashboardItemUsersLoader} from 'src/database/loaders/dashboard-items.loader';
import {noteBoardListLoader, noteBoardUsersLoader} from 'src/database/loaders/note-board.loader';
import {noteListNoteLoader} from 'src/database/loaders/note-list.loader';

export interface IGraphQLContext {
    userDashboardItemsLoader: ReturnType<typeof userDashboardItemsLoader>;
    userNoteDashboardsLoader: ReturnType<typeof userNoteDashboardsLoader>;

    dashboardItemUsersLoader: ReturnType<typeof dashboardItemUsersLoader>;

    noteBoardListLoader: ReturnType<typeof noteBoardListLoader>;
    noteBoardUsersLoader: ReturnType<typeof  noteBoardUsersLoader>;

    noteListNoteLoader: ReturnType<typeof noteListNoteLoader>;
}
