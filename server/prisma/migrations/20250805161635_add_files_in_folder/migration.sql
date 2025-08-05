-- AlterTable
ALTER TABLE "public"."Upload" ADD COLUMN     "folderId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Upload" ADD CONSTRAINT "Upload_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "public"."Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
