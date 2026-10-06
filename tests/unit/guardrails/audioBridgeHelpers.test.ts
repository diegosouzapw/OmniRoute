import assert from "node:assert/strict";
import test from "node:test";

import {
  callAudioTranscription,
  callAudioTranscriptionTimed,
  extractAudioParts,
  replaceAudioParts,
  selectAudioBridgeModel,
  type AudioPart,
} from "../../../src/lib/guardrails/audioBridgeHelpers.ts";

function assertMultipartFile(
  init: RequestInit | undefined,
  expectedFileName: string,
  expectedMime: string,
  expectedBytes: Buffer
): void {
  const contentType = new Headers(init?.headers).get("content-type");
  assert.match(contentType ?? "", /^multipart\/form-data; boundary=/);
  const boundary = contentType?.split("boundary=", 2)[1];
  assert.ok(boundary);
  assert.ok(Buffer.isBuffer(init?.body));
  const body = init?.body as Buffer;
  assert.ok(
    body.includes(
      Buffer.concat([
        Buffer.from(
          `--${boundary}\r\n` +
            `Content-Disposition: form-data; name="file"; filename="${expectedFileName}"\r\n` +
            `Content-Type: ${expectedMime}\r\n\r\n`
        ),
        expectedBytes,
        Buffer.from("\r\n"),
      ])
    )
  );
}

test("fixed STT model is honored when its credential is usable", async () => {
  const checked: string[] = [];
  const selected = await selectAudioBridgeModel("deepgram/nova-2", async (model) => {
    checked.push(model);
    return true;
  });

  assert.equal(selected, "deepgram/nova-2");
  assert.deepEqual(checked, ["deepgram/nova-2"]);
});

test("fixed STT model is rejected when its credential is unavailable", async () => {
  assert.equal(await selectAudioBridgeModel("deepgram/nova-2", async () => false), null);
});

test("auto selects the first catalog STT model with a usable credential", async () => {
  const selected = await selectAudioBridgeModel(
    "auto",
    async (model) => model === "deepgram/nova-3"
  );

  assert.equal(selected, "deepgram/nova-3");
});

test("input_audio is posted as multipart to the authenticated transcription self-loop", async () => {
  let capturedUrl = "";
  let capturedInit: RequestInit | undefined;
  const part: AudioPart = {
    messageIndex: 0,
    partIndex: 0,
    ref: Buffer.from("RIFF test audio").toString("base64"),
    shape: "input_audio",
    format: "wav",
  };

  const transcript = await callAudioTranscription(
    part,
    { model: "deepgram/nova-3", timeoutMs: 1_000 },
    {
      fetchImpl: async (input, init) => {
        capturedUrl = String(input);
        capturedInit = init;
        return Response.json({ text: "hello from audio" });
      },
      getPort: () => 3210,
      getBearer: () => "internal-test-key",
    }
  );

  assert.equal(transcript, "hello from audio");
  assert.equal(capturedUrl, "http://localhost:3210/v1/audio/transcriptions");
  assert.equal(capturedInit?.method, "POST");
  assert.equal(new Headers(capturedInit?.headers).get("authorization"), "Bearer internal-test-key");
  const contentType = new Headers(capturedInit?.headers).get("content-type");
  const boundary = contentType?.split("boundary=", 2)[1];
  assert.ok(boundary);
  assertMultipartFile(capturedInit, "audio.wav", "audio/wav", Buffer.from("RIFF test audio"));
  const body = capturedInit?.body as Buffer;
  assert.ok(
    body.includes(
      Buffer.from(
        `--${boundary}\r\n` +
          'Content-Disposition: form-data; name="model"\r\n\r\n' +
          `deepgram/nova-3\r\n--${boundary}--\r\n`
      )
    )
  );
});

test("audio extraction and replacement cover the full history without dropping failed clips", () => {
  const body = {
    model: "text-only/model",
    messages: [
      {
        role: "user",
        content: [
          { type: "input_audio", input_audio: { data: "UklGRg==", format: "wav" } },
          { type: "text", text: "first" },
        ],
      },
      {
        role: "user",
        content: [
          { type: "audio_url", audio_url: { url: "data:audio/mpeg;base64,SUQz" } },
          { source: { media_type: "audio/ogg", data: "T2dnUw==" } },
          {
            type: "text",
            nested: { type: "input_audio", input_audio: { data: "bmVzdGVk", format: "wav" } },
          },
        ],
      },
    ],
  };

  const parts = extractAudioParts(body.messages);
  assert.deepEqual(
    parts.map(({ messageIndex, partIndex, shape, format }) => ({
      messageIndex,
      partIndex,
      shape,
      format,
    })),
    [
      { messageIndex: 0, partIndex: 0, shape: "input_audio", format: "wav" },
      { messageIndex: 1, partIndex: 0, shape: "audio_url", format: "mp3" },
      { messageIndex: 1, partIndex: 1, shape: "audio_source", format: "ogg" },
    ]
  );

  const replaced = replaceAudioParts(body, parts, ["[Audio 1]: hello", null, "[Audio 3]: bye"]);
  assert.deepEqual(replaced.messages[0].content[0], { type: "text", text: "[Audio 1]: hello" });
  assert.deepEqual(
    replaced.messages[1].content[0],
    body.messages[1].content[0],
    "a failed transcription must preserve the original audio part"
  );
  assert.deepEqual(replaced.messages[1].content[1], { type: "text", text: "[Audio 3]: bye" });
  assert.deepEqual(
    replaced.messages[1].content[2],
    body.messages[1].content[2],
    "nested audio is not a spliceable top-level part"
  );
});

test("audio_url data URIs are decoded before multipart upload", async () => {
  let uploaded: RequestInit | undefined;
  await callAudioTranscription(
    {
      messageIndex: 0,
      partIndex: 0,
      ref: "data:audio/mpeg;base64,SUQz",
      shape: "audio_url",
      format: "mp3",
    },
    { model: "deepgram/nova-3", timeoutMs: 1_000 },
    {
      fetchImpl: async (_input, init) => {
        uploaded = init;
        return Response.json({ text: "ok" });
      },
      getPort: () => 3210,
      getBearer: () => "internal-test-key",
    }
  );

  assertMultipartFile(uploaded, "audio.mp3", "audio/mpeg", Buffer.from("ID3"));
});

test("remote audio_url uses the guarded remote fetch before self-loop upload", async () => {
  let fetchedUrl = "";
  let uploaded: RequestInit | undefined;
  await callAudioTranscription(
    {
      messageIndex: 0,
      partIndex: 0,
      ref: "https://media.example.test/clip.ogg",
      shape: "audio_url",
      format: "ogg",
    },
    { model: "deepgram/nova-3", timeoutMs: 1_000 },
    {
      fetchRemote: async (url) => {
        fetchedUrl = url;
        return {
          buffer: Buffer.from("OggS remote audio"),
          contentType: "audio/ogg",
          url,
        };
      },
      fetchImpl: async (_input, init) => {
        uploaded = init;
        return Response.json({ text: "ok" });
      },
      getPort: () => 3210,
      getBearer: () => "internal-test-key",
    }
  );

  assert.equal(fetchedUrl, "https://media.example.test/clip.ogg");
  assertMultipartFile(uploaded, "audio.ogg", "audio/ogg", Buffer.from("OggS remote audio"));
});

test("timed transcription requests verbose_json and preserves provider-supplied segment timing", async () => {
  let uploaded: RequestInit | undefined;
  const result = await callAudioTranscriptionTimed(
    {
      messageIndex: 0,
      partIndex: 0,
      ref: Buffer.from("RIFF timed audio").toString("base64"),
      shape: "input_audio",
      format: "wav",
    },
    { model: "deepgram/nova-3", timeoutMs: 1_000 },
    {
      fetchImpl: async (_input, init) => {
        uploaded = init;
        return Response.json({
          text: "hello world",
          segments: [
            { start: 0, end: 1.2, text: "hello", confidence: 0.95 },
            { start: 1.2, end: 2.4, text: "world" },
          ],
        });
      },
      getPort: () => 3210,
      getBearer: () => "internal-test-key",
    }
  );

  const contentType = new Headers(uploaded?.headers).get("content-type");
  const boundary = contentType?.split("boundary=", 2)[1];
  const body = uploaded?.body as Buffer;
  assert.ok(
    body.includes(
      Buffer.from(
        `--${boundary}\r\n` +
          'Content-Disposition: form-data; name="response_format"\r\n\r\n' +
          `verbose_json\r\n`
      )
    ),
    "verbose_json must be requested from the same transcription boundary"
  );
  assert.equal(result.text, "hello world");
  assert.deepEqual(result.segments, [
    { startSeconds: 0, endSeconds: 1.2, text: "hello", confidence: 0.95 },
    { startSeconds: 1.2, endSeconds: 2.4, text: "world" },
  ]);
});

test("timed transcription reports no segments when the provider ignores verbose_json", async () => {
  const result = await callAudioTranscriptionTimed(
    {
      messageIndex: 0,
      partIndex: 0,
      ref: Buffer.from("RIFF coarse audio").toString("base64"),
      shape: "input_audio",
      format: "wav",
    },
    { model: "deepgram/nova-3", timeoutMs: 1_000 },
    {
      fetchImpl: async () => Response.json({ text: "coarse only" }),
      getPort: () => 3210,
      getBearer: () => "internal-test-key",
    }
  );

  assert.equal(result.text, "coarse only");
  assert.equal(result.segments, undefined);
});

test("timed transcription drops malformed provider segments instead of trusting them", async () => {
  const result = await callAudioTranscriptionTimed(
    {
      messageIndex: 0,
      partIndex: 0,
      ref: Buffer.from("RIFF bad segments").toString("base64"),
      shape: "input_audio",
      format: "wav",
    },
    { model: "deepgram/nova-3", timeoutMs: 1_000 },
    {
      fetchImpl: async () =>
        Response.json({
          text: "text",
          segments: [
            { start: 5, end: 2, text: "backwards" },
            { start: 0, end: 1, text: "" },
            { start: "nope", end: 1, text: "not a number" },
          ],
        }),
      getPort: () => 3210,
      getBearer: () => "internal-test-key",
    }
  );

  assert.equal(result.segments, undefined);
});
