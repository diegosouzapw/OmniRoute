import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-metadata-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET ||= "combo-metadata-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("single-target combo preserves its direct model metadata", async () => {
  await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "codex-gpt-5.6-single-target-combo",
    accessToken: "codex-test-token",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  await combosDb.createCombo({
    name: "gpt-5.6-sol-combo",
    strategy: "auto",
    models: ["codex/gpt-5.6-sol"],
  });

  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };
  const direct = body.data.find((item) => item.id === "cx/gpt-5.6-sol");
  const combo = body.data.find((item) => item.id === "gpt-5.6-sol-combo");

  assert.equal(response.status, 200);
  assert.ok(direct);
  assert.ok(combo);
  for (const field of [
    "context_length",
    "max_input_tokens",
    "max_output_tokens",
    "input_modalities",
    "output_modalities",
    "capabilities",
  ]) {
    assert.deepEqual(combo[field], direct[field], field);
  }
});

test("single-target combo respects registry reasoning overrides before specs", async () => {
  await providersDb.createProviderConnection({
    provider: "command-code",
    authType: "apikey",
    name: "command-code-gpt-5.4-mini-combo",
    apiKey: "command-code-test-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  await combosDb.createCombo({
    name: "gpt-5.4-mini-command-code-combo",
    strategy: "auto",
    models: ["command-code/gpt-5.4-mini"],
  });

  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };
  const combo = body.data.find((item) => item.id === "gpt-5.4-mini-command-code-combo");

  assert.equal(response.status, 200);
  assert.ok(combo);
  const capabilities = combo.capabilities as Record<string, unknown>;
  assert.equal(capabilities.reasoning, false);
  assert.equal(capabilities.thinking, false);
  assert.equal(capabilities.supportsThinking, false);
  assert.equal(Object.hasOwn(capabilities, "effort_tiers"), false);
});

test("single-target combo respects resolved reasoning deny patterns", async () => {
  await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "antigravity-gemini-no-thinking-combo",
    accessToken: "antigravity-test-token",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  await combosDb.createCombo({
    name: "antigravity-gemini-no-thinking-combo",
    strategy: "auto",
    models: ["antigravity/gemini-3.1-pro-high"],
  });

  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };
  const combo = body.data.find((item) => item.id === "antigravity-gemini-no-thinking-combo");

  assert.equal(response.status, 200);
  assert.ok(combo);
  const capabilities = combo.capabilities as Record<string, unknown>;
  assert.equal(capabilities.reasoning, false);
  assert.equal(capabilities.thinking, false);
  assert.equal(capabilities.supportsThinking, false);
  assert.equal(Object.hasOwn(capabilities, "effort_tiers"), false);
});
