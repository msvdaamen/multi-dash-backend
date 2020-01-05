import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {DashboardItem} from './dashboard-item.entity';
import { Field, ObjectType } from 'type-graphql';
import {UserDashboardItem} from './user-dashboard-item.entity';
import {NoteBoard} from './note-board.entity';
import {UserNoteBoard} from './user-note-board.entity';

@ObjectType()
@Entity({name: 'users'})
export class User {

    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    email: string;

    @Field()
    @Column()
    username: string;

    @Column()
    password: string;

    @Field(type => [DashboardItem])
    dashboardItems: DashboardItem[];

    @Field(() => [NoteBoard])
    noteBoards: NoteBoard[];

    @OneToMany(() => UserDashboardItem, userDashboardItem => userDashboardItem.dashboardItems)
    dashboardItemsConnection: Promise<UserDashboardItem[]>;

    @OneToMany(() => UserNoteBoard, userNoteBoard => userNoteBoard.noteBoards)
    noteBoardsConnection: Promise<NoteBoard[]>;

}
