// src/middleware/rateLimiter.js
// Protects Google-billed endpoints (directions/journey) from abuse.
// General API traffic (stages/routes/fares) is cheap Postgres reads and
// gets a looser limit.

import rateLimit from 'express-rate-limit';

export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: { message: 'Too many requests, please try again later.', statusCode: 429 } },
});

export const directionsLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: { message: 'Too many directions requests, please try again later.', statusCode: 429 } },
});