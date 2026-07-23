// Characterization of emitRequestGamificationEvent — the per-request gamification hook extracted
// from handleChatCore's non-streaming AND streaming success paths (chatCore god-file
// decomposition, #3501). The inline block was duplicated verbatim; this locks the shared helper.
// Uses a real temp DB and polls xp_audit_log (the emit is fire-and-forget). Locks: the missing
// api-key guard (no-op) and that a valid call awards the "request" XP audit row.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-gamification-test-"));
process.env.DATA_DIR = testDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const { emitRequestGamificationEvent } = await import(
  "../../open-sse/handlers/chatCore/gamificationEvent.ts"
);

function countAuditRows(apiKeyId: string): number {
  const row = coreDb
    .getDbInstance()
    .prepare("SELECT COUNT(*) AS n FROM xp_audit_log WHERE api_key_id = ?")
    .get(apiKeyId) as { n: number } | undefined;
  return row?.n ?? 0;
}

async function waitForAuditRows(apiKeyId: string, min: number, timeoutMs = 3000): Promise<number> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (countAuditRows(apiKeyId) >= min) break;
    await new Promise((r) => setTimeout(r, 25));
  }
  return countAuditRows(apiKeyId);
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

test("missing apiKeyId is a no-op and never throws", async () => {
  await assert.doesNotReject(
    emitRequestGamificationEvent({ apiKeyId: null, model: "m", provider: "p" })
  );
  await assert.doesNotReject(
    emitRequestGamificationEvent({ apiKeyId: undefined, model: "m", provider: "p" })
  );
  await assert.doesNotReject(
    emitRequestGamificationEvent({ apiKeyId: "", model: "m", provider: "p" })
  );
});

test("valid apiKeyId awards a 'request' XP audit row (fire-and-forget)", async () => {
  const apiKeyId = "gamify-key-1";
  assert.equal(countAuditRows(apiKeyId), 0);
  await emitRequestGamificationEvent({ apiKeyId, model: "gpt-x", provider: "openai" });
  const n = await waitForAuditRows(apiKeyId, 1);
  assert.ok(n >= 1, "expected at least one xp_audit_log row for the request action");
});

test("never throws even when the emit path runs fully", async () => {
  await assert.doesNotReject(
    emitRequestGamificationEvent({ apiKeyId: "gamify-key-2", model: null, provider: null })
  );
});
