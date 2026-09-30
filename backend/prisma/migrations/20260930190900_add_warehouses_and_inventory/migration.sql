/*
  Warnings:

  - Added the required column `newQuantity` to the `StockMovement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `previousQuantity` to the `StockMovement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StockMovement" ADD COLUMN     "newQuantity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "previousQuantity" DOUBLE PRECISION NOT NULL;
