import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  parseAgentSelfFromLaunchctl,
  isLaunchdAgentLoaded,
} from "../../../bin/cli/tray/autostart.mjs";

// ---------------------------------------------------------------------------
// parseAgentSelfFromLaunchctl — pure parse of `launchctl list <label>` output.
// True only when the agent's "PID" line matches the current process PID, so the
// enable()/disable() macOS paths can skip launchctl unload/load when the running
// process IS the autostart agent (the unload would self-SIGTERM the tray).
// ---------------------------------------------------------------------------

test("parseAgentSelfFromLaunchctl returns true when PID matches", () => {
  const output = `{
\t"StandardOutPath" = "/tmp/omniroute.out.log";
\t"PID" = 4242;
\t"Label" = "com.omniroute.autostart";
}`;
  assert.equal(parseAgentSelfFromLaunchctl(output, 4242), true);
});

test("parseAgentSelfFromLaunchctl returns false when PID differs", () => {
  const output = `{
\t"PID" = 9999;
\t"Label" = "com.omniroute.autostart";
}`;
  assert.equal(parseAgentSelfFromLaunchctl(output, 4242), false);
});

test("parseAgentSelfFromLaunchctl returns false when no PID present", () => {
  // Loaded-but-not-running agent: launchctl omits the PID key.
  const output = `{
\t"Label" = "com.omniroute.autostart";
\t"LastExitStatus" = 0;
}`;
  assert.equal(parseAgentSelfFromLaunchctl(output, 4242), false);
});

test("parseAgentSelfFromLaunchctl tolerates whitespace variations", () => {
  assert.equal(parseAgentSelfFromLaunchctl('"PID"=4242;', 4242), true);
  assert.equal(parseAgentSelfFromLaunchctl('"PID"   =   4242 ;', 4242), true);
});

test("parseAgentSelfFromLaunchctl returns false on empty/garbage", () => {
  assert.equal(parseAgentSelfFromLaunchctl("", 4242), false);
  assert.equal(parseAgentSelfFromLaunchctl("not launchctl output", 4242), false);
});

// ---------------------------------------------------------------------------
// isLaunchdAgentLoaded — true only when `launchctl list <label>` succeeds.
// This is what closes the false-"Enabled" gap: a plist on disk that launchd
// does not actually recognize must report NOT enabled.
// ---------------------------------------------------------------------------

test("isLaunchdAgentLoaded returns true when launchctl list succeeds", () => {
  const ran = isLaunchdAgentLoaded(() => {
    /* launchctl exited 0 — agent recognized */
  });
  assert.equal(ran, true);
});

test("isLaunchdAgentLoaded returns false when launchctl list throws", () => {
  const ran = isLaunchdAgentLoaded(() => {
    throw new Error("Could not find service");
  });
  assert.equal(ran, false);
});

// ---------------------------------------------------------------------------
// Source-level guard: isEnabledMac() must verify with launchctl, not just the
// plist file existence. Mirrors the repo's existing Linux source-assertion test
// (the darwin branch can't execute on the Linux CI runner).
// ---------------------------------------------------------------------------

test("isEnabledMac verifies launchd registration, not just plist existence", () => {
  const source = readFileSync(join(process.cwd(), "bin/cli/tray/autostart.mjs"), "utf8");
  // The verification helper is wired into the darwin enabled-check.
  assert.match(source, /isLaunchdAgentLoaded/);
  // launchctl list is queried with the app label, no shell interpolation.
  assert.match(source, /launchctl",\s*\["list",\s*APP_LABEL\]/);
});

test("enable/disable macOS skip launchctl when the current process is the agent", () => {
  const source = readFileSync(join(process.cwd(), "bin/cli/tray/autostart.mjs"), "utf8");
  assert.match(source, /isAgentSelfMac/);
  assert.match(source, /parseAgentSelfFromLaunchctl/);
});
