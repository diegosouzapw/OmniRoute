/**
 * Incremental re-sync of idea files: append new comments only,
 * update frontmatter snapshot.
 */
import { parseFrontmatter, serializeFrontmatter, stripFrontmatter } from "./frontmatter.mjs";
import { isBot } from "./classify.mjs";

function countThumbs(reactionGroups) {
  if (!Array.isArray(reactionGroups)) return 0;
  const g = reactionGroups.find((rg) => rg.content === "THUMBS_UP");
  return g?.users?.totalCount ?? 0;
}

function uniqueCommenters(comments, authorLogin) {
  const seen = new Set();
  for (const c of comments ?? []) {
    const u = c.author;
    if (!u || !u.login) continue;
    if (u.login === authorLogin) continue;
    if (isBot(u)) continue;
    seen.add(u.login);
  }
  return seen.size;
}

function renderComments(comments) {
  return comments
    .map(
      (c) =>
        `- **@${c.author?.login ?? "unknown"}** (${c.createdAt}):\n  > ${(c.body ?? "").split("\n").join("\n  > ")}`
    )
    .join("\n");
}

function appendComments(body, newComments) {
  const heading = "## 💬 Community Discussion";
  let idx = body.indexOf(heading);
  if (idx < 0) idx = body.indexOf("## Community Discussion");
  if (idx < 0) {
    return body + `\n\n${heading}\n\n` + renderComments(newComments);
  }
  const after = body.slice(idx);
  const nextHeaderMatch = after.slice(heading.length).match(/^##\s+/m);
  const insertAt = nextHeaderMatch ? idx + heading.length + nextHeaderMatch.index : body.length;
  const insertBlock = "\n\n" + renderComments(newComments) + "\n";
  return body.slice(0, insertAt) + insertBlock + body.slice(insertAt);
}

export function resyncIdeaFile(text, issue, now = new Date(), opts = {}) {
  const meta = parseFrontmatter(text);
  if (!meta) return { changed: false, text };

  const lastSyncedId = Number(meta.last_synced_comment_id ?? 0);
  const allComments = issue.comments ?? [];
  const newComments = allComments.filter((c) => Number(c.databaseId) > lastSyncedId);

  if (newComments.length === 0) {
    return { changed: false, text };
  }

  const body = stripFrontmatter(text);
  const newBody = appendComments(body, newComments);

  const newMeta = {
    ...meta,
    last_synced_at: now.toISOString(),
    last_synced_comment_id: Math.max(...newComments.map((c) => Number(c.databaseId))),
    snapshot: {
      ...(meta.snapshot ?? {}),
      thumbs: countThumbs(issue.reactionGroups),
      commenters: uniqueCommenters(allComments, issue.author?.login),
      labels: (issue.labels ?? []).map((l) => l.name).filter(Boolean),
      state: String(issue.state ?? "open").toLowerCase(),
    },
  };

  const out = serializeFrontmatter(newMeta, newBody);

  const needsReclassification = !!(
    opts.inNeedDetails && newComments.some((c) => c.author?.login === issue.author?.login)
  );

  return { changed: true, text: out, needsReclassification };
}
