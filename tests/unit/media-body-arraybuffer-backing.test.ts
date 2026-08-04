import assert from "node:assert/strict";
import test from "node:test";

import { pcmToWav } from "../../open-sse/executors/vertexMedia.ts";
import { synthesizeGtts } from "../../open-sse/executors/gtts.ts";
import { readPageResponseBody } from "../../open-sse/services/browserPool.ts";
import { fetchRemoteImage } from "@/shared/network/remoteImageFetch";

/**
 * Each producer below is handed straight to a Web API that only accepts an
 * `ArrayBuffer`-backed view — `new Response(body)` (BodyInit) or
 * `new Blob([part])` (BlobPart). A `Buffer` / `Uint8Array` written without its
 * type argument widens to `ArrayBufferLike`, which also admits
 * `SharedArrayBuffer` and is therefore rejected at that boundary.
 *
 * The existing tests for these functions assert their *contents* — the RIFF
 * header, the concatenated chunks, the decoded base64. None assert the backing,
 * which is the single property the narrowed return types exist to guarantee and
 * the one a plausible refactor to a shared or pooled allocation would break.
 *
 * So each case asserts both: the backing itself, and that the value really is
 * accepted by the Web API it is passed to in production.
 */

test("pcmToWav returns an ArrayBuffer-backed WAV that new Response accepts", () => {
  const wav = pcmToWav(Buffer.from([0x01, 0x02, 0x03, 0x04]), 24000);

  assert.ok(wav.buffer instanceof ArrayBuffer, "WAV buffer must not be SharedArrayBuffer-backed");
  // open-sse/handlers/audioSpeech.ts hands this to `new Response(audio, …)`.
  assert.doesNotThrow(() => new Response(wav));
});

test("synthesizeGtts returns an ArrayBuffer-backed buffer that new Response accepts", async () => {
  // Same batchexecute envelope shape gtts-provider.test.ts builds; "aGk=" is
  // base64 for "hi".
  const inner = JSON.stringify(["aGk=", null, null, null, null, null, []]);
  const outer = JSON.stringify([["wrb.fr", "jQ1olc", inner, null, null, null, "generic"]]);
  const fetchImpl = async () =>
    new Response(`)]}'\n\n${outer.length}\n${outer}\n`, { status: 200 });

  const audio = await synthesizeGtts({ text: "hi", lang: "en" }, fetchImpl);

  assert.ok(audio.buffer instanceof ArrayBuffer, "gTTS audio must not be SharedArrayBuffer-backed");
  assert.doesNotThrow(() => new Response(audio));
});

test("fetchRemoteImage returns an ArrayBuffer-backed buffer that new Blob accepts", async () => {
  const result = await fetchRemoteImage("https://cdn.example.com/image.png", {
    fetchImpl: async () =>
      new Response(new Uint8Array([1, 2, 3]), {
        status: 200,
        headers: { "content-type": "image/png" },
      }),
    guard: "public-only",
    lookup: async () => [{ address: "203.0.113.5", family: 4 }],
  });

  assert.ok(result.buffer.buffer instanceof ArrayBuffer, "image bytes must be ArrayBuffer-backed");
  // open-sse/handlers/imageGeneration.ts wraps this in `new Blob([…])` for the
  // Topaz multipart upload.
  assert.doesNotThrow(() => new Blob([result.buffer], { type: "image/png" }));
});

test("readPageResponseBody returns an ArrayBuffer-backed body", async () => {
  const fakeResponse = {
    status: () => 200,
    headers: () => ({ "content-type": "application/json" }),
    body: async () => Buffer.from('{"ok":true}'),
  };

  const captured = await readPageResponseBody(
    fakeResponse as unknown as Parameters<typeof readPageResponseBody>[0]
  );

  assert.equal(captured.status, 200);
  assert.equal(captured.body.toString(), '{"ok":true}');
  // browserBackedChat.ts assigns this into a `Buffer.alloc(0)`-seeded local
  // that it later returns as the response body.
  assert.ok(captured.body.buffer instanceof ArrayBuffer);
});
