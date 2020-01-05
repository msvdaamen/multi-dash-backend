import {MigrationInterface, QueryRunner, Table, TableIndex} from 'typeorm';

export class Users1577480161002 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    unsigned: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'email',
                    type: 'varchar(255)',
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: 'username',
                    type: 'varchar(255)',
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: 'password',
                    type: 'varchar(255)',
                    isNullable: false
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('users', true);
    }

}
