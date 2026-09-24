/**
 * Regression test — `initAuggieModels()` and `checkAuggieCliVersion()` still
 * failed on Windows with `spawn EINVAL` after the #6304 fix.
 *
 * #6304 fixed the two request-time spawn sites (spawnAuggie/runStreaming) by
 * routing them through the shared buildAuggieSpawnOptions() helper, which sets
 * `shell: true` on win32. The discovery spawn in `initAuggieModels()` and the
 * `--version` spawn in `checkAuggieCliVersion()` were left bypassing it:
 *
 *   - resolveAuggieBin() falls back to the global-npm `auggie.cmd` shim on win32
 *   - since Node's CVE-2024-27980 fix (>=18.20.2/20.12.2/21.7.3), `spawn()` on a
 *     `.cmd`/`.bat` target WITHOUT `shell: true` throws `[ERR_INVALID_ARG_VALUE]
 *     spawn EINVAL` synchronously
 *
 * This is inherently Windows-only (POSIX shells have no .cmd shim), so the test
 * is skipped on non-win32 platforms.
 *
 * The fake bin is a real Windows batch file, so the test exercises the actual
 * spawn path end-to-end (no node:child_process mocking — same tradeoff as
 * tests/unit/auggie-executor.test.ts).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const { checkAuggieCliVersion, initAuggieModels, resolveAuggieModel, __resetAuggieModels } =
  await import("@omniroute/open-sse/executors/auggie");

const isWin32 = process.platform === "win32";
const TMP_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auggie-win32-test-"));

/** Write a Windows batch stand-in for the auggie CLI. */
function writeFakeCmd(name: string, body: string): string {
  const p = path.join(TMP_DIR, name);
  fs.writeFileSync(p, `@echo off\r\n${body}\r\n`);
  return p;
}

test.after(() => {
  if (isWin32) __resetAuggieModels();
  fs.rmSync(TMP_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test(
  "checkAuggieCliVersion runs a .cmd shim on win32 (spawn EINVAL regression)",
  { skip: !isWin32 },
  async () => {
    const bin = writeFakeCmd(
      "fake-auggie-version.cmd",
      [
        `if "%1"=="--version" (`,
        `  echo 0.36.0-fake`,
        `  exit /b 0`,
        `)`,
        `echo unexpected`,
        `exit /b 1`,
      ].join("\r\n")
    );
    const prevBin = process.env.AUGGIE_BIN;
    process.env.AUGGIE_BIN = bin;
    try {
      const result = await checkAuggieCliVersion();
      assert.ok(result.ok, `expected --version to succeed, got: ${JSON.stringify(result)}`);
      if (result.ok) assert.equal(result.version, "0.36.0-fake");
    } finally {
      if (prevBin === undefined) delete process.env.AUGGIE_BIN;
      else process.env.AUGGIE_BIN = prevBin;
    }
  }
);

test(
  "initAuggieModels discovers models from a .cmd shim on win32 (spawn EINVAL regression)",
  { skip: !isWin32 },
  async () => {
    __resetAuggieModels();
    const bin = writeFakeCmd(
      "fake-auggie-list.cmd",
      [
        `if "%1"=="model" if "%2"=="list" (`,
        `  echo [win32-cmd-model]`,
        `  exit /b 0`,
        `)`,
        `echo unexpected`,
        `exit /b 1`,
      ].join("\r\n")
    );
    const prevBin = process.env.AUGGIE_BIN;
    process.env.AUGGIE_BIN = bin;
    try {
      await initAuggieModels();
      const r = resolveAuggieModel("win32-cmd-model");
      assert.deepEqual(r, { ok: true, model: "win32-cmd-model" });
    } finally {
      if (prevBin === undefined) delete process.env.AUGGIE_BIN;
      else process.env.AUGGIE_BIN = prevBin;
      __resetAuggieModels();
    }
  }
);
