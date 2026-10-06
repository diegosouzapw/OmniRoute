import test from "node:test";
import assert from "node:assert/strict";

const { buildMultipartBody } = await import("../../open-sse/handlers/audioTranscription.ts");
const { resolveOpenRouterAudioFormat } = await import(
  "../../open-sse/handlers/openrouterTranscription.ts"
);

/**
 * `.opus` is Opus audio in an Ogg container (RFC 7845) — byte-identical to what
 * a client would name `.ogg`. Whisper-compatible upstreams select the decoder
 * from the multipart *filename* against an allow-list
 * (`flac, m4a, mp3, mp4, mpeg, mpga, oga, ogg, wav, webm`) that has no `opus`,
 * so `note.opus` used to 400 while the same bytes as `note.ogg` transcribed
 * fine. `/v1/audio/speech` emits `audio/opus` for `response_format=opus`, so
 * clients re-uploading their own voice notes hit it constantly (#10588).
 */

function audioFile(name: string, type = "") {
  return Object.assign(new Blob([new Uint8Array([1, 2, 3, 4])], { type }), { name });
}

function filenameIn(body: Uint8Array): string {
  const header = new TextDecoder().decode(body);
  return /filename="([^"]*)"/.exec(header)?.[1] ?? "";
}

test("a .opus upload is announced to the upstream as .ogg", async () => {
  const { body } = await buildMultipartBody(audioFile("note.opus", "audio/opus"), {
    model: "whisper-1",
  });

  assert.equal(filenameIn(body), "note.ogg");
});

test("the rewrite is case-insensitive and keeps the rest of the name intact", async () => {
  const { body } = await buildMultipartBody(audioFile("Voice Note 2026.OPUS"), {
    model: "whisper-1",
  });

  assert.equal(filenameIn(body), "Voice Note 2026.ogg");
});

test("only a trailing .opus is rewritten — not one mid-name", async () => {
  // `opus` appearing anywhere else is part of the name, not the container.
  const { body } = await buildMultipartBody(audioFile("opus-demo.wav"), { model: "whisper-1" });
  assert.equal(filenameIn(body), "opus-demo.wav");

  const nested = await buildMultipartBody(audioFile("take.opus.mp3"), { model: "whisper-1" });
  assert.equal(filenameIn(nested.body), "take.opus.mp3");
});

test("other extensions are forwarded unchanged", async () => {
  for (const name of ["note.ogg", "note.mp3", "note.wav", "note.webm"]) {
    const { body } = await buildMultipartBody(audioFile(name), { model: "whisper-1" });
    assert.equal(filenameIn(body), name);
  }
});

test("a nameless blob still falls back to audio.wav", async () => {
  const blob = new Blob([new Uint8Array([1, 2, 3, 4])], { type: "audio/wav" });
  const { body } = await buildMultipartBody(blob as Blob & { name?: unknown }, {
    model: "whisper-1",
  });

  assert.equal(filenameIn(body), "audio.wav");
});

/**
 * The OpenRouter STT endpoint takes the container as a JSON field rather than a
 * filename. `.opus` matched neither its extension list nor its MIME map, so it
 * fell through to the `"wav"` default — announcing Opus bytes as WAV.
 */
test("OpenRouter STT resolves .opus to its ogg container, not the wav default", () => {
  assert.equal(resolveOpenRouterAudioFormat(audioFile("note.opus")), "ogg");
  assert.equal(resolveOpenRouterAudioFormat(audioFile("note.OPUS")), "ogg");
});

test("OpenRouter STT resolves an audio/opus MIME to ogg", () => {
  assert.equal(resolveOpenRouterAudioFormat(audioFile("blob", "audio/opus")), "ogg");
});

test("OpenRouter STT still resolves the formats it already supported", () => {
  assert.equal(resolveOpenRouterAudioFormat(audioFile("a.ogg")), "ogg");
  assert.equal(resolveOpenRouterAudioFormat(audioFile("a.mp3")), "mp3");
  assert.equal(resolveOpenRouterAudioFormat(audioFile("blob", "audio/webm;codecs=opus")), "webm");
  assert.equal(resolveOpenRouterAudioFormat(audioFile("mystery.xyz")), "wav");
});
