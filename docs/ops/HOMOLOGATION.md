---
title: "Homologation Suite (npm run homolog)"
version: 3.8.49
lastUpdated: 2026-07-14
---

# Homologation Suite (`npm run homolog`)

Real-environment E2E validation of the OmniRoute deploy running on the homologation VPS
(`HOMOLOG_BASE_URL`, e.g. `http://192.168.0.15:20128`). One command replaces the manual
release STOP #2 checklist with an automated, evidence-producing run.

## What it covers

| Layer                  | What it checks                                                                                                                                                                                            | Implementation                                                                |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — health/parity     | `/api/monitoring/health` responds `200` with `status: "healthy"` and the expected version                                                                                                                 | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — ephemeral key    | Admin login → `POST /api/keys` creates a scoped API key for the run, revoked (`DELETE /api/keys/:id`) in a `finally` block regardless of outcome                                                          | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API surface      | `/v1/models` catalog, a real non-streaming chat completion (tier-critical model, `max_tokens: 5`), an invalid-key `401`, and public `/api/monitoring/health`                                              | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE streaming    | Real streaming chat completion; asserts `text/event-stream`, at least one content delta, and a `[DONE]` terminator                                                                                        | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — real providers    | One minimal-cost chat request per critical provider present in the live `/v1/models` catalog, generated on the fly via promptfoo                                                                          | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — UI auth          | Logs in once via the real login form and reuses the session (`storageState`) across the UI layer                                                                                                          | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — UI routes        | Every static `page.tsx` under `src/app/(dashboard)/dashboard` (discovered from the filesystem, dynamic `[param]` routes skipped) loads without an HTTP error, a page error, or the Next.js error boundary | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — UI critical flow | Creates an API key through the dashboard UI and revokes it again (leaves no residue on the VPS)                                                                                                           | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — unified report    | Merges httpYac (via `junit-to-ctrf`), the promptfoo→CTRF adapter, and the Playwright CTRF reporter into one `homolog-ctrf.json`, plus a human-readable `homolog-report/summary.md`                        | `scripts/homolog/run.mjs`                                                     |

Zero LLM involvement in the replay itself — this is a deterministic regression battery,
not an eval. AI only enters in future maintenance work (see Roadmap below).

## Prerequisites

1. Copy `.env.homolog.example` to `.env.homolog` (gitignored — never commit it) and fill in:
   - `HOMOLOG_BASE_URL` — the target deploy, e.g. `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — the dashboard management password for that deploy.
   - `HOMOLOG_CRITICAL_PROVIDERS` — comma-separated provider prefixes that get a real
     smoke chat request (e.g. `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — leave empty in normal runs; the suite creates and revokes its
     own ephemeral key. Only set this to debug a single layer in isolation.
2. `npm install` in the repo (the suite's dependencies — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — are regular devDependencies).
3. `npx playwright install` if the browser binaries are not already present.

## How to run

```bash
npm run homolog
```

To validate against a deploy whose version does not match the local `package.json`
(e.g. a homologation box still on a previous patch release), override the expected
version explicitly:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

The run exits non-zero if any layer fails, and always attempts to revoke the ephemeral
API key it created, even on failure (`finally` block in `scripts/homolog/run.mjs`).

## Reading the report

All output lands in `homolog-report/` (gitignored):

- `summary.md` — the same table printed to stdout, one row per layer (✅/❌ + detail).
- `homolog-ctrf.json` — the unified CTRF report (merge of API/SSE, provider-smoke, and
  UI results) — this is the artifact to attach to a release STOP #2 checklist.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — the
  per-layer raw/intermediate reports.
- `promptfooconfig.yaml`, `provider-misses.json` — the generated promptfoo config for
  the current run and any critical providers that were missing from the live catalog.

A failing L0 aborts immediately (no ephemeral key is created) since a version/health
mismatch means every downstream layer would be validating the wrong deploy.

## Re-baselining when the UI changes legitimately

L4b (route smoke) and L4c (API-key UI flow) are driven by real DOM locators, not
snapshots, so most legitimate UI changes do not require any suite update. When a change
does break a locator (e.g. a renamed button label or a moved settings page):

1. Re-confirm the locator against the current source (the specs already document which
   file/line each locator was confirmed against — follow the same pattern, don't guess).
2. Update the spec in `tests/homolog/ui/`.
3. Re-run `npm run homolog` (or just the affected Playwright spec) against the VPS to
   confirm the fix, then commit.

There is no visual/pixel baseline in this suite (F1) — see Roadmap for that.

## Roadmap (F2 / F3)

Design and phased rollout live in the internal planning spec
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (not linked — internal
`_tasks/` artifact, not part of this repo's tracked docs). Summary:

- **F2** — full walkthrough recording → Playwright Test Agents (`planner`/`generator`)
  turn it into flow specs (create combo, test provider, edit settings, MCP tools) +
  visual regression baseline (Lost Pixel) with masks over dynamic data (metrics,
  timestamps, logs) + a `healer` maintenance routine per release.
- **F3** — resilience/contract/wiring coverage: toxiproxy + a fake OpenAI-compatible
  provider on the devbox, a `homolog-resilience` combo on the VPS pointed at it
  (injected timeout → assert fallback + circuit breaker open/close via
  `/api/monitoring/health`); gated Schemathesis contract testing against
  `docs/openapi.yaml` (low `--max-examples`, fixed seeds, non-LLM endpoints only); and
  wiring `npm run homolog` + its `summary.md` into the `/generate-release` STOP #2 phase.
