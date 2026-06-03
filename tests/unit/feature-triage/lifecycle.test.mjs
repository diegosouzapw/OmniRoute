import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  isStaleNeedDetails,
  isStaleDefer,
  detectClosedExternally,
} from "../../../scripts/features/lib/lifecycle.mjs";

const now = new Date("2026-05-19T00:00:00Z");

describe("isStaleNeedDetails", () => {
  it("returns stale info when author silent ≥30 days", () => {
    const issue = {
      author: { login: "alice" },
      createdAt: new Date(now.getTime() - 60 * 86400_000).toISOString(),
      comments: [
        {
          author: { login: "alice" },
          createdAt: new Date(now.getTime() - 40 * 86400_000).toISOString(),
        },
        {
          author: { login: "bob" },
          createdAt: new Date(now.getTime() - 5 * 86400_000).toISOString(),
        },
      ],
    };
    const r = isStaleNeedDetails(issue, 30, now);
    assert.equal(r.stale, true);
    assert.equal(r.daysSilent, 40);
    assert.equal(r.lastAuthorActivity, issue.comments[0].createdAt);
  });

  it("returns not stale when author replied within 30 days", () => {
    const issue = {
      author: { login: "alice" },
      createdAt: new Date(now.getTime() - 60 * 86400_000).toISOString(),
      comments: [
        {
          author: { login: "alice" },
          createdAt: new Date(now.getTime() - 10 * 86400_000).toISOString(),
        },
      ],
    };
    const r = isStaleNeedDetails(issue, 30, now);
    assert.equal(r.stale, false);
  });

  it("uses createdAt when author never commented again", () => {
    const issue = {
      author: { login: "alice" },
      createdAt: new Date(now.getTime() - 40 * 86400_000).toISOString(),
      comments: [
        {
          author: { login: "bob" },
          createdAt: new Date(now.getTime() - 5 * 86400_000).toISOString(),
        },
      ],
    };
    const r = isStaleNeedDetails(issue, 30, now);
    assert.equal(r.stale, true);
    assert.equal(r.daysSilent, 40);
  });
});

describe("isStaleDefer", () => {
  it("stale when classified_at ≥90 days ago", () => {
    const meta = {
      snapshot: { classified_at: new Date(now.getTime() - 100 * 86400_000).toISOString() },
    };
    const r = isStaleDefer(meta, 90, now);
    assert.equal(r.stale, true);
    assert.equal(r.daysInDefer, 100);
  });
  it("not stale when classified_at <90 days", () => {
    const meta = {
      snapshot: { classified_at: new Date(now.getTime() - 60 * 86400_000).toISOString() },
    };
    const r = isStaleDefer(meta, 90, now);
    assert.equal(r.stale, false);
  });
  it("uses fallback mtime when classified_at missing", () => {
    const meta = { snapshot: {} };
    const fallback = new Date(now.getTime() - 100 * 86400_000);
    const r = isStaleDefer(meta, 90, now, fallback);
    assert.equal(r.stale, true);
  });
});

describe("detectClosedExternally", () => {
  it("flags as closed_externally when issue closed but snapshot says open", () => {
    const issue = { state: "CLOSED", closedAt: "2026-05-01T00:00:00Z", stateReason: "NOT_PLANNED" };
    const meta = { snapshot: { state: "open" } };
    const r = detectClosedExternally(issue, meta);
    assert.equal(r.flagged, true);
    assert.equal(r.stateReason, "NOT_PLANNED");
  });

  it("emits delivery warning when COMPLETED reason", () => {
    const issue = { state: "CLOSED", closedAt: "2026-05-01T00:00:00Z", stateReason: "COMPLETED" };
    const meta = { snapshot: { state: "open" } };
    const r = detectClosedExternally(issue, meta);
    assert.equal(r.flagged, true);
    assert.equal(r.warningMessage, "possibly delivered by external work");
  });

  it("returns flagged=false when issue still open", () => {
    const issue = { state: "OPEN" };
    const meta = { snapshot: { state: "open" } };
    assert.equal(detectClosedExternally(issue, meta).flagged, false);
  });
});
