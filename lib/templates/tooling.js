/**
 * Tooling configuration templates
 */

// TypeScript Config Templates
const typescriptConfig = {
    base: () => `{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Default",
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "incremental": false,
    "isolatedModules": true,
    "lib": ["es2022", "DOM", "DOM.Iterable"],
    "module": "ES2022",
    "moduleDetection": "force",
    "moduleResolution": "Bundler",
    "noUncheckedIndexedAccess": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "ES2022"
  }
}`,

    next: () => `{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Next.js",
  "extends": "./base.json",
  "compilerOptions": {
    "allowJs": true,
    "declaration": false,
    "declarationMap": false,
    "jsx": "preserve",
    "lib": ["dom", "dom.iterable", "es2022"],
    "incremental": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "noEmit": true,
    "plugins": [{ "name": "next" }],
    "resolveJsonModule": true
  },
  "include": ["src", "next-env.d.ts"],
  "exclude": ["node_modules"]
}`,

    react: () => `{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "React Library",
  "extends": "./base.json",
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "jsx": "react-jsx",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "target": "ES2021"
  }
}`,

    node: () => `{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Node",
  "extends": "./base.json",
  "compilerOptions": {
    "lib": ["es2022"],
    "module": "ES2022",
    "target": "ES2022",
    "moduleResolution": "Bundler"
  }
}`,

    packageJson: () => `{
  "name": "@repo/typescript-config",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "lint": "echo 'No linting needed for TypeScript config package'",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "clean": "rimraf node_modules dist",
    "type-check": "echo 'No types to check for TypeScript config package'"
  },
  "devDependencies": {
    "@repo/prettier-config": "workspace:*",
    "prettier": "catalog:",
    "rimraf": "^6.0.1"
  },
  "exports": {
    "./base": "./base.json",
    "./next": "./next.json",
    "./react": "./react.json",
    "./node": "./node.json"
  },
  "prettier": "@repo/prettier-config"
}`,
};

// Prettier Config Templates
const prettierConfig = {
    index: () => `/**
 * @type {import('prettier').Config}
 */
module.exports = {
  // Print semicolons at the ends of statements
  semi: true,

  // Use single quotes instead of double quotes
  singleQuote: true,

  // Print trailing commas wherever possible in multi-line comma-separated syntactic structures
  trailingComma: 'all',

  // Include parentheses around a sole arrow function parameter
  arrowParens: 'always',

  // The line length where Prettier will try wrap
  printWidth: 80,

  // Number of spaces per indentation level
  tabWidth: 2,

  // Indent with spaces instead of tabs
  useTabs: false,

  // Print spaces between brackets in object literals
  bracketSpacing: true,

  // Put the > of a multi-line JSX element at the end of the last line instead of being alone on the next line
  bracketSameLine: false,

  // Line ending style
  endOfLine: 'lf',

  // Control whether Prettier formats quoted code embedded in the file
  embeddedLanguageFormatting: 'auto',

  // How to handle whitespaces in HTML
  htmlWhitespaceSensitivity: 'css',

  // Control the printing of quotes in object properties
  quoteProps: 'as-needed',

  // Control the printing of spaces inside JSX brackets
  jsxSingleQuote: true,

  // Control the printing of prose wrap
  proseWrap: 'preserve',

  // Override formatting for specific file types
  overrides: [
    {
      files: ['*.tsx', '*.jsx'],
      options: {
        printWidth: 80,
        htmlWhitespaceSensitivity: 'ignore',
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 80,
        proseWrap: 'always',
      },
    },
    {
      files: '*.json',
      options: {
        printWidth: 120,
        trailingComma: 'none',
      },
    },
    {
      files: ['*.yml', '*.yaml'],
      options: {
        singleQuote: false,
        tabWidth: 2,
      },
    },
    {
      files: '*.svg',
      options: {
        parser: 'html',
      },
    },
  ],
};`,

    packageJson: () => `{
  "name": "@repo/prettier-config",
  "version": "0.0.0",
  "private": true,
  "main": "index.js",
  "scripts": {
    "lint": "echo 'No linting needed for Prettier config package'",
    "clean": "rimraf node_modules dist",
    "format": "echo 'No formatting needed for Prettier config package'",
    "format:check": "echo 'No formatting needed for Prettier config package'",
    "type-check": "echo 'No types to check for Prettier config package'"
  },
  "exports": {
    ".": "./index.js"
  },
  "files": [
    "index.js"
  ],
  "dependencies": {
    "prettier": "catalog:"
  },
  "devDependencies": {
    "rimraf": "^6.0.1"
  }
}`,
};

// ESLint Config Templates
const eslintConfig = {
    base: () => `import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import onlyWarn from 'eslint-plugin-only-warn';
import unusedImports from 'eslint-plugin-unused-imports';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

/**
 * A shared ESLint configuration for the repository.
 * Optimized for development performance.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      'unused-imports': unusedImports,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
    },
    settings: {
      'import/resolver': {
        node: true,
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },
    rules: {
      // Import management
      'unused-imports/no-unused-imports': 'off',
      'unused-imports/no-unused-vars': 'off',
      
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\\\u0000'],
            ['^(node:|@?\\\\w)'],
            ['^@repo(/.*|$)'],
            ['^\\\\.\\\\.', '^\\\\.'],
            ['^.+\\\\u0000$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      'import/no-unresolved': 'off',
      'import/named': 'off',
      'import/default': 'off',
      'import/namespace': 'off',
      'import/no-self-import': 'off',
      'import/no-useless-path-segments': 'off',

      // TypeScript
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
          fixStyle: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/prefer-as-const': 'error',

      // Code quality
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-script-url': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'object-shorthand': 'error',
      'no-unneeded-ternary': 'error',
      'spaced-comment': ['error', 'always', { markers: ['/'] }],
      '@typescript-eslint/prefer-for-of': 'error',
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: [
      'dist/**',
      '.next/**',
      'build/**',
      'coverage/**',
      '**/*.generated.*',
      '**/node_modules/**',
      '.eslintcache',
      '**/.cache/**',
      '**/public/**',
      '**/*.min.js',
      '**/*.config.js',
      '**/vendor/**',
      '**/.git/**',
    ],
  },
];`,

    next: () => `import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';

import { config as baseConfig } from './base.js';

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  ...baseConfig,
  {
    plugins: {
      '@next/next': nextPlugin,
      react: reactPlugin,
      'react-hooks': hooksPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...hooksPlugin.configs.recommended.rules,
    },
    languageOptions: {
      globals: {
        React: 'readonly',
      },
    },
  },
];`,

    react: () => `import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

import { config as baseConfig } from './base.js';

/**
 * A custom ESLint configuration for libraries that use React.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
    },
    rules: {
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...hooksPlugin.configs.recommended.rules,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        React: 'readonly',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];`,

    packageJson: () => `{
  "name": "@repo/eslint-config",
  "version": "0.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "lint": "echo 'No linting needed for ESLint config package'",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "clean": "rimraf node_modules dist",
    "type-check": "echo 'No types to check for ESLint config package'"
  },
  "devDependencies": {
    "@eslint/js": "^9.33.0",
    "@next/eslint-plugin-next": "^15.5.0",
    "@repo/prettier-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "eslint": "catalog:",
    "eslint-config-prettier": "^10.1.1",
    "eslint-plugin-import": "^2.31.0",
    "eslint-plugin-only-warn": "^1.1.0",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-simple-import-sort": "^12.1.1",
    "eslint-plugin-unused-imports": "^4.1.4",
    "globals": "^16.3.0",
    "prettier": "catalog:",
    "rimraf": "^6.0.1",
    "typescript": "catalog:",
    "typescript-eslint": "^8.40.0"
  },
  "exports": {
    "./base": "./src/base.js",
    "./next": "./src/next.js",
    "./react": "./src/react.js"
  },
  "prettier": "@repo/prettier-config"
}`,
};

module.exports = {
    typescriptConfig,
    prettierConfig,
    eslintConfig,
};
