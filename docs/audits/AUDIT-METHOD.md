# Audit Method — 30-Pillar / 109-Sub-Pillar Scoring Rubric

> **How to score each pillar.** Read this before filling in the grid.

## Score legend (0-3)

- **0 — Absent.** No evidence of the pillar. No file, no config, no comment, no test.
- **1 — Ad-hoc.** Partial evidence; inconsistent. Some files follow the pattern, others don't. No automation.
- **2 — Wired.** Present and operating. Has artifacts (file/config/CI step) but no enforced measurement.
- **3 — Measured.** Pillar has a ratchet, baseline, SLO, or coverage threshold enforced in CI. A regression is caught automatically.

## Decision tree

```
Q1: Does any file/config exist for this pillar?
├─ No  → 0
└─ Yes
   Q2: Is it enforced anywhere (CI, pre-commit, runtime check, SLO)?
   ├─ No  → 1
   └─ Yes
      Q3: Is the enforcement measured (baseline diff, threshold gate, dashboard)?
      ├─ No  → 2
      └─ Yes → 3
```

## Evidence requirements

Every score MUST cite at least one concrete piece of evidence:

- `path/to/file.ext:NN` (file + line range)
- `path/to/dir/` (directory listing)
- A commit SHA
- A log line or metric

If you cannot cite evidence, the score is at most 1.

## Pillar definitions

### A — Architecture (5 sub-pillars)

| ID | Pillar | What to look for |
|----|--------|------------------|
| A1 | Hexagonal / port-adapter | `ports/`, `adapters/`, `domain/`, `application/`; dependency rule (domain depends on nothing) |
| A2 | ADR coverage | `docs/adr/` dir, MADR template, decision status (proposed/accepted/deprecated) |
| A3 | Dependency direction | inward-only dependency graph; no upward deps from domain to infra |
| A4 | Module boundary discipline | no circular deps; import boundaries enforced by lint or `dependency-cruiser` |
| A5 | Domain model richness | behaviors colocated with state; not anemic (no `Foo { id, name, getName() }`) |

### X — Code quality (6)

| ID | Pillar | What to look for |
|----|--------|------------------|
| X1 | Lint baseline + ratchet | `quality-baseline.json`, `npm run quality:ratchet`, no regression |
| X2 | Type strictness | `tsconfig: strict`, `noImplicitAny`, `noUncheckedIndexedAccess` (TS); Rust types over `String`/`Any` |
| X3 | Complexity budget | cyclomatic ≤N per fn, enforced; cognitive complexity tracked |
| X4 | Duplication budget | jscpd/SIMILAR threshold, enforced |
| X5 | Dead code budget | `knip` / `ts-prune` / `cargo-machete` clean |
| X6 | Format enforcement | Prettier/rustfmt on pre-commit (Husky, lint-staged) |

### D — Documentation (6)

| ID | Pillar | What to look for |
|----|--------|------------------|
| D1 | Spec traceability | FR/NFR → docs → tests → code graph (e.g., AgilePlus FR-DOMAIN-001 → test file → impl) |
| D2 | Journey maps | `docs/operations/journey-traceability.md` or similar, FR-by-journey |
| D3 | Code comments ≠ "what" | comments explain WHY, not what (no restating the function name) |
| D4 | CHANGELOG discipline | per-PR entries, Keep-a-Changelog style, semver-tagged |
| D5 | API reference | OpenAPI/asyncapi/spec.md, kept current with code |
| D6 | Architecture map | `REPOSITORY_MAP.md` / `CODEBASE_DOCUMENTATION.md` exists and is current |

### U — UX / Frontend (4)

| ID | Pillar | What to look for |
|----|--------|------------------|
| U1 | Design system adherence | tokens (colors/spacing/typography), no ad-hoc hex values |
| U2 | Component library wired | Radix/shadcn/Headless UI/MUI etc., not ad-hoc HTML forms |
| U3 | Dark mode + light | theme tokens, both supported, prefers-color-scheme respected |
| U4 | Typography discipline | mono for code/IDs, system sans for prose, tokenized |

### UX — User experience (3)

| ID | Pillar | What to look for |
|----|--------|------------------|
| UX1 | Empty states, loading, error | every list/detail surface has all 3 |
| UX2 | Progressive disclosure | hover-expand, tooltips, no info-dump on first paint |
| UX3 | Gallery / list / detail views | info architecture supports browse-then-drill |

### AT — Accessibility & i18n (5)

| ID | Pillar | What to look for |
|----|--------|------------------|
| AT1 | WCAG 2.1 AA | axe-core clean, color contrast ≥4.5:1 |
| AT2 | Keyboard nav | tab order, focus rings, skip links, no keyboard traps |
| AT3 | Screen reader | aria labels, live regions for async, alt text for images |
| AT4 | i18n coverage | locale files (`en.json`, etc.), no hardcoded strings |
| AT5 | RTL support | `dir=rtl`, mirrored layout, mixed-direction safe |

### T — Testing (6)

| ID | Pillar | What to look for |
|----|--------|------------------|
| T1 | Unit coverage ≥60/60/60/60 | statements/lines/fn/branch — absolute floor |
| T2 | Integration tests | multi-module, DB-state, gated by env var |
| T3 | E2E tests | Playwright/Cypress, smoke, gated by env var |
| T4 | Contract tests | API consumer/producer (Pact or equivalent) |
| T5 | Bug-fix reproduction test | TDD or live-VPS record (Hard Rule #18) |
| T6 | Both test runners green | unit + vitest if applicable; CI blocks on either failing |

### P — Performance (5)

| ID | Pillar | What to look for |
|----|--------|------------------|
| P1 | Hot path benchmarks | cargo bench, vitest bench, k6 — at least one per hot path |
| P2 | Profiling in CI | cargo flamegraph, clinic.js, pprof — at least one run recorded |
| P3 | Bundle / binary size | tracked, ratchet (no regression) |
| P4 | Cold start / p50 / p99 SLO | documented, measured, alert if breached |
| P5 | Cache hit rate | measured, dashboards, target ≥80% |

### S — Security (9)

| ID | Pillar | What to look for |
|----|--------|------------------|
| S1 | SAST | CodeQL, semgrep, configured + clean (not just enabled) |
| S2 | SCA / dep vulns | cargo-deny, npm audit, OSV — blocking on criticals |
| S3 | Secret scan | trufflehog, gitleaks — pre-commit or pre-push |
| S4 | Authn/authz | route guards, scope check, routeGuard.ts or equivalent |
| S5 | Input validation | Zod / type guards at every boundary |
| S6 | Output sanitization | no raw stack/msg in HTTP/SSE responses (e.g., `buildErrorBody()`) |
| S7 | Threat model | STRIDE or per-feature, documented |
| S8 | SLSA Build L2 | release attestation, provenance, signed |
| S9 | Action SHA pinning | no floating tags in `.github/workflows/` |

### Q — Quality engineering (4)

| ID | Pillar | What to look for |
|----|--------|------------------|
| Q1 | 35 CI quality gates | wired, names documented in CLAUDE.md or governance |
| Q2 | Ratchets vs baseline | no regression, not absolute (allows improvement) |
| Q3 | Allowlist hygiene | every entry has justification + tracking issue; no stale |
| Q4 | Coverage gap reports | per-PR, blocking |

### E — Engineering practice (5)

| ID | Pillar | What to look for |
|----|--------|------------------|
| E1 | Worktree discipline | canonical=main; features in wtrees; no edit in canonical |
| E2 | Branch hygiene | prefixes (feat/fix/refactor/docs/test/chore) |
| E3 | Commit format | conventional commits, scoped, sign-off |
| E4 | Co-author trailer policy | no AI/bot credit trailers; humans only |
| E5 | No `--no-verify` / `--no-gpg-sign` | without operator approval |

### G — Governance (6)

| ID | Pillar | What to look for |
|----|--------|------------------|
| G1 | CODEOWNERS | per-area ownership, enforced by GitHub |
| G2 | SECURITY.md | disclosure process, contact |
| G3 | CONTRIBUTING.md | conventional workflow, dev setup |
| G4 | LICENSE | MIT/Apache-2.0; headers consistent |
| G5 | CODE_OF_CONDUCT.md | Contributor Covenant v2.1 |
| G6 | Audit log retention | evidence trail for shipped changes (per-quarter) |

### O — Operations (5)

| ID | Pillar | What to look for |
|----|--------|------------------|
| O1 | Release flow | semantic version, changelog, tag, signed release |
| O2 | Runbooks | per-incident, per-deploy; tested |
| O3 | On-call rotation | pager or schedule |
| O4 | Dashboards | health, latency, error rate, SLO burn |
| O5 | Alerts | SLO burn-rate, not noise; routed |

### SC — Supply chain (4)

| ID | Pillar | What to look for |
|----|--------|------------------|
| SC1 | Dependency pinning | lockfile committed (Cargo.lock, package-lock.json) |
| SC2 | SBOM | CycloneDX/SPDX generated per release |
| SC3 | Attestation | SLSA L2 evidence published with release |
| SC4 | Provenance | per-release build provenance, signed |

### OB — Observability (4)

| ID | Pillar | What to look for |
|----|--------|------------------|
| OB1 | Structured logs | JSON, with request_id, user_id (where safe) |
| OB2 | Metrics | RED (rate, errors, duration) for every service |
| OB3 | Traces | OpenTelemetry, sampled, trace_id in logs |
| OB4 | SLOs | defined, measured, alerted |

### C — Cost (3)

| ID | Pillar | What to look for |
|----|--------|------------------|
| C1 | CI runner choice | standard Linux, not billed (no macOS/Windows) |
| C2 | Cache hit rate | ≥80% for cargo/npm caches |
| C3 | Build time | p50 tracked, ratchet on regression |

### DA — Data/contracts (3)

| ID | Pillar | What to look for |
|----|--------|------------------|
| DA1 | Schema migrations | versioned, idempotent, transactional, ordered |
| DA2 | Event versioning | backward compat policy documented |
| DA3 | API deprecation | sunset path, 6-month minimum notice |

### RT — Runtime compatibility (2)

| ID | Pillar | What to look for |
|----|--------|------------------|
| RT1 | MSRV / Node matrix | documented + CI matrix |
| RT2 | Platform support | macOS/Linux/Windows — explicit support matrix |

### RE — Reproducibility (2)

| ID | Pillar | What to look for |
|----|--------|------------------|
| RE1 | Lockfile pinning | exact versions for critical paths |
| RE2 | Hermetic builds | deterministic; no `latest`; no network at build time |

### AP — API surface (2)

| ID | Pillar | What to look for |
|----|--------|------------------|
| AP1 | OpenAPI current | generated from code, not hand-edited |
| AP2 | Contract tests | consumer-driven (Pact or equivalent) |

### DM — Domain model (2)

| ID | Pillar | What to look for |
|----|--------|------------------|
| DM1 | Rich domain | behaviors with state, not anemic |
| DM2 | Invariants | encoded in types (newtype pattern, sealed types) |

### EH — Error handling (2)

| ID | Pillar | What to look for |
|----|--------|------------------|
| EH1 | Typed errors | specific types per failure mode (no `Result<T, String>`) |
| EH2 | Sanitization at boundary | no raw stack/msg in HTTP/SSE responses |

### CN — Concurrency (3)

| ID | Pillar | What to look for |
|----|--------|------------------|
| CN1 | No data races | loom/ThreadSanitizer clean (Rust); no shared mutable state without sync |
| CN2 | Async cancellation | abort signals everywhere; no orphaned tasks |
| CN3 | Idempotency | retry-safe endpoints (idempotency-key header) |

### PS — Persistence (2)

| ID | Pillar | What to look for |
|----|--------|------------------|
| PS1 | Transaction boundaries | explicit, not implicit |
| PS2 | WAL / journaling | enabled, fsync correct (no `synchronous=OFF` for prod) |

### CF — Configuration (2)

| ID | Pillar | What to look for |
|----|--------|------------------|
| CF1 | Env validation | Zod or equivalent at boot; fail fast on missing |
| CF2 | Secret zeroization | no plaintext in logs/heap dumps; `zeroize` crate or equivalent |

### PR — Privacy (2)

| ID | Pillar | What to look for |
|----|--------|------------------|
| PR1 | PII handling | scrub at ingress; no PII in logs |
| PR2 | Data retention | documented schedule, enforced |

### RL — Resilience (3)

| ID | Pillar | What to look for |
|----|--------|------------------|
| RL1 | Circuit breaker | present in network code (provider breaker, connection cooldown) |
| RL2 | Retry with backoff + jitter | deadline-aware, exponential, capped |
| RL3 | Bulkhead | resource isolation (per-tenant or per-key) |

### AS — Agentic safety (2)

| ID | Pillar | What to look for |
|----|--------|------------------|
| AS1 | Loop detection | max-iter cap, no infinite loops in agent code |
| AS2 | Dry-run mode | preview before apply; explicit `--apply` flag |

### AU — Auditability (2)

| ID | Pillar | What to look for |
|----|--------|------------------|
| AU1 | Lineage | code→spec→test traceable |
| AU2 | Decision records | ADRs for non-trivial choices |

## Audit process

1. Read `CLAUDE.md` for self-described posture.
2. Read `README.md` for project type and stack.
3. Read governance files: `CODEOWNERS`, `SECURITY.md`, `CONTRIBUTING.md`, `LICENSE`, `CODE_OF_CONDUCT.md`.
4. Read `.github/workflows/*.yml` for CI gates and SHA pinning.
5. Read `quality-baseline.json` if present.
6. Read `docs/adr/` if present.
7. Read package manifest: `Cargo.toml` / `package.json` / `pyproject.toml` / `go.mod`.
8. Sample-read 2-3 source files per language to assess X/D/A pillars.
9. For each of 109 pillars, apply the decision tree and cite evidence.

## Skip-list enforcement

Subagent prompt and per-repo gate MUST abort with `{"repo": "<name>", "skipped": true}` if the repo name is in: `FocalPoint`, `AtomsBot`, `QuadSGM`, `Parpoura`. Do not score. Do not emit an action plan.

(Per user instruction, 2026-06-16.)
