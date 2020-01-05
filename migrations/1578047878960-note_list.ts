import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class NoteList1578047878960 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'note_list',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    unsigned: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isPrimary: true
                },
                {
                    name: 'note_dashboard_id',
                    type: 'int',
                    unsigned: true
                },
                {
                    name: 'name',
                    type: 'varchar(255)',
                    isUnique: true,
                    isNullable: false
                }
            ]
        }));

        await queryRunner.createForeignKey('note_list', new TableForeignKey({
            columnNames: ['note_dashboard_id'],
            referencedTableName: 'note_dashboards',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('note_list', true);
    }

}
