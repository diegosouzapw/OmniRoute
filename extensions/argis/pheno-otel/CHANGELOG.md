# Changelog

All notable changes to the `pheno-otel` substrate canonical will be documented
in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

The Rust source for `pheno-otel` lives in `FocalPoint/pheno-otel/` (separate
git repo, its own `CHANGELOG.md`). This file tracks the **governance +
meta-bundle home** at the monorepo root.

## [Unreleased]

### Added (v11-044 tier-0 governance batch, 2026-06-20)

- **Governance meta-bundle** at the monorepo-root `pheno-otel/` path:
  - `AGENTS.md` — governance + conventions
  - `README.md` — quickstart + when-to-use
  - `CHANGELOG.md` — this file
  - `CODE_OF_CONDUCT.md` — Contributor Covenant v2.1
  - `CONTRIBUTING.md` — contribution guide
  - `SECURITY.md` — vulnerability disclosure policy
  - `LICENSE-MIT`, `LICENSE-APACHE` — dual license
- **Repo configuration:**
  - `Justfile` — task runner (build, test, lint, audit, release)
  - `.editorconfig` — editor consistency
  - `.gitattributes` — line endings + diff settings + LFS hints
  - `.gitignore` — Rust + IDE + OS ignores
  - `deny.toml` — `cargo-deny` configuration (advisories, bans, sources, licenses)
- **CI workflows** under `.github/workflows/`:
  - `ci.yml` — build + test matrix (stable + 1.82 MSRV)
  - `audit.yml` — `cargo audit` + 71-pillar refresh
  - `deny.yml` — `cargo-deny` advisory + license gate
  - `scorecard.yml` — OpenSSF Scorecard weekly
  - `release.yml` — release pipeline (publish trigger on tag)
- **Issue + PR templates** under `.github/`:
  - `ISSUE_TEMPLATE/bug.yml`
  - `ISSUE_TEMPLATE/feature.yml`
  - `ISSUE_TEMPLATE/security.yml`
  - `ISSUE_TEMPLATE/config.yml`
  - `PULL_REQUEST_TEMPLATE.md`
- **Governance plumbing:**
  - `CODEOWNERS` — auto-assignment
  - `dependabot.yml` — weekly dependency updates (cargo + github-actions)

### Notes

- **Source of truth for Rust code:** `FocalPoint/pheno-otel/` (separate repo).
- **No code changes in this batch** — governance + meta-bundle only.
- See `AGENTS.md` "Tier-0 hygiene" section for the v11-044 scope statement.

## Substrate cross-references

- ADR-012 — `pheno-tracing` canonical
- ADR-023 — Agent-effort governance (Rule 3.1 quality bar)
- ADR-025 — `pheno-worklog-schema` v2.1 (11-col `device:`)
- ADR-036B — `pheno-tracing` substrate canonical (re-affirmed)
- ADR-040 — Test coverage gates per tier (80% lib/SDK)
- ADR-041 — 71-pillar refresh cadence (weekly Monday)
- ADR-042 — Security audit cadence (monthly)
