-- CreateTable
CREATE TABLE "public"."Upload" (
    "id" SERIAL NOT NULL,
    "file_name" TEXT NOT NULL,
    "created_at" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Upload_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Upload" ADD CONSTRAINT "Upload_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
