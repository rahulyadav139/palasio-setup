import { nextJsConfig } from '@repo/eslint-config/next';

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [...nextJsConfig];

export default eslintConfig;
