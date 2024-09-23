/*
  Warnings:

  - Added the required column `discountTypeId` to the `TrasactionEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `trasactionevent` ADD COLUMN `discountTypeId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `TrasactionEvent` ADD CONSTRAINT `TrasactionEvent_discountTypeId_fkey` FOREIGN KEY (`discountTypeId`) REFERENCES `DiscountType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
