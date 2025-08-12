/*
  Warnings:

  - Made the column `cloudinary_public_id` on table `Upload` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Upload" ALTER COLUMN "cloudinary_public_id" SET NOT NULL;
