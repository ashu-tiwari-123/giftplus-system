import nestjsConfig from '@giftplus/eslint-config/nestjs';

export default [
  {
    ignores: ['eslint.config.mjs', 'dist/**', 'vitest.config*.ts'],
  },
  ...nestjsConfig,
  {
    languageOptions: {
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
