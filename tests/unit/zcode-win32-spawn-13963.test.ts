/**
 * Regression test for #13963 — Windows: `zc`/`zcode` provider always fails
 * with `spawn zcode ENOENT` even when ZCODE_BIN is set.
 *
 * Root cause: ZcodeAppServerClient.start() (open-sse/executors/zcodeProtocol.ts)
 * spawns the ZCode CLI with a hardcoded `shell: false`, regardless of
 * process.platform or the file extension of the resolved command. On
 * Windows, npm installs global CLI wrappers as `.cmd`/`.bat` shims, and
 * since Node's CVE-2024-27980 fix, `spawn()` refuses to launch a `.cmd`/
 * `.bat` target without `shell: true`, throwing ENOENT/EINVAL instead. This
 * is the same class of bug as #8590 (Qoder), already fixed elsewhere in
 * this repo (devin-cli.ts, auggie.ts, cliRuntime.ts's
 * shouldUseShellForCommand()).
 *
 * `shouldUseShellForZcodeCommand()` is a small, pure, exported helper so
 * this can be asserted directly without needing to intercept the live ESM
 * `spawn` binding (node:child_process.spawn is unmockable via mock.method()
 * without --experimental-test-module-mocks, which is not enabled in
 * `npm run test:unit` — see tests/unit/windows-hide-child-process-spawns-8131.test.ts).
 */

import test from "node:test";
import assert from "node:assert/strict";

const { shouldUseShellForZcodeCommand } =
  await import("@omniroute/open-sse/executors/zcodeProtocol");

/** Temporarily override process.platform for the duration of `fn`. */
function withPlatform<T>(platform: string, fn: () => T): T {
  const original = Object.getOwnPropertyDescriptor(process, "platform")!;
  Object.defineProperty(process, "platform", { value: platform, configurable: true });
  try {
    return fn();
  } finally {
    Object.defineProperty(process, "platform", original);
  }
}

test("shouldUseShellForZcodeCommand returns true on win32 for a .cmd shim", () => {
  const result = withPlatform("win32", () =>
    shouldUseShellForZcodeCommand("C:\\Users\\aaaaa\\AppData\\Roaming\\npm\\zcode.cmd")
  );
  assert.equal(
    result,
    true,
    "spawn() must use shell:true on win32 when the resolved ZCode binary is a " +
      ".cmd/.bat shim, or launching it throws ENOENT/EINVAL (Node CVE-2024-27980 fix) " +
      "— see #8590 (Qoder) for the same class of bug already fixed elsewhere in this repo"
  );
});

test("shouldUseShellForZcodeCommand returns true on win32 for a .bat shim", () => {
  const result = withPlatform("win32", () =>
    shouldUseShellForZcodeCommand("C:\\Users\\aaaaa\\AppData\\Roaming\\npm\\zcode.bat")
  );
  assert.equal(result, true);
});

test("shouldUseShellForZcodeCommand stays false on win32 for the bundled node runtime path", () => {
  // The ZCODE_SERVER_NODE bundled-runtime path (open-sse/executors/zcode.ts:96-101)
  // spawns a bare `node`/`node.exe` binary, not a .cmd/.bat shim — must stay shell:false.
  const result = withPlatform("win32", () =>
    shouldUseShellForZcodeCommand("C:\\Users\\aaaaa\\.zcode\\server\\node.exe")
  );
  assert.equal(result, false);
});

test("shouldUseShellForZcodeCommand returns false on linux even for a .cmd-named command", () => {
  const result = withPlatform("linux", () =>
    shouldUseShellForZcodeCommand("/usr/local/bin/zcode.cmd")
  );
  assert.equal(result, false);
});

test("shouldUseShellForZcodeCommand returns false on darwin for the plain zcode binary", () => {
  const result = withPlatform("darwin", () => shouldUseShellForZcodeCommand("zcode"));
  assert.equal(result, false);
});
