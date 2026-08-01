// src/services/cache.service.js
// Simple in-memory TTL cache. Fine for a single-instance MVP. If you scale
// to multiple backend instances, swap this module's internals for Redis —
// callers (cacheGet/cacheSet) don't need to change.

const store = new Map();

export function cacheGet(key) {
    const entry = store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
        store.delete(key);
        return null;
    }
    return entry.value;
}

export function cacheSet(key, value, ttlMs) {
    store.set(key, { value, expiresAt: Date.now() + ttlMs });
}

export function cacheClear() {
    store.clear();
}