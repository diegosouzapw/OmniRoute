/**
 * Regression tests for #5379 — `spawn EINVAL` installing embedded services
 * (9Router / CLIProxy) on Windows + Node.js 24+.
 *
 * Node 24 no longer lets `child_process.execFile()` run `.cmd` batch files on
 * Windows without a shell (nodejs/node#52554). npm on Windows is `npm.cmd`, so
 * `runNpm()` threw `EINVAL` immediately. The fix flips `shell` on win32.
 *
 * Because `shell: true` makes the shell — not execFile — parse the command line,
 * NO runtime value may be interpolated into argv (Hard Rule #13). The install
 * `--prefix` (a DATA_DIR path that can contain spaces, e.g.
 * `C:\Users\John Doe\.omniroute\…`) is therefore passed via the
 * `npm_config_prefix` environment variable instead of an argv entry, and the
 * user-supplied install `version` is constrained by SERVICE_VERSION_PATTERN.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  buildNpmExecOptions,
  SERVICE_VERSION_PATTERN,
} from "../../../../src/lib/services/installers/utils.ts";

test("buildNpmExecOptions: win32 enables shell so npm.cmd runs on Node 24 (#5379)", () => {
  const opts = buildNpmExecOptions("win32", { timeoutMs: 1000 });
  assert.equal(opts.shell, true);
});

test("buildNpmExecOptions: non-win32 platforms never enable shell", () => {
  for (const platform of ["linux", "darwin", "freebsd"] as NodeJS.Platform[]) {
    const opts = buildNpmExecOptions(platform, { timeoutMs: 1000 });
    assert.equal(opts.shell, undefined, `${platform} must not use a shell`);
  }
});

test("buildNpmExecOptions: prefix is passed via npm_config_prefix env, never argv (Hard Rule #13)", () => {
  const prefix = "C:\\Users\\John Doe\\.omniroute\\services\\9router";
  const opts = buildNpmExecOptions("win32", { timeoutMs: 1000, prefix });
  assert.equal(opts.env.npm_config_prefix, prefix);
});

test("buildNpmExecOptions: without a prefix npm_config_prefix is left untouched", () => {
  const inherited = process.env.npm_config_prefix;
  const opts = buildNpmExecOptions("linux", { timeoutMs: 1000 });
  assert.equal(opts.env.npm_config_prefix, inherited);
});

test("buildNpmExecOptions: carries cwd, timeout and maxBuffer through", () => {
  const opts = buildNpmExecOptions("linux", { cwd: "/tmp/install", timeoutMs: 4242 });
  assert.equal(opts.cwd, "/tmp/install");
  assert.equal(opts.timeout, 4242);
  assert.equal(opts.maxBuffer, 10 * 1024 * 1024);
});

// Regression for #8131 — windowsHide: true must be set on every execFile/spawn
// options object so Windows does not flash a transient conhost.exe/cmd window
// for the npm child process runNpm() spawns.
test("buildNpmExecOptions: windowsHide is always true regardless of platform", () => {
  for (const platform of ["win32", "linux", "darwin", "freebsd"] as NodeJS.Platform[]) {
    const opts = buildNpmExecOptions(platform, { timeoutMs: 1000 });
    assert.equal(opts.windowsHide, true, `${platform} must set windowsHide: true (#8131)`);
  }
});

test("SERVICE_VERSION_PATTERN: accepts dist-tags and semver", () => {
  for (const v of ["latest", "next", "1.2.3", "1.2.3-beta.1", "1.2.3+build.5", "0.4.59"]) {
    assert.ok(SERVICE_VERSION_PATTERN.test(v), `${v} should be valid`);
  }
});

test("SERVICE_VERSION_PATTERN: rejects shell metacharacters (injection guard)", () => {
  for (const v of [
    "latest && calc",
    "1.2.3; rm -rf /",
    "$(whoami)",
    "`id`",
    "a|b",
    "a b",
    "",
    "-flag",
  ]) {
    assert.equal(SERVICE_VERSION_PATTERN.test(v), false, `${JSON.stringify(v)} must be rejected`);
  }
});
