# pheno-port-adapter — WORKLOG.md

> **Schema:** `v2.1` (ADR-025 + ADR-030; supersedes v2.0 on 2026-06-22). Validator: `pheno-worklog-schema` Python lib (`SPEC-v2.1.md`).
> **Location:** repo root, alongside `SPEC.md` + `CHANGELOG.md`.

---

## 1. Schema (v2.1, 11 columns, canonical order)

| Date | Task ID | Layer | Action | Files | Notes | Device | Actor | Hash | Branch | PR-URL |
|---|---|---|---|---|---|---|---|---|---|---|
| `YYYY-MM-DD` | `L<n>-<id>` | `L<n>` | `verb` | `path:line` | text | enum | enum | `sha256:8` | `branch` | `https://.../pull/n` |

One task per row. Header row is mandatory. Validator: `pheno-worklog-schema validate ./WORKLOG.md`.

## 2. Columns

- **Date** — ISO 8601 day work landed.
- **Task ID** — fleet DAG id (`L1-001`, `L5-104.1`, `L5-116`).
- **Layer** — DAG layer (L1 top → L9 infra); mirrors Task ID prefix.
- **Action** — past-tense verb: `add` / `fix` / `refactor` / `absorb` / `archive` / `migrate` / `docs`.
- **Files** — primary path with `path:startLine-endLine` per AGENTS.md citation rule.
- **Notes** — one line, no markdown.
- **Device** — see § 3 (`macbook` / `heavy-runner` / `subagent` / `ci`).
- **Actor** — `human` / `forge` / `codex` / `droid` / `ci-bot`.
- **Hash** — `sha256:<8 hex>` of concatenated column values (optional).
- **Branch** — git branch the work landed on.
- **PR-URL** — full PR URL, or empty if not yet opened.

## 3. Device field (ADR-025 + ADR-030, 4 valid values)

- **`macbook`** — planning, ADRs, small focused PRs, code review, dogfooding (ADR-023 device-fit gate).
- **`heavy-runner`** — full `cargo test --workspace`, iOS sim, DinD, Unity editor, > 10 min single build/test on MacBook.
- **`subagent`** — work dispatched via forge / codex / Codex to a worker tier.
- **`ci`** — work performed by GitHub Actions or other CI bot.

## 4. Examples (this crate's actual rows)

| Date | Task ID | Layer | Action | Files | Notes | Device | Actor | Hash | Branch | PR-URL |
|---|---|---|---|---|---|---|---|---|---|---|
| 2026-06-18 | L5-116 | L5 | docs | pheno-port-adapter/AGENTS.md:1, pheno-port-adapter/SPEC.md:1, pheno-port-adapter/STATUS.md:1, pheno-port-adapter/WORKLOG.md:1, pheno-port-adapter/CHANGELOG.md:1, pheno-port-adapter/CONTRIBUTING.md:1, pheno-port-adapter/llms.txt:1 | Adopt v8 governance meta-bundle (7 files) per ADR-042 + ADR-038 (L5-116); SPEC.md cites Port trait + Adapter impl + HexStorage example; STATUS.md cites ADR-038 + ADR-042 + honest 71-pillar score (60/213 = 28.2%); no version bump; no Rust code changes | `macbook` | `human` | sha256:e1b2c3a4 | chore/l5-116-meta-bundle-pheno-port-adapter-2026-06-18 | (this PR) |
| 2026-06-18 | L5-103 | L5 | migrate | pheno-port-adapter/WORKLOG.md:1 | Migrate WORKLOG.md to v2.1 schema (11-col, device:) per ADR-025 + ADR-030; prior 11-col ad-hoc schema deprecated | `macbook` | `human` | sha256:557b51c5 | chore/l5-103-fleet-worklog-v2-1-migration-2026-06-18 | https://github.com/KooshaPari/phenotype-apps/pull/N (monorepo) |
| 2026-06-11 | L4-66 | L4 | feat | pheno-port-adapter/Cargo.toml:1, pheno-port-adapter/src/lib.rs:1, pheno-port-adapter/src/adapters/mod.rs:1, pheno-port-adapter/src/adapters/tcp.rs:1, pheno-port-adapter/src/adapters/unix.rs:1 | Initial implementation: PortAdapter trait (name/health/connect/disconnect) + TcpAdapter + UnixAdapter + MockAdapter (test-only) + 5 unit tests + Connection opaque handle + AdapterError enum (4 variants) per ADR-014 | `macbook` | `human` | sha256:e2edcf81 | chore/l4-66-pheno-port-adapter-2026-06-11 | https://github.com/KooshaPari/phenotype-apps/pull/114 |

## 5. Validation

`pheno-worklog-schema` v2.1 enforces:
- header row matches 11-column schema exactly (order, casing, dashes).
- `Date` is ISO 8601.
- `Task ID` matches `^[A-Z]?[0-9]+([.-][0-9]+)*$`.
- `Device` ∈ {`macbook`, `heavy-runner`, `subagent`, `ci`}.
- `Actor` ∈ {`human`, `forge`, `codex`, `droid`, `ci-bot`}.
- `PR-URL` is a valid `https://github.com/.../pull/<n>` URL or empty.
- one task per row.

CLI: `pheno-worklog-schema validate ./WORKLOG.md`.

## 6. Related

- **AGENTS.md** (this monorepo) — § Conventions: meta-bundle; § Stale/warnings: ADR-025 v2.0 deprecation 2026-06-22.
- **ADR-015** — v2.0 10-column schema (superseded).
- **ADR-025** — v2.1 bump, adds `device:` column.
- **ADR-030** — `pheno-worklog-schema v2.1`, pins the 4 `device:` values.
- **ADR-023** — device-fit gate.
- **pheno-worklog-schema** — `SPEC-v2.1.md`, validator CLI, `migrate_v2_to_v2_1.py`.

---

## Template usage notes (per ADR-025)

- **Length:** ≤ 1 page (≤ 60 lines). Longer → task granularity too coarse, split rows.
- **One row per task:** no multi-day mega-rows. Split on commit boundaries.
- **No "TBD":** fill every cell, or delete the row.
- **Append-only:** edit prior rows only to fix typos or attach PR-URL post-merge.
- **Update cadence:** one row per landed commit/PR. Bulk backfill is a one-time migration.
