/**
 * The budget-exhaustion emergency fallback (OMNIROUTE_EMERGENCY_FALLBACK, on by
 * default) reroutes a request to a different provider/model. Before this change
 * the 200 it returned carried no explicit marker: a client could only notice by
 * diffing `X-OmniRoute-Provider` / `X-OmniRoute-Model` against what it asked for.
 * Callers that enforce role separation (e.g. writer and reviewer must never be
 * the same provider) need a direct signal, so a rerouted response now carries
 * `X-OmniRoute-Emergency-Fallback: from=<requested>; to=<served>`.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("emergency-fallback-header");
const {
  BaseExecutor,
  buildOpenAIResponse,
  buildRequest,
  handleChat,
  resetStorage,
  seedConnection,
} = harness;

const { clearProviderFailure } = await import("../../open-sse/services/accountFallback.ts");
const { OMNIROUTE_RESPONSE_HEADERS } = await import("../../src/shared/constants/headers.ts");
const { withEmergencyFallbackHeader } =
  await import("../../src/sse/handlers/emergencyFallbackHeader.ts");

const EMERGENCY_HEADER = "X-OmniRoute-Emergency-Fallback";

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  process.env.REQUIRE_API_KEY = "false";
  clearProviderFailure("openai");
  await resetStorage();
});

test.afterEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

test("header constant is registered with the other OmniRoute response headers", () => {
  assert.equal(OMNIROUTE_RESPONSE_HEADERS.emergencyFallback, EMERGENCY_HEADER);
});

test("the header value keeps only printable ASCII and never throws on odd model ids", () => {
  const response = withEmergencyFallbackHeader(
    new Response("ok", { status: 200 }),
    "openai/\u6a21\u578b-\u00e9\r\nX-Injected: 1",
    "nvidia/openai/gpt-oss-120b"
  );
  assert.equal(response.status, 200);
  assert.equal(
    response.headers.get(EMERGENCY_HEADER),
    "from=openai/-X-Injected: 1; to=nvidia/openai/gpt-oss-120b"
  );
});

test("a response served by the emergency fallback names the swap in a header", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-billing-hdr" });
  await seedConnection("nvidia", { apiKey: "sk-nvidia-fallback-hdr" });
  let calls = 0;

  globalThis.fetch = async () => {
    calls += 1;
    if (calls === 1) {
      return new Response(JSON.stringify({ error: { message: "billing limit exceeded" } }), {
        status: 402,
        headers: { "Content-Type": "application/json" },
      });
    }
    return buildOpenAIResponse("served by fallback", "gpt-oss-120b");
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4.1",
        stream: false,
        messages: [{ role: "user", content: "budget exhausted" }],
      },
    })
  );
  await response.json();

  assert.equal(response.status, 200);
  assert.equal(calls, 2);
  assert.equal(
    response.headers.get(EMERGENCY_HEADER),
    "from=openai/gpt-4.1; to=nvidia/openai/gpt-oss-120b"
  );
});

test("a normal response does not carry the emergency fallback header", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-ok-hdr" });
  globalThis.fetch = async () => buildOpenAIResponse("primary answered", "gpt-4.1");

  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4.1",
        stream: false,
        messages: [{ role: "user", content: "all good" }],
      },
    })
  );
  await response.json();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get(EMERGENCY_HEADER), null);
});

test("a failed emergency hop does not leak the header onto the primary error", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-billing-fail-hdr" });
  await seedConnection("nvidia", { apiKey: "sk-nvidia-fallback-fail-hdr" });
  let calls = 0;

  globalThis.fetch = async () => {
    calls += 1;
    if (calls === 1) {
      return new Response(JSON.stringify({ error: { message: "quota exceeded" } }), {
        status: 402,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ error: { message: "fallback unavailable" } }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4.1",
        stream: false,
        messages: [{ role: "user", content: "budget exhausted again" }],
      },
    })
  );
  await response.json();

  assert.equal(response.status, 402);
  assert.equal(response.headers.get(EMERGENCY_HEADER), null);
});
