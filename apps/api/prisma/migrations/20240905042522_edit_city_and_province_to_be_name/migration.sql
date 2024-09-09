/*
  Warnings:

  - You are about to drop the column `city` on the `city` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `provinces` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `City` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Provinces` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Provinces` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Provinces_province_key` ON `provinces`;

-- AlterTable
ALTER TABLE `city` DROP COLUMN `city`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `provinces` DROP COLUMN `province`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `City_name_key` ON `City`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Provinces_name_key` ON `Provinces`(`name`);
