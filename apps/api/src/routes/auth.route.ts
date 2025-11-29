import { Hono } from 'hono';

import {
  loginUserBodySchema,
  oauthCallbackBodySchema,
  oauthCallbackParamsSchema,
  registerUserBodySchema,
} from '@repo/shared/api';

import { AuthController } from '@/controllers/auth.controller';
import { authenticateUser } from '@/middlewares/auth';
import { zodValidator } from '@/middlewares/zod-validator';

export const router = new Hono();

// register with credentials
router.post('/register', zodValidator('json', registerUserBodySchema), (c) =>
  AuthController.register(c),
);

// login with credentials
router.post('/login', zodValidator('json', loginUserBodySchema), (c) =>
  AuthController.login(c),
);

// logout
router.delete('/logout', (c) => AuthController.logout(c));

router.patch('/password', authenticateUser, (c) =>
  AuthController.updatePassword(c),
);

// oauth login
router.get(
  'oauth/:provider',
  zodValidator('param', oauthCallbackParamsSchema),
  (c) => AuthController.oauthLogin(c),
);

// oauth callback
router.post(
  'oauth/:provider/callback',
  zodValidator('param', oauthCallbackParamsSchema),
  zodValidator('json', oauthCallbackBodySchema),
  (c) => AuthController.oauthCallback(c),
);

// Route configuration
const routeConfig = { path: '/auth', router };

export default routeConfig;
