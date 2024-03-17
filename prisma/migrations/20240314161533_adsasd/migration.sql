/*
  Warnings:

  - A unique constraint covering the columns `[member_id,bet_id]` on the table `bettings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "bettings_member_id_bet_id_key" ON "bettings"("member_id", "bet_id");
