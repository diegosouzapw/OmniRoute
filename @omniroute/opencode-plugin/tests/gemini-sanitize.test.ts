/**
 * T-06 Gemini tool-schema sanitisation contract tests.
 *
 * Three layers under test:
 *   1. `sanitizeGeminiToolSchemas` — pure function; key stripping + clone
 *      semantics on chat-completion + Responses-API shapes.
 *   2. `shouldSanitizeForGemini` — model-string detection (liberal).
 *   3. `createGeminiSanitizingFetch` — wrapper composition; URL gating,
 *      body-shape polymorphism, streaming-body bypass, fail-open behaviour,
 *      composition with the T-04 Bearer interceptor.
 *
 * Strategy: same posture as fetch-interceptor.test.ts — install a
 * closure-based fetch recorder; assert on the `(input, init)` observed by
 * the inner fetch after the sanitising wrapper has had its say.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  __resetGeminiStreamingWarning,
  createGeminiSanitizingFetch,
  createOmniRouteFetchInterceptor,
  sanitizeGeminiToolSchemas,
  shouldSanitizeForGemini,
} from "../src/index.js";

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

type FetchCall = { input: Parameters<typeof fetch>[0]; init?: RequestInit };

function recorder(response: Response = new Response("ok")): {
  fn: typeof fetch;
  calls: FetchCall[];
} {
  const calls: FetchCall[] = [];
  const fn = (async (input: any, init?: any) => {
    calls.push({ input, init });
    return response;
  }) as typeof fetch;
  return { fn, calls };
}

function bodyAsRecord(init: RequestInit | undefined): Record<string, unknown> {
  const b = init?.body;
  if (typeof b !== "string") {
    throw new Error(`expected string body, got ${typeof b}`);
  }
  return JSON.parse(b) as Record<string, unknown>;
}

// Sample tool payloads — small enough to inline, big enough to cover
// chat-completion + Responses-API + nested properties.

function chatCompletionsWithDollarSchema(): Record<string, unknown> {
  return {
    model: "gemini-2.5-pro",
    tools: [
      {
        type: "function",
        function: {
          name: "search",
          parameters: {
            $schema: "http://json-schema.org/draft-07/schema#",
            type: "object",
            additionalProperties: false,
            properties: {
              q: { type: "string" },
            },
            required: ["q"],
          },
        },
      },
    ],
  };
}

function responsesApiWithRef(): Record<string, unknown> {
  return {
    model: "gemini-2.5-flash",
    tools: [
      {
        type: "function",
        name: "lookup",
        input_schema: {
          type: "object",
          $ref: "#/definitions/Lookup",
          properties: {
            id: { type: "string", ref: "Id" },
          },
        },
      },
    ],
  };
}

function nestedPropertiesPayload(): Record<string, unknown> {
  return {
    model: "gemini-pro",
    tools: [
      {
        type: "function",
        function: {
          name: "deep",
          parameters: {
            type: "object",
            properties: {
              outer: {
                type: "object",
                $schema: "http://json-schema.org/draft-07/schema#",
                properties: {
                  inner: {
                    type: "object",
                    additionalProperties: true,
                    $ref: "#/inner",
                    properties: {
                      leaf: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    ],
  };
}

// ────────────────────────────────────────────────────────────────────────────
// sanitizeGeminiToolSchemas — pure function
// ────────────────────────────────────────────────────────────────────────────

test("sanitizeGeminiToolSchemas: strips $schema from top-level", () => {
  const input = {
    model: "gemini-2.5-pro",
    $schema: "http://json-schema.org/draft-07/schema#",
    tools: [],
  };
  const out = sanitizeGeminiToolSchemas(input) as Record<string, unknown>;
  assert.equal(out.$schema, undefined);
  assert.equal(out.model, "gemini-2.5-pro");
});

test("sanitizeGeminiToolSchemas: strips $ref + additionalProperties from tools[].function.parameters", () => {
  const input = chatCompletionsWithDollarSchema();
  const out = sanitizeGeminiToolSchemas(input) as Record<string, unknown>;
  const params = (out.tools as Array<{ function: { parameters: Record<string, unknown> } }>)[0]!
    .function.parameters;
  assert.equal(params.$schema, undefined);
  assert.equal(params.additionalProperties, undefined);
  // Untouched keys survive.
  assert.equal(params.type, "object");
  assert.deepEqual(params.required, ["q"]);
});

test("sanitizeGeminiToolSchemas: strips nested $schema from properties.x.properties.y", () => {
  const input = nestedPropertiesPayload();
  const out = sanitizeGeminiToolSchemas(input) as Record<string, unknown>;
  const params = (out.tools as Array<{ function: { parameters: Record<string, unknown> } }>)[0]!
    .function.parameters;
  const outer = (params.properties as Record<string, Record<string, unknown>>).outer!;
  const inner = (outer.properties as Record<string, Record<string, unknown>>).inner!;
  assert.equal(outer.$schema, undefined);
  assert.equal(inner.$ref, undefined);
  assert.equal(inner.additionalProperties, undefined);
  // Leaf still intact.
  assert.deepEqual(inner.properties, { leaf: { type: "string" } });
});

test("sanitizeGeminiToolSchemas: handles Responses-API tools[].input_schema shape", () => {
  const input = responsesApiWithRef();
  const out = sanitizeGeminiToolSchemas(input) as Record<string, unknown>;
  const inputSchema = (out.tools as Array<{ input_schema: Record<string, unknown> }>)[0]!
    .input_schema;
  assert.equal(inputSchema.$ref, undefined);
  // Nested `ref` (lowercase) also stripped.
  const props = inputSchema.properties as Record<string, Record<string, unknown>>;
  assert.equal(props.id!.ref, undefined);
  assert.equal(props.id!.type, "string");
});

test("sanitizeGeminiToolSchemas: leaves payload without tools untouched", () => {
  const input = { model: "gemini-2.5-pro", messages: [{ role: "user", content: "hi" }] };
  const out = sanitizeGeminiToolSchemas(input) as Record<string, unknown>;
  assert.deepEqual(out, input);
});

test("sanitizeGeminiToolSchemas: does not mutate input (returned object is distinct)", () => {
  const input = chatCompletionsWithDollarSchema();
  const beforeJson = JSON.stringify(input);
  const out = sanitizeGeminiToolSchemas(input);
  // Input bit-identical to its pre-sanitise serialisation.
  assert.equal(JSON.stringify(input), beforeJson);
  // Output is a different reference.
  assert.notEqual(out, input);
});

// ────────────────────────────────────────────────────────────────────────────
// shouldSanitizeForGemini — detection
// ────────────────────────────────────────────────────────────────────────────

test("shouldSanitizeForGemini: gemini-2.5-pro → true", () => {
  assert.equal(shouldSanitizeForGemini({ model: "gemini-2.5-pro" }), true);
});

test("shouldSanitizeForGemini: models/gemini-pro → true", () => {
  assert.equal(shouldSanitizeForGemini({ model: "models/gemini-pro" }), true);
});

test("shouldSanitizeForGemini: google-vertex/gemini-1.5-flash → true", () => {
  assert.equal(shouldSanitizeForGemini({ model: "google-vertex/gemini-1.5-flash" }), true);
});

test("shouldSanitizeForGemini: gemini/gemini-2.5-pro → true", () => {
  assert.equal(shouldSanitizeForGemini({ model: "gemini/gemini-2.5-pro" }), true);
});

test("shouldSanitizeForGemini: claude-sonnet-4 → false", () => {
  assert.equal(shouldSanitizeForGemini({ model: "claude-sonnet-4" }), false);
});

test("shouldSanitizeForGemini: payload.model missing → false", () => {
  assert.equal(shouldSanitizeForGemini({ messages: [] }), false);
});

test("shouldSanitizeForGemini: payload is null → false", () => {
  assert.equal(shouldSanitizeForGemini(null), false);
});

test("shouldSanitizeForGemini: payload.model is non-string → false", () => {
  assert.equal(shouldSanitizeForGemini({ model: 42 }), false);
});

// ────────────────────────────────────────────────────────────────────────────
// createGeminiSanitizingFetch — wrapper
// ────────────────────────────────────────────────────────────────────────────

const URL_CHAT = "https://or.example.com/v1/chat/completions";
const URL_RESPONSES = "https://or.example.com/v1/responses";
const URL_MODELS = "https://or.example.com/v1/models";

test("createGeminiSanitizingFetch: gemini model + chat/completions → tool schemas stripped before forward", async () => {
  const rec = recorder();
  const wrapped = createGeminiSanitizingFetch(rec.fn);
  await wrapped(URL_CHAT, {
    method: "POST",
    body: JSON.stringify(chatCompletionsWithDollarSchema()),
  });
  assert.equal(rec.calls.length, 1);
  const forwarded = bodyAsRecord(rec.calls[0]!.init);
  const params = (
    forwarded.tools as Array<{ function: { parameters: Record<string, unknown> } }>
  )[0]!.function.parameters;
  assert.equal(params.$schema, undefined);
  assert.equal(params.additionalProperties, undefined);
});

test("createGeminiSanitizingFetch: non-gemini model + chat/completions → body passed through unchanged", async () => {
  const rec = recorder();
  const wrapped = createGeminiSanitizingFetch(rec.fn);
  const originalBody = JSON.stringify({
    model: "claude-sonnet-4",
    tools: [
      {
        type: "function",
        function: {
          name: "x",
          parameters: { $schema: "keep-me", type: "object" },
        },
      },
    ],
  });
  await wrapped(URL_CHAT, { method: "POST", body: originalBody });
  // Identity check on body — wrapper must NOT mutate non-Gemini payloads.
  assert.equal(rec.calls[0]!.init!.body, originalBody);
});

test("createGeminiSanitizingFetch: gemini model + /v1/models (non-completion endpoint) → body passed through unchanged", async () => {
  const rec = recorder();
  const wrapped = createGeminiSanitizingFetch(rec.fn);
  // GET /v1/models has no body in production; assert that even if a caller
  // attached a Gemini-shaped body to a non-completion URL, the wrapper
  // doesn't touch it.
  const body = JSON.stringify(chatCompletionsWithDollarSchema());
  await wrapped(URL_MODELS, { method: "POST", body });
  assert.equal(rec.calls[0]!.init!.body, body);
});

test("createGeminiSanitizingFetch: gemini model + /responses endpoint → input_schema stripped", async () => {
  const rec = recorder();
  const wrapped = createGeminiSanitizingFetch(rec.fn);
  await wrapped(URL_RESPONSES, {
    method: "POST",
    body: JSON.stringify(responsesApiWithRef()),
  });
  const forwarded = bodyAsRecord(rec.calls[0]!.init);
  const schema = (forwarded.tools as Array<{ input_schema: Record<string, unknown> }>)[0]!
    .input_schema;
  assert.equal(schema.$ref, undefined);
});

test("createGeminiSanitizingFetch: gemini model + Request input with body → tool schemas stripped", async () => {
  const rec = recorder();
  const wrapped = createGeminiSanitizingFetch(rec.fn);
  const req = new Request(URL_CHAT, {
    method: "POST",
    body: JSON.stringify(chatCompletionsWithDollarSchema()),
    headers: { "Content-Type": "application/json" },
  });
  await wrapped(req);
  const forwarded = bodyAsRecord(rec.calls[0]!.init);
  const params = (
    forwarded.tools as Array<{ function: { parameters: Record<string, unknown> } }>
  )[0]!.function.parameters;
  assert.equal(params.$schema, undefined);
});

test("createGeminiSanitizingFetch: gemini model + ReadableStream body → skipped + warn emitted once", async () => {
  __resetGeminiStreamingWarning();
  const rec = recorder();
  const wrapped = createGeminiSanitizingFetch(rec.fn);

  // Capture console.warn for the duration of this test.
  const warnings: string[] = [];
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    warnings.push(args.map(String).join(" "));
  };

  try {
    const stream1 = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("{}"));
        controller.close();
      },
    });
    const stream2 = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("{}"));
        controller.close();
      },
    });
    // Two streaming calls — only one warn expected.
    await wrapped(URL_CHAT, { method: "POST", body: stream1 });
    await wrapped(URL_CHAT, { method: "POST", body: stream2 });
  } finally {
    console.warn = originalWarn;
  }

  // Both calls forwarded to inner fetch with their streams intact.
  assert.equal(rec.calls.length, 2);
  // ONE warning total — one-shot latch held.
  assert.equal(warnings.length, 1);
  assert.match(warnings[0]!, /streaming Request body, skipping schema strip/);
});

test("createGeminiSanitizingFetch: invalid JSON body → pass through, no throw", async () => {
  const rec = recorder();
  const wrapped = createGeminiSanitizingFetch(rec.fn);
  // Garbage body must not crash the wrapper.
  await wrapped(URL_CHAT, { method: "POST", body: "this is not json{{" });
  assert.equal(rec.calls.length, 1);
  assert.equal(rec.calls[0]!.init!.body, "this is not json{{");
});

test("createGeminiSanitizingFetch: empty body → pass through unchanged", async () => {
  const rec = recorder();
  const wrapped = createGeminiSanitizingFetch(rec.fn);
  await wrapped(URL_CHAT, { method: "POST" });
  assert.equal(rec.calls.length, 1);
});

test("createGeminiSanitizingFetch: composes correctly with createOmniRouteFetchInterceptor (Bearer + sanitization)", async () => {
  // Save and replace globalThis.fetch — the Bearer interceptor calls global
  // fetch when the URL targets its baseURL.
  const originalFetch = globalThis.fetch;
  const observed: FetchCall[] = [];
  globalThis.fetch = (async (input: any, init?: any) => {
    observed.push({ input, init });
    return new Response("ok");
  }) as typeof fetch;

  try {
    const composed = createGeminiSanitizingFetch(
      createOmniRouteFetchInterceptor({
        apiKey: "sk-test",
        baseURL: "https://or.example.com/v1",
      })
    );
    await composed(URL_CHAT, {
      method: "POST",
      body: JSON.stringify(chatCompletionsWithDollarSchema()),
    });

    assert.equal(observed.length, 1);
    // Bearer injected (header concern).
    const sentHeaders = new Headers((observed[0]!.init as RequestInit).headers);
    assert.equal(sentHeaders.get("Authorization"), "Bearer sk-test");
    // Schema sanitised (body concern).
    const forwarded = bodyAsRecord(observed[0]!.init);
    const params = (
      forwarded.tools as Array<{ function: { parameters: Record<string, unknown> } }>
    )[0]!.function.parameters;
    assert.equal(params.$schema, undefined);
    assert.equal(params.additionalProperties, undefined);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
