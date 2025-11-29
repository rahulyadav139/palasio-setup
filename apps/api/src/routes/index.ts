import { Hono } from 'hono';

import authRouteConfig from './auth.route';
import evaluationRouteConfig from './evaluation.route';
import userRouteConfig from './user.route';

interface RouteConfig {
  path: string;
  router: Hono;
}

const routeConfigs: readonly RouteConfig[] = [
  userRouteConfig,
  authRouteConfig,
  evaluationRouteConfig,
] as const;

const router = new Hono();

for (const config of routeConfigs) {
  router.route(config.path, config.router);
}

export default router;
