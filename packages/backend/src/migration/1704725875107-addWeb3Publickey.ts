import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddWeb3Publickey1704725875107 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.query(
			`ALTER TABLE "user_profile" ADD "web3Publickey" character varying(128) NOT NULL DEFAULT ''`,
		);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "web3Publickey"`);
	}
}
