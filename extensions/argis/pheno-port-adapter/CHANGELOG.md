<!--
  CHANGELOG.md for pheno-port-adapter — human-readable release notes.
  Format: Keep a Changelog 1.1.0 (https://keepachangelog.com/en/1.1.0/).
  Versioning: Semantic Versioning 2.0.0 (https://semver.org/spec/v2.0.0.html).
  Source data: WORKLOG.md v2.1 rows where Device ∈ {ci, heavy-runner}.
  Per ADR-025 + ADR-030 + ADR-042 element 7.
-->

# Changelog

All notable changes to `pheno-port-adapter` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- v8 governance meta-bundle (7 files) per ADR-042 + ADR-038: `AGENTS.md`, `SPEC.md`, `STATUS.md`, `WORKLOG.md` (v2.1 schema), `CHANGELOG.md`, `CONTRIBUTING.md`, `llms.txt` (L5-116, 2026-06-18).
- `SPEC.md` — canonical 1-page spec citing the `Port` trait + `Adapter` impl pattern (ADR-038) and the canonical `HexStorage` consumer example (illustrative; not in this crate).
- `STATUS.md` — weekly-refresh status doc with honest 71-pillar scorecard (60/213 = 28.2% per `findings/71-pillar-2026-06-17.md` § 1.10) and Factory AI Agent Readiness level 0 (Functional).
- `CONTRIBUTING.md` — Conventional Commits + branch prefixes + PR template + 80% lib coverage gate (ADR-040) + self-merge policy.
- `WORKLOG.md` — migrated to v2.1 schema (11 columns, `device:` field per ADR-025 + ADR-030); prior 11-col ad-hoc schema deprecated 2026-06-22.
- `llms.txt` — v8 template (curated `## Documentation` + `## Optional` sections).

### Changed
- `AGENTS.md` — expanded from 30-line v7 stub to full v8 per-repo template (substrate placement ADR-023, build/test, conventions, do-not-touch zones, authority).
- `llms.txt` — expanded from 25-line ad-hoc format to v8 template (fixed `## Documentation` + `## Optional` structure per llmstxt.org).
- `CHANGELOG.md` — restructured to Keep a Changelog 1.1.0 with `[Unreleased]` + 6 empty subsections; prior entries migrated under `[0.1.0]`.
- `WORKLOG.md` — migrated from 11-col ad-hoc schema (`task_id|date|repo|...`) to v2.1 canonical schema (`Date | Task ID | Layer | Action | Files | Notes | Device | Actor | Hash | Branch | PR-URL`).

### Deprecated
- `WORKLOG.md` v2.0 schema (10 columns, no `device:` field) — use v2.1; deprecation date 2026-06-22 per ADR-025.

### Fixed
- n/a (no Rust code changes in this PR; templates + governance docs only per L5-116 scope).

### Security
- n/a (no security-relevant changes in this PR; `deny.toml` migration is on the wip branch `wip-2026-06-18-v8-batch-5-meta-bundles-4-repos` and will land separately).

## [0.1.0] - 2026-06-11

### Added
- Initial release of `pheno-port-adapter` (PR #114, L4-66) — the reference implementation of the hexagonal L4 Port/Adapter pattern (ADR-014 predecessor of ADR-038).
- `PortAdapter` trait (`name`, `health`, `connect`, `disconnect`) — hexagonal L4 contract per ADR-014; `Send + Sync` supertrait.
- `Connection` opaque handle (`id: String`); returned by `connect()`.
- `AdapterError` enum (4 variants) — `ConnectFailed(String)`, `DisconnectFailed(String)`, `HealthCheckFailed(String)`, `Timeout`; `thiserror`-derived with `#[error("...")]` on each.
- `TcpAdapter` — sync; uses `std::net::TcpStream`; in-tree.
- `UnixAdapter` — sync; uses `std::os::unix::net::UnixStream`; in-tree.
- `MockAdapter` — test-only, in-tree (in `src/lib.rs` test module).
- 5 unit tests covering trait contract: `connect_returns_connection`, `disconnect_returns_ok`, `health_check_passes`, `connect_to_invalid_endpoint_fails`, `adapter_name_is_non_empty`.
- `[workspace]` table (empty) — standalone crate, not a member of the root monorepo workspace.
- `thiserror = "2.0"` dependency.
- `LICENSE-MIT` (standard MIT, copyright Koosha Pari 2026).
- `AGENTS.md`, `llms.txt`, `WORKLOG.md`, `CHANGELOG.md` (v7 format, pre-ADR-042).

### Changed
- n/a (initial release).

### Deprecated
- n/a (initial release).

### Removed
- n/a (initial release).

### Fixed
- n/a (initial release).

### Security
- n/a (initial release).
