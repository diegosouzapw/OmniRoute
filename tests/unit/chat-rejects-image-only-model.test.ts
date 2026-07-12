// #6457: /v1/chat/completions must reject image-only models with a clear 400 pointing
// callers at /v1/images/generations, instead of forwarding to a chat upstream that
// returns a confusing raw provider 400 (HuggingFace: "not a chat model").
//
// Discriminator: getImageModelEntry(modelStr) — non-null only for models registered
// in open-sse/config/imageRegistry.ts. Chat-only models (openai/gpt-4o etc.) return
// null and pass the guard unchanged.
import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("chat-rejects-image-only-model");
const { buildRequest, handleChat, resetStorage } = harness as {
  buildRequest: (opts: { body: unknown }) => Request;
  handleChat: (req: Request) => Promise<Response>;
  resetStorage: () => void | Promise<void>;
};

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  harness.cleanup?.();
});

test("POST /v1/chat/completions with a HuggingFace image model returns 400 + generations hint (#6457)", async () => {
  const request = buildRequest({
    body: {
      model: "huggingface/stabilityai/stable-diffusion-xl-base-1.0",
      messages: [{ role: "user", content: "draw a cat" }],
    },
  });

  const originalFetch = globalThis.fetch;
  let fetchCalls = 0;
  globalThis.fetch = async (...args: Parameters<typeof originalFetch>) => {
    fetchCalls++;
    return originalFetch(...args);
  };

  try {
    const res = await handleChat(request);
    assert.equal(res.status, 400, "must reject with 400 before dispatch");
    const body = (await res.json()) as { error?: { message?: string } };
    const msg = body?.error?.message || JSON.stringify(body);
    assert.match(msg, /image-generation model/i);
    assert.match(msg, /\/v1\/images\/generations/);
    assert.equal(fetchCalls, 0, "must not dispatch upstream for an image-only model");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("POST /v1/chat/completions with a chat model still reaches routing (guard is invisible)", async () => {
  const request = buildRequest({
    body: {
      model: "openai/gpt-4o",
      messages: [{ role: "user", content: "hi" }],
    },
  });

  const res = await handleChat(request);
  // The guard must not fire on a chat model — the response is whatever downstream
  // routing produces (typically a credentials/connection error in the harness).
  // The critical assertion is: it is NOT the image-guard 400.
  if (res.status === 400) {
    const body = (await res.json()) as { error?: { message?: string } };
    const msg = body?.error?.message || JSON.stringify(body);
    assert.doesNotMatch(msg, /image-generation model/i, "chat model must not trip the image guard");
  }
});

test("POST /v1/chat/completions allows a model registered for both chat and image generation", async () => {
  const request = buildRequest({
    body: {
      model: "codex/gpt-5.6-sol",
      messages: [{ role: "user", content: "hi" }],
    },
  });

  const res = await handleChat(request);
  if (res.status === 400) {
    const body = (await res.json()) as { error?: { message?: string } };
    const msg = body?.error?.message || JSON.stringify(body);
    assert.doesNotMatch(
      msg,
      /image-generation model/i,
      "a model present in the chat catalog must not trip the image-only guard"
    );
  }
});
