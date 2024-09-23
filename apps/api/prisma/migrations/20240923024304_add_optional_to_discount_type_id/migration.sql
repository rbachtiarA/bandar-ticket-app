-- DropForeignKey
ALTER TABLE `trasactionevent` DROP FOREIGN KEY `TrasactionEvent_discountTypeId_fkey`;

-- AlterTable
ALTER TABLE `trasactionevent` MODIFY `discountTypeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `TrasactionEvent` ADD CONSTRAINT `TrasactionEvent_discountTypeId_fkey` FOREIGN KEY (`discountTypeId`) REFERENCES `DiscountType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
