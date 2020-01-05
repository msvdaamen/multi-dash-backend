import {Field, ID, ObjectType} from 'type-graphql';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {NoteBoard} from './note-board.entity';
import {Note} from './note.entity';

@ObjectType()
@Entity({name: 'note_lists'})
export class NoteList {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'note_board_id'})
    noteBoardId: number;

    @Field()
    @Column()
    name: string;

    @ManyToOne(() => NoteBoard, noteDashboard => noteDashboard.lists)
    @JoinColumn({name: 'note_board_id'})
    noteBoard: Promise<NoteBoard>;

    @Field(() => [Note])
    @OneToMany(() => Note, note => note.list)
    notes: Note[];
}
