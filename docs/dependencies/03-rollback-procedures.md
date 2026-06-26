# Dependency Rollback Procedures (PR-014)

> **Companion**: `00-strategy.md`, `02-upgrade-plan.md`.
> **Goal**: get back to green within **15 minutes** for any bad upgrade,
> including lockfile drift and a hot CVE.

## 1. Decision tree

```
Did the bad upgrade already merge?
├── No (branch open) ────────► § 2 — close the PR + reset branch
└── Yes
    ├── Patch / minor ───────► § 3 — git revert (single commit)
    ├── Major ───────────────► § 4 — git revert + lockfile snapshot
    └── CVE-driven hot fix ──► § 5 — emergency rollback (skip CI)
```

## 2. Bad upgrade caught before merge

The upgrade is still on a branch (no merge commit). Reset the branch and push:

```bash
# 1. Switch to the upgrade branch
git fetch origin
git checkout deps/weekly-2026-W26

# 2. Identify the bad commit (the one that touched package-lock.json)
git log --oneline -- package-lock.json | head -5

# 3. Soft-reset to the parent commit (keeps the change in working tree)
git reset --soft HEAD~1
# OR hard reset (destroys the change):
git reset --hard HEAD~1

# 4. Re-run CI on the now-clean branch
git push --force-with-lease origin deps/weekly-2026-W26

# 5. If the upgrade is unsalvageable, close the PR
gh pr close <PR-number> --comment "Rolling back: <reason>"
```

## 3. Patch / minor rollback (single revert)

```bash
# 1. Identify the merge commit
git log --oneline --merges -- package-lock.json | head -5
# → 8f3a92b7d Merge branch 'deps/weekly-2026-W26'

# 2. Revert it
git revert -m 1 8f3a92b7d --no-edit

# 3. Restore the lockfile to the previous snapshot (defensive — reverts can
#    merge-conflict if the lockfile was edited since)
git show 8f3a92b7d^:package-lock.json > package-lock.json

# 4. Re-install
npm ci

# 5. Smoke test (5 minutes, must all pass)
npm run test:unit:fast
npm run test:vitest
npm run check:licenses
npm run audit:deps

# 6. Push + open the rollback PR
git push origin HEAD:revert/8f3a92b7d
gh pr create \
  --base release/v3.8.37 \
  --head revert/8f3a92b7d \
  --title "revert: deps weekly 2026-W26 (cause: <reason>)" \
  --body "Reverts merge 8f3a92b7d. See <bad-PR-number> for context."
```

## 4. Major rollback (lockfile snapshot)

Major bumps sometimes change `package.json` ranges in ways that the lockfile
revert alone cannot undo. Use the snapshot strategy:

```bash
# 1. Find the last green lockfile snapshot. We commit them to git as
#    `package-lock.json.snapshot-<ISO-date>` whenever a release tags.
git fetch --tags
git tag --list "v3.8.*" --sort=-version:refname | head -5
# → v3.8.36, v3.8.35, v3.8.34, ...

# 2. Restore the lockfile from the most recent good tag
git checkout v3.8.36 -- package-lock.json

# 3. If package.json was also edited, restore it too
git checkout v3.8.36 -- package.json

# 4. Re-install (must use ci, never install)
npm ci

# 5. Verify the restored dep tree
node -e "console.log(require('./package-lock.json').lockfileVersion)"
# → expect 3 (or whatever v3.8.36 used)

# 6. Smoke test (5 minutes, all must pass)
npm run test:unit:fast
npm run test:vitest
npm run check:licenses
npm run audit:deps
npm run build

# 7. Open the rollback PR
git checkout -b revert/major-<pkg>-<date>
git add package-lock.json package.json
git commit -m "revert: <pkg> major bump (cause: <reason>)"
git push origin HEAD
gh pr create \
  --base release/v3.8.37 \
  --head revert/major-<pkg>-<date> \
  --title "revert: <pkg> major bump" \
  --body "Restores v3.8.36 lockfile + package.json. See <bad-PR-number>."
```

### 4.1 Native bindings (SQLite, sharp)

Native modules need an extra step because the rebuilt binary may be cached:

```bash
# 1. Clear the npm cache for the offending package
rm -rf node_modules/better-sqlite3
rm -rf node_modules/.cache  # tsx cache, can hold stale native bindings

# 2. Reinstall fresh
npm ci

# 3. If the binary is wrong ABI, force a rebuild
npm rebuild better-sqlite3 --build-from-source

# 4. Smoke test the open/close round-trip
node --import tsx --test tests/unit/db-adapters/sqlite-roundtrip.test.ts
```

## 5. CVE-driven hot-fix rollback (skip CI)

> **Use only when** a critical CVE is **introduced by** the upgrade and
> blocking production. The release captain must approve in #releases before
> this path runs.

```bash
# 1. Disable CI on the rollback PR (we're racing the CVE)
gh pr create \
  --base release/v3.8.37 \
  --head revert/cve-<id>-<pkg> \
  --title "HOTFIX revert: <pkg> <version> (CVE-YYYY-NNNN)" \
  --body "CVE-YYYY-NNNN introduced by <bad-PR>. Skipping CI." \
  --label "hotfix,security"

# 2. Bump the package to a safe known-good version BEFORE the bad upgrade
npm install <pkg>@<safe-version>
npm ci

# 3. Force-merge after 2 reviewers (security-audit rotation required)
gh pr merge <PR-number> --squash --delete-branch --admin
```

### 5.1 Post-hotfix checklist

- [ ] Security advisory pinned as `severity = critical` in
      `docs/security/postmortems/YYYY-MM-DD-<id>.md`.
- [ ] `.github/dependabot.yml` updated to ignore the bad range.
- [ ] Slack #security-notify pinged.
- [ ] Release captain files follow-up: what guard failed? (e.g. missing
      weekly audit, missing bundle-size ratchet, missing migration codemod).

## 6. SQLite-specific rollback

If a SQLite upgrade corrupts the live DB (e.g. WAL journal mismatch):

```bash
# 1. Stop the server immediately
systemctl stop omniroute  # or pkill -f omniroute

# 2. Snapshot the current (possibly broken) DB for forensics
cp ~/.omniroute/db.sqlite ~/.omniroute/db.sqlite.broken-$(date +%Y%m%d-%H%M%S)

# 3. Restore from the most recent backup
ls -t ~/.omniroute/backups/ | head -1
cp ~/.omniroute/backups/<latest>.sqlite ~/.omniroute/db.sqlite

# 4. Restore the lockfile (see § 4)
git checkout v3.8.36 -- package-lock.json package.json
npm ci

# 5. Restart the server with the restored binary
systemctl start omniroute

# 6. Verify health
curl -fsS http://localhost:20128/api/health | jq .
```

## 7. React-specific rollback

React major bumps often leave dangling refs or stale Suspense boundaries. If
the rollback UI test still fails after the lockfile revert:

```bash
# 1. Revert
git revert -m 1 <merge-sha> --no-edit
npm ci

# 2. Clear the Next.js cache
rm -rf .next .build

# 3. Re-record Vitest snapshots (React 19 snapshots may have changed)
npx vitest run -u --config vitest.mcp.config.ts

# 4. Smoke the live UI in dev mode
npm run dev
# Manual: open http://localhost:20128, click each nav tab, check console

# 5. If still broken, blow away the electron cache
rm -rf ~/.config/omniroute
npm run electron:smoke:packaged
```

## 8. Verification matrix (post-rollback)

| Check                              | Command                                  | Must pass |
|------------------------------------|------------------------------------------|-----------|
| Lockfile integrity                 | `npm ci`                                 | ✓ |
| Type check (core)                  | `npm run typecheck:core`                 | ✓ |
| Type check (strict)                | `npm run typecheck:noimplicit:core`      | ✓ |
| Lint                               | `npm run lint`                           | ✓ |
| Unit tests                         | `npm run test:unit:fast`                 | ✓ |
| Vitest (UI)                        | `npm run test:vitest`                    | ✓ |
| License gate                       | `npm run check:licenses`                 | ✓ |
| Audit (no critical)                | `npm run audit:deps`                     | ✓ |
| Bundle size (within +10% baseline) | `npm run check:bundle-size`              | ✓ |
| Build (release profile)            | `npm run build:release`                  | ✓ |
| Pack artifact                      | `npm run check:pack-artifact`            | ✓ |
| Health endpoint                    | `curl http://localhost:20128/api/health` | ✓ |

If any row fails, **do not declare victory**. Loop back to § 2.

## 9. Communication

- Tag the rollback PR with `rollback` and (if security) `security`.
- Cross-link the bad PR and the rollback PR (one in each body).
- Post the diffstat and the verification matrix in #releases.
- If the rollback touches a customer, post the customer-facing note (link
  template in `docs/security/COMMUNICATION.md`).

## 10. Change history

| Date       | Version | Change |
| ---------- | ------- | ------ |
| 2026-06-25 | v3.8.37 | Initial rollback procedures (PR-014). |