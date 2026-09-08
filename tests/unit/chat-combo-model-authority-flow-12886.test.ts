/**
 * #12886 / #12899 — a restricted key may name a combo, while the concrete
 * target still has to pass every downstream policy check.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const COMBO = "combo-authority-flow-12886";
const TARGET = "openai/gpt-4.1";
const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-combo-authority-flow-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.REQUIRE_API_KEY = "false";
process.env.DASHBOARD_PASSWORD = "";
process.env.INITIAL_PASSWORD = "";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-authority-flow-12886";
delete process.env.JWT_SECRET;

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { handleChat } = await import("../../src/sse/handlers/chat.ts");
const originalFetch = globalThis.fetch;

async function resetStorage() {
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, {
    recursive: true,
    force: true,
    maxRetries: 5,
    retryDelay: 100,
  });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, {
    recursive: true,
    force: true,
    maxRetries: 5,
    retryDelay: 100,
  });
});

async function seedNamedComboKey() {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-combo-authority-flow",
    apiKey: "sk-combo-authority-flow",
    isActive: true,
    testStatus: "active",
  });
  await combosDb.createCombo({
    name: COMBO,
    strategy: "priority",
    models: [TARGET],
  });
  const key = await apiKeysDb.createApiKey("Combo authority flow", "machine-12886");
  await apiKeysDb.updateApiKeyPermissions(key.id, { allowedModels: [COMBO] });
  return key;
}

function comboRequest(key: string, headers: Record<string, string> = {}) {
  return new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
      ...headers,
    },
    body: JSON.stringify({
      model: COMBO,
      messages: [{ role: "user", content: "Reply with OK only." }],
      max_tokens: 16,
      stream: false,
    }),
  });
}

function upstreamResponse(content: string) {
  return Response.json({
    id: "chatcmpl-combo-authority-flow",
    choices: [{ message: { role: "assistant", content } }],
  });
}

test("named-combo allow-list reaches its configured concrete target through handleChat", async () => {
  const key = await seedNamedComboKey();
  let upstreamCalls = 0;
  globalThis.fetch = async () => {
    upstreamCalls += 1;
    return upstreamResponse("combo policy passed");
  };

  const response = await handleChat(comboRequest(key.key));
  const body = (await response.json()) as {
    choices: Array<{ message: { content: string } }>;
  };

  assert.equal(response.status, 200);
  assert.equal(upstreamCalls, 1);
  assert.equal(body.choices[0].message.content, "combo policy passed");
});

test("live-test marker does not let a named combo dispatch a blocked concrete target", async () => {
  const key = await seedNamedComboKey();
  await apiKeysDb.updateApiKeyPermissions(key.id, {
    blockedModels: [TARGET],
  });
  let upstreamCalls = 0;
  globalThis.fetch = async () => {
    upstreamCalls += 1;
    return upstreamResponse("must not dispatch");
  };

  const response = await handleChat(
    comboRequest(key.key, { "X-Internal-Test": "combo-health-check" })
  );

  assert.equal(response.status, 403);
  assert.equal(upstreamCalls, 0);
});
