---
title: "Release Checklist"
version: 3.8.0
lastUpdated: 2026-05-13
---

# Release Checklist

> **Last updated:** 2026-05-13 — v3.8.0
> Streamlined release flow that leverages Claude Code skills for automation.

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
- [ ] Update `docs/reference/openapi.yaml` → `info.version` must equal `package.json` version

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
- [ ] If new feature has API: `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` updated
- [ ] If new feature is a module: dedicated `docs/<MODULE>.md` exists
- [ ] If breaking change: `docs/guides/TROUBLESHOOTING.md` has migration note

### i18n

- [ ] `npm run i18n:check` exits 0 — translation state (`.i18n-state.json`) in sync with source docs (no drifted sources in strict mode; warn-mode advisory is acceptable for last-minute doc touch-ups, but should be 0 before tagging)
- [ ] `npm run i18n:check-ui-coverage` exits 0 — every UI locale at or above the 80% coverage floor
- [ ] `npm run i18n:sync-ui:dry` reports 0 missing keys across all 40 locales
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

### Artifact Validation

- [ ] `npm run build:cli` succeeds
- [ ] `npm run check:pack-artifact` clean — no `app.__qa_backup`, `scripts/scratch`, `package-lock.json`, or other local residue
- [ ] `npm run build` produces a working standalone Next.js bundle

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

- [ ] Use deploy skill that matches target:
  - `/deploy-vps-local-cc` — local VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — both
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
