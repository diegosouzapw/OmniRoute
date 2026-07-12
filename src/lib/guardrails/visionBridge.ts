/**
 * Vision Bridge Guardrail.
 * Intercepts image-bearing requests to non-vision models.
 * For individual non-vision models: reroutes to the fastest available vision-capable model.
 * For combos with non-vision targets: extracts descriptions via vision model and replaces images with text.
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
  isVisionBridgeForcedModel,
} from "@/shared/constants/visionBridgeDefaults";
import { getBestVisionModel } from "./visionBridgeRouter";

type ComboVisionBridgeDecision = "process" | "skip" | "not-combo";

/// Check if a combo model should trigger vision bridge processing.
/// Resolves combo targets and returns:
/// - "process" if any target cannot be proven vision-capable
/// - "skip" if all model targets can handle images directly
/// - "not-combo" when the model is not a combo/mapping
async function getComboVisionBridgeDecision(model: string): Promise<ComboVisionBridgeDecision> {
  try {
    const { getComboByName } = await import("@/lib/localDb");
    const { resolveComboForModel } = await import("@/lib/db/modelComboMappings");

    // 1. Try to find combo by exact name match
    let combo = await getComboByName(model);

    // 2. If no exact match, try model-combo mapping
    if (!combo) {
      const mapping = await resolveComboForModel(model);
      if (!mapping) return "not-combo";
      const comboName = mapping.comboName ?? mapping.name ?? null;
      if (!comboName) return "not-combo";
      combo = await getComboByName(comboName);
    }

    if (!combo) return "not-combo";

    // 3. Get the combo's models (target steps)
    const rawModels = (combo as Record<string, unknown>).models;
    if (!Array.isArray(rawModels)) return "process";

    // 4. Check each target for vision support
    // combo-ref → conservative (process images)
    // model step with no native vision → process images
    // all model steps with native vision → safe to skip
    let hasModelStep = false;
    for (const step of rawModels) {
      const s = step as Record<string, unknown>;
      if (s.kind === "combo-ref") return "process";
      if (s.kind === "model") {
        hasModelStep = true;
        const targetModel = s.model;
        if (typeof targetModel === "string") {
          const caps = getResolvedModelCapabilities(targetModel);
          if (caps.supportsVision !== true) {
            return "process";
          }
        } else {
          return "process";
        }
      }
    }

    // All model steps support vision — safe to skip
    if (hasModelStep) return "skip";

    // No recognizable steps — don't force bridge
    return "not-combo";
  } catch {
    // On error, try to process images (conservative)
    return "process";
  }
}

export interface VisionBridgeDependencies {
  getSettings?: () => Promise<Record<string, unknown>>;
  callVisionModel?: (
    imageDataUri: string,
    config: import("./visionBridgeHelpers").VisionModelConfig,
    apiKey?: string
  ) => Promise<string>;
  /** Override combo-target vision check — return true to force processing, false to skip. */
  checkModelHasComboMapping?: (model: string) => Promise<boolean>;
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

    // 3b. Auto/ prefix → skip guardrail (auto-combo resolver handles vision-capable model selection)
    if (model === "auto" || model.startsWith("auto/")) {
      return { block: false };
    }

    const forceVisionBridge = isVisionBridgeForcedModel(model);

    // 4. Check if model supports vision
    const capabilities = getResolvedModelCapabilities(model);
    const comboVisionBridgeDecision = forceVisionBridge
      ? "process"
      : this.deps.checkModelHasComboMapping
        ? (await this.deps.checkModelHasComboMapping(model))
          ? "process"
          : "skip"
        : await getComboVisionBridgeDecision(model);

    if (comboVisionBridgeDecision === "skip") {
      return { block: false };
    }

    if (capabilities.supportsVision === true && !forceVisionBridge) {
      // The request model supports vision natively, but check if a
      // model-combo mapping routes this model through a combo where
      // some targets may NOT support vision. In that case, the vision
      // bridge must process images so combo targets can describe them.
      if (comboVisionBridgeDecision !== "process") {
        return { block: false };
      }
      // Combo mapping found — fall through to process images
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

    // 9. Individual non-combo model with images → REROUTE to best vision-capable model
    // instead of describing images through an intermediate vision call.
    // This lets a downstream vision model process the image natively.
    if (comboVisionBridgeDecision === "not-combo" && !forceVisionBridge) {
      // Honor an explicit operator override from the Vision Bridge settings tab
      // (settings.visionBridgeModel) as the fixed reroute target, for consistency
      // with the combo/describe path below (step 10) which always honors it via
      // getVisionBridgeConfig. When unset, auto-select the fastest available
      // vision-capable model from available providers.
      const configuredModel =
        typeof settings.visionBridgeModel === "string" && settings.visionBridgeModel.trim()
          ? settings.visionBridgeModel.trim()
          : undefined;
      const bestModel = getBestVisionModel({ fixedModel: configuredModel });
      if (bestModel && bestModel !== model) {
        const modifiedBody = {
          ...(body as Record<string, unknown>),
          model: bestModel,
        };
        return {
          block: false,
          modifiedPayload: modifiedBody as unknown,
          meta: {
            rerouted: true,
            fromModel: model,
            toModel: bestModel,
            imagesKept: imageParts.length,
          },
        };
      }
      // Fall through: if no vision model found, describe images as text instead
    }

    // 10. Get configuration
    const config = getVisionBridgeConfig({
      visionBridgeEnabled: settings.visionBridgeEnabled as boolean | undefined,
      visionBridgeModel: settings.visionBridgeModel as string | undefined,
      visionBridgePrompt: settings.visionBridgePrompt as string | undefined,
      visionBridgeTimeout: settings.visionBridgeTimeout as number | undefined,
      visionBridgeMaxImages: settings.visionBridgeMaxImages as number | undefined,
    });

    // 11. Limit images
    const limitedParts = imageParts.slice(0, config.maxImages);

    // 12. Call vision model for each image in parallel (injectable for testing)
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

    // Collect descriptions maintaining original order. A failed describe yields
    // `null` so the original image is preserved downstream (#4012) — replacing it
    // with an "(unavailable)" stub silently destroyed images for vision-capable
    // upstreams whose capability OmniRoute couldn't prove from the registry.
    const descriptions: (string | null)[] = results.map((result, i) => {
      if (result.status === "fulfilled") {
        return result.value;
      }
      const message =
        result.reason instanceof Error ? result.reason.message : String(result.reason);
      logger?.warn?.("VISION-BRIDGE", `Failed to get description for image ${i + 1}: ${message}`);
      return null;
    });

    // 13. Replace image parts with text descriptions (null → keep original image)
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
        // Keep meta observability stable: report a human label for failures.
        descriptions: descriptions.map((d, i) => d ?? `[Image ${i + 1}]: (unavailable)`),
        processingTimeMs: processingTime,
        visionModel: config.model,
      },
    };
  }
}
