#!/usr/bin/env node
// Refuse a pull request that targets its own head branch.
//
// WHY: PR #8912 has head == base == release/v3.8.50 — a PR from a branch to itself. It has no
// diff, it can never merge, and GitHub keeps it in the queue forever with a full check board
// attached. It survived because nothing looks wrong: the checks are green (there is nothing to
// check), the mergeability just reads "unknown", and it quietly costs review attention and CI
// minutes on every push to that branch.
//
// The check is one field comparison, which is the point — it is cheaper than the confusion.
//
// Usage (in CI, inside a pull_request job):
//   HEAD_REF="$GITHUB_HEAD_REF" BASE_REF="$GITHUB_BASE_REF" \
//   HEAD_SHA=... BASE_SHA=... node scripts/check/check-pr-self-target.mjs
// Exit: 0 when the PR is well-formed or there is no PR context, 1 when it targets itself.

import fs from "node:fs";
import { fileURLToPath } from "node:url";

/**
 * Classify a PR's head/base pair.
 *
 * Both signals are checked because either alone can be absent: `*_REF` is empty for
 * cross-fork events in some contexts, and the SHAs coincide on a freshly branched PR that is
 * NOT self-targeting (branch cut, nothing pushed yet) — so an equal-SHA alone must not fail.
 * Only an equal REF is conclusive; equal SHAs are reported as a warning.
 */
export function classifyPrTarget({ headRef, baseRef, headSha, baseSha } = {}) {
  const hr = String(headRef ?? "").trim();
  const br = String(baseRef ?? "").trim();
  const hs = String(headSha ?? "").trim();
  const bs = String(baseSha ?? "").trim();

  if (!hr && !br) return { verdict: "no-pr-context" };

  if (hr && br && hr === br) {
    return {
      verdict: "self-targeting",
      reason: `head and base are the same branch (${hr}) — this PR has no diff and can never merge`,
    };
  }

  if (hs && bs && hs === bs) {
    // Legitimate right after cutting a branch: the tip has not moved yet. Not a failure.
    return {
      verdict: "empty-diff",
      reason: `head and base point at the same commit (${hs.slice(0, 10)}) — nothing to review yet`,
    };
  }

  return { verdict: "ok" };
}

function main() {
  const r = classifyPrTarget({
    headRef: process.env.HEAD_REF,
    baseRef: process.env.BASE_REF,
    headSha: process.env.HEAD_SHA,
    baseSha: process.env.BASE_SHA,
  });

  if (r.verdict === "self-targeting") {
    process.stderr.write(
      `::error::PR targets its own branch — ${r.reason}.\n` +
        `Close it, or repoint the base at the branch you actually want to merge into ` +
        `(gh pr edit <N> --base <branch>, then VERIFY with gh pr view <N> --json baseRefName — ` +
        `the edit fails silently).\n`
    );
    return 1;
  }

  if (r.verdict === "empty-diff") {
    process.stdout.write(`::warning::${r.reason}.\n`);
    return 0;
  }

  process.stdout.write(
    r.verdict === "no-pr-context"
      ? "[pr-self-target] no PR context — skipping.\n"
      : "[pr-self-target] OK — head and base differ.\n"
  );
  return 0;
}

if (
  process.argv[1] &&
  fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url))
) {
  process.exit(main());
}
