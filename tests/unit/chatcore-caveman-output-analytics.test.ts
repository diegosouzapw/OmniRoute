// Characterization of writeCavemanOutputAnalytics — the caveman-output-only compression analytics
// write extracted from handleChatCore's request-setup compression path (chatCore god-file
// decomposition, #3501). Returns the write promise; uses a real temp DB. Locks: the row written
// (mode=output-caveman, engine=caveman-output, original==compressed==estimatedTokens, tokens_saved
// 0, output_mode) and that the returned promise never rejects (best-effort).
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-caveman-test-"));
process.env.DATA_DIR = testDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const { writeCavemanOutputAnalytics } = await import(
  "../../open-sse/handlers/chatCore/cavemanOutputAnalytics.ts"
);

function rowFor(requestId: string): Record<string, unknown> | undefined {
  return coreDb
    .getDbInstance()
    .prepare(
      "SELECT mode, engine, original_tokens AS orig, compressed_tokens AS comp, tokens_saved AS saved, output_mode AS om FROM compression_analytics WHERE request_id = ?"
    )
    .get(requestId) as Record<string, unknown> | undefined;
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

test("writes a caveman-output analytics row and the promise resolves", async () => {
  await writeCavemanOutputAnalytics({
    comboName: null,
    provider: "openai",
    compressionComboId: null,
    estimatedTokens: 321,
    skillRequestId: "caveman-req-1",
    cavemanOutputModeIntensity: "heavy",
  });
  const row = rowFor("caveman-req-1");
  assert.ok(row, "expected a compression_analytics row");
  assert.equal(row!.mode, "output-caveman");
  assert.equal(row!.engine, "caveman-output");
  assert.equal(row!.orig, 321);
  assert.equal(row!.comp, 321);
  assert.equal(row!.saved, 0);
  assert.equal(row!.om, "heavy");
});

test("the returned promise never rejects even on a bad write", async () => {
  // resetting the DB instance makes the dynamic insert path fail; the helper must swallow it
  coreDb.resetDbInstance();
  await assert.doesNotReject(
    writeCavemanOutputAnalytics({
      comboName: "combo-x",
      provider: "openai",
      compressionComboId: "cc-1",
      estimatedTokens: 10,
      skillRequestId: "caveman-req-2",
      cavemanOutputModeIntensity: null,
    })
  );
  await coreDb.ensureDbInitialized();
});
