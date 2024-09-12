/*
  Warnings:

  - Added the required column `trasactionEventId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ticket` ADD COLUMN `trasactionEventId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `TrasactionEvent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `totalPrice` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_trasactionEventId_fkey` FOREIGN KEY (`trasactionEventId`) REFERENCES `TrasactionEvent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
