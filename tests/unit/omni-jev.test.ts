import test from "node:test";
import assert from "node:assert/strict";
import {
  prepareOmniJev,
  injectOmniJev,
  orderSimilarTargets,
  validateJevAnswers,
} from "../../open-sse/services/autoCombo/omniJev.ts";
import { omniJevConfigSchema } from "../../src/shared/validation/omniJev.ts";

const body = {
  messages: [{ role: "user", content: "Write a TypeScript function and tests" }],
  response_format: { type: "json_object" },
};
const config = omniJevConfigSchema.parse({});

test("native Claude without system uses the native instruction field", async () => {
  const packet = await prepareOmniJev(body, config);
  const enriched = injectOmniJev(body, packet, "claude");
  assert.match(String(enriched.system), /OmniJev/);
  assert.deepEqual(enriched.messages, body.messages);
});

test("native Antigravity envelope receives enrichment inside request", async () => {
  const original = {
    request: { contents: [{ role: "user", parts: [{ text: "TypeScript code" }] }] },
  };
  const packet = await prepareOmniJev(original, config);
  assert.equal(packet.task, "coding");
  const enriched = injectOmniJev(original, packet, "antigravity");
  assert.match(JSON.stringify(enriched.request), /OmniJev/);
  assert.doesNotMatch(JSON.stringify(original), /OmniJev/);
});

test("common model families retain similar-first fallback", () => {
  for (const family of ["gpt", "claude", "deepseek", "qwen"]) {
    const targets = [
      { executionKey: "a", modelStr: `p/${family}-large` },
      { executionKey: "b", modelStr: "p/unrelated" },
      { executionKey: "c", modelStr: `other/${family}-small` },
    ];
    assert.deepEqual(
      orderSimilarTargets(targets).map((t) => t.executionKey),
      ["a", "c", "b"]
    );
  }
});
test("methodology enriches before generation without a Jev call or invented confidence", async () => {
  const packet = await prepareOmniJev(body, config, {
    apiKey: "unused",
    fetch: async () => {
      throw Error("must not call");
    },
  });
  assert.equal(packet.source, "methodology");
  assert.equal(packet.task, "coding");
  assert.equal(packet.confidence, undefined);
  const enriched = injectOmniJev(body, packet);
  assert.notEqual(enriched, body);
  assert.deepEqual(body.messages, [
    { role: "user", content: "Write a TypeScript function and tests" },
  ]);
  assert.deepEqual(enriched.response_format, body.response_format);
  assert.match(JSON.stringify(enriched), /acceptance|tests/i);
  assert.match(JSON.stringify(enriched), /noul/);
  assert.match(JSON.stringify(enriched), /requested.*format/i);
  assert.equal(injectOmniJev(enriched, packet), enriched);
});
test("missing API key retains enrichment and identifies fallback", async () => {
  const packet = await prepareOmniJev(body, { ...config, mode: "jev-api" }, { apiKey: "" });
  assert.equal(packet.source, "methodology-fallback");
  assert.equal(packet.reason, "missing-key");
  assert.match(JSON.stringify(injectOmniJev(body, packet)), /OmniJev/);
});
test("injection preserves native Claude, Gemini and Responses envelopes", async () => {
  const packet = await prepareOmniJev(body, config);
  for (const original of [
    {
      system: [{ type: "text", text: "Original", cache_control: { type: "ephemeral" } }],
      messages: [],
    },
    {
      contents: [{ role: "user", parts: [{ text: "hello" }] }],
      systemInstruction: { parts: [{ text: "Original" }] },
    },
    { input: "hello", instructions: "Original", tools: [{ type: "function", name: "example" }] },
  ]) {
    const before = JSON.stringify(original);
    const result = injectOmniJev(original, packet);
    assert.equal(JSON.stringify(original), before);
    assert.match(JSON.stringify(result), /OmniJev/);
    assert.match(JSON.stringify(result), /Original/);
    assert.equal(
      Object.keys(result).some((k) => k.startsWith("_")),
      false
    );
  }
});
test("closed config rejects keys in combo JSON and invalid limits", () => {
  assert.equal(omniJevConfigSchema.safeParse({ apiKey: "secret" }).success, false);
  assert.equal(omniJevConfigSchema.safeParse({ timeoutMs: -1 }).success, false);
});
const answers = {
  task: {
    type: "choice",
    choice: "coding",
    confidence: 0.95,
    probabilities: { coding: 1, analysis: 0, creative: 0, chat: 0 },
  },
  complexity: {
    type: "score",
    score: 2,
    confidence: 0.95,
    probabilities: { "0": 0, "1": 0, "2": 1 },
    legend: { "0": "low", "1": "medium", "2": "high" },
  },
  uncertainty: { type: "noul", noul: 0.99 },
};
test("Jev batch validates choice, score and noul", () => {
  assert.equal(validateJevAnswers({ answers }, 0.85)?.task, "coding");
  for (const bad of [
    { ...answers, task: { ...answers.task, choice: "execute_shell" } },
    { ...answers, task: { ...answers.task, confidence: 0.1 } },
    { ...answers, task: { ...answers.task, probabilities: { coding: 0.5 } } },
    { ...answers, complexity: { ...answers.complexity, score: 0 } },
    { ...answers, uncertainty: { type: "noul", noul: 2 } },
  ])
    assert.equal(validateJevAnswers({ answers: bad }, 0.85), null);
});
test("API mode uses one bounded call and does not inject raw API output", async () => {
  let calls = 0;
  const packet = await prepareOmniJev(
    body,
    { ...config, mode: "jev-api" },
    {
      apiKey: "test-key",
      fetch: async (url, init) => {
        calls++;
        assert.equal(String(url), "https://api.typesafe.ai/v1/systemone");
        assert.equal(new Headers(init?.headers).get("authorization"), "Bearer test-key");
        assert.equal(JSON.parse(String(init?.body)).model, "jev-latest");
        return Response.json({ answers });
      },
    }
  );
  assert.equal(calls, 1);
  assert.equal(packet.source, "jev-api");
  assert.equal(packet.complexity, "high");
  assert.doesNotMatch(JSON.stringify(injectOmniJev(body, packet)), /test-key|"probabilities":/);
});
test("timeout, HTTP and malformed responses keep local methodology", async () => {
  for (const request of [
    async () => Response.json({}, { status: 503 }),
    async () => Response.json({ answers: {} }),
    async () => new Promise<Response>(() => {}),
  ]) {
    const packet = await prepareOmniJev(
      body,
      { ...config, mode: "jev-api", timeoutMs: 25 },
      { apiKey: "test-key", fetch: request }
    );
    assert.equal(packet.source, "methodology-fallback");
    assert.equal(packet.task, "coding");
  }
});
test("similar family first, stable general tail, distinct connection identities", () => {
  const targets = [
    { executionKey: "a", modelStr: "p/glm-5" },
    { executionKey: "c", modelStr: "q/gemini-2.5-pro" },
    { executionKey: "b", modelStr: "r/glm-4" },
    { executionKey: "d", modelStr: "p/glm-5" },
  ];
  assert.deepEqual(
    orderSimilarTargets(targets).map((t) => t.executionKey),
    ["a", "b", "d", "c"]
  );
  assert.deepEqual(
    targets.map((t) => t.executionKey),
    ["a", "c", "b", "d"]
  );
});
test("real process.env without TYPESAFE_API_KEY never reaches the global fetch in jev-api mode", async () => {
  // Deliberately does NOT pass deps.apiKey or deps.fetch — this exercises the actual
  // `process.env.TYPESAFE_API_KEY` read, not a test double, proving the opt-in "jev-api"
  // mode makes zero network calls when the server has no key configured.
  const originalKey = process.env.TYPESAFE_API_KEY;
  delete process.env.TYPESAFE_API_KEY;
  const originalFetch = globalThis.fetch;
  let called = false;
  globalThis.fetch = (async () => {
    called = true;
    throw new Error("must not call the network when TYPESAFE_API_KEY is unset");
  }) as typeof fetch;
  try {
    const packet = await prepareOmniJev(body, { ...config, mode: "jev-api" });
    assert.equal(called, false);
    assert.equal(packet.source, "methodology-fallback");
    assert.equal(packet.reason, "missing-key");
    assert.equal(packet.task, "coding");
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.TYPESAFE_API_KEY;
    else process.env.TYPESAFE_API_KEY = originalKey;
  }
});
test("default combo config (mode omitted) is local-only: no jev-api call even with a key present", async () => {
  // The default omniJevConfigSchema parse (mode: "methodology") must never dial out,
  // regardless of what TYPESAFE_API_KEY holds — opt-in requires an explicit mode switch.
  const originalKey = process.env.TYPESAFE_API_KEY;
  process.env.TYPESAFE_API_KEY = "present-but-should-be-unused";
  const originalFetch = globalThis.fetch;
  let called = false;
  globalThis.fetch = (async () => {
    called = true;
    throw new Error("must not call the network in default local mode");
  }) as typeof fetch;
  try {
    const packet = await prepareOmniJev(body, config);
    assert.equal(called, false);
    assert.equal(packet.source, "methodology");
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.TYPESAFE_API_KEY;
    else process.env.TYPESAFE_API_KEY = originalKey;
  }
});
