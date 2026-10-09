/**
 * #15540 round 3 (reporter's logs, 2026-10-09). Two observations from a clean install with only
 * the free providers enabled, every `auto/claude-opus` request ending in 503:
 *
 *   A. While a real "OpenCode Account 1" connection existed, ModelSync logged
 *      "OpenCode Account 1: ✓ 1 models" and 9 of the 10 pool targets were skipped with
 *      "model is not in the live catalog" (only big-pickle got further). Question: does a
 *      synced catalog of ONE model make getModelInfo() reject the other registry free models?
 *   B. After that connection was deleted, all 10 targets were skipped with
 *      "no credentials available or model excluded". Question: with NO opencode row and the
 *      combo's forced "noauth" pin, does getProviderCredentials() still hand back the
 *      synthetic keyless credentials?
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-oc-15540c-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "oc-15540c-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { replaceSyncedAvailableModelsForConnection } = await import("../../src/lib/db/models.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");
const auth = await import("../../src/sse/services/auth.ts");
const skip = await import("../../open-sse/services/opencodeFreeTierSkip.ts");

async function reset() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  skip.clearOpencodeFreeTierSkips();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(reset);
test.after(async () => {
  await reset();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("B: no opencode row at all + forced noauth pin still resolves to synthetic keyless credentials", async () => {
  for (const allowed of [null, [] as string[], ["noauth"]]) {
    const creds = await auth.getProviderCredentials("opencode", null, allowed, "big-pickle", {
      forcedConnectionId: "noauth",
    });
    assert.ok(creds, `allowed=${JSON.stringify(allowed)}: expected credentials, got null`);
    assert.equal((creds as { connectionId?: string }).connectionId, "noauth");
  }
});

test("A: a real opencode connection whose sync returned ONE model — are the other registry free models still resolvable?", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "opencode",
    authType: "apikey",
    name: "OpenCode Account 1",
    apiKey: "public",
    isActive: true,
    testStatus: "active",
  });
  await replaceSyncedAvailableModelsForConnection("opencode", (conn as { id: string }).id, [
    { id: "big-pickle", name: "Big Pickle", source: "imported" },
  ]);

  // The combo pool addresses these targets as "oc/<model>" (reporter's log), not "opencode/<model>".
  for (const prefix of ["opencode", "oc"]) {
    const synced = await getModelInfo(`${prefix}/big-pickle`);
    assert.equal(
      synced.errorType,
      undefined,
      `control (synced model, ${prefix}/) failed: ${synced.errorMessage}`
    );

    for (const id of ["muse-spark-1.2", "deepseek-v4-flash-free", "north-mini-code-free"]) {
      const info = await getModelInfo(`${prefix}/${id}`);
      assert.equal(
        info.errorType,
        undefined,
        `${prefix}/${id} rejected while the free tier serves it: ${info.errorMessage}`
      );
    }
  }
});
