import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Field, ID, ObjectType} from 'type-graphql';
import {NoteList} from './note-list.entity';

@ObjectType()
@Entity({name: 'notes'})
export class Note {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'note_list_id'})
    noteListId: number;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    description: string;

    @ManyToOne(() => NoteList, noteList => noteList.notes)
    @JoinColumn({name: 'note_list_id'})
    list: NoteList;
}
