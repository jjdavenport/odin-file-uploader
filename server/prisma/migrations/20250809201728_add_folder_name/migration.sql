-- DropForeignKey
ALTER TABLE "public"."Upload" DROP CONSTRAINT "Upload_folderId_fkey";

-- AlterTable
ALTER TABLE "public"."Upload" ADD COLUMN     "folder_name" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Upload" ADD CONSTRAINT "Upload_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "public"."Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
