import {Context, Info, Parent, Query, ResolveProperty, Resolver} from '@nestjs/graphql';
import {UseGuards} from '@nestjs/common';
import {GqlAuthGuard} from '../auth/GqlAuthGuard';
import {UsersService} from './users.service';
import {User} from '../../database/entities/user.entity';
import {DashboardItem} from '../../database/entities/dashboard-item.entity';
import {IGraphQLContext} from '../../interfaces/IGraphQLContext.interface';
import {NoteBoard} from '../../database/entities/note-board.entity';

@Resolver(User)
export class UsersResolver {

    constructor(
        private userService: UsersService
    ) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => [User])
    async users(@Info() info) {
        return this.userService.users();
    }

    @ResolveProperty(() => [DashboardItem])
    async dashboardItems(@Parent() user: User, @Context() {userDashboardItemsLoader}: IGraphQLContext) {
        return userDashboardItemsLoader.load(user.id);
    }

    @ResolveProperty(() => [NoteBoard])
    async noteBoards(@Parent() user: User, @Context() {userNoteDashboardsLoader}: IGraphQLContext) {
        return userNoteDashboardsLoader.load(user.id);
    }
}
