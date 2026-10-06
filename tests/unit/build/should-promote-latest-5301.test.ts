// tests/unit/build/should-promote-latest-5301.test.ts
// Regression guard for #5301 — Docker Hub `:latest` tag not re-pointed on release.
//
// The docker-publish workflow decides whether the just-built VERSION should also
// move `:latest` by extracting the highest STABLE semver from the candidate set.
// The bug: on a `release: released` event the freshly-created git tag is often
// not yet visible to `git fetch --tags`, so a candidate set built purely from
// `git tag -l` resolved HIGHEST to the *previous* version and skipped promotion,
// leaving `latest` one release behind. The fix folds VERSION into the candidate
// set so the decision is independent of tag-sync timing.
//
// Strategy: spawn the real extracted helper (scripts/ci/should-promote-latest.sh)
// with fixture tag lists on stdin — this guards the actual shell code the
// workflow calls, not a parallel reimplementation. Hermetic: no git, no network.

import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { closeSync, mkdtempSync, openSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const SCRIPT = path.resolve(here, "../../../scripts/ci/should-promote-latest.sh");

/**
 * Run the helper with `version` as argv[1] and `tags` (joined by \n) on stdin.
 *
 * stdin is a real FILE, not a pipe, and that is the whole point. The script
 * short-circuits a pre-release VERSION and `exit 0`s WITHOUT ever reading stdin:
 *
 *     case "$VERSION" in
 *       *-*) echo "false"; exit 0 ;;
 *     esac
 *
 * Feeding it through `input:` makes the parent write to a pipe whose reader has
 * already gone away, so the write raises `spawnSync bash EPIPE` — the test throws
 * before it can assert anything. It is a race, not load: whether the write lands
 * before the child exits depends on the 64 KB pipe buffer and the scheduler, which
 * is why it failed intermittently in CI (#8953, #8966) while passing locally.
 * Measured deterministically:
 *
 *          2 tags (     11 bytes) → ok
 *        100 tags (    689 bytes) → ok
 *      5 000 tags ( 43 889 bytes) → ok
 *     20 000 tags (188 889 bytes) → EPIPE, every time
 *
 * A regular file has no reader to lose, so the child may exit whenever it likes.
 * The script's interface is unchanged — it still reads candidate tags from stdin,
 * exactly as docker-publish.yml pipes them in.
 */
function shouldPromote(version: string, tags: string[]): string {
  const dir = mkdtempSync(path.join(os.tmpdir(), "should-promote-latest-"));
  const stdinPath = path.join(dir, "tags");
  writeFileSync(stdinPath, tags.join("\n") + (tags.length ? "\n" : ""));
  const fd = openSync(stdinPath, "r");
  try {
    return execFileSync("bash", [SCRIPT, version], {
      stdio: [fd, "pipe", "pipe"],
      encoding: "utf8",
    }).trim();
  } finally {
    closeSync(fd);
    rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

test("#5301 race: new tag not yet synced → still promotes latest", () => {
  // VERSION just released, but `git tag -l` only shows the previous versions
  // (the new tag hasn't propagated). The old logic returned false here.
  assert.equal(shouldPromote("3.8.39", ["3.8.38", "3.8.37"]), "true");
});

test("new tag already visible → promotes", () => {
  assert.equal(shouldPromote("3.8.39", ["3.8.39", "3.8.38"]), "true");
});

test("first release (no existing tags) → promotes", () => {
  assert.equal(shouldPromote("3.8.39", []), "true");
});

test("patch on an older line while a higher minor exists → does NOT promote", () => {
  // A 3.8.x patch published after 3.9.0 already shipped must not grab :latest.
  assert.equal(shouldPromote("3.8.39", ["3.9.0", "3.8.39", "3.8.38"]), "false");
});

test("pre-release candidate tags are ignored when picking the highest", () => {
  // 3.8.40-rc.1 must not count as higher than the stable 3.8.39.
  assert.equal(shouldPromote("3.8.39", ["3.8.40-rc.1", "3.8.38"]), "true");
});

test("a pre-release VERSION never promotes latest", () => {
  assert.equal(shouldPromote("3.8.40-rc.1", ["3.8.39"]), "false");
});

test("numeric (not lexical) semver ordering", () => {
  // Lexical sort would rank 3.9.0 > 3.10.0; semver -V must rank 3.10.0 highest.
  assert.equal(shouldPromote("3.10.0", ["3.9.0", "3.2.8"]), "true");
  assert.equal(shouldPromote("3.9.0", ["3.10.0", "3.9.0"]), "false");
});

test("candidate tags with a leading `v` are normalized", () => {
  assert.equal(shouldPromote("3.8.39", ["v3.8.38", "v3.8.37"]), "true");
});

test("a pre-release VERSION is decided without reading stdin, at any input size", () => {
  // The regression guard for the harness itself. The script `exit 0`s on a
  // pre-release VERSION before touching stdin; with a pipe-backed stdin this
  // combination raised `spawnSync bash EPIPE` once the payload outgrew the 64 KB
  // pipe buffer — deterministically at 20 000 tags, and intermittently at CI's
  // real tag count, which is what reddened #8953 and #8966 on unrelated diffs.
  //
  // 20 000 tags ≈ 189 KB, comfortably past the buffer. If someone reverts the
  // helper to `input:`, this case throws instead of asserting.
  const manyTags = Array.from({ length: 20_000 }, (_, i) => `3.8.${i}`);
  assert.equal(shouldPromote("3.8.40-rc.1", manyTags), "false");

  // And the decision itself must not depend on the candidate set at all.
  assert.equal(shouldPromote("3.8.40-rc.1", []), "false");
  assert.equal(shouldPromote("4.0.0-beta.2", ["3.8.39"]), "false");
});
