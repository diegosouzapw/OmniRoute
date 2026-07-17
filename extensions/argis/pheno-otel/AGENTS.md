# `pheno-otel` — Governance & Conventions

> **Status:** ACTIVE (governance meta-bundle for the `pheno-otel` substrate canonical in the Phenotype monorepo)
> **Date:** 2026-06-20
> **Owner:** KooshaPari (orch-v11-044)
> **Supersedes:** none (initial governance import)
> **Substrate role:** Rust library (per ADR-012 + ADR-036B substrate canonicals)

---

## What this path is

`pheno-otel/` is the **substrate-canonical path** in the Phenotype monorepo for the `pheno-otel` Rust crate — the canonical OpenTelemetry initialization primitive for the entire fleet. It follows the ADR-023 substrate placement rule (pure reusable library, single concern, single crate).

The **executable Rust source** for `pheno-otel` is currently maintained in the `FocalPoint/pheno-otel/` sub-repo of this monorepo (a separate git worktree with its own release cadence). The path you are reading — `pheno-otel/` at the monorepo root — is the **governance + meta-bundle home**: spec, ADR cross-references, worklog, issue templates, and CI templates.

When a release is cut from `FocalPoint/pheno-otel/`, the `pheno-otel/` governance path is updated to reflect the new version and changelog entries.

## Quickstart (governance-first)

1. Read this file (`AGENTS.md`) end-to-end. It is the canonical entry point.
2. Read `CHANGELOG.md` for what is in scope for the current release.
3. Read `CONTRIBUTING.md` before opening a PR.
4. Read `SECURITY.md` before reporting a vulnerability.
5. Use the issue templates (`.github/ISSUE_TEMPLATE/`) for any new work.
6. Follow the PR template (`.github/PULL_REQUEST_TEMPLATE.md`) when opening a PR.

## Substrate invariants (per ADR-023 Rule 3.1)

Every change to `pheno-otel/` MUST preserve:

- **Spec** — `SPEC.md` (or in `FocalPoint/pheno-otel/README.md`) — 1-page max.
- **Docs** — `README.md` + this `AGENTS.md` — what, when, when **not**, 5-line quickstart.
- **Tests** — unit + integration minimum; e2e + perf + chaos preferred for fleet-critical substrates.
- **Observability** — OTLP export via `pheno-tracing` (ADR-012), info-level minimum.
- **Coverage gate** — 80% lib/SDK minimum (per ADR-040).
- **CI gate** — `pheno-ci-templates` runs the test matrix, coverage gate, OTLP smoke test.
- **Worklog v2.1** — including the `device:` field (ADR-025, ADR-030).

## Branch naming

- `chore/<req-id>-<slug>-<date>` for chore work
- `feat/<req-id>-<slug>-<date>` for features
- `fix/<req-id>-<slug>-<date>` for bugfixes
- `docs/<req-id>-<slug>-<date>` for documentation-only changes

## Commit message format

Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `build:`, `ci:`) with optional scope. Examples:

```
feat(init): add OtlpGrpcExporterBuilder with retry
fix(guard): flush timeout must be 5s not infinite
chore(deps): bump opentelemetry to 0.27.1
docs(governance): refresh AGENTS.md for v11 batch
```

## PR labels

- `governance` — cleanup, ADRs, meta-bundle updates
- `L<n>-#<n>` — tracking against DAG level
- `breaking` — API or behavior change
- `security` — security-related

## SOTA artifacts

- `findings/` — research notes, audit reports, scoring
- `plans/` — implementation plans
- `worklogs/` — per-change audit trail (v2.1 schema, ADR-025)
- `docs/adr/<date>/` — Architecture Decision Records

## Related ADRs

- **ADR-012** — `pheno-tracing` canonical across pheno-* repos
- **ADR-023** — Agent-effort governance (device + dogfood + app substrate policy)
- **ADR-025** — `pheno-worklog-schema` v2.1 (11-col `device:` field)
- **ADR-036B** — `pheno-tracing` substrate canonical (re-affirmed)
- **ADR-040** — Test coverage gates per tier (80% lib/SDK minimum)
- **ADR-041** — 71-pillar refresh cadence
- **ADR-042** — Security audit cadence

## Tier-0 hygiene (this batch, v11-044)

This path received tier-0 governance hygiene on 2026-06-20 as part of the v11 wide-tree batch:

- Governance meta-bundle: `AGENTS.md`, `README.md`, `CHANGELOG.md`, `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE-MIT`, `LICENSE-APACHE`
- Repo config: `Justfile`, `.editorconfig`, `.gitattributes`, `.gitignore`, `deny.toml`
- CI: `.github/workflows/{ci,audit,deny,scorecard,release}.yml`
- Issue + PR templates: `.github/ISSUE_TEMPLATE/`, `.github/PULL_REQUEST_TEMPLATE.md`
- `CODEOWNERS`, `dependabot.yml`

See `CHANGELOG.md` for the full list.

## Contact

- Owner: KooshaPari (<https://github.com/KooshaPari>)
- Issues: use `.github/ISSUE_TEMPLATE/`
- Security: see `SECURITY.md`
