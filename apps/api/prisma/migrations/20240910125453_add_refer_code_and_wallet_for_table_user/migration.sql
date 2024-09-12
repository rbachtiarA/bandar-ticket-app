/*
  Warnings:

  - A unique constraint covering the columns `[referCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `referCode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `referCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `wallet` INTEGER NOT NULL DEFAULT 0,
    MODIFY `role` ENUM('ADMIN', 'CUSTOMER', 'ORGANIZER') NOT NULL DEFAULT 'CUSTOMER';

-- CreateIndex
CREATE UNIQUE INDEX `User_referCode_key` ON `User`(`referCode`);
