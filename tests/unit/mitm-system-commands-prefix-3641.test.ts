/**
 * Regression test for #3641 — `execFileText` produces a doubled
 * "Command failed: Command failed: ..." prefix in error messages.
 *
 * Node's `execFile` already sets `error.message` to
 * "Command failed: <command>" when the child process exits non-zero.
 * `execFileText` was prepending its own "Command failed: " prefix on top of
 * that, producing the doubled string.
 *
 * The fix: surface `getErrorMessage(error)` directly (Node's message already
 * contains the command), only appending stderr when it is non-empty.
 *
 * Uses `/bin/false` (always exits 1) as the deterministic failing command on
 * Linux/macOS. This is the only case that triggers "Command failed: ..." in
 * Node's error.message (ENOENT from a missing binary uses "spawn ... ENOENT"
 * instead, so it never doubles).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileText } from "../../src/mitm/systemCommands.ts";

// `/bin/false` exits with code 1 — guaranteed to produce a "Command failed:"
// error.message from Node's execFile, which is exactly the case that was
// being doubled by the bug.
const FALSE_CMD = "/bin/false";

test("execFileText: error message does NOT contain a doubled 'Command failed:' prefix", async () => {
  await assert.rejects(
    () => execFileText(FALSE_CMD, []),
    (err: unknown) => {
      assert.ok(err instanceof Error, "expected an Error");
      const msg = err.message;
      assert.ok(
        !msg.includes("Command failed: Command failed:"),
        `Error message contains doubled prefix: ${JSON.stringify(msg)}`,
      );
      return true;
    },
  );
});

test("execFileText: error message for a non-zero exit still contains 'Command failed:'", async () => {
  await assert.rejects(
    () => execFileText(FALSE_CMD, []),
    (err: unknown) => {
      assert.ok(err instanceof Error, "expected an Error");
      // The message should still contain the Node-generated prefix once.
      assert.ok(
        err.message.includes("Command failed:"),
        `Error message should still contain "Command failed:": ${JSON.stringify(err.message)}`,
      );
      return true;
    },
  );
});
