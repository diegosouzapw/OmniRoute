/**
 * resolveAutoPanel — auto-panel resolver for the AI Council / debate strategy.
 *
 * When a council request omits an explicit models[] panel, the panel is derived
 * from every currently-connected, credential-valid provider (one representative
 * model per connection) by reusing createVirtualAutoCombo — the same enumeration
 * the `auto` combo strategy uses. These tests exercise that path against a real
 * SQLite DB (mirrors tests/unit/auto-custom-provider-5873.test.ts).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auto-panel-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "auto-panel-test-secret";

const core = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const { resolveAutoPanel } = await import("../../../open-sse/services/autoPanel.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

test("resolveAutoPanel: no configured accounts → still non-empty (no-auth free providers)", async () => {
  // createVirtualAutoCombo always appends the no-auth free providers
  // (opencode/ddg/etc.), so the council works out-of-the-box with zero
  // configured accounts. This is a feature — verify the panel is usable.
  const panel = await resolveAutoPanel({ log });
  assert.ok(panel.length > 0, "auto-panel should include no-auth free providers even with no accounts");
  assert.ok(
    panel.every((m) => typeof m === "string" && m.includes("/")),
    "every panel entry is a provider/model string"
  );
});

test("resolveAutoPanel: enumerates one model per connected provider", async () => {
  await providersDb.createProviderConnection({
    provider: "openai-compatible-chat-11111111-1111-1111-1111-111111111111",
    authType: "apikey",
    name: "Custom A",
    apiKey: "sk-a",
    defaultModel: "model-a",
  });
  await providersDb.createProviderConnection({
    provider: "openai-compatible-chat-22222222-2222-2222-2222-222222222222",
    authType: "apikey",
    name: "Custom B",
    apiKey: "sk-b",
    defaultModel: "model-b",
  });

  const panel = await resolveAutoPanel({ log });

  assert.ok(
    panel.includes("openai-compatible-chat-11111111-1111-1111-1111-111111111111/model-a"),
    "panel should contain provider A's model"
  );
  assert.ok(
    panel.includes("openai-compatible-chat-22222222-2222-2222-2222-222222222222/model-b"),
    "panel should contain provider B's model"
  );
});

test("resolveAutoPanel: caps the panel at maxPanel", async () => {
  for (let i = 0; i < 5; i++) {
    await providersDb.createProviderConnection({
      provider: `openai-compatible-chat-${i}0000000-0000-0000-0000-00000000000${i}`,
      authType: "apikey",
      name: `Custom ${i}`,
      apiKey: `sk-${i}`,
      defaultModel: `model-${i}`,
    });
  }

  const panel = await resolveAutoPanel({ log, maxPanel: 3 });
  assert.equal(panel.length, 3, "panel must be capped at maxPanel=3");
});

test("resolveAutoPanel: deduplicates identical model strings", async () => {
  // Two connections on the same provider resolving to the same defaultModel
  // must collapse to a single panel entry (a panel of duplicates is pointless).
  await providersDb.createProviderConnection({
    provider: "openai-compatible-chat-dupe-0000-0000-0000-000000000001",
    authType: "apikey",
    name: "Dupe 1",
    apiKey: "sk-d1",
    defaultModel: "same-model",
  });

  const panel = await resolveAutoPanel({ log });
  const modelStr = "openai-compatible-chat-dupe-0000-0000-0000-000000000001/same-model";
  const occurrences = panel.filter((m) => m === modelStr).length;
  assert.equal(occurrences, 1, "duplicate model strings must be deduplicated");
});

test("resolveAutoPanel: skips connections without usable credentials", async () => {
  // An apikey connection with an empty key has no usable credential and must
  // not appear in the auto panel (hasUsableConnectionCredential gate).
  await providersDb.createProviderConnection({
    provider: "openai-compatible-chat-nocred-000-0000-0000-000000000001",
    authType: "apikey",
    name: "No Cred",
    apiKey: "",
    defaultModel: "ghost-model",
  });

  const panel = await resolveAutoPanel({ log });
  assert.ok(
    !panel.some((m) => m.includes("ghost-model")),
    "a connection with no usable credential must be excluded"
  );
});
