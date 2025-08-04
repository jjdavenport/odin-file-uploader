/*
  Warnings:

  - Added the required column `file_original_name` to the `Upload` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Upload" ADD COLUMN     "file_original_name" TEXT NOT NULL;
