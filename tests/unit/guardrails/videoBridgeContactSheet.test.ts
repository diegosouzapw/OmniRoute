import assert from "node:assert/strict";
import test from "node:test";

import sharp from "sharp";

import { describeVideoPart } from "../../../src/lib/guardrails/videoBridgeHelpers";
import { buildVideoContactSheet } from "../../../src/lib/guardrails/videoBridgeContactSheet";

async function frame(color: string, timestampSeconds: number) {
  const bytes = await sharp({
    create: { background: color, channels: 3, height: 24, width: 32 },
  })
    .jpeg()
    .toBuffer();
  return { dataUri: `data:image/jpeg;base64,${bytes.toString("base64")}`, timestampSeconds };
}

function decodeJpegDataUri(dataUri: string): Buffer {
  const prefix = "data:image/jpeg;base64,";
  assert.ok(dataUri.toLowerCase().startsWith(prefix), "expected a JPEG data URI");
  return Buffer.from(dataUri.slice(prefix.length), "base64");
}

test("builds a bounded contact sheet and preserves timestamp labels", async () => {
  const result = await buildVideoContactSheet([
    await frame("red", 1),
    await frame("green", 5),
    await frame("blue", 9),
  ]);

  assert.equal(result.used, true);
  assert.match(result.dataUri ?? "", /^data:image\/jpeg;base64,/);
  assert.deepEqual(result.timestamps, [1, 5, 9]);
  assert.equal(result.frames.length, 3);
});

test("renders a high-contrast timestamp label inside every contact-sheet cell", async () => {
  const result = await buildVideoContactSheet([
    await frame("white", 1),
    await frame("white", 65.25),
    await frame("white", 130.5),
    await frame("white", 600),
  ]);

  assert.equal(result.used, true);
  assert.equal(result.width, 1024);
  assert.equal(result.height, 1024);
  const { data, info } = await sharp(decodeJpegDataUri(result.dataUri ?? ""))
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  assert.equal(info.channels, 3);

  const tileSize = 512;
  const labelTop = 448;
  const labelBottom = 512;
  const labelFingerprints: string[] = [];
  for (let index = 0; index < 4; index++) {
    const tileLeft = (index % 2) * tileSize;
    const tileTop = Math.floor(index / 2) * tileSize;
    let darkPixels = 0;
    let lightPixels = 0;
    let contentLightPixels = 0;
    const labelBytes: number[] = [];

    for (let y = labelTop; y < labelBottom; y++) {
      for (let x = 0; x < tileSize; x++) {
        const offset = ((tileTop + y) * info.width + tileLeft + x) * info.channels;
        const luminance = (data[offset] + data[offset + 1] + data[offset + 2]) / 3;
        if (luminance < 48) darkPixels += 1;
        if (luminance > 208) lightPixels += 1;
        labelBytes.push(Math.round(luminance));
      }
    }
    for (let y = 128; y < 384; y++) {
      for (let x = 64; x < 448; x++) {
        const offset = ((tileTop + y) * info.width + tileLeft + x) * info.channels;
        const luminance = (data[offset] + data[offset + 1] + data[offset + 2]) / 3;
        if (luminance > 208) contentLightPixels += 1;
      }
    }

    assert.ok(darkPixels > tileSize * 48, `cell ${index} should have a dark label band`);
    assert.ok(lightPixels > 40, `cell ${index} should have light timestamp glyphs`);
    assert.ok(contentLightPixels > 90_000, `cell ${index} should preserve visible frame content`);
    labelFingerprints.push(Buffer.from(labelBytes).toString("base64"));
  }

  assert.equal(new Set(labelFingerprints).size, 4, "each timestamp should render a distinct label");
});

test("contact sheet falls back to individual frames when decoding fails", async () => {
  const frames = [{ dataUri: "data:image/jpeg;base64,QQ==", timestampSeconds: 2 }];
  const result = await buildVideoContactSheet(frames);
  assert.equal(result.used, false);
  assert.equal(result.fallbackReason, "CONTACT_SHEET_UNAVAILABLE");
  assert.deepEqual(result.frames, frames);
});

test("contact sheet falls back to individual frames when a frame exceeds the per-frame byte cap", async () => {
  const validJpegBytes = await sharp({
    create: { background: "red", channels: 3, height: 24, width: 32 },
  })
    .jpeg()
    .toBuffer();
  // A technically-decodable JPEG prefix followed by zero-filled padding past
  // VIDEO_FRAME_MAX_BYTES (4 MiB): without a pre-decode size guard, sharp decodes the
  // leading valid JPEG and ignores the trailing bytes after EOI, so an oversized frame
  // would otherwise sail through the contact-sheet path undetected (used: true).
  const oversizedBytes = Buffer.concat([validJpegBytes, Buffer.alloc(5 * 1024 * 1024, 0)]);
  const frames = [
    {
      dataUri: `data:image/jpeg;base64,${oversizedBytes.toString("base64")}`,
      timestampSeconds: 2,
    },
  ];
  const result = await buildVideoContactSheet(frames);
  assert.equal(result.used, false);
  assert.equal(result.fallbackReason, "CONTACT_SHEET_UNAVAILABLE");
  assert.deepEqual(result.frames, frames);
});

test("contact sheet respects the parent abort signal", async () => {
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(
    buildVideoContactSheet([await frame("red", 1)], { signal: controller.signal }),
    /aborted/i
  );
});

test("Video Bridge uses the sheet only when explicitly requested", async () => {
  const sourceFrames = [await frame("red", 1), await frame("blue", 5)];
  let captionCalls = 0;
  const result = await describeVideoPart(
    {
      container: "messages",
      contactSheet: true,
      messageIndex: 0,
      partIndex: 0,
      ref: "data:video/mp4;base64,AA==",
      shape: "data_uri_string",
    },
    { frameCount: 2, timeoutMs: 5000 },
    async () => {
      captionCalls += 1;
      return "combined scene";
    },
    {
      extractFrames: async () => ({ durationSeconds: 6, frames: sourceFrames }),
    }
  );

  assert.equal(captionCalls, 1);
  assert.equal(result.contactSheetUsed, true);
  assert.match(result.description, /contact-sheet\[timestamps=00:01\.000,00:05\.000\]/);
});
