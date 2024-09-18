/*
  Warnings:

  - Added the required column `description` to the `DiscountType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiredDate` to the `DiscountType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `discounttype` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `expiredDate` DATETIME(3) NOT NULL,
    ADD COLUMN `limit` INTEGER NOT NULL DEFAULT 0;
