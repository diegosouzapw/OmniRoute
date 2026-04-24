/**
 * Vision Bridge Guardrail.
 * Intercepts image-bearing requests to non-vision models,
 * extracts descriptions via vision model, and replaces images with text.
 */

import { BaseGuardrail, type GuardrailContext, type GuardrailResult } from "./base";
import { getSettings as defaultGetSettings } from "@/lib/db/settings";
import { getResolvedModelCapabilities } from "@/lib/modelCapabilities";
import {
  extractImageParts,
  callVisionModel as defaultCallVisionModel,
  replaceImageParts,
} from "./visionBridgeHelpers";
import {
  VISION_BRIDGE_DEFAULTS,
  getVisionBridgeConfig,
} from "@/shared/constants/visionBridgeDefaults";

export interface VisionBridgeDependencies {
  getSettings?: () => Promise<Record<string, unknown>>;
  callVisionModel?: (
    imageDataUri: string,
    config: import("./visionBridgeHelpers").VisionModelConfig,
    apiKey?: string
  ) => Promise<string>;
}

export class VisionBridgeGuardrail extends BaseGuardrail {
  name = "vision-bridge";
  priority = 5;

  private readonly deps: VisionBridgeDependencies;

  constructor(options?: { enabled?: boolean; deps?: VisionBridgeDependencies }) {
    super("vision-bridge", { priority: 5, enabled: options?.enabled });
    this.deps = options?.deps ?? {};
  }

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult<unknown>> {
    // 1. Check if disabled at guardrail level
    if (!this.enabled) {
      return { block: false };
    }

    // 2. Check disabled via context (header, body, API key)
    if (context.disabledGuardrails?.includes("vision-bridge")) {
      return { block: false };
    }

    // 3. Get model from context or payload
    const model =
      context.model || ((payload as Record<string, unknown>)?.model as string | undefined);
    if (!model) {
      return { block: false };
    }

    // 4. Check if model supports vision
    const capabilities = getResolvedModelCapabilities(model);
    if (capabilities.supportsVision === true) {
      return { block: false };
    }

    // 5. Get body and check for messages
    const body = payload as Record<string, unknown>;
    const messages = body?.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      return { block: false };
    }

    // 6. Check for images using helper (extractImageParts returns empty if no images)
    const imageParts = extractImageParts(messages as Parameters<typeof extractImageParts>[0]);
    if (imageParts.length === 0) {
      return { block: false };
    }

    // 7. Get settings (injectable for testing)
    const getSettings = this.deps.getSettings ?? defaultGetSettings;
    let settings: Record<string, unknown> = {};
    try {
      settings = await getSettings();
    } catch {
      // If getSettings fails, use defaults
    }

    // 8. Check if Vision Bridge is enabled in settings
    const enabled = settings.visionBridgeEnabled ?? VISION_BRIDGE_DEFAULTS.enabled;
    if (!enabled) {
      return { block: false };
    }

    // 9. Get configuration
    const config = getVisionBridgeConfig({
      visionBridgeEnabled: settings.visionBridgeEnabled as boolean | undefined,
      visionBridgeModel: settings.visionBridgeModel as string | undefined,
      visionBridgePrompt: settings.visionBridgePrompt as string | undefined,
      visionBridgeTimeout: settings.visionBridgeTimeout as number | undefined,
      visionBridgeMaxImages: settings.visionBridgeMaxImages as number | undefined,
    });

    // 10. Limit images
    const limitedParts = imageParts.slice(0, config.maxImages);

    // 11. Call vision model for each image in parallel (injectable for testing)
    const callVision = this.deps.callVisionModel ?? defaultCallVisionModel;
    const logger = context.log;
    const startTime = Date.now();

    // Process all images in parallel using Promise.allSettled for fail-partial behavior
    const results = await Promise.allSettled(
      limitedParts.map(async (imagePart, i) => {
        const description = await callVision(imagePart.imageUrl, config);
        return `[Image ${i + 1}]: ${description}`;
      })
    );

    // Collect descriptions maintaining original order
    const descriptions = results.map((result, i) => {
      if (result.status === "fulfilled") {
        return result.value;
      }
      const message =
        result.reason instanceof Error ? result.reason.message : String(result.reason);
      logger?.warn?.("VISION-BRIDGE", `Failed to get description for image ${i + 1}: ${message}`);
      return `[Image ${i + 1}]: (unavailable)`;
    });

    // 12. Replace image parts with text descriptions
    const modifiedBody = replaceImageParts(
      body as Parameters<typeof replaceImageParts>[0],
      descriptions
    );
    const processingTime = Date.now() - startTime;

    return {
      block: false,
      modifiedPayload: modifiedBody,
      meta: {
        imagesProcessed: descriptions.length,
        descriptions,
        processingTimeMs: processingTime,
        visionModel: config.model,
      },
    };
  }
}
