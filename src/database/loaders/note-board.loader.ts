import DataLoader = require('dataloader');
import {getRepository} from 'typeorm';
import {NoteList} from '../entities/note-list.entity';
import {NoteBoard} from '../entities/note-board.entity';
import {User} from '../entities/user.entity';
import {UserNoteBoard} from '../entities/user-note-board.entity';

const noteLists = async (noteDashboardIds: number[]) => {
    const noteDashboards = await getRepository(NoteBoard)
        .createQueryBuilder('noteBoard')
        .leftJoinAndSelect('noteBoard.lists', 'lists')
        .whereInIds(noteDashboardIds)
        .getMany();
    const noteDashboardIdToLists: {[key: string]: NoteList[]} = {};
    noteDashboards.forEach(noteDashboard => {
        noteDashboardIdToLists[noteDashboard.id] = noteDashboard.lists;
    });
    return noteDashboardIds.map(noteDashboardId => noteDashboardIdToLists.hasOwnProperty(noteDashboardId) ? noteDashboardIdToLists[noteDashboardId] : []);
};

const users = async (noteDashboardIds: number[]) => {
    const dashboardItemUsers = await getRepository(UserNoteBoard)
        .createQueryBuilder('UserNoteBoard')
        .leftJoinAndSelect('UserNoteBoard.users', 'users')
        .where('UserNoteBoard.note_board_id IN(:...ids)', {ids: noteDashboardIds})
        .getMany();
    const noteBoardIdToUsers: {[key: string]: User[]} = {};
    dashboardItemUsers.forEach(dashboardItemUser => {
        if (!noteBoardIdToUsers.hasOwnProperty(dashboardItemUser.noteBoardId)) {
            noteBoardIdToUsers[dashboardItemUser.noteBoardId] = [dashboardItemUser.users];
        } else {
            noteBoardIdToUsers[dashboardItemUser.noteBoardId].push(dashboardItemUser.users);
        }
    });
    return noteDashboardIds.map(dashboardItemId => noteBoardIdToUsers.hasOwnProperty(dashboardItemId) ? noteBoardIdToUsers[dashboardItemId] : []);
};


const noteBoardListLoader = () => new DataLoader(noteLists);
const noteBoardUsersLoader = () => new DataLoader(users);

export {
    noteBoardListLoader,
    noteBoardUsersLoader
};
