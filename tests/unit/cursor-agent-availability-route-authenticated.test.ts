/**
 * GET /api/providers/cursor/agent-availability — "authenticated -> true" case.
 * Split from tests/unit/cursor-agent-availability-route.test.ts (its own
 * process, so its own fresh getCachedCursorAgentAvailability() module cache —
 * see that file's header comment for why the true/false cases can't share a
 * process).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.NODE_ENV = "test";
const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-agent-availability-route-auth-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { GET } = await import("../../src/app/api/providers/cursor/agent-availability/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const FAKE_CURSOR_AGENT_SCRIPT = `#!/usr/bin/env node
const args = process.argv.slice(2);
if (args[0] === "status") {
  process.stdout.write(JSON.stringify({ status: "authenticated", isAuthenticated: true }));
}
`;

const originalHome = process.env.HOME;
const originalUserProfile = process.env.USERPROFILE;
const tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agent-availability-home-auth-"));
process.env.HOME = tmpHome;
process.env.USERPROFILE = tmpHome;
const binaryPath = path.join(tmpHome, ".local", "bin", "cursor-agent");
fs.mkdirSync(path.dirname(binaryPath), { recursive: true });
fs.writeFileSync(binaryPath, FAKE_CURSOR_AGENT_SCRIPT, { mode: 0o755 });
fs.chmodSync(binaryPath, 0o755);

test.after(() => {
  process.env.HOME = originalHome;
  if (originalUserProfile !== undefined) process.env.USERPROFILE = originalUserProfile;
  else delete process.env.USERPROFILE;
  fs.rmSync(tmpHome, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("returns {cursorAgentAvailable: true} and ONLY that field when cursor-agent is authenticated", async () => {
  const res = await GET();
  const body = (await res.json()) as Record<string, unknown>;

  assert.equal(res.status, 200);
  assert.deepEqual(Object.keys(body), ["cursorAgentAvailable"]);
  assert.equal(body.cursorAgentAvailable, true);
  assert.equal(body.accessToken, undefined);
  assert.equal(body.machineId, undefined);
});
