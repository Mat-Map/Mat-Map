// src/middleware/errorHandler.js
// Central error handler — must be registered LAST, after all routes.
// Any `next(err)` call or thrown error in an async controller lands here.

import { logger } from '../utils/logger.js';

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;

    logger.error(err.message, {
        path: req.originalUrl,
        method: req.method,
        statusCode,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });

    res.status(statusCode).json({
        error: {
            message: statusCode === 500 ? 'Internal server error' : err.message,
            statusCode,
        },
    });
}

// Wrap async route handlers so thrown errors reach errorHandler
// instead of crashing the process. Usage: router.get('/x', asyncHandler(fn))
export function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}