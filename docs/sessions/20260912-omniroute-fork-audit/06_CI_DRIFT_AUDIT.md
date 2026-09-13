# CI Drift Audit

**Date:** 2026-09-12
**Upstream remote:** `upstream` (diegosouzapw/OmniRoute)
**Upstream default branch:** `upstream/release/v3.8.51`
**Upstream development branch:** `upstream/main`
**Fork default:** KooshaPari/OmniRoute

---

## Summary

Two comparison axes are reported because the upstream has two key branches:

| Axis | Fork-only | Upstream-only | Identical | Divergent |
|------|-----------|---------------|-----------|-----------|
| **Working tree vs upstream/main** | 1 | 0 | 12 | 13 |
| **Fork `main` vs upstream/main** | 56 | 2 | 8 | 15 |
| **Working tree vs upstream/release/v3.8.51** | 0 | 0 | 26 | 0 |

**Key finding:** The current working tree is 100% in sync with `upstream/release/v3.8.51` (zero drift). All divergence exists on the fork's `main` development branch, which has accumulated 56 fork-only workflows and 15 divergent shared workflows compared to `upstream/main`.

---

## Working Tree vs upstream/main (Primary Audit)

The current checkout (`rebase-caveman-clean`) has 26 workflow files. `upstream/main` has 25.

### Fork-Only Workflows (working tree)

| File | Status | Notes |
|------|--------|-------|
| `api-route-typecheck.yml` | **Essential** (fork-specific) | Runs `check-api-typecheck.mjs` and its unit test on PRs. Not in upstream/main. Present in upstream/release/v3.8.51 (identical). |

### Upstream-Only Workflows (working tree)

*None.* All 25 upstream/main workflows exist in the working tree.

### Identical Workflows (12)

| File |
|------|
| `claude.yml` |
| `deploy-vps.yml` |
| `lock-released-branch.yml` |
| `mutation-redundancy.yml` |
| `nightly-compat.yml` |
| `nightly-mutation.yml` |
| `nightly-property.yml` |
| `opencode-provider-ci.yml` |
| `radar-export.yml` |
| `scorecard.yml` |
| `semgrep.yml` |
| `wiki-sync.yml` |

### Divergent Workflows (13)

| File | Diff lines | Fork-side changes | Upstream/main changes | Recommendation |
|------|-----------|-------------------|----------------------|----------------|
| `build.yml` | 57 | Removed `push: branches: ["**"]` trigger, added 10-line comment explaining manual-only dispatch (#11946, hosted 7 GB OOM) | Still triggers on push to all branches | **Fork is intentional.** Hosted runner cannot build this tree. Fork disables auto-trigger. |
| `ci.yml` | 1543 | Removed eslint restore-keys (hardened cache, #11600), added `fetch-depth: 0`, added `check:model-lifecycle`, `check:provider-asset-provenance`, `check:radar-sentinels`, i18n real-translation advisory, docker concurrency comment, heavy-build-main group | Retains restore-keys fallback, fewer check gates | **Fork is ahead.** Fork has stricter quality gates and hardened caching. Keep fork changes; watch for upstream adding similar gates. |
| `codeql.yml` | 31 | Bumped `codeql-action/init` and `codeql-action/analyze` to v4.37.9 (pinned SHA) | v4.37.7 (pinned SHA) | **Fork is ahead.** Fork has newer CodeQL action version. Merge upstream or bump in fork. |
| `dast-smoke.yml` | 90 | Restricted to `branches: ["main"]` only, added `workflow_dispatch`, added 8-line comment explaining release/** OOM | Triggers on `branches: ["main", "release/**"]` | **Fork is intentional.** Release branches OOM on hosted runners. Fork restricts to main + manual dispatch. |
| `docker-publish.yml` | 510 | Added concurrency group, skip logic for frozen release branches, self-hosted omni-build pool for amd64, shared heavy-build-main concurrency, webpack override (`OMNIROUTE_USE_TURBOPACK=0`), cache `ignore-error=true`, `codeql-action/upload-sarif` bumped to v4.37.9 | Uses matrix.runner, no concurrency, no webpack override | **Fork is ahead.** Major runner infrastructure and build reliability changes. |
| `electron-release.yml` | 503 | Added explicit `ref: ${{ needs.validate.outputs.version }}` on checkout steps, added Linux arm64 wreq binding cross-package install step, updated native deps comment | Missing ref overrides and arm64 wreq step | **Fork is ahead.** Cross-compilation fix for arm64 installers. |
| `nightly-llm-security.yml` | 106 | Both jobs switched to `omni-light` self-hosted pool via `USE_VPS_RUNNER` variable, with fallback to hosted | Uses `ubuntu-latest` | **Fork is intentional.** Hosted runner OOM mitigation. |
| `nightly-release-green.yml` | 486 | Added velocity-phase ratchet pause, added full `baseline-headroom` job (69 lines) with headroom measurement, artifact upload, and living GitHub issue tracker | No velocity phase logic, no headroom job | **Fork is ahead.** Fork has quality-gate velocity tracking. |
| `nightly-resilience.yml` | 111 | Switched to `omni-light` self-hosted pool via `USE_VPS_RUNNER` variable | Uses `ubuntu-latest` | **Fork is intentional.** Same runner mitigation pattern. |
| `nightly-schemathesis.yml` | 74 | Switched to `omni-light` self-hosted pool via `USE_VPS_RUNNER` variable | Uses `ubuntu-latest` | **Fork is intentional.** Same runner mitigation pattern. |
| `npm-publish.yml` | 575 | Added entire `publish-opencode-plugin-v2` job (89 lines) with auto-bump, build, test, and publish | No plugin-v2 publish job | **Fork is ahead.** Fork publishes the v2 opencode plugin. |
| `opencode-plugin-ci.yml` | 66 | Added v2 plugin path triggers, added `test-v2` job (22 lines, Node 22+24 matrix), publish job builds v2 artifact | No v2 plugin support | **Fork is ahead.** Fork has v2 plugin CI. |
| `quality.yml` | 590 | Disabled advisory Build job (`if: false`), removed eslint restore-keys (3x), added `provider-asset-provenance` and `model-lifecycle` to check groups, new-code mode for ratchets, 30-min test timeout, self-hosted `omni-light` for eslint with `NODE_OPTIONS: --max-old-space-size=8192` | Advisory Build enabled, restore-keys present, fewer check groups | **Fork is ahead.** Significant quality gate improvements. |

---

## Fork `main` Branch vs upstream/main (Full Development Drift)

The fork `main` branch has **79** workflow files. `upstream/main` has **25**.

### Fork-Only Workflows (56)

These exist on fork `main` but NOT on `upstream/main`:

#### Essential (fork-specific infrastructure)

| File | Purpose |
|------|---------|
| `build-fork.yml` | Fork-specific Docker image publish to `ghcr.io/kooshapari/omniroute` |
| `infisical.yml` | Infisical secrets management |
| `omniroute-rs.yml` | Rust component CI |
| `oidc-ci.yml` | OIDC authentication CI |
| `release.yml` | Fork release workflow |
| `release-macos.yml` | Fork macOS release |
| `release-channels.yml` | Fork channel-based release management |
| `release-smoke.yml` | Fork release smoke tests |

#### Security & Compliance

| File | Purpose |
|------|---------|
| `cosign-ci.yml` | Sigstore cosign verification |
| `cyclonedx.yml` / `cyclonedx-weekly.yml` | CycloneDX SBOM generation |
| `sbom.yml` / `sbom-gen.yaml` / `sbom-weekly.yml` | SBOM workflows |
| `gitleaks-fleet.yml` | Fleet-wide secret scanning |
| `security-scan.yml` | Security scanning |
| `l52-sbom-audit.yml` | SBOM audit |
| `l53-helioscope-vm.yml` | VM security checks |
| `l21-bom-diff.yml` | BOM diff tracking |

#### Quality & Testing

| File | Purpose |
|------|---------|
| `apps-quality.yml` | SvelteKit + Hono/Bun quality gates |
| `audit.yml` | CodeQL audit (fork variant) |
| `audit-ratchet.yml` | Quarterly audit freshness ratchet |
| `chaos-weekly.yml` | Weekly chaos testing |
| `contract_tests.yaml` / `contract-weekly.yml` | Contract testing |
| `fuzz-ci.yml` / `fuzz-weekly.yml` | Fuzz testing |
| `k6-load-test.yml` | k6 load testing |
| `perf-weekly.yml` | Weekly performance tests |
| `trunk-check.yml` | Trunk.io linting |
| `v4-strict-types.yml` | Strict TypeScript checking |
| `pillar-checks.yml` | Pillar-based quality checks |
| `qgate.yml` | Quality gate |

#### Platform-Specific

| File | Purpose |
|------|---------|
| `cross-platform.yml` | Cross-platform build |
| `desktop-electrobun.yml` | Electrobun desktop build |
| `cargo-lock-hash.yaml` | Cargo lock hashing |
| `omniroute-rs.yml` | Rust CI |

#### Monitoring & Observability

| File | Purpose |
|------|---------|
| `latency-budget.yml` | Latency budget enforcement |
| `l45-p99-regression.yml` | P99 regression testing |
| `l48-lsa-graph.yml` | LSA graph analysis |
| `l69-sla-deck.yml` | SLA deck generation |
| `slo-burnrate.yml` | SLO burn-rate monitoring |
| `ssot-drift-cron.yaml` | SSOT drift detection cron |
| `flamegraph.yml` | Flame graph generation |

#### Documentation & Release

| File | Purpose |
|------|---------|
| `docs-deploy.yml` | Documentation deployment |
| `adr-quality-lint.yml` | ADR quality linting |
| `journey-evidence.yml` | Journey evidence collection |
| `nightly-dispatch-bench.yml` | Nightly dispatch benchmarking |
| `nightly.yml` | Nightly catch-all |

#### Infrastructure

| File | Purpose |
|------|---------|
| `build-rinseaid-image.yml` | RinseAid image build |
| `dependency-review.yml` | Dependency review |
| `lfs-weekly.yml` | LFS weekly checks |
| `mtls-weekly.yml` | mTLS weekly checks |
| `terraform-pr.yml` | Terraform PR checks |
| `l27-pest-conflict.yml` | Pest conflict detection |

### Upstream-Only (Missing from Fork `main`)

| File | Status | Notes |
|------|--------|-------|
| `build.yml` | **Missing from fork main** | Fork main apparently replaced with fork-specific build workflows. The working tree has it (synced to release/v3.8.51). |
| `radar-export.yml` | **Missing from fork main** | Not present on fork main branch. Present in working tree (synced to release/v3.8.51). |

### Divergent Shared Workflows (15)

| File | Diff lines | Recommendation |
|------|-----------|----------------|
| `ci.yml` | 803 | Fork has hardened cache, extra gates, self-hosted runners. Keep fork changes. |
| `claude.yml` | 4 | Minimal drift (likely action pin bumps). Can accept upstream. |
| `codeql.yml` | 4 | Fork has newer CodeQL action pins. Keep fork. |
| `dast-smoke.yml` | 15 | Fork restricts to main-only. Intentional. Keep fork. |
| `deploy-vps.yml` | 5 | Minimal drift. Can accept upstream. |
| `docker-publish.yml` | 222 | Fork has concurrency, self-hosted pool, webpack override. Keep fork. |
| `electron-release.yml` | 237 | Fork has arm64 fixes and ref overrides. Keep fork. |
| `nightly-compat.yml` | 17 | Likely runner changes. Can accept upstream if runner infra matches. |
| `nightly-mutation.yml` | 2 | Minimal drift. Can accept upstream. |
| `nightly-release-green.yml` | 124 | Fork has velocity phase logic. Keep fork. |
| `nightly-resilience.yml` | 2 | Runner change only. Can accept upstream if runner infra matches. |
| `npm-publish.yml` | 279 | Fork has plugin-v2 publish job. Keep fork. |
| `opencode-plugin-ci.yml` | 4 | Fork has v2 plugin support. Keep fork. |
| `quality.yml` | 386 | Fork has significant improvements. Keep fork. |
| `scorecard.yml` | 34 | Fork has newer action pins. Keep fork. |

---

## Action Items

1. **No immediate action on working tree.** The current checkout is 100% synced with `upstream/release/v3.8.51`. All 26 workflow files are byte-identical.

2. **Evaluate fork main drift.** The fork `main` branch has 56 fork-only workflows that represent significant infrastructure investment. Determine which are still maintained and which are stale:
   - `adr-quality-lint.yml`, `audit.yml`, `audit-ratchet.yml` -- verify still needed
   - `chaos-weekly.yml`, `fuzz-ci.yml`, `fuzz-weekly.yml` -- verify still running
   - `nightly.yml`, `nightly-dispatch-bench.yml` -- check if superseded by specific nightlies

3. **Sync missing upstream workflows.** Fork `main` is missing `build.yml` and `radar-export.yml` from upstream. If upstream `main` is a target merge, these need to be reconciled.

4. **Track upstream/main divergences for next release merge.** The 13 working-tree-vs-upstream/main differences represent changes that upstream has made on `main` that haven't landed in `release/v3.8.51` yet. When `upstream/main` becomes the next release, these divergences will surface:
   - `ci.yml` (1543 lines): Fork already has stricter gates, but upstream may add conflicting patterns
   - `docker-publish.yml` (510 lines): Fork has major infra changes (self-hosted, concurrency, webpack override)
   - `quality.yml` (590 lines): Fork disabled advisory Build, added new gates
   - `npm-publish.yml` (575 lines): Fork has plugin-v2 publish

5. **Establish a rebase/sync cadence.** The fork last synced with `upstream/release/v3.8.51` around 2026-08-28. Upstream `main` has 10 commits ahead that touch workflows. Schedule regular syncs to avoid accumulating further drift.

6. **Clean up stale fork-only workflows on main.** The 56 fork-only workflows on `main` should be triaged:
   - **Keep:** build-fork.yml, release.yml, release-macos.yml, release-channels.yml, release-smoke.yml, infisical.yml, omniroute-rs.yml, oidc-ci.yml, security-scan.yml
   - **Review:** apps-quality.yml, audit.yml, contract_tests.yaml, fuzz-*, k6-load-test.yml, perf-weekly.yml, chaos-weekly.yml
   - **Consider removing if stale:** nightly.yml (superseded by specific nightlies), docs-deploy.yml (if docs site is abandoned), journey-evidence.yml, pillar-checks.yml
