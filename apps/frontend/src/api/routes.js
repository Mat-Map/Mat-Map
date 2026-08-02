import { apiFetch } from './client';

/**
 * Fetch all registered matatu routes and their linked stage sequences.
 * @returns {Promise<{ routes: Array<{ id: string, name: string, sacco: string|null, color: string|null, stages: Array<object> }> }>}
 */
export async function getRoutes() {
  return apiFetch('/routes');
}

/**
 * Fetch a specific route by ID.
 * @param {string} id - Route UUID
 * @returns {Promise<{ route: object }>}
 */
export async function getRouteById(id) {
  if (!id) throw new Error('Route ID is required');
  return apiFetch(`/routes/${encodeURIComponent(id)}`);
}
