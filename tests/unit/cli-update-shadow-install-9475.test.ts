import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const update = await import("../../bin/cli/commands/update.mjs");
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const REAL_VERSION = JSON.parse(readFileSync(path.join(REPO_ROOT, "package.json"), "utf-8")).version;
const FAKE_BIN = path.join(REPO_ROOT, ".fakebin-9475");

test("runUpdateCommand claims success without verifying the running binary version changed (#9475)", async () => {
  const origPath = process.env.PATH;
  process.env.PATH = FAKE_BIN + path.delimiter + origPath;
  const stdoutLogs: string[] = [];
  const origLog = console.log;
  console.log = function (...args: unknown[]) {
    stdoutLogs.push(args.map(String).join(" "));
  };
  try {
    const exitCode = await update.runUpdateCommand({ yes: true, backup: false });
    const realVersion = await update.getCurrentVersion();
    const claimed = stdoutLogs.some((l) => /Updated to version 3\.8\.99/i.test(l));
    if (claimed && exitCode === 0) {
      assert.fail(
        "runUpdateCommand claimed Updated to version 3.8.99 (exit 0) but the running binary is still " +
          realVersion +
          " — the resolved/shadowing install was not actually updated. Must re-verify getCurrentVersion() after install or warn the user.",
      );
    }
    assert.ok(true);
  } finally {
    console.log = origLog;
    process.env.PATH = origPath;
  }
});
