import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPostTypes1732592414221 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO post_type (id, title) VALUES 
            (1, 'History'),
            (2, 'Food'),
            (3, 'Pets'),
            (4, 'Health'),
            (5, 'Fashion'),
            (6, 'Exercise'),
            (7, 'Others');
          `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM post_type WHERE id IN (1, 2, 3, 4, 5, 6, 7);
          `);
    }

}
