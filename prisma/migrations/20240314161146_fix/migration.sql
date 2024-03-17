/*
  Warnings:

  - Added the required column `participant_choosed_id` to the `bettings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bettings" ADD COLUMN     "participant_choosed_id" TEXT NOT NULL;
