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
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const SCRIPT = path.resolve(here, "../../../scripts/ci/should-promote-latest.sh");

/** Run the helper with `version` as argv[1] and `tags` (joined by \n) on stdin. */
function shouldPromote(version: string, tags: string[]): string {
  return execFileSync("bash", [SCRIPT, version], {
    input: tags.join("\n") + (tags.length ? "\n" : ""),
    encoding: "utf8",
  }).trim();
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
