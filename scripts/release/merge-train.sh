#!/usr/bin/env bash
# scripts/release/merge-train.sh — batch-validate N queued PRs as ONE merged result.
#
# Why: in a merge-storm, waiting for each PR's CI after each sibling merge costs
# O(N²) CI runs. The train merges every queued PR into a throwaway worktree cut from
# the release tip, runs the fast-gates parity suite ONCE on the final result, and
# prints the evidence block that authorizes `gh pr merge --squash --admin` for each
# train member (merge-gates.md §7 — owner-approved policy extension of §4, 2026-07-09).
#
# Designed for the 32-core runner box (192.168.0.113) or any checkout with
# node_modules. It only READS from origin — it never pushes, never merges PRs, never
# touches other worktrees, and never uses `git stash` (Hard Rule #22a).
#
# Usage:
#   scripts/release/merge-train.sh [--plan] [--fast] <base-branch> <PR#> [<PR#>...]
#     --plan   print the planned steps and exit 0 (no worktree, no network) — used by
#              the unit test and for a quick sanity read.
#     --fast   fast parity mode (owner-approved 2026-07-18): full static gates + the
#              node:test files CHANGED by the boarded PRs + vitest, instead of the
#              full unit suite. For intra-day mega-train drains. The FULL suite must
#              still run at least once per day on the accumulated tip (one train
#              without --fast, or `npm run test:unit` on the tip) — fast evidence
#              lines say so explicitly.
#
# Speed note (2026-07-18): full mode runs `npm run test:unit` (box-tuned,
# --test-concurrency=20). The previous two SEQUENTIAL `test:unit:ci:shard` runs
# (--test-concurrency=4 each, sized for 4-core GH runners) drove the dominant phase
# at ~25% of a 16-core devbox (~2.5h suite → ~30-40min).
#
# Exit codes: 0 = suite green (evidence printed); 1 = usage error; 2 = suite red;
#             PRs whose merge conflicts are EJECTED (reported, train continues).
#             A static gate already red on origin/<base> with the SAME violations is
#             reported as INHERITED and does NOT stop the train (merge-gates.md §3);
#             exit 0 still happens, and the summary lists every inherited gate.
set -euo pipefail

PLAN=0
FAST=0
while [ $# -gt 0 ]; do
  case "$1" in
    --plan) PLAN=1; shift ;;
    --fast) FAST=1; shift ;;
    --*) echo "error: unknown flag '$1'" >&2; exit 1 ;;
    *) break ;;
  esac
done

if [ $# -lt 2 ]; then
  echo "usage: $0 [--plan] [--fast] <base-branch> <PR#> [<PR#>...]" >&2
  exit 1
fi

BASE="$1"
shift
PRS=("$@")
for N in "${PRS[@]}"; do
  case "$N" in
    ''|*[!0-9]*) echo "error: PR number '$N' is not numeric" >&2; exit 1 ;;
  esac
done

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
# The train worktree is detached, so the changelog gate cannot infer which release
# branch seeded it. Shell-quote the requested base before it enters the eval-backed
# gate list, then bind that exact ref only for the changelog check.
printf -v CHANGELOG_BASE_REF_Q '%q' "origin/${BASE}"
STATIC_GATES=(
  "npm run typecheck:core"
  "node scripts/check/check-file-size.mjs"
  "node scripts/check/check-complexity.mjs"
  "node scripts/check/check-cognitive-complexity.mjs"
  "env CHANGELOG_BASE_REF=${CHANGELOG_BASE_REF_Q} node scripts/check/check-changelog-integrity.mjs"
  # i18n contract (2026-09-22): the train is where en.json keys without catalogs and docs
  # without mirrors slipped into the release tip three times in 48 h despite the PR CI —
  # each combined tree must carry every en key in all 65 catalogs (UI + CLI), keep the
  # real-translation ratio, and bring the mirrors of every doc it edits (section-level:
  # `npm run i18n:run -- --files=<doc>`; UI keys: `npm run i18n:translate-new-keys`).
  "npm run i18n:check-keys"
  "npm run i18n:check-keys:cli"
  "npm run i18n:check-ratio"
  "node scripts/i18n/check-translation-drift.mjs"
  # ci.yml:lint family (2026-09-22): the same lesson as the i18n block above, for the
  # rest of the lint job. A 170-PR drain left the tip red on eleven `ci.yml:lint` /
  # `docs-sync-strict` gates the train never ran — every PR was green on its own and
  # only the combined tree failed. The migration one alone cost a 226-test red (two
  # boarded PRs both claiming version 181). Kept under ~1 min total on the devbox;
  # anything slower lives in FULL_ONLY_GATES.
  "npm run check:migration-numbering"   # ~3s  — two boarded PRs claiming one version
  "npm run check:env-doc-sync"          # ~4s  — process.env added without .env.example
  "npm run check:route-validation:t06"  # ~4s  — new route without Zod validation
  "npm run check:db-rules"              # ~5s  — raw SQL outside src/lib/db
  "npm run check:vitest-exclusions"     # ~2s  — stale vitest exclusion entries
  "npm run check:tracked-artifacts"     # ~3s  — a boarded PR tracking a root _* path
  "npm run check:cycles"                # ~2s  — an import cycle only the merged tree closes
  "npm run check:provider-consistency"  # ~2s  — registry/catalog drift across PRs
  "npm run check:error-helper"          # ~17s — raw err.message reaching a response body
  "npm run check:known-symbols"         # ~27s — a symbol one PR removes and another still uses
)
# Same class, but minutes each — FULL mode only, so an intra-day `--fast` train stays
# fast. The daily FULL run (see the header) is where these earn their keep.
FULL_ONLY_GATES=(
  "npm run check:agent-skills-sync"       # ~76s  — generated SKILL.md out of date
  "npm run check:route-guard-membership"  # ~46s  — new local-only route left unclassified
  "npm run check:docs-counts"             # ~164s — README/AGENTS/llm.txt counts vs code
  "npm run check:dashboard-typecheck"     # minutes — TS errors under the dashboard tsconfig
)
# Full mode: the box-speed runner (same coverage as the two CI shards combined —
# main + dashboard + serial groups — at local concurrency instead of runner-sized).
UNIT_FULL="npm run test:unit"
VITEST="npm run test:vitest"

if [ "$PLAN" = "1" ]; then
  MODE="full"
  [ "$FAST" = "1" ] && MODE="fast"
  echo "[merge-train] PLAN (${MODE}) — base=origin/${BASE} prs=${PRS[*]}"
  echo "[merge-train] 1. worktree add .claude/worktrees/merge-train-<ts> --detach origin/${BASE}"
  for N in "${PRS[@]}"; do
    echo "[merge-train] 2. fetch origin pull/${N}/head && merge (conflict → EJECT #${N}, continue)"
  done
  i=3
  for c in "${STATIC_GATES[@]}"; do
    echo "[merge-train] ${i}. ${c}"
    i=$((i + 1))
  done
  if [ "$FAST" != "1" ]; then
    for c in "${FULL_ONLY_GATES[@]}"; do
      echo "[merge-train] ${i}. ${c}"
      i=$((i + 1))
    done
  fi
  if [ "$FAST" = "1" ]; then
    echo "[merge-train] ${i}. (fast) run node:test files changed by the boarded PRs (main/dashboard/serial buckets)"
  else
    echo "[merge-train] ${i}. ${UNIT_FULL}"
  fi
  i=$((i + 1))
  echo "[merge-train] ${i}. ${VITEST}"
  i=$((i + 1))
  echo "[merge-train] ${i}. a red static gate is re-run on origin/${BASE}: same violations → reported"
  echo "[merge-train]     as INHERITED and the train continues; any ADDED violation, more violation"
  echo "[merge-train]     lines, or no recognisable violation line (fail-closed) → exit 2"
  i=$((i + 1))
  echo "[merge-train] ${i}. green → print --admin evidence per PR; red → exit 2 (bisect + eject)"
  echo "[merge-train] ${i}. teardown: git worktree remove --force (trap EXIT)"
  exit 0
fi

if [ -z "$ROOT" ]; then
  echo "error: not inside a git checkout" >&2
  exit 1
fi

TS="$(date +%Y%m%d-%H%M%S)"
WT="$ROOT/.claude/worktrees/merge-train-$TS"
LOG="$WT-suite.log"

BASE_WT="$WT-base"
BASE_LOG="$WT-base.log"

cleanup() {
  git -C "$ROOT" worktree remove --force "$WT" 2>/dev/null || true
  git -C "$ROOT" worktree remove --force "$BASE_WT" 2>/dev/null || true
}
trap cleanup EXIT

echo "[merge-train] fetching origin/${BASE}…"
git -C "$ROOT" fetch origin "$BASE" --quiet
git -C "$ROOT" worktree add --detach "$WT" "origin/$BASE" --quiet
# reuse the main checkout's node_modules (same convention as dev worktrees)
[ -e "$WT/node_modules" ] || ln -s "$ROOT/node_modules" "$WT/node_modules"

EJECTED=()
BOARDED=()
for N in "${PRS[@]}"; do
  echo "[merge-train] boarding #${N}…"
  if ! git -C "$WT" fetch origin "pull/${N}/head" --quiet; then
    echo "[merge-train] ✗ #${N} EJECTED — could not fetch pull/${N}/head"
    EJECTED+=("$N")
    continue
  fi
  if git -C "$WT" merge FETCH_HEAD --no-edit --quiet >/dev/null 2>&1; then
    BOARDED+=("$N")
  else
    git -C "$WT" merge --abort 2>/dev/null || true
    echo "[merge-train] ✗ #${N} EJECTED — merge conflict vs the train (route it through the normal §5 path)"
    EJECTED+=("$N")
  fi
done

if [ ${#BOARDED[@]} -eq 0 ]; then
  echo "[merge-train] no PR boarded — nothing to validate." >&2
  exit 1
fi

TIP="$(git -C "$WT" rev-parse HEAD)"
EJ_MSG=""
[ ${#EJECTED[@]} -gt 0 ] && EJ_MSG=" — ejected: ${EJECTED[*]}"
echo "[merge-train] train tip ${TIP} — boarded: ${BOARDED[*]}${EJ_MSG}"
echo "[merge-train] running parity suite (log: ${LOG})…"

# A red gate is only the train's fault when it is GREEN on the untouched base.
# Before 2026-09-22 the train aborted on the first red and the operator re-derived
# that by hand every time — which is how a 170-PR drain stalled behind gates that
# were already red on the release tip (docs counts, mutation coverage, two API
# typecheck errors). merge-gates.md §3 says to reproduce a failure on
# `origin/<base>` before calling it inherited; this does exactly that, automatically.
#
# Only the `npm run check:*` static gates are discriminated. The unit/vitest gates
# run files the boarded PRs added, which do not exist on the base at all, so a red
# there means "file not found", not "inherited" — those still abort and the
# operator bisects as before.
INHERITED=()

base_probe_ready() {
  [ -d "$BASE_WT" ] && return 0
  git -C "$ROOT" worktree add --detach "$BASE_WT" "origin/$BASE" --quiet || return 1
  # Hard links (repo convention, AGENTS.md → Worktree isolation), not a symlink. If
  # the link count limit bites ("Too many links"), drop the partial tree and fall back.
  if [ ! -e "$BASE_WT/node_modules" ]; then
    cp -al "$ROOT/node_modules" "$BASE_WT/node_modules" 2>/dev/null || {
      rm -rf "$BASE_WT/node_modules"
      ln -s "$ROOT/node_modules" "$BASE_WT/node_modules"
    }
  fi
  return 0
}

# A gate run's failure signature: the lines it marks as violations — the ✗/✖/×/FAIL/✘
# markers the check:* scripts print, plus tsc's `error TS1234` diagnostics (the
# typecheck gates, e.g. dashboard-typecheck, print no marker prefix at all). The
# train's red counts as INHERITED only when every violation line also appears on the
# base AND the train has no more violation lines than the base — a train that ADDS one
# owns a genuine red even though the gate was already failing, and that is precisely
# the case a bare "it was red before" waves through.
GATE_ERROR_RE='^[[:space:]]*(✗|✖|×|FAIL|✘)|error TS[0-9]+'
gate_violations() {
  grep -aE "$GATE_ERROR_RE" "$1" 2>/dev/null | sed 's/^[[:space:]]*//' | sort -u
}
gate_violation_count() {
  grep -acE "$GATE_ERROR_RE" "$1" 2>/dev/null || true
}
# classify_gate_red TRAIN_LOG BASE_LOG — called only when the gate is red on BOTH the
# train and the base. Prints the verdict (first line) and returns 0 ONLY for INHERITED.
# Fail-CLOSED: a red whose output yields no recognisable violation line cannot be
# proven identical to the base, so it is UNCLASSIFIABLE and the train owns it (an empty
# set on both sides used to read as "no added violations" — rework 2026-09-23).
classify_gate_red() {
  local added tc bc
  if [ -z "$(gate_violations "$1")" ]; then
    echo "UNCLASSIFIABLE"
    echo "no violation line matched ${GATE_ERROR_RE} — cannot prove it matches the base"
    return 1
  fi
  added="$(comm -23 <(gate_violations "$1") <(gate_violations "$2") || true)"
  if [ -n "$added" ]; then
    printf 'NEW\n%s\n' "$added"
    return 1
  fi
  tc="$(gate_violation_count "$1")"
  bc="$(gate_violation_count "$2")"
  if [ "${tc:-0}" -gt "${bc:-0}" ]; then
    echo "NEW"
    echo "violation-line count grew on the train: ${bc:-0} → ${tc:-0}"
    return 1
  fi
  echo "INHERITED"
  return 0
}

run_gate() {
  local c="$1"
  local discriminate="${2:-0}"
  local before
  before="$(wc -l <"$LOG" 2>/dev/null || echo 0)"
  echo "[merge-train] ▶ $(date +%H:%M:%S) ${c}"
  if (cd "$WT" && eval "$c") >>"$LOG" 2>&1; then
    return 0
  fi

  if [ "$discriminate" = "1" ] && base_probe_ready; then
    tail -n "+$((before + 1))" "$LOG" >"$LOG.gate" 2>/dev/null || : >"$LOG.gate"
    echo "[merge-train]   … red — re-running it on the untouched origin/${BASE} to classify"
    : >"$BASE_LOG"
    if (cd "$BASE_WT" && eval "$c") >>"$BASE_LOG" 2>&1; then
      echo "[merge-train] ✗ SUITE RED at: ${c} — GREEN on origin/${BASE}: the train owns this." >&2
    else
      local verdict
      if verdict="$(classify_gate_red "$LOG.gate" "$BASE_LOG")"; then
        echo "[merge-train] ⚠ INHERITED base-red (same violations on origin/${BASE}) — continuing: ${c}"
        INHERITED+=("$c")
        return 0
      fi
      echo "[merge-train] ✗ SUITE RED at: ${c} — red on the base too, but ${verdict%%$'\n'*}:" >&2
      printf '%s\n' "$verdict" | tail -n +2 | sed 's/^/[merge-train]     + /' >&2
    fi
  fi

  echo "[merge-train] ✗ SUITE RED at: ${c}" >&2
  echo "[merge-train] tail of ${LOG}:" >&2
  tail -30 "$LOG" >&2
  echo "[merge-train] bisect: re-run the failing gate on intermediate train commits, eject the offender, re-run." >&2
  exit 2
}

for c in "${STATIC_GATES[@]}"; do
  run_gate "$c" 1
done
# The minutes-long members of the same family run only in FULL mode.
if [ "$FAST" != "1" ]; then
  for c in "${FULL_ONLY_GATES[@]}"; do
    run_gate "$c" 1
  done
fi

if [ "$FAST" = "1" ]; then
  # node:test files changed by the boarded PRs (tests/unit/**/*.test.{ts,mjs};
  # tests/unit/ui/*.test.tsx belongs to the vitest-ui runner, not node:test).
  mapfile -t CHANGED < <(git -C "$WT" diff --name-only "origin/${BASE}" HEAD -- 'tests/unit' \
    | grep -E '\.test\.(ts|mjs)$' || true)
  # Subdirs test:unit actually runs (package.json allowlist) — anything else under
  # tests/unit/<sub>/ belongs to another runner (e.g. autoCombo -> vitest).
  UNIT_SUBDIRS=",api,auth,authz,build,cli,cli-helper,combo,compression,correctness,cors,db,db-adapters,docs,gamification,guardrails,lib,mcp,memory,runtime,security,services,settings,shared,translator,ui,usage,"
  MAIN=()
  DASH=()
  SERIAL=()
  for f in "${CHANGED[@]}"; do
    [ -f "$WT/$f" ] || continue # deleted by a boarded PR
    case "$f" in
      tests/unit/dashboard/*) DASH+=("$f") ;;
      tests/unit/serial/*) SERIAL+=("$f") ;;
      *.test.mjs) MAIN+=("$f") ;; # tests/unit/**/*.test.mjs runs from any subdir
      tests/unit/*/*)
        sub="${f#tests/unit/}"; sub="${sub%%/*}"
        case "$UNIT_SUBDIRS" in
          *",${sub},"*) MAIN+=("$f") ;;
          *) echo "[merge-train] (fast) skip ${f} — subdir '${sub}' not in test:unit (other runner)" ;;
        esac ;;
      *) MAIN+=("$f") ;;
    esac
  done
  # Mirror package.json's three test:unit groups exactly (loader + concurrency).
  if [ ${#MAIN[@]} -gt 0 ]; then
    run_gate "DISABLE_SQLITE_AUTO_BACKUP=true node --max-old-space-size=8192 --import tsx/esm --import ./open-sse/utils/setupPolyfill.ts --import ./tests/_setup/isolateDataDir.ts --test --test-force-exit --test-concurrency=20 ${MAIN[*]}"
  fi
  if [ ${#DASH[@]} -gt 0 ]; then
    run_gate "DISABLE_SQLITE_AUTO_BACKUP=true node --max-old-space-size=8192 --import tsx --import ./open-sse/utils/setupPolyfill.ts --import ./tests/_setup/isolateDataDir.ts --test --test-force-exit --test-concurrency=20 ${DASH[*]}"
  fi
  if [ ${#SERIAL[@]} -gt 0 ]; then
    run_gate "DISABLE_SQLITE_AUTO_BACKUP=true node --max-old-space-size=8192 --import tsx/esm --import ./open-sse/utils/setupPolyfill.ts --import ./tests/_setup/isolateDataDir.ts --test --test-force-exit --test-concurrency=1 ${SERIAL[*]}"
  fi
  if [ ${#MAIN[@]} -eq 0 ] && [ ${#DASH[@]} -eq 0 ] && [ ${#SERIAL[@]} -eq 0 ]; then
    echo "[merge-train] (fast) no changed node:test files under tests/unit — static gates + vitest only"
  fi
else
  run_gate "$UNIT_FULL"
fi

run_gate "$VITEST"

MODE_NOTE="suite green"
[ "$FAST" = "1" ] && MODE_NOTE="FAST gates green: static + changed tests + vitest — daily full-suite run still required"
if [ ${#INHERITED[@]} -gt 0 ]; then
  MODE_NOTE="${MODE_NOTE}; ${#INHERITED[@]} gate(s) inherited-red from origin/${BASE}"
  echo "[merge-train] ✅ SUITE GREEN on ${TIP} — except ${#INHERITED[@]} gate(s) already red on origin/${BASE}:"
  for c in "${INHERITED[@]}"; do
    echo "[merge-train]   ⚠ ${c}"
  done
  echo "[merge-train] those are NOT this train's defect (identical violations on the base), but the"
  echo "[merge-train] base stays red until they are drained — track them before the next release."
else
  echo "[merge-train] ✅ SUITE GREEN on ${TIP}"
fi
echo "[merge-train] evidence line for each PR (paste before gh pr merge --squash --admin):"
for N in "${BOARDED[@]}"; do
  echo "  #${N}: Validated in local merge-train ${LOG} on $(hostname) @ ${TIP} (${MODE_NOTE})"
done
[ ${#EJECTED[@]} -gt 0 ] && echo "[merge-train] ejected (need the normal path): ${EJECTED[*]}"
exit 0
