# Routing Convergence Status (v8, 2026-06-18)

Companion to [ADR-001: OmniRoute as Canonical Routing Project](./ADR-001-canonical-routing.md)
and `ADR-009: Bifrost Disambiguation`.

This note records the **cross-repo convergence state** for the Phenotype
routing cluster under the **reverse-KISS principle**: one routing framework
others consume.

> **Last updated**: 2026-06-18 (this turn, in `chore/l5-109-omniroute-fork-cleanup-2026-06-18`).
> **Refresh cadence**: weekly. **Owner**: core team.
> **Live counts** (v3.8.24): providers 232 · MCP tools 87 · MCP scopes 30 ·
> A2A skills 7 (now incl. `agentDispatch`) · open-sse services 115 ·
> routing strategies 15. **Refresh with `npm run check:docs-all`.**

---

## Canonical

- **OmniRoute** (this repo) — canonical routing framework. OpenAI-compatible
  gateway: smart routing, load-balancing, retries, multi-provider fallback,
  MCP/A2A/ACP surfaces. **Consume this surface; do not hand-roll new routers.**

## Cluster Members & Convergence Verdict

| Repo | What it is | Verdict |
|------|-----------|---------|
| **OmniRoute** (this repo) | Canonical gateway (TS, ~220K src LOC) | **KEEP — canonical** |
| **helios-router** | 44-file shell, `index.ts` = `console.log("Hello via Bun!")`, **0 inbound code refs** | **ARCHIVE-CANDIDATE** (proof: org-grep finds only inventory/governance doc mentions, no package/Cargo dep). Marked 2026-06-02. |
| **bifrost** (`KooshaPari/bifrost`) | **Vendored fork of maximhq/bifrost** (3rd-party Go gateway) | **NOT a peer framework.** Future: thin Go adapter over OmniRoute's contract, or drop. Low priority; do not archive a vendored fork. |
| **Tokn** | TokenLedger (Rust, hexagonal routing substrate) | **MIGRATE-IN-PROGRESS.** `Tokn::tokenledger::routing` (pareto_router/ports/adapters) is the canonical Rust substrate per 2026-06-03 disambiguation. Extraction to `OmniRoute/crates/tokn` in flight (see `PLAN.md` § 5). |
| **phenoRouterMonitor** | Mislabeled mega-shelf (`name = phenotype-infrakit`); carries `bifrost-routing` crate + agileplus-dashboard + ~11 crates DUPLICATED with HexaKit | **NEEDS DESIGN DECISION** — see naming-collision note below. The `bifrost-routing` crate inside is a **DEPRECATED stub** (no Cargo.toml) and is NOT a peer. |
| **phenoAI** | Phenotype AI agent workspace and tooling | **MIGRATE-PENDING.** Agent tooling → `OmniRoute/workspace/`. |
| **cliproxy** | Proxy/policy layer (dom-cli-ax domain) | **COORDINATE.** Candidate OmniRoute-contract adapter. Not claimed here. |

---

## ⚠ Three Different "bifrost" Referents (naming-collision hazard)

This is the most common source of cross-repo confusion. Per **ADR-009** (2026-06-18):

| # | Referent | Status | Canonical name to use |
|---|----------|--------|------------------------|
| 1 | `KooshaPari/bifrost` repo | Vendored **maximhq** Go gateway fork. **NON-peer.** | **`KooshaPari/bifrost`** (always with full path) |
| 2 | ADR-001's "bifrost" = Phenotype routing substrate | Canonical Rust substrate; lives in `pheno` monorepo as `Tokn::tokenledger::routing` (hexagonal: pareto_router/ports/adapters) | **`phenotype-routing`** (proposed rename) or **`Tokn::tokenledger::routing`** |
| 3 | `crates/bifrost-routing` inside `phenoRouterMonitor` | **DEPRECATED stub** (no Cargo.toml). NOT a peer. | **`@deprecated bifrost-routing`** |

**Recommended actions**:
- Rename (2) to `phenotype-routing` and document the alias in
  `phenotype-routing/README.md`. Track in `PLAN.md` § 5.
- Mark (3) with `@deprecated` annotation in the stub's source; remove from
  the fleet-wide inventory.
- Keep (1) clearly tagged as the vendored fork (do not archive; it's
  evidence of a third-party option).

---

## Consumable Surface (reverse-KISS)

OmniRoute's consumable contract = its OpenAI-compatible API surface + routing/provider/fallback config.

**For consumers (Phenoservices)**:
- HTTP: `POST /v1/chat/completions`, `POST /v1/responses`,
  `POST /v1/embeddings`, `POST /v1/images/generations`,
  `POST /v1/audio/{transcriptions,speech}`, `POST /v1/videos/generations`,
  `POST /v1/music/generations`, `POST /v1/moderations`, `POST /v1/rerank`,
  `POST /v1/search` (12 providers per `open-sse/handlers/search.ts:6`).
- MCP: `npx omniroute --mcp` (stdio) or `POST /api/mcp/sse` /
  `POST /api/mcp/stream` (SSE / Streamable HTTP).
- A2A: `POST /a2a` (JSON-RPC 2.0) or `GET /.well-known/agent.json`.

**For operators**:
- See [`docs/architecture/REPOSITORY_MAP.md`](./architecture/REPOSITORY_MAP.md)
  for the canonical repo navigation.
- See [`docs/architecture/ARCHITECTURE.md`](./architecture/ARCHITECTURE.md)
  for the system architecture.
- See [`docs/architecture/AUTHZ_GUIDE.md`](./architecture/AUTHZ_GUIDE.md)
  for the 3-class route authorization model.
- See [`docs/architecture/RESILIENCE_GUIDE.md`](./architecture/RESILIENCE_GUIDE.md)
  for the 3-layer resilience model.
- See [`docs/routing/AUTO-COMBO.md`](./routing/AUTO-COMBO.md)
  for the 12-factor auto-combo scoring.
- See [`docs/frameworks/MCP-SERVER.md`](./frameworks/MCP-SERVER.md)
  for the 87-tool MCP surface.
- See [`docs/frameworks/A2A-SERVER.md`](./frameworks/A2A-SERVER.md)
  for the 7-skill A2A surface (now incl. `agentDispatch` per ADR-004).
- See [`docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`](./frameworks/AGENT_PROTOCOLS_GUIDE.md)
  for MCP / A2A / ACP / Cloud Agent protocols together.
- See [`AGENTROUTER.md`](./AGENTROUTER.md) for the agent-routing framing.
- See [`PROVIDERS.md`](./PROVIDERS.md) for the 232-provider catalog summary.

---

## Cluster Convergence Plan

| Source | Migration target | Status | Owner |
|--------|------------------|--------|-------|
| `phenoAI` agent tooling | `OmniRoute/workspace/` | pending | phenoAI team |
| `phenoRouterMonitor` Pareto dashboard | `OmniRoute/monitoring/` | pending | monitor team |
| `Tokn` TokenLedger | `OmniRoute/crates/tokn` | **in flight** | tokn team |
| `helios-router` primitives | `phenotype-routing` crate | pending | bifrost team |
| `KooshaPari/bifrost` (vendored fork) | keep tagged, optional thin Go adapter | parked | — |
| `cliproxy` policy layer | OmniRoute-contract adapter | coordinate | cliproxy team |

These migrations are **follow-on initiatives**. Source repos remain intact
until migration is complete. Archive decisions are deferred to the user after
migration.

---

## Tier-1 / Tier-2 Router Split (ADR-031, 2026-06-18)

OmniRoute's underlying Tier-1 router infrastructure is **migrating** to
`maximhq/bifrost` (Go, MIT). The split:

| Tier | Owner | Responsibility |
|------|-------|----------------|
| **Tier-1 router** | `KooshaPari/bifrost` (vendored fork of `maximhq/bifrost`) | 23+ provider dispatch, format translation, fallback, load balancing, virtual keys, budget mgmt, semantic cache, MCP client, observability. **All hot-path / provider-mesh concerns.** |
| **Tier-2 engine** | `OmniRoute` (this repo) | A2A agent orchestration, MCP-router polyglot facade, ACP registry, skill registry, policy engine, guardrails, dashboard. **All higher-level value-add concerns.** |

**Why Bifrost?** Per `docs/adr/0031-bifrost-tier1-router.md`:
- ~6k LOC Go vs LiteLLM's ~100k LOC Python.
- Native MCP client + virtual keys + budget mgmt built-in (we'd re-implement in 2+ months otherwise).
- 100% upstream-compatible OpenAI API surface (no OmniRoute fork needed).
- MIT license (no enterprise tier required).
- Active maintainer (`maximhq`) — last commit < 30 days at decision time.

**Why not LiteLLM?** Same surface area, but Python is too slow for the hot path; 232/400 provider surface is excess inventory that we'd have to maintain a denylist for.

**Why not sglang-router / vllm?** Inference-engine routing, not LLM-API routing. Only valuable if we self-host large models. Deferred to v9 pending demand signal.

**Why not hand-rolled Rust / Zig / Mojo?** 6+ months dev to match Bifrost feature parity. Not justified unless Bifrost is abandoned upstream.

**Drop-in swap strategy**:
- Phase 1 (B1–B3, this turn): vendor Bifrost, add `BifrostBackend` executor + provider map (backwards-compat default = current `open-sse/handlers/chatCore.ts`).
- Phase 2 (B4–B5, Q3 2026): add `bifrostModels` SQL table + virtual-key UI.
- Phase 3 (B6, Q3 2026): traffic shadow (5% → 25% → 100% over 14 days).
- Phase 4 (B7–B9, Q4 2026): full migration playbook + Bifrost MCP client integration + kill switch.

**Decision review**: 30 days post-Phase-3 (compare p99, error rate, cost vs current); 90 days post-Phase-3 (commit long-term or fork-and-modify).

This split means **`KooshaPari/bifrost` is no longer "parked"** — it's the Tier-1 router that OmniRoute consumes. Convergence verdict above is updated: keep vendored fork active (do not archive; do not replace with thin adapter).

---

## How to Update This Doc

1. Update the **Cluster Members & Convergence Verdict** table when a
   convergence decision changes.
2. Update the **Three Different "bifrost" Referents** table if a new
   `bifrost-*` repo is created or a stub is removed.
3. Update the **Cluster Convergence Plan** table when a migration starts,
   completes, or is re-prioritized.
4. Bump the **Last updated** date at the top.

**Refresh cadence**: weekly on Mondays (Phenotype-org sync). Use the
`/routing-convergence-sync` slash command (if available) or update manually
based on the org-grep of all `bifrost*` / `router*` / `gateway*` repo names.

---

## Cross-References

- [`docs/ADR-001-canonical-routing.md`](./ADR-001-canonical-routing.md) — ADR
- [`docs/adr/0004-decomposition-into-packages.md`](./adr/0004-decomposition-into-packages.md) — Decomposition (superseded by ADR-007)
- [`ADR.md`](../ADR.md) — Top-level ADR index (ADR-007, ADR-009)
- [`SPEC.md`](../SPEC.md) § 13 — Convergence section
- [`PLAN.md`](../PLAN.md) § 5 — Convergence plan
- [`docs/AGENTROUTER.md`](./AGENTROUTER.md) — Agent-routing framing
- [`docs/PROVIDERS.md`](./PROVIDERS.md) — Provider catalog summary
- [`docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`](./frameworks/AGENT_PROTOCOLS_GUIDE.md) — Agent protocols guide
- [`docs/architecture/REPOSITORY_MAP.md`](./architecture/REPOSITORY_MAP.md) — Repo navigation
