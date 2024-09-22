/*
  Warnings:

  - You are about to drop the column `nominal` on the `discounttype` table. All the data in the column will be lost.
  - You are about to drop the column `percent` on the `discounttype` table. All the data in the column will be lost.
  - Added the required column `code` to the `DiscountType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cut` to the `DiscountType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cutType` to the `DiscountType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `DiscountType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `discounttype` DROP COLUMN `nominal`,
    DROP COLUMN `percent`,
    ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `cut` INTEGER NOT NULL,
    ADD COLUMN `cutType` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
