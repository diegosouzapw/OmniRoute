import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeImageBuffer, normalizeDataUri } from "../../../open-sse/utils/imageNormalize.ts";

test("passthrough when input is not a decodable image (sharp absent or garbage bytes)", async () => {
  const junk = Buffer.from("not-an-image");
  const out = await normalizeImageBuffer(junk);
  assert.equal(out.resized, false);
  assert.ok(out.buffer.equals(junk));
});

test("normalizeDataUri never throws and preserves the uri on failure", async () => {
  const uri = "data:image/png;base64,%%%broken%%%";
  assert.equal(await normalizeDataUri(uri), uri);
});

// Só roda quando sharp estiver instalado (optionalDependency presente no devbox):
test("downscales a large PNG to the long-edge cap when sharp is available", async (t) => {
  let sharp: typeof import("sharp");
  try {
    sharp = (await import("sharp")).default as never;
  } catch {
    t.skip("sharp not installed");
    return;
  }
  const big = await sharp({ create: { width: 4096, height: 100, channels: 3, background: "#fff" } })
    .png()
    .toBuffer();
  const out = await normalizeImageBuffer(big, { maxLongEdge: 2048 });
  assert.equal(out.resized, true);
  const meta = await sharp(out.buffer).metadata();
  assert.equal(meta.width, 2048);
});

test("downscales a height-dominant PNG to the long-edge cap on the height axis", async (t) => {
  let sharp: typeof import("sharp");
  try {
    sharp = (await import("sharp")).default as never;
  } catch {
    t.skip("sharp not installed");
    return;
  }
  const tall = await sharp({
    create: { width: 100, height: 4096, channels: 3, background: "#fff" },
  })
    .png()
    .toBuffer();
  const out = await normalizeImageBuffer(tall, { maxLongEdge: 2048 });
  assert.equal(out.resized, true);
  const meta = await sharp(out.buffer).metadata();
  assert.equal(meta.height, 2048);
});
