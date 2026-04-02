---
description: Bump version, auto-generate CHANGELOG from git commits, update all versioned files, and refresh root + docs/ documentation to reflect the current project state
---

# Version Bump Workflow

Automatically bump the project version, generate CHANGELOG entries from git history since the last tag, update every file that references the version, and refresh project documentation to reflect the current state.

> **VERSION RULE: Always use PATCH bumps (3.x.y → 3.x.y+1)**
> NEVER use `npm version minor` or `npm version major`.
> Always use: `npm version patch --no-git-tag-version`
> The threshold rule: when `y` reaches 10, bump to `3.(x+1).0` — e.g. `3.4.10` → `3.5.0`.

---

## Phase 1: Determine Version

### 1. Read current version and last tag

// turbo

```bash
cd /home/diegosouzapw/dev/proxys/9router
CURRENT_VERSION=$(node -p "require('./package.json').version")
LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
CURRENT_BRANCH=$(git branch --show-current)
echo "Current version: $CURRENT_VERSION"
echo "Last tag: $LAST_TAG"
echo "Current branch: $CURRENT_BRANCH"
```

### 2. Calculate new version

Apply the patch bump rule:

- If the current patch number is `9`, the new version is `3.(minor+1).0`
- Otherwise, increment patch: `3.x.y` → `3.x.(y+1)`

If the version was ALREADY bumped (e.g. you are on a release branch and package.json already has the new version), **skip the npm version bump** and use the existing version.

### 3. Bump package.json (if needed)

// turbo

```bash
# Only if version hasn't been bumped yet
npm version patch --no-git-tag-version
```

Or for threshold (y=10):

```bash
# Manual threshold bump
VERSION="3.X.0"  # compute manually
npm version "$VERSION" --no-git-tag-version
```

---

## Phase 2: Generate CHANGELOG from Git History

### 4. Collect commits since last tag

// turbo

```bash
cd /home/diegosouzapw/dev/proxys/9router
LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null)
echo "=== Commits since $LAST_TAG ==="
git log "$LAST_TAG"..HEAD --pretty=format:"%h %s" --no-merges | head -100
echo ""
echo "=== Merge commits ==="
git log "$LAST_TAG"..HEAD --merges --pretty=format:"%h %s" | head -50
```

### 5. Classify commits and generate CHANGELOG section

Analyze each commit message and classify into categories based on the conventional-commit prefix and content:

| Category            | Patterns                                         |
| ------------------- | ------------------------------------------------ |
| ✨ New Features     | `feat:`, `feat(*):`                              |
| 🐛 Bug Fixes        | `fix:`, `fix(*):`                                |
| ⚠️ Breaking Changes | `BREAKING CHANGE`, `!:` suffix                   |
| 🛠️ Maintenance      | `chore:`, `refactor:`, `perf:`, `build:`         |
| 🧪 Tests            | `test:`, `tests:`                                |
| 📝 Documentation    | `docs:`                                          |
| 🔒 Security         | `security:`, CVE references, vulnerability fixes |
| 🌍 i18n             | translation updates, locale changes              |

For each category with entries, create a markdown section with descriptive bullet points. Use the commit messages but rewrite them to be human-readable and descriptive (not raw commit messages).

**If a commit references a PR number** (e.g. `#880`, `PR #885`), include it in the description.

### 6. Update CHANGELOG.md

Replace the `## [Unreleased]` section content with the generated entries, then add the new versioned section:

```markdown
## [Unreleased]

---

## [NEW_VERSION] — YYYY-MM-DD

### ✨ New Features

- **Feature name:** Description (#PR)

### 🐛 Bug Fixes

- **Fix name:** Description (#PR)

### 🛠️ Maintenance

- **Item:** Description

---

## [PREVIOUS_VERSION] — YYYY-MM-DD

...
```

The date must be today's date in `YYYY-MM-DD` format.

---

## Phase 3: Sync Version Across All Files

### 7. Update workspace package.json files and openapi.yaml

// turbo

```bash
cd /home/diegosouzapw/dev/proxys/9router
VERSION=$(node -p "require('./package.json').version")

# Update docs/openapi.yaml version
sed -i "s/  version: .*/  version: $VERSION/" docs/openapi.yaml
echo "✓ docs/openapi.yaml → $VERSION"

# Update workspace packages (open-sse, electron)
for dir in electron open-sse; do
  if [ -d "$dir" ] && [ -f "$dir/package.json" ]; then
    (cd "$dir" && npm version "$VERSION" --no-git-tag-version --allow-same-version > /dev/null)
    echo "✓ $dir/package.json → $VERSION"
  fi
done

echo "✓ All workspace packages synced to $VERSION"
```

### 8. Update llm.txt version references

// turbo

```bash
cd /home/diegosouzapw/dev/proxys/9router
VERSION=$(node -p "require('./package.json').version")
OLD_VERSION_PATTERN='[0-9]\+\.[0-9]\+\.[0-9]\+'

# Update "Current version:" line
sed -i "s/\*\*Current version:\*\* $OLD_VERSION_PATTERN/**Current version:** $VERSION/" llm.txt

# Update "Key Features (vX.Y.Z)" header
sed -i "s/## Key Features (v$OLD_VERSION_PATTERN)/## Key Features (v$VERSION)/" llm.txt

echo "✓ llm.txt → $VERSION"
```

### 9. Regenerate lock file

// turbo

```bash
cd /home/diegosouzapw/dev/proxys/9router
npm install
echo "✓ Lock file regenerated"
```

---

## Phase 4: Update Root Documentation

Based on the CHANGELOG entries generated in Phase 2, review and update these root-level files if relevant changes warrant updates:

### 10. Review and update root documentation files

For each file below, read the current content and determine if the CHANGELOG entries require any updates. Only modify files where substantive changes have occurred:

| File              | When to update                                                                                                              |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `README.md`       | New providers, major features, stats changes (test count, provider count), badges, installation instructions, feature table |
| `AGENTS.md`       | Architecture changes, new modules, new commands, new providers, new services/handlers/executors                             |
| `CONTRIBUTING.md` | Dev workflow changes, new tooling, test infrastructure changes                                                              |
| `SECURITY.md`     | Security fixes, new auth mechanisms, vulnerability disclosures                                                              |
| `llm.txt`         | Provider count changes, new features, architecture changes                                                                  |

**Update rules:**

- **README.md**: Update provider count, test count, feature highlights table, badges if any numbers changed. If a new provider was added, add it to the provider table. If a major feature was added, add it to the features section.
- **AGENTS.md**: If new architecture components (handlers, executors, services, DB modules) were added, update the Architecture section. If new commands were added, update the Build/Test table.
- **SECURITY.md**: Add new vulnerability fixes or security improvements to the relevant section.
- **llm.txt**: Update provider count, feature list, version references.

### 11. Review and update docs/ files (excluding i18n/)

For each file in `docs/` (excluding `docs/i18n/`), review if CHANGELOG changes affect it:

| File                             | When to update                                      |
| -------------------------------- | --------------------------------------------------- |
| `docs/API_REFERENCE.md`          | New API endpoints, changed request/response formats |
| `docs/ARCHITECTURE.md`           | New modules, new services, changed data flow        |
| `docs/CLI-TOOLS.md`              | New CLI tool integrations, config format changes    |
| `docs/FEATURES.md`               | New features, removed features, changed settings    |
| `docs/MCP-SERVER.md`             | New MCP tools, changed tool signatures              |
| `docs/A2A-SERVER.md`             | New A2A skills, protocol changes                    |
| `docs/USER_GUIDE.md`             | UX changes, new dashboard pages, settings changes   |
| `docs/VM_DEPLOYMENT_GUIDE.md`    | Deployment changes, new env vars                    |
| `docs/TROUBLESHOOTING.md`        | New known issues, resolved problems                 |
| `docs/AUTO-COMBO.md`             | Routing changes, new strategies                     |
| `docs/CODEBASE_DOCUMENTATION.md` | New files, architectural changes                    |
| `docs/RELEASE_CHECKLIST.md`      | Process changes                                     |
| `docs/COVERAGE_PLAN.md`          | Test changes                                        |
| `docs/openapi.yaml`              | Already updated in step 7                           |

**Only update files where the CHANGELOG entries directly affect the documented content.** Do NOT update files just to bump a version number — only when the documented behavior, features, or architecture has actually changed.

---

## Phase 5: Verify

### 12. Run lint check

// turbo

```bash
cd /home/diegosouzapw/dev/proxys/9router
npm run lint
```

### 13. Run tests

// turbo

```bash
cd /home/diegosouzapw/dev/proxys/9router
npm test
```

### 14. Verify version sync across all files

// turbo

```bash
cd /home/diegosouzapw/dev/proxys/9router
VERSION=$(node -p "require('./package.json').version")
echo "Expected version: $VERSION"
echo ""

echo "--- package.json ---"
grep '"version"' package.json | head -1

echo "--- open-sse/package.json ---"
grep '"version"' open-sse/package.json | head -1

echo "--- electron/package.json ---"
[ -f electron/package.json ] && grep '"version"' electron/package.json | head -1

echo "--- docs/openapi.yaml ---"
grep "  version:" docs/openapi.yaml | head -1

echo "--- llm.txt ---"
grep "Current version:" llm.txt

echo "--- CHANGELOG.md (first versioned entry) ---"
grep "^## \[" CHANGELOG.md | head -2
```

### 15. 🛑 STOP — Present Summary to User

**STOP** and present a summary to the user including:

- Old version → New version
- CHANGELOG entries generated
- Files modified
- Test results
- Any documentation updates made

**Wait for the user to confirm before committing.**

---

## Phase 6: Commit (only after user approval)

### 16. Stage and commit

// turbo-all

```bash
cd /home/diegosouzapw/dev/proxys/9router
git add -A
VERSION=$(node -p "require('./package.json').version")
git commit -m "chore(release): bump to v$VERSION — changelog, docs, version sync"
```

---

## Notes

- This workflow does **NOT** create tags, releases, or deploy. Use `/generate-release` for the full release cycle after this.
- This workflow does **NOT** update `docs/i18n/` translations. Use `/update-i18n` separately after committing.
- The CHANGELOG generation is based on git commits since the last tag. If there are no new commits, the workflow should inform the user and stop.
- Always verify the generated CHANGELOG entries make sense — raw commit messages may need rewriting for clarity.
- If the version was already bumped (e.g. you're on a `release/vX.Y.Z` branch), skip the `npm version` step and use the existing version.

## Version Touchpoints Checklist

| File                    | Field/Pattern                                               |
| ----------------------- | ----------------------------------------------------------- |
| `package.json`          | `"version": "X.Y.Z"`                                        |
| `open-sse/package.json` | `"version": "X.Y.Z"`                                        |
| `electron/package.json` | `"version": "X.Y.Z"`                                        |
| `docs/openapi.yaml`     | `version: X.Y.Z`                                            |
| `llm.txt`               | `**Current version:** X.Y.Z` and `## Key Features (vX.Y.Z)` |
| `CHANGELOG.md`          | `## [X.Y.Z] — YYYY-MM-DD`                                   |
