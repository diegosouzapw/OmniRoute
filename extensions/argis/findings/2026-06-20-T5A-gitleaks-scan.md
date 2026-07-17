# T5A — gitleaks Secret Scan (10 fleet repos)

**Date:** 2026-06-20
**Task:** BATCH 5 / TASK 5A (security audit — gitleaks scan)
**Tool:** gitleaks 8.30.0 + manual grep cross-check
**Mode:** read-only (`gh api` + shallow `git clone` + `gitleaks detect --no-git`); no source files modified, no secrets executed
**Verdict:** **CLEAN** (1 false positive, 0 true positives)

---

## TL;DR

Scanned **10 fleet repos** for hardcoded secrets using gitleaks 8.30.0 with
manual regex cross-check. **5 repos exist under KooshaPari/*; 5 return HTTP 404**
(deprecated/deleted/absorbed per ADR-017, ADR-031, ADR-007, ADR-021).

Of the 5 scannable repos, gitleaks reported **1 finding** (Profila) which is a
**documented anti-pattern in AGENTS.md** (`API_KEY = "sk-1234567890" # ❌ Never
do this` — line 1649). Zero true positives. Zero leaked credentials.

**Result:** Gate 2 (zero secret leaks) remains **PASS** for the in-scope fleet.

---

## Repo existence matrix (10 requested)

| # | Repo | Status | HTTP | Reason |
|---|---|---|---|---|
| 1 | `Configra` | EXISTS | 200 | private, default=main |
| 2 | `Settly` | **404** | — | ADR-017 (`settly-*` archive, V6 Track 5 closure) |
| 3 | `clap-ext` | EXISTS | 200 | public, default=main |
| 4 | `pheno-config` | **404** | — | ADR-031 (absorbed into Configra 2026-06-19) |
| 5 | `phenotype-py-utils` | **404** | — | repo never existed under `KooshaPari/*` (404 across all 3 orgs) |
| 6 | `cheap-llm-mcp` | **404** | — | ADR-007 / ADR-008 (archived; provider work absorbed into `pheno-mcp-router`) |
| 7 | `sharecli` | EXISTS | 200 | public, default=main |
| 8 | `thegent-sharecli` | EXISTS | 200 | public, default=main |
| 9 | `Profila` | EXISTS* | 200 → 404 | cloned successfully, then repo was deleted mid-audit (per ADR-021 → `pheno-profiling`); local clone retained |
| 10 | `ObservabilityKit` | **404** | — | repo never existed under `KooshaPari/*` (404 across all 3 orgs) |

**5/10 scannable. 5/10 not-scannable due to deprecation/archive.**

Cross-check: `Dmouse92/Settly`, `Dmouse92/pheno-config`, `Dmouse92/cheap-llm-mcp`,
`Dmouse92/ObservabilityKit`, `Dmouse92/phenotype-py-utils`, `Phenotype/*` — all
also return 404. Confirms none exist as alternative mirrors.

---

## Per-repo scan results

| # | Repo | Files scanned¹ | Bytes scanned | gitleaks findings | True positives | Severity | Verdict |
|---|---|---:|---:|---:|---:|---|---|
| 1 | `Configra` | 89 | 632 KB | **0** | 0 | — | ✅ CLEAN |
| 2 | `Settly` | n/a | n/a | n/a | n/a | n/a | ⏭️ NOT FOUND (ADR-017) |
| 3 | `clap-ext` | 20 | 103 KB | **0** | 0 | — | ✅ CLEAN |
| 4 | `pheno-config` | n/a | n/a | n/a | n/a | n/a | ⏭️ NOT FOUND (ADR-031) |
| 5 | `phenotype-py-utils` | n/a | n/a | n/a | n/a | n/a | ⏭️ NEVER EXISTED |
| 6 | `cheap-llm-mcp` | n/a | n/a | n/a | n/a | n/a | ⏭️ NOT FOUND (ADR-007/008) |
| 7 | `sharecli` | 31 | 148 KB | **0** | 0 | — | ✅ CLEAN |
| 8 | `thegent-sharecli` | 19 | 67 KB | **0** | 0 | — | ✅ CLEAN |
| 9 | `Profila` | 47 | 1.37 MB | **1** | 0 | LOW (FP) | ✅ CLEAN (false positive) |
| 10 | `ObservabilityKit` | n/a | n/a | n/a | n/a | n/a | ⏭️ NEVER EXISTED |
| **TOTAL** | — | **206** | **2.32 MB** | **1** | **0** | — | **CLEAN** |

¹ Files matching the scan profile: `.env*`, `*.toml`, `*.yml`, `*.yaml`,
`*.json`, `*.py`, `*.rs`, `*.ts`, `*.js`, `*.sh` (excluding `target/`,
`node_modules/`, `.git/`, `Cargo.lock`, `package-lock.json`, `yarn.lock`).

---

## False-positive inventory (1 finding — Profila)

### Finding: `Profila/AGENTS.md:1649`

```
RuleID:    generic-api-key
Match:     API_KEY = "sk-1234567890"
Secret:    sk-1234567890
File:      Profila/AGENTS.md:1649
Entropy:   3.70
```

**Verdict:** **FALSE POSITIVE** (intentional anti-pattern documentation).

Context (Profila/AGENTS.md:1639-1650):

```python
from google.cloud import secretmanager

def get_secret(secret_id: str) -> str:
    client = secretmanager.SecretManagerServiceClient()
    name = f"projects/{project_id}/secrets/{secret_id}/versions/latest"
    response = client.access_secret_version(request={"name": name})
    return response.payload.data.decode("UTF-8")

# Bad: Hardcoded secrets
API_KEY = "sk-1234567890"  # ❌ Never do this
```

The line is preceded by `# Bad: Hardcoded secrets` and followed by
`# ❌ Never do this`. The "secret" value `sk-1234567890` is 13 chars (real
OpenAI keys are 48+ chars) and is the canonical example string used across
Phenotype AGENTS.md files to illustrate anti-patterns.

No remediation required. The AGENTS.md is **documenting what NOT to do**, which
is exactly the kind of educational content that triggers gitleaks by design.

---

## Manual grep cross-check

In addition to gitleaks, ran a manual `grep -rE` over the 5 scannable repos
for high-risk patterns: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`,
`GITHUB_TOKEN=`, `ghp_[A-Za-z0-9]{36}`, `sk-[A-Za-z0-9]{32,}`, `BEGIN RSA`,
`BEGIN OPENSSH`, `-----BEGIN PRIVATE`, `PASSWORD=`, `SECRET_KEY=`,
`PRIVATE_KEY=`.

| Repo | Pattern matches | Notes |
|---|---|---|
| `Configra` | 0 | 2 GitHub Actions `${{ secrets.* }}` references in `.github/workflows/` — standard CI expressions, not literal secrets |
| `clap-ext` | 0 | clean |
| `sharecli` | 0 | 2 GitHub Actions `${{ secrets.* }}` references (`CARGO_REGISTRY_TOKEN`, `GITHUB_TOKEN`) — standard CI expressions |
| `thegent-sharecli` | 0 | clean |
| `Profila` | 0 | the 1 gitleaks match is the documented anti-pattern (above) |

Inline-value prefix grep (AKIA, ghp_, gho_, ghs_, sk-, sk-ant-, xoxb-, xoxp-,
glpat-): **0 hits across all 5 repos**.

---

## CI workflow secrets context

Standard GitHub Actions `${{ secrets.* }}` expressions are present in
Configra and sharecli. These are **NOT secrets** — they are expressions
resolved at workflow runtime by GitHub. They are the canonical, recommended
way to access secrets in CI:

```yaml
# sharecli/.github/workflows/release.yml
cargo publish --token ${{ secrets.CARGO_REGISTRY_TOKEN }}

# sharecli/.github/workflows/deploy-docs.yml
with: { github_token: ${{ secrets.GITHUB_TOKEN }}, ... }
```

This is false-positive category #1 from prior scans (T21.1, 2026-06-20).

---

## Out-of-scope notes

- **`pheno-config`**: absorbed into `Configra` per ADR-031 (executed 2026-06-19,
  ahead of 2026-07-15 schedule). The Configra scan covers its absorbed content.
- **`Settly`**: archived per ADR-017 (V6 Track 5 closure). No content to scan.
- **`cheap-llm-mcp`**: archived per ADR-007/ADR-008. Provider work migrated to
  `KooshaPari/pheno-mcp-router` (PRs #1, #2, #3 closed 2026-06-17).
- **`Profila`**: migrated to `KooshaPari/pheno-profiling` per ADR-021. The
  source repo was deleted mid-audit (cloned snapshot retained at
  `/tmp/audit-5AB/clones/Profila/`).
- **`phenotype-py-utils`** / **`ObservabilityKit`**: no record of these repos
  under `KooshaPari/*`, `Dmouse92/*`, or `Phenotype/*`. Confirmed 404 across all
  3 orgs. Possibly never created, possibly under a different name. Out of scan
  scope.

---

## Recommendations

1. **No remediation needed.** Zero true positives across the in-scope fleet.
2. **Profila AGENTS.md**: optional followup — replace `sk-1234567890` with
   `"<your-api-key-here>"` or `"sk-XXXX"` to reduce gitleaks noise. Low priority
   (Profila is being migrated to pheno-profiling per ADR-021).
3. **Cadence:** Per ADR-042 (security audit cadence), the full secret scan +
   dependency audit + supply-chain check runs **monthly**. Next sweep:
   2026-07-20. Consider adding the 5 currently-missing repos to the cadence's
   "scannable set" once they are recreated or replaced.

---

## Methodology

```bash
# 1. Existence check (10 repos)
gh api "repos/KooshaPari/<repo>" --include  # → HTTP 200/404 + default_branch

# 2. Shallow clone (5 scannable repos)
git clone --depth 1 --branch <default_branch> https://github.com/KooshaPari/<repo>.git

# 3. gitleaks scan
gitleaks detect --no-git \
  -s /tmp/audit-5AB/clones/<repo> \
  --report-path /tmp/audit-5AB/reports/<repo>-gitleaks.json \
  --report-format json \
  --exit-code 0 \
  --no-banner

# 4. Manual cross-check (high-risk patterns)
grep -rEn --include='*.env*' --include='*.toml' --include='*.yml' \
  --include='*.yaml' --include='*.json' --include='*.py' --include='*.rs' \
  --include='*.ts' --include='*.js' --include='*.sh' --include='*.md' \
  -E '(AWS_ACCESS_KEY_ID|...|ghp_[A-Za-z0-9]{36}|sk-[A-Za-z0-9]{32,}|...)'

# 5. Inline prefix scan (AKIA, ghp_, sk-, xoxb-, etc.)
grep -rEho '(AKIA[A-Z0-9]{16}|ghp_[A-Za-z0-9]{36}|sk-[A-Za-z0-9]{32,}|...)'
```

Reports saved to `/tmp/audit-5AB/reports/<repo>-gitleaks.json` (5 files).
Local clones at `/tmp/audit-5AB/clones/<repo>/` (5 dirs). Both kept on local
disk for re-verification; nothing pushed or transmitted.

---

## Related

- `findings/2026-06-19-T21-1-secret-scan-rescan.md` — T21.1 prior scan (14 repos, 0 true positives)
- ADR-007: cheap-llm-mcp deprecation
- ADR-008: dispatch-mcp as sole MCP server
- ADR-017: settly-* archive
- ADR-021: pheno-profiling replaces Profila
- ADR-031: Configra absorb (phenotype-config → Configra)
- ADR-042: Security audit cadence (monthly)
- `trufflehog.yml` — monorepo-level scan config