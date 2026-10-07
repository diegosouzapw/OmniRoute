import test from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../scripts/release/reconcile-changelog.mjs");
const {
  primaryRefs,
  parseBlocks,
  addCredit,
  appendLink,
  bulletFromSubject,
  sectionForType,
  dedupeBullets,
  computeCoverage,
  versionSectionRange,
  otherSectionsText,
  rankAuthors,
  reconcile,
} = mod;

const REPO = "diegosouzapw/OmniRoute";
const link = (n: number) => `[#${n}](https://github.com/${REPO}/pull/${n})`;

test("primaryRefs: /pull links and the LAST #N count, incidental mentions do not", () => {
  const b = `- **test:** counts after additions — Opper #11629 + 1min.ai #11631 (${link(11674)}) — thanks @x`;
  assert.deepEqual([...primaryRefs(b)].sort(), [11674]);
  assert.deepEqual(
    [...primaryRefs("- fix(x): thing (#11766) (#11794)")].sort(),
    [11766, 11794],
    "explicit (#N) groups count"
  );
  assert.deepEqual(
    [...primaryRefs("- **security:** verbatim,\n  across two lines (#12457)")],
    [12457],
    "last ref of a multi-line block"
  );
  assert.deepEqual([...primaryRefs("- plain sentence, no refs")], []);
});

test("parseBlocks: sections by heading, continuation lines kept; fragments collapse to one line", () => {
  const text = `### ✨ New Features

- **feat(a):** one
  continued here

### 🐛 Bug Fixes

- **fix(b):** two
- **fix(c):** three
`;
  const p = parseBlocks(text);
  assert.equal(p.features.length, 1);
  assert.equal(p.features[0], "- **feat(a):** one\n  continued here");
  assert.deepEqual(p.fixes, ["- **fix(b):** two", "- **fix(c):** three"]);
  const frag = parseBlocks("- **fix(d):** wrapped\n  tail line\n", {
    fixedSection: "fixes",
    collapse: true,
  });
  assert.deepEqual(frag.fixes, ["- **fix(d):** wrapped tail line"]);
});

test("addCredit: appends, extends a trailing thanks group, skips maintainer and already-mentioned handles", () => {
  assert.equal(addCredit("- x (#1)", ["alice"]), "- x (#1) — thanks @alice");
  assert.equal(addCredit("- x (#1) — thanks @alice", ["bob"]), "- x (#1) — thanks @alice / @bob");
  assert.equal(addCredit("- x (#1 — thanks @alice)", ["bob"]), "- x (#1 — thanks @alice / @bob)");
  assert.equal(
    addCredit("- x (#1) — thanks @alice", ["alice", "diegosouzapw"]),
    "- x (#1) — thanks @alice"
  );
  assert.equal(
    addCredit("- x by @alice-dev", ["alice"]),
    "- x by @alice-dev — thanks @alice",
    "handle boundary is exact"
  );
});

test("appendLink: adds the PR link before a trailing thanks group and never twice", () => {
  const once = appendLink("- x — thanks @alice", REPO, 12);
  assert.equal(once, `- x (${link(12)}) — thanks @alice`);
  assert.equal(appendLink(once, REPO, 12), once);
  assert.equal(appendLink("- y", REPO, 3), `- y (${link(3)})`);
});

test("bulletFromSubject: bolds the conventional prefix, strips (#N) and URGENT, maps specials", () => {
  assert.deepEqual(bulletFromSubject("fix(cli): thing (#11794)"), {
    type: "fix",
    text: "**fix(cli):** thing",
  });
  assert.deepEqual(bulletFromSubject("[URGENT] fix(dev): hot (#1)"), {
    type: "fix",
    text: "**fix(dev):** hot",
  });
  assert.deepEqual(bulletFromSubject("Update README.md (#5)"), {
    type: "other",
    text: "Update README.md",
  });
  assert.deepEqual(
    bulletFromSubject("Update README.md (#5)", { "Update README.md": "docs(readme): touch-ups" }),
    {
      type: "docs",
      text: "**docs(readme):** touch-ups",
    }
  );
  assert.equal(sectionForType("feat"), "features");
  assert.equal(sectionForType("perf"), "fixes");
  assert.equal(sectionForType("docs"), "maintenance");
});

test("dedupeBullets: keeps the best-linked twin and merges the other twin's refs", () => {
  const a = `- **fix(glm):** drop the extra arg (${link(12770)})`;
  const b = "- **fix(glm):** drop the extra arg";
  const c = `- **test(check):** escape the fixture (direct commit \`fb7445eaa1\`)`;
  const d = `- **test(check):** escape the fixture (${link(11942)})`;
  const { kept, dropped } = dedupeBullets([b, a, c, d]);
  assert.deepEqual(dropped, [b, c]);
  assert.equal(kept.length, 2);
  assert.equal(kept[0], a);
  assert.ok(
    kept[1].includes(link(11942)) && kept[1].includes("direct commit `fb7445eaa1`"),
    "merged the twin's hash"
  );
});

test("computeCoverage: own PR must be a primary ref; incidental mention leaves the commit uncovered", () => {
  const rows = [
    { hash: "aaaaaaaaa1", pr: 11631, refs: [11631], subject: "feat: 1min (#11631)" },
    { hash: "bbbbbbbbb2", pr: 11674, refs: [11674], subject: "test: counts (#11674)" },
    { hash: "ccccccccc3", pr: null, refs: [11449], subject: "fix: direct (#11449)" },
    { hash: "ddddddddd4", pr: 12000, refs: [12000], subject: "fix: closes issue (#12000)" },
    { hash: "eeeeeeeee5", pr: null, refs: [], subject: "chore(release): open cycle" },
    { hash: "f0f0f0f0f0abcdef", pr: null, refs: [], subject: "fix(ui): direct push" },
  ];
  const bullets = [
    `- **test:** counts — 1min.ai #11631 (${link(11674)})`,
    "- **fix:** direct push fixing #11449",
    "- **fix:** the issue bullet cites #7000 only",
    "- **fix(ui):** direct push (direct commit `f0f0f0f0f0`)",
  ];
  const { uncovered } = computeCoverage(rows, bullets, {
    closingPrs: new Set([12000]), // PR 12000 closes issue 7000, which is cited
    skipHashes: new Set(["eeeeeeeee"]),
  });
  assert.deepEqual(
    uncovered.map((r) => r.hash),
    ["aaaaaaaaa1"],
    "only the incidentally-mentioned PR is uncovered"
  );
});

test("versionSectionRange / otherSectionsText isolate exactly one version block", () => {
  const cl = `# Changelog

## [Unreleased]

### ✨ New Features

- old feature (#1)

## [3.8.51] — TBD

### 🐛 Bug Fixes

- **fix:** in section (#2)

---

## [3.8.50] — 2026-08-25

- shipped (#3)
`;
  const r = versionSectionRange(cl, "3.8.51");
  assert.ok(r && cl.slice(r.start, r.end).includes("in section (#2)"));
  assert.ok(!cl.slice(r.start, r.end).includes("shipped (#3)"));
  const other = otherSectionsText(cl, "3.8.51");
  assert.ok(
    other.includes("old feature (#1)") &&
      other.includes("shipped (#3)") &&
      !other.includes("in section (#2)")
  );
  assert.equal(versionSectionRange(cl, "9.9.9"), null);
});

test("rankAuthors: consolidates display-name drift by PR login, excludes bots", () => {
  const rows = [
    { authorName: "Webman", prAuthor: "jonlwheat2-gif" },
    { authorName: "Webman", prAuthor: "jonlwheat2-gif" },
    { authorName: "WebPerson", prAuthor: "jonlwheat2-gif" },
    { authorName: "solo", prAuthor: null },
    { authorName: "dependabot[bot]", prAuthor: null },
  ];
  const { top, counts } = rankAuthors(rows);
  assert.deepEqual(top[0], ["Webman (@jonlwheat2-gif)", 3]);
  assert.deepEqual(top[1], ["solo", 1]);
  assert.equal("dependabot[bot]" in counts, false);
});

test("reconcile: folds fragments under the version section, credits by fragment origin, drops shipped twins, generates the rest", () => {
  const changelog = `# Changelog

## [Unreleased]

### ✨ New Features

- **feat(old):** shipped last cycle but never moved (#9000)

## [3.8.51] — TBD

### ✨ New Features

### 🐛 Bug Fixes

- **security(streaming):** pre-existing bullet stays verbatim,
  across two lines (#12457)

### 📝 Maintenance

---

## [3.8.50] — 2026-08-25

### 🐛 Bug Fixes

- **fix(cli):** \`omniroute update\` now finds npm on Windows. It called execFile with no shell (#11335)

---
`;
  const rows = [
    {
      hash: "a0ceccc6f0aaaa",
      date: "2026-08-25",
      authorName: "Burak",
      authorEmail: "b@x",
      subject: "feat(search): add Xquik (#11370)",
      refs: [11370],
      pr: 11370,
      coauthors: [],
    },
    {
      hash: "b1b1b1b1b1bbbb",
      date: "2026-08-26",
      authorName: "Zero",
      authorEmail: "z@x",
      subject: "feat(providers): add 1min.ai provider (#11631)",
      refs: [11631],
      pr: 11631,
      coauthors: [],
    },
    {
      hash: "c2c2c2c2c2cccc",
      date: "2026-08-26",
      authorName: "diegosouzapw",
      authorEmail: "d@x",
      subject: "feat(models): recreated (#11887)",
      refs: [11887],
      pr: 11887,
      coauthors: [],
    },
    {
      hash: "d3d3d3d3d3dddd",
      date: "2026-08-27",
      authorName: "Markus Hartung",
      authorEmail: "m@x",
      subject: "fix(x): phantom fragment carrier (#11434)",
      refs: [11434],
      pr: 11434,
      coauthors: [],
    },
    {
      hash: "e4e4e4e4e4eeee",
      date: "2026-08-27",
      authorName: "dependabot[bot]",
      authorEmail: "dep@x",
      subject: "deps: bump a from 1 to 2 (#11500)",
      refs: [11500],
      pr: 11500,
      coauthors: [],
    },
    {
      hash: "f5f5f5f5f5ffff",
      date: "2026-08-28",
      authorName: "diegosouzapw",
      authorEmail: "d@x",
      subject: "chore(release): open v3.8.51 development cycle",
      refs: [],
      pr: null,
      coauthors: [],
    },
    {
      hash: "0606060606aaaa",
      date: "2026-08-29",
      authorName: "diegosouzapw",
      authorEmail: "d@x",
      subject: "fix(streaming): sanitize (#12457)",
      refs: [12457],
      pr: 12457,
      coauthors: [],
    },
  ];
  const prs = [
    {
      number: 11631,
      title: "1min",
      author: { login: "zero-executioner" },
      body: "",
      closingIssuesReferences: [],
    },
    {
      number: 11887,
      title: "recreated",
      author: { login: "diegosouzapw" },
      body: "",
      closingIssuesReferences: [],
    },
    {
      number: 11434,
      title: "carrier",
      author: { login: "hartmark" },
      body: "",
      closingIssuesReferences: [],
    },
    {
      number: 11500,
      title: "bump",
      author: { login: "app/dependabot" },
      body: "",
      closingIssuesReferences: [],
    },
    {
      number: 12457,
      title: "sanitize",
      author: { login: "diegosouzapw" },
      body: "",
      closingIssuesReferences: [],
    },
  ];
  const fragments = [
    // no-ref fragment whose origin commit is the contributor's own PR → link + credit from origin
    {
      path: "changelog.d/features/xquik.md",
      section: "features",
      text: "- **feat(search):** Add Xquik X search\n  with typed results\n",
      originHash: "a0ceccc6f",
      originPr: 11370,
      prefixPr: null,
    },
    // fragment named after the CLOSED PR (11685) but landed by the recreated PR 11887 → origin wins, extra credit applies
    {
      path: "changelog.d/features/11685-antigravity.md",
      section: "features",
      text: "- Default Antigravity connections to auto-sync\n",
      originHash: "c2c2c2c2c",
      originPr: 11887,
      prefixPr: 11685,
    },
    // phantom fragment: text already shipped in [3.8.50] → dropped
    {
      path: "changelog.d/fixes/cli-update-npm-win32.md",
      section: "fixes",
      text: "- **fix(cli):** `omniroute update` now finds npm on Windows. It called execFile with no shell\n",
      originHash: "d3d3d3d3d",
      originPr: 11434,
      prefixPr: null,
    },
  ];
  const { changelog: next, report } = reconcile({
    changelog,
    version: "3.8.51",
    repo: REPO,
    rows,
    prs,
    fragments,
    credits: { 11887: ["MumuTW"] },
    fragmentCredit: { "changelog.d/features/xquik.md": ["kriptoburak"] },
    today: "2026-09-07",
    baseTip: "0915890",
    headTip: "d6f3150",
    skipHashes: new Set(["f5f5f5f5f"]),
  });
  const section = next.slice(next.indexOf("## [3.8.51]"), next.indexOf("## [3.8.50]"));
  // structure
  assert.ok(
    section.includes("### 📊 Release by the numbers") &&
      section.includes("### 🏆 Top 25 contributors this cycle")
  );
  assert.ok(section.indexOf("### ✨ New Features") < section.indexOf("### 🐛 Bug Fixes"));
  // [Unreleased] and [3.8.50] untouched
  assert.ok(next.includes("- **feat(old):** shipped last cycle but never moved (#9000)"));
  assert.equal(
    (next.match(/now finds npm on Windows/g) || []).length,
    1,
    "phantom fragment dropped, original kept"
  );
  // pre-existing bullet verbatim (two lines)
  assert.ok(
    section.includes(
      "- **security(streaming):** pre-existing bullet stays verbatim,\n  across two lines (#12457)"
    )
  );
  // fragment credited by origin + override, collapsed to one line
  assert.ok(
    section.includes(
      `- **feat(search):** Add Xquik X search with typed results — thanks @kriptoburak`
    ),
    section
  );
  // recreated PR: link to the landing PR, credit to the original author
  assert.ok(
    section.includes(
      `- Default Antigravity connections to auto-sync (${link(11887)}) — thanks @MumuTW`
    ),
    section
  );
  // uncovered commit generated with author credit; dependabot rolled up; cycle-open skipped
  assert.ok(
    section.includes(
      `- **feat(providers):** add 1min.ai provider (${link(11631)}) — thanks @zero-executioner`
    )
  );
  assert.ok(section.includes("- **deps:** 1 Dependabot bumps — bump a from 1 to 2"));
  assert.ok(!section.includes("open v3.8.51 development cycle"));
  // the carrier commit of the dropped phantom fragment is NOT silently covered → it gets its own bullet
  assert.ok(
    section.includes(`- **fix(x):** phantom fragment carrier (${link(11434)}) — thanks @hartmark`)
  );
  assert.equal(report.dropped.length, 1);
  assert.equal(report.generated.features, 1);
  assert.equal(
    report.generated.fixes,
    1,
    "12457's own commit is covered by the pre-existing multi-line bullet; only 11434 is generated"
  );
});
