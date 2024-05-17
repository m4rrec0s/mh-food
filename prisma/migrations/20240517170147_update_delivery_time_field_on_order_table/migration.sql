/*
  Warnings:

  - You are about to drop the column `subTotalPrice` on the `Order` table. All the data in the column will be lost.
  - Added the required column `subTotalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "subTotalPrice",
ADD COLUMN     "subTotalPrice" DECIMAL(10,2) NOT NULL;
