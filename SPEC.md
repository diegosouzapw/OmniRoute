# OmniRoute — Specification

> Status: **Living document** — updated as the repo evolves.
> Last updated: 2026-06-08

## Purpose

`OmniRoute` is the **provider-agnostic LLM routing layer** for the Phenotype
ecosystem. It accepts chat/completion requests from any Phenotype service,
selects the right provider (OpenAI, Anthropic, Azure OpenAI, local vLLM, etc.)
based on policy + cost + latency + capability, and forwards the request. The
goal is "drop-in replacement for the OpenAI SDK, but routes across providers".

This is a **service-style repo** (a Next.js application exposing an HTTP API),
not a library.

## Repo Layout

```
OmniRoute/
├── src/                    # Next.js application source (the actual product)
│   ├── app/                # App Router pages + API routes
│   ├── components/         # React components
│   ├── lib/                # Core business logic (provider adapters, router)
│   ├── hooks/              # React hooks
│   ├── styles/             # CSS / Tailwind config
│   └── types/              # TypeScript type definitions
├── tests/                  # e2e + integration tests
├── docs/                   # English docs (authored, NOT i18n)
│   ├── i18n/               # ⚠️ auto-generated translations (gitignored)
│   └── operations/         # operational runbooks
├── scripts/                # build/i18n/audit scripts
├── public/                 # static assets
├── open-sse/               # ⚠️ vendored SDK (should be its own package)
├── @omniroute/             # internal SDK monorepo subpackage
├── AGENTS.md               # agent operating instructions
└── SPEC.md                 # this file
```

## Design Principles

1. **Provider-agnostic** — every provider is behind a `ProviderAdapter` trait;
   adding a new provider does not change the routing logic.
2. **Policy is data, not code** — routing rules, model aliases, and rate limits
   live in JSON/YAML config, not hardcoded.
3. **Streaming-first** — every provider must support SSE streaming or its
   equivalent; non-streaming paths are second-class citizens.
4. **Cost is visible** — every completion has a cost estimate in the response
   metadata, never a surprise bill.
5. **No lock-in** — the on-disk conversation log is portable; users can export
   to OpenAI/Anthropic JSONL at any time.

## Core Components

### Router (`src/lib/router.ts`)

- Selects a provider from the configured pool based on:
  - Model name (alias → provider)
  - Cost (cheapest first, with quality floor)
  - Latency budget (fastest first, with cost ceiling)
  - Rate limits (skip providers at quota)
- Returns a `CompletionResponse` with `provider`, `cost_usd`, `latency_ms` metadata
- On provider failure: falls back to next-best provider, capped at 3 attempts

### Provider Adapters (`src/lib/providers/*.ts`)

- Each provider implements the `ProviderAdapter` interface
- Built-in: OpenAI, Anthropic, Azure, Google Vertex, local vLLM, Ollama
- Custom: BYOK (bring-your-own-key) via the `CustomProvider` base class

### Auth & Quota (`src/lib/auth.ts`, `src/lib/quota.ts`)

- API key validation (HS256 JWT or session cookie)
- Per-user / per-tenant rate limits (token bucket)
- Cost caps (configurable per user/tenant)

### UI (`src/app/`, `src/components/`)

- Chat playground (single-user, real-time)
- Admin dashboard (multi-tenant overview, cost analytics)
- Settings (provider keys, model aliases, routing rules)

## Test & Coverage Governance

- **Unit + integration tests** under `tests/` (vitest, not jest — see ADR-0002)
- **E2E** under `tests/e2e/` (Playwright)
- **Coverage floor**: 70% (see ADR-0003 for rationale)
- **No i18n tests** — i18n is auto-generated, not authored

## Decomposition Plan (See ADR-0004)

The repo is too large for one package. Decomposition targets:

| Package | Current LOC | Target |
|---|---|---|
| `@omniroute/sdk` (extracted from `@omniroute/`) | 10K | 10K — extract as standalone npm pkg |
| `@omniroute/open-sse` (extracted from `open-sse/`) | 106K | 50K — strip vendor fork, keep only diff from upstream |
| `omniroute` (app) | 219K (src) + 50K (real tests) | 200K — keep as is |
| `omniroute-docs` (extracted) | 22K EN + 0 (i18n) | 22K — separate repo, i18n is generated artifact |
| **Total** | **407K** | **282K** (-31%) |

i18n content (682K MD LOC) is **auto-generated** and should be gitignored
(see ADR-0005).

## Open Questions

- Should `omni-router` be a standalone npm package, or stay in the monorepo?
  (Tracked in ADR-0004.)
- Should we deprecate the in-app conversation log in favor of streaming to
  S3 / external store? (Tracked in PLAN.md Backlog.)

## Cross-References

- `AGENTS.md` — agent operating instructions
- `docs/operations/` — operational runbooks
- `docs/adr/0001-record-architecture-decisions.md` — ADR template
- `docs/adr/0002-test-runner-vitest-vs-jest.md` — vitest adoption
- `docs/adr/0003-coverage-floor-70-pct.md` — coverage rationale
- `docs/adr/0004-decomposition-into-packages.md` — the split
- `docs/adr/0005-i18n-gitignore-strategy.md` — i18n handling
