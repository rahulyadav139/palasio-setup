import { isAxiosError } from 'axios';
import { ZodError } from 'zod';

import { AppError, ErrorCode } from '@repo/shared/errors';
import { Logger } from '@repo/shared/utils';

import type { ErrorHandler } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';

import { failure } from '@/helpers/response';
import { SentryService } from '@/providers/sentry';

export const errorMiddleware: ErrorHandler = (err, c) => {
  let status = 500;
  let code: string = ErrorCode.INTERNAL_ERROR;
  let message = 'Internal Server Error';
  let details: unknown;

  if (err instanceof ZodError) {
    status = 422;
    code = ErrorCode.VALIDATION_FAILED;
    message = 'Validation failed';
    details = formatZodError(err);
  } else if (err instanceof AppError) {
    ({ status, code, message } = err);
    details = err.context;
  } else if (isAxiosError(err) && err.response) {
    status = err.response?.status || 500;
    code = err.code || ErrorCode.EXTERNAL_SERVICE_ERROR;
    message = err.message || 'External service error';
    details = err.response?.data;
  } else if (
    err &&
    typeof err === 'object' &&
    'status' in err &&
    typeof err.status === 'number'
  ) {
    status = err.status;
    code =
      'code' in err && typeof err.code === 'string'
        ? err.code
        : ErrorCode.INTERNAL_ERROR;
    message =
      'message' in err && typeof err.message === 'string'
        ? err.message
        : message;
  } else if (typeof err === 'string') {
    message = err;
  } else if (
    err &&
    typeof err === 'object' &&
    'message' in err &&
    typeof err.message === 'string'
  ) {
    message = err.message;
  }

  const correlationId = c.get('correlationId');

  const errorLog = {
    correlationId,
    code,
    message,
    details,
    stack:
      err && typeof err === 'object' && 'stack' in err ? err.stack : undefined,
  };

  // local log
  Logger.error('Error details:', errorLog);

  // Send server errors to Sentry
  if (status >= 500) {
    SentryService.captureError(err, errorLog);
  }

  const errorInfo = {
    code,
    error: message,
    details,
    timestamp: new Date().toISOString(),
  };

  return failure(c, errorInfo, status as ContentfulStatusCode);
};

export function formatZodError(err: ZodError) {
  const fieldErrors: Record<string, string[]> = {};

  for (const issue of err.issues) {
    const path = issue.path.join('.') || 'root';
    if (!fieldErrors[path]) {
      fieldErrors[path] = [];
    }
    fieldErrors[path]?.push(issue.message);
  }

  return fieldErrors;
}
