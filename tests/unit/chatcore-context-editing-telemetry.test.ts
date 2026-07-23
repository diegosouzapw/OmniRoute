// Characterization of recordContextEditingTelemetryHook — the Claude-only context-editing
// telemetry hook extracted from handleChatCore's non-streaming success path (chatCore god-file
// decomposition, #3501). The work is a fire-and-forget IIFE; uses a real temp DB and polls the
// captured log. Locks: the enabled+claude guard, the no-telemetry no-op, and that a valid
// applied_edits payload records and logs the cleared-token receipt.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-ctxedit-test-"));
process.env.DATA_DIR = testDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const { recordContextEditingTelemetryHook } = await import(
  "../../open-sse/handlers/chatCore/contextEditingTelemetry.ts"
);

function makeLog() {
  const debug: string[] = [];
  return {
    log: { debug: (tag: string, msg: string) => debug.push(`${tag} ${msg}`) },
    debug,
  };
}

const telemetryBody = {
  context_management: {
    applied_edits: [{ cleared_input_tokens: 120, cleared_tool_uses: 3 }],
  },
};

async function waitFor(pred: () => boolean, timeoutMs = 3000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline && !pred()) {
    await new Promise((r) => setTimeout(r, 25));
  }
}

before(async () => {
  await coreDb.ensureDbInitialized();
});

after(() => {
  coreDb.resetDbInstance();
  try {
    fs.rmSync(testDataDir, { recursive: true, force: true });
  } catch {
    // best-effort cleanup
  }
});

test("disabled context-editing is a no-op", async () => {
  const { log, debug } = makeLog();
  recordContextEditingTelemetryHook({
    contextEditingEnabled: false,
    provider: "claude",
    responseBody: telemetryBody,
    skillRequestId: "req-1",
    log,
  });
  await new Promise((r) => setTimeout(r, 100));
  assert.equal(debug.length, 0);
});

test("non-claude provider is a no-op", async () => {
  const { log, debug } = makeLog();
  recordContextEditingTelemetryHook({
    contextEditingEnabled: true,
    provider: "openai",
    responseBody: telemetryBody,
    skillRequestId: "req-2",
    log,
  });
  await new Promise((r) => setTimeout(r, 100));
  assert.equal(debug.length, 0);
});

test("valid applied_edits records and logs the cleared-token receipt", async () => {
  const { log, debug } = makeLog();
  recordContextEditingTelemetryHook({
    contextEditingEnabled: true,
    provider: "claude",
    responseBody: telemetryBody,
    skillRequestId: "req-3",
    log,
  });
  await waitFor(() => debug.length > 0);
  assert.ok(debug.length >= 1, "expected a CONTEXT_EDITING debug line");
  assert.match(debug[0], /CONTEXT_EDITING/);
  assert.match(debug[0], /cleared 120 input tokens \/ 3 tool uses \(1 edits\)/);
});

test("response without applied_edits is a silent no-op (no throw)", async () => {
  const { log, debug } = makeLog();
  recordContextEditingTelemetryHook({
    contextEditingEnabled: true,
    provider: "claude",
    responseBody: { choices: [] },
    skillRequestId: "req-4",
    log,
  });
  await new Promise((r) => setTimeout(r, 100));
  assert.equal(debug.length, 0);
});
