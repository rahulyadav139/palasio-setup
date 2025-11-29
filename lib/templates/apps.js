/**
 * App templates (API and Client)
 */

const api = {
  packageJson: () => `{
  "name": "api",
  "module": "index.ts",
  "type": "module",
  "scripts": {
    "dev": "bun run --watch src/index.ts",
    "build": "bun build ./src/index.ts --outdir ./dist --target bun",
    "start": "bun run dist/index.js",
    "lint": "eslint src --cache --cache-location .eslintcache",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "clean": "rimraf node_modules dist .eslintcache",
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/prettier-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "@types/bun": "latest",
    "prettier": "^3.6.2",
    "rimraf": "^6.0.1"
  },
  "prettier": "@repo/prettier-config",
  "dependencies": {
    "@hono/zod-validator": "^0.7.2",
    "@repo/shared": "workspace:*",
    "hono": "^4.9.4",
    "zod": "^4.0.17"
  }
}`,

  tsconfig: () => `{
  "extends": "@repo/typescript-config/node",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "types": ["bun-types"],
    "lib": ["ES2022"],
    "module": "ES2022",
    "target": "ES2022",
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": true,
    "noEmit": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}`,

  eslintConfig: () => `import { config as baseConfig } from '@repo/eslint-config/base';

export default [
  ...baseConfig,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];`,

  indexTs: () => `import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

// Middleware
app.use('/*', cors());

// Routes
app.get('/', (c) => {
  return c.json({ 
    message: 'Welcome to the API',
    status: 'healthy'
  });
});

app.get('/health', (c) => {
  return c.json({ status: 'ok' });
});

const port = process.env.PORT || 3001;
console.log(\`🚀 Server running on http://localhost:\${port}\`);

export default {
  port,
  fetch: app.fetch,
};`,
};

module.exports = {
  api,
};
