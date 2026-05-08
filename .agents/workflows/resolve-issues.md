---
description: Fetch all open GitHub issues, analyze bugs, resolve what's possible, triage the rest, wait for user validation, then commit and release
---

# /resolve-issues — Automated Issue Resolution Workflow

## Overview

This workflow fetches all open issues from the project's GitHub repository, classifies them, analyzes bugs, proposes a resolution plan, waits for user validation, and ONLY THEN implements the fixes, commits, and closes the issues on the current release branch (`release/vX.Y.Z`). It does NOT merge or release automatically — the release branch is later merged via PR to main.

> **BRANCH RULE**: All work MUST happen on the current `release/vX.Y.Z` branch. Never create separate `fix/` branches. If no release branch exists yet, create one first using `/generate-release` Phase 1 steps 1–5.

> **⛔ PR PROHIBITION**: If a fix is associated with a contributor's PR, you MUST merge their PR — NEVER close it and re-implement the fix yourself. See `/review-prs` workflow for the full policy. The `gh pr close` command is FORBIDDEN unless the repository owner explicitly requests it.

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
   - Whether the issue was marked as duplicate by a bot. **WARNING: DO NOT blindly trust bot duplicate labels (e.g., kilo-duplicate). Bots make mistakes. You MUST read the full conversation and do your own independent analysis to determine if it is truly a duplicate or a distinct bug.**
3. **Identify the claimed error** — extract the exact error message, status code, and provider/model involved

#### 5b. Check Information Sufficiency

Verify the issue contains enough to act on:

- [ ] Clear description of the problem
- [ ] Steps to reproduce OR error logs
- [ ] Provider/model/version information
- [ ] Expected vs actual behavior

#### 5c. Determine Issue Disposition

For each bug, classify into one of 5 actions:

| Disposition                  | When to Apply                                                                                                          | Action                                                  |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| **✅ CLOSE — Already Fixed** | Owner responded with fix + no user follow-up, OR community confirmed fix                                               | Close with comment citing which version fixed it        |
| **✅ CLOSE — Duplicate**     | You have independently verified the issue is a duplicate (do NOT rely solely on bot flags) + user provides no new info | Close referencing the original issue                    |
| **✅ CLOSE — Stale**         | We requested logs/info > 7 days ago with no reply                                                                      | Close thanking the user, invite to reopen if needed     |
| **📝 RESPOND — Needs Info**  | Issue is real but missing critical reproduction details                                                                | Comment asking for specifics per `/issue-triage`        |
| **📝 RESPOND — User Config** | Error is caused by unsupported env (Node version, wrong model path, missing API enablement)                            | Comment explaining the user-side fix                    |
| **🔧 FIX — Code Change**     | Root cause is confirmed in the codebase                                                                                | Research, propose solution in report, wait for approval |

#### 5d. For "FIX — Code Change" Issues

Before coding, perform deep source analysis to formulate a plan:

1. **Search the codebase** — `grep_search` for error strings, relevant function names, affected files
2. **Search the web** — for upstream API changes, SDK updates, or breaking changes that explain the bug
3. **Read the full source file** — don't rely on grep snippets; understand the surrounding logic
4. **Verify the root cause** — confirm the bug is reproducible based on the code, not just a user misconfiguration
5. **Formulate a proposed solution** — detail the exact files and lines you will change and how you will solve it.
6. **Create an Implementation Plan file** — write your proposed solution to `_tasks/features-vX.Y.Z/<ISSUE_NUMBER>-<short-description>.plan.md` (e.g. `_tasks/features-v3.7.6/1810-auto-restore-probe-failed-db.plan.md`) where `vX.Y.Z` is the current branch version. The plan should contain an Overview, Pre-Implementation Checklist, and detailed Implementation Steps (Files, Changes).
7. **DO NOT modify the codebase yet** — wait for user approval on your report and plan first.

#### 5e. For "RESPOND" Issues

Post a substantive comment that:

- Acknowledges the specific error they reported
- Explains the likely root cause
- Provides concrete steps to resolve (version upgrade, env var fix, model path correction)
- Asks for follow-up info if needed

**Do NOT post generic template responses.** Every comment should reference the user's specific error messages and environment.

### 6. Generate Report & Wait for Validation

Present a summary report to the user detailing your proposed actions. For any bugs that need fixing, explicitly explain your proposed solution (files to change and logic) and point out that it will be implemented on the release branch (`release/vX.Y.Z`) after approval.

| Issue | Title | Status        | Proposed Action / Version                 |
| ----- | ----- | ------------- | ----------------------------------------- |
| #N    | Title | ✅ Close      | Already fixed / duplicate (explain why)   |
| #N    | Title | 🔧 Propose    | Explanation of the code fix to be applied |
| #N    | Title | 📝 Respond    | Guidance comment to be posted             |
| #N    | Title | ❓ Needs Info | Triage comment to be posted               |
| #N    | Title | ⏭️ Skip       | Feature request / not a bug               |

> **⚠️ IMPORTANT**: Do NOT implement code changes, commit, push, or close issues at this step.
> Wait for the user to review the proposed fixes and respond with **OK** before proceeding.

- If the user says **OK** or approves → Proceed to step 7
- If the user requests changes → Adjust the proposed solution and present the report again
- If the user rejects → Revert any accidental changes and stop

### 7. Implement Fixes, Run Tests & Commit (only after user approval)

After the user validates and gives the OK:

1. **Implement the fixes** — modify the codebase according to the approved plan.
2. **Run tests** — `npm run test:all` (or the specific test file) to ensure 100% pass.
3. **Update CHANGELOG.md** with all new bug fix entries.
4. **Commit** each fix individually on the release branch with message format: `fix: <description> (#<issue_number>)`.
5. **Push** the release branch: `git push origin release/vX.Y.Z`.
6. **Close resolved issues immediately**. For each issue that was marked as Fixed, run:
   `gh issue close <NUMBER> --repo <owner>/<repo> --comment "Thank you for reporting! This issue has been fixed and will be included in the next release (vX.Y.Z)."`
7. Likewise, close `Duplicate` issues referencing the original, close `Needs Info` if stale, and post the required comments.
8. If the project runs automatic releases or needs a PR, proceed to run `/generate-release` workflow Phase 1 steps 7–10 (tests → commit → push → open PR to main → wait for user).

If NO fixes were committed, skip closing and source control steps and just conclude the workflow.
