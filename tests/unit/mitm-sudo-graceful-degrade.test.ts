/**
 * Regression test for MITM cert install in Docker `USER node` (non-root, no sudo).
 *
 * OmniRoute's runtime Docker image (`Dockerfile`) runs as `USER node` (UID 1000)
 * and the slim base (`node:24-trixie-slim`) does NOT ship `sudo`. The previous
 * `execFileWithPassword("sudo", ["-S", ...])` would spawn `sudo` unconditionally
 * when not root, producing `spawn sudo ENOENT` and breaking `installCert` /
 * `addDNSEntries` for any MITM operation triggered from inside the container.
 *
 * The fix:
 *  - `isSudoAvailable()` probes `PATH` for `sudo`.
 *  - `execFileWithPassword` when invoked with `command === "sudo"` and sudo is
 *    NOT available and the process is NOT root, strips the leading `sudo -S`
 *    flags and runs the underlying command directly (same user, no elevation).
 *  - Callers that absolutely require elevation (e.g. installing a CA to the
 *    system trust store) can pre-check with `isSudoAvailable()` and skip with
 *    a clear log instead of throwing.
 *
 * This mirrors upstream behavior (decolua/9router) extended to OmniRoute's TS
 * fork and OmniRoute's existing root-detection (`isRoot()`).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileWithPassword, isRoot, isSudoAvailable } from "../../src/mitm/systemCommands.ts";

test("isSudoAvailable: returns a boolean (probe shape)", () => {
  const result = isSudoAvailable();
  assert.equal(typeof result, "boolean");
});

test("execFileWithPassword: when command is 'sudo' but sudo is missing, falls back to direct exec (no ENOENT)", async () => {
  if (isRoot()) {
    // Root path is already handled by an earlier branch — skip.
    return;
  }

  if (isSudoAvailable()) {
    // We cannot exercise the no-sudo path on a host that has sudo on PATH.
    // The dedicated unit test below covers it by isolating PATH.
    return;
  }

  // Use a no-op binary that succeeds without requiring privileges.
  // After stripping `sudo -S`, the underlying command must be `true` (or any
  // executable in PATH that exits 0).
  const result = await execFileWithPassword("sudo", ["-S", "true"], "fake-password");
  assert.equal(typeof result, "string");
});

test("execFileWithPassword: with empty PATH so sudo is undiscoverable, falls back gracefully", async () => {
  if (isRoot()) {
    // Root branch strips sudo upstream — covered separately.
    return;
  }

  // Force the discovery probe to find no sudo by clearing PATH temporarily.
  // We do this only around the probe call inside `execFileWithPassword`,
  // by stubbing the env. Restore on test exit.
  const originalPath = process.env.PATH;
  process.env.PATH = "/__no_such_dir__";
  try {
    // After fallback, the bare command must be a valid executable. We use
    // the current Node binary with `process.exit(0)` so it is portable
    // regardless of which utilities (`true`, `:`) exist in the path.
    const result = await execFileWithPassword(
      "sudo",
      ["-S", process.execPath, "-e", "process.exit(0)"],
      "fake-password"
    );
    assert.equal(typeof result, "string");
  } finally {
    process.env.PATH = originalPath;
  }
});

test("execFileWithPassword: a non-sudo command is unaffected by the fallback path", async () => {
  // Direct invocation of a known-good binary must still work end-to-end.
  const result = await execFileWithPassword(
    process.execPath,
    ["-e", "process.exit(0)"],
    "" // no password needed
  );
  assert.equal(typeof result, "string");
});
