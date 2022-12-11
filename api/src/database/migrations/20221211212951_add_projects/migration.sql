/*
  Warnings:

  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Users` table. All the data in the column will be lost.
  - Added the required column `metadata` to the `Users` table without a default value. This is not possible if the table is not empty.
  - The required column `userId` was added to the `Users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "UserAuthLevel" AS ENUM ('user', 'guest', 'anonymous');

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "authLevel" "UserAuthLevel" NOT NULL DEFAULT 'anonymous',
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "metadata" JSONB NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'user',
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("userId");

-- CreateTable
CREATE TABLE "TemporaryTokens" (
    "temporaryTokenId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TEXT,
    "data" TEXT,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "TemporaryTokens_pkey" PRIMARY KEY ("temporaryTokenId")
);

-- CreateTable
CREATE TABLE "Projects" (
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("projectId")
);

-- CreateIndex
CREATE UNIQUE INDEX "TemporaryTokens_token_key" ON "TemporaryTokens"("token");
