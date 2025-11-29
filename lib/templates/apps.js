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

const client = {
    packageJson: () => `{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "next": "16.0.5",
    "react": "catalog:",
    "react-dom": "catalog:"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "@repo/prettier-config": "workspace:*",
    "@types/node": "catalog:",
    "@types/react": "catalog:",
    "@types/react-dom": "catalog:"
  }
}`,

    tsconfig: () => `{
  "extends": "@repo/typescript-config/next",
  "compilerOptions": {
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}`,

    nextConfig: () => `import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;`,

    eslintConfig: () => `import { config as nextConfig } from '@repo/eslint-config/next';

export default [
  ...nextConfig,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];`,

    layout: (projectName) => `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${projectName}',
  description: 'A modern Bun-based monorepo application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}`,

    page: (projectName) => `export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Welcome to ${projectName}</h1>
      <p>Your monorepo is ready to go! 🚀</p>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Directory Structure:</h2>
        <ul>
          <li><strong>apps/api</strong> - Hono API server</li>
          <li><strong>apps/client</strong> - Next.js application</li>
          <li><strong>packages/auth</strong> - Authentication utilities</li>
          <li><strong>packages/database</strong> - Database setup</li>
          <li><strong>packages/shared</strong> - Shared utilities</li>
          <li><strong>packages/web-ui</strong> - UI component library</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>Next Steps:</h2>
        <ol>
          <li>Run <code>bun install</code> to install dependencies</li>
          <li>Run <code>bun run dev</code> to start development servers</li>
          <li>Start building your application!</li>
        </ol>
      </div>
    </main>
  );
}`,
};

module.exports = {
    api,
    client,
};
