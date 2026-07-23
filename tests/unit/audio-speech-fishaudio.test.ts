import test from "node:test";
import assert from "node:assert/strict";

const { handleAudioSpeech } = await import("../../open-sse/handlers/audioSpeech.ts");

test("handleAudioSpeech maps Fish Audio headers and body, and passes audio through", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (_url, options = {}) => {
    captured = {
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };
    return new Response(new Uint8Array([7, 8, 9]), {
      status: 200,
      headers: { "content-type": "audio/mpeg" },
    });
  };

  try {
    const response = await handleAudioSpeech({
      body: {
        model: "fishaudio/s1",
        input: "hi",
        voice: "ref-123",
        response_format: "mp3",
        speed: 1.2,
      },
      credentials: { apiKey: "fk" },
    });

    assert.equal(captured.headers.Authorization, "Bearer fk");
    assert.equal(captured.headers.model, "s1");
    assert.deepEqual(captured.body, {
      text: "hi",
      format: "mp3",
      reference_id: "ref-123",
      prosody: { speed: 1.2 },
    });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "audio/mpeg");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioSpeech surfaces sanitized Fish Audio upstream errors (not a raw stack)", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: { message: "invalid reference_id" } }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });

  try {
    const response = await handleAudioSpeech({
      body: {
        model: "fishaudio/s1",
        input: "hi",
        voice: "bad-ref",
      },
      credentials: { apiKey: "fk" },
    });
    const payload = (await response.json()) as { error: { message: string } };

    assert.equal(response.status, 400);
    assert.equal(payload.error.message, "invalid reference_id");
    assert.equal(payload.error.message.includes("at /"), false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioSpeech requires credentials for Fish Audio", async () => {
  const response = await handleAudioSpeech({
    body: {
      model: "fishaudio/s1",
      input: "hi",
    },
    credentials: null,
  });
  const payload = (await response.json()) as { error: { message: string } };

  assert.equal(response.status, 401);
  assert.equal(payload.error.message, "No credentials for speech provider: fishaudio");
});
