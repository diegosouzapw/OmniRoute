import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-domain-fallback-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const fallbackPolicy = await import("../../src/domain/fallbackPolicy.ts");

async function resetStorage() {
  fallbackPolicy.resetAllFallbacks();
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: any) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  fallbackPolicy.resetAllFallbacks();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("registerFallback sorts by priority and defaults missing flags to enabled", () => {
  fallbackPolicy.registerFallback("gpt-4o-mini", [
    { provider: "azure", priority: 20 },
    { provider: "openai" },
    { provider: "github", priority: 10, enabled: false },
  ]);

  assert.deepEqual(fallbackPolicy.resolveFallbackChain("gpt-4o-mini"), [
    { provider: "openai", priority: 0, enabled: true },
    { provider: "azure", priority: 20, enabled: true },
  ]);
  assert.equal(fallbackPolicy.hasFallback("gpt-4o-mini"), true);
});

test("resolveFallbackChain and getNextFallback respect exclusions and disabled providers", () => {
  fallbackPolicy.registerFallback("claude-sonnet", [
    { provider: "anthropic", priority: 1, enabled: false },
    { provider: "vertex", priority: 2, enabled: true },
    { provider: "bedrock", priority: 3, enabled: true },
  ]);

  assert.deepEqual(fallbackPolicy.resolveFallbackChain("claude-sonnet", ["vertex"]), [
    { provider: "bedrock", priority: 3, enabled: true },
  ]);
  assert.equal(fallbackPolicy.getNextFallback("claude-sonnet"), "vertex");
  assert.equal(fallbackPolicy.getNextFallback("claude-sonnet", ["vertex", "bedrock"]), null);
});

test("removeFallback and resetAllFallbacks clear registered chains", () => {
  fallbackPolicy.registerFallback("model-a", [{ provider: "provider-a", priority: 1 }]);
  fallbackPolicy.registerFallback("model-b", [{ provider: "provider-b", priority: 1 }]);

  assert.deepEqual(Object.keys(fallbackPolicy.getAllFallbackChains()).sort(), [
    "model-a",
    "model-b",
  ]);
  assert.equal(fallbackPolicy.removeFallback("model-a"), true);
  assert.equal(fallbackPolicy.removeFallback("model-a"), false);
  assert.equal(fallbackPolicy.hasFallback("model-a"), false);

  fallbackPolicy.resetAllFallbacks();
  assert.deepEqual(fallbackPolicy.getAllFallbackChains(), {});
});
