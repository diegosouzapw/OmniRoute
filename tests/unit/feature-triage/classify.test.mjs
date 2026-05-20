import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { classifyIssue, isBot } from "../../../scripts/features/lib/classify.mjs";

const DEFAULT_THRESHOLDS = {
  quarantineDays: 14,
  overrideThumbs: 5,
  overrideCommenters: 3,
};

function makeIssue(overrides = {}) {
  const now = new Date("2026-05-19T00:00:00Z");
  return {
    number: 1046,
    title: "Test",
    url: "https://github.com/x/y/issues/1046",
    author: { login: "alice" },
    createdAt: new Date(now.getTime() - 3 * 86400_000).toISOString(),
    labels: [{ name: "enhancement" }],
    assignees: [],
    comments: [],
    reactionGroups: [],
    timelineItems: [],
    ...overrides,
  };
}

describe("isBot", () => {
  it("detects [bot] suffix", () => {
    assert.equal(isBot({ login: "dependabot[bot]" }), true);
  });
  it("detects hardcoded bot names", () => {
    assert.equal(isBot({ login: "github-actions" }), true);
    assert.equal(isBot({ login: "claude" }), true);
    assert.equal(isBot({ login: "copilot" }), true);
  });
  it("detects Bot via __typename", () => {
    assert.equal(isBot({ login: "anything", __typename: "Bot" }), true);
  });
  it("returns false for regular user", () => {
    assert.equal(isBot({ login: "alice" }), false);
  });
});

describe("classifyIssue", () => {
  const now = new Date("2026-05-19T00:00:00Z");

  it("3 days old, no engagement → dormant", () => {
    const r = classifyIssue(makeIssue(), DEFAULT_THRESHOLDS, now);
    assert.equal(r.bucket, "dormant");
    assert.match(r.reason, /age<14/);
  });

  it("3 days old, 5 thumbs → absorb (override:thumbs)", () => {
    const r = classifyIssue(
      makeIssue({
        reactionGroups: [{ content: "THUMBS_UP", users: { totalCount: 5 } }],
      }),
      DEFAULT_THRESHOLDS,
      now
    );
    assert.equal(r.bucket, "absorb");
    assert.match(r.reason, /override:thumbs/);
    assert.equal(r.thumbs, 5);
  });

  it("3 days old, 3 unique non-bot non-author commenters → absorb (override:commenters)", () => {
    const r = classifyIssue(
      makeIssue({
        comments: [
          { author: { login: "bob" } },
          { author: { login: "carol" } },
          { author: { login: "dave" } },
        ],
      }),
      DEFAULT_THRESHOLDS,
      now
    );
    assert.equal(r.bucket, "absorb");
    assert.match(r.reason, /override:commenters/);
    assert.equal(r.commenters, 3);
  });

  it("3 days old, 4 commenters but 1 is bot → dormant", () => {
    const r = classifyIssue(
      makeIssue({
        comments: [
          { author: { login: "bob" } },
          { author: { login: "carol" } },
          { author: { login: "dependabot[bot]" } },
        ],
      }),
      DEFAULT_THRESHOLDS,
      now
    );
    assert.equal(r.bucket, "dormant");
    assert.equal(r.commenters, 2);
  });

  it("3 days old, commenters include author → author excluded", () => {
    const r = classifyIssue(
      makeIssue({
        comments: [
          { author: { login: "alice" } },
          { author: { login: "bob" } },
          { author: { login: "carol" } },
        ],
      }),
      DEFAULT_THRESHOLDS,
      now
    );
    assert.equal(r.bucket, "dormant");
    assert.equal(r.commenters, 2);
  });

  it("exactly 14 days old → absorb (age>=14)", () => {
    const issue = makeIssue({
      createdAt: new Date(now.getTime() - 14 * 86400_000).toISOString(),
    });
    const r = classifyIssue(issue, DEFAULT_THRESHOLDS, now);
    assert.equal(r.bucket, "absorb");
    assert.match(r.reason, /age>=14/);
  });

  it("20 days old with assignee → skip_assigned (precedence)", () => {
    const r = classifyIssue(
      makeIssue({
        createdAt: new Date(now.getTime() - 20 * 86400_000).toISOString(),
        assignees: [{ login: "alice" }],
      }),
      DEFAULT_THRESHOLDS,
      now
    );
    assert.equal(r.bucket, "skip_assigned");
  });

  it("20 days old with open linked PR → skip_has_pr (precedence)", () => {
    const r = classifyIssue(
      makeIssue({
        createdAt: new Date(now.getTime() - 20 * 86400_000).toISOString(),
        timelineItems: [
          {
            __typename: "CrossReferencedEvent",
            source: { __typename: "PullRequest", state: "OPEN", number: 2400 },
          },
        ],
      }),
      DEFAULT_THRESHOLDS,
      now
    );
    assert.equal(r.bucket, "skip_has_pr");
    assert.deepEqual(r.linkedPrs, [{ number: 2400, state: "open" }]);
  });

  it("custom thresholds (quarantineDays=7) respected", () => {
    const issue = makeIssue({
      createdAt: new Date(now.getTime() - 8 * 86400_000).toISOString(),
    });
    const r = classifyIssue(issue, { ...DEFAULT_THRESHOLDS, quarantineDays: 7 }, now);
    assert.equal(r.bucket, "absorb");
  });
});
