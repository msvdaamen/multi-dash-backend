import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {NoteBoard} from '../../database/entities/note-board.entity';
import {Repository} from 'typeorm';

@Injectable()
export class NoteDashboardsService {

    constructor(
        @InjectRepository(NoteBoard)
        private readonly noteBoardRepository: Repository<NoteBoard>
    ) {}


    async find(noteBoardId) {
        return await this.noteBoardRepository.findOne(noteBoardId);
    }
}
