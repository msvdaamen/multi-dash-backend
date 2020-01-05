import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class Notes1578218040113 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'notes',
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
                    name: 'note_list_id',
                    type: 'int',
                    unsigned: true
                },
                {
                    name: 'title',
                    type: 'varchar(255)',
                    isNullable: false
                },
                {
                    name: 'description',
                    type: 'text'
                }
            ]
        }));

        await queryRunner.createForeignKey('notes', new TableForeignKey({
            columnNames: ['note_list_id'],
            referencedTableName: 'note_lists',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('notes', true);
    }

}
