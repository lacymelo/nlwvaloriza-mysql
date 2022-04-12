import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCompliments1646924116930 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "compliments",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true
                    },

                    {
                        name: "user_sender",
                        type: "varchar",
                    },

                    {
                        name: "user_receiver",
                        type: "varchar",
                    },

                    {
                        name: "tag_id",
                        type: "varchar"
                    },

                    {
                        name: "message",
                        type: "varchar",
                    },

                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKUserSanderCompliments",
                        columnNames: ["user_sender"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "users",
                    },
                    {
                        name: "FKUserReceiverCompliments",
                        columnNames: ["user_receiver"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "users",
                    },  

                    {
                        name: "FKUserTagCompliments",
                        columnNames: ["tag_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "tags",
                    },  
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("compliments");
    }
}
