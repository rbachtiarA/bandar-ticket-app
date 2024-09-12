/*
  Warnings:

  - The values [seminar,entertainment,sport,music,gallery] on the enum `Event_category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `event` MODIFY `category` ENUM('Seminar', 'Entertainment', 'Sport', 'Music', 'Gallery') NOT NULL;
