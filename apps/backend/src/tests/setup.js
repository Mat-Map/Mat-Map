// src/tests/setup.js
// Runs before each test file (see package.json "jest.setupFilesAfterEnv").
// Assumes DATABASE_URL in .env.test points at a disposable test database —
// never run tests against production data.

import prisma from '../services/prisma.js';

afterAll(async () => {
    await prisma.$disconnect();
});