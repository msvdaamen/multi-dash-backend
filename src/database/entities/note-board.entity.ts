import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Field, ObjectType} from 'type-graphql';
import {User} from './user.entity';
import {UserDashboardItem} from './user-dashboard-item.entity';
import {NoteList} from './note-list.entity';
import {UserNoteBoard} from './user-note-board.entity';

@ObjectType()
@Entity({name: 'note_boards'})
export class NoteBoard {

    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field(() => [User])
    @OneToMany(() => UserNoteBoard, userNoteBoard => userNoteBoard.users)
    users: Promise<User[]>;

    @Field(() => [NoteList])
    @OneToMany(type => NoteList, noteList => noteList.noteBoard)
    lists: NoteList[];
}
