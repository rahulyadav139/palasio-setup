export interface ErrorContext {
  userId?: string;
  correlationId?: string;
  requestId?: string;
  url?: string;
  method?: string;
  userAgent?: string;
  status?: number;
  responseData?: unknown;
  requestData?: unknown;
  timestamp: string;
}

export type AsyncFn<T extends unknown[], R> = (...args: T) => Promise<R>;
