# ADR Index — 2026-06-18 wave

Wave-specific index for Architecture Decision Records authored on 2026-06-18.
This wave comprises 15 ADRs (ADR-035..049, including B-variants) across 3 sub-waves:
Wave A (substrate canonicals ADR-035..040), Wave B (cadence/quality ADR-041..043),
Wave C (forward-looking governance ADR-046..049).

---

## Wave A — Substrate canonicals (ADR-035..ADR-040)

## ADR-035 — Configra migration gates

- **Path:** `docs/adr/2026-06-18/ADR-035-configra-migration-gates.md`
- **Status:** ACTIVE (closes L6 health gap)
- **Owner:** orch-w1-a (L5-105)

## ADR-035B — Event-bus substrate consolidation

- **Path:** `docs/adr/2026-06-18/ADR-035B-event-bus-substrate-consolidation.md`
- **Status:** ACTIVE
- **Owner:** orch-w1-a (L5-105.5)
- **Scope:** `pheno-events` / `phenotype-bus` / `phenotype-hub` polyglot merge plan

## ADR-036 — pheno-capacity substrate canonical

- **Path:** `docs/adr/2026-06-18/ADR-036-pheno-capacity.md`
- **Status:** **CLOSED 2026-06-19** (executed; pheno-capacity repo created)
- **Owner:** orch-w1-a (L5-106)
- **Outcome:** `KooshaPari/pheno-capacity#1` merged; `bucket_change HwLedger:
  from=CONDITIONAL to=STABLE reason=pheno-capacity extracted as canonical substrate`.

## ADR-036B — pheno-tracing substrate canonical (re-affirmed)

- **Path:** `docs/adr/2026-06-18/ADR-036-pheno-tracing-substrate-canonical.md`
- **Status:** ACTIVE (supersedes ADR-012 reference for v8 sweep)
- **Owner:** orch-w1-a (L5-106.5)

## ADR-037 — pheno-mcp-router substrate canonical (re-affirmed)

- **Path:** `docs/adr/2026-06-18/ADR-037-pheno-mcp-router-substrate-canonical.md`
- **Status:** ACTIVE (supersedes ADR-013 reference for v8 sweep)
- **Owner:** orch-w1-a (L5-107)

## ADR-038 — Hexagonal port-adapter L4 policy (formal)

- **Path:** `docs/adr/2026-06-18/ADR-038-hexagonal-port-adapter-l4-policy.md`
- **Status:** ACTIVE (supersedes ADR-014 reference for v8 sweep)
- **Owner:** orch-w1-a (L5-108)

## ADR-039 — pheno-flake refresh template

- **Path:** `docs/adr/2026-06-18/ADR-039-pheno-flake-refresh-template.md`
- **Status:** ACTIVE
- **Owner:** orch-w1-a (L5-109)
- **Scope:** nix flake canonical for all pheno-* tooling

## ADR-040 — Test coverage gates per tier

- **Path:** `docs/adr/2026-06-18/ADR-040-test-coverage-gates-per-tier.md`
- **Status:** ACTIVE (codifies ADR-023 Rule 3.1)
- **Owner:** orch-w1-a (L5-110)
- **Coverage thresholds:** 80% lib/SDK, 70% framework, 60% federated service

---

## Wave B — Cadence / quality ADRs (ADR-041..ADR-043)

> **Note:** doc-numbering collision with drift detector; B-variants used to disambiguate.

## ADR-041 — 71-pillar refresh cadence

- **Path:** `docs/adr/2026-06-18/ADR-041-71-pillar-refresh-cadence.md`
- **Status:** ACTIVE (re-authored 2026-06-20 in d20cbc72 after disk-loss event)
- **Owner:** orch-w1-a (L5-110.1)
- **Cadence:** weekly Monday 09:00 PDT (codifies `audit-71-pillar-2026-06-17-wrapup.md` § 11)

## ADR-041B — Substrate audit cadence

- **Path:** `docs/adr/2026-06-18/ADR-041-substrate-audit-cadence.md`
- **Status:** ACTIVE
- **Owner:** orch-w1-a (L5-110.2)
- **Cadence:** bi-weekly substrate health audit

## ADR-042 — Security audit cadence

- **Path:** `docs/adr/2026-06-18/ADR-042-security-audit-cadence.md`
- **Status:** ACTIVE
- **Owner:** orch-w1-a (L5-110.3)
- **Cadence:** monthly `cargo audit` + `pip-audit` + `govulncheck` sweep

## ADR-042B — Substrate quality bar (formal)

- **Path:** `docs/adr/2026-06-18/ADR-042-substrate-quality-bar.md`
- **Status:** ACTIVE (codifies ADR-023 Rule 3.1 with named checks)
- **Owner:** orch-w1-a (L5-110.4)

## ADR-043 — Registry refresh cadence

- **Path:** `docs/adr/2026-06-18/ADR-043-registry-refresh-cadence.md`
- **Status:** ACTIVE
- **Owner:** orch-w1-a (L5-110.5)
- **Cadence:** bi-weekly `phenotype-registry` validation

---

## Wave C — Forward-looking governance (ADR-046..ADR-049)

## ADR-046 — Federation mTLS + OIDC

- **Path:** `docs/adr/2026-06-18/ADR-046-federation-mtls-oidc.md`
- **Status:** ACTIVE
- **Owner:** orch-w1-a (L5-111)
- **Scope:** cross-org service-to-service auth

## ADR-047 — Predictive DRY discipline (4-criterion rule)

- **Path:** `docs/adr/2026-06-18/ADR-047-predictive-dry.md`
- **Status:** ACTIVE (governing section in AGENTS.md § Predictive DRY)
- **Owner:** orch-w1-a (L5-112)
- **Tool:** `KooshaPari/pheno-predict` (L72)

## ADR-048 — Substrate graduation path (4-tier gate table)

- **Path:** `docs/adr/2026-06-18/ADR-048-substrate-graduation-path.md`
- **Status:** ACTIVE (governing section in AGENTS.md § Substrate graduation path)
- **Owner:** orch-w1-a (L5-113)
- **Tool:** `KooshaPari/pheno-framework-lint` (L73)

## ADR-049 — App-substrate drift detector (3-pass algorithm)

- **Path:** `docs/adr/2026-06-18/ADR-049-app-substrate-drift-detector.md`
- **Status:** ACTIVE (governing section in AGENTS.md § App-substrate drift detector)
- **Owner:** orch-w1-a (L5-114)
- **Tool:** `KooshaPari/pheno-drift-detector` (L74)

---

## Refresh cadence

- Refreshed: 2026-06-20 (v8-batch-11B sweep — INDEX scaffold added)
- Next refresh: 2026-06-25 (bi-weekly substrate audit, per ADR-041B)