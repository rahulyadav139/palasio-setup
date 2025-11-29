/**
 * Root-level file templates
 */

function getPackageJson(projectName) {
    return `{
  "name": "${projectName}",
  "private": true,
  "workspaces": {
    "packages": [
      "apps/*",
      "packages/*",
      "tooling/*"
    ],
    "catalog": {
      "react": "19.2.0",
      "react-dom": "19.2.0",
      "@types/react": "19.2.7",
      "@types/react-dom": "19.2.3",
      "@types/node": "24.10.1",
      "next": "16.0.5",
      "typescript": "5.9.3",
      "eslint": "9.39.1",
      "prettier": "3.7.2",
      "tailwindcss": "4.1.17",
      "zod": "4.1.13",
      "rimraf": "6.1.2"
    }
  },
  "scripts": {
    "build": "bun run --filter '*' build",
    "dev": "bun run --filter '*' dev",
    "lint": "bun run --filter '*' lint",
    "format": "prettier --write \\"**/*.{ts,tsx,md}\\"",
    "check-types": "bun run --filter '*' check-types"
  },
  "devDependencies": {
    "prettier": "^3.6.2",
    "typescript": "5.8.3"
  },
  "packageManager": "bun@1.1.38"
}`;
}

function getGitignore() {
    return `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# Dependencies
node_modules
.pnp
.pnp.js

# Local env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Testing
coverage

# Turbo
.turbo

# Vercel
.vercel

# Build Outputs
.next/
out/
build
dist

# TypeScript build info
*.tsbuildinfo


# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Misc
.DS_Store
*.pem

# ESLint cache
.eslintcache

# Elastic Beanstalk Files
.elasticbeanstalk/*
!.elasticbeanstalk/*.cfg.yml
!.elasticbeanstalk/*.global.yml`;
}

function getPrettierignore() {
    return `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build
/dist

# misc
.DS_Store
*.pem
.turbo

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env.local
.env.development.local
.env.test.local
.env.production.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# OS
.DS_Store
Thumbs.db

# IDEs
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
.idea/
*.swp
*.swo
*~

# Generated files
*.generated.*
.eslintcache

# Package files
*.tgz
package-lock.json
yarn.lock
pnpm-lock.yaml

# Logs
logs
*.log

# Bun
bun.lockb`;
}

function getReadme(projectName) {
    return `# ${projectName}

A modern Bun-based monorepo with TypeScript, shared tooling, and starter apps.

## Structure

\`\`\`
${projectName}/
├── apps/              # Applications
│   ├── api/          # Hono API server
│   └── client/       # Next.js application
├── packages/         # Shared packages
│   ├── auth/         # Authentication utilities
│   ├── database/     # Database setup and schemas
│   ├── shared/       # Shared utilities and types
│   └── web-ui/       # React UI component library
└── tooling/          # Development tooling
    ├── eslint-config/
    ├── prettier-config/
    └── typescript-config/
\`\`\`

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) v1.1.38 or higher

### Installation

\`\`\`bash
# Install dependencies
bun install

# Run development servers
bun run dev

# Build all packages
bun run build

# Lint all packages
bun run lint

# Format code
bun run format
\`\`\`

## Apps

### API (\`apps/api\`)

Hono-based API server with TypeScript support.

\`\`\`bash
cd apps/api
bun run dev        # Start dev server
bun run build      # Build for production
\`\`\`

### Client (\`apps/client\`)

Next.js application with App Router and TypeScript.

\`\`\`bash
cd apps/client
bun run dev        # Start dev server
bun run build      # Build for production
\`\`\`

## Packages

All packages use TypeScript and shared tooling configurations.

- **@repo/auth**: Authentication utilities
- **@repo/database**: Database setup and schemas
- **@repo/shared**: Shared utilities and types
- **@repo/web-ui**: React component library

## Tooling

Shared configurations for consistent code quality:

- **@repo/typescript-config**: TypeScript presets
- **@repo/eslint-config**: ESLint rules
- **@repo/prettier-config**: Prettier settings

## License

MIT`;
}

module.exports = {
    getPackageJson,
    getGitignore,
    getPrettierignore,
    getReadme,
};
