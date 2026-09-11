import assert from "node:assert/strict";
import test from "node:test";

import {
  JPEG_FRAME_DATA_URI_PREFIX,
  decodeJpegFrameDataUri,
  estimateJpegFrameBytes,
} from "../../../src/lib/guardrails/videoBridgeFrameContract";

test("decodes a valid JPEG data URI case-insensitively", () => {
  const bytes = Buffer.from("abc");
  const uri = `data:image/JPEG;base64,${bytes.toString("base64")}`;
  assert.deepEqual(decodeJpegFrameDataUri(uri), bytes);
  assert.equal(JPEG_FRAME_DATA_URI_PREFIX, "data:image/jpeg;base64,");
});

test("rejects non-JPEG and malformed URIs with a stable message", () => {
  for (const bad of [
    "data:image/png;base64,QQ==",
    "data:image/jpeg;base64,@@invalid@@",
    "data:image/jpeg,plain",
    "https://example.com/frame.jpg",
    "",
  ]) {
    assert.throws(() => decodeJpegFrameDataUri(bad), /not a JPEG data URI/i);
    assert.throws(() => estimateJpegFrameBytes(bad), /not a JPEG data URI/i);
  }
});

test("estimates decoded bytes without decoding, accounting for padding", () => {
  for (const source of ["a", "ab", "abc", "abcd", "x".repeat(3000)]) {
    const uri = `data:image/jpeg;base64,${Buffer.from(source).toString("base64")}`;
    assert.equal(estimateJpegFrameBytes(uri), Buffer.byteLength(source));
  }
});
