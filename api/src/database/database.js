import { PrismaClient, Prisma } from '@prisma/client';

export const prisma = new PrismaClient();

export async function initDatabase() {
  prisma.$connect();
}

export const PRISMA_ERRORS = [
  Prisma.PrismaClientKnownErrorRequest,
];

export function isPrismaError(e) {
  return PRISMA_ERRORS.some((err) => e instanceof err);
}
