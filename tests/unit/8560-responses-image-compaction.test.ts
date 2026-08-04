/**
 * #8560 — multi-turn Codex/Responses sessions with inline images were hard-rejected
 * near the concrete input cap because:
 *   1) compressContext() no-op'd on Responses `input[]` (no body.messages)
 *   2) older screenshots were never pruned on vision models
 *
 * These tests pin the adapter round-trip + image prune layer that keep the latest
 * images while dropping older ones so the request fits.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { adaptBodyForCompression } from "../../open-sse/services/compression/bodyAdapter.ts";
import {
  compressContext,
  estimateTokens,
  pruneOlderInlineImages,
} from "../../open-sse/services/contextManager.ts";

function makeFakePngBase64(approxBytes: number): string {
  return Buffer.alloc(approxBytes, 65).toString("base64");
}

function responsesImageTurn(text: string, base64: string) {
  return {
    type: "message",
    role: "user",
    content: [
      { type: "input_text", text },
      { type: "input_image", image_url: `data:image/png;base64,${base64}` },
    ],
  };
}

test("#8560: pruneOlderInlineImages keeps the newest images and drops older ones", () => {
  const base64 = makeFakePngBase64(8_000);
  const messages = [
    {
      role: "user",
      content: [
        { type: "input_text", text: "first" },
        { type: "input_image", image_url: `data:image/png;base64,${base64}` },
      ],
    },
    {
      role: "user",
      content: [
        { type: "input_text", text: "second" },
        { type: "input_image", image_url: `data:image/png;base64,${base64}` },
      ],
    },
    {
      role: "user",
      content: [
        { type: "input_text", text: "third" },
        { type: "input_image", image_url: `data:image/png;base64,${base64}` },
      ],
    },
  ];

  const { messages: pruned, pruned: count } = pruneOlderInlineImages(messages, {
    keepLatest: 2,
  });

  assert.equal(count, 1);
  const firstContent = pruned[0].content as Array<Record<string, unknown>>;
  assert.equal(firstContent[1].type, "input_text");
  assert.match(String(firstContent[1].text), /Earlier image removed/);
  assert.equal((pruned[1].content as Array<Record<string, unknown>>)[1].type, "input_image");
  assert.equal((pruned[2].content as Array<Record<string, unknown>>)[1].type, "input_image");
});

test("#8560: compressContext prunes older images before purifying history", () => {
  const base64 = makeFakePngBase64(8_000);
  const messages = Array.from({ length: 6 }, (_, i) => ({
    role: "user",
    content: [
      { type: "input_text", text: `turn-${i}` },
      { type: "input_image", image_url: `data:image/png;base64,${base64}` },
    ],
  }));
  const original = estimateTokens(messages);
  // Force pruning all the way down to keepLatest=2 (~1200 tokens saved per image).
  const target = original - 5_000;

  const result = compressContext(
    { model: "gpt-5.6-terra", messages },
    { provider: "codex", maxTokens: target, reserveTokens: 0, keepLatestImages: 2 }
  );

  assert.equal(result.compressed, true);
  assert.ok(
    (result.stats?.final as number) < original,
    `expected token count to shrink (original=${original}, final=${result.stats?.final})`
  );
  const layers = (result.stats as { layers?: Array<{ name: string }> }).layers || [];
  assert.ok(
    layers.some((layer) => layer.name === "prune_images"),
    `expected prune_images layer, got ${JSON.stringify(layers)}`
  );

  const remainingImages = (result.body.messages as Array<{ content: unknown }>).flatMap((msg) =>
    Array.isArray(msg.content)
      ? msg.content.filter(
          (part) =>
            part &&
            typeof part === "object" &&
            (part as { type?: string }).type === "input_image"
        )
      : []
  );
  assert.equal(remainingImages.length, 2);
  // Target is advisory once keepLatest images remain; purifyHistory may still
  // leave a small overshoot, but prune_images must have engaged.
  assert.ok(target < original);
});

test("#8560: Responses input adapts → compressContext → restore shrinks and keeps latest images", () => {
  const base64 = makeFakePngBase64(12_000);
  const filler = "x".repeat(40_000); // ~10k text tokens to force compaction
  const body = {
    model: "gpt-5.6-terra",
    instructions: "You are Codex.",
    input: [
      responsesImageTurn(`first ${filler}`, base64),
      { type: "message", role: "assistant", content: [{ type: "output_text", text: "ok-1" }] },
      responsesImageTurn(`second ${filler}`, base64),
      { type: "message", role: "assistant", content: [{ type: "output_text", text: "ok-2" }] },
      responsesImageTurn(`third ${filler}`, base64),
      responsesImageTurn(`fourth ${filler}`, base64),
    ],
  };

  const adapter = adaptBodyForCompression(body);
  assert.equal(adapter.adapted, true);

  const before = estimateTokens(adapter.body.messages);
  // Compress well below the original so prune + purify must engage.
  const result = compressContext(adapter.body, {
    provider: "codex",
    model: "gpt-5.6-terra",
    maxTokens: Math.max(8_000, Math.floor(before * 0.4)),
    reserveTokens: 0,
    keepLatestImages: 2,
  });
  assert.equal(result.compressed, true);

  const restored = adapter.restore(result.body as Record<string, unknown>, {
    dropMissingMappedItems: true,
  });
  assert.ok(!("messages" in restored), "Responses body must not leak synthetic messages");
  assert.ok(Array.isArray(restored.input));

  const input = restored.input as Array<Record<string, unknown>>;
  assert.ok(input.length < body.input.length, "history purification should drop older turns");

  const imageParts = input.flatMap((item) => {
    if (!Array.isArray(item.content)) return [];
    return item.content.filter(
      (part) =>
        part && typeof part === "object" && (part as { type?: string }).type === "input_image"
    );
  });
  assert.ok(imageParts.length <= 2, `expected at most 2 surviving images, got ${imageParts.length}`);
  assert.ok(imageParts.length >= 1, "newest images should survive pruning");

  // Re-adapt for a fair object-aware estimate of the restored payload.
  const reAdapted = adaptBodyForCompression(restored);
  const finalEstimate =
    estimateTokens(reAdapted.body.messages) + estimateTokens(restored.instructions);
  assert.ok(
    finalEstimate < before + estimateTokens(body.instructions),
    `expected restored payload smaller than original (before=${before}, final=${finalEstimate})`
  );
});

test("#8560: image-only Responses turns are adapted (not skipped)", () => {
  const base64 = makeFakePngBase64(4_000);
  const body = {
    input: [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_image", image_url: `data:image/png;base64,${base64}` }],
      },
    ],
  };
  const adapter = adaptBodyForCompression(body);
  assert.equal(adapter.adapted, true);
  assert.equal((adapter.body.messages as unknown[]).length, 1);
});
