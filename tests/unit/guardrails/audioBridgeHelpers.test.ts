import assert from "node:assert/strict";
import test from "node:test";

import {
  callAudioTranscription,
  extractAudioParts,
  replaceAudioParts,
  selectAudioBridgeModel,
  type AudioPart,
} from "../../../src/lib/guardrails/audioBridgeHelpers.ts";

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

  const form = capturedInit?.body as FormData;
  assert.equal(form.get("model"), "deepgram/nova-3");
  const file = form.get("file") as File;
  assert.equal(file.name, "audio.wav");
  assert.equal(file.type, "audio/wav");
  assert.equal(Buffer.from(await file.arrayBuffer()).toString(), "RIFF test audio");
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
  let uploaded: File | null = null;
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
        uploaded = (init?.body as FormData).get("file") as File;
        return Response.json({ text: "ok" });
      },
      getPort: () => 3210,
      getBearer: () => "internal-test-key",
    }
  );

  assert.ok(uploaded);
  assert.equal(uploaded.type, "audio/mpeg");
  assert.equal(Buffer.from(await uploaded.arrayBuffer()).toString(), "ID3");
});

test("remote audio_url uses the guarded remote fetch before self-loop upload", async () => {
  let fetchedUrl = "";
  let uploaded: File | null = null;
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
        uploaded = (init?.body as FormData).get("file") as File;
        return Response.json({ text: "ok" });
      },
      getPort: () => 3210,
      getBearer: () => "internal-test-key",
    }
  );

  assert.equal(fetchedUrl, "https://media.example.test/clip.ogg");
  assert.ok(uploaded);
  assert.equal(Buffer.from(await uploaded.arrayBuffer()).toString(), "OggS remote audio");
});
