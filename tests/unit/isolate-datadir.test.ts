// Regression guard for tests/_setup/isolateDataDir.ts — the test-only module that
// gives each test process its own DATA_DIR so concurrent test files never share the
// on-disk SQLite DB. Removing or breaking it brings back the cross-file state races
// (the `test:unit` hang under high concurrency and the non-deterministic Stryker
// baseline that forced concurrency: 1).
import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import os from "node:os";

function dataDirFromChild(envDataDir: string | undefined): string {
  const result = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx",
      "--import",
      "./tests/_setup/isolateDataDir.ts",
      "-e",
      "console.log(process.env.DATA_DIR ?? '')",
    ],
    {
      encoding: "utf8",
      cwd: process.cwd(),
      // Pass DATA_DIR through verbatim; an empty string means "unset" for the module's
      // `if (!process.env.DATA_DIR)` guard.
      env: { ...process.env, DATA_DIR: envDataDir ?? "" },
    }
  );
  return result.stdout.trim().split("\n").pop() ?? "";
}

test("isolateDataDir assigns a unique temp DATA_DIR when none is set", () => {
  const a = dataDirFromChild(undefined);
  const b = dataDirFromChild(undefined);

  assert.ok(a.startsWith(os.tmpdir()), `expected a temp dir under ${os.tmpdir()}, got ${a}`);
  assert.match(a, /omniroute-test-/, `expected the omniroute-test- prefix, got ${a}`);
  assert.notEqual(a, b, "two processes must each get their own DATA_DIR");
});

test("isolateDataDir respects an explicitly set DATA_DIR", () => {
  const explicit = "/tmp/omniroute-explicit-fixture";
  assert.equal(dataDirFromChild(explicit), explicit);
});
