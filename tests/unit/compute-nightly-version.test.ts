/**
 * Nightly version + npm dist-tag resolution for the 3.9.0 LTS / v4 rail
 * (docs/ops/RELEASE_STRATEGY.md). Pure functions only — the workflows call the
 * CLI entry points, these tests pin the decisions they make.
 *
 * Regression guard for the Task 6 finding: npm-publish.yml's `tag=auto` did not
 * know `-nightly`, so a `4.0.0-nightly.*` build fell through to the stable path
 * and could claim `latest`; and nothing could publish a 3.9.x patch after the
 * 4.0 GA without either clobbering `latest` or landing on `historic`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  computeNightlyVersion,
  formatUtcDate,
  resolveDistTag,
} from "../../scripts/release/compute-nightly-version.mjs";
import {
  parseVersion,
  resolvePublishDistTag,
  highestStableMajor,
} from "../../scripts/release/dist-tag.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const DATE = new Date(Date.UTC(2026, 9, 9, 23, 59, 59)); // 2026-10-09 UTC

// ── computeNightlyVersion ──────────────────────────────────────────────────

test("nightly version = <core>-nightly.<YYYYMMDD>.<sha7>", () => {
  assert.equal(
    computeNightlyVersion({ baseVersion: "4.0.0", date: DATE, sha: "f90e64a1c9abcdef" }),
    "4.0.0-nightly.20261009.f90e64a"
  );
});

test("the date is UTC, not the runner's local time", () => {
  // 00:30 UTC on Oct 10 is still Oct 9 in every American timezone.
  const justAfterMidnightUtc = new Date(Date.UTC(2026, 9, 10, 0, 30, 0));
  assert.equal(formatUtcDate(justAfterMidnightUtc), "20261010");
  assert.equal(formatUtcDate(new Date(Date.UTC(2027, 0, 5))), "20270105");
});

test("a pre-release base keeps only its core version", () => {
  assert.equal(
    computeNightlyVersion({ baseVersion: "4.0.0-rc.3", date: DATE, sha: "ABCDEF1234" }),
    "4.0.0-nightly.20261009.abcdef1"
  );
  assert.equal(
    computeNightlyVersion({ baseVersion: "v4.1.2", date: DATE, sha: "abcdef1" }),
    "4.1.2-nightly.20261009.abcdef1"
  );
});

test("an all-digit short SHA is prefixed so the identifier stays valid semver", () => {
  // `0123456` is a numeric pre-release identifier with a leading zero — npm rejects it.
  const version = computeNightlyVersion({ baseVersion: "4.0.0", date: DATE, sha: "0123456789" });
  assert.equal(version, "4.0.0-nightly.20261009.g0123456");
  assert.ok(parseVersion(version), "result must parse as semver");
});

test("rejects malformed inputs instead of emitting an unsafe version", () => {
  assert.throws(() => computeNightlyVersion({ baseVersion: "4.0", date: DATE, sha: "abcdef1" }));
  assert.throws(() =>
    computeNightlyVersion({ baseVersion: "4.0.0; rm -rf /", date: DATE, sha: "abcdef1" })
  );
  assert.throws(() => computeNightlyVersion({ baseVersion: "4.0.0", date: DATE, sha: "abc" }));
  assert.throws(() => computeNightlyVersion({ baseVersion: "4.0.0", date: DATE, sha: "zzzzzzz" }));
  assert.throws(() =>
    computeNightlyVersion({ baseVersion: "4.0.0", date: new Date(Number.NaN), sha: "abcdef1" })
  );
});

// ── resolveDistTag ─────────────────────────────────────────────────────────

test("-nightly. versions resolve to the nightly dist-tag (never latest)", () => {
  assert.equal(resolveDistTag("4.0.0-nightly.20261009.f90e64a"), "nightly");
  assert.equal(resolveDistTag("4.0.0-nightly.20261009.f90e64a", { latestMajor: 3 }), "nightly");
});

test("rc/beta/alpha (and the legacy pre/next suffixes) resolve to next", () => {
  for (const v of ["4.0.0-rc.1", "4.0.0-beta.2", "4.0.0-alpha.0", "3.0.0-pre.1", "3.0.0-next.4"]) {
    assert.equal(resolveDistTag(v), "next", v);
  }
});

test("an unknown pre-release suffix never claims latest", () => {
  assert.equal(resolveDistTag("3.9.0-hotfix.1"), "next");
});

test("stable 3.8.x keeps resolving to latest (current behavior preserved)", () => {
  assert.equal(resolveDistTag("3.8.52"), "latest");
  assert.equal(resolveDistTag("3.8.52", { latestMajor: 3 }), "latest");
});

test("a stable 3.x published after the 4.0 GA resolves to lts", () => {
  assert.equal(resolveDistTag("3.9.4", { latestMajor: 4 }), "lts");
  assert.equal(resolveDistTag("4.0.1", { latestMajor: 4 }), "latest");
  assert.equal(resolveDistTag("5.0.0", { latestMajor: 4 }), "latest");
});

test("resolveDistTag rejects a non-semver version", () => {
  assert.throws(() => resolveDistTag("latest"));
  assert.throws(() => resolveDistTag(""));
});

// ── resolvePublishDistTag (the npm-publish.yml `auto` decision) ────────────

const TAGS_V3 = ["v3.8.50", "v3.8.51", "v3.8.52", "v4.0.0-rc.1", "v3.8.53-rc.1"];
const TAGS_GA = [...TAGS_V3, "v3.9.0", "v3.9.3", "v4.0.0", "v4.0.1"];

test("highestStableMajor ignores pre-release tags", () => {
  assert.equal(highestStableMajor(TAGS_V3), 3);
  assert.equal(highestStableMajor(TAGS_GA), 4);
  assert.equal(highestStableMajor([]), null);
});

test("auto: the highest stable 3.8.x claims latest; an older one goes historic", () => {
  assert.equal(resolvePublishDistTag({ version: "3.8.52", gitTags: TAGS_V3 }), "latest");
  assert.equal(resolvePublishDistTag({ version: "3.8.51", gitTags: TAGS_V3 }), "historic");
  assert.equal(resolvePublishDistTag({ version: "3.8.52", gitTags: [] }), "historic");
});

test("auto: a 4.0.0 nightly before the GA goes to nightly, never latest", () => {
  assert.equal(
    resolvePublishDistTag({ version: "4.0.0-nightly.20261009.f90e64a", gitTags: TAGS_V3 }),
    "nightly"
  );
});

test("auto: rc goes to next", () => {
  assert.equal(resolvePublishDistTag({ version: "4.0.0-rc.2", gitTags: TAGS_V3 }), "next");
});

test("auto after 4.0 GA: the newest 3.x patch goes to lts, an older 3.x to historic", () => {
  assert.equal(resolvePublishDistTag({ version: "3.9.3", gitTags: TAGS_GA }), "lts");
  assert.equal(resolvePublishDistTag({ version: "3.9.0", gitTags: TAGS_GA }), "historic");
  assert.equal(resolvePublishDistTag({ version: "4.0.1", gitTags: TAGS_GA }), "latest");
  assert.equal(resolvePublishDistTag({ version: "4.0.0", gitTags: TAGS_GA }), "historic");
});

test("auto: semver compares numerically, not lexically (3.8.100 > 3.8.99)", () => {
  const tags = ["v3.8.99", "v3.8.100"];
  assert.equal(resolvePublishDistTag({ version: "3.8.100", gitTags: tags }), "latest");
  assert.equal(resolvePublishDistTag({ version: "3.8.99", gitTags: tags }), "historic");
});

test("explicit tags are honored verbatim; unknown ones are refused", () => {
  for (const tag of ["latest", "next", "historic", "nightly", "lts"]) {
    assert.equal(
      resolvePublishDistTag({ version: "3.8.51", requested: tag, gitTags: TAGS_V3 }),
      tag
    );
  }
  assert.equal(
    resolvePublishDistTag({ version: "3.8.52", requested: "auto", gitTags: TAGS_V3 }),
    "latest"
  );
  assert.throws(() =>
    resolvePublishDistTag({ version: "3.8.52", requested: "beta", gitTags: TAGS_V3 })
  );
});

// ── CLI entry points (what the workflows actually execute) ─────────────────

test("dist-tag CLI takes --version/--requested argv and git tags from stdin", () => {
  const run = (args: string[]) =>
    execFileSync(process.execPath, ["scripts/release/dist-tag.mjs", ...args], {
      cwd: repoRoot,
      input: TAGS_V3.join("\n"),
      encoding: "utf8",
    }).trim();
  assert.equal(
    run(["--version", "4.0.0-nightly.20261009.f90e64a", "--requested", "auto"]),
    "nightly"
  );
  assert.equal(run(["--version", "3.8.52"]), "latest");
});

test("dist-tag CLI exits non-zero on a non-semver version", () => {
  const res = spawnSync(process.execPath, ["scripts/release/dist-tag.mjs", "--version", "x; rm"], {
    cwd: repoRoot,
    input: "",
    encoding: "utf8",
  });
  assert.equal(res.status, 1);
  assert.match(res.stderr, /Not a semver version/);
});

test("nightly CLI prints a version built from --base/--sha/--date", () => {
  const out = execFileSync(
    process.execPath,
    [
      "scripts/release/compute-nightly-version.mjs",
      "--base",
      "4.0.0",
      "--sha",
      "f90e64a1c9",
      "--date",
      "2026-10-09T12:00:00Z",
    ],
    { cwd: repoRoot, encoding: "utf8" }
  );
  assert.equal(out.trim(), "4.0.0-nightly.20261009.f90e64a");
});
