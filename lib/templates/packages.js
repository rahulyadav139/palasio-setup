/**
 * Package templates (auth, database, shared, web-ui)
 */

const auth = {
    packageJson: () => `{
  "name": "@repo/auth",
  "version": "0.0.1",
  "type": "module",
  "private": true,
  "scripts": {
    "build": "tsc",
    "lint": "eslint . --cache --cache-location .eslintcache",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "clean": "rimraf node_modules dist",
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/prettier-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "prettier": "catalog:",
    "rimraf": "^6.0.1",
    "typescript": "catalog:"
  },
  "prettier": "@repo/prettier-config",
  "dependencies": {
    "@repo/shared": "workspace:*"
  },
  "exports": {
    ".": "./src/index.ts"
  }
}`,

    tsconfig: () => `{
  "extends": "@repo/typescript-config/base",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}`,

    indexTs: () => `export function authenticate(token: string): boolean {
  // TODO: Implement authentication logic
  return token.length > 0;
}

export function authorize(userId: string, resource: string): boolean {
  // TODO: Implement authorization logic
  return userId !== '' && resource !== '';
}`,
};

const database = {
    packageJson: () => `{
  "name": "@repo/database",
  "version": "0.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "build": "tsc",
    "lint": "eslint . --cache --cache-location .eslintcache",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "clean": "rimraf node_modules dist",
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/prettier-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "@types/node": "^22.15.3",
    "prettier": "catalog:",
    "rimraf": "^6.0.1",
    "typescript": "catalog:"
  },
  "prettier": "@repo/prettier-config",
  "dependencies": {
    "@repo/shared": "workspace:*"
  },
  "exports": {
    "./*": "./src/*/index.ts",
    ".": "./src/index.ts"
  }
}`,

    tsconfig: () => `{
  "extends": "@repo/typescript-config/base",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}`,

    indexTs: () => `// Database connection and schema exports
export const db = {
  connect: async () => {
    // TODO: Implement database connection
    console.log('Database connected');
  },
  disconnect: async () => {
    // TODO: Implement database disconnection
    console.log('Database disconnected');
  },
};

export * from './schema';`,

    schemaTs: () => `// Define your database schemas here
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

// Add more schema types as needed`,
};

const shared = {
    packageJson: () => `{
  "name": "@repo/shared",
  "version": "0.0.1",
  "type": "module",
  "private": true,
  "scripts": {
    "build": "tsc",
    "lint": "eslint . --cache --cache-location .eslintcache",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "clean": "rimraf node_modules dist",
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/prettier-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "prettier": "catalog:",
    "rimraf": "^6.0.1",
    "typescript": "catalog:"
  },
  "prettier": "@repo/prettier-config",
  "dependencies": {
    "zod": "catalog:"
  },
  "exports": {
    ".": "./src/index.ts",
    "./*": "./src/*/index.ts"
  }
}`,

    tsconfig: () => `{
  "extends": "@repo/typescript-config/base",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}`,

    indexTs: () => `export * from './utils';
export * from './types';`,

    utilsTs: () => `export function formatDate(date: Date): string {
  return date.toISOString();
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}`,

    typesTs: () => `export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}

export type Result<T, E = Error> = 
  | { success: true; value: T }
  | { success: false; error: E };`,
};

const webUi = {
    packageJson: () => `{
  "name": "@repo/web-ui",
  "version": "0.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "build": "tsc",
    "lint": "eslint . --max-warnings 0 --cache --cache-location .eslintcache",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "clean": "rimraf node_modules dist",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "catalog:",
    "react-dom": "catalog:"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/prettier-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "@types/node": "catalog:",
    "@types/react": "catalog:",
    "@types/react-dom": "catalog:",
    "prettier": "catalog:",
    "rimraf": "catalog:"
  },
  "prettier": "@repo/prettier-config",
  "exports": {
    ".": "./src/index.ts",
    "./components/*": "./src/components/*"
  }
}`,

    tsconfig: () => `{
  "extends": "@repo/typescript-config/react",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}`,

    indexTs: () => `export { Button } from './components/button';`,

    buttonTsx: () => `import type React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  children, 
  ...props 
}: ButtonProps) {
  const styles = {
    primary: {
      backgroundColor: '#0070f3',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
      cursor: 'pointer',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: '#0070f3',
      border: '1px solid #0070f3',
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
      cursor: 'pointer',
    },
  };

  return (
    <button style={styles[variant]} {...props}>
      {children}
    </button>
  );
}`,
};

module.exports = {
    auth,
    database,
    shared,
    webUi,
};
