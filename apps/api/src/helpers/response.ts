import type { ApiResponse } from '@repo/shared/api';

import type { Context } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';
import type { ZodType } from 'zod';

/**
 * Sends a successful JSON response.
 * @param {Context} c - The Hono context object.
 * @param {T} json - The response data to include.
 * @param {Object} [options] - Optional response options.
 * @param {ZodType<T>} [options.schema] - The schema to validate the response data.
 * @param {ContentfulStatusCode} [options.status=200] - The HTTP status code.
 * @returns {Response} The JSON response.
 */
export const success = <T extends Record<string, unknown>>(
  c: Context,
  json: T = {} as T,
  options: {
    schema?: ZodType<T>;
    status?: ContentfulStatusCode;
  } = {},
): Response => {
  const data = options.schema ? options.schema.parse(json) : json;

  const response = { success: true, ...data } as ApiResponse<T>;

  return c.json(response, options.status || 200);
};

/**
 * Sends a failure JSON response.
 * @param {Context} c - The Hono context object.
 * @param {string} error - The error message.
 * @param {ContentfulStatusCode} [status=400] - The HTTP status code.
 * @returns {Response} The JSON response.
 */
export function failure(
  c: Context,
  json: {
    error?: string;
    code?: string;
    details?: unknown;
  },
  status: ContentfulStatusCode = 400,
): Response {
  return c.json({ success: false, ...json }, status);
}
