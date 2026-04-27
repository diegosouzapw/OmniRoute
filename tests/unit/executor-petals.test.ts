import test from "node:test";
import assert from "node:assert/strict";

import { getExecutor, hasSpecializedExecutor } from "../../open-sse/executors/index.ts";
import { PetalsExecutor } from "../../open-sse/executors/petals.ts";

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test("PetalsExecutor is registered in the executor index", () => {
  assert.equal(hasSpecializedExecutor("petals"), true);
  assert.ok(getExecutor("petals") instanceof PetalsExecutor);
});

test("PetalsExecutor converts OpenAI messages into form data and wraps JSON responses", async () => {
  const executor = new PetalsExecutor();
  const originalFetch = globalThis.fetch;
  const calls: Array<{
    url: string;
    body: URLSearchParams;
    headers: Record<string, string>;
  }> = [];

  globalThis.fetch = async (url, init = {}) => {
    calls.push({
      url: String(url),
      body: new URLSearchParams(String(init.body || "")),
      headers: init.headers as Record<string, string>,
    });

    return jsonResponse({
      ok: true,
      outputs: "Hi back from Petals.",
    });
  };

  try {
    const result = await executor.execute({
      model: "stabilityai/StableBeluga2",
      body: {
        messages: [
          { role: "system", content: "You are concise." },
          { role: "user", content: "Hello" },
          { role: "assistant", content: "Hi there!" },
          { role: "user", content: "How are you?" },
        ],
        max_tokens: 32,
        temperature: 0.7,
        top_p: 0.9,
      },
      stream: false,
      credentials: { apiKey: "" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });

    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, "https://chat.petals.dev/api/v1/generate");
    assert.equal(calls[0].headers.Authorization, undefined);
    assert.equal(calls[0].headers["Content-Type"], "application/x-www-form-urlencoded");
    assert.equal(calls[0].body.get("model"), "stabilityai/StableBeluga2");
    assert.equal(calls[0].body.get("max_new_tokens"), "32");
    assert.equal(calls[0].body.get("temperature"), "0.7");
    assert.equal(calls[0].body.get("top_p"), "0.9");
    assert.match(
      calls[0].body.get("inputs") || "",
      /System:\nYou are concise\.\n\nUser: Hello\n\nAssistant: Hi there!\n\nUser: How are you\?\n\nAssistant:/
    );

    assert.deepEqual(result.transformedBody, {
      model: "stabilityai/StableBeluga2",
      inputs:
        "System:\nYou are concise.\n\nUser: Hello\n\nAssistant: Hi there!\n\nUser: How are you?\n\nAssistant:",
      max_new_tokens: "32",
      do_sample: "1",
      temperature: "0.7",
      top_p: "0.9",
    });

    const body = (await result.response.json()) as any;
    assert.equal(body.object, "chat.completion");
    assert.equal(body.choices[0].message.role, "assistant");
    assert.equal(body.choices[0].message.content, "Hi back from Petals.");
    assert.equal(body.model, "stabilityai/StableBeluga2");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("PetalsExecutor synthesizes OpenAI-compatible SSE responses for streaming requests", async () => {
  const executor = new PetalsExecutor();
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    jsonResponse({
      ok: true,
      outputs: "Petals stream output",
    });

  try {
    const result = await executor.execute({
      model: "stabilityai/StableBeluga2",
      body: {
        messages: [{ role: "user", content: "Say hello" }],
      },
      stream: true,
      credentials: { apiKey: "" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });

    assert.equal(result.response.headers.get("Content-Type"), "text/event-stream");
    const text = await result.response.text();
    assert.match(text, /data: \{\"id\":\"chatcmpl-petals-/);
    assert.match(text, /Petals stream output/);
    assert.match(text, /data: \[DONE\]/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("PetalsExecutor maps upstream failures to OpenAI-style errors", async () => {
  const executor = new PetalsExecutor();
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => jsonResponse({ ok: false, traceback: "petals exploded" }, 200);

  try {
    const result = await executor.execute({
      model: "stabilityai/StableBeluga2",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });

    assert.equal(result.response.status, 502);
    const body = (await result.response.json()) as any;
    assert.match(body.error.message, /Petals API error: petals exploded/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
