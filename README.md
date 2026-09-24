# GiftPlus System

A pnpm + Turborepo monorepo foundation for the GiftPlus ERP/IMS platform.

## Stack

- pnpm workspaces (pnpm 12)
- Turborepo 2
- Next.js 16 (`apps/web`)
- NestJS 12 (`apps/api`)
- TypeScript (strict, shared config package)
- ESLint 10 flat config (shared config package)
- Node.js 22

## Structure

```
apps/
  web/                Next.js frontend
  api/                NestJS backend
packages/
  ui/                 Shared React components (no components yet)
  utils/               Shared helper functions
  config/              Shared constants / environment helpers
  types/                Shared TypeScript types
  eslint-config/        Shared ESLint flat config (base, next, nestjs)
  typescript-config/     Shared tsconfig presets (base, nextjs, nestjs, react-library)
docs/                   Architecture notes
.github/workflows/       CI
```

## Getting started

```bash
pnpm install
pnpm dev
```

`pnpm dev` runs both `apps/web` and `apps/api` in parallel via Turborepo.

## Scripts

| Script              | Description                                |
| ------------------- | ------------------------------------------ |
| `pnpm dev`          | Run all apps in dev mode                   |
| `pnpm build`        | Build all apps and packages                |
| `pnpm lint`         | Lint all workspaces                        |
| `pnpm typecheck`    | Type-check all workspaces (`tsc --noEmit`) |
| `pnpm test`         | Run tests where defined                    |
| `pnpm format`       | Format the repo with Prettier              |
| `pnpm format:check` | Check formatting without writing           |
| `pnpm clean`        | Remove build outputs across the workspace  |

## Conventions

- Every workspace package is scoped under `@giftplus/*` and unique.
- `apps/*` and `packages/*` extend `@giftplus/typescript-config` rather than declaring their own compiler options from scratch.
- `apps/*` and `packages/*` consume `@giftplus/eslint-config` rather than declaring their own ESLint rules from scratch.
- Formatting is centralized at the repo root (Prettier + EditorConfig); individual packages do not carry their own formatter config.
