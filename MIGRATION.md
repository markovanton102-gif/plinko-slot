# LawSphere Migration Tracker

Status values: `not started` / `in progress` / `migrated` / `verified`.

See `LawSphere_Master_Project_Prompt.txt` for the full migration strategy
(vertical feature slices: DB → NestJS API → Next.js → Expo → tests).

## Foundation (Phase 1)

| Item | Status | Notes |
|---|---|---|
| Monorepo (pnpm + Turborepo) | migrated | apps/{web,mobile,api}, packages/* wired |
| Environment config strategy | migrated | per-app `.env.example`, no real secrets yet |
| Supabase project (DEV) | not started | no real Supabase project connected yet |
| Database migration system | in progress | `supabase/migrations/` scaffolded, empty |
| Authentication (Supabase Auth) | not started | |
| Profiles/users | not started | |
| Roles and permissions | not started | |
| Organizations/law firms | not started | |
| Design tokens | in progress | starter palette/spacing/type/shadow tokens, real brand values TBD |
| Shared base UI components | not started | |
| NestJS API conventions | migrated | `/api/v1` prefix, global ValidationPipe, CORS via env |
| Swagger/OpenAPI | migrated | mounted at `/api/docs` |
| Logging/error handling | in progress | default Nest Logger only so far |
| Health endpoint | migrated | `GET /api/v1/health` |

## Features

| Feature | Status | Notes |
|---|---|---|
| Profile | not started | |
| Connections | not started | |
| Content (Media/Articles/Live/Products) | not started | |
| Groups | not started | |
| Events | not started | |
| Organizations | not started | |
| Messages | not started | |
| Notifications | not started | |
| Search | not started | |

## Cutover

| Item | Status | Notes |
|---|---|---|
| Migration scripts | not started | |
| Staging rehearsal | not started | |
| Production cutover | not started | Bubble remains production until this is complete |
