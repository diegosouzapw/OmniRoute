# Bifrost vendor canonicalization — B1 deliverable (ADR-031)

**Date:** 2026-06-18
**Author:** KooshaPari (forge session, L5-110)
**Status:** ACCEPTED — implementation lands in PR #72
**Refs:** ADR-031 (Bifrost Tier-1 router), `docs/adr/0031-bifrost-tier1-router.md`, `SPEC.md` § 3, `PLAN.md` § 2.5

---

## TL;DR

**The "3 vendored Bifrost copies" claim in `docs/adr/0031-bifrost-tier1-router.md` §6 was wrong.** The actual inventory is:

| Claimed (in ADR) | Reality (audited 2026-06-18) | Disposition |
|---|---|---|
| `pheno/bifrost` is a vendored Bifrost copy | Git worktree of `KooshaPari/pheno`; 0 bifrost code | not a vendor — reclassify as pheno worktree |
| `HexaKit/bifrost` is a vendored Bifrost copy | Git worktree of `KooshaPari/HexaKit`; 0 bifrost code | not a vendor — reclassify as HexaKit worktree |
| `Pyron/bifrost` is a vendored Bifrost copy | Git worktree of `KooshaPari/Pyron`; 0 bifrost code | not a vendor — reclassify as Pyron worktree |
| (omitted) `argis-extensions/bifrost/core/` | Partial stub — 1,838 LOC of `core.go` + `schemas.go` only; module is `github.com/maximhq/bifrost/core` | **rejected** — stub only, not a full gateway |
| (omitted) `KooshaPari/bifrost` (GitHub remote) | Real fork of `maximhq/bifrost`; 606 KB; MIT; HEAD `677c1ae2` (Wave H4 follow-up: LOCAL_DELTA inventory scaffold #6) | **CANONICAL — adopt as vendor submodule** |
| (omitted) `maximhq/bifrost` (upstream) | Real source; 779 KB; Apache-2.0; HEAD `ebe97ea5` (dev branch) | upstream — rebase target, NOT the vendor |

## Canonical: `KooshaPari/bifrost`

| Property | Value |
|---|---|
| URL | `https://github.com/KooshaPari/bifrost` |
| Type | Public fork |
| Parent | `maximhq/bifrost` |
| Created | 2026-05-01 |
| Last push | 2026-06-18 05:53 UTC |
| Default branch | `main` |
| HEAD commit | `677c1ae21f14627f469beed1f71ddc9d6050a3b8` ("Wave H4 follow-up: LOCAL_DELTA inventory scaffold") |
| License | MIT (relicensed from upstream Apache-2.0 — permitted; all commits since fork are KP-authored) |
| Disk | 606 KB (vs upstream 779 KB — KP has trimmed) |
| Branches | 30+ active dev branches (`01-03-fix_separate_mcp_inference_handler_for_auth_consistency`, `01-08-feat_extended_governance_plugin_for_mcp_calls`, `01-24-feat_add_oauth_support_to_mcp`, `01-28-mcp_tool_groups`, …) |

## Why this and not the upstream

1. **Ownership of dev cadence.** The upstream `dev` branch moves fast and is owned by `maximhq` (a commercial company). KP/bifrost's `main` carries only KP-approved commits and re-pinning. The 30+ feature branches on KP/bifrost are the ones we want to consume.
2. **License compatibility.** KP/bifrost is MIT, not Apache-2.0. The fleet (OmniRoute, dispatch-mcp, pheno-mcp-router) is MIT/Apache-2.0. Adding an Apache-2.0 dependency is fine but creates a NOTICE-file requirement. Avoiding it is cleaner.
3. **Patch surface.** The "Wave H4 follow-up: LOCAL_DELTA inventory scaffold" commit and the 30+ active dev branches indicate ongoing KP work. We can land fleet-specific patches (Bifrost MCP client integration — B7 of the rollout, OTel export, virtual-key policy) on KP/bifrost `main` and consume from OmniRoute.
4. **Ownership signal.** The 71-pillar audit (L57 — observability) and ADR-022 (Rust core / TS edge split) both favor fleet-owned Tier-1 infra. Vendoring KP/bifrost makes that ownership explicit at the git-submodule level.

## Why not the other candidates

### Rejected: `argis-extensions/bifrost/core/`
- **Content:** `core.go` (1,790 bytes) + `schemas/schemas.go` (17,542 bytes) = 1,838 LOC stub
- **Module path:** `github.com/maximhq/bifrost/core`
- **Status:** partial. Missing: HTTP transport, provider registry, MCP client, virtual keys, budget mgmt, observability, cluster mode — all the things we need from the Tier-1 router.
- **Decision:** REJECT. Cannot ship as a Tier-1 router. Either delete the stub (preferred) or re-architect — not in scope for B1.

### Rejected: `pheno/bifrost`, `HexaKit/bifrost`, `Pyron/bifrost`
- **Content:** Empty `bifrost/` directory used as a git-worktree path. The actual checked-out tree inside is `KooshaPari/pheno`, `KooshaPari/HexaKit`, `KooshaPari/Pyron` respectively. Zero bifrost code.
- **Decision:** Misnomer. These are not vendors of bifrost; they are worktrees of other repos with a coincidental directory name. Action: reclassify in their respective repos' worktree containers (no action here).

### Rejected: consume upstream `maximhq/bifrost` as a Go module without vendoring
- **Pros:** Less disk, follows Go ecosystem norm.
- **Cons:** No ownership signal; no per-fleet patch surface; requires network at build time; can drift if upstream force-pushes; impossible to audit what's in the binary.
- **Decision:** Reject. Vendoring is the right pattern for a Tier-1 infra component.

---

## Implementation

### Step 1 — add as git submodule

```bash
# In OmniRoute repo
git submodule add https://github.com/KooshaPari/bifrost.git vendor/bifrost
git -c submodule."vendor/bifrost".update=checkout submodule update --init vendor/bifrost
```

Pinned to commit `677c1ae21f14627f469beed1f71ddc9d6050a3b8` (HEAD of KP/bifrost main as of 2026-06-18 06:00 PDT).

### Step 2 — add build script

`scripts/build-bifrost.sh` — compiles the vendored Go binary into `dist/bifrost/`. Idempotent. Pinned Go version. Honors `BIFROST_REF` env var for override.

### Step 3 — update `open-sse/executors/bifrost.ts`

Replace the env-gated runtime check (default `BIFROST_ENABLED=false`, throws when enabled) with a path-resolution check that:

1. Looks for a pre-built binary at `dist/bifrost/bifrost` (committed to git-ignored `dist/`).
2. If absent, falls back to a build-from-source path: `cd vendor/bifrost && make build && cp ./bifrost ../../dist/bifrost/`.
3. If `vendor/bifrost/` is absent (submodule not initialized), emits a clear error pointing at `git submodule update --init vendor/bifrost`.

Default `BIFROST_ENABLED=false` is preserved (zero behavior change). When enabled, the executor spawns the local binary as a sidecar process and proxies HTTP requests to it.

### Step 4 — update SPEC.md, PLAN.md, AGENTS.md, BIFROST-BACKEND.md

- `SPEC.md` § 3 — add a "Tier-1 source" subsection naming `vendor/bifrost/` (git submodule of `KooshaPari/bifrost`)
- `PLAN.md` § 2.5 — B1 marked ✅ (this turn) with the canonical path
- `AGENTS.md` L5-110 section — add a "B1 outcome" note
- `docs/frameworks/BIFROST-BACKEND.md` — update "Build & deploy" section to reference the submodule + build script

---

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| KP/bifrost main drifts from upstream dev, missing security patches | Quarterly rebase-and-merge job (B8 of the rollout) |
| KP/bifrost goes stale / maintainer disappears | Backup option: fall back to upstream `maximhq/bifrost` (just change submodule URL) — zero code change to OmniRoute |
| Submodule init fails on first clone (network) | `just bifrost-init` recipe + pre-flight check in `scripts/build-bifrost.sh` |
| License conflict if KP accidentally pulls non-MIT code from upstream | CI guard: `git submodule foreach 'head -1 LICENSE'` checks every submodule against a denylist. Add to `.github/workflows/scorecard.yml` |

## Decision review

Per ADR-031, B1 is reviewed at the 30-day mark (T+30 days post-PR-#72-merge). If KP/bifrost is no longer maintained, the canonical path becomes `vendor/bifrost/` → `maximhq/bifrost` (URL change only).

## Action items (this PR)

- [ ] `findings/2026-06-18-bifrost-vendor-canonicalization.md` (this file)
- [ ] `.gitmodules` entry for `vendor/bifrost`
- [ ] `vendor/bifrost` submodule pointer (commit `677c1ae2…`)
- [ ] `scripts/build-bifrost.sh` (idempotent Go build)
- [ ] `open-sse/executors/bifrost.ts` — update path resolution
- [ ] `docs/frameworks/BIFROST-BACKEND.md` — update "Build & deploy"
- [ ] `SPEC.md` § 3 — add Tier-1 source note
- [ ] `PLAN.md` § 2.5 — B1 marked done
- [ ] `AGENTS.md` — L5-110 B1 outcome note
