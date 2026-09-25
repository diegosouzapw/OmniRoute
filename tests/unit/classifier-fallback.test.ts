import test from "node:test";
import assert from "node:assert/strict";

import {
  classifyWithConfigAsync,
  clearIntentClassificationMeta,
  DEFAULT_INTENT_CONFIG,
  getLastIntentClassificationMeta,
  INTENT_TYPES,
} from "../../open-sse/services/intentClassifier.ts";
import { createRoutingEvent } from "../../open-sse/services/routing/events.ts";

test.afterEach(() => {
  clearIntentClassificationMeta();
});

const CODE_PROMPT = "write a function to parse JSON";
const TYPESAFE_CONFIG = {
  ...DEFAULT_INTENT_CONFIG,
  engine: "typesafe" as const,
  typesafeConfidenceThreshold: 0.6,
};

function choiceResponse(choice: string, confidence: number) {
  return {
    model: "jev-1.13.0",
    answers: {
      intent: {
        type: "choice",
        choice,
        probabilities: Object.fromEntries(
          INTENT_TYPES.map((id) => [id, id === choice ? 0.85 : 0.03])
        ),
        confidence,
      },
    },
    usage: { input_tokens: 40, output_tokens: 8 },
  };
}

test("keywords engine (or unset) stays on the keyword result with no TypeSafe fetch", async () => {
  let fetches = 0;
  const fetchImpl = (async () => {
    fetches += 1;
    throw new Error("TypeSafe must not be called");
  }) as typeof fetch;

  const unset = await classifyWithConfigAsync(CODE_PROMPT, DEFAULT_INTENT_CONFIG, undefined, {
    fetchImpl,
    getCredentials: async () => ({ apiKey: "ts-key" }),
  });
  assert.equal(unset, "code");
  assert.equal(fetches, 0);
  const unsetMeta = getLastIntentClassificationMeta();
  assert.equal(unsetMeta?.engine, "keywords");
  assert.equal(unsetMeta?.intent, "code");

  const explicit = await classifyWithConfigAsync(
    CODE_PROMPT,
    { ...DEFAULT_INTENT_CONFIG, engine: "keywords" },
    undefined,
    { fetchImpl, getCredentials: async () => ({ apiKey: "ts-key" }) }
  );
  assert.equal(explicit, "code");
  assert.equal(fetches, 0);
});

test("typesafe engine returns a high-confidence IntentType and records engine/intent/confidence", async () => {
  let captured: { url: string; body: Record<string, unknown>; auth: string | null } | null = null;
  const fetchImpl = (async (url: string | URL | Request, init?: RequestInit) => {
    captured = {
      url: String(url),
      body: JSON.parse(String(init?.body)),
      auth: (init?.headers as Record<string, string>).Authorization ?? null,
    };
    return new Response(JSON.stringify(choiceResponse("math", 0.91)), { status: 200 });
  }) as typeof fetch;

  const intent = await classifyWithConfigAsync(CODE_PROMPT, TYPESAFE_CONFIG, "You are a tutor", {
    fetchImpl,
    getCredentials: async () => ({ apiKey: "ts-live-key" }),
  });
  assert.equal(intent, "math");
  assert.ok(captured);
  assert.equal(captured.url, "https://api.typesafe.ai/v1/systemone");
  assert.equal(captured.auth, "Bearer ts-live-key");
  assert.equal(captured.body.model, "jev-latest");
  const questions = captured.body.questions as Record<
    string,
    { type: string; criteria: Record<string, string> }
  >;
  assert.equal(questions.intent.type, "choice");
  assert.deepEqual(Object.keys(questions.intent.criteria).sort(), [...INTENT_TYPES].sort());
  assert.match(String(captured.body.state), /You are a tutor/);
  assert.match(String(captured.body.state), /write a function/);

  const meta = getLastIntentClassificationMeta();
  assert.equal(meta?.engine, "typesafe");
  assert.equal(meta?.intent, "math");
  assert.equal(meta?.confidence, 0.91);

  const event = createRoutingEvent({
    requestId: "req-intent",
    provider: "openai",
    model: "gpt-4o",
    strategy: "auto",
    latencyMs: 10,
    outcome: "success",
    status: 200,
  });
  assert.equal(event.intentEngine, "typesafe");
  assert.equal(event.intent, "math");
  assert.equal(event.intentConfidence, 0.91);
  assert.equal(JSON.stringify(event).includes(CODE_PROMPT), false);
  assert.equal(JSON.stringify(event).includes("ts-live-key"), false);
});

test("typesafe engine falls back to keywords when confidence is below the threshold", async () => {
  const fetchImpl = (async () =>
    new Response(JSON.stringify(choiceResponse("creative", 0.2)), { status: 200 })) as typeof fetch;

  const intent = await classifyWithConfigAsync(CODE_PROMPT, TYPESAFE_CONFIG, undefined, {
    fetchImpl,
    getCredentials: async () => ({ apiKey: "ts-key" }),
  });
  assert.equal(intent, "code");
  const meta = getLastIntentClassificationMeta();
  assert.equal(meta?.engine, "keywords");
  assert.equal(meta?.intent, "code");
  assert.equal(meta?.fallbackReason, "low_confidence");
});

test("typesafe engine falls back to keywords when the credential is missing", async () => {
  let fetches = 0;
  const intent = await classifyWithConfigAsync(CODE_PROMPT, TYPESAFE_CONFIG, undefined, {
    fetchImpl: (async () => {
      fetches += 1;
      throw new Error("should not fetch");
    }) as typeof fetch,
    getCredentials: async () => null,
  });
  assert.equal(intent, "code");
  assert.equal(fetches, 0);
  assert.equal(getLastIntentClassificationMeta()?.fallbackReason, "missing_key");
});

test("typesafe engine falls back to keywords on fetch throw, timeout, or non-choice body", async () => {
  const thrown = await classifyWithConfigAsync(CODE_PROMPT, TYPESAFE_CONFIG, undefined, {
    fetchImpl: (async () => {
      throw new Error("network down");
    }) as typeof fetch,
    getCredentials: async () => ({ apiKey: "ts-key" }),
  });
  assert.equal(thrown, "code");

  const timedOut = await classifyWithConfigAsync(CODE_PROMPT, TYPESAFE_CONFIG, undefined, {
    timeoutMs: 5,
    fetchImpl: (async (_url, init) => {
      const signal = init?.signal;
      return await new Promise((_, reject) => {
        signal?.addEventListener("abort", () =>
          reject(Object.assign(new Error("aborted"), { name: "AbortError" }))
        );
      });
    }) as typeof fetch,
    getCredentials: async () => ({ apiKey: "ts-key" }),
  });
  assert.equal(timedOut, "code");

  const invalid = await classifyWithConfigAsync(CODE_PROMPT, TYPESAFE_CONFIG, undefined, {
    fetchImpl: (async () =>
      new Response(JSON.stringify({ error: "nope" }), { status: 200 })) as typeof fetch,
    getCredentials: async () => ({ apiKey: "ts-key" }),
  });
  assert.equal(invalid, "code");
  assert.equal(getLastIntentClassificationMeta()?.engine, "keywords");
});
