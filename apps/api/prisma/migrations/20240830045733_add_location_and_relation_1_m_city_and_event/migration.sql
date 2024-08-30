/*
  Warnings:

  - Added the required column `cityId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` ADD COLUMN `cityId` INTEGER NOT NULL,
    ADD COLUMN `location` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
