// src/middleware/cors.js
import cors from 'cors';
import { config } from '../config/env.js';

export const corsMiddleware = cors({
    origin: config.corsOrigin,
    methods: ['GET', 'POST', 'OPTIONS'],
});