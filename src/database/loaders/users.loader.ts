import DataLoader = require('dataloader');
import {getRepository} from 'typeorm';
import {UserDashboardItem} from '../entities/user-dashboard-item.entity';
import {DashboardItem} from '../entities/dashboard-item.entity';
import {NoteBoard} from '../entities/note-board.entity';
import {UserNoteBoard} from '../entities/user-note-board.entity';

const dashboardItems = async (userIds: number[]) => {
    const userDashboardItems = await getRepository(UserDashboardItem)
        .createQueryBuilder('userDashboardItems')
        .leftJoinAndSelect('userDashboardItems.dashboardItems', 'dashboardItems')
        .where('userDashboardItems.user_id IN(:...ids)', {ids: userIds})
        .getMany();
    const userIdToDashboardItems: {[key: string]: DashboardItem[]} = {};
    userDashboardItems.forEach(userDashboardItem => {
        if (!userIdToDashboardItems.hasOwnProperty(userDashboardItem.userId)) {
            userIdToDashboardItems[userDashboardItem.userId] = [userDashboardItem.dashboardItems];
        } else {
            userIdToDashboardItems[userDashboardItem.userId].push(userDashboardItem.dashboardItems);
        }
    });
    return userIds.map(userId => userIdToDashboardItems.hasOwnProperty(userId) ? userIdToDashboardItems[userId] : []);
};

const noteDashboards = async (userIds: number[]) => {
    const userNoteDashboards = await getRepository(UserNoteBoard)
        .createQueryBuilder('userNoteDashboards')
        .leftJoinAndSelect('userNoteDashboards.noteBoards', 'noteBoards')
        .where('userNoteDashboards.user_id IN(:...ids)', {ids: userIds})
        .getMany();
    const userIdToNoteBoards: {[key: string]: NoteBoard[]} = {};
    userNoteDashboards.forEach(userNoteBoard => {
        if (!userIdToNoteBoards.hasOwnProperty(userNoteBoard.userId)) {
            userIdToNoteBoards[userNoteBoard.userId] = [userNoteBoard.noteBoards];
        } else {
            userIdToNoteBoards[userNoteBoard.userId].push(userNoteBoard.noteBoards);
        }
    });
    return userIds.map(userId => userIdToNoteBoards.hasOwnProperty(userId) ? userIdToNoteBoards[userId] : []);
};

const userDashboardItemsLoader = () => new DataLoader(dashboardItems);
const userNoteDashboardsLoader = () => new DataLoader(noteDashboards);

export {
    userDashboardItemsLoader,
    userNoteDashboardsLoader
};
