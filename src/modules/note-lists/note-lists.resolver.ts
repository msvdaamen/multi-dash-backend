import {Context, Parent, ResolveProperty, Resolver} from '@nestjs/graphql';
import {Note} from '../../database/entities/note.entity';
import {NoteList} from '../../database/entities/note-list.entity';
import {IGraphQLContext} from '../../interfaces/IGraphQLContext.interface';

@Resolver(NoteList)
export class NoteListsResolver {

    @ResolveProperty(() => [Note])
    async notes(@Parent() list: NoteList, @Context() {noteListNoteLoader}: IGraphQLContext) {
        return noteListNoteLoader.load(list.id);
    }
}
