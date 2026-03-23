---
description: Create a new release, bump version up to 1.x.10 threshold, update changelog, and manage Pull Requests
---

# Generate Release Workflow

Bump version, finalize CHANGELOG, commit, open a **PR to main** and wait for user confirmation before tagging, publishing, and deploying.

> **VERSION RULE: Always use PATCH bumps (2.x.y → 2.x.y+1)**
> NEVER use `npm version minor` or `npm version major`.
> Always use: `npm version patch --no-git-tag-version`
> The threshold rule: when `y` reaches 10, bump to `2.(x+1).0` — e.g. `2.1.10` → `2.2.0`.

---

## ⚠️ Two-Phase Flow

```
Phase 1 (automated): bump → docs → i18n → commit → push → open PR
  ↕  🛑 STOP: Notify user, wait for PR confirmation
Phase 2 (post-merge): tag → publish → GitHub release → Docker → deploy
```

**NEVER push directly to main or create tags before the user confirms the PR.**

---

## Phase 1: Pre-Merge

### 1. Create release branch

```bash
git checkout -b release/v2.x.y
```

### 2. Determine new version

Check current version in `package.json` and increment the **patch** number only:

```bash
grep '"version"' package.json
```

Version format: `2.x.y` — examples:

- `2.1.2` → `2.1.3` (patch)
- `2.1.9` → `2.1.10` (patch)
- `2.1.10` → `2.2.0` (minor threshold — do manually with `sed`)

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

Replace `[Unreleased]` header with the new version and date.
Keep an empty `## [Unreleased]` section above it.

```markdown
## [Unreleased]

---

## [2.x.y] — YYYY-MM-DD
```

### 5. Update openapi.yaml version ⚠️ MANDATORY

> **CI will fail** if `docs/openapi.yaml` version ≠ `package.json` version (`check:docs-sync` enforces this).

// turbo

```bash
VERSION=$(node -p "require('./package.json').version") && sed -i "s/  version: .*/  version: $VERSION/" docs/openapi.yaml && echo "✓ openapi.yaml → $VERSION"
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

```bash
gh pr create \
  --repo diegosouzapw/OmniRoute \
  --base main \
  --head release/v2.x.y \
  --title "chore(release): v2.x.y — summary" \
  --body "## 🚀 Release v2.x.y

### Changes
...

### Tests
- X/X tests pass

### ⚠️ After merging: run Phase 2 steps to tag, publish, and deploy."
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

### 11. Pull main and create tag

```bash
git checkout main
git pull origin main
git tag -a v2.x.y -m "Release v2.x.y"
```

### 12. Push tag to GitHub

```bash
git push origin --tags
```

### 13. Create GitHub release

```bash
gh release create v2.x.y --title "v2.x.y — summary" --notes "..."
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
cd /home/diegosouzapw/dev/proxys/9router && npm run build:cli && npm pack --ignore-scripts

# Deploy to LOCAL VPS (192.168.0.15)
scp omniroute-*.tgz root@192.168.0.15:/tmp/
ssh root@192.168.0.15 "npm install -g /tmp/omniroute-*.tgz --ignore-scripts && pm2 restart omniroute && pm2 save"

# Deploy to AKAMAI VPS (69.164.221.35)
scp omniroute-*.tgz root@69.164.221.35:/tmp/
ssh root@69.164.221.35 "npm install -g /tmp/omniroute-*.tgz --ignore-scripts && pm2 restart omniroute && pm2 save"

# Verify both
curl -s -o /dev/null -w "LOCAL:  HTTP %{http_code}\n" http://192.168.0.15:20128/
curl -s -o /dev/null -w "AKAMAI: HTTP %{http_code}\n" http://69.164.221.35:20128/
```

### 16. Clean up release branch

```bash
git branch -d release/v2.x.y
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
