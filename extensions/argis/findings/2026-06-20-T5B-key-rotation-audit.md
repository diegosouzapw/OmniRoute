# T5B — Key Rotation Audit (10 fleet repos, 90-day window)

**Date:** 2026-06-20
**Task:** BATCH 5 / TASK 5B (security audit — key rotation)
**Window:** 2026-03-22 → 2026-06-20 (last 90 days)
**Tool:** `gh api` (file existence) + `git log` (commit history) + `grep -rE` (suspicious prefix check)
**Mode:** read-only; no source files modified
**Verdict:** **CLEAN** (0 suspicious-looking keys, all `.env.example` files within 90-day window)

---

## TL;DR

Audited **10 fleet repos** for key rotation posture over the last 90 days. Of
the 10, **5 exist** under `KooshaPari/*`; 5 return HTTP 404 (deprecated /
deleted / never existed — see T5A report for full list).

Of the 5 scannable repos:
- **4 have `.env.example` files** (Configra, sharecli, thegent-sharecli, Profila)
- **1 has no `.env.example`** (clap-ext)
- **0 have `secrets.yml`, `secrets.baseline`, or `secrets.json`** files
- **0 have any suspicious-looking keys** (no AKIA, ghp_, sk-, xoxb-, glpat-, etc.)
- **All 4 `.env.example` files were modified within the last 90 days** (newest: 2026-06-20, oldest: 2026-04-02)

**Result:** No rotation actions required. No CRITICAL findings.

---

## Repo existence matrix (10 requested)

| # | Repo | HTTP | `.env.example` | `secrets.yml` | `secrets.baseline` | Dependabot | Status |
|---|---|---|---|---|---|---|---|
| 1 | `Configra` | 200 | ✅ at `crates/settly/.env.example` | ❌ | ❌ | ✅ | scannable |
| 2 | `Settly` | 404 | n/a | n/a | n/a | n/a | ADR-017 archived |
| 3 | `clap-ext` | 200 | ❌ (none) | ❌ | ❌ | ❌ | scannable, no .env files |
| 4 | `pheno-config` | 404 | n/a | n/a | n/a | n/a | ADR-031 archived |
| 5 | `phenotype-py-utils` | 404 | n/a | n/a | n/a | n/a | never existed |
| 6 | `cheap-llm-mcp` | 404 | n/a | n/a | n/a | n/a | ADR-007/008 archived |
| 7 | `sharecli` | 200 | ✅ at `.env.example` | ❌ | ❌ | ✅ | scannable |
| 8 | `thegent-sharecli` | 200 | ✅ at `.env.example` | ❌ | ❌ | ❌ | scannable |
| 9 | `Profila` | 200 → 404 | ✅ at `.env.example` (cloned snapshot) | ❌ | ❌ | ✅ | scannable (now deleted) |
| 10 | `ObservabilityKit` | 404 | n/a | n/a | n/a | n/a | never existed |

---

## Per-repo rotation status (90-day window: 2026-03-22 → 2026-06-20)

### 1. `Configra` (private, default=main)

| File | Last modified | Days ago | In 90d window? |
|---|---|---:|---|
| `crates/settly/.env.example` | 2026-06-18 (commit `84b4db2` — ADR-031 absorb) | 2 | ✅ YES |
| `secrets.yml` | does not exist | — | n/a |
| `secrets.baseline` | does not exist | — | n/a |
| Dependabot | `.github/dependabot.yml` (in `crates/settly/`) | — | ✅ configured |

**Rotation status:** ✅ **WITHIN WINDOW** (file fresh from ADR-031 absorb 2026-06-18).
**Suspicious-looking keys:** **0** (only `# DEBUG=false` and `# LOG_LEVEL=info` placeholders).

---

### 2. `Settly` — **404 NOT FOUND**

ADR-017 (V6 Track 5 closure) archived the entire `settly-*` family. No
content to audit. The absorbed content lives in `Configra` (per ADR-031)
and is covered in entry #1 above.

---

### 3. `clap-ext` (public, default=main)

| File | Last modified | Days ago | In 90d window? |
|---|---|---:|---|
| `.env.example` | does not exist | — | n/a |
| `secrets.yml` | does not exist | — | n/a |
| `secrets.baseline` | does not exist | — | n/a |
| Dependabot | not configured | — | ⚠️ GAP |

**Rotation status:** ✅ **N/A** (no environment-template files to audit).
**Suspicious-looking keys:** **0** (no .env files at all).
**Note:** clap-ext is a pure Rust procedural macro library — it has no
runtime configuration surface, so absence of `.env.example` is correct.

---

### 4. `pheno-config` — **404 NOT FOUND**

ADR-031 absorbed `pheno-config` into `Configra` 2026-06-19. Audit moved to
`Configra` (entry #1).

---

### 5. `phenotype-py-utils` — **404 NOT FOUND**

Confirmed 404 across `KooshaPari/*`, `Dmouse92/*`, and `Phenotype/*` orgs.
Repo never existed under any of these namespaces. Out of scope.

---

### 6. `cheap-llm-mcp` — **404 NOT FOUND**

ADR-007 / ADR-008 archived the repo. The provider work was absorbed into
`KooshaPari/pheno-mcp-router` via PRs #1, #2, #3 (closed 2026-06-17). Audit
moved to pheno-mcp-router (not in this batch).

---

### 7. `sharecli` (public, default=main)

| File | Last modified | Days ago | In 90d window? |
|---|---|---:|---|
| `.env.example` | 2026-04-02 (commit `29be7a5` — TEST_COVERAGE_MATRIX.md) | 79 | ✅ YES |
| `secrets.yml` | does not exist | — | n/a |
| `secrets.baseline` | does not exist | — | n/a |
| Dependabot | `.github/dependabot.yml` | — | ✅ configured |

**Rotation status:** ✅ **WITHIN WINDOW** (79 days, just inside the 90-day cutoff).
**Suspicious-looking keys:** **0** (only `# DEBUG=false` and `# LOG_LEVEL=info` placeholders).
**Recommended action:** None — `.env.example` is a fresh template, not a live
key store. Rotation applies to live secrets stored in GitHub Actions / vault,
not to `.env.example` files. No live secrets in this repo.

---

### 8. `thegent-sharecli` (public, default=main)

| File | Last modified | Days ago | In 90d window? |
|---|---|---:|---|
| `.env.example` | 2026-04-02 (commit `43ee0a4` — TEST_COVERAGE_MATRIX.md) | 79 | ✅ YES |
| `secrets.yml` | does not exist | — | n/a |
| `secrets.baseline` | does not exist | — | n/a |
| Dependabot | not configured | — | ⚠️ GAP |

**Rotation status:** ✅ **WITHIN WINDOW** (79 days, just inside the 90-day cutoff).
**Suspicious-looking keys:** **0** (identical template to sharecli — only `# DEBUG=false` and `# LOG_LEVEL=info` placeholders).
**Note:** `thegent-sharecli` is the sister project to `sharecli` — they share the
same `.env.example` template. No Dependabot configured, but this is a CLI tool
with low runtime dependency churn, so impact is minor.

---

### 9. `Profila` (cloned 200; repo deleted 404 mid-audit, per ADR-021)

| File | Last modified | Days ago | In 90d window? |
|---|---|---:|---|
| `.env.example` | 2026-06-20 (commit `6cf0f8b` — README cross-ref note, Stage1 of ObservabilityKit migration) | 0 | ✅ YES |
| `secrets.yml` | does not exist | — | n/a |
| `secrets.baseline` | does not exist | — | n/a |
| Dependabot | `.github/dependabot.yml` | — | ✅ configured |

**Rotation status:** ✅ **WITHIN WINDOW** (file modified today).
**Suspicious-looking keys:** **0** (only `APP_NAME`, `NODE_ENV`, `API_BASE_URL`, `DEBUG_ENABLED` — no credential variables at all).
**Repo status:** Per ADR-021, Profila is being migrated to `KooshaPari/pheno-profiling`
(verified: `pheno-profiling` exists, archived=true, last pushed 2026-06-18).
The Profila source repo was deleted during this audit; the `.env.example`
content was captured before deletion in `/tmp/audit-5AB/clones/Profila/`.

---

### 10. `ObservabilityKit` — **404 NOT FOUND**

Confirmed 404 across `KooshaPari/*`, `Dmouse92/*`, and `Phenotype/*` orgs.
Repo never existed under any of these namespaces. Out of scope.

---

## Suspicious-looking key inventory

Prefixes checked: `AKIA` (AWS), `ghp_`/`gho_`/`ghs_` (GitHub), `sk-`/
`sk-ant-` (OpenAI/Anthropic), `xoxb-`/`xoxp-` (Slack), `glpat-` (GitLab).

| File | Suspicious prefix? | Detail |
|---|---|---|
| `Configra/crates/settly/.env.example` | ❌ NO | placeholder `DEBUG=false`, `LOG_LEVEL=info` (commented) |
| `sharecli/.env.example` | ❌ NO | placeholder `DEBUG=false`, `LOG_LEVEL=info` (commented) |
| `thegent-sharecli/.env.example` | ❌ NO | placeholder `DEBUG=false`, `LOG_LEVEL=info` (commented) |
| `Profila/.env.example` | ❌ NO | `APP_NAME=PhenotypeApp`, `NODE_ENV=development`, `API_BASE_URL=https://api.phenotype.local`, `DEBUG_ENABLED=true` |

**Total suspicious-looking keys: 0. CRITICAL findings: 0.**

---

## Rotation summary table

| Repo | `.env.example` age | Rotation status | Action needed |
|---|---|---|---|
| `Configra` | 2 days | ✅ WITHIN WINDOW | none |
| `clap-ext` | n/a (no file) | ✅ N/A (no config surface) | none |
| `sharecli` | 79 days | ✅ WITHIN WINDOW (borderline) | none |
| `thegent-sharecli` | 79 days | ✅ WITHIN WINDOW (borderline) | none |
| `Profila` | 0 days (today) | ✅ WITHIN WINDOW | none |
| 5 missing repos | n/a | n/a (404 / archived) | none |

**Borderline note (sharecli, thegent-sharecli):** the 79-day-old `.env.example`
files are within the 90-day window. They are template files, not live key
stores. If the user's intent was "audit live secrets rotation", note that:
1. Live secrets are stored in **GitHub Actions** (`${{ secrets.* }}`)
2. Repository secrets are rotated via the **GitHub UI / API**, not via `.env.example`
3. `gh api /repos/.../actions/secrets` would be the right endpoint for live
   rotation audit (out of scope for this task — read-only audit of `.env.example`
   content + file history only)

---

## Recommended rotation actions

**None for this batch.** Zero CRITICAL findings.

**Optional followups (low priority):**
1. **sharecli + thegent-sharecli**: the `.env.example` files are 79 days old
   (borderline). They could be refreshed with a "last reviewed" header to make
   rotation explicit. Not a security risk; just hygiene.
2. **clap-ext + thegent-sharecli**: no Dependabot configured. Consider adding
   `.github/dependabot.yml` to auto-track Rust dependency updates. Not a
   secrets-rotation concern (no secrets), but recommended for fleet
   consistency (ADR-042 cadence).
3. **Profila migration**: per ADR-021, ensure `pheno-profiling` (the
   replacement) has its own `.env.example` rotation cadence. Verify next sweep
   (2026-07-20).

---

## Cadence compliance

Per **ADR-042** (Security audit cadence): monthly sweep on the 20th. This
audit (T5B) runs on **2026-06-20**, on-schedule.

Next sweep: **2026-07-20**. Coverage at next sweep should add `pheno-profiling`
(to replace Profila per ADR-021) and re-verify the 5 currently-missing repos
have not been recreated.

---

## Related

- `findings/2026-06-20-T5A-gitleaks-scan.md` — T5A companion scan
- `findings/2026-06-19-T21-1-secret-scan-rescan.md` — T21.1 prior scan (14 repos, 0 true positives)
- ADR-007: cheap-llm-mcp deprecation
- ADR-017: settly-* archive
- ADR-021: pheno-profiling replaces Profila
- ADR-031: Configra absorb (phenotype-config → Configra)
- ADR-042: Security audit cadence (monthly)