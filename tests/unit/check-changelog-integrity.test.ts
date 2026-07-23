// Guards the anti CHANGELOG-eat gate (scripts/check/check-changelog-integrity.mjs):
// a merge auto-resolve that drops sibling bullets must be detected by comparing
// the merge result against the base branch's CHANGELOG (incident 2026-07-05,
// PR #6193: 212 lines / 130 bullets eaten).
import { test } from "node:test";
import assert from "node:assert/strict";

const { extractBullets, findLostBullets } = await import(
  "../../scripts/check/check-changelog-integrity.mjs"
);

const BASE = `# Changelog

## [Unreleased]

### Bug Fixes

- **fix(a):** first bullet ([#1](https://x/1))
- **fix(b):** second bullet ([#2](https://x/2))

## [3.8.44] — TBD

- **feat(c):** shipped bullet ([#3](https://x/3))
`;

test("extractBullets collects trimmed bullet lines only", () => {
  const b = extractBullets(BASE);
  assert.equal(b.size, 3);
  assert.ok(b.has("- **fix(a):** first bullet ([#1](https://x/1))"));
});

test("no loss when head is a superset (normal additive merge)", () => {
  const head = BASE + "- **fix(d):** new bullet ([#4](https://x/4))\n";
  assert.deepEqual(findLostBullets(BASE, head), []);
});

test("detects an eaten sibling bullet", () => {
  const head = BASE.replace("- **fix(b):** second bullet ([#2](https://x/2))\n", "");
  const lost = findLostBullets(BASE, head);
  assert.deepEqual(lost, ["- **fix(b):** second bullet ([#2](https://x/2))"]);
});

test("detects a whole eaten version section (#6193 pattern)", () => {
  const head = BASE.split("## [3.8.44]")[0];
  const lost = findLostBullets(BASE, head);
  assert.deepEqual(lost, ["- **feat(c):** shipped bullet ([#3](https://x/3))"]);
});

test("bullets moved between sections are NOT reported (line content preserved)", () => {
  const head = BASE.replace(
    "- **fix(a):** first bullet ([#1](https://x/1))\n",
    ""
  ).replace(
    "- **feat(c):** shipped bullet ([#3](https://x/3))",
    "- **feat(c):** shipped bullet ([#3](https://x/3))\n- **fix(a):** first bullet ([#1](https://x/1))"
  );
  assert.deepEqual(findLostBullets(BASE, head), []);
});
