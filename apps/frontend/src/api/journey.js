import { apiFetch } from './client';

/**
 * Fetch fare estimate between origin and destination stage UUIDs.
 * @param {string} fromUuid - Origin stage UUID
 * @param {string} toUuid - Destination stage UUID
 * @returns {Promise<{ from: object, to: object, baseFare: number, peakFare: number|null, updatedAt: string }>}
 */
export async function getFares(fromUuid, toUuid) {
  if (!fromUuid || !toUuid) {
    throw new Error('Both "from" and "to" stage UUIDs are required.');
  }
  const params = new URLSearchParams({ from: fromUuid, to: toUuid });
  return apiFetch(`/fares?${params.toString()}`);
}

/**
 * Fetch Google Directions route summary and polyline between stage UUIDs.
 * @param {string} fromUuid - Origin stage UUID
 * @param {string} toUuid - Destination stage UUID
 * @returns {Promise<{ from: object, to: object, durationMinutes: number, distanceKm: number, polyline: string }>}
 */
export async function getDirections(fromUuid, toUuid) {
  if (!fromUuid || !toUuid) {
    throw new Error('Both "from" and "to" stage UUIDs are required.');
  }
  const params = new URLSearchParams({ from: fromUuid, to: toUuid });
  return apiFetch(`/directions?${params.toString()}`);
}

/**
 * Main journey planning endpoint: fetches matched route options, fare structures, and ETA/polylines.
 * @param {string} fromUuid - Origin stage UUID
 * @param {string} toUuid - Destination stage UUID
 * @returns {Promise<{ from: object, to: object, options: Array<{ type: 'direct'|'no_direct_route', route: object|null, fare: object|null, eta: object|null }> }>}
 */
export async function getJourney(fromUuid, toUuid) {
  if (!fromUuid || !toUuid) {
    throw new Error('Both "from" and "to" stage UUIDs are required.');
  }
  const params = new URLSearchParams({ from: fromUuid, to: toUuid });
  return apiFetch(`/journey?${params.toString()}`);
}
