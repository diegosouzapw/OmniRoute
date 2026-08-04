import test from "node:test";
import assert from "node:assert/strict";

const base = await import("../../open-sse/executors/base.ts");

test("isOpenAICompatibleEndpoint matches openai-compatible-* providers", () => {
  assert.equal(base.isOpenAICompatibleEndpoint("openai-compatible-foo", "https://x/y"), true);
  assert.equal(
    base.isOpenAICompatibleEndpoint("claude", "https://api.anthropic.com/v1/messages"),
    false
  );
});

test("isOpenAICompatibleEndpoint matches chat/completions and responses URLs", () => {
  assert.equal(
    base.isOpenAICompatibleEndpoint("groq", "https://api.groq.com/openai/v1/chat/completions"),
    true
  );
  assert.equal(base.isOpenAICompatibleEndpoint("groq", "https://x/v1/responses"), true);
  assert.equal(base.isOpenAICompatibleEndpoint("groq", "https://x/v1/embeddings"), false);
});

test("strips X-Stainless-* headers on OpenAI-compatible passthrough", () => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: "Bearer sk-test",
    "X-Stainless-Lang": "js",
    "X-Stainless-OS": "Linux",
    "x-stainless-runtime": "node",
  };
  const stripped = base.stripStainlessHeadersForOpenAICompat(
    headers,
    "openai-compatible-acme",
    "https://acme.example/v1/chat/completions"
  );
  assert.deepEqual(stripped.sort(), ["X-Stainless-Lang", "X-Stainless-OS", "x-stainless-runtime"]);
  assert.equal(headers["X-Stainless-Lang"], undefined);
  assert.equal(headers["X-Stainless-OS"], undefined);
  assert.equal(headers["x-stainless-runtime"], undefined);
  // Non-stainless headers untouched.
  assert.equal(headers["Authorization"], "Bearer sk-test");
  assert.equal(headers["Content-Type"], "application/json");
});

test("does NOT strip X-Stainless-* for non-OpenAI-compatible endpoints", () => {
  const headers: Record<string, string> = {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": "1.0.0",
  };
  const stripped = base.stripStainlessHeadersForOpenAICompat(
    headers,
    "claude",
    "https://api.anthropic.com/v1/messages"
  );
  assert.deepEqual(stripped, []);
  // Claude-code-compat spoofing path keeps its X-Stainless-* headers intact.
  assert.equal(headers["X-Stainless-Lang"], "js");
  assert.equal(headers["X-Stainless-Package-Version"], "1.0.0");
});

test("normalizes SDK-derived User-Agent on OpenAI-compatible request", () => {
  const headers: Record<string, string> = {
    "User-Agent": "OpenAI/NodeJS 4.20.0 undici",
  };
  base.stripStainlessHeadersForOpenAICompat(
    headers,
    "openai-compatible-acme",
    "https://acme.example/v1/chat/completions"
  );
  assert.equal(headers["User-Agent"], "Mozilla/5.0 (compatible; OpenAI Compatible)");
});

test("leaves a non-SDK User-Agent untouched", () => {
  const headers: Record<string, string> = {
    "User-Agent": "my-custom-agent/2.0",
  };
  base.stripStainlessHeadersForOpenAICompat(
    headers,
    "openai-compatible-acme",
    "https://acme.example/v1/chat/completions"
  );
  assert.equal(headers["User-Agent"], "my-custom-agent/2.0");
});
