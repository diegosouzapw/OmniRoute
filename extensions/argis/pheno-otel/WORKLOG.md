# pheno-otel — WORKLOG.md

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
- **Task ID** — fleet DAG id (`L1-001`, `L5-016`, `L5-037`).
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
| 2026-06-20 | L5-016 | L5 | add | pheno-otel/Cargo.toml:1-31 | Initial tier-0 release: OtlpPort trait + StdoutExporter + HttpExporter + 23 inline tests + 8 governance docs + 6 workflows + 2 issue templates + PR template + supply-chain configs + licenses. | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | add | pheno-otel/src/lib.rs:1-202 | OtlpPort trait + ExportHandle + OtlpError (4 variants) + 7 inline MockExporter tests. | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | add | pheno-otel/src/exporters/mod.rs:1-45 | ExporterConfig shared struct (endpoint, service_name, service_version). | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | add | pheno-otel/src/exporters/stdout.rs:1-97 | StdoutExporter impl (writes OTLP/JSON to stderr; 6 inline tests). | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | add | pheno-otel/src/exporters/http.rs:1-150 | HttpExporter impl (POSTs OTLP/JSON to OTLP/HTTP; traces/metrics/logs constructors; trailing-slash normalization; 10 inline tests). | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | docs | pheno-otel/AGENTS.md:1-90 | Agent constitution: substrate placement, pattern contract, conventions, do-not-touch zones. | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | docs | pheno-otel/SPEC.md:1-100 | Canonical 1-page spec: what/why/how/interface/consumers/status/references. | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | docs | pheno-otel/STATUS.md:1-70 | Weekly-refresh status doc with 71-pillar scorecard (49/213, 23%) and Factory AI level 0. | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | docs | pheno-otel/CHANGELOG.md:1-50 | Keep a Changelog 1.1.0: [Unreleased] + [0.1.0] sections. | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | docs | pheno-otel/CONTRIBUTING.md:1-90 | Branch prefixes, Conventional Commits, PR template, 80% lib coverage gate, self-merge policy. | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | chore | pheno-otel/justfile:1-80 | Task runner: ci, test, check, lint, audit, coverage. | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | chore | pheno-otel/deny.toml:1-65 | cargo-deny policy: MIT/Apache-2.0/ISC/BSD only; copyleft denied. | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | chore | pheno-otel/llvm-cov.toml:1-22 | 80% lib coverage threshold per ADR-040. | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | ci | pheno-otel/.github/workflows/ci.yml:1-100 | test + clippy + fmt + coverage (llvm-cov → codecov). | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | ci | pheno-otel/.github/workflows/audit.yml:1-90 | cargo-deny + cargo-audit + TruffleHog (weekly Mon 06:00 UTC). | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | ci | pheno-otel/.github/workflows/scorecard.yml:1-50 | OpenSSF Scorecard (weekly Mon 12:00 UTC). | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | ci | pheno-otel/.github/workflows/lint.yml:1-40 | YAML lint (yamllint relaxed). | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | ci | pheno-otel/.github/workflows/deny.yml:1-50 | cargo-deny check on push/PR. | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | ci | pheno-otel/.github/workflows/release.yml:1-60 | Tag-triggered release pipeline. | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | docs | pheno-otel/llms.txt:1-90 | LLM-friendly content discovery index (llmstxt.org format). | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | docs | pheno-otel/CODE_OF_CONDUCT.md:1-50 | Contributor Covenant 2.1. | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | docs | pheno-otel/SECURITY.md:1-50 | Vulnerability disclosure policy. | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | chore | pheno-otel/.github/CODEOWNERS:1-10 | @KooshaPari default owner; .github/workflows/* owner. | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | chore | pheno-otel/.github/dependabot.yml:1-25 | daily cargo + weekly github-actions updates. | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | chore | pheno-otel/.github/ISSUE_TEMPLATE/bug_report.md:1-30 | Bug report template. | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | chore | pheno-otel/.github/ISSUE_TEMPLATE/feature_request.md:1-30 | Feature request template. | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | chore | pheno-otel/.github/PULL_REQUEST_TEMPLATE.md:1-30 | PR template: What/Why/How, Test plan, Risk, References. | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | chore | pheno-otel/.editorconfig:1-25 | File-format conventions. | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | chore | pheno-otel/.gitattributes:1-30 | LFS policy per ADR-027 (3-tier: always/on-demand/never). | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | chore | pheno-otel/LICENSE-MIT:1-21 | MIT license (Copyright Koosha Pari 2026). | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | chore | pheno-otel/LICENSE-APACHE:1-200 | Apache 2.0 license. | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
| 2026-06-20 | L5-016 | L5 | chore | pheno-otel/CHANGELOG.md:1-50 | Keep a Changelog 1.1.0 ([Unreleased] + [0.1.0] sections). | macbook | forge | sha256:tbd | chore/orch-v11-016-tier0-2026-06-20 | https://github.com/KooshaPari/phenotype-apps/pull/TBD |
