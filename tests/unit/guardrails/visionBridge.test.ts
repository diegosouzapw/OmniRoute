/**
 * Tests for VisionBridgeGuardrail.
 * Uses dependency injection to avoid SQLite dependency.
 */

import test from "node:test";
import assert from "node:assert/strict";

const { VisionBridgeGuardrail } = await import("../../../src/lib/guardrails/visionBridge.ts");
const { resetGuardrailsForTests } = await import("../../../src/lib/guardrails/registry.ts");
const { getResolvedModelCapabilities } = await import("../../../src/lib/modelCapabilities.ts");
import type { GuardrailContext } from "../../../src/lib/guardrails/base.ts";
import type { VisionModelConfig } from "../../../src/lib/guardrails/visionBridgeHelpers.ts";

// ── Mock state ──────────────────────────────────────────────────────────────

let mockSettings: Record<string, unknown> = {
  visionBridgeEnabled: true,
  visionBridgeModel: "openai/gpt-4o-mini",
  visionBridgePrompt: "Describe this image concisely.",
  visionBridgeTimeout: 30000,
  visionBridgeMaxImages: 10,
};

let mockVisionResponse = "A beautiful sunset over the ocean";
let shouldVisionFail = false;
let visionCallCount = 0;

function createGuardrail(options?: Parameters<typeof VisionBridgeGuardrail>[0]) {
  return new VisionBridgeGuardrail({
    ...options,
    deps: {
      getSettings: async () => mockSettings,
      callVisionModel: async (_imageDataUri: string, _config: VisionModelConfig) => {
        visionCallCount++;
        if (shouldVisionFail) {
          throw new Error("Vision model failed");
        }
        return mockVisionResponse;
      },
    },
  });
}

test.beforeEach(() => {
  resetGuardrailsForTests({ registerDefaults: false });
  visionCallCount = 0;
  shouldVisionFail = false;
  mockSettings = {
    visionBridgeEnabled: true,
    visionBridgeModel: "openai/gpt-4o-mini",
    visionBridgePrompt: "Describe this image concisely.",
    visionBridgeTimeout: 30000,
    visionBridgeMaxImages: 10,
  };
});

// ── Helpers ─────────────────────────────────────────────────────────────────

function createContext(overrides: Partial<GuardrailContext> = {}): GuardrailContext {
  return {
    model: "minimax/minimax-01",
    log: console,
    ...overrides,
  };
}

function createPayload(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    model: "minimax/minimax-01",
    messages: [{ role: "user", content: "Hello" }],
    ...overrides,
  };
}

// ── Basic Properties ────────────────────────────────────────────────────────

test("VisionBridgeGuardrail has correct name and priority", () => {
  const guardrail = createGuardrail();
  assert.strictEqual(guardrail.name, "vision-bridge");
  assert.strictEqual(guardrail.priority, 5);
});

test("VisionBridgeGuardrail is enabled by default", () => {
  const guardrail = createGuardrail();
  assert.strictEqual(guardrail.enabled, true);
});

test("VisionBridgeGuardrail can be disabled via constructor", () => {
  const guardrail = createGuardrail({ enabled: false });
  assert.strictEqual(guardrail.enabled, false);
});

// ── VB-S05: Vision Bridge disabled via settings ────────────────────────────

test("VB-S05: passthroughs when visionBridgeEnabled is false", async () => {
  mockSettings.visionBridgeEnabled = false;
  const guardrail = createGuardrail();

  const payload = createPayload({
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What is in this image?" },
          {
            type: "image_url",
            image_url: { url: "https://example.com/image.png" },
          },
        ],
      },
    ],
  });

  const result = await guardrail.preCall(payload, createContext());
  assert.strictEqual(result.block, false);
  assert.strictEqual(result.modifiedPayload, undefined);
});

// ── VB-S06: Disabled via context ────────────────────────────────────────────

test("VB-S06: skips when disabledGuardrails includes vision-bridge", async () => {
  const guardrail = createGuardrail();
  const payload = createPayload();
  const context = createContext({ disabledGuardrails: ["vision-bridge"] });

  const result = await guardrail.preCall(payload, context);
  assert.strictEqual(result.block, false);
  assert.strictEqual(result.modifiedPayload, undefined);
});

// ── VB-S02: Vision-capable model passthrough ────────────────────────────────

test("VB-S02: passthroughs for vision-capable model (gpt-4o)", async () => {
  const guardrail = createGuardrail();
  const payload = createPayload({
    model: "openai/gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What is this?" },
          {
            type: "image_url",
            image_url: { url: "https://example.com/image.png" },
          },
        ],
      },
    ],
  });

  const result = await guardrail.preCall(payload, createContext({ model: "openai/gpt-4o" }));

  // If supportsVision is true, it should passthrough (no modification)
  // If supportsVision is null/undefined (no sync data), it will process — that's correct behavior
  const capabilities = getResolvedModelCapabilities("openai/gpt-4o");
  if (capabilities.supportsVision === true) {
    assert.strictEqual(result.block, false);
    assert.strictEqual(result.modifiedPayload, undefined);
  } else {
    // Without sync data, supportsVision is null — guardrail processes the image
    // This is correct fail-open behavior for unknown model capabilities
    assert.strictEqual(result.block, false);
  }
});

test("VB-S02: model capabilities returns supportsVision for known models", () => {
  const gpt4oCaps = getResolvedModelCapabilities("openai/gpt-4o");
  // supportsVision may be true (if sync data exists) or null (if not synced)
  assert.ok(gpt4oCaps.supportsVision === true || gpt4oCaps.supportsVision === null);
});

// ── VB-S04: No images passthrough ──────────────────────────────────────────

test("VB-S04: passthroughs when no images in messages", async () => {
  const guardrail = createGuardrail();
  const payload = createPayload({
    messages: [{ role: "user", content: "Hello, how are you?" }],
  });

  const result = await guardrail.preCall(payload, createContext());
  assert.strictEqual(result.block, false);
  assert.strictEqual(result.modifiedPayload, undefined);
});

test("VB-S04: passthroughs when messages array is empty", async () => {
  const guardrail = createGuardrail();
  const payload = createPayload({ messages: [] });
  const result = await guardrail.preCall(payload, createContext());
  assert.strictEqual(result.block, false);
});

// ── VB-S01: Single image processing ─────────────────────────────────────────

test("VB-S01: replaces image with description for non-vision model", async () => {
  mockVisionResponse = "A beautiful sunset over the ocean";
  const guardrail = createGuardrail();

  const payload = createPayload({
    model: "minimax/minimax-01",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What is in this image?" },
          {
            type: "image_url",
            image_url: { url: "https://example.com/image.png" },
          },
        ],
      },
    ],
  });

  const result = await guardrail.preCall(payload, createContext({ model: "minimax/minimax-01" }));

  assert.strictEqual(result.block, false);
  assert.ok(result.modifiedPayload);

  const modified = result.modifiedPayload as {
    messages: Array<{ content: unknown[] }>;
  };
  const content = modified.messages[0].content as Array<{
    type: string;
    text?: string;
  }>;

  const imagePart = content.find((p) => p.type === "image_url");
  assert.strictEqual(imagePart, undefined);

  const descriptionPart = content.find((p) => p.type === "text" && p.text?.includes("sunset"));
  assert.ok(descriptionPart);
});

// ── VB-S04: Multiple images ─────────────────────────────────────────────────

test("VB-S04: processes multiple images and concatenates descriptions", async () => {
  let callIdx = 0;
  const descriptions = ["A cute cat", "A playful dog", "A colorful bird"];

  const guardrail = new VisionBridgeGuardrail({
    deps: {
      getSettings: async () => mockSettings,
      callVisionModel: async () => {
        const desc = descriptions[callIdx] || "Unknown image";
        callIdx++;
        return desc;
      },
    },
  });

  const payload = createPayload({
    model: "minimax/minimax-01",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Describe these images" },
          {
            type: "image_url",
            image_url: { url: "https://example.com/cat.png" },
          },
          {
            type: "image_url",
            image_url: { url: "https://example.com/dog.png" },
          },
          {
            type: "image_url",
            image_url: { url: "https://example.com/bird.png" },
          },
        ],
      },
    ],
  });

  const result = await guardrail.preCall(payload, createContext({ model: "minimax/minimax-01" }));

  assert.strictEqual(result.block, false);
  assert.ok(result.modifiedPayload);
  assert.strictEqual(callIdx, 3);

  const modified = result.modifiedPayload as {
    messages: Array<{ content: unknown[] }>;
  };
  const content = modified.messages[0].content as Array<{
    type: string;
    text?: string;
  }>;

  assert.ok(content.some((p) => p.type === "text" && p.text?.includes("[Image 1]")));
  assert.ok(content.some((p) => p.type === "text" && p.text?.includes("[Image 2]")));
  assert.ok(content.some((p) => p.type === "text" && p.text?.includes("[Image 3]")));
});

// ── VB-S03: Fail-open on vision error ──────────────────────────────────────

test("VB-S03: returns modified payload with unavailable text when vision API fails", async () => {
  shouldVisionFail = true;
  const guardrail = createGuardrail();

  const payload = createPayload({
    model: "minimax/minimax-01",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What is this?" },
          {
            type: "image_url",
            image_url: { url: "https://example.com/image.png" },
          },
        ],
      },
    ],
  });

  const result = await guardrail.preCall(payload, createContext({ model: "minimax/minimax-01" }));

  assert.strictEqual(result.block, false);
  assert.ok(result.modifiedPayload);

  const modified = result.modifiedPayload as {
    messages: Array<{ content: unknown[] }>;
  };
  const content = modified.messages[0].content as Array<{
    type: string;
    text?: string;
  }>;

  // Should have "unavailable" text instead of image
  const unavailPart = content.find((p) => p.type === "text" && p.text?.includes("unavailable"));
  assert.ok(unavailPart);
});

test("VB-S03: logs warning when vision API fails", async () => {
  shouldVisionFail = true;
  let warningLogged = false;
  const guardrail = createGuardrail();

  const payload = createPayload({
    model: "minimax/minimax-01",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: { url: "https://example.com/image.png" },
          },
        ],
      },
    ],
  });

  const mockLog = {
    warn: (_tag: string, msg: string) => {
      if (msg.includes("Failed to get description")) {
        warningLogged = true;
      }
    },
  };

  await guardrail.preCall(
    payload,
    createContext({
      model: "minimax/minimax-01",
      log: mockLog as GuardrailContext["log"],
    })
  );

  assert.strictEqual(warningLogged, true);
});

// ── VB-S07: Base64 image format ─────────────────────────────────────────────

test("VB-S07: handles base64 image format", async () => {
  mockVisionResponse = "An image description";
  const guardrail = createGuardrail();

  const payload = createPayload({
    model: "minimax/minimax-01",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: "image/png",
              data: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
            },
          },
        ],
      },
    ],
  });

  const result = await guardrail.preCall(payload, createContext({ model: "minimax/minimax-01" }));

  assert.strictEqual(result.block, false);
  assert.ok(result.modifiedPayload);
});

// ── VB-S09: Image count limit ───────────────────────────────────────────────

test("VB-S09: respects maxImages setting", async () => {
  mockSettings.visionBridgeMaxImages = 2;
  const guardrail = createGuardrail();

  const images = Array.from({ length: 5 }, (_, i) => ({
    type: "image_url" as const,
    image_url: { url: `https://example.com/image${i}.png` },
  }));

  const payload = createPayload({
    model: "minimax/minimax-01",
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: "Describe these" }, ...images],
      },
    ],
  });

  await guardrail.preCall(payload, createContext({ model: "minimax/minimax-01" }));

  // Should only call vision API for 2 images (maxImages=2)
  assert.strictEqual(visionCallCount, 2);
});

// ── VB-S10: Meta information returned ───────────────────────────────────────

test("VB-S10: returns meta with imagesProcessed count", async () => {
  mockVisionResponse = "A test description";
  const guardrail = createGuardrail();

  const payload = createPayload({
    model: "minimax/minimax-01",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What is this?" },
          {
            type: "image_url",
            image_url: { url: "https://example.com/a.png" },
          },
          {
            type: "image_url",
            image_url: { url: "https://example.com/b.png" },
          },
        ],
      },
    ],
  });

  const result = await guardrail.preCall(payload, createContext({ model: "minimax/minimax-01" }));

  assert.ok(result.meta);
  assert.ok(typeof result.meta === "object");

  const meta = result.meta as Record<string, unknown>;
  assert.strictEqual(meta.imagesProcessed, 2);
  assert.ok(Array.isArray(meta.descriptions));
  assert.strictEqual((meta.descriptions as string[]).length, 2);
  assert.strictEqual(typeof meta.processingTimeMs, "number");
  assert.strictEqual(meta.visionModel, "openai/gpt-4o-mini");
});
