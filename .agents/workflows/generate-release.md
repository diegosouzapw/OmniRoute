---
description: Create a new release, bump version up to 1.x.10 threshold, update changelog, and manage Pull Requests
---

# Generate Release Workflow

Bump version, finalize CHANGELOG, commit, open a **PR to main** and wait for user confirmation before tagging, publishing, and deploying.

> **VERSION RULE: Always use PATCH bumps (2.x.y → 2.x.y+1)**
> NEVER use `npm version minor` or `npm version major`.
> Always use: `npm version patch --no-git-tag-version`
> The threshold rule: when `y` reaches 10, bump to `2.(x+1).0` — e.g. `2.1.10` → `2.2.0`.

> **🔴 SINGLE BRANCH RULE**: The `release/vX.Y.Z` branch is the **ONLY** development branch for the entire release cycle. ALL work — bug fixes, feature implementations, PR integrations, issue resolutions — MUST be committed directly on this branch. Never create separate `fix/`, `feat/`, or topic branches. When running `/resolve-issues`, `/implement-features`, or `/review-prs`, always work on the current release branch.

---

## ⚠️ Two-Phase Flow

```
Phase 1 (automated): bump → docs → i18n → commit → push → open PR
  ↕  🛑 STOP: Notify user, wait for PR confirmation
Phase 2 (post-merge): tag → publish → GitHub release → Docker → deploy
```

**NEVER push directly to main or create tags before the user confirms the PR.**

---

## Phase 0: Security Verification (MANDATORY)

Before creating the release, you must ensure the codebase and supply chain are secure and free of known vulnerabilities.

1. **Run Local Dependencies Audit:**

   ```bash
   npm audit
   ```

   _Fix any `high` or `critical` vulnerabilities identified._

2. **Check GitHub CodeQL & Dependabot Alerts:**
   Navigate to the repository's **Security** tab on GitHub, or use the project's `vulnerability-scanner` skill to analyze active alerts. Ensure all static analysis findings (e.g., prototype pollution, insecure randomness, ReDoS, shell injections) are addressed and logically committed on a target branch.

---

## Phase 1: Pre-Merge

### 1. Create release branch

```bash
git checkout -b release/v2.x.y
```

### 2. Determine and sync version

Check current version in `package.json`:

```bash
grep '"version"' package.json
```

> **🔴 BRANCH-VERSION PARITY RULE**: The logical version in `package.json` MUST exactly match the release branch name. For example, if you are on `release/v3.7.0`, the version in `package.json` MUST be `3.7.0`.
>
> - If this is the FIRST time generating a release for a new minor/major branch (e.g., bumping from 3.6.9 to 3.7.0), you MUST ensure the version is bumped to match the new branch logic.
> - If you are just bumping a patch on the current branch (e.g., 3.6.9 to 3.6.10), use:
>   `npm version patch --no-git-tag-version`

> **⚠️ ATOMIC COMMIT RULE — Version bump MUST happen before committing feature files.**
>
> **CORRECT order:**
>
> 1. `npm version patch --no-git-tag-version` ← bump first
> 2. implement features / fix bugs
> 3. `git add -A && git commit -m "chore(release): v2.x.y — all changes in ONE commit"`
>
> **OR if features are already staged:**
>
> 1. implement features (do NOT commit yet)
> 2. `npm version patch --no-git-tag-version` ← bump before committing
> 3. `git add -A && git commit -m "chore(release): v2.x.y — all changes in ONE commit"`
>
> **NEVER do this (creates version mismatch in git history):**
>
> - ~~commit features → then bump version → commit package.json separately~~
>
> This ensures that `git show v2.x.y` always contains both code changes and the version bump together.
> The GitHub release tag will point to a commit that includes ALL changes for that version.

### 3. Regenerate lock file (REQUIRED after version bump)

**Mandatory** — skipping causes `@swc/helpers` lock mismatch and CI failures:

```bash
npm install
```

### 4. Finalize CHANGELOG.md

> **🔴 NO MIXUPS RULE**: Ensure you do NOT mix the backlog of the previous version with the new one. The new version section must ONLY contain the features and fixes for the current release.

Replace the `[Unreleased]` header with the new version and date.
Keep an empty `## [Unreleased]` section above it, separated by a horizontal rule (`---`).

```markdown
## [Unreleased]

---

## [3.7.0] — 2026-04-19

### ✨ New Features

- ...

### 🐛 Bug Fixes

- ...

---

## [3.6.9] — 2026-04-19
```

### 5. Update openapi.yaml version ⚠️ MANDATORY

> **CI will fail** if `docs/openapi.yaml` version ≠ `package.json` version (`check:docs-sync` enforces this).

// turbo

```bash
VERSION=$(node -p "require('./package.json').version")
sed -i "s/  version: .*/  version: $VERSION/" docs/openapi.yaml
echo "✓ openapi.yaml → $VERSION"

for dir in electron open-sse; do
  if [ -d "$dir" ] && [ -f "$dir/package.json" ]; then
    (cd "$dir" && npm version "$VERSION" --no-git-tag-version --allow-same-version > /dev/null)
    echo "✓ $dir/package.json → $VERSION"
  fi
done
# Re-run install to assert the workspace lockfile is updated
npm install
```

### 6. Update README.md and i18n docs

Run `/update-docs` workflow steps to:

- Update feature table rows in `README.md`
- Sync changes to all 29 language `docs/i18n/*/README.md` files
- Update `docs/FEATURES.md` if Settings section changed

### 7. Run tests

// turbo

```bash
npm test
```

All tests must pass before creating the PR.

### 8. Stage, commit, and push

// turbo-all

```bash
git add -A
git commit -m "chore(release): v2.x.y — summary of changes"
git push origin release/v2.x.y
```

### 9. Open PR to main

### 9. Open PR to main

// turbo

```bash
VERSION=$(node -p "require('./package.json').version")

# Extract the exact changelog entry for this version from the root CHANGELOG.md
awk "/^## \\[$VERSION\\]/{flag=1; print; next} /^---/{if(flag) {flag=0; exit}} flag" CHANGELOG.md > /tmp/changelog_body.txt

# Append test status and next steps
echo "" >> /tmp/changelog_body.txt
echo "### Tests" >> /tmp/changelog_body.txt
echo "- All tests pass" >> /tmp/changelog_body.txt
echo "" >> /tmp/changelog_body.txt
echo "### ⚠️ After merging: run Phase 2 steps to tag, publish, and deploy." >> /tmp/changelog_body.txt

gh pr create \
  --repo diegosouzapw/OmniRoute \
  --base main \
  --head release/v$VERSION \
  --title "Release v$VERSION" \
  --body-file /tmp/changelog_body.txt
```

### 10. 🛑 STOP — Notify User & Await PR Confirmation

**This is a mandatory stop point.** Use `notify_user` with `BlockedOnUser: true`:

Inform the user:

- PR URL
- Summary of changes
- Test results
- List of files changed

**DO NOT proceed to Phase 2 until the user confirms the PR looks good and merges it.**

---

## Phase 2: Post-Merge (only after user confirms)

> Run these steps only AFTER the user has merged the PR.

### 11. Create Git Tag and GitHub Release (MANDATORY)

// turbo

```bash
git checkout main
git pull origin main
VERSION=$(node -p "require('./package.json').version")

# Extracts the changelog section for this version
NOTES=$(awk '/^## \['"$VERSION"'\]/{flag=1; next} /^## \[[0-9]+/{if(flag) exit} flag' CHANGELOG.md | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')
if [ -z "$NOTES" ]; then NOTES="OmniRoute v$VERSION Release"; fi

git tag -a "v$VERSION" -m "Release v$VERSION"
git push origin --tags
gh release create "v$VERSION" --title "v$VERSION" --notes "$NOTES" --target main
```

### 14. 🐳 Trigger Docker Hub build (MANDATORY — keep npm and Docker in sync)

> **CRITICAL**: Docker Hub and npm MUST always publish the same version.
> The Docker image is built automatically via GitHub Actions when a new tag is pushed.
> After pushing the tag in step 11-12, **verify the workflow runs**:

```bash
# Verify the Docker workflow triggered
gh run list --repo diegosouzapw/OmniRoute --workflow docker-publish.yml --limit 3

# Wait for the Docker build to complete (usually 5–10 min)
gh run watch --repo diegosouzapw/OmniRoute

# After completion, verify on Docker Hub:
# https://hub.docker.com/r/diegosouzapw/omniroute/tags
```

If the Docker build was not triggered automatically, trigger it manually:

```bash
gh workflow run docker-publish.yml --repo diegosouzapw/OmniRoute --ref v2.x.y
```

### 15. Deploy to BOTH VPS environments (MANDATORY)

> Always deploy to **both** environments after every release.
> See `/deploy-vps` workflow for detailed steps.

```bash
# Build and pack locally
cd /home/diegosouzapw/dev/proxys/9router && rm -f omniroute-*.tgz && rm -rf .next/cache app/.next/cache && npm run build:cli && rm -rf app/logs app/coverage app/.git app/.app-build-backup* && npm pack --ignore-scripts

# Deploy to LOCAL VPS (192.168.0.15)
scp omniroute-*.tgz root@192.168.0.15:/tmp/
ssh root@192.168.0.15 "npm install -g /tmp/omniroute-*.tgz --ignore-scripts && cd /usr/lib/node_modules/omniroute/app && npm rebuild better-sqlite3 && pm2 delete omniroute 2>/dev/null; pm2 start /root/.omniroute/ecosystem.config.cjs --update-env && pm2 save && echo '✅ Local done'"

# Deploy to AKAMAI VPS (69.164.221.35)
scp omniroute-*.tgz root@69.164.221.35:/tmp/
ssh root@69.164.221.35 "npm install -g /tmp/omniroute-*.tgz --ignore-scripts && cd /usr/lib/node_modules/omniroute/app && npm rebuild better-sqlite3 && pm2 delete omniroute 2>/dev/null; pm2 start /root/.omniroute/ecosystem.config.cjs --update-env && pm2 save && echo '✅ Akamai done'"

# Verify both
curl -s -o /dev/null -w "LOCAL:  HTTP %{http_code}\n" http://192.168.0.15:20128/
curl -s -o /dev/null -w "AKAMAI: HTTP %{http_code}\n" http://69.164.221.35:20128/
```

### 16. Preserve release branch

```bash
# Branch is kept for historical purposes. Do not delete.
```

---

## Notes

- Always run `/update-docs` BEFORE this workflow (ensures CHANGELOG and README are current)
- The `prepublishOnly` script runs `npm run build:cli` automatically during `npm publish`
- After npm publish, verify with `npm info omniroute version`
- Lock file sync errors are caused by skipping `npm install` after version bump
- Use `gh auth switch -u diegosouzapw` if git push fails with wrong account

## Known CI Pitfalls

| CI failure                                                                | Cause                                                    | Fix                                                                    |
| ------------------------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------- |
| `[docs-sync] FAIL - OpenAPI version differs from package.json`            | Skipped step 5 — `docs/openapi.yaml` version not updated | Run step 5 (`sed -i ...`) and commit                                   |
| `[docs-sync] FAIL - CHANGELOG.md first section must be "## [Unreleased]"` | `## [Unreleased]` missing or not at top of CHANGELOG     | Add `## [Unreleased]\n\n---\n` before the first versioned `## [x.y.z]` |
| Electron Linux `.deb` build fails (`FpmTarget` error)                     | `fpm` Ruby gem not installed on `ubuntu-latest` runner   | Already fixed in `electron-release.yml` (`gem install fpm` step)       |
| Docker Hub `502 error writing layer blob`                                 | Transient Docker Hub network error during ARM64 push     | Re-run the Docker publish workflow; no code change needed              |
