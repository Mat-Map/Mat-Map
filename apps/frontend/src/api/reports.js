import { apiFetch } from './client';

/**
 * Submit community crowd, fare, or vibe report.
 *
 * NOTE: The backend currently has no /reports endpoint.
 * This client method attempts a POST request to /reports, but callers should handle
 * network / 404 fallbacks gracefully until backend support is added.
 *
 * @param {object} reportData
 * @param {string} reportData.stageId - Stage UUID
 * @param {number} [reportData.farePaid] - Amount paid in KSh
 * @param {string} [reportData.capacity] - 'empty' | 'moderate' | 'full' | 'standing'
 * @param {string} [reportData.vibe] - 'chill' | 'loud_music' | 'rush_hour'
 * @returns {Promise<{ success: boolean, reportId?: string }>}
 */
export async function submitReport(reportData) {
  // TODO: backend has no /reports endpoint yet — wire this up once it exists
  return apiFetch('/reports', {
    method: 'POST',
    body: JSON.stringify(reportData),
  });
}
