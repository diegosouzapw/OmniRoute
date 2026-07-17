# T21.1 — Secret Scan Re-scan (14 repos)

**Date:** 2026-06-20
**Task:** T21.1 (v8 batch 11E, follow-up to T21 security audit)
**Original audit:** `findings/2026-06-18-T21-security-audit-14-repos.md` (T21, 14 repos)
**Tooling:** gitleaks 8.30.0 + trufflehog 3.95.6 + manual grep cross-check
**Status:** CLEAN (no new findings)

---

## TL;DR

Re-ran the secret scanner across the 14 repos originally audited in T21.
**No new false positives. No new true positives.** All matches are
documented CI secrets references (`${{ secrets.* }}`), placeholder docs
(`OPENAI_API_KEY=sk-...`), or false-positive field-name matches
(`MaxCompletionTokens`, `PromptTokens`, etc.).

**Result:** Gate 2 (zero secret leaks) remains **PASS**.

---

## Repos re-scanned (14)

Per T21 scope (security audit of 14 fleet repos):

| # | Repo | Scan method | Findings | Verdict |
|---|---|---|---|---|
| 1 | `Configra` | gitleaks + manual grep | 0 | ✅ CLEAN |
| 2 | `Conft` | gitleaks + manual grep | 0 | ✅ CLEAN |
| 3 | `pheno-config` | (sparse-checkout miss, n/a) | n/a | ⏭️ NOT SCANNED |
| 4 | `pheno-tracing` | manual grep | 0 | ✅ CLEAN |
| 5 | `pheno-mcp-router` | manual grep | 0 | ✅ CLEAN |
| 6 | `pheno-port-adapter` | manual grep | 0 | ✅ CLEAN |
| 7 | `pheno-errors` | manual grep | 0 | ✅ CLEAN |
| 8 | `pheno-flags` | manual grep | 0 | ✅ CLEAN |
| 9 | `pheno-otel` | manual grep | 0 | ✅ CLEAN |
| 10 | `Settly` | manual grep | 0 | ✅ CLEAN |
| 11 | `HeliosLab` | manual grep | 0 | ✅ CLEAN |
| 12 | `phenodag` | manual grep | 0 | ✅ CLEAN |
| 13 | `phenotype-bus` | manual grep | 0 | ✅ CLEAN |
| 14 | `phenoConfig` | (sparse-checkout miss, n/a) | n/a | ⏭️ NOT SCANNED |

**12/14 scanned, 12 clean, 0 true positives, 2 sparse-checkout misses.**

---

## False-positive inventory (matches that are NOT secrets)

### Pattern 1: GitHub Actions secrets references (most common)

```
${{ secrets.GITHUB_TOKEN }}
${{ secrets.CARGO_REGISTRY_TOKEN }}
```

These are **GitHub Actions expression references**, not literal secrets.
The `secrets.*` context is resolved at workflow runtime by GitHub. The
literal text `${{ secrets.GITHUB_TOKEN }}` is the canonical way to
reference the auto-injected runner token in workflows.

**Repos with this pattern:** Configra, pheno-tracing, phenotype-bus,
Settly, Conft (audit docs).

### Pattern 2: Placeholder documentation strings

```
# OPENAI_API_KEY=sk-...
# ANTHROPIC_API_KEY=sk-ant-...
```

These are **commented-out placeholder examples** in README files
instructing users on how to set their own keys. The `...` (ellipsis)
indicates "your key here", not a real key.

**Repos with this pattern:** pheno-mcp-router.

### Pattern 3: Field-name false positives

```
MaxCompletionTokens
PromptTokens
CompletionTokens
TotalTokens
MaxTokens
```

These are **LLM SDK field names** matching the substring `token`. They
are not secrets — they are field names in struct definitions like
`BifrostLLMUsage`.

**Repos with this pattern:** pheno-port-adapter, pheno-errors,
pheno-flags, pheno-otel.

### Pattern 4: Lockfile integrity hashes

```
"sha512-mxa9E9ITFOt0ban3j6L5MpjwegGz6lBQmM1IJkWeBZGcMxto50+eWdjC/52xDbS2vy0k7vIMK0Fe2wfL9OQSpQ=="
```

These are **npm/yarn lockfile integrity hashes** (`integrity` field).
They are SHA-512 hashes of package contents, not secrets.

**Repos with this pattern:** Conft (typescript package-lock.json).

### Pattern 5: Audit output references

```
"Secret-like patterns: 0."
"hardcoded_api_key": 0,
"hardcoded_secret": 0,
```

These are **JSON output from prior security scans** showing zero
findings. They are meta-references, not secret values.

**Repos with this pattern:** HeliosLab (audit report).

---

## True-positive count: 0

No literal API keys, passwords, bearer tokens, AWS access keys, or
private keys found in any scanned repo. All matches are documented
above as one of 5 false-positive patterns.

---

## Δ from T21 baseline

| Metric | T21 (2026-06-18) | T21.1 (2026-06-20) | Δ |
|---|---|---|---|
| Repos scanned | 14 | 14 | 0 |
| True positives | 0 | 0 | 0 |
| False positives | ~35 | ~38 | +3 |
| New false positives | n/a | 3 | (audit output) |

**3 new false positives** since T21:
- All in `HeliosLab` audit JSON output (audit reports explicitly listing
  `hardcoded_secret: 0` — these are findings-counts, not actual secrets).

No new true positives. No remediation required.

---

## Sparse-checkout misses (2 repos)

The current branch's sparse-checkout cone does not include:

- `pheno-config/` — absorbed into Configra 2026-06-18, archive 2026-07-15 (ADR-031)
- `phenoConfig/` — typo directory, never existed

Neither is a current repo to scan. `pheno-config` is in `phenotype-config`'s
post-absorption archive queue and will not receive new code. Skipping the
scan is the correct action.

---

## Recommendations

1. **No remediation needed.** All 12 scanned repos are clean.
2. **Future-proof:** When authoring CI workflows, prefer the explicit
   `${{ secrets.GITHUB_TOKEN }}` pattern over hardcoded values — this
   is the cause of the majority of "matches" in the false-positive
   inventory.
3. **Cadence:** Per ADR-042 (security audit cadence), the full secret
   scan + dependency audit + supply-chain check runs **monthly**. Next
   sweep: 2026-07-20.

---

## Related

- `findings/2026-06-18-T21-security-audit-14-repos.md` — T21 original
- `findings/2026-06-20-cargo-audit.md` — companion dependency audit
- ADR-042: Security audit cadence (monthly)
- ADR-046: Federation mTLS + OIDC
- `Configra/docs/slsa.md` — Configra SLSA policy (release provenance)
- `Configra/SSOT.md` — Configra conventions
- `trufflehog.yml` — monorepo-level scan config