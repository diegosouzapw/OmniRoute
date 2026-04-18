---
description: Fetch all open GitHub issues, analyze bugs, resolve what's possible, triage the rest, wait for user validation, then commit and release
---

# /resolve-issues — Automated Issue Resolution Workflow

## Overview

This workflow fetches all open issues from the project's GitHub repository, classifies them, analyzes bugs, resolves what can be fixed, and triages issues with insufficient information. **All fixes are committed on the current release branch** (`release/vX.Y.Z`). It does NOT merge or release automatically — the release branch is later merged via PR to main.

> **BRANCH RULE**: All work MUST happen on the current `release/vX.Y.Z` branch. Never create separate `fix/` branches. If no release branch exists yet, create one first using `/generate-release` Phase 1 steps 1–5.

## Steps

### 1. Identify the GitHub Repository

// turbo

- Run: `git -C <project_root> remote get-url origin` to extract the owner/repo
- Parse the owner and repo name from the URL

### 2. Ensure Release Branch Exists

// turbo

Before doing any work, ensure you are on the current release branch:

```bash
# Check current branch
git branch --show-current

# If on main, determine next version and create the release branch
VERSION=$(node -p "require('./package.json').version")
NEXT=$(node -p "const [a,b,c]=('$VERSION').split('.').map(Number); c>=9?a+'.'+(b+1)+'.0':a+'.'+b+'.'+(c+1)")
git checkout -b release/v$NEXT
npm version patch --no-git-tag-version
npm install
```

If already on a `release/vX.Y.Z` branch, continue working there.

### 3. Fetch All Open Issues

// turbo-all

**⚠️ CRITICAL**: The JSON output of `gh issue list` can be truncated by the tool, silently hiding issues. You MUST use the two-step approach below to guarantee **all** issues are fetched.

**Step 3a — Get Issue numbers only** (small output, never truncated):

- Run: `gh issue list --repo <owner>/<repo> --state open --limit 500 --json number --jq '.[].number'`
- This outputs one issue number per line. Count them and confirm total.

**Step 3b — Fetch full metadata for each Issue** (one call per issue):

- For each issue number from step 3a, run:
  `gh issue view <NUMBER> --repo <owner>/<repo> --json number,title,labels,body,comments,createdAt,author`
- You may batch these into parallel calls (up to 4 at a time).
- Sort by oldest first (FIFO).

### 4. Classify Each Issue

For each issue, determine its type:

- **Bug** — Has `bug` label, or body contains error messages, stack traces, "doesn't work", "broken", "crash", "error"
- **Feature Request** — Has `enhancement`/`feature` label, or body describes new functionality
- **Question** — Has `question` label, or is asking "how to" something
- **Other** — Anything else

Focus ONLY on **Bugs** for resolution. Feature requests and questions should be skipped with a note in the final report.

### 5. Deep-Read Each Bug Issue (One-by-One Analysis)

**IMPORTANT**: Read each bug issue thoroughly, one at a time, before moving to the next. This is NOT a batch process — each issue needs focused attention.

#### 5a. Understand the Problem

For each bug issue, perform the full analysis:

1. **Read the entire body** — including Description, Steps to Reproduce, Expected/Actual Behavior, Error Logs, and Screenshots
2. **Read ALL comments** — including bot triage comments (Kilo, etc.) and owner/community responses. Pay attention to:
   - Whether someone already responded with a fix
   - Whether a community member confirmed the issue is resolved
   - Whether the issue was marked as duplicate by a bot
3. **Identify the claimed error** — extract the exact error message, status code, and provider/model involved

#### 5b. Check Information Sufficiency

Verify the issue contains enough to act on:

- [ ] Clear description of the problem
- [ ] Steps to reproduce OR error logs
- [ ] Provider/model/version information
- [ ] Expected vs actual behavior

#### 5c. Determine Issue Disposition

For each bug, classify into one of 5 actions:

| Disposition                  | When to Apply                                                                               | Action                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| **✅ CLOSE — Already Fixed** | Owner responded with fix + no user follow-up, OR community confirmed fix                    | Close with comment citing which version fixed it    |
| **✅ CLOSE — Duplicate**     | Bot flagged >85% similarity + user provides no new info                                     | Close referencing the original issue                |
| **✅ CLOSE — Stale**         | We requested logs/info > 7 days ago with no reply                                           | Close thanking the user, invite to reopen if needed |
| **📝 RESPOND — Needs Info**  | Issue is real but missing critical reproduction details                                     | Comment asking for specifics per `/issue-triage`    |
| **📝 RESPOND — User Config** | Error is caused by unsupported env (Node version, wrong model path, missing API enablement) | Comment explaining the user-side fix                |
| **🔧 FIX — Code Change**     | Root cause is confirmed in the codebase                                                     | Research, implement, test, commit on release branch |

#### 5d. For "FIX — Code Change" Issues

Before coding, perform deep source analysis:

1. **Search the codebase** — `grep_search` for error strings, relevant function names, affected files
2. **Search the web** — for upstream API changes, SDK updates, or breaking changes that explain the bug
3. **Read the full source file** — don't rely on grep snippets; understand the surrounding logic
4. **Verify the root cause** — confirm the bug is reproducible based on the code, not just a user misconfiguration
5. **Implement the fix** — follow existing code patterns and conventions
6. **Run tests** — `node --import tsx/esm --test tests/unit/*.test.mjs` (must pass 100%)
7. **Commit** — `fix: <description> (#<issue_number>)`

#### 5e. For "RESPOND" Issues

Post a substantive comment that:

- Acknowledges the specific error they reported
- Explains the likely root cause
- Provides concrete steps to resolve (version upgrade, env var fix, model path correction)
- Asks for follow-up info if needed

**Do NOT post generic template responses.** Every comment should reference the user's specific error messages and environment.

### 6. Generate Report & Wait for Validation

Present a summary report to the user. For any bugs that have been fixed, you MUST explicitly explain to the user the version that the fix was applied to (e.g., `release/vX.Y.Z`) and point out that it will be included in the next release.

| Issue | Title | Status        | Action / Version                   |
| ----- | ----- | ------------- | ---------------------------------- |
| #N    | Title | ✅ Closed     | Already fixed / duplicate          |
| #N    | Title | 🔧 Fixed      | Code fix applied in release/vX.Y.Z |
| #N    | Title | 📝 Responded  | Guidance comment posted            |
| #N    | Title | ❓ Needs Info | Triage comment posted              |
| #N    | Title | ⏭️ Skipped    | Feature request / not a bug        |

> **⚠️ IMPORTANT**: Do NOT commit, push, or close issues at this step.
> Wait for the user to review the changes and respond with **OK** before proceeding.

- If the user says **OK** or approves → Proceed to step 7
- If the user requests changes → Apply the requested adjustments first, then present the report again
- If the user rejects → Revert the changes and stop

### 7. Commit, Push & Close Issues (only after user approval)

After the user validates and gives the OK to commit:

1. **Update CHANGELOG.md** with all new bug fix entries.
2. **Commit** each fix individually on the release branch with message format: `fix: <description> (#<issue_number>)`.
3. **Push** the release branch: `git push origin release/vX.Y.Z`.
4. **Close resolved issues immediately**. For each issue that was marked as Fixed, run:
   `gh issue close <NUMBER> --repo <owner>/<repo> --comment "Fixed in release/vX.Y.Z. The fix will be included in the next release."`
5. Likewise, close `Duplicate` or `Needs Info` issues as needed with relevant comments.
6. If the project runs automatic releases or needs a PR, proceed to run `/generate-release` workflow Phase 1 steps 7–10 (tests → commit → push → open PR to main → wait for user).

If NO fixes were committed, skip closing and source control steps and just conclude the workflow.
