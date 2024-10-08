import { PrismaClient } from '@prisma/client'

// Create and export the prisma client
export const prisma = new PrismaClient()

// En desarrollo, guardamos la instancia en la variable global para evitar
// crear múltiples instancias durante hot-reloading
if (process.env.NODE_ENV !== 'production') {
  (global as any).prisma = prisma;
}
