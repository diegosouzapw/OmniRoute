/**
 * Issue classification: quarantine filter + engagement override + skip rules.
 */

const HARDCODED_BOTS = new Set(["github-actions", "dependabot", "renovate", "claude", "copilot"]);

export function isBot(user) {
  if (!user) return false;
  if (user.__typename === "Bot") return true;
  const login = user.login || "";
  if (login.endsWith("[bot]")) return true;
  if (HARDCODED_BOTS.has(login)) return true;
  return false;
}

function countThumbs(reactionGroups) {
  if (!Array.isArray(reactionGroups)) return 0;
  const g = reactionGroups.find((rg) => rg.content === "THUMBS_UP");
  return g?.users?.totalCount ?? 0;
}

function uniqueCommenters(comments, authorLogin) {
  if (!Array.isArray(comments)) return [];
  const seen = new Set();
  for (const c of comments) {
    const u = c.author;
    if (!u || !u.login) continue;
    if (u.login === authorLogin) continue;
    if (isBot(u)) continue;
    seen.add(u.login);
  }
  return [...seen];
}

function openLinkedPrs(timelineItems) {
  if (!Array.isArray(timelineItems)) return [];
  const result = [];
  for (const item of timelineItems) {
    if (item.__typename !== "CrossReferencedEvent") continue;
    const src = item.source;
    if (!src || src.__typename !== "PullRequest") continue;
    if (String(src.state).toLowerCase() !== "open") continue;
    result.push({ number: src.number, state: "open" });
  }
  return result;
}

export function classifyIssue(issue, thresholds, now = new Date()) {
  const assignees = issue.assignees ?? [];
  if (assignees.length > 0) {
    return {
      bucket: "skip_assigned",
      reason: "issue has assignees",
      assignees: assignees.map((a) => a.login),
    };
  }

  const linkedPrs = openLinkedPrs(issue.timelineItems);
  if (linkedPrs.length > 0) {
    return {
      bucket: "skip_has_pr",
      reason: "issue has open linked PR",
      linkedPrs,
    };
  }

  const createdAt = new Date(issue.createdAt).getTime();
  let ageDays = Math.floor((now.getTime() - createdAt) / 86400_000);
  if (ageDays < 0) ageDays = 0;

  const thumbs = countThumbs(issue.reactionGroups);
  const commenterLogins = uniqueCommenters(issue.comments, issue.author?.login);
  const commenters = commenterLogins.length;

  const meta = { ageDays, thumbs, commenters };

  if (ageDays >= thresholds.quarantineDays) {
    return { bucket: "absorb", reason: `age>=${thresholds.quarantineDays}`, ...meta };
  }

  const overrides = [];
  if (thumbs >= thresholds.overrideThumbs) overrides.push("thumbs");
  if (commenters >= thresholds.overrideCommenters) overrides.push("commenters");
  if (overrides.length > 0) {
    return { bucket: "absorb", reason: `override:${overrides.join("+")}`, ...meta };
  }

  return {
    bucket: "dormant",
    reason: `age<${thresholds.quarantineDays} && thumbs<${thresholds.overrideThumbs} && commenters<${thresholds.overrideCommenters}`,
    ...meta,
  };
}
