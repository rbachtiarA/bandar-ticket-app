/*
  Warnings:

  - You are about to drop the column `discount` on the `discounttype` table. All the data in the column will be lost.
  - You are about to drop the column `isNominal` on the `discounttype` table. All the data in the column will be lost.
  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_customerId_fkey`;

-- AlterTable
ALTER TABLE `discounttype` DROP COLUMN `discount`,
    DROP COLUMN `isNominal`,
    ADD COLUMN `minPrice` INTEGER NULL,
    ADD COLUMN `minQuantity` INTEGER NULL,
    ADD COLUMN `nominal` INTEGER NULL,
    ADD COLUMN `percent` INTEGER NULL;

-- DropTable
DROP TABLE `customer`;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
