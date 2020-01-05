import {Context, Parent, Query, ResolveProperty, Resolver} from '@nestjs/graphql';
import {User} from '../../database/entities/user.entity';
import {DashboardItem} from '../../database/entities/dashboard-item.entity';
import {IGraphQLContext} from '../../interfaces/IGraphQLContext.interface';
import {DashboardItemsService} from './dashboard-items.service';

@Resolver(DashboardItem)
export class DashboardItemsResolver {

    constructor(
        private dashboardItemService: DashboardItemsService
    ) {
    }

    @Query(() => [DashboardItem])
    async dashboardItems() {
        return this.dashboardItemService.all();
    }


    @ResolveProperty(() => [User])
    async users(@Parent() dashboardItem: DashboardItem, @Context() {dashboardItemUsersLoader}: IGraphQLContext) {
        return dashboardItemUsersLoader.load(dashboardItem.id);
    }

}
