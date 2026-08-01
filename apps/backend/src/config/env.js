// src/config/env.js
// Loads and validates required environment variables once, at boot.
// Import `config` anywhere instead of touching process.env directly.

import 'dotenv/config';

const REQUIRED_VARS = ['DATABASE_URL', 'GOOGLE_MAPS_SERVER_KEY'];

function loadConfig() {
    const missing = REQUIRED_VARS.filter((key) => !process.env[key]);
    if (missing.length > 0) {
        throw new Error(
            `Missing required environment variable(s): ${missing.join(', ')}. ` +
            'Check your .env file against .env.example.'
        );
    }

    return {
        nodeEnv: process.env.NODE_ENV || 'development',
        port: Number(process.env.PORT) || 4000,
        databaseUrl: process.env.DATABASE_URL,
        googleMapsServerKey: process.env.GOOGLE_MAPS_SERVER_KEY,
        corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        directionsCacheTtlMs: Number(process.env.DIRECTIONS_CACHE_TTL_MS) || 5 * 60 * 1000,
    };
}

export const config = loadConfig();