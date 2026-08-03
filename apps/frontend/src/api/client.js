/**
 * Custom API Error class carrying HTTP status code, Zod validation details,
 * and rate-limit identification.
 */
export class ApiError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
    this.isRateLimit = statusCode === 429;
  }
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1';

/**
 * Universal fetch wrapper for MatMap backend endpoints.
 * @param {string} endpoint - API relative route (e.g. '/stages') or full URL.
 * @param {RequestInit} [options] - Standard fetch options.
 * @returns {Promise<any>}
 */
export async function apiFetch(endpoint, options = {}) {
  const baseUrl = API_BASE_URL.replace(/\/+$/, '');
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${path}`;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    let data = null;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    }

    if (!response.ok) {
      const errorMessage =
        data?.error?.message ||
        `HTTP Error ${response.status}: ${response.statusText}`;
      const details = data?.error?.details || null;

      throw new ApiError(errorMessage, response.status, details);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Network errors, CORS errors, or fetch aborts
    throw new ApiError(
      error.message || 'Network request failed. Please check your connection.',
      0
    );
  }
}

export default apiFetch;
