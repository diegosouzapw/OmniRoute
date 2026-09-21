import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

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

test("never estimates below zero for degenerate padding-only payloads (#12323)", () => {
  // The charset-only pattern admits these; the estimate must clamp instead of going to -1.
  for (const encoded of ["=", "==", "A=", "A=="]) {
    const uri = `${JPEG_FRAME_DATA_URI_PREFIX}${encoded}`;
    const estimate = estimateJpegFrameBytes(uri);
    assert.ok(estimate >= 0, `${JSON.stringify(encoded)} estimated ${estimate}`);
    assert.ok(
      estimate >= decodeJpegFrameDataUri(uri).byteLength,
      `${JSON.stringify(encoded)} estimate is not an upper bound`
    );
  }
  assert.equal(estimateJpegFrameBytes(`${JPEG_FRAME_DATA_URI_PREFIX}=`), 0);
  assert.equal(estimateJpegFrameBytes(`${JPEG_FRAME_DATA_URI_PREFIX}==`), 0);
});

test("encode sites build frame data URIs from JPEG_FRAME_DATA_URI_PREFIX (#12323)", () => {
  const guardrailsDir = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../../../src/lib/guardrails"
  );
  for (const file of [
    "videoBridgeContactSheet.ts",
    "videoBridgeRuntime.ts",
    "videoBridgeDrilldownLifecycle.ts",
  ]) {
    const source = fs.readFileSync(path.join(guardrailsDir, file), "utf8");
    assert.doesNotMatch(source, /data:image\/jpeg;base64,/, `${file} hardcodes the JPEG prefix`);
    assert.match(
      source,
      /\bJPEG_FRAME_DATA_URI_PREFIX\b/,
      `${file} does not use the shared prefix`
    );
  }
});
