---
name: port-upstream-issues-ag
description: Migrated command port-upstream-issues-ag
---

# /port-upstream-issues — Resolve issues reported on upstream `decolua/9router`

## ⚠️ CONFIDENTIAL — This workflow is `.gitignored` and must NEVER be committed.

## Overview

Companion to `port-upstream-features-ag.md`. While that workflow ports
upstream **PRs**, this one harvests upstream **open issues** (bugs filed on
[`decolua/9router`](https://github.com/decolua/9router)), reproduces them
against OmniRoute, and lands fixes in OmniRoute with full attribution to
the upstream reporter.

This is NOT the same as `/resolve-issues`:

| Workflow | Repo whose issues we read | Issues we close on |
|----------|---------------------------|--------------------|
| `/resolve-issues` | `diegosouzapw/OmniRoute` (our own) | our own |
| `/port-upstream-issues` (this) | `decolua/9router` (upstream, JS) | NONE — we never touch upstream tracker |

> **NEVER comment, close, or react on `decolua/9router`'s issue tracker.**
> Upstream is owned by the original maintainer. Our work is local to
> OmniRoute.

## Inputs

The user provides:

- One or more **upstream issue identifiers** — bare numbers (`1317 1320`),
  full URLs (`https://github.com/decolua/9router/issues/1317`), or a mix.
- Optionally, notes about scope or which buckets to skip.

If no input is provided, the agent harvests ALL open upstream issues and
triages before any code change.

## Constants (hard-coded — do not infer)

- **Upstream**: `decolua/9router` (JavaScript, Next.js 16)
- **Fork (origin)**: `diegosouzapw/OmniRoute` (TypeScript, Next.js 16)
- **Worktree root**: `.claude/worktrees/`
- **Task notes**: `_tasks/features-v${VERSION}/port-upstream-issues/`
- **Dedupe ledger**: `_tasks/features-v${VERSION}/port-upstream-issues/_resolved.jsonl`
- **Upstream sources mirror (read-only)**: `_references/9router/`

## Architecture mapping (upstream → OmniRoute)

Single source of truth for where upstream files land in OmniRoute. Use it
when reproducing each bug and planning the fix. OmniRoute has layers that
don't exist upstream (a2a, memory, cloudAgent, guardrails, evals); when
an upstream bug touches functionality routed through one of those layers
downstream, MAP IT and note it in the triage.

| Upstream (9router, JS)                                  | OmniRoute (TS)                                                                                                    | Notes                                                |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `src/app/api/v1/...`                                    | `src/app/api/v1/...`                                                                                              | Public LLM API surface — same shape                  |
| `src/app/api/...` (dashboard / cli-tools / oauth)       | `src/app/api/...`                                                                                                 | Internal dashboard API                               |
| `src/app/(dashboard)/dashboard/...`                     | `src/app/(dashboard)/dashboard/...`                                                                               | UI                                                   |
| `src/app/landing/`                                      | `src/app/landing/`                                                                                                | Marketing pages                                      |
| `src/sse/handlers/` `src/sse/services/`                 | `src/sse/handlers/` `src/sse/services/`                                                                           | Legacy streaming layer (still active in both)        |
| `open-sse/handlers/`                                    | `open-sse/handlers/`                                                                                              | Modern handler layer                                 |
| `open-sse/executors/*.js`                               | `open-sse/executors/*.ts`                                                                                         | One per provider — TS in OmniRoute                   |
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
| (no equivalent upstream)                                | `src/lib/a2a/` `src/lib/memory/` `src/lib/cloudAgent/` `src/lib/guardrails/` `src/lib/evals/` `electron/` `tests/` | OmniRoute-only — bugs here are downstream-specific   |

## Steps

### 1. Sanity + setup

```bash
git -C . remote get-url origin     # must end in diegosouzapw/OmniRoute
git branch --show-current          # must be release/vX.Y.Z
gh auth status

VERSION=$(node -p "require('./package.json').version")
RELEASE_BRANCH=$(git branch --show-current)

# Idempotent upstream remote (may be needed to inspect specific upstream commits when reproducing)
git remote get-url upstream 2>/dev/null \
  || git remote add upstream https://github.com/decolua/9router.git
git fetch upstream --quiet

# License gate — confirm once per session, cache the LICENSE blob hash
UPSTREAM_LICENSE_SHA=$(git -C _references/9router rev-parse HEAD:LICENSE 2>/dev/null)
echo "Upstream LICENSE blob: $UPSTREAM_LICENSE_SHA"
# Read _references/9router/LICENSE and confirm permissive (MIT / Apache-2.0 / BSD-style).
# If unsure or the hash changed since last session, ESCALATE TO USER before continuing.

mkdir -p "_tasks/features-v${VERSION}/port-upstream-issues"
touch    "_tasks/features-v${VERSION}/port-upstream-issues/_resolved.jsonl"
```

If on `main`, follow `/generate-release` Phase 1 steps 1–5 to create the
next `release/vX.Y.Z` before continuing. All work BRANCHES off the release
branch.

### 2. Harvest Open Upstream Issues

⚠️ The JSON output of `gh issue list` can be silently truncated. Use the
two-step approach:

**2a — Numbers only** (small, never truncated):

```bash
HARV="_tasks/features-v${VERSION}/port-upstream-issues"
gh issue list --repo decolua/9router --state open --limit 500 \
  --json number --jq '.[].number' \
  > "$HARV/_numbers.txt"
wc -l "$HARV/_numbers.txt"
```

**2b — Full metadata per issue** (sequential to avoid rate-limit bursts):

```bash
for N in $(cat "$HARV/_numbers.txt"); do
  gh issue view "$N" --repo decolua/9router \
    --json number,title,labels,body,comments,createdAt,updatedAt,author,reactionGroups
done > "$HARV/_raw.jsonl"
```

### 3. Cross-Reference Upstream Open PRs

For every issue, check whether an open upstream PR already addresses it
(`fixes #N`, `closes #N`, `for #N`, body mentions). If yes, the canonical
path is **`/port-upstream-features`** with that PR, NOT a re-implementation
here.

```bash
gh pr list --repo decolua/9router --state open --limit 500 \
  --json number,title,body \
  > "$HARV/_open_prs.json"
```

### 4. Triage Each Issue (NO code yet)

For every issue — first normalize input and run the dedupe pre-check
BEFORE any expensive analysis:

```bash
# normalize: "https://github.com/decolua/9router/issues/1317" → "1317"
N=$(echo "$arg" | sed -E 's|.*/issues/([0-9]+).*|\1|; s|^#||')

# dedupe — defense in depth (JSONL snapshot + git log as source of truth)
LEDGER="$HARV/_resolved.jsonl"
if grep -q "\"upstream\":${N}\b" "$LEDGER" 2>/dev/null \
   || git log --all --grep "Reported-by:.*decolua/9router/issues/${N}\b" --oneline | grep -q .; then
  echo "Issue #${N} already resolved here — skipping"; continue
fi
```

Then produce `$HARV/<N>-<short-kebab>.triage.md` using the template at the
bottom of this file. Classify each into ONE bucket:

| Bucket | Meaning | Next action |
|--------|---------|-------------|
| `security`       | Security-sensitive (RCE, auth bypass, SSRF, etc.) | Handle FIRST, alone, with its own PR |
| `viable-self`    | Bug, reproducible against OmniRoute, fix in scope | Phase 5+ |
| `viable-port`    | Already addressed by an open upstream PR | Hand off to `/port-upstream-features` |
| `not-applicable` | Bug specific to 9router internals not mirrored in OmniRoute | Document and skip |
| `needs-repro`    | Cannot reproduce locally / not enough info | Document; skip until repro |
| `out-of-scope`   | Requires native module changes, new infra, etc. | Document and skip |
| `wontfix`        | Conflicts with OmniRoute's direction | Document with reason |

**Reproduction is mandatory before `viable-self`.** OmniRoute is TypeScript
on Next.js; many 9router bugs simply do not exist here because the
implementation is different. If you cannot reproduce against OmniRoute,
the bucket is `not-applicable` or `needs-repro`, never `viable-self`.

Use the architecture mapping above to locate the equivalent OmniRoute
file(s) and read them (NOT just the upstream `_references/9router/` copy)
when deciding reproducibility.

### 5. Analyse Compatibility (for `viable-self`)

For each `viable-self` issue, before writing a fix plan, map:

- **Affected area**: which row of the architecture mapping is hit?
- **Code locality**: read the 9router source files referenced (or implied)
  by the issue and the equivalent OmniRoute file(s). Note divergence.
- **JS → TS adaptation**: type signatures, null/undefined handling,
  `unknown` vs `any`, ESM vs CJS specifics.
- **DB / schema impact**: any migration needed? How does it interact with
  the existing 55 migrations?
- **i18n keys**: any new UI strings → translation keys in ALL locales?
- **OmniRoute-only impact**: does this surface through a2a / memory /
  cloudAgent / guardrails / evals?
- **Tests**: which OmniRoute test suite must cover the regression?
  Default to `tests/unit/<scope>.test.ts`.

### 6. Present Plan & Wait

Summarise to the user, in this order:

1. **Security findings first** with severity and proposed handling.
2. Counts per bucket and totals.
3. Top `viable-self` ranked by user impact and fix size.
4. Top `viable-port` candidates with upstream PR numbers (hand-off to
   `/port-upstream-features`).
5. Open questions for the user (anything ambiguous in `out-of-scope` /
   `wontfix` / `not-applicable` that may need re-bucketing).

> **⚠️ Do NOT touch code until the user explicitly names which issues to
> fix in this batch.**

### 7. Implementation (one worktree per fix)

For each approved issue `N`:

```bash
BRANCH="fix/port-issue-${N}-<short-kebab>"
git worktree add ".claude/worktrees/${BRANCH}" -b "$BRANCH" "$RELEASE_BRANCH"
cd ".claude/worktrees/${BRANCH}"
npm install
```

#### 7.1 Write the failing regression test FIRST

Default to `tests/unit/<scope>.test.ts`. For network/E2E-shaped bugs use
`tests/integration/` or `tests/e2e/`. Iterate against the specific file:

```bash
npm run test:unit -- --test tests/unit/<scope>.test.ts
```

#### 7.2 Smallest possible fix

- Do not refactor unrelated code in the same commit.
- Do not change public route shapes unless the issue requires it.
- Match the existing TypeScript style. Run `npm run lint` after editing.

#### 7.3 Validate locally — mandatory

```bash
npm run check                 # lint + test:unit
npm run typecheck:core
npm run typecheck:noimplicit:core
npm run test:vitest           # MCP server tests
npm run check:docs-all        # docs-sync gates
npm run check:cycles          # always — fixes sometimes add imports
```

If the change touches contracts, providers, or schemas, also:

```bash
npm run check:route-validation:t06
npm run check:any-budget:t11
```

If end-to-end behaviour is plausibly impacted:

```bash
npm run test:e2e
```

If the fix touches `src/app/(dashboard)/` (UI), manual smoke is
**mandatory** per CLAUDE.md "For UI or frontend changes":

```bash
npm run dev   # http://localhost:20128
# Reproduce the original bug scenario and verify it's gone.
# Watch the console for regressions in other tabs.
```

NO `--no-verify`. Do NOT weaken existing tests. Investigate root cause if
something pre-existing fails.

#### 7.4 Commit

```bash
git commit -m "$(cat <<'EOF'
fix(<scope>): <description> (port from 9router#<N>)

<short body — root cause and user-visible effect>

Reported-by: <Reporter Name> (https://github.com/decolua/9router/issues/<N>)
EOF
)"
```

- The upstream issue link lives ONLY in this commit trailer. It does NOT
  appear in the PR body or in `CHANGELOG.md`.
- If a third party contributed a substantive patch/fix in the upstream
  issue comments, add `Co-authored-by: <Name> <email>` as well.
- Per CLAUDE.md hard rule #16: `Co-authored-by` is allowed and required
  for human contributors; it is forbidden only for AI/bot trailers
  (Claude / GPT / Copilot / etc.).
- Use lowercase `Reported-by:` and `Co-authored-by:` (GitHub canonical
  render form).

#### 7.5 Update CHANGELOG.md (inside the PR, no upstream link)

In the worktree, append to the current release's section in `CHANGELOG.md`:

```markdown
- **fix(<scope>):** <description>. (thanks @<upstream-reporter-username>)
```

Commit this change in the same PR — either as a separate commit or amended
into the fix commit (operator choice). Credit the reporter naturally;
**never** reference `decolua/9router` in `CHANGELOG.md`.

#### 7.6 Push & open PR

> **⚠️ FORK-PR GOTCHA**: bare `gh pr create` defaults to the fork's
> PARENT (upstream `decolua/9router`). ALWAYS pass `--repo
> diegosouzapw/OmniRoute`. Verified gotcha (2026-05-23 on ghostty-web).

```bash
git push -u origin "$BRANCH"
OUR_PR_URL=$(gh pr create --repo diegosouzapw/OmniRoute --base "$RELEASE_BRANCH" \
  --title "fix(<scope>): <description>" \
  --body "$(cat <<'EOF'
## Summary

<bullets>

## Root cause

<what was actually broken>

## Fix

<what changed>

## Attribution

Thanks to [@<reporter-username>](https://github.com/<reporter-username>) for the original report.

## Test plan

- [ ] New regression test at tests/unit/<scope>.test.ts
- [ ] npm run check
- [ ] npm run typecheck:core && npm run typecheck:noimplicit:core
- [ ] npm run test:vitest
- [ ] npm run check:docs-all
- [ ] npm run check:cycles
- [ ] Manual UI smoke (if dashboard touched)
EOF
)")
```

#### 7.7 Record in dedupe ledger

```bash
echo "{\"upstream\":${N},\"our_pr\":\"${OUR_PR_URL}\",\"branch\":\"${BRANCH}\",\"at\":\"$(date -Iseconds)\"}" \
  >> "$HARV/_resolved.jsonl"
```

Step 4's dedupe pre-check reads this on the next run; the `Reported-by`
trailer in the commit serves as the redundant source of truth.

Mark the triage note: set `Status: resolved` and record the merged PR URL.

#### 7.8 Cleanup (after merge / abandonment)

```bash
PR_STATE=$(gh pr view "$OUR_PR_URL" --json state --jq .state)
git worktree remove ".claude/worktrees/${BRANCH}"
if [ "$PR_STATE" = "MERGED" ]; then
  git branch -d "$BRANCH"
else
  echo "PR not merged (state=$PR_STATE) — keeping branch '$BRANCH'"
fi
```

### 8. Roll-up

Once the batch is merged, report to the user:

- Fixed (with our PR URLs on `diegosouzapw/OmniRoute`)
- Handed off to `/port-upstream-features` (with upstream PR numbers)
- Deferred (with reasons)
- New issues opened on **our** fork (`diegosouzapw/OmniRoute`) for any
  remaining work worth tracking — **never** open issues on
  `decolua/9router`.

---

## Triage Note Template

```markdown
# Upstream Issue #<N>: <Title>

## Source

| Field | Value |
|-------|-------|
| Upstream issue | [decolua/9router#<N>](https://github.com/decolua/9router/issues/<N>) |
| Reporter | [@<username>](https://github.com/<username>) |
| Filed | <YYYY-MM-DD> |
| Last activity | <YYYY-MM-DD> |
| Labels | <list> |

## Bucket

`security` | `viable-self` | `viable-port` | `not-applicable` | `needs-repro` | `out-of-scope` | `wontfix`

## Summary

<2–4 sentence restatement of the bug, in our words.>

## Reproduction against OmniRoute

- [ ] Reproduced locally on `release/vX.Y.Z`
- Steps:
  1. ...
  2. ...
- Expected: ...
- Actual: ...

## Architecture mapping

- 9router file(s): `<upstream path>` (also visible in `_references/9router/<path>`)
- OmniRoute file(s): `<our path>` (per the architecture mapping table at the top of this workflow)
- OmniRoute-only layers involved: `<a2a / memory / cloudAgent / guardrails / evals / none>`

## Related upstream PR

<#NNN — if `viable-port`, link here and STOP this workflow for that issue. Otherwise: none.>

## JS → TS notes

<Type signatures, null handling, ESM specifics that differ from 9router.>

## Fix plan

<Bullet plan, OR reason for the chosen non-fix bucket.>

## Risks

- Public API change: no / yes (describe)
- Schema / migration: no / yes (describe)
- i18n keys: no / yes (list — ALL locales)
- Performance: no / yes (describe)

## Validation checklist

- [ ] Failing regression test added first
- [ ] `npm run check`
- [ ] `npm run typecheck:core`
- [ ] `npm run typecheck:noimplicit:core`
- [ ] `npm run test:vitest`
- [ ] `npm run check:docs-all`
- [ ] `npm run check:cycles`
- [ ] `npm run test:e2e` (if E2E impacted)
- [ ] Manual UI smoke on `npm run dev` (if dashboard touched)

## Attribution applied

- [ ] Commit trailer: `Reported-by` (+ `Co-authored-by` if upstream comment patch)
- [ ] CHANGELOG.md inside the PR: `(thanks @<reporter>)` — NO upstream link
- [ ] PR body: thanks block (reporter only, NO upstream link)
- [ ] Ledger entry written on PR creation

## Status

`triaged` | `in-progress` | `resolved` | `deferred` | `wontfix`

## Resolution

<Filled in when status = resolved. Include the merged PR URL on our fork.>
```

---

## Hard rules

- Security first. Always. Alone, on its own worktree, its own PR.
- Reproduce before claiming a fix. No "blind" fixes.
- All work BRANCHES off `release/vX.Y.Z`. Never off `main`. Never push to
  `main` directly.
- One PR per fix. Do NOT bundle.
- Never weaken existing tests to go green.
- Never use `--no-verify`, force-push to release/main, or `--reject` /
  `--theirs` / `--ours` to shortcut conflicts.
- Never interact with `decolua/9router`'s issue tracker (no comments,
  closes, reactions, or referenced fixes from our commits).
- Never widen `src/shared/contracts/` or public route shapes without
  explicit user OK.
- Upstream issue URL lives ONLY in the `Reported-by` commit trailer.
  Never in PR body, CHANGELOG, or any other surface.
- `Co-authored-by` trailers MUST credit human contributors only (CLAUDE.md
  rule #16 allows humans, bans AI/bot trailers).
- Never overwrite a previously-resolved issue — the Step 4 dedupe guard
  (JSONL + git log on `Reported-by:`) exists for this; never disable it.
- Verify subagent work yourself per CLAUDE.md: `git status` + `git diff
  --stat`, sanity-check scope, full validation suite before accepting.
- License gate is enforced in Step 1; if the upstream LICENSE blob hash
  changes between sessions, re-confirm before continuing.

## Notes

- This workflow is **local-only**. The `_tasks/` directory is covered by
  the `/_*/` gitignore rule, and this `.md` file is individually listed in
  `.gitignore` alongside `port-upstream-features-ag.md`.
- The dedupe ledger (`_resolved.jsonl`) is local-only documentation, NOT
  tracked. The git `Reported-by:` trailer is the authoritative record.
- If a downstream consumer (another project of yours) is blocked by a
  specific upstream issue, prioritise it regardless of bucket size.
- Companion sibling: `port-upstream-features-ag.md` for upstream PR
  porting.
