---
name: resolve-issues-ag
description: Fetch all open GitHub issues, analyze bugs, resolve up to 30 per batch via per-issue worktrees + PRs into the release branch, triage the rest, wait for user validation
---

# /resolve-issues — Automated Issue Resolution Workflow

## Overview

This workflow fetches all open issues from the project's GitHub repository, classifies them, analyzes bugs, proposes a resolution plan, waits for user validation, and ONLY THEN implements fixes. The current `release/vX.Y.Z` branch is the integration target — each individual fix is implemented on its own short-lived `fix/<issue>-<short>` branch inside its own git worktree, merged into the release branch via PR, then the worktree and local branch are deleted. The release branch is later merged to `main` via `/generate-release`.

> **BRANCH RULE**: The current `release/vX.Y.Z` branch is the integration target. Each fix MUST live on its own `fix/<ISSUE>-<short>` branch cut from the release branch, inside its own worktree under `.worktrees/`. After the per-issue PR is merged into the release branch, the worktree and local branch are deleted. Never commit fixes directly to the release branch. If no release branch exists yet, create one first using `/generate-release` Phase 1 steps 1–5.

> **⛔ PR PROHIBITION**: If a fix is associated with a contributor's PR, you MUST merge their PR — NEVER close it and re-implement the fix yourself. See `/review-prs` workflow for the full policy. The `gh pr close` command is FORBIDDEN unless the repository owner explicitly requests it.

> **🌐 REPLY LANGUAGE**: All comments posted to issues (close messages, RESPOND comments, PR descriptions visible to the reporter) MUST match the reporter's language. When in doubt, default to **English**. The reporter's language is detected from the issue body and prior comments by that author.

## Steps

### 1. Identify the GitHub Repository

// turbo

- Run: `git -C <project_root> remote get-url origin` to extract the owner/repo
- Parse the owner and repo name from the URL

### 2. Ensure Release Branch Exists

// turbo

Before doing any work, ensure a `release/vX.Y.Z` branch exists. If you are currently on `main`, create one:

```bash
git branch --show-current

# If on main, determine next version and create the release branch
VERSION=$(node -p "require('./package.json').version")
NEXT=$(node -p "const [a,b,c]=('$VERSION').split('.').map(Number); c>=999?a+'.'+(b+1)+'.0':a+'.'+b+'.'+(c+1)")
git checkout -b release/v$NEXT
npm version patch --no-git-tag-version
npm install
```

> Threshold: patches climb to `.999` before rolling. Example: `3.4.999` → `3.5.0`.

If already on a `release/vX.Y.Z` branch, continue working there.

### 3. Fetch All Open Issues (cap 30 per batch)

// turbo-all

**⚠️ CRITICAL**: The JSON output of `gh issue list` can be truncated by the tool, silently hiding issues. Use the two-step approach below.

**Step 3a — Get Issue numbers only** (small output, never truncated):

- Run: `gh issue list --repo <owner>/<repo> --state open --limit 500 --json number --jq '.[].number'`
- Count them and remember the total.

**Step 3b — Fetch full metadata for each Issue** (parallel, validated against 3a):

- For each issue number from step 3a, run:
  `gh issue view <NUMBER> --repo <owner>/<repo> --json number,title,labels,body,comments,createdAt,author,url`
- Batch in parallel (8–12 concurrent calls). After completion, assert `fetched_count == count_from_3a`; if mismatch, retry the missing IDs.
- Sort by oldest first (FIFO).

**Step 3c — Cap at 30 per run**:

- If more than 30 open issues qualify as bugs after step 4, ask the user which subset of up to 30 to handle now. The remainder is deferred to the next run.

### 4. Classify Each Issue

For each issue, determine its type:

- **Bug** — Has `bug` label, or body contains error messages, stack traces, "doesn't work", "broken", "crash", "error"
- **Feature Request** — Has `enhancement`/`feature` label, or body describes new functionality
- **Question** — Has `question` label, or is asking "how to" something
- **Other** — Anything else

Focus ONLY on **Bugs** for resolution. Feature requests and questions are skipped with a note in the final report.

#### 4.5. PR-Linked Check (mandatory)

For every bug, query linked PRs:

```bash
gh issue view <NUMBER> --repo <owner>/<repo> --json closedByPullRequestsReferences,body
```

If the issue is referenced by an **open** contributor PR (or the body links to one), do NOT plan a self-implemented fix. Mark the issue as `🤝 PR-LINKED — redirect to /review-prs` in the report and stop deeper analysis for it. **NEVER close the contributor PR.**

### 5. Deep-Read Each Bug Issue (One-by-One Analysis)

Read each bug issue thoroughly, one at a time. Each issue gets focused attention.

#### 5a. Understand the Problem

1. **Read the entire body** — Description, Steps to Reproduce, Expected/Actual Behavior, Error Logs, Screenshots
2. **Read ALL comments** — bot triage (Kilo, etc.) and owner/community responses. Look for:
   - Someone already responded with a fix
   - Community member confirmed it is resolved
   - Bot duplicate flag. **DO NOT blindly trust bot labels (e.g., `kilo-duplicate`).** Re-verify independently from current source + web research.
3. **Identify the claimed error** — exact error message, status code, provider/model, OS, Node version.

#### 5b. Check Information Sufficiency

Verify the issue contains:

- [ ] Clear description of the problem
- [ ] Steps to reproduce OR error logs
- [ ] Provider/model/version information
- [ ] Expected vs actual behavior

**If ANY item is missing → auto-classify as `📝 RESPOND — Needs Info` and skip 5d.** Do not attempt root-cause analysis on under-specified issues.

#### 5c. Determine Issue Disposition

| Disposition                  | When to Apply                                                                                                          | Action                                                  |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| **✅ CLOSE — Already Fixed** | Owner responded with fix + no user follow-up, OR community confirmed fix                                               | Close with comment citing which version fixed it        |
| **✅ CLOSE — Duplicate**     | You have independently verified the issue is a duplicate (do NOT rely solely on bot flags) + user provides no new info | Close referencing the original issue                    |
| **✅ CLOSE — Stale**         | We requested logs/info > 7 days ago with no reply                                                                      | Close thanking the user, invite to reopen if needed     |
| **📝 RESPOND — Needs Info**  | Issue is real but missing critical reproduction details (also triggered by 5b)                                         | Comment asking for specifics per `/issue-triage`        |
| **📝 RESPOND — User Config** | Error is caused by unsupported env (Node version, wrong model path, missing API enablement)                            | Comment explaining the user-side fix                    |
| **🤝 PR-LINKED**             | An open contributor PR already targets this issue (from step 4.5)                                                      | Redirect to `/review-prs`; do not re-implement          |
| **🔧 FIX — Code Change**     | Root cause is confirmed in the codebase                                                                                | Research, propose solution in report, wait for approval |

#### 5d. For "FIX — Code Change" Issues

Before coding, perform deep source analysis:

1. **Search the codebase** — grep for error strings, function names, affected files
2. **Search the web** — upstream API changes, SDK updates, breaking changes
3. **Read the full source file** — don't rely on grep snippets
4. **Verify the root cause** is in our code, not user misconfiguration
5. **Formulate a proposed solution** — exact files/lines/logic
6. **Create an Implementation Plan file** at `_tasks/fixes-vX.Y.Z/<ISSUE>-<short-description>.plan.md` (`vX.Y.Z` = current release branch version). Create the directory first: `mkdir -p _tasks/fixes-vX.Y.Z`. The plan contains: Overview, Reproduction Steps, Regression Test Outline, Implementation Steps (files/changes), Rollout Notes.
7. **DO NOT modify the codebase yet** — wait for user approval.

#### 5e. For "RESPOND" Issues

Post a substantive comment that:

- Acknowledges the specific error reported
- Explains the likely root cause
- Provides concrete steps (version upgrade, env var fix, model path correction)
- Asks for follow-up info if needed

**No generic templates.** Every comment references the user's specific error and environment, and is written in the reporter's language (English default).

### 6. Generate Report & Wait for Validation

Present a summary report. For FIX bugs, explicitly explain the proposed solution (files to change + logic) and confirm it will land via per-issue worktree → PR → release branch after approval. Include the reporter's detected language per row so the user can verify.

| Issue | Title | Status         | Reply Lang | Proposed Action / Version                  |
| ----- | ----- | -------------- | ---------- | ------------------------------------------ |
| #N    | Title | ✅ Close       | en         | Already fixed / duplicate (explain why)    |
| #N    | Title | 🔧 Propose     | pt-BR      | Code fix plan summary + worktree branch    |
| #N    | Title | 📝 Respond     | en         | Guidance comment to be posted              |
| #N    | Title | ❓ Needs Info  | en         | Triage comment to be posted                |
| #N    | Title | 🤝 PR-Linked   | en         | Redirect to /review-prs (PR #M)            |
| #N    | Title | ⏭️ Skip        | —          | Feature request / not a bug                |

> **⚠️ IMPORTANT**: Do NOT implement code changes, commit, push, or close issues at this step.
> Wait for the user to review the proposed fixes and respond with **OK** before proceeding.

- If the user says **OK** → Proceed to step 7
- If the user requests changes → Adjust and re-present the report
- If the user rejects → Revert any accidental changes and stop

### 7. Implement Fixes via Per-Issue Worktrees + PRs (only after user approval)

For each approved FIX issue (up to 30 per batch), repeat the following sequence. Issues can be processed sequentially or in parallel (one worktree each — never two fixes in the same worktree).

#### 7.1. Spin up an isolated worktree on a fresh fix branch

```bash
ISSUE=<NUMBER>
SHORT=<short-kebab-desc>
RELEASE_BRANCH=$(git -C <project_root> branch --show-current)   # release/vX.Y.Z
WT_DIR=".worktrees/fix-${ISSUE}-${SHORT}"
BRANCH="fix/${ISSUE}-${SHORT}"

git fetch origin "$RELEASE_BRANCH"
git worktree add "$WT_DIR" -b "$BRANCH" "origin/$RELEASE_BRANCH"
cd "$WT_DIR"
```

#### 7.2. Write the regression test first (TDD)

- Author a unit/integration test that reproduces the bug. **It must fail on the unfixed code.** Run it and confirm the failure.
- Hard rule #8: any production change must ship with tests in the same PR. The regression test is non-negotiable.

#### 7.3. Implement the fix

- Apply the approved plan from `_tasks/fixes-vX.Y.Z/<ISSUE>-<short>.plan.md`.
- Keep the diff scoped to this issue. No drive-by refactors.

#### 7.4. Run the test suite

- `npm run test:all` (or the appropriate suite for the touched area; the regression test MUST be included).
- All tests must pass before commit. Also run the relevant `lint` / `typecheck` per CLAUDE.md trust-but-verify checklist.

#### 7.5. Update CHANGELOG.md and commit (single commit, same diff)

- Add the new bug-fix entry under the current `vX.Y.Z` section of CHANGELOG.md.
- CHANGELOG entry + code + test go in **one** commit on the fix branch:

```bash
git add <changed files> CHANGELOG.md
git commit -m "fix: <description> (#${ISSUE})"
```

#### 7.6. Push and open a PR into the release branch

```bash
git push -u origin "$BRANCH"
gh pr create \
  --base "$RELEASE_BRANCH" \
  --head "$BRANCH" \
  --title "fix: <description> (#${ISSUE})" \
  --body "Closes #${ISSUE}\n\n<short summary, plan link, regression test reference>"
```

#### 7.7. Merge the PR into the release branch

- Wait for CI green, then merge with the project's default merge strategy.
- The PR title becomes the release-branch commit.

#### 7.8. Clean up worktree and local branch

```bash
cd <project_root>
git worktree remove "$WT_DIR"
git branch -D "$BRANCH"
```

#### 7.9. Close the issue with a localized comment

Match the reporter's language (English default). Template:

> **EN**: Thanks for reporting! Fixed in `release/vX.Y.Z` (already merged into the active development branch — feel free to pull and test it now). It will ship in the next release (vX.Y.Z).
>
> **pt-BR**: Obrigado pelo report! Corrigido em `release/vX.Y.Z` (já mergeado na branch de desenvolvimento atual — pode dar pull e testar). Vai sair na próxima release (vX.Y.Z).

```bash
gh issue close "$ISSUE" --repo <owner>/<repo> --comment "<localized message above>"
```

#### 7.10. Close non-FIX dispositions

After all FIX issues are merged:

- `Duplicate`: close referencing the original issue (localized).
- `Stale`: close thanking the user and inviting reopen (localized).
- `RESPOND — Needs Info` / `RESPOND — User Config`: post the substantive comment from 5e (localized).
- `PR-LINKED`: leave the issue open; comment redirecting to the contributor PR if not already linked.

#### 7.11. Hand off to release flow (optional)

If a release PR to `main` is desired now, run `/generate-release` Phase 1 steps 7–10 (tests → commit version bump → push → open PR to main → wait for user).

If NO fixes were committed, skip 7.7–7.11 and just conclude the workflow.
