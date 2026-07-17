# pheno-port-adapter — STATUS.md

> **Last refreshed:** `2026-06-18` against tree `86784dc870` (monorepo `main`).
> **Refresh cadence:** weekly Monday 09:00 PDT OR on any wave-merge (per ADR-041 + ADR-024).
> **Substrate tier:** `pheno-*-lib` (per ADR-023 Rule 3).
> **Pattern role:** canonical hexagonal L4 Port/Adapter reference impl (per ADR-038).

---

## 1. Current state

| Build | Coverage | Latest | Open issues / PRs |
|---|---|---|---|
| `yellow` | `0%` (no `cargo-llvm-cov` run on main yet; inline 5 tests in `src/lib.rs`) | `v0.1.0` (`2026-06-11`) | `0` / `0` (this PR is the first) |

**Honest note on coverage:** the L20 (unit coverage) pillar scored 2/3 in the 71-pillar audit (`findings/71-pillar-2026-06-17.md` § 1.10) for 5 inline `MockAdapter` tests in `src/lib.rs:34-124`. L21 (integration tests) scored 0/3 — no `tests/` subdir on main. The 80% gate (ADR-040, lib/SDK) is not yet enforced.

## 2. Recent activity (last 7 days)

- `2026-06-18` — Adopted v8 governance meta-bundle (7 files: AGENTS, SPEC, STATUS, WORKLOG v2.1, CHANGELOG, CONTRIBUTING, llms.txt) per ADR-042 + ADR-038 (L5-116, this PR).
- `2026-06-18` — Worklog migrated to v2.1 schema (ADR-025, 11-col `device:`); prior 11-row ad-hoc schema deprecated.
- `2026-06-18` — `469fdf4f7` (v8 batch 5) — added `SPEC.md` (87 LoC, on `wip-2026-06-18-v8-batch-5-meta-bundles-4-repos` branch; not yet on main).
- `2026-06-18` — `978bf3bdc3` (v8 T18 batch 9F) — added `llvm-cov.toml` for 80% lib coverage gate (ADR-040).
- `2026-06-18` — `7a4749114` (v8 batch 6) — added `examples/quickstart.rs` + tracing feature flag.
- `2026-06-18` — `d164940688` (v8 T17 batch 9A) — clippy strict + dead-code pass.
- `2026-06-11` — `e2edcf8e1` (PR #114) — initial `PortAdapter` trait + TCP/Unix adapters + 5 unit tests (ADR-014, L4-66).

## 3. In-flight

- `chore/l5-116-meta-bundle-pheno-port-adapter-2026-06-18` → `main` — adopt v8 meta-bundle (7 files) per ADR-042 + ADR-038 (this PR, L5-116).
- `wip-2026-06-18-v8-batch-5-meta-bundles-4-repos` (not yet on main) — adds `SPEC.md` (87 LoC) + `deny.toml` + `.github/workflows/ci.yml` + `Cargo.toml` metadata + pheno-tracing feature (T15.5 of v8 plan).

## 4. Blocked

- `tests/integration_test.rs` (T18.4) — depends on a 80% lib-coverage gate being run on a heavy-runner; MacBook device-fit gate (ADR-023) prevents local `cargo test --workspace` against multi-100-crate monorepo. Owner: heavy-runner dispatch (forge-A or CI).
- `.github/workflows/ci.yml` on `main` (T19.4) — currently on the wip branch only; needs rebase + push to land.
- README.md (T20.x, no specific sub-task yet) — full 5-line quickstart + when/when-NOT; L64 (README) pillar is 0/3.

## 5. Near-term (next 2 weeks)

- Land `.github/workflows/ci.yml` from the wip branch — enables CI gate (ADR-042 element 6).
- Land `Cargo.toml` metadata + `pheno-tracing` optional dep + `tracing` feature flag (T22.3) — enables OTLP smoke test.
- Add `tests/integration_test.rs` with TCP loopback + Unix-domain round-trip (T18.4, target ≥ 80% lib coverage).
- Author `README.md` (L64 pillar 0/3 → 3/3 target) — what / when / when NOT / 5-line quickstart.
- Add `LICENSE-APACHE` (dual license, matches other fleet libs).
- Add `deny.toml` on main (L47 supply-chain pillar 0/3 → 3/3 target).
- Migrate the 19 ad-hoc pheno-* substrate crates to the `Port` trait + `Adapter` impl pattern (ADR-038 migration sequence, 18 PRs, ~120 min) — coordinated with T16.

## 6. Version

- **Latest:** `v0.1.0` (`2026-06-11`) — initial release of `PortAdapter` trait + TCP/Unix adapters + 5 unit tests.
- **Next planned:** `v0.2.0` — async overlay (deferred per ADR-038; sync-only contract in v0.1.x).
- **LTS (if any):** none (pre-1.0; breaking changes possible).

## 7. Related

`README.md` (planned) · [`SPEC.md`](./SPEC.md) (per ADR-042 element 1) · [`llms.txt`](./llms.txt) (T20.7) · [`WORKLOG.md`](./WORKLOG.md) (per ADR-025 v2.1, includes `device:` field) · [`CHANGELOG.md`](./CHANGELOG.md) · `LICENSE-MIT` · `docs/adr/2026-06-18/ADR-038-hexagonal-port-adapter-l4-policy.md` · `docs/adr/2026-06-18/ADR-042-substrate-quality-bar.md` · [`findings/71-pillar-2026-06-17.md` § 1.10](../../findings/71-pillar-2026-06-17.md)

---

## 71-pillar scorecard (per ADR-024, honest)

**Total:** 60 / 213 max (28.2%), 2 N/A-as-3 (L40 i18n, L41 a11y per scoring rule).
Source: `findings/71-pillar-2026-06-17.md` § 1.10.

| Domain | Pillars scored | Notes |
|---|---|---|
| **AX (L1-L12)** | 24 / 36 (67%) | L2 (Port/Adapter) 3/3, L3 (Public API) 3/3, L8 (Workspace) 3/3, L10 (Plugin model) 3/3 are the strengths; L5 (Async) 0/3, L7 (Build system) 1/3, L12 (ADRs) 0/3 (the in-crate ADR gap is closed by ADR-038). |
| **Performance (L13-L19)** | 5 / 21 (24%) | L15 (Send/Sync) 3/3 only; benchmarks, latency, throughput, rate limits all 0. |
| **Quality / Correctness (L20-L27)** | 11 / 24 (46%) | L20 (Unit coverage) 2/3, L26 (Type safety) 2/3, L39 (errors) 3/3, L43+L50 (input validation) 2/3 each; L21 (integration) 0/3, L27 (property) 0/3. |
| **DX (L28-L37)** | 4 / 30 (13%) | L29 (Test speed) 2/3 only; everything else 0-1. |
| **UX (L38-L45)** | 11 / 24 (46%) | L40+L41 N/A-as-3 (port trait, per rule); L39 3/3; L43 2/3; rest 0. |
| **Security (L46-L55)** | 2 / 30 (7%) | L50 (Input validation) 2/3 only; deny.toml / auth / crypto / audit all 0. |
| **Observability & Ops (L56-L63)** | 2 / 24 (8%) | L59 (Health) 1/3, L62 (Error observability) 1/3; no OTLP, no metrics, no SLOs. |
| **Documentation & SSOT (L64-L68)** | 4 / 15 (27%) | L66 (API docs) 2/3, L68 (Concept docs) 2/3; L64 (README) 0/3, L65 (SPEC.md) 0/3 (closed by this turn), L67 (CHANGELOG) 0/3 (closed by this turn). |
| **Governance & Sustainability (L69-L71)** | 0 / 9 (0%) | L69 (License field) 0/3, L70 (CODEOWNERS) 0/3, L71 (Contrib+security) 0/3. |

**Tier 0 (28.2%)** — minimum bar to be called "substrate" per ADR-024; this crate is at the floor. **Tier 1 (56/71 pillars ≥ 2)** is the next gate; closes the L64-L71 cluster (governance + docs) and adds L21 (integration tests). This PR closes L65 + L67; CI gate, deny.toml, README, and 80% coverage close the rest.

---

## Factory AI Agent Readiness (per ADR-026)

5-level gated model (Functional → Documented → Standardized → Optimized → Autonomous); 9 pillars; 80% threshold per level. Source: <https://docs.factory.ai/web/agent-readiness/overview>.

| Pillar | Score (0-3) | Top gap |
|---|---|---|
| Style & Validation | `1` | No `cargo fmt --check` + clippy `-D warnings` CI gate on main yet |
| Build System | `1` | Minimal `Cargo.toml`; no `[[bin]]` / `[[bench]]`; no CI workflow on main |
| Testing | `1` | 5 inline tests; no `tests/` integration subdir; no coverage gate enforced |
| Documentation | `1` | No README; SPEC.md shipped (this turn); llms.txt shipped (this turn); CHANGELOG shipped (this turn) |
| Dev Environment | `0` | No `justfile`, no `devcontainer`, no `nix flake` |
| Debugging & Observability | `0` | No OTLP smoke test on main; no `tracing` feature; no metrics export |
| Security | `0` | No `deny.toml` on main; no SLSA provenance; no vuln scan in CI |
| Task Discovery | `2` | Conventional Commits; v2.1 worklog with `device:` field (closed by this turn); clear L4-66 / L5-116 task IDs |
| Product & Experimentation | `1` | No A/B testing, no feature flags; single canonical impl |

**Current level:** `0` (Functional). The 5 inline `MockAdapter` tests prove the contract compiles + runs, which is the Level 0 gate. To reach Level 1 (Documented), need: README + SPEC.md (closed by this turn) + CHANGELOG (closed by this turn) + llms.txt (closed by this turn) + integration tests. Refresh via `/readiness-report` Droid CLI; action items feed next v9+ plan as P0 tasks. Org score = `floor(average of all repo levels)`.
