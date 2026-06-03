#!/usr/bin/env node
/**
 * OmniRoute — feature-triage CLI.
 *
 * Classifies open feature-request issues into 8 buckets:
 *   absorb, dormant, already_delivered, skip_assigned, skip_has_pr,
 *   stale_need_details, stale_defer, closed_externally
 *
 * Output: JSON to --output path or stdout.
 *
 * Usage:
 *   node scripts/features/feature-triage.mjs \
 *     --owner diegosouzapw --repo OmniRoute \
 *     --output _ideia/_triage.json
 *
 * Exit codes:
 *   0 — success
 *   1 — invalid args
 *   2 — environment precondition failed (missing gh/git/auth)
 *   3 — irrecoverable GitHub API failure
 */
import { writeFileSync, readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

import { parseArgs } from "./lib/args.mjs";
import { defaultDeps } from "./lib/github.mjs";
import { classifyIssue } from "./lib/classify.mjs";
import { detectDelivered, resolveVersion } from "./lib/delivered.mjs";
import { isStaleNeedDetails, isStaleDefer, detectClosedExternally } from "./lib/lifecycle.mjs";
import { parseFrontmatter } from "./lib/frontmatter.mjs";

function log(verbose, msg) {
  if (verbose) process.stderr.write(`[triage] ${msg}\n`);
}

function readChangelog(path) {
  if (!existsSync(path)) return "";
  return readFileSync(path, "utf8");
}

function listIdeaFiles(ideiaDir, subdir) {
  const full = join(ideiaDir, subdir);
  if (!existsSync(full)) return [];
  return readdirSync(full)
    .filter((f) => f.endsWith(".md") && !f.endsWith(".requirements.md"))
    .map((f) => join(full, f));
}

function loadIdeaFiles(ideiaDir) {
  const map = new Map();
  for (const sub of ["viable", "viable/need_details", "defer"]) {
    for (const path of listIdeaFiles(ideiaDir, sub)) {
      const text = readFileSync(path, "utf8");
      const meta = parseFrontmatter(text);
      if (meta && typeof meta.issue === "number") {
        map.set(meta.issue, { path, meta, subdir: sub, mtime: statSync(path).mtime });
      }
    }
  }
  return map;
}

async function main(argv, env, deps = defaultDeps) {
  let args;
  try {
    args = parseArgs(argv, env);
  } catch (e) {
    process.stderr.write(`Error: ${e.message}\n`);
    process.exit(1);
  }

  log(args.verbose, `owner=${args.owner} repo=${args.repo}`);

  let nums;
  try {
    const labelNums = deps.ghIssueListNumbers(args.owner, args.repo, "enhancement");
    const titleNums = deps.ghIssueListFeatureTitled(args.owner, args.repo);
    nums = [...new Set([...labelNums, ...titleNums])];
  } catch (e) {
    process.stderr.write(`gh failed: ${e.message}\n`);
    process.exit(2);
  }

  if (args.onlyIssues.length > 0) {
    nums = nums.filter((n) => args.onlyIssues.includes(n));
  }
  log(args.verbose, `fetched ${nums.length} issue numbers`);

  const ideaFiles = loadIdeaFiles(args.ideiaDir);
  log(args.verbose, `loaded ${ideaFiles.size} existing idea files with frontmatter`);

  const buckets = {
    absorb: [],
    dormant: [],
    already_delivered: [],
    skip_assigned: [],
    skip_has_pr: [],
    stale_need_details: [],
    stale_defer: [],
    closed_externally: [],
  };
  const warnings = [];
  const now = new Date();

  const changelogText = readChangelog(args.changelog);
  const releaseBranch = deps.gitCurrentReleaseBranch();
  const tagsByDate = deps.gitTagsByDate();

  const thresholds = {
    quarantineDays: args.quarantineDays,
    overrideThumbs: args.overrideThumbs,
    overrideCommenters: args.overrideCommenters,
  };

  // First: externally-closed cleanup based on existing files
  for (const [num, info] of ideaFiles) {
    if (nums.includes(num)) continue;
    try {
      const issue = deps.ghIssueView(args.owner, args.repo, num);
      const ext = detectClosedExternally(issue, info.meta);
      if (ext.flagged) {
        buckets.closed_externally.push({
          number: num,
          file: relative(process.cwd(), info.path),
          closed_at: ext.closedAt,
          state_reason: ext.stateReason,
        });
        if (ext.warningMessage) {
          warnings.push({ level: "warn", issue: num, message: ext.warningMessage });
        }
      }
    } catch (e) {
      warnings.push({ level: "warn", issue: num, message: `fetch failed: ${e.message}` });
    }
  }

  // Open issues
  for (const num of nums) {
    let issue;
    try {
      issue = deps.ghIssueView(args.owner, args.repo, num);
    } catch (e) {
      warnings.push({ level: "warn", issue: num, message: `fetch failed: ${e.message}` });
      continue;
    }

    // Synthesize timelineItems from open PR search (gh issue view doesn't expose timelineItems)
    let openPrs = [];
    try {
      openPrs = deps.ghPrSearchOpen(args.owner, args.repo, num);
    } catch (e) {
      warnings.push({ level: "warn", issue: num, message: `open PR search failed: ${e.message}` });
    }
    issue.timelineItems = openPrs.map((pr) => ({
      __typename: "CrossReferencedEvent",
      source: { __typename: "PullRequest", state: "OPEN", number: pr.number },
    }));

    const mergedPrs = deps.ghPrSearchMerged(args.owner, args.repo, num);
    const gitCommits = deps.gitLogGrep(`#${num}`).filter((c) => deps.gitIsAncestor(c.hash, "main"));
    const del = detectDelivered(num, { mergedPrs, changelog: changelogText, gitCommits });

    if (del.confidence === "high" || del.confidence === "medium") {
      const mergedAt = del.evidence.pr_merged?.merged_at || gitCommits[0]?.date;
      const ver = mergedAt
        ? resolveVersion(new Date(mergedAt), tagsByDate, releaseBranch)
        : { version: releaseBranch || "unreleased", version_source: "branch_unreleased" };
      buckets.already_delivered.push({
        number: num,
        title: issue.title,
        author: issue.author?.login,
        confidence: del.confidence,
        evidence: del.evidence,
        version: ver.version,
        version_source: ver.version_source,
      });
      continue;
    }
    if (del.confidence === "low") {
      warnings.push({
        level: "warn",
        issue: num,
        message: "weak delivery signal — manual verification recommended",
      });
    }

    const c = classifyIssue(issue, thresholds, now);
    const entry = {
      number: num,
      title: issue.title,
      url: issue.url,
      author: issue.author?.login,
      created_at: issue.createdAt,
    };
    const fileInfo = ideaFiles.get(num);

    if (c.bucket === "absorb") {
      buckets.absorb.push({
        ...entry,
        age_days: c.ageDays,
        thumbs: c.thumbs,
        commenters: c.commenters,
        labels: (issue.labels ?? []).map((l) => l.name),
        reason: c.reason,
        existing_idea_file: fileInfo ? relative(process.cwd(), fileInfo.path) : null,
        last_synced_comment_id: fileInfo?.meta?.last_synced_comment_id ?? null,
      });
    } else if (c.bucket === "dormant") {
      buckets.dormant.push({
        number: num,
        title: issue.title,
        age_days: c.ageDays,
        thumbs: c.thumbs,
        commenters: c.commenters,
        reason: c.reason,
      });
    } else if (c.bucket === "skip_assigned") {
      buckets.skip_assigned.push({ number: num, title: issue.title, assignees: c.assignees });
    } else if (c.bucket === "skip_has_pr") {
      buckets.skip_has_pr.push({ number: num, title: issue.title, linked_prs: c.linkedPrs });
    }
  }

  // Lifecycle: need_details stale + defer stale
  for (const [num, info] of ideaFiles) {
    if (info.subdir === "viable/need_details") {
      try {
        const issue = deps.ghIssueView(args.owner, args.repo, num);
        const s = isStaleNeedDetails(issue, args.staleNeedsDays, now);
        if (s.stale) {
          buckets.stale_need_details.push({
            number: num,
            title: issue.title,
            file: relative(process.cwd(), info.path),
            days_silent: s.daysSilent,
            last_author_activity: s.lastAuthorActivity,
          });
        }
      } catch (e) {
        warnings.push({
          level: "warn",
          issue: num,
          message: `need_details check failed: ${e.message}`,
        });
      }
    } else if (info.subdir === "defer") {
      const s = isStaleDefer(info.meta, args.staleDeferDays, now, info.mtime);
      if (s.stale) {
        buckets.stale_defer.push({
          number: num,
          file: relative(process.cwd(), info.path),
          days_in_defer: s.daysInDefer,
          deferred_at: info.meta?.snapshot?.classified_at || info.mtime.toISOString(),
        });
      }
    }
  }

  const counts = { total_fetched: nums.length };
  for (const k of Object.keys(buckets)) counts[k] = buckets[k].length;

  const out = {
    metadata: {
      run_at: now.toISOString(),
      owner: args.owner,
      repo: args.repo,
      thresholds: {
        quarantine_days: args.quarantineDays,
        override_thumbs: args.overrideThumbs,
        override_commenters: args.overrideCommenters,
        stale_needs_days: args.staleNeedsDays,
        stale_defer_days: args.staleDeferDays,
      },
    },
    counts,
    buckets,
    warnings,
  };

  const json = JSON.stringify(out, null, 2);
  if (args.dryRun) {
    log(true, "--dry-run: not writing output");
  } else if (args.output) {
    writeFileSync(args.output, json);
    log(args.verbose, `wrote ${args.output}`);
  } else {
    process.stdout.write(json + "\n");
  }
  process.exit(0);
}

const invokedDirectly = import.meta.url === `file://${process.argv[1]}`;
if (invokedDirectly) {
  main(process.argv.slice(2), process.env).catch((e) => {
    process.stderr.write(`Fatal: ${e.stack || e.message}\n`);
    process.exit(3);
  });
}

export { main };
