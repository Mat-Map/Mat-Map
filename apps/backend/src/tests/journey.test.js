// src/tests/journey.test.js
// Mocks the Google Maps service so tests don't make live, billable API
// calls or depend on network access.

import request from 'supertest';

jest.mock('../services/googleMaps.service.js', () => ({
    getDirections: jest.fn().mockResolvedValue({
        durationMinutes: 42,
        distanceKm: 21.3,
        polyline: 'mocked_polyline_string',
    }),
}));

const app = (await import('../app.js')).default;

describe('GET /api/v1/journey', () => {
    it('returns 400 when from/to are missing or invalid', async () => {
        const res = await request(app).get('/api/v1/journey').query({ from: 'not-a-uuid', to: 'also-not' });
        expect(res.status).toBe(400);
    });

    it('returns 404 when a stage does not exist', async () => {
        const res = await request(app).get('/api/v1/journey').query({
            from: '00000000-0000-0000-0000-000000000000',
            to: '00000000-0000-0000-0000-000000000001',
        });
        expect(res.status).toBe(404);
    });

    it('returns journey options with fare and eta for a valid stage pair', async () => {
        const stagesRes = await request(app).get('/api/v1/stages');
        const [from, to] = stagesRes.body.stages;

        const res = await request(app).get('/api/v1/journey').query({ from: from.id, to: to.id });

        expect(res.status).toBe(200);
        expect(res.body.from.id).toBe(from.id);
        expect(res.body.to.id).toBe(to.id);
        expect(Array.isArray(res.body.options)).toBe(true);
        expect(res.body.options.length).toBeGreaterThan(0);
        expect(res.body.options[0].eta).toEqual({
            durationMinutes: 42,
            distanceKm: 21.3,
            polyline: 'mocked_polyline_string',
        });
    });
});