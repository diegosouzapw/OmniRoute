import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import fsSync from "node:fs";
import os from "node:os";
import path from "node:path";

const {
  ensureWindowsBuildProfileDirs,
  getWindowsBuildProfileDir,
  resolveNextBuildEnv,
} = await import("../../scripts/build/build-next-isolated.mjs");

// Port of decolua/9router#2402 ("fix(build): isolate Windows HOME/AppData during
// next build"). Upstream wraps `npm run build` in a new `scripts/build-app.js`
// entrypoint; OmniRoute's build already routes through
// `scripts/build/build-next-isolated.mjs` → resolveNextBuildEnv(), so the fix is
// folded into that existing seam instead of adding a second build entrypoint.
// `.github/workflows/electron-release.yml` already sanitizes USERPROFILE for one
// CI job; this generalizes the isolation to every caller (local Windows builds,
// other CI paths) and adds APPDATA/LOCALAPPDATA, which the CI-only patch does not
// touch.

test("resolveNextBuildEnv leaves HOME/USERPROFILE/APPDATA untouched on non-Windows", () => {
  const env = resolveNextBuildEnv({ NODE_ENV: "test", HOME: "/home/dev" }, "linux");
  assert.equal(env.HOME, "/home/dev");
  assert.equal(env.USERPROFILE, undefined);
  assert.equal(env.APPDATA, undefined);
  assert.equal(env.LOCALAPPDATA, undefined);
});

test("resolveNextBuildEnv isolates HOME/USERPROFILE/APPDATA/LOCALAPPDATA on win32", () => {
  const env = resolveNextBuildEnv(
    { NODE_ENV: "test", USERPROFILE: "C:\\Users\\ci-runner" },
    "win32"
  );

  assert.ok(env.HOME, "HOME must be set to an isolated profile dir on win32");
  assert.equal(env.HOME, env.USERPROFILE, "HOME and USERPROFILE must point at the same sandbox");
  assert.notEqual(
    env.USERPROFILE,
    "C:\\Users\\ci-runner",
    "the real USERPROFILE (with its junctions) must be replaced, not preserved"
  );
  assert.match(path.basename(env.APPDATA), /^Roaming$/);
  assert.match(path.basename(env.LOCALAPPDATA), /^Local$/);
  assert.equal(path.dirname(path.dirname(env.APPDATA)), env.HOME);
  assert.equal(path.dirname(path.dirname(env.LOCALAPPDATA)), env.HOME);
});

test("resolveNextBuildEnv skips Windows isolation when a caller already sandboxed the build (NEXT_DIST_DIR)", () => {
  const env = resolveNextBuildEnv(
    { NODE_ENV: "test", USERPROFILE: "C:\\Users\\ci-runner", NEXT_DIST_DIR: ".build/cli-next" },
    "win32"
  );

  assert.equal(
    env.USERPROFILE,
    "C:\\Users\\ci-runner",
    "must not override a caller-provided sandbox (e.g. CLI packaging)"
  );
  assert.equal(env.APPDATA, undefined);
  assert.equal(env.LOCALAPPDATA, undefined);
});

test("getWindowsBuildProfileDir is stable per-process (repeated calls return the same path)", () => {
  assert.equal(getWindowsBuildProfileDir(), getWindowsBuildProfileDir());
});

test("ensureWindowsBuildProfileDirs is a no-op when the env has no APPDATA/LOCALAPPDATA", () => {
  let called = false;
  ensureWindowsBuildProfileDirs({ NODE_ENV: "test" }, () => {
    called = true;
  });
  assert.equal(called, false);
});

test("ensureWindowsBuildProfileDirs creates the isolated AppData directories", async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-win-home-test-"));
  try {
    const env = {
      APPDATA: path.join(tempDir, "AppData", "Roaming"),
      LOCALAPPDATA: path.join(tempDir, "AppData", "Local"),
    };

    ensureWindowsBuildProfileDirs(env);

    assert.equal(fsSync.existsSync(env.APPDATA), true);
    assert.equal(fsSync.existsSync(env.LOCALAPPDATA), true);
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
});
