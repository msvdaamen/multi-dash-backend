import DataLoader = require('dataloader');
import {getRepository} from 'typeorm';
import {NoteList} from '../entities/note-list.entity';
import {Note} from '../entities/note.entity';

const notes = async (listIds: number[]) => {
    const noteLists = await getRepository(NoteList)
        .createQueryBuilder('noteLists')
        .leftJoinAndSelect('noteLists.notes', 'notes')
        .whereInIds(listIds)
        .getMany();
    const noteListsIdToNotes: {[key: string]: Note[]} = {};
    noteLists.forEach(noteList => {
        noteListsIdToNotes[noteList.id] = noteList.notes;
    });
    return listIds.map(listId => noteListsIdToNotes.hasOwnProperty(listId) ? noteListsIdToNotes[listId] : []);
};

const noteListNoteLoader = () => new DataLoader(notes);

export {
    noteListNoteLoader
};
