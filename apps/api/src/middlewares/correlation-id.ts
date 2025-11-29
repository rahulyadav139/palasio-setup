import { createMiddleware } from 'hono/factory';

import { generateCorrelationId } from '@repo/shared/utils';
import { Logger } from '@repo/shared/utils';

export const correlationIdMiddleware = createMiddleware(async (c, next) => {
  const incomingId = c.req.header('x-correlation-id');
  const id = incomingId || generateCorrelationId();

  // attach correlationId to context
  c.set('correlationId', id);
  c.header('x-correlation-id', id);

  Logger.setCorrelationId(id);

  Logger.info('Incoming request', {
    method: c.req.method,
    path: c.req.path,
  });

  await next();
});
