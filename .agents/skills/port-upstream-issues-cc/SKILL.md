---
name: port-upstream-issues-cc
description: Triage and fix open issues from upstream decolua/9router against OmniRoute. Reproduce first, security first, one worktree per fix, attribution preserved.
---

# /port-upstream-issues — Resolve upstream-reported bugs in OmniRoute

## ⚠️ CONFIDENTIAL — this command is `.gitignored` and must NEVER be committed.

Full reference: `.agents/workflows/port-upstream-issues-ag.md`.
Sibling command (PR tracker, not issues): `/port-upstream-features`.

> **NOT THE SAME AS `/resolve-issues`.** `/resolve-issues` works on
> **OmniRoute's own** issue tracker. This command reads issues filed on
> **`decolua/9router`** (upstream) and lands fixes here, without ever
> touching the upstream tracker.

## Inputs

Arguments: `$ARGUMENTS` (optional). Accepts a space-separated list of
upstream issue identifiers — bare numbers (`1317 1320`), full URLs
(`https://github.com/decolua/9router/issues/1317`), or a mix. If empty,
the command harvests ALL open upstream issues and triages before any code
change.

## Constants (hard-coded — do not infer)

- Upstream: `decolua/9router` (JavaScript, Next.js 16)
- Fork (origin): `diegosouzapw/OmniRoute` (TypeScript, Next.js 16)
- Worktree root: `.claude/worktrees/`
- Task notes: `_tasks/features-v${VERSION}/port-upstream-issues/`
- Dedupe ledger: `_tasks/features-v${VERSION}/port-upstream-issues/_resolved.jsonl`
- Upstream sources mirror (read-only): `_references/9router/`
- We NEVER comment, close, or react on `decolua/9router`'s issue tracker.

## Architecture mapping (upstream → OmniRoute)

Use this table when reproducing each bug and planning the fix. OmniRoute
has layers that don't exist upstream (a2a, memory, cloudAgent, guardrails,
evals); when an upstream bug touches functionality routed through one of
those layers downstream, MAP IT and note it in the triage.

| Upstream (9router, JS)                                | OmniRoute (TS)                                                                                                    | Notes                                                |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `src/app/api/v1/...`                                  | `src/app/api/v1/...`                                                                                              | Public LLM API surface — same shape                  |
| `src/app/api/...` (dashboard / cli-tools / oauth)     | `src/app/api/...`                                                                                                 | Internal dashboard API                               |
| `src/app/(dashboard)/dashboard/...`                   | `src/app/(dashboard)/dashboard/...`                                                                               | UI                                                   |
| `src/app/landing/`                                    | `src/app/landing/`                                                                                                | Marketing pages                                      |
| `src/sse/handlers/` `src/sse/services/`               | `src/sse/handlers/` `src/sse/services/`                                                                           | Legacy streaming layer (still active in both)        |
| `open-sse/handlers/`                                  | `open-sse/handlers/`                                                                                              | Modern handler layer                                 |
| `open-sse/executors/*.js`                             | `open-sse/executors/*.ts`                                                                                         | One per provider — TS in OmniRoute                   |
| `open-sse/services/`                                  | `open-sse/services/`                                                                                              | Combo, accountFallback, model, etc.                  |
| `open-sse/translator/` `open-sse/transformer/`        | `open-sse/translator/` `open-sse/transformer/`                                                                    | Format conversion + Responses API                    |
| `open-sse/rtk/` (request toolkit)                     | `open-sse/services/` or `open-sse/utils/`                                                                         | No 1:1 — fold into nearest service                   |
| `open-sse/config/` `open-sse/utils/` `open-sse/lib/`  | `open-sse/config/` `open-sse/utils/` `open-sse/lib/`                                                              |                                                      |
| `src/lib/mcp/`                                        | `open-sse/mcp-server/`                                                                                            | MCP moved into open-sse workspace                    |
| `src/lib/db/` (adapters / helpers / migrations / repos) | `src/lib/db/` (45+ domain modules, 55 migrations)                                                               | `localDb.ts` is RE-EXPORT ONLY (hard rule #2)        |
| `src/lib/oauth/`                                      | `src/lib/oauth/`                                                                                                  |                                                      |
| `src/lib/auth/`                                       | `src/server/authz/` + `src/lib/auth*`                                                                             | OmniRoute splits server-side vs lib helpers          |
| `src/lib/network/`                                    | `src/shared/utils/` or `open-sse/utils/`                                                                          | Fold by purpose                                      |
| `src/lib/tunnel/` `src/lib/updater/` `src/lib/usage/` | `src/lib/services/` (bootstrap) + module per concern                                                              | OmniRoute consolidates as embedded services          |
| `src/mitm/`                                           | `src/mitm/`                                                                                                       | Cert / dns / handlers preserved                      |
| `src/models/`                                         | `src/models/`                                                                                                     | Domain models                                        |
| `src/shared/`                                         | `src/shared/`                                                                                                     | Constants, components, hooks, services, utils        |
| `src/store/` (Zustand)                                | `src/store/`                                                                                                      |                                                      |
| `src/i18n/` + `public/i18n/literals/`                 | `src/i18n/` + `public/i18n/literals/`                                                                             | i18n keys MUST be added in ALL locales               |
| `skills/9router-*` (top-level spec dirs)              | `src/lib/skills/` (framework) + `skills/` (specs)                                                                 | Different shape — framework vs spec files            |
| `cli/`                                                | `bin/` (entry) + `src/lib/services/` modules                                                                      | OmniRoute folded most CLI into the main app          |
| `gitbook/`                                            | `docs/`                                                                                                           | Markdown only; no gitbook in OmniRoute               |
| (no equivalent upstream)                              | `src/lib/a2a/` `src/lib/memory/` `src/lib/cloudAgent/` `src/lib/guardrails/` `src/lib/evals/` `electron/` `tests/` | OmniRoute-only — bugs here are downstream-specific   |

## Execution

### Step 0 — Sanity + setup

```bash
git -C . remote get-url origin     # must end in diegosouzapw/OmniRoute
git branch --show-current          # must be release/vX.Y.Z
gh auth status

VERSION=$(node -p "require('./package.json').version")
RELEASE_BRANCH=$(git branch --show-current)

# Idempotent upstream remote (we may need to inspect specific upstream commits to reproduce)
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
next `release/vX.Y.Z` first.

### Step 1 — Harvest (two-step pattern to avoid JSON truncation)

```bash
HARV="_tasks/features-v${VERSION}/port-upstream-issues"

# 1a — numbers only, never truncated
gh issue list --repo decolua/9router --state open --limit 500 \
  --json number --jq '.[].number' \
  > "$HARV/_numbers.txt"

# 1b — full metadata per issue, batched (sequential to avoid rate-limit bursts)
for N in $(cat "$HARV/_numbers.txt"); do
  gh issue view "$N" --repo decolua/9router \
    --json number,title,labels,body,comments,createdAt,updatedAt,author,reactionGroups
done > "$HARV/_raw.jsonl"

# 1c — open upstream PRs for cross-reference
gh pr list --repo decolua/9router --state open --limit 500 \
  --json number,title,body \
  > "$HARV/_open_prs.json"
```

For each issue, scan `_open_prs.json` for `fixes #N`, `closes #N`, `for
#N`. Issues with an open PR are `viable-port` — they belong to
`/port-upstream-features`, not here.

### Step 2 — Triage (no code yet)

For each issue, first normalize input and dedupe-check:

```bash
# normalize: "https://github.com/decolua/9router/issues/1317" → "1317"
N=$(echo "$arg" | sed -E 's|.*/issues/([0-9]+).*|\1|; s|^#||')

# dedupe — defense in depth (JSONL snapshot + git log as source of truth)
LEDGER="_tasks/features-v${VERSION}/port-upstream-issues/_resolved.jsonl"
if grep -q "\"upstream\":${N}\b" "$LEDGER" 2>/dev/null \
   || git log --all --grep "Reported-by:.*decolua/9router/issues/${N}\b" --oneline | grep -q .; then
  echo "Issue #${N} already resolved here — skipping"; continue
fi
```

Then write
`_tasks/features-v${VERSION}/port-upstream-issues/<N>-<short-kebab>.triage.md`
using the template in the reference workflow. Buckets:

- `security`        — handled FIRST, alone, with its own PR
- `viable-self`     — bug, reproducible against OmniRoute, fix in scope
- `viable-port`     — already addressed by an open upstream PR → hand-off
- `not-applicable`  — 9router-only bug; OmniRoute architecture diverges
- `needs-repro`     — cannot reproduce / not enough info
- `out-of-scope`    — needs infra change / new module
- `wontfix`         — conflicts with OmniRoute direction

**Reproduce before promising a fix.** OmniRoute is TS / Next.js; many
9router bugs don't exist here (different runtime, different layer, fixed
already). If you cannot reproduce, the bucket is `not-applicable` or
`needs-repro`, NEVER `viable-self`.

Use the architecture mapping above to locate the equivalent OmniRoute
file(s) and read them (NOT the upstream `_references/9router/` copy) when
deciding reproducibility.

### Step 3 — Present plan and wait

Summarise in this order:

1. **Security findings first**, with severity.
2. Counts per bucket.
3. Top `viable-self` ranked by impact / fix size.
4. Top `viable-port` with upstream PR numbers (hand-off to
   `/port-upstream-features`).
5. `out-of-scope` / `wontfix` items the user might want to re-bucket.

**Do not touch code until the user names which issues to fix in this batch.**

### Step 4 — Implement (one worktree per fix)

For each approved issue `N`:

```bash
BRANCH="fix/port-issue-${N}-<short>"
git worktree add ".claude/worktrees/${BRANCH}" -b "$BRANCH" "$RELEASE_BRANCH"
cd ".claude/worktrees/${BRANCH}"
npm install
```

#### 4.1 Write the failing regression test FIRST

Default suite is `tests/unit/<scope>.test.ts` using `node:test`. For
network-shaped bugs use `tests/integration/`. MCP-shaped issues use
`vitest.mcp.config.ts`. Iterate against the single file:

```bash
npm run test:unit -- --test tests/unit/<scope>.test.ts
```

#### 4.2 Smallest possible fix

- One commit, one concern. No drive-by refactors.
- No public route / contract shape changes unless the issue demands it
  (flag first).
- Match the existing TS style. Run `npm run lint` after editing.

#### 4.3 Validate locally — mandatory

```bash
npm run check                 # lint + test:unit
npm run typecheck:core
npm run typecheck:noimplicit:core
npm run test:vitest
npm run check:docs-all
npm run check:cycles          # always — fixes sometimes add imports
```

If contracts / providers / schemas were touched:

```bash
npm run check:route-validation:t06
npm run check:any-budget:t11
```

If E2E behaviour was plausibly impacted:

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

NO `--no-verify`. Do not weaken pre-existing tests. Debug root cause.

#### 4.4 Commit

```bash
git commit -m "$(cat <<'EOF'
fix(<scope>): <description> (port from 9router#<N>)

<short body — root cause and user-visible effect>

Reported-by: <Reporter Name> (https://github.com/decolua/9router/issues/<N>)
EOF
)"
```

- The upstream issue URL lives ONLY in this trailer.
- Add `Co-authored-by: <Name> <email>` ONLY if a third party contributed
  a substantive patch in the upstream issue comments — not for the report
  alone. Per CLAUDE.md rule #16, human co-authors are allowed; AI/bot
  trailers (Claude / GPT / Copilot / etc.) are not.
- Use lowercase `Co-authored-by:` / `Reported-by:` (GitHub canonical
  render form).

#### 4.5 Update CHANGELOG.md (inside the PR, no upstream link)

In the worktree, append to the current release's section in `CHANGELOG.md`:

```markdown
- **fix(<scope>):** <description>. (thanks @<reporter-username>)
```

Commit this change in the same PR — either as a separate commit or amended
into the fix commit (operator choice). Credit the reporter naturally;
**never** reference `decolua/9router` in `CHANGELOG.md`.

#### 4.6 Push & open PR

> **⚠️ CRITICAL**: pass `--repo diegosouzapw/OmniRoute`. Bare `gh pr
> create` defaults to the fork's PARENT (upstream `decolua/9router`).
> Verified gotcha (2026-05-23 on ghostty-web).

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

# Record in dedupe ledger (Step 2 reads this on next run)
echo "{\"upstream\":${N},\"our_pr\":\"${OUR_PR_URL}\",\"branch\":\"${BRANCH}\",\"at\":\"$(date -Iseconds)\"}" \
  >> "_tasks/features-v${VERSION}/port-upstream-issues/_resolved.jsonl"
```

Return the PR URL to the user. Update the triage note: `Status: resolved`
+ merged PR URL.

#### 4.7 Cleanup (after merge / abandonment)

```bash
PR_STATE=$(gh pr view "$OUR_PR_URL" --json state --jq .state)
git worktree remove ".claude/worktrees/${BRANCH}"
if [ "$PR_STATE" = "MERGED" ]; then
  git branch -d "$BRANCH"
else
  echo "PR not merged (state=$PR_STATE) — keeping branch '$BRANCH'"
fi
```

### Step 5 — Roll-up

Once the batch is merged, report:

- Fixed (with PR URLs on `diegosouzapw/OmniRoute`)
- Handed off to `/port-upstream-features` (with upstream PR numbers)
- Deferred (with reasons)
- New issues opened on **our** fork for remaining work — NEVER on
  `decolua/9router`.

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
- Never overwrite a previously-resolved issue — the Step 2 dedupe guard
  (JSONL + git log on `Reported-by:`) exists for this; never disable it.
- Verify subagent work yourself per CLAUDE.md: `git status` + `git diff
  --stat`, sanity-check scope, full validation suite before accepting.
- License gate is enforced in Step 0; if the upstream LICENSE blob hash
  changes between sessions, re-confirm before continuing.
