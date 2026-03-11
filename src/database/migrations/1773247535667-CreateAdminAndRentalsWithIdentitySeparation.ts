import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAdminAndRentalsWithIdentitySeparation1773247535667 implements MigrationInterface {
  name = 'CreateAdminAndRentalsWithIdentitySeparation1773247535667';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rentals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "retendAt" TIMESTAMP NOT NULL, "returnDeadline" TIMESTAMP NOT NULL, "userId" uuid NOT NULL, "bookId" uuid NOT NULL, CONSTRAINT "PK_2b10d04c95a8bfe85b506ba52ba" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "phone" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "rentals" ADD CONSTRAINT "FK_ffe1d7b0b585885667954522513" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rentals" ADD CONSTRAINT "FK_63280a29e63109a052767f95134" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rentals" DROP CONSTRAINT "FK_63280a29e63109a052767f95134"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rentals" DROP CONSTRAINT "FK_ffe1d7b0b585885667954522513"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "admin"`);
    await queryRunner.query(`DROP TABLE "rentals"`);
  }
}
