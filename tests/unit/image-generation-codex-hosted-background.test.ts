import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-codex-bg-"));

const core = await import("../../src/lib/db/core.ts");
const { handleImageGeneration, shrinkCodexReferenceImage } =
  await import("../../open-sse/handlers/imageGeneration.ts");

test.after(() => {
  core.resetDbInstance();
});

function buildCodexSSE(items) {
  const frames = items.map((item) => JSON.stringify({ type: "response.output_item.done", item }));
  return frames.map((frame) => `event: response.output_item.done\ndata: ${frame}\n`).join("\n");
}

test("handleImageGeneration (codex) forwards background to the hosted image tool", async () => {
  const originalFetch = globalThis.fetch;
  let captured;
  globalThis.fetch = async (_url, options = {}) => {
    captured = JSON.parse(String(options.body || "{}"));
    const sse = buildCodexSSE([
      { type: "image_generation_call", id: "ig_1", status: "completed", result: "YWJj" },
    ]);
    return new Response(sse, { status: 200 });
  };

  try {
    await handleImageGeneration({
      body: { model: "codex/gpt-5.6-terra-image", prompt: "logo", background: "transparent" },
      credentials: { accessToken: "codex-token" },
      log: null,
    });
    assert.equal(captured.tools[0].background, "transparent");

    await handleImageGeneration({
      body: { model: "codex/gpt-5.6-terra-image", prompt: "logo", background: "  " },
      credentials: { accessToken: "codex-token" },
      log: null,
    });
    assert.equal("background" in captured.tools[0], false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("shrinkCodexReferenceImage keeps small references and downscales large ones", async () => {
  const { default: sharp } = await import("sharp");

  const small = Buffer.from("tiny-reference");
  const kept = await shrinkCodexReferenceImage({ bytes: small, mime: "image/png" });
  assert.equal(kept.bytes, small);
  assert.equal(kept.mime, "image/png");

  // Random pixels do not compress, so this PNG is well above the 400 KB threshold.
  const side = 1600;
  const { randomBytes } = await import("node:crypto");
  const noise = randomBytes(side * side * 3);
  const large = await sharp(noise, { raw: { width: side, height: side, channels: 3 } })
    .png()
    .toBuffer();
  assert.ok(large.length > 400_000, `fixture should exceed 400 KB, got ${large.length}`);

  const shrunk = await shrinkCodexReferenceImage({ bytes: large, mime: "image/png" });
  const meta = await sharp(shrunk.bytes).metadata();
  assert.ok(Math.max(meta.width ?? 0, meta.height ?? 0) <= 1024);
  assert.ok(shrunk.bytes.length < large.length);
  assert.equal(shrunk.mime, "image/png");
});
