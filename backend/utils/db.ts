import { PrismaClient } from "@prisma/client";

// Prisma 5 magically handles everything natively without adapters!
const prisma = new PrismaClient();

export default prisma;

// Forced refresh of TypeScript types for Notification model
