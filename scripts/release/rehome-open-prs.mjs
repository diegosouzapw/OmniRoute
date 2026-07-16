#!/usr/bin/env node
// scripts/release/rehome-open-prs.mjs
//
// Parallel-cycle PR re-home (generate-release Phase 0a.0b, step 3).
// Retargets every open PR whose base is the FROZEN release/v<CURRENT> onto the
// freshly cut release/v<NEXT>, so development keeps flowing while the captain
// owns the frozen branch. Design: _tasks/release-flow/2026-07-04_proposta-ciclo-paralelo-v2.md
//
// Usage:
//   node scripts/release/rehome-open-prs.mjs <current> <next> [--dry-run]
//   e.g. node scripts/release/rehome-open-prs.mjs 3.8.49 3.8.50
//
// WHY THIS EXISTS AS A SCRIPT AND NOT A `gh pr edit` LOOP IN THE SKILL:
//
//   1. `gh pr edit --base` FAILS SILENTLY (v3.8.42 lesson). It exits 0 while
//      leaving the base untouched — so every edit MUST be read back with
//      `gh pr view --json baseRefName`. A hand-run loop skips that under
//      fatigue; this does not.
//   2. Volume. At the v3.8.49 freeze there were 148 open PRs on the release
//      branch — ~450 API calls between edit, verify and comment. That is not a
//      thing a human does reliably at 2am mid-release.
//   3. `gh pr list` defaults to **30 results**. A loop written without
//      `--limit` silently re-homes the first 30 and reports success.
//
// Idempotent: a PR already based on release/v<next> is skipped, so a resumed
// release re-runs this safely.
//
// NOT covered here (by design): PRs opened AFTER this runs. Those are handled
// by flipping the repo's default_branch to release/v<next> at 0a.0b — see the
// skill. Contributors open PRs against the default branch; if that still points
// at `main`, they never target a release branch at all.

import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const REPO = "diegosouzapw/OmniRoute";

function gh(args, { allowFail = false } = {}) {
  try {
    return execFileSync("gh", args, { encoding: "utf8" }).trim();
  } catch (err) {
    if (allowFail) return null;
    throw new Error(`gh ${args.join(" ")} failed: ${err.stderr || err.message}`);
  }
}

/**
 * Pure: classify what should happen to a PR given its current base.
 * Split out so the decision is unit-testable without touching the network.
 */
export function classify(pr, currentBase, nextBase) {
  if (pr.baseRefName === nextBase) return { action: "skip", reason: "already re-homed" };
  if (pr.baseRefName !== currentBase) {
    return { action: "skip", reason: `base is ${pr.baseRefName}, not the frozen branch` };
  }
  if (pr.isDraft) return { action: "retarget", reason: "draft — retarget anyway, it still needs a home" };
  return { action: "retarget", reason: "open PR on the frozen branch" };
}

function main(argv) {
  const dryRun = argv.includes("--dry-run");
  const [current, next] = argv.filter((a) => !a.startsWith("--"));

  if (!current || !next) {
    console.error("Usage: node scripts/release/rehome-open-prs.mjs <current> <next> [--dry-run]");
    console.error("   e.g. node scripts/release/rehome-open-prs.mjs 3.8.49 3.8.50");
    process.exit(2);
  }

  const currentBase = `release/v${current}`;
  const nextBase = `release/v${next}`;

  // The next branch MUST exist before we point anything at it, or every edit
  // 422s and we have re-homed nothing while reporting progress.
  const exists = gh(["api", `repos/${REPO}/branches/${nextBase}`, "--jq", ".name"], {
    allowFail: true,
  });
  if (!exists) {
    console.error(`✖ ${nextBase} does not exist on origin — cut it first (0a.0b step 1).`);
    process.exit(1);
  }

  // --limit 300: `gh pr list` returns 30 by default. Without this the loop
  // silently re-homes a third of the queue and exits 0.
  const raw = gh([
    "pr", "list", "--repo", REPO, "--state", "open", "--limit", "300",
    "--base", currentBase, "--json", "number,title,isDraft,baseRefName",
  ]);
  const prs = JSON.parse(raw);

  console.log(`${prs.length} open PR(s) on ${currentBase} → ${nextBase}${dryRun ? "  [DRY RUN]" : ""}\n`);

  const failed = [];
  let moved = 0;
  let skipped = 0;

  for (const pr of prs) {
    const { action, reason } = classify(pr, currentBase, nextBase);
    if (action === "skip") {
      console.log(`  ·  #${pr.number} skipped — ${reason}`);
      skipped++;
      continue;
    }
    if (dryRun) {
      console.log(`  →  #${pr.number} would retarget — ${reason}`);
      moved++;
      continue;
    }

    gh(["pr", "edit", String(pr.number), "--repo", REPO, "--base", nextBase], { allowFail: true });

    // The read-back is the whole point: `gh pr edit --base` exits 0 on failure.
    const actual = gh(
      ["pr", "view", String(pr.number), "--repo", REPO, "--json", "baseRefName", "--jq", ".baseRefName"],
      { allowFail: true }
    );

    if (actual !== nextBase) {
      console.error(`  ✖  #${pr.number} STILL on ${actual ?? "?"} — retarget did not take`);
      failed.push({ number: pr.number, actual });
      continue;
    }

    gh([
      "pr", "comment", String(pr.number), "--repo", REPO,
      "--body",
      `Re-homed to \`${nextBase}\`: v${current} entered its release freeze, so the branch now belongs ` +
        `to the release captain and development continues on the next cycle. Nothing is wrong with this ` +
        `PR — it just needed a live base. No action needed from you; CI will re-run against the new base.`,
    ], { allowFail: true });

    console.log(`  ✔  #${pr.number} → ${nextBase}`);
    moved++;
  }

  console.log(`\n${moved} re-homed, ${skipped} skipped, ${failed.length} failed`);

  if (failed.length) {
    console.error(
      `\n✖ ${failed.length} PR(s) did not take the retarget: ${failed.map((f) => `#${f.number}`).join(", ")}\n` +
        `  Re-run this script (it is idempotent) or retarget those by hand and verify with\n` +
        `  gh pr view <N> --json baseRefName`
    );
    process.exit(1);
  }

  if (!dryRun && moved > 0) {
    console.log(
      `\nReminder (0a.0b): flip the repo default_branch so PRs opened from now on are born on the\n` +
        `right base — this script cannot reach PRs that do not exist yet:\n` +
        `  gh api -X PATCH repos/${REPO} -f default_branch="${nextBase}"`
    );
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main(process.argv.slice(2));
}
