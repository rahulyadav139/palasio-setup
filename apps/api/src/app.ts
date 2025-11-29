import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';

import { failure, success } from './helpers/response';
import { correlationIdMiddleware } from './middlewares/correlation-id';
import { errorMiddleware } from './middlewares/error';
import routes from './routes';

import { Env } from '@/lib/env';

const clientUrl = Env.get('CLIENT_URL');

export class App extends Hono {
  constructor() {
    super();

    this.configureCors();

    this.configureMiddlewares();

    this.configureRoutes();

    this.configureHealthCheck();

    this.configureErrorHandling();

    this.configureNotFoundHandling();
  }

  private configureCors() {
    this.use(
      cors({
        origin: [clientUrl],
        credentials: true,
      }),
    );
  }

  private configureMiddlewares() {
    this.use('*', correlationIdMiddleware);
    this.use('*', prettyJSON());
  }

  private configureRoutes() {
    this.route('/api/v1', routes);
  }

  private configureHealthCheck() {
    this.get('/health', async (c) => {
      return success(c, {
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
      });
    });
  }

  private configureErrorHandling() {
    this.onError(errorMiddleware);
  }

  private configureNotFoundHandling() {
    this.notFound((c) => {
      return failure(c, { error: 'Not Found' }, 404);
    });
  }
}
