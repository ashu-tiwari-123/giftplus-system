import tseslint from 'typescript-eslint';
import { config as baseConfig } from './base.js';

/**
 * Type-aware NestJS preset. The consuming app's own eslint.config.mjs must
 * add a `languageOptions.parserOptions` block with `projectService: true`
 * and `tsconfigRootDir: import.meta.dirname` so type information resolves
 * against that app's tsconfig, not this package's.
 */
export const config = tseslint.config(
  ...baseConfig,
  ...tseslint.configs.recommendedTypeChecked,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },
);

export default config;
