import test from "node:test";
import assert from "node:assert/strict";
import { getLatestVersionFromNpmCli } from "@/lib/system/versionCheck";

// #11885: a user's dashboard showed 3.8.10 while the "3.8.49 available" banner kept
// firing, yet `omniroute update` on the box said "already up to date". Part of the
// same known bug class as #4376 (already fixed in bin/cli/commands/update.mjs's own
// getLatestVersion()): `npm info omniroute version --json` without `--prefer-online`
// can serve a stale cached "latest" from npm's local HTTP cache. The server-side copy
// used by the dashboard's update banner never got the same fix.
test("getLatestVersionFromNpmCli passes --prefer-online to bypass the stale npm cache (#11885, same class as #4376)", async () => {
  let capturedArgs: string[] | null = null;
  const fakeExec = async (_cmd: string, args: string[]) => {
    capturedArgs = args;
    return { stdout: JSON.stringify("3.8.49"), stderr: "" };
  };
  const latest = await getLatestVersionFromNpmCli(fakeExec as never);
  assert.equal(latest, "3.8.49");
  assert.ok(capturedArgs, "exec must be invoked");
  assert.ok(
    (capturedArgs as string[]).includes("--prefer-online"),
    `expected --prefer-online in npm args, got: ${JSON.stringify(capturedArgs)}`
  );
  assert.ok((capturedArgs as string[]).includes("info"));
  assert.ok((capturedArgs as string[]).includes("omniroute"));
  assert.ok((capturedArgs as string[]).includes("version"));
});

test("getLatestVersionFromNpmCli returns null when npm is unavailable", async () => {
  const latest = await getLatestVersionFromNpmCli(async () => {
    throw new Error("npm not found");
  });
  assert.equal(latest, null);
});
