---
name: implement-features-cx
description: Analyze open feature request issues, implement viable ones on dedicated branches, and respond to authors
---

# /implement-features — Feature Request Harvest, Research & Implementation Workflow

## Overview

A **5-phase** workflow that systematically harvests feature requests from GitHub issues, creates structured idea files, researches solutions across the internet and Git repositories, presents a consolidated report for user approval, then generates detailed implementation plans and executes them.

## Codex Execution Notes

- Treat `// turbo` / `// turbo-all` as instructions to use `multi_tool_use.parallel` for independent reads, checks, and GitHub calls.
- Approval gates are hard stops. Present the report/plan in the final response and do not move to implementation phases until the user explicitly approves.
- Keep harvest/research bounded enough to produce the approval report quickly; do not start implementation while still in report phases.

**Output directory structure:**

```
_ideia/
├── viable/                  # Features approved for implementation
│   ├── need_details/        # ❓ Good idea but waiting for author clarification (issues stay OPEN)
│   │   └── 1015-warp-terminal-mitm.md
│   ├── 1046-native-playground.md           # ✅ Ready — researched and planned
│   └── 1046-native-playground.requirements.md
├── defer/                   # ⏭️ Good ideas deferred for future cycles (issues CLOSED)
│   └── 1041-smart-auto-combos.md
└── notfit/                  # ❌ Out of scope / already exists (issues CLOSED)
    └── 945-telegram-integration.md

_tasks/features-vX.Y.Z/   # Implementation plans (per-release)
└── 1046-native-playground.plan.md
```

> **LIFECYCLE RULE:** `viable/` files are **DELETED** once the feature is implemented — they are not moved. Only unimplemented features live in `viable/` (or `viable/need_details/`). Files in `defer/` and `notfit/` remain as permanent reference.

> **BRANCH RULE**: All implementation work MUST happen on the current `release/vX.Y.Z` branch. Never create separate `feat/` branches. If no release branch exists yet, create one first using `/generate-release` Phase 1 steps 1–5.

---

## Phase 1 — Harvest: Collect & Catalog Feature Ideas

### 1.1 Identify the Repository

// turbo

- Run: `git -C <project_root> remote get-url origin` to extract owner/repo.

### 1.2 Ensure Release Branch Exists

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

### 1.3 Fetch ALL Open Feature Requests

// turbo-all

**⚠️ CRITICAL**: The JSON output of `gh issue list` can be truncated by the tool, silently hiding issues. You MUST use the two-step approach below.

**Step 1 — Get Issue numbers only** (small output, never truncated):

```bash
# Fetch issues with feature/enhancement labels
gh issue list --repo <owner>/<repo> --state open -l "enhancement" --limit 500 --json number --jq '.[].number'

# Also check for [Feature] in title (common pattern when no labels are set)
gh issue list --repo <owner>/<repo> --state open --limit 500 --json number,title --jq '.[] | select(.title | test("\\[Feature\\]|\\[feature\\]|feature request"; "i")) | .number'
```

- Merge both lists, deduplicate. Count and confirm the total.

**Step 2 — Fetch full metadata for each Issue** (one call per issue):

```bash
gh issue view <NUMBER> --repo <owner>/<repo> --json number,title,labels,body,comments,createdAt,author,assignees
```

- Read the **entire body** — including description, use cases, screenshots, mockups, and any embedded images.
- Read **ALL comments** — community discussion, agreements, restrictions, owner responses, and linked PRs.
- **Images**: If the body or comments contain image URLs (`![...](...)` or `https://...png/jpg/gif`), note them — they may contain UI mockups, wireframes, or architecture diagrams that are essential to understanding the request.
- You may batch these into parallel calls (up to 4 at a time).
- Sort by oldest first (FIFO).

### 1.4 Create Idea Files (initially in `_ideia/` root)

For each feature request, create a structured idea file in `<project_root>/_ideia/`:

**Filename convention**: `<NUMBER>-<kebab-case-short-title>.md`
Example: `1046-native-playground.md`, `1041-smart-auto-combos.md`

#### 1.4a — If the idea file does NOT exist yet, create it:

```markdown
# Feature: <Title from Issue>

> GitHub Issue: #<NUMBER> — opened by @<author> on <date>
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

<Paste the FULL issue body here, preserving all formatting, images, and code blocks>

## 💬 Community Discussion

<Summarize ALL comments chronologically, noting who said what and any decisions or objections raised>

### Participants

- @<author> — Original requester
- @<commenter1> — <brief role/opinion>
- ...

### Key Points

- <bullet list of the most important discussion points>
- <agreements reached>
- <objections raised>

## 🎯 Refined Feature Description

<YOUR interpretation and enrichment of the feature request. Expand on what was asked, fill in logical gaps, provide concrete examples of how it would work. This section should be MORE detailed and clearer than the original request.>

### What it solves

- <problem 1>
- <problem 2>

### How it should work (high level)

1. <step 1>
2. <step 2>
3. ...

### Affected areas

- <list of codebase areas, modules, files likely affected>

## 📎 Attachments & References

- <any image URLs, mockup links, or external references from the issue>

## 🔗 Related Ideas

- <links to related \_ideia/ files if any overlap found>
```

#### 1.4b — If the idea file ALREADY exists, update it:

- Append new comments from the issue to the **Community Discussion** section.
- Update the **Refined Feature Description** if new information changes the understanding.
- Add any new **Related Ideas** cross-references found.
- **Do NOT overwrite** existing content — append and enrich it.

### 1.5 Cross-Reference & Deduplication

After processing all issues:

- Scan all `_ideia/*.md` files for overlapping features.
- If two features are substantially the same, add `🔗 Related Ideas` cross-references to both.
- If one is a strict subset of another, note it in the smaller file: `> ℹ️ This feature is a subset of #<OTHER_NUMBER>. Consider implementing together.`

---

## Phase 2 — Research: Find Solutions & Build Requirements

For each cataloged idea that is **viable** (aligns with the project's goals):

### 2.1 Viability Pre-Check

Before investing in research, quickly assess:

- [ ] Does this feature align with the project's goals and architecture?
- [ ] Is it technically feasible with the current codebase?
- [ ] Does it duplicate existing functionality?
- [ ] Would it introduce breaking changes or security risks?
- [ ] Is there enough detail to understand what's needed?

**Verdict options:**

| Verdict               | When                                  | Action                      |
| --------------------- | ------------------------------------- | --------------------------- |
| ✅ **VIABLE**         | Good idea, enough context             | Proceed to Research         |
| ❓ **NEEDS DETAIL**   | Good idea, insufficient spec          | Skip research, ask author   |
| ⏭️ **DEFER**          | Good idea, too complex for this cycle | Catalog only, skip research |
| ❌ **NOT FIT**        | Doesn't fit the project               | Explain why                 |
| 🔁 **ALREADY EXISTS** | Feature already implemented           | Point to existing feature   |

### 2.2 Internet Research (for VIABLE features)

For each viable feature, perform systematic research:

**Step 1 — Web search for similar implementations:**

```
search_web("how to implement <feature description> in <tech stack>")
search_web("<feature keyword> implementation nextjs typescript 2025 2026")
search_web("<feature keyword> open source library npm")
```

**Step 2 — Find reference Git repositories:**

```
search_web("site:github.com <feature keyword> <tech stack> stars:>100")
search_web("github <feature keyword> implementation recently updated 2026")
```

- Find **up to 10 relevant repositories**, sorted by most recently updated.
- For each repository:
  - Note the repo URL, star count, last commit date
  - Read its README and relevant source files via `read_url_content`
  - Extract the architectural approach, patterns used, and key code snippets

**Step 3 — Read API docs and standards:**

If the feature involves an external API, protocol, or standard:

- Find and read the official documentation
- Note version requirements, authentication patterns, rate limits

### 2.3 Create Requirements File

For each researched feature, create a requirements file alongside its idea file:

**Filename**: `<NUMBER>-<kebab-case-short-title>.requirements.md`

```markdown
# Requirements: <Feature Title>

> Feature Idea: [#<NUMBER>](./<NUMBER>-<kebab-case-short-title>.md)
> Research Date: <YYYY-MM-DD>
> Verdict: ✅ VIABLE

## 🔍 Research Summary

<Brief summary of what was found during research>

## 📚 Reference Implementations

| #   | Repository       | Stars | Last Updated | Approach | Relevance    |
| --- | ---------------- | ----- | ------------ | -------- | ------------ |
| 1   | [repo/name](url) | ⭐ N  | YYYY-MM-DD   | <brief>  | High/Med/Low |
| 2   | ...              |       |              |          |              |

### Key Patterns Found

- <pattern 1 with code snippet or link>
- <pattern 2>

## 📐 Proposed Solution Architecture

### Approach

<Describe the chosen approach based on research findings>

### New Files

| File                  | Purpose       |
| --------------------- | ------------- |
| `path/to/new/file.ts` | <description> |

### Modified Files

| File                       | Changes        |
| -------------------------- | -------------- |
| `path/to/existing/file.ts` | <what changes> |

### Database Changes

- <migrations needed, if any>

### API Changes

- <new/modified endpoints, if any>

### UI Changes

- <new/modified pages/components, if any>

## ⚙️ Implementation Effort

- **Estimated complexity**: Low / Medium / High / Very High
- **Estimated files changed**: ~N
- **Dependencies needed**: <new npm packages, if any>
- **Breaking changes**: Yes/No — <details>
- **i18n impact**: <number of new translation keys>
- **Test coverage needed**: <brief description>

## ⚠️ Open Questions

- <question 1>
- <question 2>

## 🔗 External References

- <documentation URLs>
- <API references>
```

---

## Phase 2.5 — Organize & Respond: Sort Files and Post GitHub Comments

### 2.5.1 Create Directory Structure

// turbo

```bash
mkdir -p <project_root>/_ideia/viable
mkdir -p <project_root>/_ideia/viable/need_details
mkdir -p <project_root>/_ideia/defer
mkdir -p <project_root>/_ideia/notfit
```

### 2.5.2 Move Idea Files to Category Subdirectories

After classification, move EVERY idea file to its correct subdirectory:

```bash
# ✅ VIABLE — move idea + requirements files
mv _ideia/<NUMBER>-*.md _ideia/viable/
mv _ideia/<NUMBER>-*.requirements.md _ideia/viable/

# ❓ NEEDS DETAIL — viable but waiting for author response
mv _ideia/<NUMBER>-*.md _ideia/viable/need_details/

# ⏭️ DEFER — move idea files only
mv _ideia/<NUMBER>-*.md _ideia/defer/

# ❌ NOT FIT & 🔁 ALREADY EXISTS — move idea files only
mv _ideia/<NUMBER>-*.md _ideia/notfit/
```

No files should remain in `_ideia/` root after this step (except subdirectories).

### 2.5.3 Post GitHub Comments by Category

**Each category has a specific comment template and action:**

---

#### For 🔁 ALREADY EXISTS — Comment + CLOSE issue

// turbo

The feature already exists in the system. Explain WHERE it is and HOW to use it.

```markdown
Hi @<author>! Thanks for the suggestion! 🙏

Great news — this functionality **already exists** in OmniRoute:

**📍 Where to find it:** <exact dashboard path or settings location>

**🔧 How to use it:**

1. <step 1>
2. <step 2>
3. <step 3>

If you have any trouble finding or using it, feel free to ask in a Discussion. We're always happy to help!

Closing this as the feature is already available. 🎉
```

```bash
gh issue close <NUMBER> --repo <owner>/<repo> --comment "<comment above>"
```

---

#### For ⏭️ DEFER — Comment + CLOSE issue

// turbo

Thank the user, explain the idea was cataloged, and that we'll study it before implementing.

```markdown
Hi @<author>! Thanks for this thoughtful feature request! 🙏

We really appreciate the detailed proposal. We've **cataloged your idea** and it's now part of our improvement backlog.

Due to the **significant architectural impact** of this feature, we'll need to conduct thorough use-case studies and architectural analysis before we start development. This ensures we build it right and don't introduce regressions.

**What happens next:**

- Your idea is saved in our internal feature backlog
- We'll conduct architecture studies when this area is prioritized
- We'll notify you here when development begins

Thank you for contributing to OmniRoute's roadmap! Your input helps shape the product. 🚀
```

```bash
gh issue close <NUMBER> --repo <owner>/<repo> --comment "<comment above>"
```

---

#### For ❌ NOT FIT — Comment + CLOSE issue

// turbo

Politely explain why the feature doesn't fit the project scope.

```markdown
Hi @<author>! Thanks for the suggestion! 🙏

After careful analysis, we've determined that this feature **falls outside OmniRoute's core scope** as a proxy/router.

**Reason:** <explain why — e.g., "Telegram integration belongs in the application/orchestrator layer that consumes OmniRoute's API, not inside the router itself.">

**Alternative:** <suggest an alternative approach if possible>

We appreciate you thinking of ways to improve OmniRoute! If you'd like to discuss this further, feel free to open a Discussion. 🙏
```

```bash
gh issue close <NUMBER> --repo <owner>/<repo> --comment "<comment above>"
```

---

#### For ❓ NEEDS DETAIL — Comment (keep OPEN)

// turbo

Ask for the specific missing details needed.

```markdown
Hi @<author>! Thanks for the feature request — it's an interesting idea and we'd love to explore it further. 🙏

To move forward, we need a few more details:

1. <specific question 1>
2. <specific question 2>
3. <specific question 3>

If you know of any **open-source projects or repositories** that implement something similar, please share links — it would help us design the best solution.

Looking forward to your response! 🚀
```

---

#### For ✅ VIABLE — Comment (keep OPEN)

// turbo

Thank the user, confirm we've cataloged their idea, and explain it may be implemented in future versions.

```markdown
Hi @<author>! Thanks for the great feature suggestion! 🙏

We've analyzed your request and it aligns well with OmniRoute's roadmap. We've **cataloged this feature** and it's in our implementation backlog.

**Status:** 📋 Cataloged for future implementation

This feature may be included in upcoming releases. We'll **respond to this issue and tag you** as soon as implementation begins so you can test it.

Thank you for helping improve OmniRoute! 🚀
```

**⚠️ Do NOT close viable issues — they remain OPEN for tracking.**

---

## Phase 3 — Report: Present Findings to User

### 3.1 🛑 MANDATORY STOP — Present Consolidated Report

After completing Phase 1, Phase 2, and Phase 2.5, **STOP and present the following report** in the chat. Do NOT proceed to implementation.

Present a structured report containing:

#### 3.1a — Feature Summary Table

| #   | Issue | Title | Verdict         | Location                      | Action                        |
| --- | ----- | ----- | --------------- | ----------------------------- | ----------------------------- |
| 1   | #N    | Title | ✅ VIABLE       | `_ideia/viable/`              | Issue OPEN, comment posted    |
| 2   | #N    | Title | ⏭️ DEFER        | `_ideia/defer/`               | Issue CLOSED with explanation |
| 3   | #N    | Title | ❌ NOT FIT      | `_ideia/notfit/`              | Issue CLOSED with explanation |
| 4   | #N    | Title | 🔁 EXISTS       | `_ideia/notfit/`              | Issue CLOSED with guidance    |
| 5   | #N    | Title | ❓ NEEDS DETAIL | `_ideia/viable/need_details/` | Issue OPEN, questions posted  |

#### 3.1b — Viable Features Detail

For each VIABLE feature, provide a brief paragraph:

- What was found during research
- The proposed approach
- Key risks or unknowns
- Which reference repositories were most useful

#### 3.1c — Issues Requiring Author Feedback

For features marked ❓ NEEDS DETAIL, list:

- What specific information is missing
- What examples or repository references would help

#### 3.1d — Ask for User Confirmation

End the report with:

> **Ready to proceed with implementation?**
>
> - Reply **"sim"** or **"yes"** to generate full implementation plans for all VIABLE features.
> - Reply with specific issue numbers to select only certain features.
> - Reply **"não"** or **"no"** to stop here.

---

## Phase 4 — Plan: Generate Implementation Plans (after user says "yes")

> **⚠️ Do NOT enter this phase without explicit user approval from Phase 3.**

### 4.1 Create Task Directory

```bash
mkdir -p <project_root>/_tasks/features-vX.Y.Z/
```

### 4.2 Generate One Implementation Plan Per Feature

For each VIABLE feature approved by the user, create:

**Filename**: `_tasks/features-vX.Y.Z/<NUMBER>-<kebab-case-title>.plan.md`

```markdown
# Implementation Plan: <Feature Title>

> Issue: #<NUMBER>
> Idea: [\_ideia/viable/<NUMBER>-title.md](../../_ideia/viable/<NUMBER>-title.md)
> Requirements: [\_ideia/viable/<NUMBER>-title.requirements.md](../../_ideia/viable/<NUMBER>-title.requirements.md)
> Branch: `release/vX.Y.Z`

## Overview

<Brief description of what will be built>

## Pre-Implementation Checklist

- [ ] Read all related source files listed below
- [ ] Confirm no conflicts with in-flight PRs
- [ ] Verify database migration numbering

## Implementation Steps

### Step 1: <Title>

**Files:**

- `path/to/file.ts` — <what to change>

**Details:**
<Detailed description of the change, including code patterns to follow, function signatures, etc.>

### Step 2: <Title>

...

### Step N: Tests

**New test files:**

- `tests/unit/<test-file>.test.mjs` — <what to test>

**Test cases:**

- [ ] <test case 1>
- [ ] <test case 2>

### Step N+1: i18n

**Translation keys to add:**

- `<namespace>.<key>` — "<English value>"

### Step N+2: Documentation

- [ ] Update CHANGELOG.md
- [ ] Update relevant docs/ files

## Verification Plan

1. Run `npm run build` — must pass
2. Run `npm test` — all tests must pass
3. Run `npm run lint` — no new errors
4. <Manual verification steps>

## Commit Plan
```

feat: <description> (#<NUMBER>)

```

```

### 4.3 Present Plans for Final Approval

Present a summary of all generated plans:

> **Implementation plans generated:**
>
> | #   | Feature | Plan File                                | Steps   | Effort |
> | --- | ------- | ---------------------------------------- | ------- | ------ |
> | 1   | <title> | `_tasks/features-vX.Y.Z/N-title.plan.md` | N steps | Medium |
>
> Reply **"sim"** or **"yes"** to begin implementation of all features.
> Reply with specific issue numbers to implement only certain ones.

---

## Phase 5 — Execute: Implement the Plans (after user says "yes")

> **⚠️ Do NOT enter this phase without explicit user approval from Phase 4.**

### 5.1 Implement Each Feature

For each approved plan, execute it step by step:

1. **Follow the plan** — implement exactly as specified in the `.plan.md` file
2. **Build** — Run `npm run build` after each feature to verify compilation
3. **Test** — Run `npm test` to ensure no regressions
4. **Commit** — Commit with: `feat: <description> (#<NUMBER>)`
5. **Update the plan** — Mark completed steps with `[x]` in the plan file
6. **Continue** — Move to the next feature (do NOT switch branches)

### 5.2 Respond to Authors (Update Viable Issues)

For each implemented feature, **close the issue with a final comment**:

````markdown
✅ **Implemented in `release/vX.Y.Z`!**

Hi @<author>! Great news — your feature request has been implemented! 🎉

**What was done:**

- <bullet list of what was built>

**How to try it:**

```bash
git fetch origin && git checkout release/vX.Y.Z
npm install && npm run dev
```
````

This will be included in the upcoming **vX.Y.Z** release. Feel free to reopen if you spot any issues! 🚀

````

```bash
gh issue close <NUMBER> --repo <owner>/<repo> --comment "<comment above>"
````

Then **DELETE the idea file** — it has served its purpose:

```bash
# ✅ Implemented files are DELETED (not moved)
rm _ideia/viable/<NUMBER>-<title>.md
rm _ideia/viable/<NUMBER>-<title>.requirements.md  # if exists
```

> **Why delete?** `viable/` only holds features that still NEED to be done. Once implemented, the commit history and CHANGELOG are the source of truth. Keeping the file would be confusing.

### 5.3 Finalize & Push

After implementing all approved features:

1. **Update CHANGELOG.md** on the release branch with all new feature entries
2. Push the release branch: `git push origin release/vX.Y.Z`
3. Run `/generate-release` workflow Phase 1 steps 7–10 (tests → commit → push → open PR to main → wait for user)

### 5.4 Final Summary Report

Present a final summary report to the user:

| Issue | Title | Verdict         | Action                                             | Commit    |
| ----- | ----- | --------------- | -------------------------------------------------- | --------- |
| #N    | Title | ✅ Implemented  | Issue closed, idea file deleted                    | `abc1234` |
| #N    | Title | ⏭️ Deferred     | Issue closed + saved in `_ideia/defer/`            | —         |
| #N    | Title | ❌ Not Fit      | Issue closed + saved in `_ideia/notfit/`           | —         |
| #N    | Title | 🔁 Exists       | Issue closed + saved in `_ideia/notfit/`           | —         |
| #N    | Title | ❓ Needs Detail | Issue OPEN, moved to `_ideia/viable/need_details/` | —         |

Include:

- Total features harvested
- Total ideas cataloged (`viable/need_details/` + `defer/` + `notfit/`)
- Total features implemented (idea files deleted, issues closed)
- Total features deferred
- Total issues closed
- Total issues left open (needs detail only — viable are closed after implementation)
- Test results (pass/fail count)
