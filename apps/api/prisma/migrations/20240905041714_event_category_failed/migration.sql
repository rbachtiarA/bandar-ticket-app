/*
  Warnings:

  - The values [Seminar,Entertainment,Sport,Music,Gallery] on the enum `Event_category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `event` MODIFY `category` ENUM('seminar', 'entertainment', 'sport', 'music', 'gallery') NOT NULL;
