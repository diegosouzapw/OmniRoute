# Per-Dependency Upgrade Plan (PR-014)

> **Owner**: release captain (@kooshapari).
> **Companion**: `00-strategy.md`, `03-rollback-procedures.md`,
> `scripts/deps/major-bump.sh`.
> **Versioning key**: `current → target → horizon`.
> **Risk legend**: L (low — patch + minor, no API changes), M (medium — minor
> breaking config or behavior), H (high — major API rewrite).

---

## 1. Next.js (`next`)

| Field | Value |
|-------|-------|
| Current | `^16.2.6` (resolved `16.2.6`) |
| Target | `^16.3.x` (rolling minor), `^17.0.0` (next major) |
| Horizon | minor: 4–8 weeks; major: 1 quarter |
| Risk | M (minor) / H (major) |
| Rollback | `git revert <merge-sha>` + `npm ci` |

### 1.1 Breaking changes (16.x → 17.x, expected)

- **App Router**: `cookies()`, `headers()`, `draftMode()` become async in 15+;
  if any code path still does `cookieStore.get('foo')` synchronously it must
  move to `await cookieStore.get('foo')`.
- **Image component**: legacy `next/legacy/image` removed in 16; verify no
  imports remain (`grep -rn "next/legacy/image" src/`).
- **Middleware**: `middleware.ts` → `proxy.ts` rename (introduced in 16,
  enforced in 17). Codemod: `npx @next/codemod@latest middleware-to-proxy .`
- **Cache APIs**: `unstable_cache` → `cache` (stable in 17). Codemod shipped.
- **Bundler**: Turbopack is the default; Webpack fallback via
  `--turbo=false` for one minor.

### 1.2 Migration steps

1. Branch: `deps/major-next-YYYY-MM-DD` (use `scripts/deps/major-bump.sh next`).
2. Run codemods: `npx @next/codemod@latest upgrade 17` for `app/`, `pages/`,
   `middleware/` (if any).
3. Update `eslint-config-next` to `17.x` in lockstep (auto by Renovate group).
4. Run `npm run typecheck:core && npm run test:unit:fast`.
5. Run `npm run build` — must finish without OOM (see PR #5031 for build heap
   ratchet).
6. Run `npm run test:e2e:fast` subset (smoke + auth + chatcore).
7. Smoke test the standalone bundle: `npm run build:release` then
   `./dist/bin/omniroute.mjs start`.

### 1.3 Risk & rollback

- **Risk**: bundler changes can shift cold-start by ±10%. The
  `compression-budget-baseline.json` ratchet catches regressions >5%.
- **Rollback**: `git revert --no-merge <merge-sha>`, then
  `npm ci && npm run build:release`. If the revert is messy (intervening
  commits), use the lockfile snapshot from the previous weekly batch
  (see `03-rollback-procedures.md`).

---

## 2. React (`react`, `react-dom`)

| Field | Value |
|-------|-------|
| Current | `19.2.7` (pinned, no caret) |
| Target | `19.3.x` (rolling minor), `20.0.0` (next major) |
| Horizon | minor: 6 weeks; major: 6+ months |
| Risk | M (minor) / H (major) |
| Rollback | `git revert <merge-sha>` + `npm ci` |

### 2.1 Breaking changes (19.x → 20.x, expected)

- **Server Components**: `react-server` export restrictions tighten;
  any `useState` / `useEffect` accidentally used in RSC files will hard-fail.
  Static check: `grep -rn "use client" src/ | wc -l` should match the RSC map.
- **`forwardRef`**: deprecated since 19, removed in 20 — every ref must be a
  prop now (`function Foo({ ref, ...rest })`). Codemod:
  `npx @react/codemod@latest forward-ref-to-prop src/`.
- **`React.FC`**: implicit children prop removed. Migrate to explicit
  `{ children }: { children?: React.ReactNode }`.
- **`<Context.Provider>` → `<Context value={…}>`**: removed.
- **Suspense fallback**: `null` fallback no longer counts as resolved —
  Suspense boundaries may show the previous fallback twice.

### 2.2 Migration steps

1. Branch: `deps/major-react-YYYY-MM-DD`.
2. Bump `react`, `react-dom`, `@types/react`, `@types/react-dom` in lockstep.
3. Run codemods: `npx @react/codemod@latest <transform> src/`.
4. Run `npm run test:unit:fast && npm run test:vitest && npm run test:e2e`.
5. Manual smoke in Electron (`npm run electron:smoke:packaged`).
6. Verify all `data-testid` hooks still resolve (test ids are stable).

### 2.3 Risk & rollback

- **Risk**: refactor footprint is large. Break into 3 PRs: (a) codemods, (b)
  RSC fixes, (c) Suspense fixes.
- **Rollback**: see `03-rollback-procedures.md` § React-specifics.

---

## 3. SQLite stack (`better-sqlite3`, `sql.js`, `sqlite-vec`)

| Field | Value |
|-------|-------|
| Current | `better-sqlite3@^12.10.0` (optional), `sql.js@^1.14.1`, `sqlite-vec@^0.1.9` |
| Target | `better-sqlite3@^13`, `sql.js@^1.15`, `sqlite-vec@^0.2` |
| Horizon | minor: 8 weeks; major: 6+ months |
| Risk | M (minor) / H (major — native bindings) |
| Rollback | see `03-rollback-procedures.md` § SQLite |

### 3.1 Breaking changes

- **`better-sqlite3` v13**: drops Node 18, requires Node 22+ (already our
  baseline — `>=22.0.0 <23 || >=24.0.0 <27`). N-API ABI v8. Native binary
  rebuilt via `prebuild-install`.
- **`sql.js` v1.15**: WASM binary path moves; if `src/lib/db/sqljs.ts` pins
  the URL it must update.
- **`sqlite-vec` 0.2.x**: vector extension API stabilizes (still pre-1.0).

### 3.2 Migration steps

1. Branch: `deps/major-better-sqlite3-YYYY-MM-DD` (etc., one per pkg).
2. Drop native binary, rebuild: `npm rebuild better-sqlite3` (or
   `npm install --build-from-source` on CI matrix).
3. Verify the open/close round-trip test still passes:
   `node --import tsx --test tests/unit/db-adapters/sqlite-roundtrip.test.ts`.
4. Verify `sqlite-vec` similarity search returns within SLO
   (`<50ms` for 1k vectors) — load test in `tests/integration/`.
5. Run `npm run test:unit:fast && npm run test:integration`.
6. Backup drill: `npm run db:backup` then `npm run db:restore` to a fresh
   `DATA_DIR`.

### 3.3 Risk & rollback

- **Risk**: native bindings may not compile on Windows ARM64 or musl libc.
  CI matrix already exercises linux-x64, linux-arm64, darwin-x64,
  darwin-arm64, win-x64.
- **Rollback**: pin `better-sqlite3@12.10.0` in `package.json`, run
  `npm ci`. Restore the latest pre-upgrade backup.

---

## 4. Pino logging (`pino`, `pino-abstract-transport`, `pino-pretty`)

| Field | Value |
|-------|-------|
| Current | `pino@^10.3.1`, `pino-abstract-transport@^3.0.0`, `pino-pretty@^13.1.3` |
| Target | `pino@^10.x` (rolling minor), `pino@^11` (next major) |
| Horizon | minor: 6 weeks; major: 12+ months |
| Risk | L (minor) / M (major) |
| Rollback | `git revert` + `npm ci` |

### 4.1 Breaking changes (10.x → 11.x, expected)

- **Worker-thread transport default off**: `pino.transport({ target, options })`
  no longer auto-spawns a worker; must pass `{ worker: { autoEnd: true } }`
  explicitly to preserve the old behavior.
- **Redaction paths**: stricter dotted-path matching — `"a.b.c"` no longer
  matches `a.b.c.d` unless suffixed with `".*"`.

### 4.2 Migration steps

1. Branch: `deps/major-pino-YYYY-MM-DD`.
2. Search for redaction paths: `grep -rn "redact:" src/ open-sse/`.
3. Append `.*` to any dotted redaction path that previously matched
   descendants.
4. Run `npm run test:unit:fast && npm run test:vitest`.
5. Smoke test: stream 10k log lines, assert no worker-thread crash.

### 4.3 Risk & rollback

- **Risk**: log-shape regression can hide in production for hours.
  The `pino-pretty` regression test in `tests/unit/observability/log-shape.test.ts`
  catches the worst cases.
- **Rollback**: revert merge commit, `npm ci`.

---

## 5. Undici (`undici`)

| Field | Value |
|-------|-------|
| Current | `^8.3.0` (with `overrides` pinning `jsdom→7.28.0`, `node-gyp→6.27.0`) |
| Target | `^8.x` (rolling minor), `^9` (next major) |
| Horizon | minor: 4 weeks; major: 6 months |
| Risk | L (minor) / H (major — HTTP layer) |
| Rollback | `git revert` + `npm ci` |

### 5.1 Breaking changes

- **9.x**: drops Node 18 (already our baseline), adopts WHATWG Fetch
  `Headers` as the default for `fetch()`. Custom `Agent` connectors must use
  `connect:` not `http2:`.
- **`overrides` block**: must be revisited when bumping undici — the
  `jsdom` and `node-gyp` overrides may conflict with new undici internals.

### 5.2 Migration steps

1. Branch: `deps/major-undici-YYYY-MM-DD`.
2. Resolve `overrides`: try `npm install undici@9` and review any conflict.
3. Run `npm run test:unit:fast` — 66+ executors touch undici.
4. Run `npm run test:integration` — covers connection pool, retries,
   SOCKS proxy (`fetch-socks`), HTTPS agent (`https-proxy-agent`).
5. Smoke `npm run dev` and confirm SSE streams still flush
   (the streaming pipeline uses undici's `body` async iterator).

### 5.3 Risk & rollback

- **Risk**: HTTP layer regression can leak as silent timeouts.
  The `tests/integration/resilience-chaos.test.ts` ratchet catches pool
  exhaustion.
- **Rollback**: revert merge, `npm ci`.

---

## 6. Vitest (`vitest`)

| Field | Value |
|-------|-------|
| Current | `^4.1.7` (devDep) |
| Target | `^4.x` (rolling minor), `^5` (next major) |
| Horizon | minor: 4 weeks; major: 6 months |
| Risk | L (minor) / M (major — config schema) |
| Rollback | `git revert` + `npm ci` |

### 6.1 Breaking changes (4.x → 5.x, expected)

- **`vitest.config.ts`**: `coverage.thresholds` moves under
  `coverage.thresholds.percentage` (was flat). Codemod: `npx vitest@5
  codemod config`.
- **`pool: 'threads'`** becomes default; `vmThreads` is the new opt-in for
  shared-memory pools.
- **Snapshot format**: indentation switches from 2 → 4 spaces (cosmetic only,
  re-record with `vitest --update`).

### 6.2 Migration steps

1. Branch: `deps/major-vitest-YYYY-MM-DD`.
2. Update `vitest.config.ts` and `vitest.mcp.config.ts` per codemod.
3. Re-record snapshots: `npx vitest run -u --config vitest.mcp.config.ts`.
4. Run `npm run test:vitest`.
5. Verify the coverage gate (`npm run coverage:report`) still ≥ 60%.

### 6.3 Risk & rollback

- **Risk**: coverage threshold drift can fail CI silently.
- **Rollback**: revert merge, `npm ci`.

---

## 7. Jest (`jest`)

| Field | Value |
|-------|-------|
| Current | **NOT INSTALLED.** OmniRoute migrated from Jest to Vitest (PR-2050). |
| Target | N/A |
| Horizon | N/A |
| Risk | N/A |
| Rollback | N/A |

### 7.1 Why this entry exists

This PR covers the legacy Jest footprint that may live in:

- `open-sse/` (older modules — `open-sse/utils/setupPolyfill.ts` is the
  legacy shim).
- `electron/` (renderer tests still use Jest).
- Personal branches / fork repos.

### 7.2 Migration steps for any residual Jest code

1. Move `jest.config.*` → `vitest.config.*` (most options map 1:1; see
   vitest migration guide).
2. Replace `jest.mock()` → `vi.mock()`.
3. Replace `expect(...).resolves.toBe()` (Jest 29) — Vitest uses identical
   semantics.
4. Run `npm run test:vitest` and `npm run test:unit:fast`.

### 7.3 Risk & rollback

- **Risk**: Electron renderer tests need a DOM; keep `@vitest/ui` plus
  `jsdom` env.
- **Rollback**: revert the migration commit; legacy Jest config is preserved
  in git history.

---

## 8. TypeScript (`typescript`)

| Field | Value |
|-------|-------|
| Current | `^6.0.3` (devDep) |
| Target | `^6.x` (rolling minor), `^7.0` (next major) |
| Horizon | minor: 4 weeks; major: 6 months |
| Risk | L (minor) / H (major — strictness ratchet) |
| Rollback | `git revert` + `npm ci` |

### 8.1 Breaking changes (6.x → 7.x, expected)

- **`noUncheckedIndexedAccess`**: on by default — every `array[i]` becomes
  `T | undefined`. Already gated by
  `tsconfig.typecheck-noimplicit-core.json`; will not surprise us.
- **`exactOptionalPropertyTypes`**: on by default — `{ x?: number }` no
  longer accepts `{ x: undefined }`.
- **`isolatedDeclarations`**: required for cross-package type emit; affects
  `open-sse` and any future workspace.
- **Type-only import enforcement**: `import type` is required for
  type-only references (was already enforced by `eslint-config-next`).

### 8.2 Migration steps

1. Branch: `deps/major-typescript-YYYY-MM-DD`.
2. Bump in lockstep with `@types/*` packages.
3. Run codemods: `npx typescript-codemod@latest <transform> src/ open-sse/`.
4. Run `npm run typecheck:core && npm run typecheck:noimplicit:core`.
5. Run `npm run check:type-coverage` — must stay at 100% (`>= 99.5%` to land).
6. Run `npm run test:unit:fast`.

### 8.3 Risk & rollback

- **Risk**: the strictness ratchet can surface thousands of new errors at
  once. Land in 2 PRs: (a) TS 7 only, (b) strictness follow-up.
- **Rollback**: revert merge, `npm ci`. The previous TS 6 lockfile snapshot
  is recoverable.

---

## 9. `@types/node`

| Field | Value |
|-------|-------|
| Current | `^26.0.0` |
| Target | `^26.x` (rolling minor), `^27` (next major) |
| Horizon | minor: 4 weeks; major: 6 months |
| Risk | L (minor) / M (major — API additions/removals) |
| Rollback | `git revert` + `npm ci` |

### 9.1 Why this is Renovate-only (not Dependabot)

`@types/node` bumps **daily** on Node release days. Dependabot would open a PR
every day; Renovate batches them by weekday with `prConcurrentLimit: 3`.

### 9.2 Breaking changes (26 → 27, expected)

- Node 27 ships the finalized `WebSocket` global; `@types/node` drops the
  `WebSocket` namespace from `node:`.
- `process.versions` keys may shift (already pinned to Node `>=22 <23 ||
  >=24 <27`).

### 9.3 Migration steps

1. Branch: `deps/major-types-node-YYYY-MM-DD`.
2. Bump + run `npm run typecheck:core`.
3. If `WebSocket` is imported from `node:` or `ws`, switch to the global
   `WebSocket` (already polyfilled via `open-sse/utils/setupPolyfill.ts`).
4. Run `npm run test:unit:fast`.

### 9.4 Risk & rollback

- **Risk**: low — `@types/*` is types-only, runtime is unaffected.
- **Rollback**: revert merge, `npm ci`.

---

## 10. Cross-cutting checks (run before any major PR merges)

```bash
# 1. Type check (core + noimplicit)
npm run typecheck:core
npm run typecheck:noimplicit:core

# 2. Lint + complexity
npm run lint
npm run check:complexity
npm run check:cognitive-complexity

# 3. Unit tests
npm run test:unit:fast

# 4. Vitest (UI / MCP)
npm run test:vitest
npm run test:vitest:ui

# 5. Integration
npm run test:integration

# 6. Audit + license
npm run audit:deps
npm run check:licenses

# 7. Bundle size (must stay within +10% of baseline)
npm run check:bundle-size

# 8. Build + standalone smoke
npm run build:release
npm run check:pack-artifact
```

If any of these fail, the major PR is **not mergeable**. Fix or roll back —
do not force-merge around red.

---

## 11. Change history

| Date       | Version | Change |
| ---------- | ------- | ------ |
| 2026-06-25 | v3.8.37 | Initial per-package plan (PR-014). |