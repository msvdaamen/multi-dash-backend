import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from 'typeorm';

export class UserHasNoteboard1578042908094 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'user_has_note_board',
            columns: [
                {
                    name: 'user_id',
                    type: 'int',
                    unsigned: true
                },
                {
                    name: 'note_board_id',
                    type: 'int',
                    unsigned: true
                }
            ]
        }));
        await queryRunner.createForeignKey('user_has_note_board', new TableForeignKey({
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('user_has_note_board', new TableForeignKey({
            columnNames: ['note_board_id'],
            referencedTableName: 'note_board',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE'
        }));

        await queryRunner.createIndex('user_has_note_board', new TableIndex({
            name: 'unique_user_id_note_board_id',
            columnNames: ['user_id', 'note_board_id'],
            isUnique: true
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('user_has_note_board', true);
    }

}
