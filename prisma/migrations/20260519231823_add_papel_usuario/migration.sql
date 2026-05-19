-- CreateEnum
CREATE TYPE "Papel" AS ENUM ('CLIENTE', 'DIARISTA');

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "papel" "Papel" NOT NULL DEFAULT 'CLIENTE';
