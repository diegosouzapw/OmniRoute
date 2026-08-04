// Characterization of buildPostCallGuardrailContext — the context object passed to
// guardrailRegistry.runPostCallHooks, extracted from handleChatCore (chatCore god-file
// decomposition, #3501). resolveDisabledGuardrails is injected so the mapping is observable in
// isolation. Locks: the field mapping (sourceFormat/targetFormat), the constants (method "POST",
// stream false), endpoint/headers null-coalescing, and that disabled-resolution gets apiKeyInfo/
// body/headers.
import { test } from "node:test";
import assert from "node:assert/strict";

const { buildPostCallGuardrailContext } = await import(
  "../../open-sse/handlers/chatCore/postCallGuardrailContext.ts"
);

function baseArgs(overrides: Record<string, unknown> = {}) {
  return {
    apiKeyInfo: { id: "key-1" },
    body: { messages: [] },
    clientRawRequest: { headers: { "x-test": "1" }, endpoint: "/v1/chat/completions" },
    log: { tag: "log" },
    model: "gpt-x",
    provider: "openai",
    responsePayloadFormat: "openai",
    clientResponseFormat: "claude",
    ...overrides,
  } as Parameters<typeof buildPostCallGuardrailContext>[0];
}

test("maps fields, constants, and source/target formats", () => {
  const seen: unknown[] = [];
  const ctx = buildPostCallGuardrailContext(baseArgs(), (arg: unknown) => {
    seen.push(arg);
    return ["g1"];
  });
  assert.equal(ctx.method, "POST");
  assert.equal(ctx.stream, false);
  assert.equal(ctx.model, "gpt-x");
  assert.equal(ctx.provider, "openai");
  assert.equal(ctx.sourceFormat, "openai");
  assert.equal(ctx.targetFormat, "claude");
  assert.equal(ctx.endpoint, "/v1/chat/completions");
  assert.deepEqual(ctx.disabledGuardrails, ["g1"]);
  // resolveDisabledGuardrails received apiKeyInfo/body/headers
  assert.deepEqual(seen[0], {
    apiKeyInfo: { id: "key-1" },
    body: { messages: [] },
    headers: { "x-test": "1" },
  });
});

test("null clientRawRequest → endpoint/headers null", () => {
  const ctx = buildPostCallGuardrailContext(baseArgs({ clientRawRequest: null }), () => []);
  assert.equal(ctx.endpoint, null);
  assert.equal(ctx.headers, null);
});

test("missing endpoint → null (|| null), headers passes through", () => {
  const ctx = buildPostCallGuardrailContext(
    baseArgs({ clientRawRequest: { headers: { a: "b" } } }),
    () => []
  );
  assert.equal(ctx.endpoint, null);
  assert.deepEqual(ctx.headers, { a: "b" });
});

test("null apiKeyInfo coalesces to null for resolveDisabledGuardrails", () => {
  let received: { apiKeyInfo?: unknown } = {};
  buildPostCallGuardrailContext(baseArgs({ apiKeyInfo: null }), (arg: { apiKeyInfo?: unknown }) => {
    received = arg;
    return [];
  });
  assert.equal(received.apiKeyInfo, null);
});
