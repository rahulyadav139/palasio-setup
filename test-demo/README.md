# test-demo

A modern Bun-based monorepo with TypeScript, shared tooling, and starter apps.

## Structure

```
test-demo/
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
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) v1.1.38 or higher

### Installation

```bash
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
```

## Apps

### API (`apps/api`)

Hono-based API server with TypeScript support.

```bash
cd apps/api
bun run dev        # Start dev server
bun run build      # Build for production
```

### Client (`apps/client`)

Next.js application with App Router and TypeScript.

```bash
cd apps/client
bun run dev        # Start dev server
bun run build      # Build for production
```

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

MIT
