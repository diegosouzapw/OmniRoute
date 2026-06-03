---
name: port-upstream-features-cc
description: Port one or more open PRs from upstream decolua/9router into OmniRoute, adapt JS→TS, attribute the original author, land via release-branch worktree + per-feature PR.
---

# /port-upstream-features — Port upstream PRs into OmniRoute

## ⚠️ CONFIDENTIAL — this command is `.gitignored` and must NEVER be committed.

Full reference: `.agents/workflows/port-upstream-features-ag.md`.
Sibling command (issue tracker, not PRs): `/port-upstream-issues`.

## Inputs

Arguments: `$ARGUMENTS` (optional). Accepts a space-separated list of
upstream PR identifiers — bare numbers (`1317 1320`), full URLs
(`https://github.com/decolua/9router/pull/1317`), or a mix.

If empty, the command MUST list candidate open upstream PRs first and ask
the user which to port before doing anything else.

## Constants (hard-coded — do not infer)

- Upstream: `decolua/9router` (JavaScript, Next.js 16)
- Fork (origin): `diegosouzapw/OmniRoute` (TypeScript, Next.js 16)
- Worktree root: `.claude/worktrees/`
- Task notes dir: `_tasks/features-v${VERSION}/port-tasks/`
- Dedupe ledger: `_tasks/features-v${VERSION}/port-tasks/_ported.jsonl`
- Upstream sources mirror (read-only): `_references/9router/`

## Architecture mapping (upstream → OmniRoute)

Use this table when planning each port. OmniRoute has layers that don't
exist upstream (a2a, memory, cloudAgent, guardrails, evals, services
bootstrap); when an upstream change touches functionality that lives in
those layers downstream, MAP IT and note it in the task note.

| Upstream (9router, JS)                                | OmniRoute (TS)                                                                                                    | Notes                                                |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `src/app/api/v1/...`                                  | `src/app/api/v1/...`                                                                                              | Public LLM API surface — same shape                  |
| `src/app/api/...` (dashboard / cli-tools / oauth)     | `src/app/api/...`                                                                                                 | Internal dashboard API                               |
| `src/app/(dashboard)/dashboard/...`                   | `src/app/(dashboard)/dashboard/...`                                                                               | UI                                                   |
| `src/app/landing/`                                    | `src/app/landing/`                                                                                                | Marketing pages                                      |
| `src/sse/handlers/` `src/sse/services/`               | `src/sse/handlers/` `src/sse/services/`                                                                           | Legacy streaming layer (still active in both)        |
| `open-sse/handlers/`                                  | `open-sse/handlers/`                                                                                              | Modern handler layer                                 |
| `open-sse/executors/*.js`                             | `open-sse/executors/*.ts`                                                                                         | One per provider — JS → TS rewrite                   |
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
| (no equivalent upstream)                              | `src/lib/a2a/` `src/lib/memory/` `src/lib/cloudAgent/` `src/lib/guardrails/` `src/lib/evals/` `electron/` `tests/` | OmniRoute-only — never port AWAY from these          |

When a port touches an `(no equivalent)` row downstream, the upstream
change either does not apply, OR you must wire it through one of those
layers. Flag in the task note.

## Execution

### Step 0 — Sanity + setup

```bash
git -C . remote get-url origin       # must end in diegosouzapw/OmniRoute
git branch --show-current            # must be release/vX.Y.Z (or create one via /generate-release)
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

If on `main`, follow `/generate-release` Phase 1 steps 1–5 to create the
next `release/vX.Y.Z` first.

### Step 1 — Discover (only if no $ARGUMENTS) — two-step harvest

`gh ... --json` can silently truncate large result sets. Use the
numbers-only → batched-metadata pattern:

```bash
TARGETS="_tasks/features-v${VERSION}/port-tasks/_discovery.txt"

# 1a — numbers only, never truncated
gh pr list --repo decolua/9router --state open --limit 500 \
  --json number --jq '.[].number' \
  > "$TARGETS"

# 1b — full metadata per PR, batched
while read N; do
  gh pr view "$N" --repo decolua/9router \
    --json number,title,author,createdAt,additions,deletions,labels,mergeable
done < "$TARGETS" > "_tasks/features-v${VERSION}/port-tasks/_discovery.jsonl"

# 1c — open upstream issues for cross-reference (which PR closes which issue)
gh issue list --repo decolua/9router --state open --limit 500 \
  --json number,title --jq 'sort_by(.number)' \
  > "_tasks/features-v${VERSION}/port-tasks/_open_issues.json"
```

Group results by intent (fix / feat / chore / docs), summarise risk and
size, then ask the user which PRs to port. Wait for explicit selection.

### Step 2 — Per-PR analysis (loop)

For each PR — first normalize input (URL → bare number) and run a dedupe
pre-check BEFORE any expensive fetch / diff work:

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

Then fetch metadata, diff, commits, author:

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

Read the diff. Map each upstream file to its OmniRoute equivalent using
the **architecture mapping** table above. Note local commits that overlap
(`git log --oneline -- <our-path>`) and any `_references/9router/<path>`
file you needed to read for source-of-truth context.

Write a task note at
`_tasks/features-v${VERSION}/port-tasks/<seq>-<short-kebab>.plan.md`.
Sequence number = `printf "%02d" $((max_existing + 1))` (zero-padded so
files sort lexicographically). Required fields:

- Upstream source (PR #, title, author, first-commit author identity)
- Files touched (upstream → OmniRoute, per the architecture mapping)
- JS→TS conversion notes
- Dependencies added (npm packages)
- Schema / migration impact
- i18n keys added (with locale coverage checklist)
- OmniRoute-only layers impacted (a2a / memory / cloudAgent / guardrails / evals)
- Selected strategy (A / B / C — see Step 4)
- Closing upstream issues (via GraphQL `closingIssuesReferences`)
- Attribution checklist

### Step 3 — Present plan and wait

Summarise all task notes to the user: total LOC, blockers, recommended
order, and explicitly flag:

- New dependencies in `package.json`
- DB migrations (and how they interact with the 55 existing migrations)
- New i18n keys (MUST be added in ALL locales — `src/i18n/` + `public/i18n/literals/`)
- Any change to `src/app/api/v1/...` route shapes (public surface)
- Any change to `src/shared/contracts/` (downstream consumers)
- OmniRoute-only layers impacted

**Do not touch code until the user names which PRs to port.**

### Step 4 — Implement (one worktree per PR)

For each approved PR:

```bash
BRANCH="feat/port-pr-${N}-<short>"     # or fix/port-pr-... matching upstream intent
git worktree add ".claude/worktrees/${BRANCH}" -b "$BRANCH" "$RELEASE_BRANCH"
cd ".claude/worktrees/${BRANCH}"
npm install
```

**Strategy decision tree** (record choice in task note):

| Condition                                                  | Strategy                                  |
| ---------------------------------------------------------- | ----------------------------------------- |
| Upstream change is JS code → needs TS rewrite (the common case) | **A — Manual re-implementation** (default) |
| Upstream is already TS-compatible AND file paths align 1:1 | **B — Cherry-pick with adaptation**       |
| Docs / config / static-asset-only (no executable code)     | **C — Direct apply**                      |

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

Keep / port upstream tests. Translate them to OmniRoute test conventions
(`tests/unit/*.test.ts` using `node:test`; MCP via `vitest.mcp.config.ts`).

### Step 5 — Validate (mandatory)

```bash
npm run check                 # lint + test:unit
npm run typecheck:core
npm run typecheck:noimplicit:core
npm run test:vitest
npm run check:docs-all
npm run check:cycles          # always — ports often introduce cross-layer imports
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

If the diff touches `src/app/(dashboard)/` (UI), manual smoke is
**mandatory** per CLAUDE.md "For UI or frontend changes":

```bash
npm run dev   # http://localhost:20128
# Exercise the new/changed UI in a browser. Verify the golden path AND
# at least one edge case. Watch the console for regressions in other tabs.
# For release-evidence capture, run /capture-release-evidences afterwards.
```

No `--no-verify`. No weakening of tests. If something fails, fix the root
cause.

### Step 6 — Commit with attribution

```bash
git commit -m "$(cat <<'EOF'
<type>(<scope>): <description>

<optional body — root cause / mechanism / user-visible effect>

Co-authored-by: <Original Author Name> <author@email>
Inspired-by: https://github.com/decolua/9router/pull/<N>
EOF
)"
```

- The `Inspired-by` link is the ONLY place the upstream PR is referenced.
  It MUST NOT appear in the PR body or `CHANGELOG.md`.
- The `Co-authored-by` trailer credits the **human** upstream author.
  This is allowed and expected by CLAUDE.md hard rule #16 — that rule
  bans AI/bot trailers (Claude / GPT / Copilot / etc.), not humans.
- Use lowercase `Co-authored-by:` (GitHub canonical render form).

### Step 7 — Update CHANGELOG.md (inside the PR, no upstream link)

In the worktree, append to the current release's section in `CHANGELOG.md`:

```markdown
- **<type>(<scope>):** <description>. (thanks @<upstream-username>)
```

Commit this change in the same PR — either as a separate commit or amended
into the feat/fix commit (operator choice). Credit the upstream author
naturally as a direct contributor; **never** reference the upstream PR URL
or `decolua/9router` here.

### Step 8 — Push & open PR

> **⚠️ ALWAYS pass `--repo diegosouzapw/OmniRoute`.** Without it,
> `gh pr create` defaults to the **parent** of a GitHub fork — here that
> is upstream `decolua/9router`. Verified gotcha (2026-05-23 on
> ghostty-web): a bare `gh pr create` opened a PR on the upstream
> tracker by accident. Always set `--repo` and verify with
> `gh pr view <N> --repo diegosouzapw/OmniRoute` after creation.

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

# Record in dedupe ledger (Step 2 reads this on next run)
echo "{\"upstream\":${N},\"our_pr\":\"${OUR_PR_URL}\",\"branch\":\"${BRANCH}\",\"at\":\"$(date -Iseconds)\"}" \
  >> "_tasks/features-v${VERSION}/port-tasks/_ported.jsonl"
```

Return the PR URL to the user.

### Step 9 — Cleanup (after merge / abandonment)

```bash
PR_STATE=$(gh pr view "$OUR_PR_URL" --json state --jq .state)
git worktree remove ".claude/worktrees/${BRANCH}"
if [ "$PR_STATE" = "MERGED" ]; then
  git branch -d "$BRANCH"
else
  echo "PR not merged (state=$PR_STATE) — keeping branch '$BRANCH'"
fi
```

Task note and ledger entry in `_tasks/features-v${VERSION}/port-tasks/`
stay as durable local documentation.

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
- Never overwrite a previously-ported PR — the Step 2 dedupe guard
  (JSONL + git log on `Inspired-by:`) exists for this; never disable it.
- Verify subagent work yourself per CLAUDE.md: `git status` + `git diff
  --stat`, sanity-check scope, and re-run the full validation suite
  before accepting any agent-authored change.
- License gate is enforced in Step 0; if the upstream LICENSE blob hash
  changes between sessions, re-confirm before continuing.
