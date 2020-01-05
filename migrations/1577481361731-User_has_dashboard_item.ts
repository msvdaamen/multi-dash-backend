import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex, TableUnique} from 'typeorm';

export class UserHasDashboardItem1577481361731 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'user_has_dashboard_item',
            columns: [
                {
                    name: 'user_id',
                    type: 'int',
                    unsigned: true
                },
                {
                    name: 'dashboard_item_id',
                    type: 'int',
                    unsigned: true
                }
            ]
        }));

        await queryRunner.createForeignKey('user_has_dashboard_item', new TableForeignKey({
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('user_has_dashboard_item', new TableForeignKey({
            columnNames: ['dashboard_item_id'],
            referencedTableName: 'dashboard_items',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE'
        }));

        await queryRunner.createIndex('user_has_dashboard_item', new TableIndex({
            name: 'unique_user_id_dashboard_item_id',
            columnNames: ['user_id', 'dashboard_item_id'],
            isUnique: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('user_has_dashboard_item', true);
    }

}
