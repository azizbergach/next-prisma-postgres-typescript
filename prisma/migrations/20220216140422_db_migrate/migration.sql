/*
  Warnings:

  - You are about to drop the column `age` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `users` table. All the data in the column will be lost.
  - Added the required column `Age` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Avatar` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Email` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FirstName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LastName` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "age",
DROP COLUMN "avatar",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "Age" INTEGER NOT NULL,
ADD COLUMN     "Avatar" TEXT NOT NULL,
ADD COLUMN     "Email" TEXT NOT NULL,
ADD COLUMN     "FirstName" TEXT NOT NULL,
ADD COLUMN     "LastName" TEXT NOT NULL;
