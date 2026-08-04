// Port of decolua/9router#1043 by toanalien <toanalien@gmail.com>
// MiniMax T2A v2 returns hex-encoded audio in a JSON envelope guarded by `base_resp`.
import test from "node:test";
import assert from "node:assert/strict";

const { handleAudioSpeech } = await import("../../open-sse/handlers/audioSpeech.ts");

const TEXT = "hello minimax";
const HEX_AUDIO = "deadbeefcafe1234"; // 8 bytes; base64 = "3q2+78r+EjQ="

test("handleAudioSpeech routes MiniMax format to T2A v2 with hex output", async () => {
  const originalFetch = globalThis.fetch;
  let captured: any;

  globalThis.fetch = async (url: any, options: any = {}) => {
    captured = {
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };
    return new Response(
      JSON.stringify({
        data: { audio: HEX_AUDIO },
        base_resp: { status_code: 0, status_msg: "success" },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const response = await handleAudioSpeech({
      body: { model: "minimax/speech-2.8-hd", input: TEXT, voice: "English_expressive_narrator" },
      credentials: { apiKey: "mm-key" },
    });

    assert.equal(response.status, 200, "should 200 on success");
    assert.equal(captured.url, "https://api.minimax.io/v1/t2a_v2");
    assert.equal((captured.headers as any).Authorization, "Bearer mm-key");
    assert.equal(captured.body.model, "speech-2.8-hd");
    assert.equal(captured.body.text, TEXT);
    assert.equal(captured.body.stream, false);
    assert.equal(captured.body.output_format, "hex");
    assert.equal(captured.body.voice_setting.voice_id, "English_expressive_narrator");
    assert.ok(captured.body.audio_setting, "audio_setting present");

    const ct = response.headers.get("content-type") || "";
    assert.ok(ct.startsWith("audio/"), `content-type should be audio/*, got ${ct}`);

    const buf = new Uint8Array(await response.arrayBuffer());
    assert.deepEqual(
      Array.from(buf),
      [0xde, 0xad, 0xbe, 0xef, 0xca, 0xfe, 0x12, 0x34],
      "hex audio should be decoded to bytes"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioSpeech surfaces MiniMax base_resp error", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({ base_resp: { status_code: 2013, status_msg: "invalid voice" } }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  try {
    const response = await handleAudioSpeech({
      body: { model: "minimax/speech-2.8-hd", input: TEXT },
      credentials: { apiKey: "mm-key" },
    });
    assert.notEqual(response.status, 200, "non-zero base_resp.status_code must not be 200");
    const payload = (await response.json()) as any;
    assert.match(String(payload?.error?.message || ""), /invalid voice|MiniMax/i);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioSpeech rejects invalid hex audio from MiniMax", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        data: { audio: "zzznot-hex" },
        base_resp: { status_code: 0, status_msg: "" },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  try {
    const response = await handleAudioSpeech({
      body: { model: "minimax/speech-2.8-hd", input: TEXT },
      credentials: { apiKey: "mm-key" },
    });
    assert.notEqual(response.status, 200);
    const payload = (await response.json()) as any;
    assert.match(String(payload?.error?.message || ""), /invalid audio|MiniMax/i);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
