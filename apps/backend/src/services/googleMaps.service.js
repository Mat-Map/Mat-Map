// src/services/googleMaps.service.js
// Server-side wrapper around Google's Directions API. Uses the
// IP-restricted GOOGLE_MAPS_SERVER_KEY — never expose this key to the
// frontend. Results are cached briefly since stage-to-stage ETA doesn't
// meaningfully change second to second.

import { config } from '../config/env.js';
import { cacheGet, cacheSet } from './cache.service.js';
import { logger } from '../utils/logger.js';

const DIRECTIONS_URL = 'https://maps.googleapis.com/maps/api/directions/json';

/**
 * @param {{lat: number, lng: number}} origin
 * @param {{lat: number, lng: number}} destination
 * @returns {Promise<{durationMinutes: number, distanceKm: number, polyline: string}>}
 */
export async function getDirections(origin, destination) {
    const originStr = `${origin.lat},${origin.lng}`;
    const destStr = `${destination.lat},${destination.lng}`;
    const cacheKey = `directions:${originStr}:${destStr}`;

    const cached = cacheGet(cacheKey);
    if (cached) {
        logger.debug('Directions cache hit', { cacheKey });
        return cached;
    }

    const url = new URL(DIRECTIONS_URL);
    url.searchParams.set('origin', originStr);
    url.searchParams.set('destination', destStr);
    url.searchParams.set('mode', 'driving');
    url.searchParams.set('key', config.googleMapsServerKey);

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Directions API request failed with status ${res.status}`);
    }

    const data = await res.json();
    if (data.status !== 'OK' || !data.routes?.length) {
        throw new Error(`Directions API error: ${data.status}${data.error_message ? ` - ${data.error_message}` : ''}`);
    }

    const route = data.routes[0];
    const leg = route.legs[0];

    const result = {
        durationMinutes: Math.round(leg.duration.value / 60),
        distanceKm: Number((leg.distance.value / 1000).toFixed(1)),
        polyline: route.overview_polyline.points,
    };

    cacheSet(cacheKey, result, config.directionsCacheTtlMs);
    return result;
}