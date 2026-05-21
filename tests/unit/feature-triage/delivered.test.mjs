import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { parseChangelog } from "../../../scripts/features/lib/delivered.mjs";

describe("parseChangelog", () => {
  it("returns section header when #N found", () => {
    const text = `
# Changelog

## [3.7.2] - 2026-03-15

- Fix something (#980)
- Other item

## [3.7.1] - 2026-03-01

- Earlier change (#900)
`;
    const r = parseChangelog(text, 980);
    assert.deepEqual(r, {
      section: "## [3.7.2] - 2026-03-15",
      version: "3.7.2",
      line: "- Fix something (#980)",
    });
  });

  it("returns null when #N not found", () => {
    const text = `## [3.7.2]\n- Item #100\n`;
    assert.equal(parseChangelog(text, 999), null);
  });

  it("ignores #N appearing without # prefix", () => {
    const text = `## [3.7.2]\n- Issue 980 (no hash)\n`;
    assert.equal(parseChangelog(text, 980), null);
  });

  it("handles plain version headers without brackets/date", () => {
    const text = `## 3.7.2\n- Fix (#980)\n`;
    const r = parseChangelog(text, 980);
    assert.equal(r.version, "3.7.2");
  });

  it("matches #N with word boundary (not only inside parentheses)", () => {
    const text = `## [3.7.2]\n- Fixed by #980.\n`;
    const r = parseChangelog(text, 980);
    assert.equal(r.version, "3.7.2");
    assert.match(r.line, /#980/);
  });
});

import { detectDelivered } from "../../../scripts/features/lib/delivered.mjs";

const CLOSES_PR = {
  number: 2380,
  title: "feat: add native playground",
  body: "closes #1046",
  mergedAt: "2026-03-10T00:00:00Z",
  mergeCommit: { oid: "abc1234" },
};
const MENTION_PR = {
  number: 2381,
  title: "Improve foo",
  body: "Related to #1046 and others",
  mergedAt: "2026-03-12T00:00:00Z",
  mergeCommit: { oid: "def5678" },
};

describe("detectDelivered", () => {
  it("HIGH confidence when PR merged with 'closes #N'", () => {
    const r = detectDelivered(1046, {
      mergedPrs: [CLOSES_PR],
      changelog: "",
      gitCommits: [],
    });
    assert.equal(r.confidence, "high");
    assert.equal(r.evidence.pr_merged.number, 2380);
    assert.match(r.evidence.pr_merged.ref, /closes/i);
  });

  it("MEDIUM confidence when PR-mention + CHANGELOG", () => {
    const r = detectDelivered(1046, {
      mergedPrs: [MENTION_PR],
      changelog: "## [3.7.2]\n- Foo (#1046)\n",
      gitCommits: [],
    });
    assert.equal(r.confidence, "medium");
    assert.equal(r.evidence.pr_merged.number, 2381);
    assert.equal(r.evidence.changelog_section, "## [3.7.2]");
  });

  it("MEDIUM confidence when CHANGELOG + git log", () => {
    const r = detectDelivered(1046, {
      mergedPrs: [],
      changelog: "## [3.7.2]\n- Foo (#1046)\n",
      gitCommits: [{ hash: "abc", date: new Date("2026-03-10"), subject: "feat: thing #1046" }],
    });
    assert.equal(r.confidence, "medium");
  });

  it("LOW confidence when only CHANGELOG", () => {
    const r = detectDelivered(1046, {
      mergedPrs: [],
      changelog: "## [3.7.2]\n- Foo (#1046)\n",
      gitCommits: [],
    });
    assert.equal(r.confidence, "low");
  });

  it("NONE when no signals", () => {
    const r = detectDelivered(1046, { mergedPrs: [], changelog: "", gitCommits: [] });
    assert.equal(r.confidence, "none");
  });
});

import { resolveVersion } from "../../../scripts/features/lib/delivered.mjs";

describe("resolveVersion", () => {
  it("returns first tag created after merge", () => {
    const tags = [
      { date: new Date("2026-03-01"), name: "v3.7.1" },
      { date: new Date("2026-03-15"), name: "v3.7.2" },
      { date: new Date("2026-04-01"), name: "v3.7.3" },
    ];
    const r = resolveVersion(new Date("2026-03-10"), tags, "release/v3.8.0");
    assert.deepEqual(r, { version: "v3.7.2", version_source: "tag_after_merge" });
  });

  it("falls back to current release branch when no tag after merge", () => {
    const tags = [{ date: new Date("2026-02-01"), name: "v3.7.0" }];
    const r = resolveVersion(new Date("2026-05-10"), tags, "release/v3.8.0");
    assert.deepEqual(r, { version: "release/v3.8.0", version_source: "branch_unreleased" });
  });

  it("falls back to 'unreleased' when no tag and no release branch", () => {
    const r = resolveVersion(new Date("2026-05-10"), [], null);
    assert.deepEqual(r, { version: "unreleased", version_source: "branch_unreleased" });
  });
});
