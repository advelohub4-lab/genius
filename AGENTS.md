# Base44 Dev Environment — skill2earn-hub

## Stack
Single-process fullstack app: **Express** serves the **tRPC** API (`/api/trpc`) and the **Vite dev server** (middleware mode) on one port. Frontend is React 19 + wouter + TanStack Query + Tailwind v4. ORM is **Drizzle** over **MySQL 8**. Auth uses Manus OAuth + `jose` JWT session cookies.

## Running
```
docker compose -f docker-compose.base44.yml up -d
```
- `db` — MySQL 8 (healthchecked). Credentials are inline in compose `environment:` (local infra, not secrets).
- `migrate` — one-shot: installs deps + runs `drizzle-kit migrate`, then exits. `web` waits for it via `depends_on: service_completed_successfully`.
- `web` — `node:22-slim`, bind-mounts the repo, runs `pnpm dev` = `tsx watch server/_core/index.ts` (live reload for server; Vite HMR for client). Exposed on host port 3000.

Dev source is served live (Vite middleware + `tsx watch`); edits appear without rebuilds. If a server edit doesn't hot-reload, `docker compose -f docker-compose.base44.yml restart web`.

## Environment / secrets
- `DATABASE_URL` — wired inline in compose (local MySQL).
- `JWT_SECRET` — session signing key; generated dev placeholder delivered via `/run/base44/app.env`.
- Manus platform vars (`OAUTH_SERVER_URL`, `VITE_APP_ID`, `OWNER_OPEN_ID`, `BUILT_IN_FORGE_API_URL`, `BUILT_IN_FORGE_API_KEY`) are **optional for boot** — the public landing page (`/`) renders without them. They are required for login and Forge features (LLM, image gen, storage, heartbeat). Provide real values via the Base44 Secrets dashboard.
- Precedence: `.env.base44-defaults` (placeholders, first) → `/run/base44/app.env` (real secrets, last, wins).

## Host / origin
The app is single-origin (Express proxies Vite), so no CORS config is needed. Vite runs with `allowedHosts: true` in middleware mode, accepting the preview's external hostname.

## Verify it works
- `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/` → `200` (serves Vite dev HTML with `/@vite/client`).
- `docker compose -f docker-compose.base44.yml logs web` should end with `Server running on http://localhost:3000/`.
- The `[OAuth] OAUTH_SERVER_URL is not configured` warning is expected without Manus credentials.

## Notes
- `pnpm` is enabled via corepack (`packageManager: pnpm@10.4.1`); `node_modules` and the pnpm store live in named volumes shared by `migrate` and `web`.
- The `patches/wouter@3.7.1.patch` patchedDependency is applied automatically by pnpm install.
- Drizzle migrations live in `drizzle/*.sql` (the `out` dir); schema in `drizzle/schema.ts`. To add a migration, edit schema then `pnpm db:push` (generate + migrate) inside the `web`/`migrate` container.
