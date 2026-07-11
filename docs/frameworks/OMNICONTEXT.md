---
title: "OmniContext (Continuity Plane)"
version: 3.8.47
lastUpdated: 2026-07-11
---

# OmniContext — Continuity Plane

> **Source of truth:** `src/lib/omnicontext/`, `src/lib/db/omnicontext*.ts`,
> `open-sse/services/omnicontext/`, `open-sse/mcp-server/tools/omnicontextTools.ts`
> **Last updated:** 2026-07-11

**OmniContext** is OmniRoute’s team-scoped **Continuity Plane**: project artifacts,
handoffs, and inject/retrieve so agents share durable work context across tools and
sessions. Code, APIs, and tables use the `omnicontext` prefix.

It is **not**:

- Conversational [Memory](./MEMORY.md) (per-API-key FTS5 / vector recall)
- Combo [context sharing / universal handoff](../architecture/CONTEXT_SHARING.md)
  (ephemeral mid-combo model switches)

| Concern | Memory                            | Context sharing    | OmniContext            |
| ------- | --------------------------------- | ------------------ | ---------------------- |
| Scope   | API key (+ session)               | Combo session      | Project / team         |
| Store   | `memory_entries` / `vec_memories` | `context_handoffs` | `omnicontext_*`        |
| Default | Off                               | Handoff on         | Off (`enabled: false`) |

## Defaults & safety

| Setting              | Default              | Notes                                                                       |
| -------------------- | -------------------- | --------------------------------------------------------------------------- |
| `enabled`            | `false`              | Inject is opt-in                                                            |
| `hybridRetrieve`     | `false`              | FTS-only until enabled                                                      |
| `embedSource`        | `local`              | Hash embed; `memory-auto` reuses Memory `embed()`                           |
| Inject               | Fail-open            | Timeout / circuit → skip inject                                             |
| Publish              | Fail-closed          | Membership + redaction / DLP gates                                          |
| Continuity redaction | Always-on at publish | Secrets/email in `redact.ts` — **does not** flip Hard Rule #20 PII defaults |

Per-request opt-out: `x-omniroute-no-omnicontext`.

## Architecture

```
Client → /v1/chat/completions
  → omnicontextInjection (open-sse) — fail-open
  → resolve scope (headers / repo map / membership)
  → retrieveForProjectCached (FTS or hybrid)
  → buildInjectBlock → system/context message

Publish → redact → optional DLP → createArtifact → embed index
  → omnicontext_artifacts (+ FTS) / omnicontext_artifact_embeddings
```

### Domain modules (`src/lib/omnicontext/`)

| Module                                                    | Role                                           |
| --------------------------------------------------------- | ---------------------------------------------- |
| `settings.ts`                                             | Cached settings + defaults                     |
| `retrieve.ts` / `hybridRetrieve.ts` / `retrieveCached.ts` | Keyword / hybrid / cache+breaker               |
| `embed.ts` / `localEmbed.ts`                              | Local hash + optional Memory `embed()`         |
| `publish.ts` / `promote.ts` / `feedback.ts`               | Publish, review, promote-to-stable             |
| `inject.ts` / `assembler.ts`                              | Budgeted inject block                          |
| `handoffs` (DB) + MCP tools                               | Cross-tool handoff packets                     |
| `scimSync.ts`                                             | **Push-payload** membership sync (no live IdP) |
| `eval/retrievalEval.ts`                                   | Recall@3 harness (CI gate)                     |

### Persistence

Migrations `119`–`122` under `src/lib/db/migrations/`. Domain modules:
`omnicontextProjects`, `omnicontextArtifacts`, `omnicontextHandoffs`,
`omnicontextEmbeddings`, `omnicontextFeedback`, `omnicontextAudit`,
`omnicontextRepoMap`, `omnicontextTeams`.

## Embeddings (hybrid)

1. **Default `embedSource: "local"`** — `localHashEmbed` (64-d), model tag
   `omnicontext-local-hash`. Offline, deterministic.
2. **Opt-in `embedSource: "memory-auto"`** — calls Memory
   [`embed()`](./MEMORY.md) (`src/lib/memory/embedding/`), stores vectors in
   `omnicontext_artifact_embeddings` with model tag `memory:<source>:<model>`.
   On failure → local hash (`local-fallback`). Cosine only across matching model/dims.
3. Vectors are **never** written into Memory’s `vec_memories`.

## HTTP surfaces

### Management (dashboard session)

| Method    | Path                                       | Purpose                        |
| --------- | ------------------------------------------ | ------------------------------ |
| GET/PUT   | `/api/omnicontext/settings`                | Feature settings               |
| GET/POST  | `/api/omnicontext/projects`                | List / create projects         |
| GET/PATCH | `/api/omnicontext/projects/:id`            | Project detail / update        |
| *         | `/api/omnicontext/projects/:id/members`    | Membership                     |
| *         | `/api/omnicontext/projects/:id/artifacts`  | Artifacts                      |
| *         | `/api/omnicontext/projects/:id/handoffs`   | Handoffs                       |
| POST      | `/api/omnicontext/projects/:id/bootstrap`  | Seed from AGENTS/CLAUDE/README |
| POST      | `/api/omnicontext/projects/:id/legal-hold` | Legal hold                     |
| GET       | `/api/omnicontext/metrics`                 | Inject/retrieve metrics        |
| GET/POST  | `/api/omnicontext/teams`                   | Teams                          |
| POST      | `/api/omnicontext/repo-map`                | Repo → project map             |
| POST      | `/api/omnicontext/scim/sync`               | SCIM-like **push** sync        |

### Client API (Bearer)

Under `/api/v1/omnicontext/`: `projects`, `artifacts`, `retrieve`, `handoffs`,
`feedback`, `bootstrap`, `scope`, `metrics/summary`.

## MCP tools (7)

Registered in `omnicontextTools.ts`:

- `omniroute_omnicontext_list_projects`
- `omniroute_omnicontext_retrieve`
- `omniroute_omnicontext_publish`
- `omniroute_omnicontext_handoff_create`
- `omniroute_omnicontext_handoff_action`
- `omniroute_omnicontext_list_handoffs`
- `omniroute_omnicontext_bootstrap`

## Retrieval eval (CI)

Harness: `src/lib/omnicontext/eval/` (fixtures + `runRetrievalEvalSuite`).
Gate: **Recall@3 ≥ 0.85** and no wrong-project leak.

```bash
npm run test:omnicontext:retrieval-eval
```

CI job: `test-omnicontext-retrieval-eval` in `.github/workflows/ci.yml`
(blocking; also covered by `test-unit` shards).

This is **not** the LLM golden-set framework in [`EVALS.md`](./EVALS.md).

## SSO / SCIM (deferred live IdP)

`syncProjectMembersFromScim` accepts an operator-pushed payload of
`{ apiKeyId, role?, externalId?, email? }` and adds project members.

**Deferred:** live Okta / Microsoft Entra connectors. OmniRoute has no Continuity
OIDC/SCIM client today (unrelated: MITM `okta.com` TLS bypass; Kiro Entra token
import). Keep push sync until a user directory exists.

## Dashboard

Continuity UI under the dashboard OmniContext / Continuity surfaces (settings,
projects, teams, advanced hybrid). E2E smoke: `tests/e2e/omnicontext-dashboard.spec.ts`.

## Related docs

- Design working copy: `_tasks/superpowers/specs/2026-07-10-continuity-plane-on-omniroute-design.md`
- [MEMORY.md](./MEMORY.md) — per-key memory (separate store)
- [MCP-SERVER.md](./MCP-SERVER.md) — tool registration
- [EVALS.md](./EVALS.md) — LLM evals (distinct from retrieval eval)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — system map
