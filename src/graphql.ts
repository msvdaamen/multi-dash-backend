
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface DashboardItem {
    id: number;
    name: string;
    users: User[];
}

export interface Note {
    id: string;
    title: string;
    description: string;
}

export interface NoteBoard {
    id: number;
    name: string;
    users: User[];
    lists: NoteList[];
}

export interface NoteList {
    id: string;
    name: string;
    notes: Note[];
}

export interface IQuery {
    users(): User[] | Promise<User[]>;
    dashboardItems(): DashboardItem[] | Promise<DashboardItem[]>;
    noteBoard(id: number): NoteBoard | Promise<NoteBoard>;
}

export interface User {
    id: number;
    email: string;
    username: string;
    dashboardItems: DashboardItem[];
    noteBoards: NoteBoard[];
}
