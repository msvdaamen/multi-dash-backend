import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import {DatabaseModule} from './database/database.module';
import {GraphQLModule} from '@nestjs/graphql';
import {join} from 'path';
import {GqlAuthGuard} from './modules/auth/GqlAuthGuard';
import {ConfigModule} from '@nestjs/config';
import { DashboardItemsModule } from './modules/dashboard-items/dashboard-items.module';
import {userDashboardItemsLoader, userNoteDashboardsLoader} from './database/loaders/users.loader';
import {dashboardItemUsersLoader} from './database/loaders/dashboard-items.loader';
import { NoteDashboardsModule } from './modules/note-dashboards/note-dashboards.module';
import {noteBoardListLoader, noteBoardUsersLoader} from './database/loaders/note-board.loader';
import {noteListNoteLoader} from './database/loaders/note-list.loader';
import { NoteListsModule } from './modules/note-lists/note-lists.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts')
      },
      autoSchemaFile: 'schema.graphql',
      context: ({ req }) => ({
        req,
        userDashboardItemsLoader: userDashboardItemsLoader(),
        dashboardItemUsersLoader: dashboardItemUsersLoader(),
        userNoteDashboardsLoader: userNoteDashboardsLoader(),
        noteBoardListLoader: noteBoardListLoader(),
        noteBoardUsersLoader: noteBoardUsersLoader(),
        noteListNoteLoader: noteListNoteLoader()
      }),
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DashboardItemsModule,
    NoteDashboardsModule,
    NoteListsModule
  ],
  controllers: [AppController],
  providers: [AppService, GqlAuthGuard],
})
export class AppModule {}
