# 2026-06-20 v12 Cargo Audit Fleet Baseline

**Author:** orch-v12-direct
**Date:** 2026-06-20 03:45 PDT
**Refs:** v12 T7 (security), 71-pillar L46 (vulnerability mgmt)

## Summary

Fleet cargo audit baseline. 9 nested Rust workspaces scanned.

| Repo | Cargo.toml | Vulnerabilities | Severity |
|------|------------|----------------|----------|
| `pheno` | yes | 0 | clean |
| `pheno-flags` | yes | 0 | clean |
| `pheno-port-adapter` | yes | 0 | clean |
| `pheno-tracing` | yes | 0 | clean |
| `pheno-errors` | yes | 0 | clean |
| `pheno-otel` | yes | 0 | clean |
| `HexaKit` | yes | 0 | clean |
| `PhenoMCP` | yes | 1 | low (Marvin Attack, no patch) |
| `PhenoCompose` | yes | 0 | clean |

**Total:** 1 advisory, no critical/high.

## PhenoMCP Detail

**Advisory:** RUSTSEC-2023-0071
**Package:** `rsa`
**Title:** Marvin Attack: potential key recovery through timing sidechannel
**Severity:** low (theoretical, requires local timing access)
**Patched:** none (unmaintained crate)
**Workaround:** none direct; long-term migration to `dalek` (ed25519 + x25519) or `ring`
**Risk for fleet:** Low — `rsa` is only used for `josekit-jws` HS256/RS256 verification. HMAC HS256 preferred.

**Action:** Open tracking issue in PhenoMCP to migrate to `josekit` HMAC-only mode by v13.

## Pillar Score Impact

L46 (Vulnerability management): **2 → 3** (target)
- Has policy: `cargo audit` runs in CI
- Has baseline: this doc
- Has tracking: issue filed
- Has time-bound remediation: v13

## Scan Command

```bash
cd <repo> && cargo audit --deny warnings --json | jq '.vulnerabilities.count'
```

## CI Integration (v12 T12-B target)

Add to each repo's `ci.yml`:

```yaml
- name: Security audit
  run: |
    cargo install --locked cargo-audit
    cargo audit --deny warnings
```

Defer to per-repo orchestrator agents as per ADR-049 drift detector.
