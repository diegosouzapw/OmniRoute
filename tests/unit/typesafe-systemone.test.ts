/**
 * TypeSafe System One client + provider registration tests (#15276 PR 1).
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  evaluateSystemOneChoice,
  parseSystemOneChoiceResponse,
  TYPESAFE_MAX_CHOICE_OPTIONS,
  TYPESAFE_MAX_STATE_CHARS,
  TYPESAFE_PROVIDER_ID,
  TYPESAFE_SYSTEM_ONE_PATH,
} from "../../open-sse/services/typesafe/systemOne.ts";
import { APIKEY_PROVIDERS } from "../../src/shared/constants/providers.ts";
import { getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";
import { getStaticModelsForProvider } from "../../src/lib/providers/staticModels.ts";
import { getProviderModels } from "../../open-sse/config/providerModels.ts";
import { filterChatSelectableModels } from "../../open-sse/services/modelEndpointPolicy.ts";
import { validateTypesafeProvider } from "../../src/lib/providers/validation/typesafe.ts";

test("typesafe is registered as an API-key specialty provider with no chat serviceKinds", () => {
  const entry = APIKEY_PROVIDERS.typesafe;
  assert.ok(entry, "typesafe must exist in APIKEY_PROVIDERS");
  assert.equal(entry.id, TYPESAFE_PROVIDER_ID);
  assert.deepEqual(entry.serviceKinds, []);
  assert.match(String(entry.authHint || ""), /Bearer/i);
});

test("typesafe has no chat registry models and no static catalog", () => {
  assert.equal(getRegistryEntry(TYPESAFE_PROVIDER_ID), null);
  assert.equal(getStaticModelsForProvider(TYPESAFE_PROVIDER_ID), undefined);
  assert.deepEqual(getProviderModels(TYPESAFE_PROVIDER_ID), []);
});

test("typesafe models are absent from chat-selectable filtering", () => {
  // Even if a stray model row were imported, empty serviceKinds + no registry
  // means operators should never see typesafe in combo chat pickers. An empty
  // catalog filters to empty.
  const filtered = filterChatSelectableModels(TYPESAFE_PROVIDER_ID, []);
  assert.deepEqual(filtered, []);
});

test("parseSystemOneChoiceResponse accepts a valid choice answer", () => {
  const result = parseSystemOneChoiceResponse({
    model: "jev-1.13.0",
    answers: {
      route: {
        type: "choice",
        choice: "step-a",
        probabilities: { "step-a": 0.72, "step-b": 0.2, "step-c": 0.08 },
        confidence: 0.84,
      },
    },
    usage: { input_tokens: 120, output_tokens: 18 },
  });

  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.choice, "step-a");
  assert.equal(result.confidence, 0.84);
  assert.equal(result.probabilities["step-a"], 0.72);
  assert.equal(result.model, "jev-1.13.0");
  assert.equal(result.inputTokens, 120);
  assert.equal(result.outputTokens, 18);
});

test("parseSystemOneChoiceResponse rejects a malformed body", () => {
  const result = parseSystemOneChoiceResponse({ answers: {} });
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.reason, "invalid_response");
});

test("evaluateSystemOneChoice returns missing_api_key without calling fetch", async () => {
  let called = false;
  const result = await evaluateSystemOneChoice({
    apiKey: "   ",
    state: "hi",
    criteria: { a: "A" },
    fetchImpl: async () => {
      called = true;
      return new Response("{}", { status: 200 });
    },
  });
  assert.equal(called, false);
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.reason, "missing_api_key");
});

test("evaluateSystemOneChoice posts a choice question and parses the answer", async () => {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const result = await evaluateSystemOneChoice({
    apiKey: "ts_test_key",
    state: "rewrite this email",
    criteria: { opus: "Claude Opus", glm: "GLM" },
    fetchImpl: async (url, init) => {
      calls.push({ url: String(url), init: init || {} });
      return new Response(
        JSON.stringify({
          model: "jev-1.13.0",
          answers: {
            route: {
              type: "choice",
              choice: "glm",
              probabilities: { opus: 0.1, glm: 0.9 },
              confidence: 0.91,
            },
          },
          usage: { input_tokens: 40, output_tokens: 10 },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    },
  });

  assert.equal(calls.length, 1);
  assert.ok(calls[0].url.endsWith(TYPESAFE_SYSTEM_ONE_PATH));
  const headers = calls[0].init.headers as Record<string, string>;
  assert.equal(headers.Authorization, "Bearer ts_test_key");
  const body = JSON.parse(String(calls[0].init.body));
  assert.equal(body.model, "jev-latest");
  assert.equal(body.state, "rewrite this email");
  assert.equal(body.questions.route.type, "choice");
  assert.deepEqual(body.questions.route.criteria, { opus: "Claude Opus", glm: "GLM" });

  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.choice, "glm");
  assert.equal(result.confidence, 0.91);
});

test("evaluateSystemOneChoice maps HTTP 401 to unavailable without throwing", async () => {
  const result = await evaluateSystemOneChoice({
    apiKey: "bad",
    state: "hi",
    criteria: { a: "A" },
    fetchImpl: async () => new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 }),
  });
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.reason, "http_error");
  assert.equal(result.status, 401);
  assert.equal(result.detail, "System One returned HTTP 401");
  assert.doesNotMatch(result.detail, /unauthorized|Bearer |sk-|ts_test/);
});

test("evaluateSystemOneChoice maps AbortError to timeout without throwing", async () => {
  const result = await evaluateSystemOneChoice({
    apiKey: "key",
    state: "hi",
    criteria: { a: "A" },
    timeoutMs: 5,
    fetchImpl: async (_url, init) => {
      const signal = init?.signal;
      return await new Promise((_resolve, reject) => {
        const onAbort = () => {
          const err = new Error("aborted");
          err.name = "AbortError";
          reject(err);
        };
        if (signal?.aborted) onAbort();
        else signal?.addEventListener("abort", onAbort, { once: true });
      });
    },
  });
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.reason, "timeout");
});

test("evaluateSystemOneChoice truncates state and refuses more than 255 options", async () => {
  let posted = "";
  const long = "x".repeat(TYPESAFE_MAX_STATE_CHARS + 50);
  const result = await evaluateSystemOneChoice({
    apiKey: "key",
    state: long,
    criteria: { a: "A" },
    fetchImpl: async (_url, init) => {
      posted = String(init?.body);
      return new Response(
        JSON.stringify({
          answers: {
            route: { type: "choice", choice: "a", probabilities: { a: 1 }, confidence: 1 },
          },
        }),
        { status: 200 }
      );
    },
  });
  assert.equal(result.ok, true);
  assert.equal(JSON.parse(posted).state.length, TYPESAFE_MAX_STATE_CHARS);

  let called = false;
  const criteria: Record<string, string> = {};
  for (let i = 0; i < TYPESAFE_MAX_CHOICE_OPTIONS + 1; i++) criteria[`k${i}`] = `L${i}`;
  const tooMany = await evaluateSystemOneChoice({
    apiKey: "key",
    state: "hi",
    criteria,
    fetchImpl: async () => {
      called = true;
      return new Response("no", { status: 500 });
    },
  });
  assert.equal(called, false);
  assert.equal(tooMany.ok, false);
});

test("validateTypesafeProvider maps a probe without sending the key to the error", async () => {
  const valid = await validateTypesafeProvider({
    apiKey: "ts_live_key",
    fetchImpl: async () =>
      new Response(
        JSON.stringify({
          answers: {
            route: { type: "choice", choice: "ok", probabilities: { ok: 1 }, confidence: 1 },
          },
        }),
        { status: 200 }
      ),
  });
  assert.equal(valid.valid, true);

  const invalid = await validateTypesafeProvider({
    apiKey: "ts_live_key",
    fetchImpl: async () =>
      new Response(JSON.stringify({ error: "nope ts_live_key" }), { status: 401 }),
  });
  assert.equal(invalid.valid, false);
  assert.equal(invalid.error, "Invalid API key");
  assert.doesNotMatch(JSON.stringify(invalid), /ts_live_key/);
});
