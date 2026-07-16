import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// Regression guard for "provider connections go red on startup and require a manual
// re-test". Root cause: src/lib/credentialHealth/scheduler.ts was never imported by the
// serve runtime, so initCredentialHealthCheck()'s boot sweep never ran and a recovered
// web-session/key never flipped test_status back to active on its own.
//
// The scheduler self-disables under the test runner (isAutomatedTestProcess), so its
// boot behavior can't be observed here — this asserts the wiring itself, which is the
// exact line whose absence was the bug.
const here = dirname(fileURLToPath(import.meta.url));
const serverInit = readFileSync(resolve(here, "../../src/server-init.ts"), "utf8");

test("server-init wires the credential health scheduler", () => {
  assert.match(
    serverInit,
    /credentialHealth\/scheduler/,
    "server-init must import the credential health scheduler module"
  );
  assert.match(
    serverInit,
    /initCredentialHealthCheck\s*\(\s*\)/,
    "server-init must call initCredentialHealthCheck() so provider health self-heals on boot"
  );
});
