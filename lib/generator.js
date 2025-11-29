const { execSync } = require('child_process');
const { createDir, writeFile } = require('./utils');
const rootTemplates = require('./templates/root');
const toolingTemplates = require('./templates/tooling');
const appsTemplates = require('./templates/apps');
const packagesTemplates = require('./templates/packages');

/**
 * Main scaffolding generator
 */
function generateMonorepo(targetDir, projectName) {
    console.log('📂 Creating directory structure...');

    // Create all directories
    const directories = [
        'apps/api/src',
        'apps/client/app',
        'apps/client/public',
        'packages/auth/src',
        'packages/database/src/schema',
        'packages/shared/src/utils',
        'packages/shared/src/types',
        'packages/web-ui/src/components',
        'packages/web-ui/src/lib',
        'tooling/typescript-config',
        'tooling/eslint-config/src',
        'tooling/prettier-config',
    ];

    directories.forEach(dir => createDir(targetDir, dir));

    console.log('📝 Creating configuration files...');

    // Root files
    writeFile(targetDir, 'package.json', rootTemplates.getPackageJson(projectName));
    writeFile(targetDir, '.gitignore', rootTemplates.getGitignore());
    writeFile(targetDir, '.prettierignore', rootTemplates.getPrettierignore());
    writeFile(targetDir, 'README.md', rootTemplates.getReadme(projectName));

    // Tooling - TypeScript Config
    writeFile(targetDir, 'tooling/typescript-config/base.json', toolingTemplates.typescriptConfig.base());
    writeFile(targetDir, 'tooling/typescript-config/next.json', toolingTemplates.typescriptConfig.next());
    writeFile(targetDir, 'tooling/typescript-config/react.json', toolingTemplates.typescriptConfig.react());
    writeFile(targetDir, 'tooling/typescript-config/node.json', toolingTemplates.typescriptConfig.node());
    writeFile(targetDir, 'tooling/typescript-config/package.json', toolingTemplates.typescriptConfig.packageJson());

    // Tooling - Prettier Config
    writeFile(targetDir, 'tooling/prettier-config/index.js', toolingTemplates.prettierConfig.index());
    writeFile(targetDir, 'tooling/prettier-config/package.json', toolingTemplates.prettierConfig.packageJson());

    // Tooling - ESLint Config
    writeFile(targetDir, 'tooling/eslint-config/src/base.js', toolingTemplates.eslintConfig.base());
    writeFile(targetDir, 'tooling/eslint-config/src/next.js', toolingTemplates.eslintConfig.next());
    writeFile(targetDir, 'tooling/eslint-config/src/react.js', toolingTemplates.eslintConfig.react());
    writeFile(targetDir, 'tooling/eslint-config/package.json', toolingTemplates.eslintConfig.packageJson());

    // Apps - API
    writeFile(targetDir, 'apps/api/package.json', appsTemplates.api.packageJson());
    writeFile(targetDir, 'apps/api/tsconfig.json', appsTemplates.api.tsconfig());
    writeFile(targetDir, 'apps/api/eslint.config.js', appsTemplates.api.eslintConfig());
    writeFile(targetDir, 'apps/api/src/index.ts', appsTemplates.api.indexTs());

    // Apps - Client
    writeFile(targetDir, 'apps/client/package.json', appsTemplates.client.packageJson());
    writeFile(targetDir, 'apps/client/tsconfig.json', appsTemplates.client.tsconfig());
    writeFile(targetDir, 'apps/client/next.config.ts', appsTemplates.client.nextConfig());
    writeFile(targetDir, 'apps/client/eslint.config.mjs', appsTemplates.client.eslintConfig());
    writeFile(targetDir, 'apps/client/app/layout.tsx', appsTemplates.client.layout(projectName));
    writeFile(targetDir, 'apps/client/app/page.tsx', appsTemplates.client.page(projectName));

    // Packages - Auth
    writeFile(targetDir, 'packages/auth/package.json', packagesTemplates.auth.packageJson());
    writeFile(targetDir, 'packages/auth/tsconfig.json', packagesTemplates.auth.tsconfig());
    writeFile(targetDir, 'packages/auth/src/index.ts', packagesTemplates.auth.indexTs());

    // Packages - Database
    writeFile(targetDir, 'packages/database/package.json', packagesTemplates.database.packageJson());
    writeFile(targetDir, 'packages/database/tsconfig.json', packagesTemplates.database.tsconfig());
    writeFile(targetDir, 'packages/database/src/index.ts', packagesTemplates.database.indexTs());
    writeFile(targetDir, 'packages/database/src/schema/index.ts', packagesTemplates.database.schemaTs());

    // Packages - Shared
    writeFile(targetDir, 'packages/shared/package.json', packagesTemplates.shared.packageJson());
    writeFile(targetDir, 'packages/shared/tsconfig.json', packagesTemplates.shared.tsconfig());
    writeFile(targetDir, 'packages/shared/src/index.ts', packagesTemplates.shared.indexTs());
    writeFile(targetDir, 'packages/shared/src/utils/index.ts', packagesTemplates.shared.utilsTs());
    writeFile(targetDir, 'packages/shared/src/types/index.ts', packagesTemplates.shared.typesTs());

    // Packages - Web UI
    writeFile(targetDir, 'packages/web-ui/package.json', packagesTemplates.webUi.packageJson());
    writeFile(targetDir, 'packages/web-ui/tsconfig.json', packagesTemplates.webUi.tsconfig());
    writeFile(targetDir, 'packages/web-ui/src/index.ts', packagesTemplates.webUi.indexTs());
    writeFile(targetDir, 'packages/web-ui/src/components/button.tsx', packagesTemplates.webUi.buttonTsx());

    console.log('✅ Files created successfully!\n');
}

/**
 * Install dependencies with Bun
 */
function installDependencies(targetDir) {
    console.log('📦 Installing dependencies with Bun...\n');
    try {
        execSync('bun install', {
            cwd: targetDir,
            stdio: 'inherit'
        });
        console.log('\n✅ Dependencies installed successfully!\n');
    } catch (error) {
        console.error('\n❌ Failed to install dependencies. Please run "bun install" manually.\n');
    }
}

/**
 * Print success message
 */
function printSuccess(projectName, targetDir) {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║           ✨  SUCCESS! YOUR MONOREPO IS READY  ✨         ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝

📂 Project created at: ${targetDir}

🚀 Next steps:

  1. Navigate to your project:
     \x1b[36mcd ${projectName}\x1b[0m

  2. Start development:
     \x1b[36mbun run dev\x1b[0m

  3. Build all packages:
     \x1b[36mbun run build\x1b[0m

  4. Lint your code:
     \x1b[36mbun run lint\x1b[0m

📚 Learn more:
   - Bun: https://bun.sh
   - Next.js: https://nextjs.org
   - Hono: https://hono.dev

Happy coding! 🎉
`);
}

module.exports = {
    generateMonorepo,
    installDependencies,
    printSuccess,
};
