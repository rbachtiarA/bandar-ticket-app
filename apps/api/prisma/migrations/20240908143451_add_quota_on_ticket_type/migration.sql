/*
  Warnings:

  - Added the required column `quota` to the `ticket_type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ticket_type` ADD COLUMN `quota` INTEGER NOT NULL;
