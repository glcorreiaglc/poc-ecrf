-- CreateTable
CREATE TABLE "study_inclusions" (
    "id" TEXT NOT NULL,
    "studyId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "study_inclusions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "study_inclusions_studyId_subjectId_key" ON "study_inclusions"("studyId", "subjectId");

-- AddForeignKey
ALTER TABLE "study_inclusions" ADD CONSTRAINT "study_inclusions_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "studies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "study_inclusions" ADD CONSTRAINT "study_inclusions_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
