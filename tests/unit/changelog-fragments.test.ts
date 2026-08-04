// Guards the changelog FRAGMENTS pipeline (changelog.d/ → CHANGELOG.md), adopted
// 2026-07-09 to kill the CHANGELOG-eat / DIRTY merge-storm cascade: a PR adds ONE new
// file under changelog.d/<section>/ instead of editing CHANGELOG.md, so sibling PRs
// never conflict. Covers the aggregator (scripts/release/aggregate-changelog.mjs) and
// the fragment validation wired into the merge-integrity gate
// (scripts/check/check-changelog-integrity.mjs::findInvalidFragments).
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const { SECTIONS, validateFragmentText, collectFragments, insertBullets, aggregate } =
  await import("../../scripts/release/aggregate-changelog.mjs");
const { findInvalidFragments } = await import("../../scripts/check/check-changelog-integrity.mjs");

const CHANGELOG_FIXTURE = `# Changelog

## [Unreleased]

## [3.8.47] — TBD

_Living section — bullets land here as PRs merge._

### ✨ New Features

- **existing feature**: already here (#1 — thanks @a)

### 🐛 Bug Fixes

- **fix(x):** existing fix (#2 — thanks @b)

### 📝 Maintenance

- chore: existing maintenance (#3)

## [3.8.46] - 2026-07-04

### ✨ New Features

- **old feature**: shipped (#0)
`;

function makeRoot({ fragments = {} } = {}) {
  const root = mkdtempSync(join(tmpdir(), "chfrag-"));
  writeFileSync(join(root, "CHANGELOG.md"), CHANGELOG_FIXTURE);
  mkdirSync(join(root, "changelog.d"), { recursive: true });
  for (const [rel, text] of Object.entries(fragments)) {
    const abs = join(root, "changelog.d", rel);
    mkdirSync(join(abs, ".."), { recursive: true });
    writeFileSync(abs, text);
  }
  return root;
}

test("validateFragmentText accepts a bullet and rejects garbage", () => {
  assert.equal(validateFragmentText("- **fix:** ok (#9 — thanks @x)"), null);
  assert.equal(validateFragmentText("- multi\n  continuation line"), null);
  assert.match(validateFragmentText(""), /empty/);
  assert.match(validateFragmentText("not a bullet"), /must start/);
  assert.match(validateFragmentText("- ok\n<<<<<<< HEAD"), /conflict markers/);
});

test("collectFragments reads sections sorted and flags invalid files", () => {
  const root = makeRoot({
    fragments: {
      "fixes/6700-b.md": "- fix B (#6700)",
      "fixes/6496-a.md": "- fix A (#6496)",
      "features/6728-chaos.md": "- feat chaos (#6728)",
      "features/bad.md": "no bullet here",
    },
  });
  const c = collectFragments(root);
  assert.deepEqual(
    c.fixes.map((f) => f.text),
    ["- fix A (#6496)", "- fix B (#6700)"]
  );
  assert.equal(c.features.length, 1);
  assert.equal(c.invalid.length, 1);
  assert.match(c.invalid[0].file, /bad\.md/);
  rmSync(root, { recursive: true, force: true });
});

test("insertBullets appends at the END of each living section", () => {
  const out = insertBullets(CHANGELOG_FIXTURE, {
    features: [{ text: "- NEW feature bullet (#10)" }],
    fixes: [{ text: "- NEW fix bullet (#11)" }],
    maintenance: [{ text: "- NEW maintenance bullet (#12)" }],
  });
  const lines = out.split("\n");
  const featIdx = lines.indexOf("- NEW feature bullet (#10)");
  const bugHeadIdx = lines.indexOf("### 🐛 Bug Fixes");
  const fixIdx = lines.indexOf("- NEW fix bullet (#11)");
  const maintHeadIdx = lines.indexOf("### 📝 Maintenance");
  const maintIdx = lines.indexOf("- NEW maintenance bullet (#12)");
  // Each new bullet lands after its own existing bullets, before the next heading.
  assert.ok(featIdx > lines.indexOf("- **existing feature**: already here (#1 — thanks @a)"));
  assert.ok(featIdx < bugHeadIdx, "feature bullet must stay inside the features section");
  assert.ok(fixIdx > bugHeadIdx && fixIdx < maintHeadIdx);
  assert.ok(maintIdx > maintHeadIdx && maintIdx < lines.indexOf("## [3.8.46] - 2026-07-04"));
  // Only the FIRST (living) occurrence of a heading is touched — the shipped 3.8.46
  // section is byte-identical.
  assert.ok(out.includes("## [3.8.46] - 2026-07-04\n\n### ✨ New Features\n\n- **old feature**: shipped (#0)"));
  // No existing bullet lost.
  for (const existing of ["#1 — thanks @a", "existing fix (#2", "existing maintenance (#3"]) {
    assert.ok(out.includes(existing));
  }
});

test("insertBullets throws when a needed heading is missing", () => {
  const noMaint = CHANGELOG_FIXTURE.replace("### 📝 Maintenance\n\n- chore: existing maintenance (#3)\n", "");
  assert.throws(
    () => insertBullets(noMaint, { maintenance: [{ text: "- x" }] }),
    /📝 Maintenance.*not found/s
  );
});

test("aggregate dry-run touches nothing; real run writes and deletes fragments", () => {
  const root = makeRoot({
    fragments: { "fixes/6800-real.md": "- real aggregated fix (#6800 — thanks @c)" },
  });
  const dry = aggregate({ root, dryRun: true });
  assert.equal(dry.total, 1);
  assert.ok(!readFileSync(join(root, "CHANGELOG.md"), "utf8").includes("#6800"));
  assert.ok(existsSync(join(root, "changelog.d/fixes/6800-real.md")));

  const real = aggregate({ root });
  assert.equal(real.total, 1);
  const after = readFileSync(join(root, "CHANGELOG.md"), "utf8");
  assert.ok(after.includes("- real aggregated fix (#6800 — thanks @c)"));
  assert.ok(!existsSync(join(root, "changelog.d/fixes/6800-real.md")), "fragment must be deleted");

  // Idempotence: nothing left → second run is a no-op.
  const again = aggregate({ root });
  assert.equal(again.total, 0);
  assert.equal(readFileSync(join(root, "CHANGELOG.md"), "utf8"), after);
  rmSync(root, { recursive: true, force: true });
});

test("aggregate refuses invalid fragments loudly", () => {
  const root = makeRoot({ fragments: { "features/oops.md": "forgot the dash" } });
  assert.throws(() => aggregate({ root }), /invalid changelog fragments/);
  rmSync(root, { recursive: true, force: true });
});

test("gate findInvalidFragments: clean tree passes, bad placement/content fail", () => {
  const clean = makeRoot({ fragments: { "maintenance/1-ok.md": "- ok (#1)" } });
  assert.deepEqual(findInvalidFragments(clean), []);
  rmSync(clean, { recursive: true, force: true });

  const dirty = makeRoot({
    fragments: {
      "stray.md": "- misplaced at root",
      "unknown-section/2-x.md": "- wrong dir",
      "fixes/3-bad.md": "missing dash",
    },
  });
  const invalid = findInvalidFragments(dirty);
  const files = invalid.map((i) => i.file).sort();
  assert.equal(invalid.length, 3);
  assert.ok(files.some((f) => f.includes("stray.md")));
  assert.ok(files.some((f) => f.includes("unknown-section")));
  assert.ok(files.some((f) => f.includes("3-bad.md")));
  rmSync(dirty, { recursive: true, force: true });
});

test("gate skips README.md and .gitkeep; absent changelog.d is fine", () => {
  const root = makeRoot();
  writeFileSync(join(root, "changelog.d/README.md"), "# docs, not a fragment");
  mkdirSync(join(root, "changelog.d/fixes"), { recursive: true });
  writeFileSync(join(root, "changelog.d/fixes/.gitkeep"), "");
  assert.deepEqual(findInvalidFragments(root), []);
  rmSync(root, { recursive: true, force: true });

  const bare = mkdtempSync(join(tmpdir(), "chfrag-bare-"));
  assert.deepEqual(findInvalidFragments(bare), []);
  rmSync(bare, { recursive: true, force: true });
});

test("SECTIONS maps every dir to a real living-section heading in the fixture", () => {
  for (const heading of Object.values(SECTIONS)) {
    assert.ok(CHANGELOG_FIXTURE.includes(heading), `fixture must contain ${heading}`);
  }
});
