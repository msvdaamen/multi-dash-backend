import {Field, ID, ObjectType} from 'type-graphql';
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {NoteBoard} from './note-board.entity';

@ObjectType()
@Entity({name: 'note_list'})
export class NoteList {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Column({primary: true, name: 'note_board_id'})
    noteBoardId: number;

    @Field()
    @Column()
    name: string;

    @ManyToOne(() => NoteBoard, noteDashboard => noteDashboard.lists)
    @JoinColumn({name: 'note_board_id'})
    noteBoard: Promise<NoteBoard>;
}
