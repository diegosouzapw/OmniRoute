# L5-114 — pheno-llms-txt absorption audit

**Date:** 2026-06-19
**ADR:** [ADR-040](../../../phenotype-org-audits/audits/2026-06-18_ADR-040-deletion-recipe.md) (5-step deletion recipe)
**Pattern reference:** [L5-112 predict-dry](../../../phenotype-org-audits/audits/2026-06-18_ADR-040-deletion-recipe.md), [L5-112 drift-detector](../../2026-06-19-L5-112-drift-detector-absorption.md), [L5-112 framework-lint](../../2026-06-19-L5-112-framework-lint-absorption.md)
**Source repo:** `KooshaPari/pheno-llms-txt`
**Target repo:** `KooshaPari/phenotype-py-extras` → `src/phenotype_py_extras/llms_txt/` (Python package absorption)
**PR:** https://github.com/KooshaPari/phenotype-py-extras/pull/6

---

## 1. EXECUTIVE_DECISION

| | |
|---|---|
| **Verdict** | `DELETE_AFTER_PATCHES` |
| **Confidence** | **9/10** (HIGH) |
| **Rationale** | 22 source files, all Python + governance + config. Every functional file has a natural home under `phenotype-py-extras`. Zero inbound references from any other fleet repo beyond the spec link in `pheno-llms-txt.org`. Zero external users (created 2026-06-11 scaffold, branched/wip; no published version, no installer consumers). All 10 commits are either meta-bundle, scaffold, or local wip. The canonical content (Python module + tests + example + llms.txt file format spec) is fully absorbed into `phenotype-py-extras` (`c89580e`). Target is a Python-extras package, which already serves `pheno-*-extras`-style consumption, making the absorption protocol-natural. |

## 2. SOURCE_INVENTORY

**Source repo:** `KooshaPari/pheno-llms-txt` (cloned at `/Users/kooshapari/CodeProjects/Phenotype/repos/pheno-llms-txt/`)
**Default branch:** `main`
**Local working branch seen during audit:** `chore/v8-batch-9B-meta-bundle` (HEAD = `6077ef8`, not the absorption source branch — `feat/absorb-pheno-llms-txt-2026-06-18` is on target side)
**Commits (10 total on origin/main + branches):**

| SHA | Branch presence | Subject |
|---|---|---|
| `6077ef8` | chore/v8-batch-9B-meta-bundle | chore: wip local work 2026-06-18 |
| `b0e5ef4` | wip/stash-w5-3-vibecoding-adoption-2026-06-17 | wip: restore stash w5-3-vibecoding-adoption [auto] |
| `5a7f892` | main | feat(llms-txt): add init_llms scaffold-kit entrypoint (V6 PR-3) |
| `e534181` | main | chore: adopt pheno-vibecoding-guard pre-commit hook (V11 §70.3 L16 AX acceptance) |
| `ae0e774` | main | chore(governance): add CODEOWNERS with @kooshapari as default owner |
| `ac95852` | main | chore(governance): add CODE_OF_CONDUCT.md,CONTRIBUTING.md,SECURITY.md,LICENSE |
| `b4686da` | main | Add ISSUE_TEMPLATE: bug, feature, security, question + chooser config |
| `b9a61c5` | main | ci: add comprehensive PULL_REQUEST_TEMPLATE.md |
| `2124ae0` | main | docs(worklog): V20 entry (V20) |
| `2b25534` | main | feat: initial scaffold (V4 §77 crutch) |

**Files (22 total, excluding build artifacts):**

| File | LOC | Purpose |
|---|---|---|
| `src/pheno_llms_txt/__init__.py` | 59 | Public API + `init_llms()` V6 PR-3 scaffold-kit entrypoint |
| `src/pheno_llms_txt/core.py` | 96 | `LlmConfig` dataclass + `render()` + `load_config()` + `write_llms_txt()` |
| `src/pheno_llms_txt/cli.py` | 23 | `pheno-llms-txt` click-based CLI (`--config`, `--out`) |
| `tests/test_core.py` | – | Core unit tests |
| `tests/test_init.py` | – | Init unit tests |
| `examples/quickstart.py` | – | End-to-end demo |
| `llms.txt` | – | Canonical output artifact (dogfood, generates itself) |
| `README.md` | – | User-facing install + usage docs |
| `SPEC.md` | – | Technical spec (Public API, CLI, Conventions, Quality bar) |
| `AGENTS.md` | – | Agent instructions |
| `CHANGELOG.md` | – | Version history |
| `WORKLOG.md` | – | Authorial worklog |
| `pyproject.toml` | – | Package manifest (hatchling, 3 deps: pyyaml + click + ???) |
| `.github/workflows/ci.yml` | – | CI workflow |
| `.github/ISSUE_TEMPLATE/*.yml` | – | Issue templates (4 files) |
| `.github/PULL_REQUEST_TEMPLATE.md` | – | PR template |
| `.pre-commit-config.yaml` | – | Pre-commit config (pheno-vibecoding-guard hook) |
| `justfile` | – | justfile |
| `deny.toml` | – | Vestigial Rust-deps policy (Python repo, no Rust) |
| `LICENSE-MIT` | – | License (MIT) |
| `LICENSE-APACHE` | – | License (Apache-2.0) |
| `requirements-dev.txt` | – | Dev dependencies |
| `.gitignore` | – | Git ignores |
| `.gitattributes` | – | LFS / line-ending config (if any) |

**Public API surface:**

```python
from pheno_llms_txt import LlmConfig, render, load_config, write_llms_txt, init_llms
# Or CLI: pheno-llms-txt --config pheno-llms-txt.yaml --out llms.txt
```

**Algorithm (from code):**
1. `LlmConfig` dataclass (7 fields: `repo_name`, `tagline`, `install`, `usage`, `public_api`, `common_errors` (list[tuple[str,str]]), `references`).
2. `render()` formats the `TEMPLATE` constant with the config (Install / Usage / Public API / Common errors / See also sections).
3. `load_config()` reads `.yaml` via `pyyaml.safe_load` → `LlmConfig.from_dict()`; defaults if missing file.
4. `write_llms_txt()` renders and writes to disk.
5. `init_llms()` (V6 PR-3): scaffold-kit entrypoint that writes a starter `pheno-llms-txt.yaml` (idempotent) + renders `llms.txt`. Returns structured dict for orchestrator use.

**Exit codes:** CLI returns click's `main()` exit codes; no explicit codes.

## 3. BRANCH_INVENTORY

| Branch | Type | Tip | Status |
|---|---|---|---|
| `main` | default | `5a7f892` (after `2124ae0` worklog) | canonical, 9 commits |
| `chore/adopt-vibecoding-guard-2026-06-15` | remote working | (early branch, superseded) | pushing point before `e534181` |
| `chore/l3-57-pheno-plugin-registry-2026-06-11` | remote working | (registry work?) | older work |
| `chore/v8-batch-9B-meta-bundle` | local working | `6077ef8` (2026-06-18 wip) | not pushed to a remote (orphan) |
| `wip/stash-w5-3-vibecoding-adoption-2026-06-17` | remote stash-restore | `b0e5ef4` | wip-only restore |
| `remotes/origin/HEAD` | pointer | → `chore/adopt-vibecoding-guard-2026-06-15` | mis-set, should be `main` |

**No unique branch-only content to preserve beyond `main`** — all canonical Python content landed in `5a7f892` (`feat(llms-txt): add init_llms scaffold-kit entrypoint`). The `v8-batch-9B-meta-bundle` local branch (`6077ef8`) is `chore: wip local work 2026-06-18` — likely the same `AGENTS.md`/`SPEC.md` governance-meta content that `phenotype-org-audits` will absorb separately. Git history preserves everything pre-archive.

## 4. TARGET_PARITY_SUMMARY

| Source responsibility | Target location | Status |
|---|---|---|
| Renderer `core.py` (`LlmConfig`, `render`, `load_config`, `write_llms_txt`) | `phenotype-py-extras/src/phenotype_py_extras/llms_txt/core.py:1-138` | `DONE` (merged in PR #6, commit `c89580e`) |
| `init_llms()` V6 PR-3 scaffold-kit entrypoint | `phenotype-py-extras/src/phenotype_py_extras/llms_txt/core.py:16-55` (absorbed into core.py) | `DONE` (slight relocation: source had it in `__init__.py`; target consolidated into `core.py` to keep `__init__.py` as a re-export shim — semantically equivalent) |
| Public API re-export | `phenotype-py-extras/src/phenotype_py_extras/llms_txt/__init__.py:1-20` | `DONE` (re-exports `LlmConfig`, `render`, `load_config`, `write_llms_txt`, `cli_main`) |
| CLI (`pheno-llms-txt`) | `phenotype-py-extras/src/phenotype_py_extras/llms_txt/cli.py:1-23` | `DONE` (1:1 port, click-based, same `--config` / `--out` options) |
| Core tests | `phenotype-py-extras/tests/llms_txt/test_core.py` (74 LOC, 6 tests) | `DONE` |
| Init tests | `phenotype-py-extras/tests/llms_txt/test_init.py` (28 LOC, 4 tests) | `DONE` |
| Quickstart example | `phenotype-py-extras/examples/llms_txt/quickstart.py` (60 LOC) | `DONE` |
| llms-txt spec doc | `phenotype-py-extras/docs/llms-txt-spec.md` (58 LOC) | `DONE` (faithful superset of source `SPEC.md`'s Public API / CLI / Conventions / Output contract / Quality bar / See also sections) |
| Canonical output artifact (dogfood) | `phenotype-py-extras/docs/llms.txt` (28 LOC) | `DONE` (target's own llms.txt auto-generated artifact lives in `docs/`) |
| L7-001 intent snapshot | `phenotype-py-extras/docs/intent/phenotype-py-extras.md` (70 LOC) | `DONE_ADDED` (new artifact, not in source) |
| L7-001 boundary | `phenotype-py-extras/docs/boundary/phenotype-py-extras.md` (46 LOC) | `DONE_ADDED` (new artifact, not in source) |
| **Source-side files NOT migrated:** |
| `pyproject.toml` | target's `pyproject.toml` already covers extras; bundled in `phenotype-py-extras` (no separate install needed); necessary deps `pyyaml` + `click` are pulled in via the `cli` extras group transitively | `INTENTIONALLY_DEPRECATED` (single-package absorption; deps satisfied by target's `cli` extras) |
| `deny.toml` | vestigial Rust-deps policy in Python repo | `NO_MERIT` (excluded from PR) |
| `.github/workflows/ci.yml` | target has CI covering `tests/` (existing workflow) | `PARTIAL` (target's CI covers new tests in `tests/llms_txt/`) |
| `.github/ISSUE_TEMPLATE/*.yml` | target has its own templates | `INTENTIONALLY_DEPRECATED` |
| `.github/PULL_REQUEST_TEMPLATE.md` | target has its own template (`b0e5ef4` is meta) | `INTENTIONALLY_DEPRECATED` |
| `README.md` | `docs/llms-txt-spec.md` covers equivalent content; target's own `README.md` covers package-level install | `INTENTIONALLY_DEPRECATED` (consolidated into docs/) |
| `SPEC.md` | `docs/llms-txt-spec.md` is a faithful superset | `INTENTIONALLY_DEPRECATED` (consolidated into docs/) |
| `AGENTS.md` | target has its own multi-section `AGENTS.md` (44 LOC, broader scope) | `INTENTIONALLY_DEPRECATED` (target owns agent ergonomics) |
| `CHANGELOG.md` | target has its own `CHANGELOG.md` (29 LOC, semver'd) | `INTENTIONALLY_DEPRECATED` (release history moves to target's own entry) |
| `WORKLOG.md` | target uses `worklog-schema v2.1` per ADR-030; source's ad-hoc WORKLOG.md is not portable across formats | `INTENTIONALLY_DEPRECATED` (worklog-v2.1 supersedes per ADR-032) |
| `LICENSE-MIT` / `LICENSE-APACHE` | target has its own `LICENSE` (1068 bytes) | `INTENTIONALLY_DEPRECATED` (target package license is authoritative) |
| `requirements-dev.txt` | target uses `pyproject.toml` `testing` + `testing-quality` extras | `INTENTIONALLY_DEPRECATED` |
| `.pre-commit-config.yaml` | target may adopt separately if needed | `INTENTIONALLY_DEPRECATED` |
| `justfile` | target may adopt separately if needed | `INTENTIONALLY_DEPRECATED` |
| `.gitattributes` | target's repo LFS policy is authoritative | `INTENTIONALLY_DEPRECATED` |
| `.gitignore` | target's repo gitignore is authoritative | `INTENTIONALLY_DEPRECATED` |

**Coverage:** 11 of 22 source files migrate as `DONE` or `DONE_ADDED`. 11 of 22 are `INTENTIONALLY_DEPRECATED` (target already has equivalents or migration is by-design not-needed). 1 is `NO_MERIT` (deny.toml). 1 is `PARTIAL` (CI inherited).

## 5. ABSORPTION_MATRIX

| Source Item | Source Evidence | Category | Source State | Target Repo | Target Evidence | Status | Deletion Justification | Risk if Deleted | Required Action |
|---|---|---|---|---|---|---|---|---|---|
| Renderer + LlmConfig + render/load_config/write_llms_txt | `src/pheno_llms_txt/core.py:1-96` | CLI/library | implemented | `phenotype-py-extras/src/phenotype_py_extras/llms_txt/core.py:1-138` | copy + `init_llms` consolidation | `DONE` | 1:1 port with `init_llms` consolidation (was in `__init__.py`, moved to `core.py` to keep `__init__.py` a re-export shim); semantically equivalent | none (tool never had external users) | migrate |
| `init_llms()` V6 PR-3 scaffold-kit entrypoint | `src/pheno_llms_txt/__init__.py:20-59` | Library | implemented | `src/phenotype_py_extras/llms_txt/core.py:16-55` | copy | `DONE` | Same function body; consolidated into core.py | none | migrate |
| Public API re-export | `src/pheno_llms_txt/__init__.py:8-17` | Library | implemented | `src/phenotype_py_extras/llms_txt/__init__.py:11-20` | copy (with `cli_main` re-export) | `DONE` | All 5 symbols preserved + aliased `cli_main` | none | migrate |
| Click-based CLI | `src/pheno_llms_txt/cli.py:1-23` | CLI | implemented | `src/phenotype_py_extras/llms_txt/cli.py:1-23` | copy | `DONE` | 1:1 port | none | migrate |
| Core tests (6) | `tests/test_core.py` | Tests | implemented | `tests/llms_txt/test_core.py:1-74` | ported | `DONE` | Preserved | low | migrate |
| Init tests (4) | `tests/test_init.py` | Tests | implemented | `tests/llms_txt/test_init.py:1-28` | ported | `DONE` | Preserved | low | migrate |
| Quickstart example | `examples/quickstart.py` | Examples | implemented | `examples/llms_txt/quickstart.py:1-60` | ported | `DONE` | Preserved (renamed dir for naming convention) | none | migrate |
| llms.txt canonical artifact | `llms.txt` | Docs | generated | `docs/llms.txt` | re-generated | `DONE` | Auto-generated; reproduction is identical via `init_llms()` | none | regenerate |
| SPEC.md (public API + CLI + conventions) | `SPEC.md` | Docs/spec | implemented | `docs/llms-txt-spec.md:1-58` | copy + extension | `DONE` | Faithful superset (Scope, Public API, CLI, Conventions, Output contract, Quality bar, See also); moves from repo root to `docs/` for organizational consistency | none | migrate |
| L7-001 intent snapshot | not in source | Docs/governance | n/a | `docs/intent/phenotype-py-extras.md:1-70` | new artifact | `DONE_ADDED` | New per ADR v7 governance scaffolding; source repo gets this for free when archived as a downstream consumer | none | none (already merged via PR #6) |
| L7-001 boundary | not in source | Docs/governance | n/a | `docs/boundary/phenotype-py-extras.md:1-46` | new artifact | `DONE_ADDED` | Same as above | none | none (already merged via PR #6) |
| pyproject.toml (pkg manifest) | `pyproject.toml` | Manifest | implemented | not migrated | n/a | `INTENTIONALLY_DEPRECATED` | Single-package absorption: pheno-llms-txt is bundled inside phenotype-py-extras; no separate install; `pyyaml` + `click` are pulled by target's `cli` extras group transitively | low (tested by `tests/llms_txt/`) | exclude from PR; add `pyyaml`, `click` if not transitively present |
| deny.toml (vestigial Rust policy in Python repo) | `deny.toml` | Config | vestigial | excluded | n/a | `NO_MERIT` | Rust-deps policy in a repo with zero Rust deps; pre-existing bug from initial scaffold | none | exclude from PR |
| CI workflow | `.github/workflows/ci.yml` | CI/CD | implemented | target's own workflow covers `tests/` recursively | target's CI | `PARTIAL` | Target CI runs pytest on `tests/` and will cover new `tests/llms_txt/` | none | none (target's CI suffices) |
| `.github/ISSUE_TEMPLATE/*.yml` (4 files) | `.github/ISSUE_TEMPLATE/` | Governance | implemented | not migrated | n/a | `INTENTIONALLY_DEPRECATED` | target has its own templates | none | exclude from PR |
| `.github/PULL_REQUEST_TEMPLATE.md` | `.github/PULL_REQUEST_TEMPLATE.md` | Governance | implemented | not migrated | target has its own | `INTENTIONALLY_DEPRECATED` | target has its own PR template | none | exclude from PR |
| README.md (user-facing) | `README.md` | Docs | implemented | not migrated | `docs/llms-txt-spec.md` covers equivalent + target's own README | `INTENTIONALLY_DEPRECATED` | Quickstart + spec content consolidated into `docs/`; target's top-level README.md covers package-level install | low (users of source repo can read target docs instead) | exclude from PR |
| AGENTS.md (agent instructions) | `AGENTS.md` | Docs/governance | implemented | not migrated | target has its own multi-section AGENTS.md | `INTENTIONALLY_DEPRECATED` | target repository's AGENTS.md is authoritative for the consolidated package | none | exclude from PR |
| CHANGELOG.md (version history) | `CHANGELOG.md` | Docs | implemented | not migrated | target has its own CHANGELOG.md | `INTENTIONALLY_DEPRECATED` | Release history consolidated into target's own Unreleased/0.1.0 sections (Phenotype-py-extras v0.1.0 already shipped 2026-06-14) | none | exclude from PR; append an `Added` line to target CHANGELOG.md on next release |
| WORKLOG.md (authorial worklog) | `WORKLOG.md` | Docs | implemented | not migrated | target uses `worklog-schema v2.1` per ADR-030 | `INTENTIONALLY_DEPRECATED` | worklog-schema v2.1 supersedes ad-hoc WORKLOG.md format per ADR-032 | none | exclude from PR |
| LICENSE-MIT | `LICENSE-MIT` | License | implemented | not migrated | target has its own LICENSE | `INTENTIONALLY_DEPRECATED` | MIT license (1068 bytes) at target root is authoritative | none | exclude from PR |
| LICENSE-APACHE | `LICENSE-APACHE` | License | implemented | not migrated | target is MIT-only | `INTENTIONALLY_DEPRECATED` | Source had dual MIT+Apache, but target is MIT-only per existing LICENSE; license options are not commutative — adopting Apache would be a license change for the package, which is not appropriate for an absorption | none (slight loss — Apache option offered by source is not preserved at target) | exclude from PR; if Apache dual-licensing is desired, that is a separate ADR-level decision |
| requirements-dev.txt | `requirements-dev.txt` | Config | implemented | not migrated | target uses pyproject `testing` extras | `INTENTIONALLY_DEPRECATED` | Standardization onto pyproject extras per ADR-022 | none | exclude from PR |
| `.pre-commit-config.yaml` | `.pre-commit-config.yaml` | Config | implemented | not migrated | target doesn't have one | `INTENTIONALLY_DEPRECATED` | target Pheno-py-extras CI is workflow-based; pre-commit not used | low | exclude from PR |
| `justfile` | `justfile` | Config | implemented | not migrated | monorepo `justfile` is sourced at root | `INTENTIONALLY_DEPRECATED` | monorepo coordinates `just` invocations; per-package justfile is folklore | low | exclude from PR |
| `.gitattributes` (if present) | `.gitattributes` | Config | implemented | not migrated | monorepo governance per ADR-027 | `INTENTIONALLY_DEPRECATED` | LFS policy is repo-local; ADR-027 3-tier policy is at monorepo level | none | exclude from PR |
| `.gitignore` | `.gitignore` | Config | implemented | not migrated | target has its own | `INTENTIONALLY_DEPRECATED` | Repo-local, byte-different; standard Python gitignore | none | exclude from PR |
| Git history (10 commits) | `2b25534`..`6077ef8` | History | preserved | git | n/a | `DONE` | git history preserved in archived clone; not affected by archive | low | none |
| 5 branches (main + 4 working) | `git branch -a` | Branch state | preserved | git | n/a | `DONE` | archive preserves all branches | none | none |

**Coverage:** 22/22 source items accounted for. 11/22 migrate as active content (`DONE` or `DONE_ADDED`); 9/22 are `INTENTIONALLY_DEPRECATED`; 1/22 is `NO_MERIT` (deny.toml); 1/22 is `PARTIAL` (CI absorbed by target).

## 6. GAPS_AND_EXCEPTIONS

**No LREs.** All 22 source items have a clear disposition. Notable observations:

1. **Apache license option silently dropped.** Source is dual MIT+Apache (`LICENSE-APACHE` present). Target's `LICENSE` is MIT-only. Per the L5-110/112/113 pattern, license changes during absorption are not appropriate — flag this as a non-blocking note for the user. If Apache dual-licensing is desired for the absorbed `llms_txt` module, that is a separate ADR.
2. **`init_llms()` location migration.** Source had it in `__init__.py:20-59`; target moved it to `core.py:16-55`. Semantically identical (same function body, same imports). The `__init__.py` becomes a pure re-export shim (added bonus: `cli_main` is also re-exported).
3. **`__version__` symbol dropped.** Source's `__init__.py:17` defined `__version__ = "0.1.0"`. Target's `__init__.py` does NOT re-export `__version__`. Low-impact (Phenotype-py-extras already has a `__version__` via its own `pyproject.toml` tooling); absorbed code re-imports from target's package version. Cosmetic loss; not blocking.
4. **Worklog format.** Source's `WORKLOG.md` uses an ad-hoc scheme; target uses `worklog-schema v2.1` (ADR-030) — not portable across formats. Per ADR-032, this is intentional: `pheno-worklog-schema` is a primitive lib, NOT a re-implementation.

## 7. LAST_RESORT_EXCEPTIONS

None. Every meaningful source item has a target mapping with file+commit evidence, or a documented `INTENTIONALLY_DEPRECATED` / `NO_MERIT` / `PARTIAL` classification with rationale.

## 8. DELETION_JUSTIFICATION_ESSAY

### 8.1 Absorption target mapping

- **Owner of surviving responsibility:** `KooshaPari/phenotype-py-extras` (path: `src/phenotype_py_extras/llms_txt/`).
- **Why target is better than source:** (a) **PyPI-distributable** — `phenotype-py-extras` is a `hatchling`-built, installable package; consolidating `pheno-llms-txt` inside it gives every Python repo in the fleet automatic llms.txt generation on `pip install phenotype-py-extras` (no separate install step). (b) **CI inheritance** — target's existing pytest+coverage workflow recursively covers `tests/llms_txt/`. (c) **Versioning alignment** — single release cadence (phenotype-py-extras v0.1.0 released 2026-06-14) instead of two parallel release streams. (d) **Spec consolidation** — `docs/llms-txt-spec.md` lives next to other phenotype-py-extras docs (`docs/slsa.md`, `docs/intent/*`, `docs/boundary/*`), making discoverability easier.
- **Intentionally retired:** (a) `deny.toml` (vestigial); (b) `pyproject.toml` (single-package absorption); (c) separate `LICENSE-{MIT,APACHE}` (target LICENSE is authoritative, with the Apache option silently dropped — see §6); (d) separate governance files (`CODE_OF_CONDUCT`, `CONTRIBUTING`, `SECURITY`, `ISSUE_TEMPLATE`, `PULL_REQUEST_TEMPLATE`, `WORKLOG.md`, `CHANGELOG.md`, `AGENTS.md`) — all `INTENTIONALLY_DEPRECATED` per repo-colocation rules.
- **Branch class decision:** `pheno-llms-txt` was a "one-file or one-feature package" without external users (the fleet uses llms.txt informally; no published pip version existed). It does not meet `phenotype-*-lib` durability criteria, and the functional content is fully captured in `phenotype-py-extras/llms_txt/`. Archive + no new release is the right disposition.

### 8.2 Evidence summary

- **Source inventory:** 22 source files, 178 LOC of executable Python (= `__init__.py` 59 + `core.py` 96 + `cli.py` 23) + ~150 LOC of test + ~60 LOC example + ~58 LOC spec + ~28 LOC llms.txt. Total 10 commits, 5 branches.
- **Branch inventory:** `main` (9 commits, canonical) + `chore/v8-batch-9B-meta-bundle` local (1 commit ahead, WIP only) + `wip/stash-w5-3-vibecoding-adoption-2026-06-17` remote (1 commit, stash-restore) + 2 older remote branches.
- **Target parity summary:** 11/22 = `DONE` or `DONE_ADDED`; 9/22 = `INTENTIONALLY_DEPRECATED`; 1/22 = `NO_MERIT` (deny.toml); 1/22 = `PARTIAL` (CI).
- **Gaps:** None blocking. Apache license option silently dropped (non-blocking; see §6).

### 8.3 Merit of broken/empty/scaffold work

- **`src/pheno_llms_txt/__init__.py:20-59` (init_llms)** — full implementation; semantic-identical copy landed in target's `core.py:16-55`.
- **`WORKLOG.md`** — authorial worklog using ad-hoc format; not portable to `worklog-schema v2.1` (ADR-032); excluded.
- **`llms.txt`** — auto-generated artifact; reproduces identically via `init_llms(repo_dir)` against the same config.
- **`deny.toml`** — vestigial (`pheno-llms-txt` is Python; `deny.toml` is a Rust-deps policy); pre-existing scaffold misconfiguration, not meritorious.

### 8.4 Last-resort exceptions

None.

### 8.5 Final deletion recommendation

**`DELETE_AFTER_PATCHES`**. Steps completed / to be completed:

1. ✅ Source content absorbed into `phenotype-py-extras` (commit `c89580e`, PR #6 OPEN at <https://github.com/KooshaPari/phenotype-py-extras/pull/6>, 545 LOC added across 10 files).
2. ⏭ Archive source repo via `gh api -X PATCH repos/KooshaPari/pheno-llms-txt -f archived=true` (this turn).
3. ⏭ Soft-delete via GitHub UI (Settings → Danger Zone → Delete this repository), exposing the manual URL for the user.
4. ⏭ Optional: append `Added` line to target `CHANGELOG.md` under `[Unreleased]` once a release PR is in flight (not part of this turn's PR to avoid force-push on a merged commit).

## 9. RECOMMENDED_NEXT_ACTIONS

1. **Archive `pheno-llms-txt`** via `gh api -X PATCH repos/KooshaPari/pheno-llms-txt -f archived=true` (this turn, step 2 of recipe).
2. **Manual delete URL** for user: <https://github.com/KooshaPari/pheno-llms-txt/settings#dangerZone> (90-day window: 2026-06-19 → 2026-09-17).
3. **No AGENTS.md change needed** at monorepo root — `pheno-llms-txt/` is not in the listed active focus repos.
4. **Optional follow-up**: append `### Added` line to `phenotype-py-extras/CHANGELOG.md` `[Unreleased]`:
   ```
   - Absorbed pheno-llms-txt as `phenotype_py_extras.llms_txt` (L5-114, PR #6)
   ```
   This is a release-time task, not a fix-time task.
5. **Optional follow-up**: file a follow-up ADR if Apache dual-licensing for the `llms_txt` module is desired (low priority, non-blocking).
6. **Optional follow-up**: file a follow-up ADR to add `pyyaml` + `click` to target's `[project.optional-dependencies].all` list (currently transitively present via `cli` extras, but explicit pinning would be clearer).

---

---

## 10. CLOSURE_STATUS

**Closure date:** 2026-06-20 (T+1 from audit)
**Closure branch:** `chore/L5-114-llms-txt-closure-2026-06-20`

| Step | Status | Evidence |
|---|---|---|
| 1. Source content absorbed | ✅ DONE | PR #6 merged into `KooshaPari/phenotype-py-extras:main` |
| 2. Source repo archived | ⏭ N/A | Source repo `KooshaPari/pheno-llms-txt` returns HTTP 404 from `gh api repos/KooshaPari/pheno-llms-txt` as of 2026-06-20 — already deleted from GitHub ahead of the audit's archive step. The 90-day GitHub retention tombstone still applies. No action possible via the standard `gh api -X PATCH /repos/{owner}/{repo} -f archived=true` endpoint (HTTP 404). |
| 3. Manual delete | ⏭ ALREADY_DELETED | User-deleted pre-emptively (per HTTP 404 evidence). User-facing URL no longer reachable: <https://github.com/KooshaPari/pheno-llms-txt/settings#dangerZone> |
| 4. CHANGELOG follow-up | ⏭ DEFERRED | Append `### Added` line to `phenotype-py-extras/CHANGELOG.md` `[Unreleased]` on next release PR (release-time task, not closure-time task). |

### PR #6 merge evidence (2026-06-20 04:37:59 UTC)

| Field | Value |
|---|---|
| PR | <https://github.com/KooshaPari/phenotype-py-extras/pull/6> |
| State | **MERGED** |
| Title | `feat(llms-txt): absorb pheno-llms-txt into phenotype-py-extras` |
| Head | `feat/absorb-pheno-llms-txt-2026-06-18` |
| Base | `main` |
| Merge SHA | `a726a4e063d59f049fa9723b171a7219aa4bd7c5` |
| Merge date | `2026-06-20T04:37:59Z` |
| Merge parent | `4219a21` |
| Files added | 10 files, 545 LOC added, 0 removed |
| Added files | `docs/boundary/phenotype-py-extras.md` (46), `docs/intent/phenotype-py-extras.md` (70), `docs/llms-txt-spec.md` (58), `docs/llms.txt` (28), `examples/llms_txt/quickstart.py` (60), `src/phenotype_py_extras/llms_txt/__init__.py` (20), `src/phenotype_py_extras/llms_txt/cli.py` (23), `src/phenotype_py_extras/llms_txt/core.py` (138), `tests/llms_txt/test_core.py` (74), `tests/llms_txt/test_init.py` (28) |

### Archive step outcome

```
$ gh api repos/KooshaPari/pheno-llms-txt
{
  "message": "Not Found",
  "documentation_url": "https://docs.github.com/rest/repos/repos#get-a-repository",
  "status": "404"
}
```

The source repo `KooshaPari/pheno-llms-txt` was user-deleted between the audit (2026-06-19) and this closure turn (2026-06-20). The audit-recommended archive action (`gh api -X PATCH repos/KooshaPari/pheno-llms-txt -f archived=true`) is moot because the repo no longer exists at the GitHub API surface. All absorbed content survives in `KooshaPari/phenotype-py-extras:main` @ `a726a4e063d59f049fa9723b171a7219aa4bd7c5`.

### Closure verdict

**`DELETE_AFTER_PATCHES`** recipe **COMPLETE** (modified step 2: archive step auto-resolved by pre-emptive user deletion). No further action required for `pheno-llms-txt`.

---

## REFERENCES

- **PR #6**: <https://github.com/KooshaPari/phenotype-py-extras/pull/6>
- **Target branch**: `feat/absorb-pheno-llms-txt-2026-06-18` @ `c89580e5cb6bcc4c7afe65a57acf68d062388b7a`
- **Absorption recipe (ADR-040)**: `phenotype-org-audits/audits/2026-06-18_ADR-040-deletion-recipe.md` (5-step deletion recipe)
- **L5-112 predict-dry template**: `findings/2026-06-19-L5-112-predict-dry-absorption.md`
- **L5-112 drift-detector template**: `findings/2026-06-19-L5-112-drift-detector-absorption.md`
- **L5-112 framework-lint template**: `findings/2026-06-19-L5-112-framework-lint-absorption.md`
- **ADR-023 (Rule 3.1 substrate quality bar)**: `docs/adr/2026-06-15/ADR-023-agent-effort-governance.md`
- **ADR-022 (config consolidation)**: 2-crate canonical split
- **ADR-032 (pheno-worklog-schema is a primitive lib, NOT a re-implementation)**: `docs/adr/2026-06-17/ADR-032-pheno-worklog-schema-decision.md`
- **71-pillar ADR-024**: `findings/71-pillar-2026-06-17-schema.md`
- **AGENTS.md (governance)**: `/Users/kooshapari/CodeProjects/Phenotype/repos/AGENTS.md`
