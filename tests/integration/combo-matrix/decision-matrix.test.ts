// tests/integration/combo-matrix/decision-matrix.test.ts
//
// KooshaPari's provider × status × envelope matrix from #8648 / #8251.
// Diego closed #8648 in the v3.8.49 queue sweep and said the test-only
// matrix was not rejected: mark it ready and it should land.
//
// The v3.8.49 draft scripted fetch with a provider map and sent model
// "gpt-4" with no combo row. This file keeps those four cases and drives
// them through the current harness: an explicit priority combo, and
// installRecordingFetch(call => Response).
//
//   advance → the next combo target is dispatched and its success is returned
//
// #8648, against release/v3.8.49, recorded 401 and a generic 400 as stop
// and a 429 as retry-then-stop. This release advances all three. The cases
// below pin that live decision. They do not change it.

import test from "node:test";
import assert from "node:assert/strict";
import { createComboRoutingHarness } from "../_comboRoutingHarness.ts";

const h = await createComboRoutingHarness("combo-decision-matrix");
const {
  BaseExecutor,
  handleChat,
  buildRequest,
  seedConnection,
  resetStorage,
  settingsDb,
  combosDb,
} = h;

function body(model: string) {
  return {
    model,
    stream: false,
    messages: [{ role: "user", content: "hello" }],
  };
}

const NO_AUTH_PROVIDER_IDS = ["opencode", "duckduckgo-web", "veoaifree-web", "auggie"];

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
  await settingsDb.updateSettings({ blockedProviders: NO_AUTH_PROVIDER_IDS });
});
test.afterEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = h.originalRetryDelayMs;
  await resetStorage();
});
test.after(async () => {
  await h.cleanup();
});

async function priorityCombo(name: string, openaiId: string, claudeId: string, maxRetries = 0) {
  await combosDb.createCombo({
    name,
    strategy: "priority",
    config: { maxRetries, retryDelayMs: 0, stickyRoundRobinLimit: 1 },
    models: [
      {
        id: `${name}-openai`,
        kind: "model",
        providerId: "openai",
        model: "gpt-4o-mini",
        connectionId: openaiId,
      },
      {
        id: `${name}-claude`,
        kind: "model",
        providerId: "claude",
        model: "claude-sonnet-4-6",
        connectionId: claudeId,
      },
    ],
  });
}

function scriptFirst(status: number, message: string) {
  h.installRecordingFetch((call) => {
    if (call.provider === "openai") return h.failure(status, message);
    return undefined;
  });
}

// #8252: a 400 whose body says the model is not supported is this target's
// miss. The combo advances and the caller sees the next target's success.
test("400 model-scoped: combo advances to the next provider", async () => {
  const openai = await seedConnection("openai", { apiKey: "sk-openai-400m" });
  const claude = await seedConnection("claude", { apiKey: "sk-claude-400m" });
  await priorityCombo("m-400-model", String(openai.id), String(claude.id));
  scriptFirst(400, "invalid_request_error: model X not supported");

  const r = await handleChat(buildRequest({ body: body("m-400-model") }));
  assert.equal(r.status, 200, `Expected 200 from claude (advance), got ${r.status}`);
  assert.deepEqual(
    h.providersSeen(),
    ["openai", "claude"],
    `Expected [openai, claude] (advance), got: ${JSON.stringify(h.providersSeen())}`
  );
});

// #8648 recorded a 401 as stop. On this release a dead credential on one
// combo target advances to the next target, which then succeeds.
test("401 unauthorized: combo advances to the next provider", async () => {
  const openai = await seedConnection("openai", { apiKey: "sk-openai-401" });
  const claude = await seedConnection("claude", { apiKey: "sk-claude-401" });
  await priorityCombo("m-401", String(openai.id), String(claude.id));
  scriptFirst(401, "Unauthorized");

  const r = await handleChat(buildRequest({ body: body("m-401") }));
  assert.equal(r.status, 200, `Expected 200 from claude (advance), got ${r.status}`);
  assert.deepEqual(
    h.providersSeen(),
    ["openai", "claude"],
    `Expected [openai, claude] (advance), got: ${JSON.stringify(h.providersSeen())}`
  );
});

// #8648 recorded a 429 as retry-then-stop on the same provider. On this
// release the combo dispatches the 429 target once, then advances.
test("429 rate limit: combo advances to the next provider", async () => {
  const openai = await seedConnection("openai", { apiKey: "sk-openai-429" });
  const claude = await seedConnection("claude", { apiKey: "sk-claude-429" });
  await priorityCombo("m-429", String(openai.id), String(claude.id), 1);
  scriptFirst(429, "Rate limit reached");

  const r = await handleChat(buildRequest({ body: body("m-429") }));
  assert.equal(r.status, 200, `Expected 200 from claude (advance), got ${r.status}`);
  assert.deepEqual(
    h.providersSeen(),
    ["openai", "claude"],
    `Expected [openai, claude] (advance), got: ${JSON.stringify(h.providersSeen())}`
  );
});

// #8648 recorded a generic 400 ("Bad Request: empty body") as stop.
// On this release that body is not model-scoped and the combo still advances.
test("400 with generic body: combo advances to the next provider", async () => {
  const openai = await seedConnection("openai", { apiKey: "sk-openai-400g" });
  const claude = await seedConnection("claude", { apiKey: "sk-claude-400g" });
  await priorityCombo("m-400-generic", String(openai.id), String(claude.id));
  scriptFirst(400, "Bad Request: empty body");

  const r = await handleChat(buildRequest({ body: body("m-400-generic") }));
  assert.equal(r.status, 200, `Expected 200 from claude (advance), got ${r.status}`);
  assert.deepEqual(
    h.providersSeen(),
    ["openai", "claude"],
    `Expected [openai, claude] (advance), got: ${JSON.stringify(h.providersSeen())}`
  );
});
