import nextTs from 'eslint-config-next/typescript';
import nextVitals from 'eslint-config-next/core-web-vitals';
import { config as baseConfig } from './base.js';

export const config = [
  ...baseConfig,
  ...nextVitals,
  ...nextTs,
  {
    ignores: ['next-env.d.ts', '**/out/**'],
  },
];

export default config;
