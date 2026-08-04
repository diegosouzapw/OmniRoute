import { test } from "node:test";
import assert from "node:assert/strict";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";

// ──────────────────────────────────────────────────────────────────────────────
// Task 2.3: Groq field-strip wiring in base.ts
// Verify that when provider === "groq", stripGroqUnsupportedFields is applied
// before the body is dispatched — i.e. the outgoing fetch body has neither
// messages[].name, logprobs, logit_bias, nor top_logprobs.
// ──────────────────────────────────────────────────────────────────────────────

test("Groq executor strips logprobs, logit_bias, top_logprobs from outgoing request", async () => {
  const executor = new DefaultExecutor("groq");
  const originalFetch = globalThis.fetch;
  let capturedBody: Record<string, unknown> | null = null;

  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    capturedBody = JSON.parse(String(init.body));
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    await executor.execute({
      model: "llama-3.3-70b-versatile",
      body: {
        messages: [{ role: "user", content: "hi" }],
        logprobs: true,
        logit_bias: { "1234": 5 },
        top_logprobs: 3,
      },
      stream: false,
      credentials: { apiKey: "groq-test-key" },
    });
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.ok(capturedBody !== null, "fetch should have been called");
  assert.equal("logprobs" in capturedBody!, false, "logprobs should be stripped");
  assert.equal("logit_bias" in capturedBody!, false, "logit_bias should be stripped");
  assert.equal("top_logprobs" in capturedBody!, false, "top_logprobs should be stripped");
});

test("Groq executor strips messages[].name from outgoing request", async () => {
  const executor = new DefaultExecutor("groq");
  const originalFetch = globalThis.fetch;
  let capturedBody: Record<string, unknown> | null = null;

  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    capturedBody = JSON.parse(String(init.body));
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    await executor.execute({
      model: "llama-3.3-70b-versatile",
      body: {
        messages: [
          { role: "user", content: "hi", name: "alice" },
          { role: "assistant", content: "hello" },
        ],
      },
      stream: false,
      credentials: { apiKey: "groq-test-key" },
    });
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.ok(capturedBody !== null, "fetch should have been called");
  const messages = capturedBody!.messages as Record<string, unknown>[];
  assert.equal("name" in messages[0], false, "name should be stripped from user message");
  assert.equal(messages[0].content, "hi");
  assert.equal(messages[0].role, "user");
  // Second message has no name — should be unchanged.
  assert.equal(messages[1].content, "hello");
});

test("Non-Groq executor does NOT strip logprobs or messages[].name", async () => {
  // Use openai (an OpenAI-compat provider) to confirm the strip is Groq-only.
  const executor = new DefaultExecutor("openai");
  const originalFetch = globalThis.fetch;
  let capturedBody: Record<string, unknown> | null = null;

  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    capturedBody = JSON.parse(String(init.body));
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    await executor.execute({
      model: "gpt-4.1",
      body: {
        messages: [{ role: "user", content: "hi", name: "bob" }],
        logprobs: true,
      },
      stream: false,
      credentials: { apiKey: "sk-openai-test-key" },
    });
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.ok(capturedBody !== null, "fetch should have been called");
  // logprobs passes through untouched for non-Groq providers.
  assert.equal((capturedBody! as Record<string, unknown>).logprobs, true);
  // name passes through untouched.
  const messages = capturedBody!.messages as Record<string, unknown>[];
  assert.equal(messages[0].name, "bob");
});
