# TASK-08: README Badges Enhancement

## Priority: 🟡 MEDIUM
## Status: [ ] TODO

## Overview

Add GitHub Stars, CI Status, and Node.js version badges to README.md.
These are the highest-impact badges for open-source credibility and project health visibility.

## Badges to Add

```markdown
[![GitHub Stars](https://img.shields.io/github/stars/diegosouzapw/OmniRoute?style=social)](https://github.com/diegosouzapw/OmniRoute/stargazers)
[![CI](https://img.shields.io/github/actions/workflow/status/diegosouzapw/OmniRoute/ci.yml?label=CI&logo=github-actions&logoColor=white)](https://github.com/diegosouzapw/OmniRoute/actions)
[![Node](https://img.shields.io/node/v/omniroute?color=339933&logo=node.js&logoColor=white&label=node)](https://nodejs.org)
```

## Placement

Insert AFTER the existing WhatsApp badge (line 17 in README.md), before the closing of the badge block.

## Current badge order (lines 13-17):
1. npm version
2. npm downloads (just added)
3. Docker Hub version
4. Docker Pulls (just added)
5. License
6. Website
7. WhatsApp

## New order:
1. npm version
2. npm downloads
3. Docker Hub version
4. Docker Pulls
5. GitHub Stars ← NEW
6. CI Status ← NEW
7. Node version ← NEW
8. License
9. Website
10. WhatsApp

## Verify CI Workflow Name

Before adding CI badge, confirm the correct workflow filename:
```bash
ls .github/workflows/
```
Use the correct filename for `ci.yml` in the badge URL.

## Implementation Steps

1. Check `ls .github/workflows/` for exact CI workflow filename
2. Add 3 badges in correct position in README.md
3. Sync change to all 29 i18n README files (automated)
4. Commit as `docs: add GitHub stars, CI status, and Node version badges`

## Verification Checklist

- [ ] Stars badge shows correct count (live from GitHub)
- [ ] CI badge shows green checkmark (or current CI status)
- [ ] Node badge shows current Node version from package.json
- [ ] All 3 badges clickable with correct links
- [ ] Style consistent with existing badges (default style)
