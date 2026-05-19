/**
 * Delivery detection: PR merged + CHANGELOG + git log, with confidence grading.
 */

const VERSION_HEADER_RE = /^##\s+\[?(\d+\.\d+\.\d+)\]?/;

export function parseChangelog(text, issueNumber) {
  if (typeof text !== "string") return null;
  if (!Number.isInteger(issueNumber) || issueNumber <= 0) return null;
  const needle = `#${issueNumber}`;
  const lines = text.split("\n");

  let currentSection = null;
  let currentVersion = null;
  for (const line of lines) {
    const headerMatch = line.match(VERSION_HEADER_RE);
    if (headerMatch) {
      currentSection = line.trim();
      currentVersion = headerMatch[1];
      continue;
    }
    if (!currentSection) continue;
    // Match #N with word boundary: look for needle followed by non-word char or end
    const idx = line.indexOf(needle);
    if (idx !== -1) {
      const nextIdx = idx + needle.length;
      const nextChar = line[nextIdx];
      const isWordBoundary = nextIdx >= line.length || /\W/.test(nextChar);
      if (isWordBoundary) {
        return {
          section: currentSection,
          version: currentVersion,
          line: line.trim(),
        };
      }
    }
  }
  return null;
}

function isExplicitClose(pr, issueNumber) {
  const text = `${pr.title ?? ""}\n${pr.body ?? ""}`;
  const re = new RegExp(`\\b(closes?|fixes?|fixed|resolves?|resolved)\\s+#${issueNumber}\\b`, "i");
  return re.test(text);
}

function justMentions(pr, issueNumber) {
  const text = `${pr.title ?? ""}\n${pr.body ?? ""}`;
  return new RegExp(`#${issueNumber}\\b`).test(text);
}

export function detectDelivered(issueNumber, signals) {
  const { mergedPrs = [], changelog = "", gitCommits = [] } = signals;

  const closesPr = mergedPrs.find((p) => isExplicitClose(p, issueNumber));
  const mentionPr = closesPr || mergedPrs.find((p) => justMentions(p, issueNumber));
  const changelogHit = parseChangelog(changelog, issueNumber);
  const gitHit = gitCommits.length > 0 ? gitCommits[0] : null;

  const A = !!closesPr;
  const B = !!(mentionPr && !closesPr);
  const C = !!changelogHit;
  const D = !!gitHit;

  let confidence = "none";
  if (A) confidence = "high";
  else if ((C && D) || (B && C) || (B && D)) confidence = "medium";
  else if (B || C || D) confidence = "low";

  const evidence = {};
  if (closesPr) {
    evidence.pr_merged = {
      number: closesPr.number,
      merged_at: closesPr.mergedAt,
      ref: `closes #${issueNumber}`,
    };
  } else if (mentionPr) {
    evidence.pr_merged = {
      number: mentionPr.number,
      merged_at: mentionPr.mergedAt,
      ref: `mentions #${issueNumber}`,
    };
  }
  if (changelogHit) evidence.changelog_section = changelogHit.section;
  if (gitHit) evidence.git_commits = gitCommits.slice(0, 5).map((c) => c.hash);

  return { confidence, evidence };
}

export function resolveVersion(mergedAt, tagsByDate, currentReleaseBranch) {
  const mergedTime = mergedAt instanceof Date ? mergedAt.getTime() : new Date(mergedAt).getTime();
  const after = tagsByDate.find((t) => t.date.getTime() >= mergedTime);
  if (after) {
    return { version: after.name, version_source: "tag_after_merge" };
  }
  return {
    version: currentReleaseBranch || "unreleased",
    version_source: "branch_unreleased",
  };
}
