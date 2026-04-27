import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBookStock1777293425966 implements MigrationInterface {
    name = 'AddBookStock1777293425966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" RENAME COLUMN "availableQuantity" TO "available_quantity"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "reservedAt"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "pickupDeadline"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "pickedUpAt"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "dueDate"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "returnedAt"`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "reserved_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "pickup_deadline" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "picked_up_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "due_date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "returned_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "returned_at"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "due_date"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "picked_up_at"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "pickup_deadline"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "reserved_at"`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "returnedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "dueDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "pickedUpAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "pickupDeadline" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "reservedAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "books" RENAME COLUMN "available_quantity" TO "availableQuantity"`);
    }

}
