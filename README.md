# LawSphere

LawSphere is a social network for attorneys/lawyers, being migrated from
Bubble to a coded monorepo. See `LawSphere_Master_Project_Prompt.txt` for
the full architecture and migration spec, and `MIGRATION.md` for feature
migration status.

## Stack

- **Web**: Next.js + TypeScript (`apps/web`)
- **Mobile**: Expo / React Native + TypeScript (`apps/mobile`)
- **Backend**: NestJS + TypeScript (`apps/api`)
- **Database/Auth/Storage/Realtime**: Supabase (Postgres)
- **API**: REST under `/api/v1`, documented via Swagger at `/api/docs`

## Getting started

```bash
corepack enable
pnpm install
```

Copy each app's `.env.example` to `.env` and fill in real values (a
Supabase DEV project isn't wired up yet — see `MIGRATION.md`):

```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/mobile/.env.example apps/mobile/.env.local
cp apps/api/.env.example apps/api/.env
```

Run everything in dev mode:

```bash
pnpm dev
```

Or target one app:

```bash
pnpm --filter api run start:dev
pnpm --filter web run dev
pnpm --filter mobile run start
```

## Monorepo layout

```
apps/            web (Next.js), mobile (Expo), api (NestJS)
packages/        shared types, validation, design tokens, constants, utils, api-client
supabase/        migrations, seed data, local CLI config
bubble-migration/  legacy Bubble exports/screenshots/workflows (source of truth for migration)
MIGRATION.md     per-feature migration status tracker
```

## Principles

- Migrate feature-by-feature in vertical slices (DB → API → web → mobile → tests), not layer-by-layer. See the master prompt §3, §32–35.
- NestJS is the single source of business logic — web and mobile stay thin clients.
- Bubble remains production until a feature is verified and the final cutover happens.
