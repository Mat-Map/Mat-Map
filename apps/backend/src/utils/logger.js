// src/utils/logger.js
// Minimal dependency-free logger. Swap for pino/winston later if needed —
// every call site only depends on this module's exported shape.

function timestamp() {
    return new Date().toISOString();
}

function format(level, message, meta) {
    const base = `[${timestamp()}] [${level}] ${message}`;
    return meta ? `${base} ${JSON.stringify(meta)}` : base;
}

export const logger = {
    info(message, meta) {
        console.log(format('INFO', message, meta));
    },
    warn(message, meta) {
        console.warn(format('WARN', message, meta));
    },
    error(message, meta) {
        console.error(format('ERROR', message, meta));
    },
    debug(message, meta) {
        if (process.env.NODE_ENV === 'development') {
            console.debug(format('DEBUG', message, meta));
        }
    },
};