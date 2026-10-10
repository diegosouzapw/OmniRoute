import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-family-fallback-eligibility-")
);
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");
const { getNextEligibleFamilyFallback } =
  await import("../../open-sse/services/modelFamilyFallback.ts");

const CONNECTION_ID = "family-fallback-connection";

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  accountFallback.clearAllModelLockouts();
}

function nextAntigravityFallback(tried = new Set<string>()): string | null {
  return getNextEligibleFamilyFallback("agy/gemini-3.8-flash-high", tried, "agy", CONNECTION_ID);
}

test.beforeEach(resetStorage);

test.after(async () => {
  accountFallback.clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test("family fallback skips a hidden regular model", async () => {
  modelsDb.setModelIsHidden("anthropic", "claude-opus-4.8", true, "chat");

  const next = getNextEligibleFamilyFallback(
    "anthropic/claude-opus-5",
    new Set(["anthropic/claude-opus-5"]),
    "anthropic",
    CONNECTION_ID
  );

  assert.equal(next, "anthropic/claude-opus-4.7");
});

test("family fallback skips a hidden passthrough model using its provider alias", async () => {
  modelsDb.setModelIsHidden("antigravity", "gemini-3.8-flash-medium", true, "chat");

  assert.equal(nextAntigravityFallback(), "agy/gemini-3.8-flash-low");
});

test("family fallback skips a model with an active connection-scoped lockout", () => {
  accountFallback.lockExactModel(
    "agy",
    CONNECTION_ID,
    "gemini-3.8-flash-medium",
    "rate_limit",
    60_000
  );

  assert.equal(nextAntigravityFallback(), "agy/gemini-3.8-flash-low");
});

test("family fallback advances past both hidden and locked siblings to an eligible model", async () => {
  modelsDb.setModelIsHidden("claude", "claude-opus-4-8", true, "chat");
  accountFallback.lockExactModel("claude", CONNECTION_ID, "claude-opus-4-7", "rate_limit", 60_000);

  assert.equal(
    getNextEligibleFamilyFallback(
      "claude/claude-opus-5",
      new Set(["claude/claude-opus-5"]),
      "claude",
      CONNECTION_ID
    ),
    "claude/claude-sonnet-5"
  );
});

test("family fallback applies hidden and lockout checks across provider aliases", async () => {
  modelsDb.setModelIsHidden("claude", "claude-opus-4-8", true, "chat");
  accountFallback.lockExactModel("claude", CONNECTION_ID, "claude-opus-4-7", "rate_limit", 60_000);

  assert.equal(
    getNextEligibleFamilyFallback(
      "cc/claude-opus-5",
      new Set(["cc/claude-opus-5"]),
      "cc",
      CONNECTION_ID
    ),
    "claude/claude-sonnet-5"
  );
});

test("family fallback restores eligibility after a lockout expires", async () => {
  modelsDb.getHiddenModelsByProvider();
  accountFallback.lockExactModel(
    "agy",
    CONNECTION_ID,
    "gemini-3.8-flash-medium",
    "rate_limit",
    100
  );
  assert.equal(nextAntigravityFallback(), "agy/gemini-3.8-flash-low");

  await new Promise((resolve) => setTimeout(resolve, 120));
  assert.equal(nextAntigravityFallback(), "agy/gemini-3.8-flash-medium");
});

test("family fallback returns null when every sibling is hidden", async () => {
  for (const model of [
    "gemini-3.8-flash-medium",
    "gemini-3.8-flash-low",
    "gemini-3.8-flash-tiered",
    "gemini-3.8-flash",
  ]) {
    modelsDb.setModelIsHidden("antigravity", model, true, "chat");
  }

  assert.equal(nextAntigravityFallback(), null);
});

test("eligible family fallback keeps the existing preferred model order", () => {
  assert.equal(nextAntigravityFallback(), "agy/gemini-3.8-flash-medium");
});
