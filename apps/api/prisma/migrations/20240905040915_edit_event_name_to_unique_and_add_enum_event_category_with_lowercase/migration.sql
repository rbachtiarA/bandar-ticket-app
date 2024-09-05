/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `event` MODIFY `category` ENUM('Seminar', 'Entertainment', 'Sport', 'Music', 'Gallery') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Event_name_key` ON `Event`(`name`);
