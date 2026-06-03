---
name: port-upstream-features-ag
description: Migrated command port-upstream-features-ag
---

# /port-upstream-features — Port Features from Upstream Projects

## ⚠️ CONFIDENTIAL — This workflow is `.gitignored` and must NEVER be committed.

## Overview

Port features from upstream open-source projects (e.g. [`decolua/9router`](https://github.com/decolua/9router))
into OmniRoute, adapting them for TypeScript and the OmniRoute architecture,
while giving full attribution to the original authors.

The user provides one or more upstream PR identifiers (numbers or URLs).
The agent fetches the source, plans the adaptation, and generates a
structured task file for implementation, then opens a per-port PR on
**`diegosouzapw/OmniRoute`** (never on the upstream tracker).

Companion: `port-upstream-issues-ag.md` (covers upstream **issues**, not PRs).

## Inputs

The user provides:

- One or more **upstream PR identifiers** — bare numbers (`1317 1320`),
  full URLs (`https://github.com/decolua/9router/pull/1317`), or a mix.
- Optionally, notes about scope or which strategies to use.

If no input is provided, the agent harvests open upstream PRs and asks
the user which to port before doing anything else.

## Constants (hard-coded — do not infer)

- **Upstream**: `decolua/9router` (JavaScript, Next.js 16)
- **Fork (origin)**: `diegosouzapw/OmniRoute` (TypeScript, Next.js 16)
- **Worktree root**: `.claude/worktrees/`
- **Task notes dir**: `_tasks/features-v${VERSION}/port-tasks/`
- **Dedupe ledger**: `_tasks/features-v${VERSION}/port-tasks/_ported.jsonl`
- **Upstream sources mirror (read-only)**: `_references/9router/`

## Architecture mapping (upstream → OmniRoute)

This table is the single source of truth for where upstream files land in
OmniRoute. OmniRoute has layers that don't exist upstream (a2a, memory,
cloudAgent, guardrails, evals, services bootstrap); when an upstream PR
touches functionality routed through one of those layers downstream, MAP
IT and note it in the task note.

| Upstream (9router, JS)                                  | OmniRoute (TS)                                                                                                    | Notes                                                |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `src/app/api/v1/...`                                    | `src/app/api/v1/...`                                                                                              | Public LLM API surface — same shape                  |
| `src/app/api/...` (dashboard / cli-tools / oauth)       | `src/app/api/...`                                                                                                 | Internal dashboard API                               |
| `src/app/(dashboard)/dashboard/...`                     | `src/app/(dashboard)/dashboard/...`                                                                               | UI                                                   |
| `src/app/landing/`                                      | `src/app/landing/`                                                                                                | Marketing pages                                      |
| `src/sse/handlers/` `src/sse/services/`                 | `src/sse/handlers/` `src/sse/services/`                                                                           | Legacy streaming layer (still active in both)        |
| `open-sse/handlers/`                                    | `open-sse/handlers/`                                                                                              | Modern handler layer                                 |
| `open-sse/executors/*.js`                               | `open-sse/executors/*.ts`                                                                                         | One per provider — JS → TS rewrite                   |
| `open-sse/services/`                                    | `open-sse/services/`                                                                                              | Combo, accountFallback, model, etc.                  |
| `open-sse/translator/` `open-sse/transformer/`          | `open-sse/translator/` `open-sse/transformer/`                                                                    | Format conversion + Responses API                    |
| `open-sse/rtk/` (request toolkit)                       | `open-sse/services/` or `open-sse/utils/`                                                                         | No 1:1 — fold into nearest service                   |
| `open-sse/config/` `open-sse/utils/` `open-sse/lib/`    | `open-sse/config/` `open-sse/utils/` `open-sse/lib/`                                                              |                                                      |
| `src/lib/mcp/`                                          | `open-sse/mcp-server/`                                                                                            | MCP moved into open-sse workspace                    |
| `src/lib/db/` (adapters / helpers / migrations / repos) | `src/lib/db/` (45+ domain modules, 55 migrations)                                                                 | `localDb.ts` is RE-EXPORT ONLY (hard rule #2)        |
| `src/lib/oauth/`                                        | `src/lib/oauth/`                                                                                                  |                                                      |
| `src/lib/auth/`                                         | `src/server/authz/` + `src/lib/auth*`                                                                             | OmniRoute splits server-side vs lib helpers          |
| `src/lib/network/`                                      | `src/shared/utils/` or `open-sse/utils/`                                                                          | Fold by purpose                                      |
| `src/lib/tunnel/` `src/lib/updater/` `src/lib/usage/`   | `src/lib/services/` (bootstrap) + module per concern                                                              | OmniRoute consolidates as embedded services          |
| `src/mitm/`                                             | `src/mitm/`                                                                                                       | Cert / dns / handlers preserved                      |
| `src/models/`                                           | `src/models/`                                                                                                     | Domain models                                        |
| `src/shared/`                                           | `src/shared/`                                                                                                     | Constants, components, hooks, services, utils        |
| `src/store/` (Zustand)                                  | `src/store/`                                                                                                      |                                                      |
| `src/i18n/` + `public/i18n/literals/`                   | `src/i18n/` + `public/i18n/literals/`                                                                             | i18n keys MUST be added in ALL locales               |
| `skills/9router-*` (top-level spec dirs)                | `src/lib/skills/` (framework) + `skills/` (specs)                                                                 | Different shape — framework vs spec files            |
| `cli/`                                                  | `bin/` (entry) + `src/lib/services/` modules                                                                      | OmniRoute folded most CLI into the main app          |
| `gitbook/`                                              | `docs/`                                                                                                           | Markdown only; no gitbook in OmniRoute               |
| (no equivalent upstream)                                | `src/lib/a2a/` `src/lib/memory/` `src/lib/cloudAgent/` `src/lib/guardrails/` `src/lib/evals/` `electron/` `tests/` | OmniRoute-only — never port AWAY from these          |

## Steps

### 1. Sanity + setup

```bash
git -C . remote get-url origin       # must end in diegosouzapw/OmniRoute
git branch --show-current            # must be release/vX.Y.Z
gh auth status

VERSION=$(node -p "require('./package.json').version")
RELEASE_BRANCH=$(git branch --show-current)

# Idempotent upstream remote for Strategy B (cherry-pick)
git remote get-url upstream 2>/dev/null \
  || git remote add upstream https://github.com/decolua/9router.git
git fetch upstream --quiet

# License gate — confirm once per session, cache the LICENSE blob hash
UPSTREAM_LICENSE_SHA=$(git -C _references/9router rev-parse HEAD:LICENSE 2>/dev/null)
echo "Upstream LICENSE blob: $UPSTREAM_LICENSE_SHA"
# Read _references/9router/LICENSE and confirm permissive (MIT / Apache-2.0 / BSD-style).
# If unsure or the hash changed since last session, ESCALATE TO USER before continuing.

mkdir -p "_tasks/features-v${VERSION}/port-tasks"
touch    "_tasks/features-v${VERSION}/port-tasks/_ported.jsonl"
```

The task folder uses the **current development version** (always 1 patch
above the last released). If on `main`, follow `/generate-release` Phase
1 steps 1–5 to create the next `release/vX.Y.Z` before continuing. All
work BRANCHES off the release branch.

### 2. Discover open upstream PRs (only if no input)

`gh ... --json` can silently truncate large result sets. Use the
numbers-only → batched-metadata pattern:

```bash
TARGETS="_tasks/features-v${VERSION}/port-tasks/_discovery.txt"

# 2a — numbers only, never truncated
gh pr list --repo decolua/9router --state open --limit 500 \
  --json number --jq '.[].number' \
  > "$TARGETS"

# 2b — full metadata per PR, batched
while read N; do
  gh pr view "$N" --repo decolua/9router \
    --json number,title,author,createdAt,additions,deletions,labels,mergeable
done < "$TARGETS" > "_tasks/features-v${VERSION}/port-tasks/_discovery.jsonl"

# 2c — open upstream issues for cross-reference (which PR closes which issue)
gh issue list --repo decolua/9router --state open --limit 500 \
  --json number,title --jq 'sort_by(.number)' \
  > "_tasks/features-v${VERSION}/port-tasks/_open_issues.json"
```

Group results by intent (fix / feat / chore / docs), summarise risk and
size, then ask the user which PRs to port. Wait for explicit selection.

### 3. Read Upstream PR Source Code (per PR)

For each PR — first normalize input (URL → bare number) and run the
dedupe pre-check BEFORE any expensive fetch / diff work:

```bash
# normalize: "https://github.com/decolua/9router/pull/1317" → "1317"
N=$(echo "$arg" | sed -E 's|.*/pull/([0-9]+).*|\1|; s|^#||')

# dedupe — defense in depth (JSONL snapshot + git log as source of truth)
LEDGER="_tasks/features-v${VERSION}/port-tasks/_ported.jsonl"
if grep -q "\"upstream\":${N}\b" "$LEDGER" 2>/dev/null \
   || git log --all --grep "Inspired-by:.*decolua/9router/pull/${N}\b" --oneline | grep -q .; then
  echo "PR #${N} already ported — skipping"; continue
fi
```

Then fetch metadata, diff, commits, and author identity for attribution:

```bash
gh pr view "$N" --repo decolua/9router \
  --json number,title,author,body,files,additions,deletions,baseRefOid,headRefOid,mergeable,state

gh pr diff "$N" --repo decolua/9router \
  > "_tasks/features-v${VERSION}/port-tasks/diff-${N}.patch"

gh api "repos/decolua/9router/pulls/${N}/commits" \
  --jq '.[] | {sha, message: .commit.message, author: .commit.author}'

# Author identity used in the Co-authored-by trailer. Prefer the first
# commit's author (PR author may differ — e.g. a maintainer who pushed it).
gh api "repos/decolua/9router/pulls/${N}/commits" \
  --jq '.[0].commit.author | "\(.name) <\(.email)>"'

# Cross-ref: upstream issues this PR closes (GraphQL — REST `gh pr view`
# does NOT expose `closingIssuesReferences`).
gh api graphql -f query='
  query($owner: String!, $repo: String!, $num: Int!) {
    repository(owner: $owner, name: $repo) {
      pullRequest(number: $num) {
        closingIssuesReferences(first: 20) { nodes { number } }
      }
    }
  }' -F owner=decolua -F repo=9router -F num="$N" \
  --jq '.data.repository.pullRequest.closingIssuesReferences.nodes[]?.number'
```

### 4. Analyze Compatibility

For each upstream PR, analyse using the **Architecture mapping** table at
the top of this file:

- **Architecture mapping**: which upstream files land in which OmniRoute
  files? Read each equivalent OmniRoute file (not just the upstream
  copy in `_references/9router/`).
- **Language adaptation**: JS → TS — type signatures, null/undefined,
  `unknown` vs `any`, ESM vs CJS quirks.
- **Dependencies**: new npm packages? Check `package.json` of both.
- **Schema changes**: DB migrations required? How do they interact with
  the existing 55 migrations?
- **Tests**: which OmniRoute test suite covers this? Default to
  `tests/unit/<scope>.test.ts` using `node:test`; MCP via
  `vitest.mcp.config.ts`.
- **Security**: any security considerations during adaptation (input
  validation, public-cred handling, error sanitization)?
- **i18n**: new UI strings → translation keys in ALL locales
  (`src/i18n/` + `public/i18n/literals/`).
- **OmniRoute-only impact**: does this touch a2a / memory / cloudAgent /
  guardrails / evals? Note in the task plan.

### 5. Create Task Directory & Generate Task File

```bash
TASK_DIR="_tasks/features-v${VERSION}/port-tasks"
SEQ=$(printf "%02d" $(( $(ls "$TASK_DIR"/*.plan.md 2>/dev/null | wc -l) + 1 )))
```

File naming: `<seq>-<short-kebab-name>.plan.md`, e.g.
`01-provider-quota-grouped-layout.plan.md`. Sequence is zero-padded so
files sort lexicographically.

#### Task file template

```markdown
# Port: <Feature Name>

## Source

| Field | Value |
|-------|-------|
| **Upstream project** | [9router](https://github.com/decolua/9router) |
| **Upstream PR** | [#<number>](https://github.com/decolua/9router/pull/<number>) |
| **PR author** | [@<pr-username>](https://github.com/<pr-username>) |
| **First-commit author** | `<Name> <<email>>` (used in `Co-authored-by` trailer) |
| **Closing upstream issues** | <list from GraphQL `closingIssuesReferences`, or "none"> |
| **Date analyzed** | <YYYY-MM-DD> |

## Summary

<What the feature does in the upstream project.>

## Adaptation plan

### Files to create/modify in OmniRoute

| OmniRoute file | Action | Based on (upstream)            |
|----------------|--------|--------------------------------|
| `src/...`      | Create | `src/...` (upstream path)      |
| `open-sse/...` | Modify | `lib/...` (upstream path)      |

### Selected strategy

`A — Manual re-implementation` | `B — Cherry-pick with adaptation` | `C — Direct apply`

### Key adaptations

1. <JS → TS conversion details.>
2. <Architecture differences and how we bridge them.>
3. <OmniRoute-specific integrations (a2a / memory / cloudAgent / guardrails / evals).>

### Dependencies

- [ ] New npm packages: <none / list>
- [ ] DB migration: <none / describe>
- [ ] i18n keys: <none / list — ALL locales>

### Reference files to read during implementation

- `_references/9router/<path1>` (local mirror — preferred)
- `https://github.com/decolua/9router/blob/<branch>/<path1>` (fallback)

## Attribution

When implementing this feature, use these attribution methods:

### 1. Git commit trailer (ONLY place with upstream PR reference)

```
Co-authored-by: <Name> <<email>>
Inspired-by: https://github.com/decolua/9router/pull/<number>
```

> Per CLAUDE.md hard rule #16: `Co-authored-by` is allowed and required
> for human upstream authors; it is forbidden only for AI/bot trailers
> (Claude / GPT / Copilot / etc.).

### 2. CHANGELOG entry (author only — NO upstream link)

```
- **feat(<scope>):** <description>. (thanks @<username>)
```

### 3. PR description block (author only — NO upstream link)

```
## Attribution

Thanks to [@<username>](https://github.com/<username>) for the original implementation.
```

> **Rule**: the upstream PR link is an internal implementation detail.
> It lives ONLY in the commit trailer (`Inspired-by`). The CHANGELOG
> and PR description credit the author naturally, as if they were a
> direct contributor.

## Implementation checklist

- [ ] Read upstream PR diff and reference files
- [ ] Worktree branched off current `release/vX.Y.Z`
- [ ] Files created/modified per adaptation plan
- [ ] TypeScript types added
- [ ] Unit tests added at `tests/unit/<scope>.test.ts`
- [ ] i18n keys added in all locales (if UI-facing)
- [ ] Manual UI smoke on `npm run dev` (if dashboard touched)
- [ ] Commit with `Co-authored-by` + `Inspired-by` trailers
- [ ] CHANGELOG entry inside the PR with `(thanks @<username>)`
- [ ] PR description includes Attribution block (author only)
- [ ] Ledger entry written on PR creation
```

### 6. Present Task to User

After generating the task file(s):

- Show the task file path(s)
- Summarise total LOC, blockers, recommended order
- Explicitly flag:
  - New dependencies in `package.json`
  - DB migrations
  - New i18n keys (all locales)
  - Any change to `src/app/api/v1/...` route shapes (public surface)
  - Any change to `src/shared/contracts/` (downstream consumers)
  - OmniRoute-only layers impacted
- Ask if the user wants to proceed now or save for later

**Do NOT touch code until the user explicitly names which PRs to port.**

### 7. Implementation (one worktree per PR)

#### 7.1 Worktree

```bash
BRANCH="feat/port-pr-${N}-<short-kebab>"   # or fix/port-pr-... matching upstream intent
git worktree add ".claude/worktrees/${BRANCH}" -b "$BRANCH" "$RELEASE_BRANCH"
cd ".claude/worktrees/${BRANCH}"
npm install
```

#### 7.2 Strategy decision tree

| Condition                                                       | Strategy                                  |
| --------------------------------------------------------------- | ----------------------------------------- |
| Upstream change is JS code → needs TS rewrite (the common case) | **A — Manual re-implementation** (default) |
| Upstream is already TS-compatible AND file paths align 1:1      | **B — Cherry-pick with adaptation**       |
| Docs / config / static-asset-only (no executable code)          | **C — Direct apply**                      |

```bash
# Strategy A: re-write upstream change against OmniRoute types & architecture.
#   Read _references/9router/<path> for source-of-truth context.
#   Attribute upstream author in commit trailer regardless.

# Strategy B: fetch upstream PR head and cherry-pick
git fetch upstream "pull/${N}/head:upstream-pr-${N}"
git cherry-pick upstream-pr-${N}  # resolve TS / architecture conflicts manually

# Strategy C: only for docs/config (use 3-way merge so conflicts surface)
git apply --3way "../../_tasks/features-v${VERSION}/port-tasks/diff-${N}.patch"
```

#### 7.3 Implement the feature

Follow the task plan. Keep or port upstream tests, translating them to
OmniRoute conventions:

- Unit: `tests/unit/<scope>.test.ts` with `node:test`
- MCP: via `vitest.mcp.config.ts`
- Integration: `tests/integration/`
- E2E: `tests/e2e/` (Playwright)

#### 7.4 Validate locally — mandatory

```bash
npm run check                 # lint + test:unit
npm run typecheck:core
npm run typecheck:noimplicit:core
npm run test:vitest           # MCP server tests
npm run check:docs-all        # docs-sync gates
npm run check:cycles          # always — ports often introduce cross-layer imports
```

If contracts / providers / schemas were touched:

```bash
npm run check:route-validation:t06
npm run check:any-budget:t11
```

If end-to-end behaviour is plausibly impacted:

```bash
npm run test:e2e
```

If the diff touches `src/app/(dashboard)/` (UI), manual smoke is
**mandatory** per CLAUDE.md "For UI or frontend changes":

```bash
npm run dev   # http://localhost:20128
# Exercise the new/changed UI in a browser. Verify the golden path AND
# at least one edge case. Watch the console for regressions in other tabs.
# Run /capture-release-evidences afterwards if release-evidence is needed.
```

NO `--no-verify`. Do NOT weaken existing tests. Investigate root cause
if anything pre-existing fails.

#### 7.5 Commit with attribution (upstream ref ONLY here)

```bash
git commit -m "$(cat <<'EOF'
<type>(<scope>): <description>

<optional body — root cause / mechanism / user-visible effect>

Co-authored-by: <Name> <<email>>
Inspired-by: https://github.com/decolua/9router/pull/<N>
EOF
)"
```

- The `Inspired-by` link is the ONLY place the upstream PR is referenced.
  It MUST NOT appear in the PR body or `CHANGELOG.md`.
- The `Co-authored-by` trailer credits the **human** upstream author.
  This is allowed and required by CLAUDE.md hard rule #16 — that rule
  bans AI/bot trailers (Claude / GPT / Copilot / etc.), not humans.
- Use lowercase `Co-authored-by:` and `Inspired-by:` (GitHub canonical
  render form).

#### 7.6 Update CHANGELOG.md (inside the PR, no upstream link)

In the worktree, append to the current release's section in `CHANGELOG.md`:

```markdown
- **<type>(<scope>):** <description>. (thanks @<upstream-username>)
```

Commit this change in the same PR — either as a separate commit or amended
into the feat/fix commit (operator choice). Credit the upstream author
naturally; **never** reference the upstream PR URL or `decolua/9router`
here.

#### 7.7 Push & open PR (author only, no upstream link)

> **⚠️ FORK-PR GOTCHA**: bare `gh pr create` defaults to the fork's
> PARENT (upstream `decolua/9router`). ALWAYS pass `--repo
> diegosouzapw/OmniRoute`. Verified gotcha (2026-05-23 on ghostty-web).
> Verify with `gh pr view <N> --repo diegosouzapw/OmniRoute` after
> creation.

```bash
git push -u origin "$BRANCH"
OUR_PR_URL=$(gh pr create --repo diegosouzapw/OmniRoute --base "$RELEASE_BRANCH" \
  --title "<type>(<scope>): <description>" \
  --body "$(cat <<'EOF'
## Summary

<1–3 bullets>

## Attribution

Thanks to [@<upstream-username>](https://github.com/<upstream-username>) for the original implementation.

## Changes

- <list>

## Test plan

- [ ] npm run check
- [ ] npm run typecheck:core && npm run typecheck:noimplicit:core
- [ ] npm run test:vitest
- [ ] npm run check:docs-all
- [ ] npm run check:cycles
- [ ] npm run test:e2e (if relevant)
- [ ] Manual UI smoke (if dashboard touched)
EOF
)")
```

#### 7.8 Record in dedupe ledger

```bash
echo "{\"upstream\":${N},\"our_pr\":\"${OUR_PR_URL}\",\"branch\":\"${BRANCH}\",\"at\":\"$(date -Iseconds)\"}" \
  >> "_tasks/features-v${VERSION}/port-tasks/_ported.jsonl"
```

Step 3's dedupe pre-check reads this on the next run; the `Inspired-by`
trailer in the commit serves as the redundant source of truth.

#### 7.9 Cleanup (after merge / abandonment)

```bash
PR_STATE=$(gh pr view "$OUR_PR_URL" --json state --jq .state)
git worktree remove ".claude/worktrees/${BRANCH}"
if [ "$PR_STATE" = "MERGED" ]; then
  git branch -d "$BRANCH"
else
  echo "PR not merged (state=$PR_STATE) — keeping branch '$BRANCH'"
fi
```

Task note and ledger entry stay as durable local documentation.

## Hard rules

- All work BRANCHES off `release/vX.Y.Z`. Never off `main`. Never push to
  `main` directly.
- One PR per ported upstream PR. Do NOT bundle multiple ports in one PR.
- The upstream PR URL appears ONLY in the commit `Inspired-by` trailer.
  Never in PR body, CHANGELOG, or any other surface.
- `Co-authored-by` trailers MUST credit the human upstream author (CLAUDE.md
  rule #16 allows humans, bans AI/bot trailers).
- Never widen `src/shared/contracts/` or public route shapes without
  explicit user OK.
- Never use `--no-verify`, force-push to release/main, or `--reject` /
  `--theirs` / `--ours` to shortcut conflicts.
- Never overwrite a previously-ported PR — the Step 3 dedupe guard
  (JSONL + git log on `Inspired-by:`) exists for this; never disable it.
- Verify subagent work yourself per CLAUDE.md: `git status` + `git diff
  --stat`, sanity-check scope, and re-run the full validation suite
  before accepting any agent-authored change.
- License gate is enforced in Step 1; if the upstream LICENSE blob hash
  changes between sessions, re-confirm before continuing.

## Notes

- This workflow is **local-only** and must never be committed to the
  repository. The `.md` file is individually listed in `.gitignore`
  alongside `port-upstream-issues-ag.md`, and the `_tasks/` directory is
  covered by the `/_*/` gitignore rule.
- Task files serve as persistent documentation of what was ported and
  from where.
- The dedupe ledger (`_ported.jsonl`) is local-only documentation, NOT
  tracked. The git `Inspired-by:` trailer is the authoritative record.
- Companion sibling: `port-upstream-issues-ag.md` for upstream issue
  triage and fix porting.
