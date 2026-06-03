import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { resyncIdeaFile } from "../../../scripts/features/lib/resync.mjs";
import { serializeFrontmatter } from "../../../scripts/features/lib/frontmatter.mjs";

function makeIdeaFile(
  meta,
  body = "# Feature: X\n\n## Community Discussion\n\nInitial summary.\n"
) {
  return serializeFrontmatter(meta, body);
}

const META_V1 = {
  issue: 1046,
  last_synced_at: "2026-05-01T00:00:00Z",
  last_synced_comment_id: 100,
  snapshot: { thumbs: 2, commenters: 1, age_days: 10, state: "open" },
};

describe("resyncIdeaFile", () => {
  it("returns unchanged when file has no frontmatter", () => {
    const text = "# Plain idea file\nNo frontmatter here.";
    const r = resyncIdeaFile(text, { comments: [] });
    assert.equal(r.changed, false);
    assert.equal(r.text, text);
  });

  it("appends only new comments (id > last_synced_comment_id)", () => {
    const text = makeIdeaFile(META_V1);
    const issue = {
      comments: [
        {
          databaseId: 100,
          author: { login: "alice" },
          createdAt: "2026-05-01T00:00:00Z",
          body: "old",
        },
        {
          databaseId: 200,
          author: { login: "bob" },
          createdAt: "2026-05-10T00:00:00Z",
          body: "NEW comment",
        },
        {
          databaseId: 300,
          author: { login: "carol" },
          createdAt: "2026-05-15T00:00:00Z",
          body: "ANOTHER NEW",
        },
      ],
      reactionGroups: [{ content: "THUMBS_UP", users: { totalCount: 5 } }],
      labels: [{ name: "enhancement" }],
      state: "OPEN",
    };
    const r = resyncIdeaFile(text, issue, new Date("2026-05-19T00:00:00Z"));
    assert.equal(r.changed, true);
    assert.match(r.text, /NEW comment/);
    assert.match(r.text, /ANOTHER NEW/);
    assert.doesNotMatch(r.text, /^.*\bold\b.*$/m);

    assert.match(r.text, /last_synced_comment_id:\s*300/);
    assert.match(r.text, /thumbs:\s*5/);
  });

  it("returns unchanged when no new comments", () => {
    const text = makeIdeaFile(META_V1);
    const r = resyncIdeaFile(text, { comments: [{ databaseId: 50 }] }, new Date());
    assert.equal(r.changed, false);
  });

  it("flags needsReclassification when in need_details/ and author replied", () => {
    const text = makeIdeaFile(META_V1);
    const issue = {
      author: { login: "alice" },
      comments: [
        {
          databaseId: 200,
          author: { login: "alice" },
          createdAt: "2026-05-10T00:00:00Z",
          body: "Here are the details!",
        },
      ],
      reactionGroups: [],
      labels: [],
      state: "OPEN",
    };
    const r = resyncIdeaFile(text, issue, new Date(), { inNeedDetails: true });
    assert.equal(r.changed, true);
    assert.equal(r.needsReclassification, true);
  });
});
