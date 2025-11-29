const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Generate the Next.js client application
 * @param {string} targetDir - The root directory of the monorepo
 */
function generateClientApp(targetDir) {
    console.log('⚡ Generating Next.js client app...');
    try {
        const clientAppDir = path.join(targetDir, 'apps/client');

        const createNextAppCmd = [
            'npx',
            'create-next-app@latest',
            'client',
            '--typescript',
            '--tailwind',
            '--eslint',
            '--app',
            '--no-src-dir',
            '--import-alias',
            '"@/*"',
            '--skip-install',
            '--use-npm'
        ].join(' ');

        execSync(createNextAppCmd, {
            cwd: path.join(targetDir, 'apps'),
            stdio: 'inherit'
        });

        // Post-process Client App
        console.log('🔧 Configuring client app...');

        // 1. Update package.json
        const clientPkgPath = path.join(clientAppDir, 'package.json');
        const clientPkg = JSON.parse(fs.readFileSync(clientPkgPath, 'utf8'));

        // Update name and add workspace dependencies
        clientPkg.name = "@repo/client";
        clientPkg.devDependencies = {
            ...clientPkg.devDependencies,
            "@repo/eslint-config": "workspace:*",
            "@repo/typescript-config": "workspace:*",
            "@repo/prettier-config": "workspace:*"
        };

        fs.writeFileSync(clientPkgPath, JSON.stringify(clientPkg, null, 2));

        // 2. Update tsconfig.json
        const clientTsConfigPath = path.join(clientAppDir, 'tsconfig.json');
        const tsConfigContent = {
            "extends": "@repo/typescript-config/next",
            "compilerOptions": {
                "baseUrl": ".",
                "incremental": true,
                "lib": ["dom", "dom.iterable", "esnext"],
                "resolveJsonModule": true,
                "tsBuildInfoFile": "./.next/tsconfig.tsbuildinfo",
                "paths": {
                    "@/*": ["./*"],
                    "@repo/ui/components/*": ["../../packages/web-ui/src/components/*"],
                    "@repo/ui/base/*": ["../../packages/web-ui/src/components/base/*"],
                    "@repo/ui/hooks/*": ["../../packages/web-ui/src/hooks/*"],
                    "@repo/ui/lib/*": ["../../packages/web-ui/src/lib/*"],
                    "@repo/ui/styles.css": ["../../packages/web-ui/src/styles/globals.css"],
                    "@repo/ui/utils": ["../../packages/web-ui/src/lib/utils"]
                }
            },
            "include": ["next-env.d.ts", "next.config.ts", "**/*.ts", "**/*.tsx", "**/*.json", ".next/types/**/*.ts"],
            "exclude": ["node_modules", ".next"]
        };

        fs.writeFileSync(clientTsConfigPath, JSON.stringify(tsConfigContent, null, 2));

        // 3. Update eslint.config.mjs
        const clientEslintPath = path.join(clientAppDir, 'eslint.config.mjs');
        if (fs.existsSync(clientEslintPath)) {
            const eslintContent = `import { config as nextConfig } from '@repo/eslint-config/next';

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
];`;
            fs.writeFileSync(clientEslintPath, eslintContent);
        }

    } catch (error) {
        console.error('❌ Failed to create client app:', error);
    }
}

module.exports = {
    generateClientApp
};
