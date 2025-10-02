-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN "passwordResetExpires" DATETIME;
ALTER TABLE "usuarios" ADD COLUMN "passwordResetToken" TEXT;

-- CreateIndex
CREATE INDEX "usuarios_passwordResetToken_idx" ON "usuarios"("passwordResetToken");
