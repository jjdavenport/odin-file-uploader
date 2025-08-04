/*
  Warnings:

  - Added the required column `file_size` to the `Upload` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_type` to the `Upload` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Upload" ADD COLUMN     "file_size" INTEGER NOT NULL,
ADD COLUMN     "file_type" TEXT NOT NULL;
