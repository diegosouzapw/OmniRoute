/**
 * Task B2: the vision bridge self-loop fetches a remote image and hands it
 * to the vision model as a data URI (`fetchRemoteImageAsDataUri`,
 * `src/lib/guardrails/visionBridgeHelpers.ts`). That fetched image must be
 * normalized (long-edge cap 2048, `@omniroute/open-sse/utils/imageNormalize`)
 * before being embedded — the same treatment `normalizeDataUri` already
 * gives any other image, now applied to remote fetches performed by the
 * bridge itself. Scope: ONLY this self-call path, never the user's raw
 * passthrough payload (HR#20 opt-in principle).
 *
 * `ensureBase64ImagesForClaudeWire` is the exported entry point that reaches
 * the private `fetchRemoteImageAsDataUri` — it resolves every non-data-URI
 * image part of a claude-wire-format request via that same fetch helper, so
 * it is the smallest public surface to exercise the fetch → normalize path
 * with dependency-injected `fetchImpl` (mirrors the DI pattern used by
 * `tests/unit/vision-bridge-describe-cache.test.ts` and
 * `tests/unit/remote-image-fetch.test.ts`).
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { ensureBase64ImagesForClaudeWire } from "../../../src/lib/guardrails/visionBridgeHelpers.ts";

// zai speaks the claude wire format (open-sse/config/providers/registry/zai/index.ts),
// so `isClaudeWireFormatModel` routes it through the base64 self-fetch path.
const CLAUDE_WIRE_MODEL = "zai/glm-4.6";

function bodyWithRemoteImage(url: string) {
  return {
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "describe this" },
          { type: "image_url", image_url: { url } },
        ],
      },
    ],
  };
}

test("remote image fetched for the claude-wire self-call is downscaled to the long-edge cap", async (t) => {
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

  const fetchImpl = (async () =>
    new Response(big, {
      status: 200,
      headers: { "content-type": "image/png" },
    })) as unknown as typeof fetch;

  const result = await ensureBase64ImagesForClaudeWire(
    bodyWithRemoteImage("https://example.com/big.png"),
    CLAUDE_WIRE_MODEL,
    fetchImpl
  );

  const imagePart = (result.messages?.[0]?.content as Array<{ image_url?: { url: string } }>)[1];
  const dataUri = imagePart?.image_url?.url ?? "";
  assert.match(dataUri, /^data:image\/png;base64,/);

  const b64 = dataUri.split(",")[1] ?? "";
  const decoded = Buffer.from(b64, "base64");
  const meta = await sharp(decoded).metadata();
  assert.ok((meta.width ?? 0) <= 2048, `expected width <= 2048, got ${meta.width}`);
  assert.notEqual(meta.width, 4096, "image must have been downscaled, not left at 4096");
});

test("remote non-image bytes pass through untouched (fail-open, no normalization)", async () => {
  const junk = Buffer.from("not-an-image-at-all");

  const fetchImpl = (async () =>
    new Response(junk, {
      status: 200,
      headers: { "content-type": "application/octet-stream" },
    })) as unknown as typeof fetch;

  const result = await ensureBase64ImagesForClaudeWire(
    bodyWithRemoteImage("https://example.com/junk.bin"),
    CLAUDE_WIRE_MODEL,
    fetchImpl
  );

  const imagePart = (result.messages?.[0]?.content as Array<{ image_url?: { url: string } }>)[1];
  const dataUri = imagePart?.image_url?.url ?? "";
  assert.equal(dataUri, `data:application/octet-stream;base64,${junk.toString("base64")}`);
});
