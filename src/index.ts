#!/usr/bin/env node

import fs from 'fs-extra';
import kleur from 'kleur';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import prompts from 'prompts';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATE_DIR = path.resolve(__dirname, '..', 'template');

const PLACEHOLDER = '{{PROJECT_NAME}}';

async function main() {
  console.log();
  console.log(kleur.bold().cyan('  create-palasio-setup'));
  console.log(kleur.gray('  Scaffold a new monorepo project'));
  console.log();

  const response = await prompts(
    [
      {
        type: 'text',
        name: 'projectName',
        message: 'Project name',
        initial: 'my-app',
        validate: (value: string) =>
          /^[a-z0-9-]+$/.test(value) || 'Use lowercase letters, numbers, and hyphens only',
      },
      {
        type: 'multiselect',
        name: 'apps',
        message: 'Which apps do you want to include?',
        choices: [
          { title: 'Web (Next.js)', value: 'client', selected: true },
          { title: 'Mobile (Expo)', value: 'mobile', selected: true },
          { title: 'API (Hono)', value: 'api', selected: true },
        ],
        min: 1,
      },
    ],
    {
      onCancel: () => {
        console.log(kleur.red('\n  Cancelled.\n'));
        process.exit(1);
      },
    },
  );

  const { projectName, apps } = response as {
    projectName: string;
    apps: string[];
  };

  const targetDir = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(targetDir)) {
    console.log(kleur.red(`\n  Directory "${projectName}" already exists.\n`));
    process.exit(1);
  }

  console.log();
  console.log(kleur.gray(`  Scaffolding project in ${targetDir}...`));

  // Copy the full template
  await fs.copy(TEMPLATE_DIR, targetDir, {
    filter: (src: string) => {
      const basename = path.basename(src);
      // Skip node_modules and git directories
      return basename !== 'node_modules' && basename !== '.git';
    },
  });

  // Remove apps that were not selected
  const allApps = ['client', 'mobile', 'api'];
  for (const app of allApps) {
    if (!apps.includes(app)) {
      const appDir = path.join(targetDir, 'apps', app);
      if (fs.existsSync(appDir)) {
        await fs.remove(appDir);
      }
    }
  }

  // Replace placeholders in all files
  await replacePlaceholders(targetDir, projectName);

  // Initialize git
  try {
    execSync('git init', { cwd: targetDir, stdio: 'ignore' });
  } catch {
    // git init is optional
  }

  // Install dependencies
  console.log(kleur.gray('  Installing dependencies...'));
  console.log();
  try {
    execSync('bun install', { cwd: targetDir, stdio: 'inherit' });
  } catch {
    console.log(
      kleur.yellow(
        '\n  Could not install dependencies automatically. Run "bun install" manually.',
      ),
    );
  }

  console.log();
  console.log(kleur.green('  Done! Your project is ready.'));
  console.log();
  console.log(kleur.bold('  Next steps:'));
  console.log();
  console.log(kleur.gray(`  cd ${projectName}`));

  if (apps.includes('client')) {
    console.log(kleur.gray('  bun run dev:web      # Start the web app'));
  }
  if (apps.includes('api')) {
    console.log(kleur.gray('  bun run dev:api      # Start the API server'));
  }
  if (apps.includes('mobile')) {
    console.log(kleur.gray('  bun run dev:mobile   # Start the mobile app'));
  }
  console.log(kleur.gray('  bun run dev          # Start all apps'));
  console.log();
}

async function replacePlaceholders(dir: string, projectName: string) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      await replacePlaceholders(fullPath, projectName);
    } else if (entry.isFile()) {
      // Only process text files
      const ext = path.extname(entry.name);
      const textExts = [
        '.json', '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs',
        '.css', '.md', '.html', '.yml', '.yaml', '.toml', '.cfg',
      ];

      if (textExts.includes(ext) || entry.name === '.gitignore' || entry.name === '.prettierignore') {
        try {
          const content = await fs.readFile(fullPath, 'utf-8');
          if (content.includes(PLACEHOLDER)) {
            const updated = content.replaceAll(PLACEHOLDER, projectName);
            await fs.writeFile(fullPath, updated, 'utf-8');
          }
        } catch {
          // Skip binary or unreadable files
        }
      }
    }
  }
}

main().catch((err) => {
  console.error(kleur.red('  Error:'), err);
  process.exit(1);
});
