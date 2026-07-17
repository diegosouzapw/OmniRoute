# pheno-otel — STATUS.md

> **Last refreshed:** `2026-06-20` against branch `chore/orch-v11-016-tier0-2026-06-20`.
> **Refresh cadence:** weekly Monday 09:00 PDT OR on any wave-merge (per ADR-041 + ADR-024).
> **Substrate tier:** `pheno-*-lib` (per ADR-023 Rule 3).
> **Substrate role:** canonical OTLP wire-format export substrate (per ADR-037).

---

## 1. Current state

| Build | Coverage | Latest | Open issues / PRs |
|---|---|---|---|
| `green` (compiles) | `TBD` (first llvm-cov run pending) | `v0.1.0` (`2026-06-20`) | `0` / `1` (this PR is the first) |

**Honest note on coverage:** 23 inline unit tests across `src/lib.rs` (7), `src/exporters/stdout.rs` (6), `src/exporters/http.rs` (10). L20 (unit coverage) pillar is provisionally scored 2/3 in the 71-pillar audit; L21 (integration tests) is 0/3 (no `tests/` subdir yet). The 80% gate (ADR-040, lib/SDK) is wired in `ci.yml` but not yet enforced on a published coverage number.

## 2. Recent activity (last 7 days)

- `2026-06-20` — Adopted v11 governance meta-bundle (8 governance docs + 6 workflows + 2 issue templates + 1 PR template + supply-chain configs) per ADR-042 + ADR-038 (L5-016, this PR).
- `2026-06-20` — Initial tier-0 release of `OtlpPort` trait + `StdoutExporter` + `HttpExporter` + `OtlpError` (4 variants) + `ExportHandle` + 23 inline tests (L5-016, this PR).
- `2026-06-20` — Worklog seeded with v2.1 schema (ADR-025, 11-col `device:` field).

## 3. In-flight

- `chore/orch-v11-016-tier0-2026-06-20` → `main` — tier-0 meta-bundle (this PR, L5-016).

## 4. Blocked

- `tests/integration_test.rs` — depends on a 80% lib-coverage gate being run on a heavy-runner; MacBook device-fit gate (ADR-023) prevents local `cargo test --workspace` against multi-100-crate monorepo. Owner: heavy-runner dispatch (forge-A or CI).
- First llvm-cov coverage number on `main` — same blocker.
- First OpenSSF Scorecard badge — runs Mon 12:00 UTC after first merge to main.

## 5. Near-term (next 2 weeks)

- Land first llvm-cov run on main → enable coverage badge.
- Add `tests/integration_test.rs` with mock OTLP receiver (httptest or wiremock-rs) → integration coverage for the `HttpExporter` round-trip.
- Add `GrpcExporter` for OTLP/gRPC (ADR-037 extension point).
- Add resource builder helper (`Resource::builder()` for `service.name`, `service.version`, deployment env).
- Author `README.md` (L64 pillar 0/3 → 3/3 target) — what / when / when NOT / 5-line quickstart.
- Migrate the 2 ad-hoc OTLP consumers across the fleet to `pheno-otel::OtlpPort` (ADR-038 adoption matrix, 4 PRs, ~60 min).

## 6. Version

`v0.1.0` (2026-06-20) — initial tier-0 release. Semver: minor versions add new exporters; patch versions fix bugs without changing the wire format; major versions change the `OtlpPort` trait signature.

## 7. 71-pillar scorecard (honest)

| Domain | Score | Notes |
|---|---|---|
| Architecture (AX) | ~5/36 | trait + 2 impls + 1 error envelope — minimal kernel. |
| Performance | ~2/21 | no perf tests yet; bench suite is a follow-up. |
| Quality / Correctness | ~5/24 | 23 inline tests, all green; no integration tests yet. |
| Developer Experience | ~3/30 | meta-bundle present, no published docs.rs yet. |
| User Experience | n/a (lib) | not applicable for headless backend lib. |
| Security | ~5/30 | deny.toml + cargo-audit + TruffleHog wired. |
| Observability & Ops | ~6/24 | this crate IS the observability substrate. |
| Documentation & SSOT | ~12/15 | 8 governance docs present. |
| Governance & Sustainability | ~6/9 | AGENTS.md + ADR-023 + ADR-042 + CODEOWNERS. |
| **Total** | **~49/213 (23%)** | **Tier 0 baseline established; full Tier 1 by 2026-07-15 target.** |

## 8. Factory AI Agent Readiness

- **Level:** 0 (Functional) — `cargo check` + `cargo test` pass; meta-bundle present.
- **Next level unlock:** Level 1 (Documented) — published `README.md` with what/when/when-NOT/quickstart.

## 9. See also

- `pheno-tracing` (sibling substrate, ADR-036) — produces the spans this crate exports.
- `pheno-port-adapter` (hexagonal L4 reference, ADR-038) — pattern contract.
- `findings/71-pillar-2026-06-17.md` — 71-pillar framework schema.
- `findings/71-pillar-2026-06-17-mapping.md` — L1-L30 → L1-L71 crosswalk.
- `pheno-worklog-schema` v2.1 — worklog validator.
