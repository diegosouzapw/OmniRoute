import { test, before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "./_chatPipelineHarness.ts";

let h: Awaited<ReturnType<typeof createChatPipelineHarness>>;

before(async () => {
  h = await createChatPipelineHarness("stream-recovery");
});

after(async () => {
  await h.cleanup();
});

beforeEach(async () => {
  await h.resetStorage();
  delete process.env.STREAM_RECOVERY_ENABLED;
});

// A 200 SSE stream that ends WITHOUT a terminal `[DONE]` marker = silent truncation.
function truncatedOpenAIStream(): Response {
  const chunk = JSON.stringify({
    id: "chatcmpl_trunc",
    object: "chat.completion.chunk",
    choices: [{ index: 0, delta: { role: "assistant", content: "PARTIAL" } }],
  });
  return new Response(`data: ${chunk}\n\n`, {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

function completeOpenAIStream(): Response {
  const chunk = JSON.stringify({
    id: "chatcmpl_full",
    object: "chat.completion.chunk",
    choices: [{ index: 0, delta: { role: "assistant", content: "RECOVERED" } }],
  });
  return new Response([`data: ${chunk}`, "", "data: [DONE]", ""].join("\n"), {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

async function readSSE(response: Response): Promise<string> {
  const reader = (response.body as ReadableStream<Uint8Array>).getReader();
  const decoder = new TextDecoder();
  let out = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) out += decoder.decode(value, { stream: true });
  }
  return out;
}

test("stream recovery ON: a truncated opening stream is retried transparently", async () => {
  await h.seedConnection("openai", { apiKey: "sk-openai-primary" });
  const apiKey = await h.seedApiKey();
  await h.settingsDb.updateSettings({
    resilienceSettings: { streamRecovery: { enabled: true } },
  });

  let calls = 0;
  globalThis.fetch = (async () => {
    calls++;
    return calls === 1 ? truncatedOpenAIStream() : completeOpenAIStream();
  }) as typeof fetch;

  const response = await h.handleChat(
    h.buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: true,
        messages: [{ role: "user", content: "hi" }],
      },
    })
  );

  assert.equal(response.status, 200);
  const sse = await readSSE(response);
  assert.equal(calls, 2, "should have re-opened the upstream exactly once");
  assert.match(sse, /RECOVERED/, "client receives the recovered attempt");
  assert.match(sse, /\[DONE\]/, "recovered stream carries its terminal marker");
  assert.doesNotMatch(sse, /PARTIAL/, "the discarded first attempt must not leak to the client");
});

test("stream recovery OFF (default): a truncated stream is NOT retried", async () => {
  await h.seedConnection("openai", { apiKey: "sk-openai-primary" });
  const apiKey = await h.seedApiKey();
  // No setting, no env → default OFF.

  let calls = 0;
  globalThis.fetch = (async () => {
    calls++;
    return truncatedOpenAIStream();
  }) as typeof fetch;

  const response = await h.handleChat(
    h.buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: true,
        messages: [{ role: "user", content: "hi" }],
      },
    })
  );

  assert.equal(response.status, 200);
  await readSSE(response);
  assert.equal(calls, 1, "default path calls upstream exactly once — zero behavior change");
});

test("/goal requests enable early stream recovery even when the global default is OFF", async () => {
  await h.seedConnection("openai", { apiKey: "sk-openai-primary" });
  const apiKey = await h.seedApiKey();
  // No setting, no env → global recovery stays OFF. The /goal detector should opt in.

  let calls = 0;
  globalThis.fetch = (async () => {
    calls++;
    return calls === 1 ? truncatedOpenAIStream() : completeOpenAIStream();
  }) as typeof fetch;

  const response = await h.handleChat(
    h.buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: true,
        messages: [{ role: "user", content: "/goal finish this long-running task" }],
      },
    })
  );

  assert.equal(response.status, 200);
  const sse = await readSSE(response);
  assert.equal(calls, 2, "goal mode should re-open an early-truncated stream");
  assert.match(sse, /RECOVERED/, "client receives the recovered attempt");
  assert.doesNotMatch(sse, /PARTIAL/, "the discarded first attempt must not leak to the client");
});

test("/goal requests do NOT re-enable stream recovery when the operator explicitly disabled it", async () => {
  await h.seedConnection("openai", { apiKey: "sk-openai-primary" });
  const apiKey = await h.seedApiKey();
  // Operator explicitly turned recovery OFF via a DB/settings override — the
  // agentGoalPolicy heuristic must be fail-closed and never override this.
  await h.settingsDb.updateSettings({
    resilienceSettings: { streamRecovery: { enabled: false } },
  });

  let calls = 0;
  globalThis.fetch = (async () => {
    calls++;
    return truncatedOpenAIStream();
  }) as typeof fetch;

  const response = await h.handleChat(
    h.buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: true,
        messages: [{ role: "user", content: "/goal finish this long-running task" }],
      },
    })
  );

  assert.equal(response.status, 200);
  await readSSE(response);
  assert.equal(
    calls,
    1,
    "explicit operator opt-out must win over the goal-policy heuristic — zero re-open"
  );
});
