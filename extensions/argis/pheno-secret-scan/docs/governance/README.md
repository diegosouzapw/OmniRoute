# pheno-secret-scan Governance

> Fleet-tier governance policies and procedures for the
> `pheno-secret-scan` crate.

## Scope

This document covers the governance of `pheno-secret-scan` as a
shared infrastructure crate within the pheno-* fleet. It does
not supersede the repository-wide `CODEOWNERS` or
`CONTRIBUTING.md`.

## Ownership

| Area | Owner |
|------|-------|
| Workflow definitions (`.github/workflows/`) | @KooshaPari |
| Pre-commit hooks (`pre-commit-hooks.yaml`) | @KooshaPari |
| Allowlist (`.trufflehog-allowlist.txt`) | @KooshaPari |
| Policy files (`Justfile`, `deny.toml`) | @KooshaPari |

## Review requirements

- **Workflow changes**: require review from at least one platform
  team member.
- **Allowlist additions**: require a comment documenting why the
  finding is mitigated; rotated secrets must include a rotation
  date.
- **Policy changes** (`deny.toml`, `Justfile`): require review
  from the fleet lead.

## Release process

1. Changes merged to `main` are auto-deployed to the monorepo
   root on the next push.
2. Tagged releases (`v0.x.x`) follow semver:
   - Patch: allowlist additions, documentation fixes
   - Minor: new workflow features, hook changes
   - Major: breaking changes to the hook or workflow API

## Incident response

If a verified secret is found and the workflow fails:
1. The commit author is notified via the workflow run.
2. The secret is rotated immediately.
3. The detector ID is added to `.trufflehog-allowlist.txt` with a
   rotation date — **only after** the secret is confirmed rotated
   and the history rewrite is scheduled.
