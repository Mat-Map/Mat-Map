// src/server.js
// Entrypoint — the only file that starts the HTTP listener.

import app from './app.js';
import { config } from './config/env.js';
import { logger } from './utils/logger.js';

const server = app.listen(config.port, () => {
    logger.info(`MatMap backend listening on port ${config.port} (${config.nodeEnv})`);
});

function shutdown(signal) {
    logger.info(`Received ${signal}, shutting down gracefully...`);
    server.close(() => {
        logger.info('Server closed.');
        process.exit(0);
    });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));