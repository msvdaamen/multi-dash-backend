import { Module } from '@nestjs/common';
import { NoteListsService } from './note-lists.service';
import { NoteListsResolver } from './note-lists.resolver';

@Module({
  providers: [NoteListsService, NoteListsResolver]
})
export class NoteListsModule {}
