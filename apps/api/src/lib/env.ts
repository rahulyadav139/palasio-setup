import { z } from 'zod';

const envSchema = z.object({
  API_ENV: z.enum(['development', 'production']).default('development'),
  LOG_LEVEL: z
    .enum(['debug', 'info', 'warn', 'error', 'fatal'])
    .default('debug'),
  PORT: z.coerce.number().default(8080),
  CLIENT_URL: z.string().default('http://localhost:3000'),
  OPENAI_API_KEY: z.string(),
  PINECONE_API_KEY: z.string(),
  PINECONE_INDEX_NAME: z.string(),
  DATABASE_URL: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  API_URL: z.string().default('http://localhost:8080'),
  SENTRY_DSN: z.string(),
  REDIS_USERNAME: z.string().optional(),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_HOST: z.string().optional(),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_ENABLED: z.coerce.boolean().default(false),
});

type IEnv = z.infer<typeof envSchema>;

export class Env {
  private static env: IEnv;

  private static initialize() {
    const parsed = envSchema.parse(Bun.env);
    this.env = parsed;
  }

  static get<T extends keyof IEnv>(key: T): IEnv[T] {
    if (!this.env) {
      this.initialize();
    }
    return this.env[key];
  }
}
