# ADR-001: OmniRoute as Canonical Routing Project

**Date**: 2026-05-30
**Status**: Accepted
**Author**: KooshaPari (Phenotype org)

## Context

Multiple routing-related projects exist across the Phenotype org:
- **OmniRoute** (this repo) — fork of `diegosouzapw/OmniRoute`, an OpenAI-compatible
  AI gateway with routing, load balancing, retries, and fallbacks
- **phenoAI** — Phenotype AI agent workspace and tooling
- **phenoRouterMonitor** — LLM router with Prometheus monitoring + Pareto dashboard
- **Tokn** — TokenLedger: LLM cost and usage tracking
- **helios-router** — routing primitives from the helios cluster
- **bifrost** (in `pheno` monorepo) — Phenotype routing substrate crate

This fragmentation creates duplicated effort, inconsistent APIs, and maintenance burden.
A canonical routing project is needed.

## Decision

**OmniRoute is the canonical routing project for the Phenotype org.**

> **Routing-substrate clarification (2026-06-03, dom-services-routing):** "rebuild around bifrost" = the canonical Phenotype routing substrate = **Tokn `tokenledger::routing`** (hexagonal: pareto_router/ports/adapters) for Rust, and **OmniRoute** itself for the LLM-proxy/runtime surface. The old `phenoRouterMonitor/crates/bifrost-routing` prototype is a DEPRECATED stub (no Cargo.toml) and is NOT the referent. `KooshaPari/bifrost` is a vendored maximhq fork, NON-peer.

OmniRoute is a hard fork of `diegosouzapw/OmniRoute` (tracked via `upstream` remote).
Rather than archiving, it is undergoing a ground-up rebuild of the routing core around:

- **bifrost** — Phenotype routing substrate (intelligent multi-provider routing,
  policy evaluation, circuit breaking, cost-aware selection)
- **cliproxy** — Proxy and policy enforcement layer

The upstream OpenAI-compatible API surface is **preserved** for consumer compatibility.
The routing core, load balancing, and provider-selection logic are **replaced**.

## Cluster Convergence Plan

The LLM-routing cluster consolidates toward OmniRoute + bifrost:

| Project | Current Role | Migration Target |
|---------|-------------|-----------------|
| phenoAI | Agent workspace + tooling | Migrate agent tooling → OmniRoute workspace |
| phenoRouterMonitor | Pareto dashboard + monitoring backend | → OmniRoute/monitoring/ |
| Tokn | TokenLedger cost tracking | → OmniRoute/crates/tokn |
| helios-router | Routing primitives | → bifrost crate |

These migrations are **follow-on initiatives**. Source repos remain intact until migration
is complete. Archive decisions are deferred to the user after migration.

## Architecture

```
OmniRoute/
├── src/               # OpenAI-compatible API gateway (from upstream)
├── crates/
│   ├── bifrost/       # Phenotype routing substrate (new)
│   └── tokn/          # TokenLedger (migrated from Tokn repo)
├── monitoring/        # Pareto dashboard (migrated from phenoRouterMonitor)
└── docs/
    ├── ADR-001-canonical-routing.md  (this file)
    └── architecture/
```

## Consequences

**Positive:**
- Single canonical routing project for all LLM traffic in Phenotype services
- Upstream OpenAI API compatibility maintained for existing consumers
- bifrost provides a richer, more testable routing substrate than the upstream's approach
- Consolidated observability: Metron + Traceon (in HexaKit) feed OmniRoute metrics

**Negative:**
- phenoAI/phenoRouterMonitor/Tokn/helios-router are archive candidates but cannot be
  archived until migrations complete (tracked separately)
- bifrost rebuild is a significant engineering investment

**Neutral:**
- Upstream (diegosouzapw/OmniRoute) continues independently; we cherry-pick fixes
- See UPSTREAM_SYNC.md for sync protocol

## References
- `UPSTREAM_SYNC.md` — How to track and backport upstream changes
- `KooshaPari/bifrost` — Routing substrate (to be extracted from pheno monorepo)
- `KooshaPari/Metron` + `KooshaPari/Traceon` — Observability (now in HexaKit)
- STEP 10 of phenotype-registry RATIONALIZATION_PLAN.md
