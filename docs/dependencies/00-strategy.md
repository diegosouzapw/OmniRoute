# Dependency Upgrade Strategy (PR-014)

> **Status**: Active since v3.8.37.
> **Owner**: kooshapari (release captain).
> **Reviewers**: @diegosouzapw, security-audit rotation.
> **Related**: `docs/dependencies/01-inventory.md`, `02-upgrade-plan.md`,
> `03-rollback-procedures.md`, `.github/dependabot.yml`, `.github/renovate.json`.

## 1. Goals

1. **Zero silent breakage.** Every dependency bump is reviewed, tested, and merged via PR.
2. **Lockfile-only bumps by default.** Hand-edited `package.json` ranges are an
   exception, not the rule.
3. **Weekly cadence.** Predictable, batched upgrades — no surprise mass-diffs
   during a release.
4. **Fast CVE response.** Critical/High advisories are exempt from the weekly
   cadence and may ship hot-fix PRs any day.
5. **Reproducible builds.** `package-lock.json` is committed, and
   `npm ci` (not `npm install`) is the canonical install path in CI and release.

## 2. Lockfile-only bumps

The preferred workflow:

```bash
# 1. Sync latest metadata (no install, no write)
npm install --package-lock-only

# 2. Resolve and update the lockfile to "wanted" semver ranges
npm update

# 3. Run the test suite
npm run test:unit:fast

# 4. If green, commit package-lock.json only
git add package-lock.json
git commit -m "deps(weekly): weekly lockfile refresh"
```

Hand-editing a version range in `package.json` (e.g. `"react": "^19.2.7"` →
`"react": "^20.0.0"`) is reserved for:

- Major upgrades (see § 6).
- Pinning a security fix that npm refuses to resolve automatically.
- Hot fixes that must land before the next weekly window.

For these, use `npm install --save[-dev] <pkg>@<version>` so npm rewrites both
`package.json` and `package-lock.json` atomically. **Never** edit
`package.json` and run `npm install` separately — the lockfile will drift.

## 3. Weekly cadence

| Day (UTC) | Action                                                                                |
| --------- | ------------------------------------------------------------------------------------- |
| Monday    | Dependabot opens the weekly batch PR (groups: patch, prod-minor, dev-minor).           |
| Tuesday   | Renovate opens its weekend catch-up batch (if Dependabot is disabled or rejected).     |
| Wed–Thu   | Release captain reviews the open batch. Runs `npm run audit:deps`. Triages CVEs.       |
| Friday    | If CI green, the batch PR is merged by 16:00 UTC. Hot fixes may ship any time.        |

`scripts/deps/weekly-upgrade.sh` automates this flow locally; it is also wired
to the cron-style CI job `/.github/workflows/deps-weekly.yml` (future PR).

If a batch PR fails CI, the captain squashes the offending range back into the
previous week's `package-lock.json` snapshot — never force-merge around red.

## 4. Renovate vs Dependabot

We ship **both** configurations because the right answer depends on the repo
governance mode:

### Dependabot (default — `.github/dependabot.yml`)

- Native to GitHub. No third-party app install.
- Configured via YAML in the repo (auditable).
- Strict grouping primitives (`groups:`, `dependency-type:`).
- Slower to pick up new advisories (24–48 h lag from npm advisory publish).
- Limited `automerge` semantics (only via GitHub branch protection + squash).
- **Verdict: default for OmniRoute.** We use the weekly Monday slot.

### Renovate (fallback — `.github/renovate.json`)

- Self-hosted or via the Mend.io app.
- JSON5 config (richer DSL).
- Faster advisory pickup; richer automerge policy (`patch+minor` for
  non-major-bumped deps).
- `prConcurrentLimit: 3` keeps the review queue small.
- Weekly schedule on **weekends** — complements (does not duplicate)
  Dependabot's Monday slot.
- **Verdict: kept as a fallback.** Used if Dependabot is rejected (rate limits,
  noisy advisories, or governance change).

**Rule of thumb:** never enable both at the same cadence. If both are on, the
weekly slot should be Dependabot (Monday) and Renovate should run only on
weekends — the schedules must not overlap.

## 5. Semver policy

| Bump type | Channel               | Acceptance window | Approval |
| --------- | --------------------- | ----------------- | -------- |
| **patch** (x.y.Z+1) | Auto-merge eligible | Same week | 1 reviewer (release captain) |
| **minor** (x.Y+1.0) | Weekly batch | Same week | 1 reviewer + green CI |
| **major** (X+1.0.0) | Dedicated PR per package | 5–10 business days | 2 reviewers + breaking-change checklist + sign-off from @diegosouzapw |

### Pinning

- `^x.y.z` for libraries with stable APIs (React, Next.js minor/patch).
- `~x.y.z` for libraries known to break on minors (rare; only when documented
  in `02-upgrade-plan.md`).
- **Exact** (`x.y.z`, no caret) for:
  - Critical-path native modules (`@huggingface/transformers@3.5.2`).
  - Hard-pinned security-sensitive deps.
  - Test fixtures and snapshot baselines.

A "freeze" list (see `.github/dependabot.yml#ignore`) keeps `@huggingface/transformers`,
`react`/`react-dom` major bumps, and `jscpd` from auto-updating — these are
migrated intentionally, not auto-bumped.

## 6. Breaking-change window

Major bumps get their own window because the blast radius is unknown until the
package is actually consumed.

### 6.1 Window length

| Dependency class                   | Window (business days) | Extra checks |
| ---------------------------------- | ---------------------- | ------------ |
| UI framework (next, react, eslint) | 10                     | Manual smoke + Playwright e2e |
| HTTP / runtime (undici, express)   | 7                      | Load test (k6 PR-006 baseline) |
| DB / storage (sqlite, sql.js)      | 7                      | Migrations + backup/restore drill |
| Logging (pino, pino-pretty)        | 5                      | Log-shape regression test |
| Types / tooling (typescript, vitest, jest) | 5              | `typecheck:core` + green test:unit |
| Everything else                    | 5                      | `npm run check` green |

### 6.2 Required artifacts per major PR

1. `docs/dependencies/02-upgrade-plan.md` entry appended with:
   - Target version + breaking changes (verbatim from upstream release notes).
   - Migration steps (codemods, manual edits, env-var renames).
   - Risk classification (Low/Med/High).
   - Rollback plan (git revert + lockfile snapshot, see
     `03-rollback-procedures.md`).
2. PR body contains the **breaking-change checklist** (template lives in
   `scripts/deps/major-bump.sh`).
3. CI green: `npm run lint`, `npm run test:unit:fast`,
   `npm run test:vitest`, `npm run test:e2e:fast` (subset), and
   `npm run audit:deps`.
4. Two approvals; one must be the package's CODEOWNER.

### 6.3 Hot-fix exception

If a major bump is **forced by a CVE** with `severity = critical`, the captain
may collapse the window to **24 hours** and ship a single-reviewer PR. The PR
description must contain the CVE id, the upstream advisory URL, and the
rollback command (`./scripts/deps/major-bump.sh --rollback <pkg>`).

## 7. Acceptance signals

A weekly batch is **merge-ready** when:

- All `npm run audit:deps` advisories are addressed or filed as exceptions.
- `npm run check:licenses` returns 0 (or the diff is documented in the PR).
- The PR diff shows **only** `package-lock.json` plus, optionally, one or more
  `package.json` range widenings (with justification).
- CI green for `lint`, `test:unit:fast`, `test:vitest`, and `audit:deps`.
- A reviewer has signed off on the auto-generated report (rendered by
  `scripts/deps/audit.sh` and `scripts/deps/outdated.sh`).

## 8. Communication

- Every batch PR auto-posts a summary comment via the `weekly-deps` workflow
  (future). Until that lands, the captain pastes the audit table + outdated
  table from `scripts/deps/weekly-upgrade.sh` into the PR body.
- Major bumps get a heads-up in `#releases` Slack **at PR-open**, not at
  merge.
- Security advisories get a heads-up **the same day** they are published by
  the GitHub Advisory Database.

## 9. Change history

| Date       | Version | Change                                                  |
| ---------- | ------- | ------------------------------------------------------- |
| 2026-06-25 | v3.8.37 | Strategy adopted (PR-014).                              |