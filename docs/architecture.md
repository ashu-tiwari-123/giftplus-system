# Architecture

## Workspace layout

This is a pnpm workspace (`pnpm-workspace.yaml`) orchestrated by Turborepo
(`turbo.json`). Every package under `apps/*` and `packages/*` has a unique
`name` scoped under `@giftplus/*`, except the two deployable apps which are
also scoped (`@giftplus/web`, `@giftplus/api`) for consistency.

## Shared packages

- **`@giftplus/typescript-config`** — tsconfig presets. `base.json` holds the
  strict, modern compiler options shared by everything. `nextjs.json` and
  `nestjs.json` layer on the runtime-specific options (module resolution,
  lib, decorators, JSX). `react-library.json` is for internal React packages
  like `ui`. No app or package should declare a full `compilerOptions` block
  from scratch — extend one of these instead.
- **`@giftplus/eslint-config`** — ESLint 10 flat config presets (`base`,
  `next`, `nestjs`), consumed by every workspace's `eslint.config.mjs`.
  Type-aware rules for NestJS (e.g. `no-floating-promises`) require the
  consuming app to set `parserOptions.tsconfigRootDir` to its own directory
  — see `apps/api/eslint.config.mjs` for the pattern.
- **`@giftplus/config`**, **`@giftplus/utils`**, **`@giftplus/types`**,
  **`@giftplus/ui`** — application-facing shared code. These ship raw
  TypeScript source (no build step) via `exports: { ".": "./index.ts" }`,
  which bundlers like Next's Turbopack/webpack consume directly. If a
  Node-only consumer ever needs to import one of these at runtime without a
  bundler in front of it (e.g. from compiled NestJS `dist/`), add a build
  step (e.g. `tsup`) to that package first — see the recommendation in the
  root README/PR notes.

## Why no TypeScript project references / `paths`

Turborepo's task graph (via `dependsOn: ["^build"]` / `["^typecheck"]`)
already orders builds and type-checks across the dependency graph, so TS
project references would be redundant. `baseUrl`/`paths` are intentionally
unused — cross-package imports go through real package names
(`@giftplus/config`, not `@/config`), which is what makes packages portable
and refactor-safe as the codebase grows.
