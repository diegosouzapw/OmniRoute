import test from "node:test";
import assert from "node:assert/strict";

import { resolveCursorImages } from "../../open-sse/utils/cursorImages.ts";

// zai-web maps resolveCursorImages() output into browser-upload attachments
// whose mimeType is REQUIRED. EncodedImage.mimeType is optional on the wire
// type, so zai-web carries an `?? "image/jpeg"` fallback — this test pins the
// producer contract that makes the fallback dead code in practice: every
// image that reaches a browser upload must arrive with a concrete image/*
// mime string (decodeDataUrl / fetchImageBytes validate it before pushing).
const PIXEL_PNG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

test("resolveCursorImages (prepareForWire:false) always yields a concrete image/* mimeType", async () => {
  const images = await resolveCursorImages([PIXEL_PNG], { prepareForWire: false });
  assert.equal(images.length, 1);
  assert.equal(typeof images[0]!.mimeType, "string");
  assert.match(images[0]!.mimeType as string, /^image\//);
});
