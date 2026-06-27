import test from "node:test";
import assert from "node:assert/strict";
import {
  AntigravityHandler,
  convertGeminiToOpenAI,
} from "../../src/mitm/handlers/antigravity.ts";
import { runHandler } from "./_mitmHandlerHarness.ts";

test("antigravity handler — forwards to OmniRoute and pipes SSE", async () => {
  const r = await runHandler(
    new AntigravityHandler(),
    { model: "gpt-4o", messages: [{ role: "user", content: "hi" }] },
    "claude-3.5-sonnet",
    { upstreamBody: "data: hello\n\ndata: world\n\n" }
  );
  assert.ok(r.fetchCalled);
  assert.equal(r.status, 200);
  assert.ok(r.responseChunks.join("").includes("hello"));
});

test("antigravity handler — propagates upstream failure as 500", async () => {
  const r = await runHandler(
    new AntigravityHandler(),
    { model: "gpt-4o" },
    "claude-3.5-sonnet",
    { upstreamStatus: 500, upstreamBody: "boom" }
  );
  assert.equal(r.status, 500);
  const body = r.responseChunks.join("");
  // Error must NOT include raw stack trace (Hard Rule #12 sanitization).
  assert.ok(!body.includes("at /"));
});

test("convertGeminiToOpenAI — maps Gemini fields to OpenAI chat body", () => {
  const out = convertGeminiToOpenAI(
    {
      systemInstruction: { parts: [{ text: "be brief" }] },
      contents: [
        { role: "user", parts: [{ text: "hello" }] },
        { role: "model", parts: [{ text: "hi there" }] },
      ],
      generationConfig: {
        maxOutputTokens: 256,
        temperature: 0.4,
        topP: 0.9,
        stopSequences: ["STOP"],
      },
      // Gemini-only field that must NOT leak into the OpenAI body.
      thinkingConfig: { thinkingBudget: 1024 },
    } as Record<string, unknown>,
    "claude-opus-4-6-thinking",
    true
  );

  assert.equal(out.model, "claude-opus-4-6-thinking");
  assert.equal(out.stream, true);
  assert.deepEqual(out.messages, [
    { role: "system", content: "be brief" },
    { role: "user", content: "hello" },
    { role: "assistant", content: "hi there" },
  ]);
  assert.equal(out.max_tokens, 256);
  assert.equal(out.temperature, 0.4);
  assert.equal(out.top_p, 0.9);
  assert.deepEqual(out.stop, ["STOP"]);
  // Gemini-native fields must be stripped, not forwarded.
  assert.equal((out as Record<string, unknown>).contents, undefined);
  assert.equal((out as Record<string, unknown>).generationConfig, undefined);
  assert.equal((out as Record<string, unknown>).thinkingConfig, undefined);
});

test("antigravity handler — converts raw Gemini body before forwarding", async () => {
  const r = await runHandler(
    new AntigravityHandler(),
    {
      contents: [{ role: "user", parts: [{ text: "ping" }] }],
      generationConfig: { maxOutputTokens: 64 },
      thinkingConfig: { thinkingBudget: 512 },
    },
    "ag-claude-opus-4-6-thinking",
    {
      upstreamBody: "data: pong\n\n",
      url: "/v1beta/models/gemini:streamGenerateContent",
    }
  );

  assert.ok(r.fetchCalled);
  const forwarded = JSON.parse(r.fetchBody);
  // The router must receive OpenAI format, not the raw Gemini body.
  assert.equal(forwarded.model, "ag-claude-opus-4-6-thinking");
  assert.equal(forwarded.stream, true);
  assert.deepEqual(forwarded.messages, [{ role: "user", content: "ping" }]);
  assert.equal(forwarded.max_tokens, 64);
  // Gemini-native fields that caused upstream 400s must be gone.
  assert.equal(forwarded.contents, undefined);
  assert.equal(forwarded.generationConfig, undefined);
  assert.equal(forwarded.thinkingConfig, undefined);
});

test("antigravity handler — non-streaming URL yields stream:false", async () => {
  const r = await runHandler(
    new AntigravityHandler(),
    { contents: [{ role: "user", parts: [{ text: "hi" }] }] },
    "gpt-4o",
    { url: "/v1beta/models/gemini:generateContent" }
  );
  const forwarded = JSON.parse(r.fetchBody);
  assert.equal(forwarded.stream, false);
});
