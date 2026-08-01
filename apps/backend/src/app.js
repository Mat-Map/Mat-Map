// src/app.js
// Builds and configures the Express app. server.js is the only file that
// calls .listen() — this file stays importable by tests without opening
// a port.

import express from 'express';
import { corsMiddleware } from './middleware/cors.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import apiRouter from './routes/index.js';

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(generalLimiter);

app.use('/api/v1', apiRouter);

app.use((req, res) => {
    res.status(404).json({ error: { message: 'Route not found', statusCode: 404 } });
});

app.use(errorHandler);

export default app;