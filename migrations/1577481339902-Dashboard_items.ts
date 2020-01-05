import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class DashboardItems1577481339902 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'dashboard_items',
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

        await queryRunner.query("insert into dashboard_items (name) values ('notes')");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('dashboard_items', true);
    }

}
