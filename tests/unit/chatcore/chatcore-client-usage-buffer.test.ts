// Characterization of applyClientUsageBuffer — the non-streaming usage buffer/estimate block
// extracted from handleChatCore (chatCore god-file decomposition, #3501). Deps are injected so the
// buffer-vs-estimate branch and the in-place mutation of translatedResponse.usage are observable.
// Locks: usage present → buffer+filter; usage absent → estimate from content length; empty content
// (length 2 from JSON.stringify("")) still estimates; the mutation target is translatedResponse.
import { test } from "node:test";
import assert from "node:assert/strict";

const { applyClientUsageBuffer } =
  await import("../../../open-sse/handlers/chatCore/clientUsageBuffer.ts");
const { resolveChatCoreRequestFormat } =
  await import("../../../open-sse/handlers/chatCore/requestFormat.ts");
const { invalidateBufferTokensCache } = await import("../../../open-sse/utils/usageTracking.ts");

function makeDeps(overrides: Record<string, unknown> = {}) {
  const calls = { buffer: [] as unknown[], estimate: [] as unknown[], filter: [] as unknown[] };
  const deps = {
    addBufferToUsage: (u: unknown) => {
      calls.buffer.push(u);
      return { ...(u as object), _buffered: true };
    },
    estimateUsage: (...a: unknown[]) => {
      calls.estimate.push(a);
      return { _estimated: true };
    },
    filterUsageForFormat: (u: unknown, _fmt: unknown) => {
      calls.filter.push(u);
      return { ...(u as object), _filtered: true };
    },
    ...overrides,
  } as Parameters<typeof applyClientUsageBuffer>[4];
  return { deps, calls };
}

test("request format producer forwards its string contract to usage estimation", () => {
  const { clientResponseFormat } = resolveChatCoreRequestFormat({
    clientRawRequest: { endpoint: "/v1/chat/completions" },
    body: { messages: [] },
    provider: "openai",
    userAgent: null,
  });
  const { deps, calls } = makeDeps();
  const resp: Record<string, unknown> = {
    choices: [{ message: { content: "hello" } }],
  };

  applyClientUsageBuffer(resp, { messages: [] }, clientResponseFormat, {}, deps);

  const args = calls.estimate[0] as unknown[];
  assert.equal(typeof clientResponseFormat, "string");
  assert.equal(args[2], clientResponseFormat);
});

test("usage present → buffer then filter, mutates in place", () => {
  const { deps, calls } = makeDeps();
  const resp: Record<string, unknown> = { usage: { prompt_tokens: 5 } };
  applyClientUsageBuffer(resp, { messages: [] }, "openai", {}, deps);
  assert.equal(calls.buffer.length, 1);
  assert.equal(calls.estimate.length, 0);
  assert.equal((resp.usage as Record<string, unknown>)._buffered, true);
  assert.equal((resp.usage as Record<string, unknown>)._filtered, true);
});

test("all-zero usage stub → sanitize then buffer (not a constant 2000 estimate)", () => {
  const { deps, calls } = makeDeps();
  const resp: Record<string, unknown> = {
    usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
    choices: [{ message: { content: "PONG" } }],
  };
  applyClientUsageBuffer(resp, { messages: [{ role: "user", content: "hi" }] }, "openai", {}, deps);
  // #10705 repairs provider-reported zeros on a non-trivial request, so the
  // block is no longer empty and takes the buffer path (never the old 2000 stub).
  assert.equal(calls.buffer.length, 1);
  assert.equal(calls.estimate.length, 0);
  assert.equal((resp.usage as Record<string, unknown>)._buffered, true);
});

test("no usage but content present → estimate then filter", () => {
  const { deps, calls } = makeDeps();
  const resp: Record<string, unknown> = {
    choices: [{ message: { content: "hello world" } }],
  };
  applyClientUsageBuffer(resp, { messages: [] }, "openai", {}, deps);
  assert.equal(calls.buffer.length, 0);
  assert.equal(calls.estimate.length, 1);
  assert.equal((resp.usage as Record<string, unknown>)._estimated, true);
  assert.equal((resp.usage as Record<string, unknown>)._filtered, true);
  // estimateUsage receives (body, contentLength, format)
  const args = calls.estimate[0] as unknown[];
  assert.equal(args[2], "openai");
  assert.equal(typeof args[1], "number");
});

test("empty content → JSON.stringify('') length 2 > 0 still estimates", () => {
  const { deps, calls } = makeDeps();
  const resp: Record<string, unknown> = {};
  applyClientUsageBuffer(resp, {}, "claude", {}, deps);
  // content "" → JSON.stringify("") = '""' length 2 → contentLength 2 > 0
  assert.equal(calls.estimate.length, 1);
  const args = calls.estimate[0] as unknown[];
  assert.equal(args[1], 2);
});

test("content length is computed from choices[0].message.content", () => {
  const { deps, calls } = makeDeps();
  const resp: Record<string, unknown> = {
    choices: [{ message: { content: "abc" } }],
  };
  applyClientUsageBuffer(resp, {}, "openai", {}, deps);
  // JSON.stringify("abc") = '"abc"' → length 5
  const args = calls.estimate[0] as unknown[];
  assert.equal(args[1], 5);
});

// #8331/#8356 added the `options` parameter between `clientResponseFormat` and `deps`,
// which is what silently broke the five call sites above (the injected spies landed in
// the `options` slot, so the real implementations ran and no spy was ever recorded).
// Cover the option itself so the new parameter is exercised, not just tolerated.

test("preserveContextBudgetInVisibleUsage folds context_budget_* back into visible fields", () => {
  const { deps, calls } = makeDeps({
    addBufferToUsage: (u: unknown) => ({
      ...(u as object),
      context_budget_prompt_tokens: 2005,
      context_budget_input_tokens: 2005,
      context_budget_total_tokens: 2010,
    }),
  });
  const resp: Record<string, unknown> = {
    usage: { prompt_tokens: 5, input_tokens: 5, total_tokens: 10 },
  };

  applyClientUsageBuffer(
    resp,
    { messages: [] },
    "openai",
    {
      preserveContextBudgetInVisibleUsage: true,
    },
    deps
  );

  const filtered = calls.filter[0] as Record<string, unknown>;
  assert.equal(filtered.prompt_tokens, 2005, "Claude-Code path re-folds the buffered value");
  assert.equal(filtered.input_tokens, 2005);
  assert.equal(filtered.total_tokens, 2010);
});

test("without the option the visible usage keeps the real unbuffered #8331 numbers", () => {
  const { deps, calls } = makeDeps({
    addBufferToUsage: (u: unknown) => ({
      ...(u as object),
      context_budget_prompt_tokens: 2005,
    }),
  });
  const resp: Record<string, unknown> = { usage: { prompt_tokens: 5 } };

  applyClientUsageBuffer(resp, { messages: [] }, "openai", {}, deps);

  const filtered = calls.filter[0] as Record<string, unknown>;
  assert.equal(filtered.prompt_tokens, 5, "default path must not inflate client-visible metering");
});

test("real client-visible usage is not inflated by the context safety buffer", () => {
  const saved = process.env.USAGE_TOKEN_BUFFER;
  process.env.USAGE_TOKEN_BUFFER = "2000";
  invalidateBufferTokensCache();

  try {
    const response: Record<string, unknown> = {
      usage: { prompt_tokens: 69, completion_tokens: 5, total_tokens: 74 },
    };
    applyClientUsageBuffer(response, { messages: [{ role: "user", content: "hello" }] }, "openai");

    assert.deepEqual(response.usage, {
      prompt_tokens: 69,
      completion_tokens: 5,
      total_tokens: 74,
    });
  } finally {
    if (saved === undefined) delete process.env.USAGE_TOKEN_BUFFER;
    else process.env.USAGE_TOKEN_BUFFER = saved;
    invalidateBufferTokensCache();
  }
});

test("usage is validated against the provider-bound body with injected context", () => {
  const providerBody = {
    system: "x".repeat(10_000),
    messages: [{ role: "user", content: "hello" }],
  };
  const response: Record<string, unknown> = {
    usage: { prompt_tokens: 15_000, completion_tokens: 5, total_tokens: 15_005 },
  };

  applyClientUsageBuffer(response, providerBody, "openai");

  assert.deepEqual(response.usage, {
    prompt_tokens: 15_000,
    completion_tokens: 5,
    total_tokens: 15_005,
  });
});
