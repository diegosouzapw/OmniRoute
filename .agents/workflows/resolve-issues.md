---
description: Fetch all open GitHub issues, analyze bugs, resolve what's possible, triage the rest, then commit and release
---

# /resolve-issues — Automated Issue Resolution Workflow

## Overview

This workflow fetches all open issues from the project's GitHub repository, classifies them, analyzes bugs, resolves what can be fixed, triages issues with insufficient information, and generates a release with all fixes.

## Steps

### 1. Identify the GitHub Repository

// turbo

- Run: `git -C <project_root> remote get-url origin` to extract the owner/repo
- Parse the owner and repo name from the URL

### 2. Fetch All Open Issues

// turbo

- Run: `gh issue list --repo <owner>/<repo> --state open --limit 100 --json number,title,labels,body,comments,createdAt,author`
- Parse the JSON output to get a list of all open issues
- Sort by oldest first (FIFO)

### 3. Classify Each Issue

For each issue, determine its type:

- **Bug** — Has `bug` label, or body contains error messages, stack traces, "doesn't work", "broken", "crash", "error"
- **Feature Request** — Has `enhancement`/`feature` label, or body describes new functionality
- **Question** — Has `question` label, or is asking "how to" something
- **Other** — Anything else

Focus ONLY on **Bugs** for resolution. Feature requests and questions should be skipped with a note in the final report.

### 4. Analyze Each Bug — For each bug issue:

#### 4a. Check Information Sufficiency

Verify the issue contains enough information to reproduce and fix:

- [ ] Clear description of the problem
- [ ] Steps to reproduce
- [ ] Error messages or logs
- [ ] Expected vs actual behavior

#### 4b. If Information Is INSUFFICIENT

Call the `/issue-triage` workflow (located at `~/.gemini/antigravity/global_workflows/issue-triage.md`):
// turbo

- Post a comment asking for more details using `gh issue comment`
- Add `needs-info` label using `gh issue edit`
- Mark this issue as **DEFERRED** and move to the next one

#### 4c. If Information Is SUFFICIENT

Proceed with resolution:

1. **Research** — Search the codebase for files related to the issue
2. **Root Cause** — Identify the root cause by reading the relevant source files
3. **Implement Fix** — Apply the fix following existing code patterns and conventions
4. **Test** — Build the project and run tests to verify the fix
5. **Commit** — Commit with message format: `fix: <description> (#<issue_number>)`

### 5. Commit All Fixes

After processing all issues:

- Ensure all fixes are committed with proper issue references
- Each fix should be its own commit for clean git history

### 6. Close Resolved Issues

For each successfully fixed issue:
// turbo

- Close with a comment: `gh issue close <NUMBER> --repo <owner>/<repo> --comment "Fixed in <commit_hash>. The fix will be included in the next release."`

### 7. Generate Report

Present a summary report to the user via `notify_user`:

| Issue | Title | Status        | Action                      |
| ----- | ----- | ------------- | --------------------------- |
| #N    | Title | ✅ Fixed      | Commit hash                 |
| #N    | Title | ❓ Needs Info | Triage comment posted       |
| #N    | Title | ⏭️ Skipped    | Feature request / not a bug |

### 8. Update Docs & Release

If any fixes were committed:

1. Run the `/update-docs` workflow (at `~/.gemini/antigravity/global_workflows/update-docs.md`) to update CHANGELOG and README
2. Run the `/generate-release` workflow (at `.agents/workflows/generate-release.md`) to bump version, tag, and publish

If NO fixes were committed, skip this step and just present the report.
