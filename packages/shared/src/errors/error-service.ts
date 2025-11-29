import { ErrorCode } from './error-code';

import type { AppError } from './app-error';
import type { AsyncFn, ErrorContext } from './types';

const isDev = process.env.NODE_ENV === 'development';

type Logger = (
  error: Error | AppError,
  context?: Record<string, unknown>,
) => void;

type Toast = (message: string) => void;

export type ErrorHandlerConfig = {
  logger: Logger;
  toast: Toast;
  handleCriticalError?: (error: Error | AppError) => void;
};

export class ErrorService {
  private readonly logger: Logger;
  private readonly handleCriticalError?: (error: Error | AppError) => void;
  private readonly toast: Toast;

  constructor({ logger, handleCriticalError, toast }: ErrorHandlerConfig) {
    this.logger = logger;
    this.handleCriticalError = handleCriticalError;
    this.toast = toast;
  }

  /** Narrow AppError */
  private isAppError(error: unknown): error is AppError {
    return !!(error && typeof error === 'object' && 'code' in error);
  }

  /** Mask internal details before exposing error to client */
  maskError(error: Error | AppError) {
    if (this.isAppError(error)) {
      return {
        message: error.isOperational
          ? error.message
          : 'An unexpected error occurred!',
        code: error.code,
        status: error.status,
        ...(isDev && { stack: error.stack }),
      };
    }
    return {
      message: 'An unexpected error occurred!',
      code: ErrorCode.UNKNOWN,
      status: 500,
      ...(isDev && { stack: error.stack }),
    };
  }

  /** Capture, log, and optionally handle critical errors */
  captureError(error: Error | AppError, context?: Partial<ErrorContext>) {
    const info = this.formatError(error, context);
    this.logger(error, { extra: info.context });

    if (this.isAppError(error) && error.isOperational === false) {
      this.handleCriticalError?.(error);
      return;
    }

    // show toast
    this.toast(info.message);
  }

  /** Format error for consistent structure */
  private formatError(
    error: Error | AppError,
    context?: Partial<ErrorContext>,
  ) {
    return {
      message: error.message,
      stack: error.stack,
      code: this.isAppError(error) ? error.code : ErrorCode.UNKNOWN,
      status: this.isAppError(error) ? error.status : 500,
      context: {
        ...(this.isAppError(error) ? error.context : {}),
        ...context,
        timestamp: new Date().toISOString(),
      },
    };
  }

  /** Manual error wrapping (mask + prebound capture) */
  handleManually(err: Error | AppError) {
    const errorInfo = this.maskError(err);
    return {
      error: errorInfo,
      handler: this.captureError.bind(this, err),
    };
  }

  /** Create async wrapper for DRY try/catch */
  createAsyncWrapper({ rethrow }: { rethrow?: boolean } = {}) {
    return <T extends unknown[], R>(
      fn: AsyncFn<T, R>,
      onError?: (
        ctx: ReturnType<ErrorService['handleManually']>,
      ) => void | Promise<void>,
    ): ((...args: T) => Promise<R | undefined>) => {
      return async (...args: T): Promise<R | undefined> => {
        try {
          return await fn(...args);
        } catch (err) {
          const error = err as Error | AppError;
          const ctx = this.handleManually(error);

          if (onError) {
            await onError(ctx);
          }

          if (rethrow) throw error;
        }
      };
    };
  }
}
