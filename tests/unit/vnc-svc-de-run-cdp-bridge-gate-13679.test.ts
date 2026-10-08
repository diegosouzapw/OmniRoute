import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");
const SVC_DE_RUN = path.join(REPO_ROOT, "docker/vnc-browser/chromium/svc-de-run");

// #13679 item #10 (residual gap): svc-de-run unconditionally spawns
// cdp-bridge.py on every container start, even though CDP_BRIDGE_TOKEN may be
// unset (in which case cdp-bridge.py's has_valid_token() fails closed for
// every caller anyway, per #12571) — the process still binds 0.0.0.0:9223
// and accepts+drops connections for no reason. Gate the spawn behind the
// token actually being configured so an unconfigured container does not run
// a debug listener at all.

function readScript(): string {
  return fs.readFileSync(SVC_DE_RUN, "utf8");
}

test("svc-de-run only starts the CDP bridge when CDP_BRIDGE_TOKEN is configured", () => {
  const script = readScript();
  const lines = script.split("\n");
  const launchIndexes = lines
    .map((line, index) => ({ line, index }))
    .filter(({ line }) => !/^\s*#/.test(line) && line.includes("cdp-bridge.py"))
    .map(({ index }) => index);

  assert.ok(
    launchIndexes.length >= 2,
    "expected the wayland and X11 branches to both still launch cdp-bridge.py"
  );

  const GUARD_WINDOW = 5;
  for (const index of launchIndexes) {
    const precedingLines = lines.slice(Math.max(0, index - GUARD_WINDOW), index).join("\n");
    assert.match(
      precedingLines,
      /if\s*\[\s*-n\s*"\$\{CDP_BRIDGE_TOKEN/,
      `svc-de-run must only launch cdp-bridge.py inside an "if [ -n \\"\${CDP_BRIDGE_TOKEN...` +
        `\\" ]" guard, but found an unconditional launch at line ${index + 1}: ${lines[index].trim()}`
    );
  }
});
