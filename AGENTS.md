# Base44 Dev Environment — Skill2Earn HUB

## Stack
- **Frontend**: React 19 + Vite 7 (client-served via Express Vite middleware in dev)
- **Backend**: Express + tRPC 11 (single server, port 3000)
- **Database**: MySQL 8 via Drizzle ORM (mysql2)
- **Auth**: Manus OAuth (external) — session JWT cookies signed with `JWT_SECRET` (jose HS256)
- **Package manager**: pnpm 10 (corepack-enabled in containers)

## Running
```bash
docker compose -f docker-compose.base44.yml up -d --build
```
- `db` — MySQL 8 with healthcheck
- `setup` — one-shot: installs deps + runs `drizzle-kit migrate`, exits
- `app` — installs deps + runs `pnpm dev` (tsx watch), serves on port 3000

Single-origin: Express serves both `/api/trpc` and the Vite dev middleware on port 3000. No separate API origin needed.

## Environment
- `DATABASE_URL` — set in compose (local MySQL). Format: `mysql://skill2earn:skill2earnpw@db:3306/skill2earn`
- `JWT_SECRET` — generated dev placeholder; replace for real auth
- Manus platform vars (`VITE_APP_ID`, `VITE_OAUTH_PORTAL_URL`, `OAUTH_SERVER_URL`, `BUILT_IN_FORGE_API_*`) — placeholders in `.env.base44-defaults`; app boots without them but auth/storage/notifications won't work until real values are provided via the dashboard.

## Key facts
- DB connection is **lazy** (`getDb()` in `server/db.ts` only connects if `DATABASE_URL` is set). App boots without a DB but returns empty data.
- Auth is **optional** for public tRPC procedures. `auth.me` returns null when unauthenticated — public pages render without login.
- Vite runs in `middlewareMode` with `allowedHosts: true` (see `server/_core/vite.ts`), so all preview hosts are accepted.
- Drizzle migrations live in `drizzle/` (two migrations: 0000, 0001). Apply with `npx drizzle-kit migrate`.
- pnpm uses a patched wouter (`patches/wouter@3.7.1.patch`); the patches dir is bind-mounted.

## Verify it works
```bash
curl -s http://localhost:3000/ | head -5          # should return HTML
curl -s http://localhost:3000/api/trpc/system.health?input=%7B%22json%22%3A%7B%22timestamp%22%3A1%7D%7D  # should return {"ok":true}
```
