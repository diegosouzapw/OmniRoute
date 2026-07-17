# Pull Request template for pheno-otel
#
# Per AGENTS.md: every PR must fill out this template. Trivial governance
# fixes may use the abbreviated form below.

## Summary

<!-- One-paragraph description of the change. -->

## Related

<!-- Link the issue(s), ADR(s), or worklog entries this PR addresses. -->
- Issue: #
- ADR: docs/adr/<date>/ADR-XXX.md
- Worklog: worklogs/<name>-<date>.md

## Type of change

<!-- Mark with [x] all that apply. -->

- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)
- [ ] Documentation update
- [ ] Governance / config / CI
- [ ] Dependency update

## Changes

<!-- Bullet list of changes, grouped by file or concern. -->

- 
- 
- 

## Testing

<!-- How was this tested? Include test commands and outputs. -->

- [ ] `cargo fmt --all -- --check` passes
- [ ] `cargo clippy --all-targets --all-features -- -D warnings` passes
- [ ] `cargo test --all-features` passes (paste count below)
- [ ] Coverage ≥80% lib (per ADR-040)
- [ ] New tests added (if applicable)

Test output:
```
<paste>
```

## Worklog

<!-- Per ADR-025, every change must include a worklog entry. Use the v2.1
     schema (11 cols including `device:`). Paste the worklog row below. -->

| Date | Task ID | Layer | Action | Files | Notes | Worklog | Author | Device | Result | Commit |
|------|---------|-------|--------|-------|-------|---------|--------|--------|--------|--------|
| 2026-06-20 | L5-XXX | substrate | chore | pheno-otel/AGENTS.md | v11-044 tier-0 hygiene | v2.1 | forge | macbook | ok | <sha> |

## Checklist

- [ ] I have read [AGENTS.md](../AGENTS.md) and [CONTRIBUTING.md](../CONTRIBUTING.md)
- [ ] My commits follow Conventional Commits (`feat:`, `fix:`, etc.)
- [ ] My branch follows the naming convention (`feat|fix|chore|docs/<req-id>-<slug>-<date>`)
- [ ] I have updated [CHANGELOG.md](../CHANGELOG.md) (if user-facing)
- [ ] I have added tests (if new behavior)
- [ ] I have not introduced any new license-incompatible dependencies
- [ ] I have redacted any secrets from logs / examples

## Reviewer notes

<!-- Anything specific you want the reviewer to focus on? -->
