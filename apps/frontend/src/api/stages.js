import { apiFetch } from './client';

/**
 * Fetch all stages along the Thika Road corridor.
 * Returns stage list ordered by corridor order ascending.
 * @returns {Promise<{ stages: Array<{ id: string, name: string, slug: string, lat: number, lng: number, order: number, createdAt: string }> }>}
 */
export async function getStages() {
  return apiFetch('/stages');
}

/**
 * Fetch a single stage by its UUID.
 * @param {string} id - Stage UUID
 * @returns {Promise<{ stage: object }>}
 */
export async function getStageById(id) {
  if (!id) throw new Error('Stage ID is required');
  return apiFetch(`/stages/${encodeURIComponent(id)}`);
}
