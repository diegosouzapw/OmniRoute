import assert from "node:assert/strict";
import { test } from "node:test";
import {
  classifyInstallOutcome,
  orphanStagingDirFromStderr,
} from "../../../scripts/ops/deployCanary.ts";

/**
 * `npm install -g <tarball>` on the .17 gateway finishes writing the package and then fails
 * while renaming the old tree into its staging directory:
 *
 *   npm error code ENOTEMPTY
 *   npm error syscall rename
 *   npm error path /usr/lib/node_modules/omniroute
 *   npm error dest /usr/lib/node_modules/.omniroute-h797OOZa
 *
 * Exit status is 217, but `dist/BUILD_SHA`, the package version and every dependency are the
 * new ones. The canary treated the non-zero exit as "install failed", aborted before the
 * restart, and discarded npm's stderr — so the deploy stopped half-done twice (2026-08-18)
 * with no clue in the log about why.
 *
 * The exit code is not the source of truth here; the SHA on disk is. These cases pin that,
 * including the inverse trap: a ZERO exit that installed the wrong artifact must still fail.
 */

const ENOTEMPTY_STDERR = [
  "npm warn deprecated boolean@3.2.0: Package no longer supported.",
  "npm error code ENOTEMPTY",
  "npm error syscall rename",
  "npm error path /usr/lib/node_modules/omniroute",
  "npm error dest /usr/lib/node_modules/.omniroute-h797OOZa",
  "npm error ENOTEMPTY: directory not empty, rename '/usr/lib/node_modules/omniroute' -> " +
    "'/usr/lib/node_modules/.omniroute-h797OOZa'",
].join("\n");

test("non-zero exit with the expected SHA on disk is a cleanup failure, not an install failure", () => {
  const outcome = classifyInstallOutcome({
    exitCode: 217,
    stderr: ENOTEMPTY_STDERR,
    installedSha: "22b89a273b",
    expectedSha: "22b89a273b",
  });
  assert.equal(outcome.installed, true, "the artifact is on disk — the deploy must continue");
  assert.equal(outcome.kind, "installed-with-cleanup-failure");
  assert.match(outcome.reason, /ENOTEMPTY|cleanup/i);
});

test("a clean install is reported as such", () => {
  const outcome = classifyInstallOutcome({
    exitCode: 0,
    stderr: "",
    installedSha: "22b89a273b",
    expectedSha: "22b89a273b",
  });
  assert.equal(outcome.installed, true);
  assert.equal(outcome.kind, "installed");
});

test("non-zero exit with a stale SHA is a real failure", () => {
  const outcome = classifyInstallOutcome({
    exitCode: 217,
    stderr: ENOTEMPTY_STDERR,
    installedSha: "e05ac345da",
    expectedSha: "22b89a273b",
  });
  assert.equal(outcome.installed, false);
  assert.equal(outcome.kind, "failed");
});

test("a ZERO exit that left the wrong artifact still fails", () => {
  // The 2026-08-14 outage shipped a package built from the wrong branch. An install that
  // "succeeds" while the SHA does not match must never be waved through.
  const outcome = classifyInstallOutcome({
    exitCode: 0,
    stderr: "",
    installedSha: "178febc50f",
    expectedSha: "22b89a273b",
  });
  assert.equal(outcome.installed, false);
  assert.equal(outcome.kind, "failed");
});

test("an unreadable SHA fails closed", () => {
  for (const installedSha of ["", null, undefined]) {
    const outcome = classifyInstallOutcome({
      exitCode: 0,
      stderr: "",
      installedSha: installedSha as string | null,
      expectedSha: "22b89a273b",
    });
    assert.equal(outcome.installed, false, `installedSha=${JSON.stringify(installedSha)}`);
    assert.equal(outcome.kind, "failed");
  }
});

test("the orphaned staging directory is extracted so the operator can clear it", () => {
  assert.equal(
    orphanStagingDirFromStderr(ENOTEMPTY_STDERR),
    "/usr/lib/node_modules/.omniroute-h797OOZa"
  );
});

test("no staging directory is invented when npm did not report one", () => {
  assert.equal(orphanStagingDirFromStderr(""), null);
  assert.equal(orphanStagingDirFromStderr("npm error code EACCES"), null);
});
