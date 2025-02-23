import type { MigrationInterface, QueryRunner } from "typeorm";

export class v1261579993013959 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "antenna" DROP COLUMN "hasNewNote"`,
			undefined,
		);
		await queryRunner.query(
			`ALTER TABLE "antenna_note" ADD "read" boolean NOT NULL DEFAULT false`,
			undefined,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_9937ea48d7ae97ffb4f3f063a4" ON "antenna_note" ("read") `,
			undefined,
		);
	}
	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`DROP INDEX "IDX_9937ea48d7ae97ffb4f3f063a4"`,
			undefined,
		);
		await queryRunner.query(
			`ALTER TABLE "antenna_note" DROP COLUMN "read"`,
			undefined,
		);
		await queryRunner.query(
			`ALTER TABLE "antenna" ADD "hasNewNote" boolean NOT NULL DEFAULT false`,
			undefined,
		);
	}
}
