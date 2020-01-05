import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class NoteDashboard1578041051139 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.createTable(new Table({
          name: 'note_dashboards',
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
                    name: 'name',
                    type: 'varchar(255)',
                    isUnique: true,
                    isNullable: false
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('note_dashboards', true);
    }
}
