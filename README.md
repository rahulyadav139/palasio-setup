# palasio-setup

Scaffold a modern Bun-based monorepo with TypeScript, shared tooling configurations, and starter applications.

## Features

✨ **Modern Stack**: Built with Bun, TypeScript, and modern tooling  
📦 **Monorepo Structure**: Organized workspace with apps, packages, and shared tooling  
🎨 **Pre-configured Tooling**: ESLint, Prettier, and TypeScript configs ready to go  
🚀 **Starter Apps**: Hono API server and Next.js client app included  
📚 **Shared Packages**: Auth, database, shared utilities, and UI component library

## Usage

Create a new monorepo project:

```bash
npx palasio-setup@latest my-project-name
```

This will:
1. Create a new directory with your project name
2. Set up the complete monorepo structure
3. Install all dependencies with Bun
4. Get you ready to start coding!

## What Gets Created

```
my-project-name/
├── apps/
│   ├── api/              # Hono API server with TypeScript
│   └── client/           # Next.js application
├── packages/
│   ├── auth/             # Authentication utilities
│   ├── database/         # Database setup and schemas
│   ├── shared/           # Shared utilities and types
│   └── web-ui/           # React UI component library
└── tooling/
    ├── eslint-config/    # Shared ESLint configuration
    ├── prettier-config/  # Shared Prettier configuration
    └── typescript-config/# Shared TypeScript configurations
```

## Requirements

- [Bun](https://bun.sh) v1.1.38 or higher

## After Creation

Navigate to your project and start developing:

```bash
cd my-project-name

# Start all development servers
bun run dev

# Build all packages
bun run build

# Lint all code
bun run lint

# Format all code
bun run format
```

## Included Technologies

- **Bun**: Fast JavaScript runtime and package manager
- **TypeScript**: Type-safe JavaScript
- **Next.js**: React framework for the client app
- **Hono**: Lightweight web framework for the API
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Zod**: Type-safe schema validation

## Package Scripts

Each package includes standard scripts:

- `dev` - Start development server (apps only)
- `build` - Build the package/app
- `lint` - Lint the code
- `format` - Format the code with Prettier
- `type-check` - Check TypeScript types
- `clean` - Remove node_modules and build artifacts

## License

MIT
