---
description: How to respond to GitHub issues with insufficient information
---

# Issue Triage Workflow

Respond to GitHub issues that need more information before they can be investigated.

## Steps

### 1. Identify issues needing triage

```bash
gh issue list --state open --limit 20
```

### 2. Evaluate each issue

Check if the issue has:

- Clear reproduction steps
- Environment details (OS, Node.js version, OmniRoute version)
- Error logs/screenshots
- Expected vs actual behavior

### 3. Respond with triage template

For issues missing information:

```markdown
Thank you for reporting this issue! To help us investigate, please provide:

1. **OmniRoute version**: (`omniroute --version`)
2. **Node.js version**: (`node --version`)
3. **Operating system**: (e.g., Ubuntu 24.04, macOS 15, Windows 11)
4. **Installation method**: (npm, Docker, source)
5. **Steps to reproduce**: (exact commands/actions that trigger the issue)
6. **Error logs**: (paste relevant logs from the console)
7. **Expected behavior**: (what should happen)

This will help us debug and resolve your issue faster. 🙏
```

### 4. Label the issue

Add appropriate labels: `needs-info`, `bug`, `enhancement`, `question`, etc.

```bash
gh issue edit <NUMBER> --add-label "needs-info"
```
