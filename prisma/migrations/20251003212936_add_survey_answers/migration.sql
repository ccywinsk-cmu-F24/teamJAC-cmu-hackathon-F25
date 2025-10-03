-- CreateTable
CREATE TABLE "SurveyAnswer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SurveyAnswer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "SurveyAnswer_userId_idx" ON "SurveyAnswer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SurveyAnswer_userId_questionId_key" ON "SurveyAnswer"("userId", "questionId");
