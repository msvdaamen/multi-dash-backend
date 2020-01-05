import {Entity, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import {User} from './user.entity';
import {NoteBoard} from './note-board.entity';

@Entity({name: 'user_has_note_board'})
export class UserNoteBoard {

    @PrimaryColumn({name: 'user_id'})
    userId: number;

    @PrimaryColumn({name: 'note_board_id'})
    noteBoardId: number;

    @ManyToOne(() => User, user => user.noteBoardsConnection, {primary: true})
    @JoinColumn({name: 'user_id'})
    users: User;

    @ManyToOne(() => NoteBoard, noteDashboard => noteDashboard.lists, {primary: true})
    @JoinColumn({name: 'note_board_id'})
    noteBoards: NoteBoard;
}
