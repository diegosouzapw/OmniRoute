import test from "node:test";
import assert from "node:assert/strict";

const { buildMultipartBody } = await import("../../open-sse/handlers/audioTranscription.ts");

/**
 * `buildMultipartBody` is handed straight to `fetch` as the request body by six
 * call sites across `audioTranscription.ts` and `audioTranslation.ts`, so its
 * result must satisfy `BodyInit` — which requires an `ArrayBuffer`-backed view,
 * not merely "some Uint8Array". A `SharedArrayBuffer`-backed view, or a slice
 * into a shared pool, is not a valid request body.
 *
 * The four existing `buildMultipartBody` tests in
 * `audio-transcription-handler.test.ts` decode the payload and assert its
 * *contents* (boundary, filename sanitization, MIME fallback). None of them
 * assert the backing, which is the property the declared
 * `Uint8Array<ArrayBuffer>` return type exists to guarantee — and the one a
 * plausible "optimization" to a pooled `Buffer.concat` would break.
 */

function audioFile(name = "clip.wav", type = "audio/wav") {
  return Object.assign(new Blob([new Uint8Array([1, 2, 3, 4])], { type }), { name });
}

test("the assembled body is backed by a plain ArrayBuffer, never a shared one", async () => {
  const { body } = await buildMultipartBody(audioFile(), { model: "whisper-1" });

  assert.ok(body instanceof Uint8Array);
  assert.ok(
    body.buffer instanceof ArrayBuffer,
    "a SharedArrayBuffer-backed view is not accepted as a fetch BodyInit"
  );
});

test("the assembled body owns its whole buffer — not a view into a shared pool", async () => {
  const { body } = await buildMultipartBody(audioFile(), { model: "whisper-1" });

  // `new Uint8Array(totalLength)` allocates exclusively. A pooled allocation
  // (e.g. switching to Buffer.concat) would leave a non-zero byteOffset and a
  // buffer larger than the payload, so the bytes handed to fetch would no
  // longer be the whole buffer.
  assert.equal(body.byteOffset, 0, "body must start at offset 0 of its own buffer");
  assert.equal(
    body.byteLength,
    body.buffer.byteLength,
    "body must span its entire buffer, with no pooled remainder"
  );
});

test("the backing holds for a larger payload than a single pool slab", async () => {
  // 64 KiB — comfortably past Node's 8 KiB Buffer pool threshold, so a pooled
  // implementation would behave differently here than for the small case above.
  const big = Object.assign(new Blob([new Uint8Array(64 * 1024)], { type: "audio/wav" }), {
    name: "big.wav",
  });
  const { body } = await buildMultipartBody(big, { model: "whisper-1" });

  assert.ok(body.buffer instanceof ArrayBuffer);
  assert.equal(body.byteOffset, 0);
  assert.equal(body.byteLength, body.buffer.byteLength);
  assert.ok(body.byteLength > 64 * 1024, "payload carries the file plus the multipart envelope");
});
