---
title: Merge Queue & Manual Merge-Train Runbook
---

# Merge Queue & Manual Merge-Train Runbook

Since v3.8.49 (WS3.2/WS3.4 of the quality/velocity plan) the default merge path for
reviewed PRs into `release/vX.Y.Z` is the **Mergify merge queue** (`.mergify.yml`);
the **manual merge-train** documented below is the FALLBACK — used during incidents,
release freezes, or if the Mergify Open Source plan ever changes.

## Default path: the Mergify queue

1. PR is reviewed/greened by the campaigns and approved by the owner's pre-merge ⭐
   gate (the report + per-item decision — see `/merge-prs` Step 0.75).
2. The owner (or the session acting on the owner's decision) applies the **`queue`**
   label. The label IS the merge approval; Mergify only executes it.
3. Mergify batches up to 10 queued PRs, validates the batch against the fast-gates,
   and merges (squash). A red batch is **bisected automatically** — the offending PR
   is isolated in ~log2(N) revalidations and unqueued; the rest proceed.
4. Post-merge, the continuous release-green workflow validates the new tip on push
   and opens an attribution issue if the combination regressed (never auto-revert).

Guardrails (mirror `CLAUDE.md` Hard Rules #21/#22):

- **Release freeze open** → do NOT label PRs targeting the frozen branch; retarget to
  the active `release/vX+1` first.
- **Another session's in-flight PR** → never label it; only the owning session queues
  its own work.
- Tests-only diffs and `hotfix`-labeled PRs already run reduced CI (see
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); the queue conditions accept whatever
  check set actually ran (`#check-failure=0` + `#check-pending=0`).

## Fallback: the manual merge-train

Used when the queue is unavailable. This codifies the practice that drained 33 PRs in
one day during the v3.8.47 cycle:

1. **Assemble the batch** (~10–30 reviewed+approved PRs). Check `linked:` collisions
   (same `tap.testFiles`, same CHANGELOG hunks) and serialize those.
2. **Validate ONCE**: in an isolated worktree off the release tip, merge all batch
   heads locally, then run the release-equivalent suite
   (`npm run check:release-green`, add `--with-build` before a release).
   `scripts/release/merge-train.sh <base> <PR#>…` automates steps 1–2 (conflicting
   PRs eject, the train continues). Full mode runs `npm run test:unit` — the
   box-tuned runner (`--test-concurrency=20`), **not** the two sequential 4-core CI
   shards, which drove the dominant phase at ~25% of a 16-core box (fixed
   2026-07-18). `--fast` (intra-day mega-train drains, owner-approved 2026-07-18)
   keeps every static gate + vitest but runs only the node:test files changed by the
   boarded PRs; the FULL suite must still run at least once per day on the
   accumulated tip (one train without `--fast`).
3. **Green** → merge the PRs in sequence (re-checking `state,headRefOid` before each —
   a PR whose head moved re-enters review). Prove the net diff of each merge is the
   PR's own change (no auto-resolve reverts: audit `git diff --stat` for
   out-of-scope deletions).
4. **Red** → bisect the batch by halves (validate each half) instead of re-validating
   one-by-one; drop the offending PR back to the review queue with the evidence.
5. **Never**: merge during a freeze into the frozen branch; `git stash` anywhere;
   blanket-rerun CI hoping a red goes away (rule: a red is information).

## Tiering (why the queue is safe with fast-gates only)

- **Per PR** (quality.yml fast-gates): TIA-impacted tests + full unit 4-shard +
  vitest + lint bag + typecheck + docs/changelog integrity.
- **Per batch/tip** (continuous release-green): `--quick` HARD gates on every push to
  the release branch; full `--with-build --full-ci` sweeps 3×/day.
- **Per release** (ci.yml on the release PR): the complete matrix incl. E2E ×9,
  package-artifact + tarball boot-smoke, coverage/ratchets.

Nothing is validated less than before — the heavy surface just runs per batch/tip
instead of per PR, which is what removes the O(N) round-trips.
