import test from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../scripts/release/gen-contributors.mjs");
const {
  extractVersionSection,
  parseContributors,
  renderContributors,
  injectContributors,
  NOISE_HANDLES,
} = mod;

const FIXTURE = `# Changelog

## [Unreleased]

---

## [3.9.0] — 2026-08-01

### ✨ New Features

- **feat(a):** thing one. ([#100](https://github.com/x/y/pull/100) — thanks @alice)
- **feat(b):** uses \`@toon-format/toon\` and \`@dnd-kit\`. ([#101](https://github.com/x/y/pull/101) — thanks @bob)

### 🔧 Bug Fixes

- **fix(c):** direct commit fix. (thanks @carol)
- **fix(d):** extracted. Extracted from [#102](https://github.com/x/y/pull/102) by [@dave](https://github.com/dave).

### 📝 Maintenance

- **refactor(rollup):** god-file split ([#200](https://github.com/x/y/pull/200), [#201](https://github.com/x/y/pull/201) — thanks @erin); editorconfig ([#202](https://github.com/x/y/pull/202) — thanks @frank). — thanks @diegosouzapw

---

## [3.8.99] — 2026-07-31

### 🔧 Bug Fixes

- **fix(z):** other version, must not leak. ([#999](https://github.com/x/y/pull/999) — thanks @zoe)

---
`;

test("extractVersionSection returns only the target version body (not the next section)", () => {
  const sec = extractVersionSection(FIXTURE, "3.9.0");
  assert.ok(sec.includes("thing one"), "includes 3.9.0 content");
  assert.ok(!sec.includes("must not leak"), "excludes 3.8.99 content");
  assert.ok(!sec.includes("#999"), "does not bleed into next version");
});

test("parseContributors credits per parenthetical group, not a flat scan", () => {
  const agg = parseContributors(extractVersionSection(FIXTURE, "3.9.0"));
  // rollup: erin gets 200+201, frank gets 202 — NOT both getting all three
  assert.deepEqual(
    [...agg.get("erin")].sort((a, b) => a - b),
    [200, 201]
  );
  assert.deepEqual([...agg.get("frank")], [202]);
  // simple bullets
  assert.deepEqual([...agg.get("alice")], [100]);
  // direct-commit credit with no PR ref
  assert.ok(agg.has("carol") && agg.get("carol").size === 0);
  // "Extracted from #N by @X"
  assert.deepEqual([...agg.get("dave")], [102]);
});

test("noise handles and the maintainer are excluded from the contributor map", () => {
  const agg = parseContributors(extractVersionSection(FIXTURE, "3.9.0"));
  assert.ok(!agg.has("toon-format"), "package scope is not a contributor");
  assert.ok(!agg.has("dnd-kit"), "package scope is not a contributor");
  assert.ok(!agg.has("diegosouzapw"), "maintainer is rendered separately, not in the map");
  assert.ok(NOISE_HANDLES.has("toon-format"));
});

test("renderContributors emits an alphabetical table with maintainer last", () => {
  const agg = parseContributors(extractVersionSection(FIXTURE, "3.9.0"));
  const table = renderContributors("3.9.0", agg);
  assert.ok(table.startsWith("### 🙌 Contributors"));
  const rows = table.split("\n").filter((l) => l.startsWith("| [@"));
  const handles = rows.map((r) => r.match(/@([A-Za-z0-9_-]+)/)[1]);
  assert.equal(handles[handles.length - 1], "diegosouzapw", "maintainer is last");
  const external = handles.slice(0, -1);
  assert.deepEqual(
    external,
    [...external].sort((a, b) => a.localeCompare(b)),
    "external sorted"
  );
  assert.ok(table.includes("| [@carol](https://github.com/carol) | direct commit / report |"));
});

test("injectContributors inserts before the closing --- and is idempotent", () => {
  const once = injectContributors(
    FIXTURE,
    "3.9.0",
    renderContributors("3.9.0", parseContributors(extractVersionSection(FIXTURE, "3.9.0")))
  );
  assert.ok(once.includes("### 🙌 Contributors"), "section injected");
  // 3.8.99 untouched
  assert.ok(once.includes("must not leak"));
  // idempotent: injecting again does not duplicate
  const twice = injectContributors(
    once,
    "3.9.0",
    renderContributors("3.9.0", parseContributors(extractVersionSection(once, "3.9.0")))
  );
  const count = (twice.match(/### 🙌 Contributors/g) || []).length;
  assert.equal(count, 1, "no duplicate Contributors section on re-run");
});
