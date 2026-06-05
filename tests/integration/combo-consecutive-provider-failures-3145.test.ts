// #3145 — Consecutive same-provider failures should skip remaining targets
// When a combo has multiple targets from the same provider and they fail
// consecutively (even with 429 which is NOT in PROVIDER_FAILURE_ERROR_CODES),
// the combo should skip remaining targets from that provider to prevent loops.
//
// Uses two different providers (opencode-zen, opencode-go) in separate tests
// with distinct API key values so there is zero data overlap.
import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("consecutive-fail-3145");
const {
  buildClaudeResponse,
  buildRequest,
  combosDb,
  handleChat,
  resetStorage,
  seedConnection,
  settingsDb,
} = harness;

function toPlain(obj: any): Record<string, string> {
  if (!obj) return {};
  if (obj instanceof Headers) return Object.fromEntries(obj.entries());
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, v == null ? "" : String(v)])
  );
}

test.beforeEach(async () => {
  await resetStorage();
});

test.afterEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

/* ── Test 1: opencode-zen → 429 → fallback to anthropic ── */
test("test1: 429 on opencode-zen falls back to anthropic", async () => {
  await seedConnection("opencode-zen", { apiKey: "sk-zen-alpha" });
  await seedConnection("opencode-zen", { apiKey: "sk-zen-beta" });
  await seedConnection("anthropic", { apiKey: "sk-anthro-001" });

  await settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
  });

  await combosDb.createCombo({
    name: "c1",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    models: [
      "opencode-zen/m-a",
      "opencode-zen/m-b",
      "anthropic/claude-sonnet",
    ],
  });

  let zen = 0;
  let anthro = 0;

  globalThis.fetch = async (_url: string, init: any = {}) => {
    const h = toPlain(init.headers);
    const key = h["x-api-key"];
    if (key === "sk-zen-alpha" || key === "sk-zen-beta") {
      zen++;
      return new Response(
        JSON.stringify({ error: { message: "no quota" } }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }
    if (key === "sk-anthro-001") {
      anthro++;
      return buildClaudeResponse("ok from anthro");
    }
    throw new Error(`U1 key=${key} hdrs=${JSON.stringify(h)}`);
  };

  const res = await handleChat(
    buildRequest({
      body: {
        model: "c1",
        stream: false,
        messages: [{ role: "user", content: "hi" }],
      },
    })
  );
  assert.equal(res.status, 200, "should 200");
  const body: any = await res.json();
  assert.equal(body.choices[0].message.content, "ok from anthro");
  assert.ok(zen <= 2, `zen calls=${zen}, expected ≤2`);
  assert.equal(anthro, 1, "anthropic fallback exact once");
});

/* ── Test 2: opencode-go → 502 → falls back to anthro ── */
test("test2: 502 on opencode-go falls back to anthropic", async () => {
  await seedConnection("opencode-go", { apiKey: "sk-go-a1" });
  await seedConnection("opencode-go", { apiKey: "sk-go-a2" });
  await seedConnection("anthropic", { apiKey: "sk-anthro-002" });

  await settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
  });

  await combosDb.createCombo({
    name: "c2",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    models: [
      "opencode-go/m-x",
      "opencode-go/m-y",
      "anthropic/claude-sonnet",
    ],
  });

  let go = 0;
  let anthro = 0;

  globalThis.fetch = async (_url: string, init: any = {}) => {
    const h = toPlain(init.headers);
    const key = h["x-api-key"];
    if (key === "sk-go-a1" || key === "sk-go-a2") {
      go++;
      return new Response(
        JSON.stringify({ error: { message: "fetch failed" } }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }
    if (key === "sk-anthro-002") {
      anthro++;
      return buildClaudeResponse("ok anthro 2");
    }
    throw new Error(`U2 key=${key} hdrs=${JSON.stringify(h)}`);
  };

  const res = await handleChat(
    buildRequest({
      body: {
        model: "c2",
        stream: false,
        messages: [{ role: "user", content: "hi" }],
      },
    })
  );
  assert.equal(res.status, 200, "should 200");
  const body: any = await res.json();
  assert.equal(body.choices[0].message.content, "ok anthro 2");
  assert.ok(go <= 2, `go calls=${go}, expected ≤2`);
  assert.equal(anthro, 1, "anthropic fallback exact once");
});
