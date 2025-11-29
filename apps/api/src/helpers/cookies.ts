import { getCookie, setCookie } from 'hono/cookie';

import type { Context } from 'hono';

import { Env } from '@/lib/env';

export const SESSION_COOKIE_NAME = 'session_id';
/**
 * 180 days in seconds
 */
export const SESSION_EXPIRATION_TIME = 60 * 60 * 24 * 180;

const isProd = Env.get('API_ENV') === 'production';

export class CookieHelper {
  private static cookieOptions = {
    httpOnly: true,
    path: '/',
    sameSite: 'lax' as const,
    ...(isProd && {
      domain: '.idlyze.com',
      secure: true,
    }),
  };

  static send(
    c: Context,
    { name, value }: { name: string; value: string },
    options?: Record<string, unknown>,
  ) {
    const mergedOptions = Object.assign({}, this.cookieOptions, options);
    setCookie(c, name, value, mergedOptions);
  }

  static destroy(c: Context, name: string) {
    setCookie(c, name, '', this.cookieOptions);
  }

  static sendSessionCookie(c: Context, sessionId: string) {
    this.send(
      c,
      { name: SESSION_COOKIE_NAME, value: sessionId },
      {
        maxAge: SESSION_EXPIRATION_TIME,
      },
    );
  }

  static getSessionCookie(c: Context) {
    return getCookie(c, SESSION_COOKIE_NAME);
  }

  static getOauthStateCookie(c: Context, provider: string) {
    return getCookie(c, `oauth_state_${provider}`);
  }

  static destroySessionCookie(c: Context) {
    this.destroy(c, SESSION_COOKIE_NAME);
  }
}
