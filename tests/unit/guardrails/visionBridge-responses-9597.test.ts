import test from "node:test";
import assert from "node:assert/strict";

const { VisionBridgeGuardrail } = await import("../../../src/lib/guardrails/visionBridge.ts");
const { containsMediaKind } = await import("../../../open-sse/utils/mediaParts.ts");

import type { GuardrailContext } from "../../../src/lib/guardrails/base.ts";
import type { VisionModelConfig } from "../../../src/lib/guardrails/visionBridgeHelpers.ts";

const IMAGE_DATA_URI =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";

test("#9597: Responses input/input_image is described before combo vision filtering", async () => {
  let visionCallCount = 0;
  let receivedImage = "";
  let receivedPrompt = "";

  const guardrail = new VisionBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeVisionEnabled: true,
        modalityBridgeVisionMode: "describe",
        modalityBridgeVisionModel: "openai/gpt-4o-mini",
        modalityBridgeVisionTaskAware: true,
        modalityBridgeVisionPrompt: "Describe this image concisely.",
        modalityBridgeVisionTimeout: 30000,
        modalityBridgeVisionMaxImages: 10,
        modalityBridgeCacheEnabled: false,
      }),
      callVisionModel: async (imageDataUri: string, config: VisionModelConfig) => {
        visionCallCount++;
        receivedImage = imageDataUri;
        receivedPrompt = config.prompt;
        return "A green status badge reading PASS.";
      },
      checkModelHasComboMapping: async () => true,
      hasUsableCredentials: async () => true,
    },
  });

  const payload = {
    model: "openai/gpt-4o",
    input: [
      {
        type: "message",
        role: "user",
        content: [
          {
            type: "input_text",
            text: "Read the status badge and report its text.",
          },
          {
            type: "input_image",
            image_url: IMAGE_DATA_URI,
            detail: "high",
          },
        ],
      },
    ],
    stream: true,
  };

  const context = {
    model: "openai/gpt-4o",
    log: {
      debug: () => undefined,
      info: () => undefined,
      warn: () => undefined,
    },
  } as GuardrailContext;

  const result = await guardrail.preCall(payload, context);

  assert.equal(result.block, false);
  assert.equal(
    visionCallCount,
    1,
    "Responses input/input_image should invoke the configured vision model once"
  );
  assert.equal(receivedImage, IMAGE_DATA_URI);
  assert.match(
    receivedPrompt,
    /Read the status badge and report its text/,
    "task-aware prompting should read Responses input_text"
  );

  assert.ok(result.modifiedPayload, "Responses describe mode should return a transformed payload");

  const modified = result.modifiedPayload as {
    model?: string;
    messages?: unknown;
    input: Array<{
      role?: string;
      content: Array<{
        type?: string;
        text?: string;
        image_url?: unknown;
      }>;
    }>;
  };

  assert.equal(
    modified.model,
    payload.model,
    "describe mode must preserve the requested answer model"
  );

  assert.equal(
    "messages" in modified,
    false,
    "Vision Bridge must preserve the native Responses request shape"
  );

  const content = modified.input[0]?.content ?? [];

  assert.equal(
    content.some((part) => part.type === "input_image"),
    false,
    "raw input_image must be removed before combo compatibility filtering"
  );

  assert.equal(
    content.some((part) => part.type === "text"),
    false,
    "Responses payload must not receive Chat-format text parts"
  );

  assert.equal(content[0]?.type, "input_text");
  assert.equal(content[0]?.text, "Read the status badge and report its text.");

  assert.equal(content[1]?.type, "input_text", "image description must use Responses input_text");

  assert.match(content[1]?.text ?? "", /PASS/, "vision description should replace the image");

  assert.equal(
    containsMediaKind(modified.input, "image"),
    false,
    "shared combo media detector must see no image after Vision Bridge"
  );

  assert.equal(
    JSON.stringify(modified).includes(IMAGE_DATA_URI),
    false,
    "raw image bytes must not reach the text-only combo target"
  );
});

function settings9597(): Record<string, unknown> {
  return {
    modalityBridgeVisionEnabled: true,
    modalityBridgeVisionMode: "describe",
    modalityBridgeVisionModel: "openai/gpt-4o-mini",
    modalityBridgeVisionTaskAware: true,
    modalityBridgeVisionPrompt: "Describe this image concisely.",
    modalityBridgeVisionTimeout: 30000,
    modalityBridgeVisionMaxImages: 10,
    modalityBridgeCacheEnabled: false,
  };
}

function context9597(model: string): GuardrailContext {
  return {
    model,
    log: {
      debug: () => undefined,
      info: () => undefined,
      warn: () => undefined,
    },
  } as GuardrailContext;
}

test("#9597 matrix: Responses input without images remains untouched", async () => {
  let visionCallCount = 0;

  const guardrail = new VisionBridgeGuardrail({
    deps: {
      getSettings: async () => settings9597(),
      callVisionModel: async () => {
        visionCallCount++;
        return "unexpected";
      },
      checkModelHasComboMapping: async () => true,
      hasUsableCredentials: async () => true,
    },
  });

  const payload = {
    model: "glm5.2",
    input: [
      {
        type: "message",
        role: "user",
        content: [
          {
            type: "input_text",
            text: "This request contains no image.",
          },
        ],
      },
    ],
    stream: true,
  };

  const result = await guardrail.preCall(payload, context9597(payload.model));

  assert.equal(result.block, false);
  assert.equal(result.modifiedPayload, undefined);
  assert.equal(visionCallCount, 0);
});

test("#9597 matrix: Chat Completions image path remains Chat-shaped", async () => {
  let visionCallCount = 0;

  const guardrail = new VisionBridgeGuardrail({
    deps: {
      getSettings: async () => settings9597(),
      callVisionModel: async () => {
        visionCallCount++;
        return "A blue status badge.";
      },
      checkModelHasComboMapping: async () => true,
      hasUsableCredentials: async () => true,
    },
  });

  const payload = {
    model: "glm5.2",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Describe the badge.",
          },
          {
            type: "image_url",
            image_url: {
              url: IMAGE_DATA_URI,
            },
          },
        ],
      },
    ],
  };

  const result = await guardrail.preCall(payload, context9597(payload.model));

  assert.equal(result.block, false);
  assert.equal(visionCallCount, 1);
  assert.ok(result.modifiedPayload);

  const modified = result.modifiedPayload as {
    model?: string;
    input?: unknown;
    messages: Array<{
      content: Array<{
        type?: string;
        text?: string;
        image_url?: unknown;
      }>;
    }>;
  };

  assert.equal(modified.model, payload.model);
  assert.equal("input" in modified, false);

  const content = modified.messages[0]?.content ?? [];

  assert.deepEqual(
    content.map((part) => part.type),
    ["text", "text"]
  );
  assert.equal(content[0]?.text, "Describe the badge.");
  assert.match(content[1]?.text ?? "", /blue status badge/);
  assert.equal(containsMediaKind(modified.messages, "image"), false);
});

test("#9597 matrix: Responses combo describe failure never leaks the raw image", async () => {
  let visionCallCount = 0;

  const guardrail = new VisionBridgeGuardrail({
    deps: {
      getSettings: async () => settings9597(),
      callVisionModel: async () => {
        visionCallCount++;
        throw new Error("synthetic vision failure");
      },
      checkModelHasComboMapping: async () => true,
      hasUsableCredentials: async () => true,
    },
  });

  const payload = {
    model: "glm5.2",
    input: [
      {
        type: "message",
        role: "user",
        content: [
          {
            type: "input_text",
            text: "Read this image.",
          },
          {
            type: "input_image",
            image_url: IMAGE_DATA_URI,
            detail: "high",
          },
        ],
      },
    ],
  };

  const result = await guardrail.preCall(payload, context9597(payload.model));

  assert.equal(result.block, false);
  assert.equal(visionCallCount, 1);
  assert.ok(result.modifiedPayload);

  const modified = result.modifiedPayload as {
    model?: string;
    messages?: unknown;
    input: Array<{
      content: Array<{
        type?: string;
        text?: string;
      }>;
    }>;
  };

  assert.equal(modified.model, payload.model);
  assert.equal("messages" in modified, false);

  const content = modified.input[0]?.content ?? [];

  assert.equal(
    content.some((part) => part.type === "input_image"),
    false
  );
  assert.equal(content[1]?.type, "input_text");
  assert.match(content[1]?.text ?? "", /unavailable/);
  assert.equal(containsMediaKind(modified.input, "image"), false);
  assert.equal(JSON.stringify(modified).includes(IMAGE_DATA_URI), false);
});

test("#9597 matrix: bridge transformation clears the real fail-closed combo vision gate", async () => {
  const {
    deriveRequestCompatibilityRequirements,
    describeCapabilityFilterExhaustion,
    filterTargetsByRequestCompatibility,
  } = await import("../../../open-sse/services/combo/comboStructure.ts");

  const target = {
    kind: "model" as const,
    stepId: "text-only",
    executionKey: "text-only",
    modelStr: "conol-web/deepseek/deepseek-v4-pro",
    provider: "conol-web",
    providerId: null,
    connectionId: null,
    weight: 0,
    label: null,
  };

  const comboLog = {
    info: () => undefined,
    warn: () => undefined,
    debug: () => undefined,
  };

  const rawPayload = {
    model: "glm5.2",
    input: [
      {
        type: "message",
        role: "user",
        content: [
          {
            type: "input_text",
            text: "Read the badge.",
          },
          {
            type: "input_image",
            image_url: IMAGE_DATA_URI,
            detail: "high",
          },
        ],
      },
    ],
  };

  assert.equal(deriveRequestCompatibilityRequirements(rawPayload).requiresVision, true);

  const rawFiltered = filterTargetsByRequestCompatibility([target], rawPayload, comboLog);

  assert.equal(
    rawFiltered.length,
    0,
    "the existing fail-closed combo filter must still reject the raw image request"
  );

  const rawExhaustion = describeCapabilityFilterExhaustion([target], rawPayload, "glm5.2");

  assert.ok(rawExhaustion);
  assert.equal(rawExhaustion.terminalReason, "capability_mismatch");
  assert.match(rawExhaustion.message, /confirmed vision support/);

  const guardrail = new VisionBridgeGuardrail({
    deps: {
      getSettings: async () => settings9597(),
      callVisionModel: async (_imageDataUri: string, _config: VisionModelConfig) =>
        "A green badge reading PASS.",
      checkModelHasComboMapping: async () => true,
      hasUsableCredentials: async () => true,
    },
  });

  const result = await guardrail.preCall(rawPayload, context9597(rawPayload.model));

  assert.equal(result.block, false);
  assert.ok(result.modifiedPayload);

  const modified = result.modifiedPayload as Record<string, unknown>;

  assert.equal(
    deriveRequestCompatibilityRequirements(modified).requiresVision,
    false,
    "Vision Bridge must remove the image requirement before combo filtering"
  );

  const filteredAfterBridge = filterTargetsByRequestCompatibility([target], modified, comboLog);

  assert.equal(filteredAfterBridge.length, 1);
  assert.equal(filteredAfterBridge[0]?.modelStr, target.modelStr);

  const exhaustionAfterBridge = describeCapabilityFilterExhaustion([target], modified, "glm5.2");

  assert.equal(
    exhaustionAfterBridge,
    null,
    "the transformed request must not produce capability_mismatch"
  );
});

/* 9597-MATRIX-END */
