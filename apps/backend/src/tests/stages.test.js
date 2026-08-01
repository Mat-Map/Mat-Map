// src/tests/stages.test.js
// Integration tests against a seeded test database.
// Run `npm run seed` against DATABASE_URL from .env.test before running.

import request from 'supertest';
import app from '../app.js';

describe('GET /api/v1/stages', () => {
    it('returns a list of stages ordered by corridor position', async () => {
        const res = await request(app).get('/api/v1/stages');

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.stages)).toBe(true);
        expect(res.body.stages.length).toBeGreaterThan(0);

        const orders = res.body.stages.map((s) => s.order);
        const sorted = [...orders].sort((a, b) => a - b);
        expect(orders).toEqual(sorted);
    });
});

describe('GET /api/v1/stages/:id', () => {
    it('returns 404 for a stage that does not exist', async () => {
        const res = await request(app).get('/api/v1/stages/00000000-0000-0000-0000-000000000000');
        expect(res.status).toBe(404);
    });

    it('returns a single stage by id', async () => {
        const listRes = await request(app).get('/api/v1/stages');
        const firstStage = listRes.body.stages[0];

        const res = await request(app).get(`/api/v1/stages/${firstStage.id}`);
        expect(res.status).toBe(200);
        expect(res.body.stage.id).toBe(firstStage.id);
    });
});