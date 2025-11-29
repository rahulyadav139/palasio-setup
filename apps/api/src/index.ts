import { DatabaseService } from '@repo/database';
import { Logger } from '@repo/shared/utils';

import { App } from './app';
import { Env } from './lib/env';
import { OpenAIProvider } from './providers/openai';
import { PineconeProvider } from './providers/pinecone';
import { RedisProvider } from './providers/redis';
import { SentryService } from './providers/sentry';

// environment variables
const env = Env.get('API_ENV');

// Initialize logger
Logger.initialize({
  level: Env.get('LOG_LEVEL'),
  pinoPretty: env === 'development',
});

// Initialize Sentry
SentryService.initialize({
  dsn: Env.get('SENTRY_DSN'),
  env,
});

// Initialize database
DatabaseService.initialize({
  databaseUri: Env.get('DATABASE_URL'),
});

// Initialize redis provider
RedisProvider.initialize();

// Initialize openai provider
OpenAIProvider.initialize({
  apiKey: Env.get('OPENAI_API_KEY'),
});

// Initialize pinecone provider
PineconeProvider.initialize({
  apiKey: Env.get('PINECONE_API_KEY'),
  indexName: Env.get('PINECONE_INDEX_NAME'),
});

const app = new App();

// Graceful shutdown handling
process.on('SIGTERM', async () => {
  Logger.info('Received SIGTERM, shutting down gracefully');
  await RedisProvider.disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  Logger.info('Received SIGINT, shutting down gracefully');
  await RedisProvider.disconnect();
  process.exit(0);
});

export default {
  port: Env.get('PORT') || 8080,
  fetch: app.fetch,
  // Increase timeout for streaming responses (2 minutes)
  idleTimeout: 120,
};
