# Cafe POS

This is a prototype cafe point-of-sale app. Default to simplicity, but follow the user's lead — if they want to go deeper on something, go deeper. See `README.md` for more detail.

## Stack

- **Server:** Bun with `Bun.serve()` — no Express
- **Database:** SQLite via [`Bun.sql`](https://bun.com/docs/runtime/sql) tagged template literals — no ORMs, no `bun:sqlite`
- **API:** [ts-rest](https://ts-rest.com) contracts with [Zod](https://zod.dev) validation, shared between server and client
- **Frontend:** React 19, [Tailwind CSS](https://tailwindcss.com), React Query (hooks auto-generated from ts-rest contracts)

## Adding a feature

Schema → contract → handler → page.

1. `src/server/schema.sql` — add tables and seed data. Server drops/recreates on changes.
2. `src/shared/contracts/` — define routes + Zod schemas, register in `src/shared/contract.ts`
3. `src/server/api/` — implement handlers, register in `src/server/api/index.ts`
4. `src/client/pages/` — add a React component, register in `src/client/pages/index.tsx`

API responses are validated against the Zod contracts at runtime.

## After making changes

Run `bun run check` to type-check the project.

## Bun, not Node

Default to using Bun instead of Node.js.

- `bun <file>` not `node` / `ts-node`
- `bun test` not `jest` / `vitest`
- `bun install` not `npm` / `yarn` / `pnpm`
- `bun run <script>` not `npm run`
- `bunx <pkg>` not `npx`
- Bun auto-loads `.env` — no dotenv
- Prefer `Bun.file` over `node:fs`
