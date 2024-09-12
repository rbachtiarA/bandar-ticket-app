/*
  Warnings:

  - You are about to drop the column `customerId` on the `trasactionevent` table. All the data in the column will be lost.
  - Added the required column `userId` to the `TrasactionEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `trasactionevent` DROP COLUMN `customerId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `TrasactionEvent` ADD CONSTRAINT `TrasactionEvent_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
