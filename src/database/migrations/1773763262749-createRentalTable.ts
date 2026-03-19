import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRentalTable1773763262749 implements MigrationInterface {
    name = 'CreateRentalTable1773763262749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" RENAME COLUMN "available" TO "genre"`);
        await queryRunner.query(`CREATE TYPE "public"."rentals_status_enum" AS ENUM('reserved', 'borrowed', 'returned', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "rentals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "book_id" uuid NOT NULL, "reservedAt" TIMESTAMP NOT NULL, "pickupDeadline" TIMESTAMP, "pickedUpAt" TIMESTAMP, "dueDate" TIMESTAMP, "returnedAt" TIMESTAMP, "status" "public"."rentals_status_enum" NOT NULL DEFAULT 'reserved', CONSTRAINT "PK_2b10d04c95a8bfe85b506ba52ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'client')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'client'`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "genre"`);
        await queryRunner.query(`ALTER TABLE "books" ADD "genre" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "FK_b13ac8580bd6a011f47a476fbad" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "FK_013b75f259b85b40d1028718b52" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "FK_013b75f259b85b40d1028718b52"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "FK_b13ac8580bd6a011f47a476fbad"`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "genre"`);
        await queryRunner.query(`ALTER TABLE "books" ADD "genre" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "rentals"`);
        await queryRunner.query(`DROP TYPE "public"."rentals_status_enum"`);
        await queryRunner.query(`ALTER TABLE "books" RENAME COLUMN "genre" TO "available"`);
    }

}
