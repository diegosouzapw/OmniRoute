import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const update = await import("../../bin/cli/commands/update.mjs");

test("runUpdateCommand claims success without verifying the running binary version changed (#9475)", async () => {
  const fakeBin = mkdtempSync(path.join(tmpdir(), "omniroute-cli-update-9475-"));
  writeFileSync(
    path.join(fakeBin, "npm"),
    `#!/usr/bin/env bash
if [ "$1" = "view" ]; then echo "3.8.99"; exit 0; fi
if [ "$1" = "install" ]; then echo "added 1 package"; exit 0; fi
exit 0
`,
    { mode: 0o755 }
  );

  const origPath = process.env.PATH;
  process.env.PATH = fakeBin + path.delimiter + (origPath ?? "");
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
          " — the resolved/shadowing install was not actually updated. Must re-verify getCurrentVersion() after install or warn the user."
      );
    }
    assert.ok(true);
  } finally {
    console.log = origLog;
    if (origPath === undefined) delete process.env.PATH;
    else process.env.PATH = origPath;
    rmSync(fakeBin, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
