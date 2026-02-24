---
description: Analyze open feature request issues, implement viable ones on dedicated branches, and respond to authors
---

# /implement-features — Feature Request Implementation Workflow

## Overview

Fetches open feature request issues, analyzes each against the current codebase, implements viable ones on dedicated branches, and responds to authors with results. Does NOT merge to main — leaves branches for author validation.

## Steps

### 1. Identify the Repository

// turbo

- Run: `git -C <project_root> remote get-url origin` to extract owner/repo

### 2. Fetch Open Feature Request Issues

// turbo

- Run: `gh issue list --repo <owner>/<repo> --state open --limit 50 --json number,title,labels,body,comments,createdAt,author`
- Filter for issues that are feature requests (label `enhancement`/`feature`, or body describes new functionality, or previously classified as feature request)
- Sort by oldest first

### 3. Analyze Each Feature Request

For each feature request issue, perform a **two-level analysis**:

#### Level 1 — Viability Assessment

Ask yourself:

- Does this feature align with the project's goals and architecture?
- Is the request technically feasible with the current codebase?
- Does it duplicate existing functionality?
- Would it introduce breaking changes or security risks?
- Is there enough detail to implement it?

**Verdict options:**

1. ✅ **VIABLE** — Makes sense, enough detail to implement → Go to Level 2
2. ❓ **NEEDS MORE INFO** — Good idea but insufficient detail → Post comment asking for specifics
3. ❌ **NOT VIABLE** — Doesn't fit the project or is fundamentally flawed → Post comment explaining why, close issue

#### Level 2 — Implementation (only for VIABLE features)

1. **Research** — Read all related source files to understand the current architecture
2. **Design** — Plan the implementation, filling gaps in the original request
3. **Create branch** — Name format: `feat/issue-<NUMBER>-<short-slug>`
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feat/issue-<NUMBER>-<short-slug>
   ```
4. **Implement** — Build the complete solution following project patterns
5. **Build** — Run `npm run build` to verify compilation
6. **Commit** — Commit with: `feat: <description> (#<NUMBER>)`
7. **Push** — Push the branch: `git push -u origin feat/issue-<NUMBER>-<short-slug>`
8. **Return to main** — `git checkout main`

### 4. Respond to Authors

#### For VIABLE (implemented) features:

// turbo
Post a comment on the issue:

````markdown
## ✅ Feature Implemented!

Hi @<author>! We've analyzed your request and implemented it on a dedicated branch.

**Branch:** `feat/issue-<NUMBER>-<short-slug>`

### What was implemented:

- <bullet list of what was done>

### How to try it:

```bash
git fetch origin
git checkout feat/issue-<NUMBER>-<short-slug>
npm install && npm run dev
```
````

### Next steps:

1. **Test it** — Please verify it works as you expected
2. **Want to improve it?** — You're welcome to contribute! Just:
   ```bash
   git checkout feat/issue-<NUMBER>-<short-slug>
   # Make your improvements
   git add -A && git commit -m "improve: <your changes>"
   git push origin feat/issue-<NUMBER>-<short-slug>
   ```
   Then open a Pull Request from your branch to `main` 🎉
3. **Not quite right?** — Let us know in this issue what needs to change

Looking forward to your feedback! 🚀

```

#### For NEEDS MORE INFO:
// turbo
Post a comment asking for specific missing details needed to implement, e.g.:
- "Could you describe the exact behavior when X happens?"
- "Which API endpoints should be affected?"
- "Should this apply to all providers or only specific ones?"

Add the context of WHY you need each piece of information.

#### For NOT VIABLE:
// turbo
Post a polite comment explaining why the feature doesn't fit at this time:
- If the idea is decent but timing is wrong: "This is an interesting idea, but it doesn't align with our current priorities. Feel free to open a new issue with more details if you'd like us to reconsider."
- If fundamentally flawed: Explain the technical or architectural reasons why it won't work, suggest alternatives if possible.
- Close the issue after posting the comment.

### 5. Summary Report
Present a summary report to the user via `notify_user`:

| Issue | Title | Verdict | Branch / Action |
|---|---|---|---|
| #N | Title | ✅ Implemented | `feat/issue-N-slug` |
| #N | Title | ❓ Needs Info | Comment posted |
| #N | Title | ❌ Not Viable | Closed with explanation |
```
