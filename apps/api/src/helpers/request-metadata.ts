import type { Context } from 'hono';

export const getRequestData = (c: Context) => {
  const ip = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || '';
  const userAgent = c.req.header('user-agent') || '';
  return { ip, userAgent };
};
