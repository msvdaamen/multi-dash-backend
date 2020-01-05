import { Module } from '@nestjs/common';
import { NoteDashboardsResolver } from './note-dashboards.resolver';
import { NoteDashboardsService } from './note-dashboards.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {NoteBoard} from '../../database/entities/note-board.entity';

@Module({
  providers: [
      NoteDashboardsResolver,
      NoteDashboardsService
  ],
  imports: [
      TypeOrmModule.forFeature([
          NoteBoard
      ])
  ]
})
export class NoteDashboardsModule {}
