import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-family-connection-16223-"));
process.env.DATA_DIR = dataDir;
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { lockExactModel, clearAllModelLockouts } =
  await import("../../open-sse/services/accountFallback.ts");
const providers = await import("../../src/lib/db/providers.ts");
const core = await import("../../src/lib/db/core.ts");
const log = { info() {}, warn() {}, error() {}, debug() {} };

test.before(async () => {
  await providers.createProviderConnection({
    provider: "claude",
    authType: "apikey",
    name: "family-connection-fixture",
    apiKey: "fixture-key",
  });
});
test.beforeEach(() => clearAllModelLockouts());
test.after(() => {
  clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

for (const lockedConnection of ["selected-account", "other-account"]) {
  test(`unpinned quality fallback honors lockouts on ${lockedConnection}`, async () => {
    lockExactModel("claude", lockedConnection, "claude-opus-4-8", "rate_limit", 60_000);
    const sentModels: string[] = [];
    const result = await handleComboChat({
      body: { messages: [{ role: "user", content: "hello" }], stream: false },
      combo: {
        name: `family-selected-${lockedConnection}`,
        strategy: "priority",
        models: ["claude/claude-opus-5"],
        config: { maxRetries: 0 },
      },
      handleSingleModel: async (_body: unknown, model: string) => {
        sentModels.push(model);
        return new Response(
          JSON.stringify({
            choices: [{ message: { content: sentModels.length === 1 ? "" : "recovered" } }],
          }),
          {
            status: 200,
            headers: {
              "content-type": "application/json",
              "X-OmniRoute-Selected-Connection-Id": "selected-account",
            },
          }
        );
      },
      isModelAvailable: async () => true,
      log,
      settings: null,
      allCombos: null,
    });
    assert.equal(result.ok, true);
    assert.deepEqual(sentModels, [
      "claude/claude-opus-5",
      lockedConnection === "selected-account" ? "claude/claude-opus-4-7" : "claude/claude-opus-4-8",
    ]);
  });
}
