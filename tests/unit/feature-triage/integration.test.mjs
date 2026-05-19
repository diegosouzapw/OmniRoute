import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { tmpdir } from "node:os";
import { mkdirSync, mkdtempSync, rmSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { main } from "../../../scripts/features/feature-triage.mjs";

function makeDeps(state) {
  return {
    ghIssueListNumbers: () => state.openIssues.map((i) => i.number),
    ghIssueListFeatureTitled: () => [],
    ghIssueView: (_o, _r, n) => state.issuesById[n],
    ghPrSearchMerged: (_o, _r, n) => state.prsByIssue[n] ?? [],
    ghPrSearchOpen: (_o, _r, n) => state.openPrsByIssue?.[n] ?? [],
    gitTagsByDate: () => state.tags ?? [],
    gitLogGrep: (pattern) => state.commitsByPattern?.[pattern] ?? [],
    gitIsAncestor: () => true,
    gitCurrentReleaseBranch: () => state.releaseBranch ?? null,
  };
}

function captureExit() {
  const orig = process.exit;
  let code = null;
  process.exit = (c) => {
    code = c;
    throw new Error("__EXIT__");
  };
  return {
    code: () => code,
    restore: () => {
      process.exit = orig;
    },
  };
}

describe("feature-triage integration", () => {
  it("classifies 5 mixed issues into expected buckets", async () => {
    const tmp = mkdtempSync(join(tmpdir(), "triage-"));
    mkdirSync(join(tmp, "viable", "need_details"), { recursive: true });
    mkdirSync(join(tmp, "defer"), { recursive: true });

    const now = new Date();
    const day = (n) => new Date(now.getTime() - n * 86400_000).toISOString();

    const state = {
      openIssues: [
        { number: 100 },
        { number: 200 },
        { number: 300 },
        { number: 400 },
        { number: 500 },
      ],
      issuesById: {
        100: {
          number: 100,
          title: "fresh",
          url: "u",
          author: { login: "a" },
          createdAt: day(3),
          labels: [],
          assignees: [],
          comments: [],
          reactionGroups: [],
          timelineItems: [],
        },
        200: {
          number: 200,
          title: "ripe",
          url: "u",
          author: { login: "b" },
          createdAt: day(20),
          labels: [],
          assignees: [],
          comments: [],
          reactionGroups: [],
          timelineItems: [],
        },
        300: {
          number: 300,
          title: "shipped",
          url: "u",
          author: { login: "c" },
          createdAt: day(40),
          labels: [],
          assignees: [],
          comments: [],
          reactionGroups: [],
          timelineItems: [],
        },
        400: {
          number: 400,
          title: "delegated",
          url: "u",
          author: { login: "d" },
          createdAt: day(40),
          labels: [],
          assignees: [{ login: "alice" }],
          comments: [],
          reactionGroups: [],
          timelineItems: [],
        },
        500: {
          number: 500,
          title: "in PR",
          url: "u",
          author: { login: "e" },
          createdAt: day(40),
          labels: [],
          assignees: [],
          comments: [],
          reactionGroups: [],
        },
      },
      openPrsByIssue: {
        500: [{ number: 999, title: "WIP fix", body: "addresses #500" }],
      },
      prsByIssue: {
        300: [
          {
            number: 1000,
            title: "feat: shipped (closes #300)",
            body: "closes #300",
            mergedAt: day(10),
            mergeCommit: { oid: "abc" },
          },
        ],
      },
      tags: [{ date: new Date(now.getTime() - 5 * 86400_000), name: "v3.7.2" }],
      releaseBranch: "release/v3.8.0",
    };

    const deps = makeDeps(state);
    const outPath = join(tmp, "_triage.json");

    const exit = captureExit();
    try {
      await main(
        ["--owner", "x", "--repo", "y", "--ideia-dir", tmp, "--output", outPath],
        {},
        deps
      ).catch((e) => {
        if (e.message !== "__EXIT__") throw e;
      });
    } finally {
      exit.restore();
    }

    assert.equal(exit.code(), 0);
    const out = JSON.parse(readFileSync(outPath, "utf8"));
    assert.equal(out.counts.dormant, 1);
    assert.equal(out.counts.absorb, 1);
    assert.equal(out.counts.already_delivered, 1);
    assert.equal(out.counts.skip_assigned, 1);
    assert.equal(out.counts.skip_has_pr, 1);
    assert.equal(out.buckets.already_delivered[0].version, "v3.7.2");

    rmSync(tmp, { recursive: true, force: true });
  });
});
