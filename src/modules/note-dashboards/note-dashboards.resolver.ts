import {Args, Context, Parent, Query, ResolveProperty, Resolver} from '@nestjs/graphql';
import {NoteList} from '../../database/entities/note-list.entity';
import {IGraphQLContext} from '../../interfaces/IGraphQLContext.interface';
import {NoteBoard} from '../../database/entities/note-board.entity';
import {NoteDashboardsService} from './note-dashboards.service';
import {FindNoteBoardArgs} from './args/find-note-board.args';
import {User} from '../../database/entities/user.entity';

@Resolver(() => NoteBoard)
export class NoteDashboardsResolver {

    constructor(
        private readonly noteDashboardsService: NoteDashboardsService
    ) { }

    @Query(() => NoteBoard, {nullable: true})
    async noteBoard(@Args() args: FindNoteBoardArgs) {
        return this.noteDashboardsService.find(args.id);
    }

    @ResolveProperty('lists', () => [NoteList])
    async noteLists(@Parent() noteBoard: NoteBoard, @Context() {noteBoardListLoader}: IGraphQLContext) {
        return noteBoardListLoader.load(noteBoard.id);
    }

    @ResolveProperty(() => [User])
    async users(@Parent() noteBoard: NoteBoard, @Context() {noteBoardUsersLoader}: IGraphQLContext) {
        return noteBoardUsersLoader.load(noteBoard.id);
    }
}
