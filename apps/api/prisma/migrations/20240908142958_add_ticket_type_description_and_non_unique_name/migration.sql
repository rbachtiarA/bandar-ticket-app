-- DropIndex
DROP INDEX `ticket_type_name_key` ON `ticket_type`;

-- AlterTable
ALTER TABLE `ticket_type` ADD COLUMN `description` VARCHAR(191) NULL;
