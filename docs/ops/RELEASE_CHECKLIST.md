---
title: "Release Checklist"
version: 3.8.2
lastUpdated: 2026-05-13
---

# Release Checklist

> **Last updated:** 2026-05-13 — v3.8.0
> Streamlined release flow that leverages Claude Code skills for automation.
>
> **Manter a fila/branch verdes entre releases:** veja [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (família `/green-prs` + `npm run check:release-green` + `/babysit` + nightly). Rodar
> periodicamente — e principalmente **antes** deste checklist — faz a release PR nascer verde.

## TL;DR

```bash
# 1. Bump version + generate CHANGELOG (skill)
/version-bump-cc patch    # or minor/major

# 2. Run quality gate locally
npm run check              # lint + tests
npm run test:coverage      # full coverage gate (75/75/75/70)

# 3. Build & smoke
npm run build
npm run test:e2e           # optional but recommended

# 4. Generate release (skill)
/generate-release-cc

# 5. Deploy (skill)
/deploy-vps-both-cc        # or akamai-cc / local-cc

# 6. Capture release evidences (skill)
/capture-release-evidences-cc
```

## Detailed Checklist

### Pre-release

- [ ] All PRs targeted to this release are merged to `release/vX.Y.0`
- [ ] All open Linear/issue items for this version are closed or pushed to next milestone
- [ ] CI green on `release/vX.Y.0` branch
- [ ] No `TODO(release)` markers in code: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker base image up to date (currently `node:24.15.0-trixie-slim`)

### Version & Changelog

- [ ] Run `/version-bump-cc <patch|minor|major>` (Claude Code skill)
  - Bumps `package.json`, `electron/package.json`
  - Regenerates `CHANGELOG.md` from git commits since last tag
  - Updates README.md badges
- [ ] Manually review CHANGELOG.md and clean up commit messages if needed
- [ ] Ensure the latest semver section in `CHANGELOG.md` equals `package.json` version
- [ ] Keep `## [Unreleased]` as the first changelog section for upcoming work
- [ ] Update `docs/openapi.yaml` → `info.version` must equal `package.json` version

### Code Quality

- [ ] `npm run lint` — 0 errors (warnings are pre-existing)
- [ ] `npm run typecheck:core` — clean
- [ ] `npm run typecheck:noimplicit:core` — clean (strict)
- [ ] `npm run check:cycles` — no circular deps
- [ ] `npm run check:any-budget:t11` — within budget
- [ ] `npm run check:route-validation:t06` — clean
- [ ] `npm run check:node-runtime` — supported floor met (`>=20.20.2 <21`, `>=22.22.2 <23`, `>=24.0.0 <25`)

### Testing

- [ ] `npm run test:unit` — pass
- [ ] `npm run test:vitest` — pass (MCP server, autoCombo, cache)
- [ ] `npm run test:coverage` — gate 75/75/75/70 satisfied (statements/lines/functions/branches)
- [ ] `npm run test:integration` — pass (if changes touch DB / handlers)
- [ ] `npm run test:e2e` — pass (UI changes)
- [ ] `npm run test:protocols:e2e` — pass (MCP/A2A changes)
- [ ] `npm run test:ecosystem` — pass

### Hooks (Husky validated)

Husky hooks live in `.husky/` and run automatically on git operations.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** currently disabled (commented out). When re-enabled, runs `npm run test:unit`.
  - Run `npm run test:unit` manually before pushing release branches.

If a hook fails: fix the underlying issue, don't bypass with `--no-verify`.

### Conventional Commits

All release-bound commits must follow `type(scope): subject` format.

**Valid types:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Valid scopes:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Breaking changes: add `BREAKING CHANGE:` footer or `!` after the scope (e.g. `feat(api)!: drop /v0`).

### Documentation

- [ ] `npm run check:docs-sync` passes (auto-run by pre-commit)
- [ ] `npm run check:docs-all` passes (umbrella: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` exits 0 — code ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` env contract is intact
- [ ] `npm run check:doc-links` exits 0 — no broken internal markdown references after restructuring
- [ ] `docs/architecture/ARCHITECTURE.md` reviewed for storage/runtime drift
- [ ] `docs/guides/TROUBLESHOOTING.md` reviewed for env var and operational drift
- [ ] If `.env.example` changed: `docs/reference/ENVIRONMENT.md` updated
- [ ] If new feature has a UI: `docs/guides/USER_GUIDE.md` mentions it
- [ ] If new feature has API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` updated
- [ ] If new feature is a module: dedicated `docs/<MODULE>.md` exists
- [ ] If breaking change: `docs/guides/TROUBLESHOOTING.md` has migration note

### i18n

- [ ] `npm run i18n:check` exits 0 — translation state (`.i18n-state.json`) in sync with source docs (no drifted sources in strict mode; warn-mode advisory is acceptable for last-minute doc touch-ups, but should be 0 before tagging)
- [ ] `npm run i18n:check-ui-coverage` exits 0 — every UI locale at or above the 80% coverage floor
- [ ] `npm run i18n:sync-ui:dry` reports 0 missing keys across all 42 locales
- [ ] If source English docs changed, run `npm run i18n:run` (requires `OMNIROUTE_TRANSLATION_API_KEY` in `.env`) before tagging
- [ ] Translation contributions can be deferred to next release if minor (track in CHANGELOG)

### Database Migrations

- [ ] If `src/lib/db/migrations/` has new files:
  - [ ] Each migration is idempotent (`CREATE TABLE IF NOT EXISTS`, etc.)
  - [ ] Migrations wrapped in transactions
  - [ ] Numbered correctly (no gaps in sequence)
- [ ] Test on fresh install: delete `~/.omniroute/omniroute.db` and run `npm run dev`
- [ ] Test on existing install: backup DB, run migration, verify schema
- [ ] WAL files (`-wal`, `-shm`) handled correctly if migration rewrites tables

### Provider Catalog (Zod-validated)

- [ ] `src/shared/constants/providers.ts` Zod schema valid at load time
  - [ ] All providers have required fields (`id`, `label`, `kind`, etc.)
  - [ ] `freeNote` provided for new free providers
  - [ ] OAuth providers have `oauthConfig` registered in `src/lib/oauth/constants/oauth.ts`
- [ ] If new provider added: corresponding executor in `open-sse/executors/`
- [ ] If non-OpenAI format: translator in `open-sse/translator/`
- [ ] Models registered in `open-sse/config/providerRegistry.ts`
- [ ] Unit tests in `tests/unit/` cover provider classification and routing

### Desktop (Electron)

If `electron/` changed:

- [ ] `npm run electron:smoke:packaged` passes
- [ ] Builds tested for at least one of `:win`, `:mac`, `:linux`
- [ ] Code signing certs not expired (if signing)
- [ ] `electron/package.json` version matches root `package.json`
- [ ] Auto-update channel pointer updated if releasing to `stable`

### Build Layout

The repository uses three distinct output directories — never mix them up:

| Directory     | Purpose                                                       | Tracked? |
| ------------- | ------------------------------------------------------------- | -------- |
| `src/`        | Application source (TypeScript / TSX)                         | Yes      |
| `.build/`     | Build intermediates — `next build` output (`distDir`)         | No (gitignored) |
| `dist/`       | Shippable npm bundle — assembled by `assembleStandalone`      | No (gitignored) |

> **Operator note:** the remote VPS image directory remains `/usr/lib/node_modules/omniroute/app/`.
> Only the **in-repo** build output moved (`app/` → `dist/`). The deploy skills rsync
> `dist/` contents into the remote `app/` dir — no VPS path changes required.

**Single-build flow:**

```
npm run build:release
  └─ rm -rf .build dist          (clean)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (copies standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

Do NOT run `npm run build` followed by a separate `npm run build:cli` for deploy — use
`npm run build:release` which does a clean rebuild + sentinel in one command.

### Artifact Validation

- [ ] `npm run build:release` succeeds and `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` clean — no `app.__qa_backup`, `scripts/scratch`, `package-lock.json`, or other local residue
- [ ] `dist/server.js` exists after build

### Tagging & Release

- [ ] Run `/generate-release-cc` (Claude Code skill):
  - Creates tag `vX.Y.Z`
  - Pushes tag and branch
  - Opens GitHub Release with changelog body
  - Attaches Electron installers (if built)
- [ ] Or manually:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Deploy

Deploy skills use the light rsync flow — no `npm pack`, no `npm i -g`:

- [ ] Use deploy skill that matches target:
  - `/deploy-vps-local-cc` — local VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — both
- [ ] Before deploying, confirm `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Build must run where `node_modules` is real (main checkout or `npm ci`'d worktree — NOT a symlinked worktree)
- [ ] Smoke test deployed instance:
  - Open `/dashboard/health` → check version string matches release
  - Run a `/v1/chat/completions` request against a known provider
  - Verify `/api/monitoring/health` returns `CLOSED` circuit breakers
  - Confirm MCP transports respond (`/mcp` HTTP, `/mcp-sse` SSE)

### Post-release

- [ ] Run `/capture-release-evidences-cc` (Claude Code skill)
  - Captures WebP screenshots/recordings of new features
  - Attaches to release notes / blog post
- [ ] Update GitHub Discussions / Discord with release announcement
- [ ] Open milestone for next version
- [ ] If critical: pin discussion or post in `news.json` for in-app banner

## Embedded Services smoke (v3.8.4+)

Before shipping any release that includes embedded services changes, verify:

### Fresh-DB boot (catches migration collisions — added after v3.8.4 hotfix)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — wait 10 s for boot
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` returns `"9router"` (NOT 404, NOT 500). Confirms migration `071_services.sql` applied + row seeded.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` returns 3 rows.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` returns 2 rows (validates `070_webhooks_kind_metadata.sql` applied).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` passes — guards against future collisions.

### 9Router

- [ ] `POST /api/services/9router/install` returns 200 with `installedVersion` in under 2 min
- [ ] `POST /api/services/9router/start` returns 200 and `state: "running"` in under 30 s
- [ ] `GET /api/services/9router/status` reports `health: "healthy"`
- [ ] `POST /v1/chat/completions` with `"model": "9router/auto/..."` returns 200 (end-to-end routing through 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` renders the 9Router native UI inside the proxy (no direct `127.0.0.1:port` iframe)
- [ ] `POST /api/services/9router/rotate-key` returns `{ keyRotated: true }` and service restarts cleanly
- [ ] `POST /api/services/9router/stop` returns 200 and `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` returns SSE stream with `snapshot` event containing recent lines
- [ ] Install in environment without `npm` in PATH returns 500 with a friendly (non-stack-trace) error message

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` returns 200 in under 2 min
- [ ] `POST /api/services/cliproxy/start` returns 200 and `state: "running"` in under 30 s
- [ ] `GET /api/services/cliproxy/status` reports `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` returns 200 and `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` returns SSE stream

### Security regression

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` returns `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` returns `403 LOCAL_ONLY`
- [ ] Error responses from `/api/services/*` do not contain `err.stack` or absolute file paths

## v3.8.0+ checks

Before shipping any v3.8.x release, verify these additional items:

- [ ] `omniroute --tray` boots on macOS (systray2 installed into `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` boots on Linux (requires DISPLAY; graceful error if not set)
- [ ] `omniroute --tray` boots on Windows (PowerShell NotifyIcon, no extra binaries)
- [ ] `omniroute config tray enable` creates autostart entry; disable removes it
- [ ] `npm install -g omniroute@<this-version>` runs postinstall without fatal exit
- [ ] Update path keeps optional deps: `omniroute update --apply` and the auto-updater
      run `npm install -g … --include=optional` so `optionalDependencies` (better-sqlite3,
      keytar, tls-client, and the llmlingua SLM stack: `@atjsh/llmlingua-2`,
      `@huggingface/transformers@3.5.2`, `@tensorflow/tfjs`, `js-tiktoken`) survive an update.
      `@huggingface/transformers` stays optional so its `onnxruntime-node` CUDA provider postinstall
      cannot abort installation on CUDA 11 hosts. The ultra `modelPath` SLM tier also needs the
      tinybert model, auto-downloaded to `${DATA_DIR}/models/llmlingua` on first use. Postinstall
      (`scripts/build/colocateOptionals.mjs`) then co-locates the SLM optional closure into
      `dist/node_modules` so the worker resolves a SINGLE `@huggingface/transformers` 3.5.2
      optional instance — the standalone trace bundles only transformers, not the dynamically-imported
      optionals, so without this the worker would load llmlingua-2 against the root's transformers
      and the SLM tier would silently fail-open.
- [ ] `omniroute status` works with no `.env` (CLI token path, loopback only)
- [ ] `curl http://localhost:20128/api/shutdown` returns 401 (always-protected route)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` returns 401 (loopback guard)
- [ ] SQLite runtime resolves to `bundled` on first run (bundled binary valid for platform)
- [ ] SQLite runtime falls back to `runtime` when `node_modules/better-sqlite3` is deleted
- [ ] Smart MCP filter compresses real `playwright-mcp browser_snapshot` output (≥50% reduction)
- [ ] All 10 `skills/omniroute*/SKILL.md` files are publicly fetchable via raw GitHub URL
- [ ] Onboarding wizard shows "How It Works" tier tour step on fresh setup
- [ ] Home dashboard tier coverage widget shows configured/active counts

---

## Rollback

If release has critical issue:

1. `gh release edit vX.Y.Z --prerelease` (marks as not latest)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (only if not yet adopted by users)
3. Or: hotfix on `release/vX.Y.0` → patch release `vX.Y.(Z+1)`
4. Communicate in GitHub Discussions and Discord immediately

## Hard Rules

- Never commit directly to `main`
- Never use `git push --force` to `main` or `release/*` branches
- Never skip Husky hooks (`--no-verify`)
- Never commit secrets, credentials, or `.env` files
- Coverage must stay ≥75/75/75/70 (statements/lines/functions/branches)
- Always include or update tests when changing production code in `src/`, `open-sse/`, `electron/`, or `bin/`

## Automated Sync Check

Run the docs sync guard locally before opening a PR:

```bash
npm run check:docs-sync
```

CI also runs this check in `.github/workflows/ci.yml` (lint job).
