---
name: generate-release-cc
description: Create a new release, bump version up to the .999 patch threshold, generate a complete CHANGELOG (with PR co-authors + every commit since the last tag), and manage Pull Requests
---

# Generate Release Workflow

Bump version, build a **complete CHANGELOG** from every commit since the last tag (with PR back-reference and contributor attribution), commit, open a **PR to main** and wait for user confirmation before tagging, publishing, and deploying.

> **VERSION RULE: Always use PATCH bumps (3.x.y → 3.x.y+1)**
> NEVER use `npm version minor` or `npm version major`.
> Always use: `npm version patch --no-git-tag-version`
> The threshold rule: when `y` reaches 1000, bump to `3.(x+1).0` — e.g. `3.8.999` → `3.9.0`.

> **🔴 INTEGRATION BRANCH RULE**: The `release/vX.Y.Z` branch is the **integration target** for the entire release cycle. Bug fixes and feature implementations land here **via per-issue PRs from short-lived `fix/<ISSUE>-<short>` or `feat/<ISSUE>-<short>` worktrees** (see `/resolve-issues`, `/implement-features`). Contributor PRs from `/review-prs` likewise merge into this branch. The release branch is then merged to `main` via a single release PR at the end of the cycle.

---

## ⚠️ Four-Phase Flow

```
Phase 0 → security audit (npm + CodeQL + Dependabot)
Phase 1 → bump → full quality gate → changelog from commits → commit → push → open PR
  ↕  🛑 STOP: notify user, wait for PR merge
Phase 2 → deploy main to Local VPS for homologation
  ↕  🛑 STOP: notify user, wait for OK
Phase 3 → tag → GitHub release → Docker → npm → Akamai
Phase 4 → monitor CI pipelines and validate artifacts
```

**NEVER push directly to main or create tags before the user confirms the PR.**

---

## Phase 0: Security Verification (MANDATORY)

Before creating the release, ensure the codebase and supply chain are clean.

```bash
# 1. Local dependency audit
npm audit --production --audit-level=high

# 2. GitHub CodeQL alerts (open + high severity)
gh api '/repos/diegosouzapw/OmniRoute/code-scanning/alerts?state=open&severity=high' \
  --jq '.[] | {rule: .rule.id, path: .most_recent_instance.location.path, msg: .most_recent_instance.message.text}' \
  2>/dev/null || echo "(no CodeQL access or no alerts)"

# 3. Dependabot alerts (open + high/critical)
gh api '/repos/diegosouzapw/OmniRoute/dependabot/alerts?state=open' \
  --jq '.[] | select(.security_advisory.severity == "high" or .security_advisory.severity == "critical") | {pkg: .dependency.package.name, sev: .security_advisory.severity, summary: .security_advisory.summary}' \
  2>/dev/null || echo "(no Dependabot access or no alerts)"
```

Fix or justify (with `vulnerability-scanner` skill or dismissal comment per Hard Rule #14) any `high`/`critical` findings before proceeding.

---

## Phase 1: Pre-Merge

### 1. Create or confirm release branch

```bash
# To create a new release branch (MUST always be created from main):
git checkout main
git pull origin main
git checkout -b release/v3.9.0

# If continuing the current cycle, just verify:
git branch --show-current
```

### 2. Determine and sync version

```bash
grep '"version"' package.json
```

> **🔴 BRANCH-VERSION PARITY GATE** — auto-checked before any work:

// turbo

```bash
BRANCH=$(git branch --show-current)
BRANCH_VER=${BRANCH#release/v}
PKG_VER=$(node -p "require('./package.json').version")

if [[ "$BRANCH" != release/v* ]]; then
  echo "❌ Not on a release/v* branch (current: $BRANCH). Aborting."; exit 1
fi

# Allow first-bump scenario (branch declares a not-yet-bumped target)
echo "Branch target: $BRANCH_VER"
echo "package.json:  $PKG_VER"
```

> **⚠️ ATOMIC COMMIT RULE** — bump and feature/fix code MUST land in the same commit so that `git show vX.Y.Z` always contains both.
>
> **CORRECT order**: bump → (or already-staged changes) → single commit.
> **NEVER**: commit features first, then bump in a separate commit.

```bash
npm version patch --no-git-tag-version
```

### 3. Regenerate lock file (REQUIRED after version bump)

```bash
npm install
```

Skipping this causes `@swc/helpers` lock mismatch and CI failures.

### 4. Build CHANGELOG from EVERY commit since the last tag

> **🎯 Goal**: produce a complete CHANGELOG section following the format of PR #2617 — emoji-grouped sections, PR back-reference, and `— thanks @user` attribution. Nothing must slip through.

> **🔴 NO MIXUPS RULE**: do not mix backlog of the previous version. The new section must contain ONLY commits whose merge/landing happened after the previous tag.

#### 4a. Collect raw commit log since last tag

// turbo

```bash
LAST_TAG=$(git describe --tags --abbrev=0)
NEW_VERSION=$(node -p "require('./package.json').version")
TODAY=$(date -u +%F)
echo "Range: $LAST_TAG..HEAD  →  v$NEW_VERSION ($TODAY)"

# Full commit list (oneline)
git log --no-merges "$LAST_TAG..HEAD" --pretty=format:'%h %s' > /tmp/release_commits.txt
wc -l /tmp/release_commits.txt

# Merge commits (preserve PR numbers + authors)
git log --merges "$LAST_TAG..HEAD" --pretty=format:'%h %s%n  author=%an <%ae>' > /tmp/release_merges.txt

# Per-commit detailed list (PR refs, co-authors, body)
git log "$LAST_TAG..HEAD" --pretty=format:'---%n%h | %s%n  author=%an <%ae>%n  body=%b' > /tmp/release_detailed.txt
```

#### 4b. Enrich with PR metadata + co-authors

For each commit referencing a PR (e.g. `(#2617)` or merge commit `Merge pull request #N`), fetch the PR author and any additional contributors so the entry follows the model below.

// turbo

```bash
# Extract all PR numbers referenced in the range
grep -oE '#[0-9]+' /tmp/release_commits.txt | sort -u > /tmp/release_prs.txt
echo "PRs in range:"; cat /tmp/release_prs.txt

# Fetch author + co-author info for every PR
> /tmp/release_pr_meta.json
while read -r PR; do
  N=${PR#\#}
  gh pr view "$N" --repo diegosouzapw/OmniRoute \
    --json number,title,author,mergeCommit,body \
    >> /tmp/release_pr_meta.json 2>/dev/null || echo "(skip $PR — not found)"
  echo "" >> /tmp/release_pr_meta.json
done < /tmp/release_prs.txt
```

#### 4c. Assemble the new CHANGELOG section

Using `/tmp/release_commits.txt` + `/tmp/release_pr_meta.json` + `/tmp/release_detailed.txt`, build a new entry that:

1. **Covers every commit** — read the full list and group by Conventional Commit type. A commit is "covered" iff it appears (or is intentionally rolled-up) in the new section.
2. **Groups using these section headers (model from PR #2617)**:
   - `### ✨ New Features` — `feat(*)`
   - `### 🔧 Bug Fixes` — `fix(*)`
   - `### 📝 Maintenance` — `chore(*)`, `refactor(*)`, `docs(*)`, `test(*)`, `ci(*)`, `build(*)`
   - `### 🔒 Security` — security-flagged commits (only if any)
3. **Entry format**:
   ```
   - **type(scope):** human-friendly description — extra context if useful. ([#PR](https://github.com/diegosouzapw/OmniRoute/pull/PR) — thanks @author / @coauthor1 / @coauthor2)
   ```
   - When **no PR** is referenced (direct commit on release branch): `(thanks @author)`.
   - When the PR closed an external contributor's PR via cherry-pick or re-implementation, attribute BOTH the original author AND the implementer: `thanks @originalAuthor / @diegosouzapw`.
   - **Co-authors** must be extracted from the merge commit body (`Co-Authored-By:` lines that pre-date Hard Rule #16) and from PR participants who supplied commits.
4. **Coverage check** — after drafting, diff the section against `/tmp/release_commits.txt`. Any unlisted commit must either be explicitly added or consolidated under a roll-up bullet (e.g. "various lint and test alignments"). Do NOT silently drop commits.

Place the new section in `CHANGELOG.md` right below `## [Unreleased]`, separated by `---`:

```markdown
## [Unreleased]

---

## [3.9.0] — 2026-05-27

### ✨ New Features

- **feat(scope):** description ([#1234](https://github.com/diegosouzapw/OmniRoute/pull/1234) — thanks @author)
- ...

### 🔧 Bug Fixes

- **fix(scope):** description ([#1235](https://github.com/diegosouzapw/OmniRoute/pull/1235) — thanks @author / @diegosouzapw)
- ...

### 📝 Maintenance

- **chore(scope):** description (thanks @diegosouzapw)
- ...

---

## [3.8.999] — 2026-05-20
```

#### 4d. Coverage assertion

// turbo

```bash
NEW_VERSION=$(node -p "require('./package.json').version")

# Count commits in range
COMMITS=$(wc -l < /tmp/release_commits.txt)

# Count bullets under the new section
BULLETS=$(awk "/^## \\[$NEW_VERSION\\]/{flag=1;next} /^## \\[/{flag=0} flag" CHANGELOG.md | grep -c '^- ')

echo "Commits in range: $COMMITS"
echo "Changelog bullets: $BULLETS"
if [ "$BULLETS" -lt $(( COMMITS / 3 )) ]; then
  echo "⚠️  Bullet count looks low (< commits/3). Re-review /tmp/release_commits.txt for missed entries."
fi
```

> If a commit cannot be matched to a bullet, EITHER add it or explicitly justify the omission in this session before continuing.

### 5. Sync versioned files ⚠️ MANDATORY

> **CI will fail** if `docs/reference/openapi.yaml` version ≠ `package.json` version (`check:docs-sync` enforces this).

// turbo

```bash
VERSION=$(node -p "require('./package.json').version")
sed -i "s/  version: .*/  version: $VERSION/" docs/reference/openapi.yaml
echo "✓ openapi.yaml → $VERSION"

for dir in electron open-sse; do
  if [ -d "$dir" ] && [ -f "$dir/package.json" ]; then
    (cd "$dir" && npm version "$VERSION" --no-git-tag-version --allow-same-version > /dev/null)
    echo "✓ $dir/package.json → $VERSION"
  fi
done

# Re-run install so workspace lockfile picks up the bumps
npm install
```

### 6. Sync README.md and i18n docs

There is **no `/update-docs` slash command** (deprecated in v3.8). Updates must happen manually OR via parallel subagents.

**Recommended automation** — dispatch parallel agents to apply the same diff across the 40 translations (see `superpowers:dispatching-parallel-agents`):

1. Apply the substantive change to `README.md` first (feature table row + "What's new in vX.Y.Z" section).
2. Capture the diff: `git diff README.md > /tmp/readme.patch`.
3. Dispatch 5-10 parallel agents, each handling a slice of the 40 `docs/i18n/*/README.md`, translating the diff into the target language.
4. Update `docs/<AREA>.md` if architecture/counts changed (e.g. `docs/frameworks/MCP-SERVER.md` when MCP tools change).
5. Validate: `npm run check:docs-sync && npm run check:docs-all`.

### 7. Full quality gate (MANDATORY — replaces the old `npm test`)

> **Precedent**: the v3.8.2 cycle landed with 49 broken tests because only `npm test` was running. Lint + typecheck + cycles caught zero of those regressions.

// turbo

```bash
set -e
npm run lint
npm run typecheck:core
npm run check:cycles
npm run check:docs-all
npm test
```

All five must pass before opening the PR. If any fail, fix and re-run.

### 8. Stage, commit, and push (atomic — bump + features + changelog + i18n in ONE commit)

// turbo

```bash
VERSION=$(node -p "require('./package.json').version")
git add -A
git commit -m "chore(release): v$VERSION — $(date -u +%F)"
git push origin "release/v$VERSION"
```

> **NEVER** include `Co-Authored-By:` trailers in the release commit (Hard Rule #16). Co-author attribution lives inside the CHANGELOG entries.

### 9. Open PR to main

// turbo

```bash
VERSION=$(node -p "require('./package.json').version")

# Extract the exact changelog entry for this version
awk "/^## \\[$VERSION\\]/{flag=1; print; next} /^---/{if(flag) {flag=0; exit}} flag" CHANGELOG.md > /tmp/changelog_body.txt

# Append PR-only metadata (test status + reviewer instructions)
{
  echo ""
  echo "---"
  echo ""
  echo "### Quality Gate"
  echo "- lint: pass"
  echo "- typecheck:core: pass"
  echo "- check:cycles: pass"
  echo "- check:docs-all: pass"
  echo "- tests: pass"
  echo ""
  echo "### Coverage of commits since previous tag"
  LAST_TAG=$(git describe --tags --abbrev=0 HEAD~1 2>/dev/null || echo "(no previous tag)")
  COMMITS=$(git rev-list --no-merges "$LAST_TAG..HEAD" | wc -l)
  echo "- Range: \`$LAST_TAG..HEAD\`"
  echo "- Commits inspected: $COMMITS"
  echo ""
  echo "### ⚠️ After merging: run Phase 2 (Local VPS homologation) before tagging."
} >> /tmp/changelog_body.txt

gh pr create \
  --repo diegosouzapw/OmniRoute \
  --base main \
  --head "release/v$VERSION" \
  --title "Release v$VERSION" \
  --body-file /tmp/changelog_body.txt
```

### 10. 🛑 STOP — Notify user & await PR confirmation

Present in the final response and stop. Do not continue to Phase 2 until the user explicitly approves.

Provide:

- PR URL
- Summary of changes (top 5 from CHANGELOG)
- Quality gate results
- List of files changed (`git diff --stat $LAST_TAG..HEAD`)
- Coverage count vs commits-in-range

**DO NOT proceed to Phase 2 until the user confirms the PR looks good and merges it.**

---

## Phase 2: Post-Merge Validation (Local VPS)

> Run only AFTER the user has merged the PR into `main` and all CI jobs pass.

### 11. Deploy `main` to the Local VPS

Delegate to the `deploy-vps-local-cc` skill (single source of truth for the deploy procedure — do NOT duplicate the SCP/SSH commands here):

```
/deploy-vps-local-cc
```

The skill handles: checkout `main`, `npm pack`, scp to `192.168.0.15`, install, pm2 restart, and HTTP probe.

### 12. 🛑 STOP — Notify user & await final OK

Inform the user that `main` is running on `192.168.0.15:20128`. Provide a smoke-test checklist:

- [ ] `GET /` returns 200
- [ ] Dashboard login works (`/dashboard`)
- [ ] `/v1/chat/completions` with default provider returns a stream
- [ ] No critical errors in `pm2 logs omniroute --lines 100`
- [ ] Any release-specific UI features are reachable

Wait for user **OK** before Phase 3.

---

## Phase 3: Official Launch

> Run only AFTER the user gives the final OK from Phase 2.

### 13. Create git tag and GitHub Release

// turbo

```bash
git checkout main
git pull origin main
VERSION=$(node -p "require('./package.json').version")

# Extract release notes section from CHANGELOG
NOTES=$(awk "/^## \\[$VERSION\\]/{flag=1; next} /^---/{if(flag) {flag=0; exit}} flag" CHANGELOG.md | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')
[ -z "$NOTES" ] && NOTES="OmniRoute v$VERSION Release"

git tag -a "v$VERSION" -m "Release v$VERSION"
git push origin "v$VERSION"

gh release create "v$VERSION" \
  --repo diegosouzapw/OmniRoute \
  --title "v$VERSION" \
  --notes "$NOTES" \
  --target main \
|| gh release edit "v$VERSION" \
  --repo diegosouzapw/OmniRoute \
  --title "v$VERSION" \
  --notes "$NOTES"
```

### 14. 🐳 Trigger / verify Docker Hub build

> **CRITICAL**: Docker Hub and npm MUST publish the same version.

```bash
VERSION=$(node -p "require('./package.json').version")
gh run list --repo diegosouzapw/OmniRoute --workflow docker-publish.yml --limit 3
gh run watch --repo diegosouzapw/OmniRoute
```

### 15. Publish to npm (usually CI)

`prepublishOnly` runs `npm run build:cli`. Manual fallback:

```bash
npm publish
npm info omniroute version  # verify
```

### 16. Deploy to Akamai VPS (Production)

Delegate to the `deploy-vps-akamai-cc` skill:

```
/deploy-vps-akamai-cc
```

The skill handles: build, pack, scp to `69.164.221.35`, install, pm2 restart, HTTP probe.

### 17. Rollback playbook (use only if Phase 3 fails after tag push)

If a fatal regression surfaces after the tag is pushed:

```bash
VERSION=$(node -p "require('./package.json').version")
PREV=$(git describe --tags --abbrev=0 "v$VERSION^")

# 1. Mark GitHub release as pre-release (do not delete history)
gh release edit "v$VERSION" --repo diegosouzapw/OmniRoute --prerelease

# 2. Re-deploy previous version to Akamai
git checkout "$PREV" && /deploy-vps-akamai-cc

# 3. Deprecate the broken npm version
npm deprecate "omniroute@$VERSION" "broken release — use $PREV"

# 4. Open follow-up issue and start a new patch cycle from main
```

---

## Phase 4: Release Monitoring & Artifact Validation

> Actively monitor the CI pipelines until all artifacts succeed. If any fail, stop and fix before continuing.

### 18. Monitor CI pipelines

Verify successful completion of:

1. **Docker Hub Publish**
2. **Electron Build**
3. **npm Registry Publish**

```bash
gh run list --repo diegosouzapw/OmniRoute --workflow docker-publish.yml --limit 1
gh run list --repo diegosouzapw/OmniRoute --workflow electron-release.yml --limit 1
gh run watch <RUN_ID>

npm info omniroute version
```

### 19. Handle failures

```bash
gh run view <RUN_ID> --log-failed
# Fix on main, then re-trigger:
VERSION=$(node -p "require('./package.json').version")
gh workflow run <workflow.yml> --repo diegosouzapw/OmniRoute --ref "v$VERSION"
```

### 20. Preserve release branch

Branch is kept for historical purposes. Do not delete.

---

## Notes

- Ensure CHANGELOG, README and `docs/*` are current BEFORE this workflow — run `npm run check:docs-all` first.
- The `prepublishOnly` script runs `npm run build:cli` automatically during `npm publish`.
- After npm publish, verify with `npm info omniroute version`.
- Lock file sync errors are caused by skipping `npm install` after version bump.
- Use `gh auth switch -u diegosouzapw` if `git push` fails with the wrong account.
- Deploy procedures live in dedicated skills (`deploy-vps-local-cc`, `deploy-vps-akamai-cc`, `deploy-vps-both-cc`) — never inline the SCP/SSH commands here, to avoid drift.

## Known CI Pitfalls

| CI failure                                                                | Cause                                                              | Fix                                                                    |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `[docs-sync] FAIL - OpenAPI version differs from package.json`            | Skipped step 5 — `docs/reference/openapi.yaml` version not updated | Run step 5 (`sed -i ...`) and commit                                   |
| `[docs-sync] FAIL - CHANGELOG.md first section must be "## [Unreleased]"` | `## [Unreleased]` missing or not at top of CHANGELOG               | Add `## [Unreleased]\n\n---\n` before the first versioned `## [x.y.z]` |
| Electron Linux `.deb` build fails (`FpmTarget` error)                     | `fpm` Ruby gem not installed on `ubuntu-latest` runner             | Already fixed in `electron-release.yml` (`gem install fpm` step)       |
| Docker Hub `502 error writing layer blob`                                 | Transient Docker Hub network error during ARM64 push               | Re-run the Docker publish workflow; no code change needed              |
| Coverage gate fails (statements/lines < 75% or branches < 70%)            | Production code changed without tests                              | Add tests, re-run `npm run test:coverage` (see CLAUDE.md hard rule #9) |
