// src/services/prisma.js
// Single shared PrismaClient instance — never instantiate PrismaClient
// anywhere else, or you'll exhaust DB connections under load.

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});

export default prisma;