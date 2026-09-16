/**
 * Vision Bridge Guardrail.
 * Intercepts image-bearing requests to non-vision models.
 * For individual non-vision models: reroutes to the fastest available vision-capable model.
 * For combos with non-vision targets: extracts descriptions via vision model and replaces images with text.
 * For combos with ZERO vision-capable targets: falls back to whole-request reroute to a
 * vision-capable model (same semantics as an individual text-only model), so image
 * requests do not die in the combo capability filter when describing is impossible.
 */

import { BaseGuardrail, type GuardrailContext, type GuardrailResult } from "./base";
import { getSettings as defaultGetSettings } from "@/lib/db/settings";
import { getResolvedModelCapabilities } from "@/lib/modelCapabilities";
import {
  extractImageParts,
  callVisionModel as defaultCallVisionModel,
  composeVisionPrompt,
  replaceImageParts,
  ensureBase64ImagesForClaudeWire,
} from "./visionBridgeHelpers";
import { fetch as undiciFetch } from "undici";
import {
  getVisionBridgeConfig,
  isVisionBridgeForcedModel,
} from "@/shared/constants/visionBridgeDefaults";
import { resolveVisionBridgeRuntimeSettings } from "@/shared/constants/modalityBridgeDefaults";
import { getBestVisionModel } from "./visionBridgeRouter";
import { bridgeCacheKey, getSharedBridgeCacheFor } from "./modalityBridge/bridgeCache";
import { recordBridgeUse } from "./modalityBridge/bridgeStats";
import {
  isProviderConnectionUsable,
  hasUsableCredentialsForModel,
} from "./visionBridgeCredentials";

export { isProviderConnectionUsable, hasUsableCredentialsForModel };

type ComboVisionBridgeDecision = "process" | "skip" | "not-combo" | "no-vision";

export function resolveVisionComboName(mapping: Record<string, unknown>): string | null {
  const comboName = mapping.comboName ?? mapping.name ?? null;
  return typeof comboName === "string" && comboName.length > 0 ? comboName : null;
}

/// Check if a combo model should trigger vision bridge processing.
/// Resolves combo targets and returns:
/// - "process" if some (but not all) model targets lack proven vision support
/// - "skip" if all model targets can handle images directly
/// - "no-vision" when the combo has model targets but NONE can handle images —
///   the combo behaves like a single text-only model, so the bridge may
///   whole-request reroute to a vision-capable model (mirroring non-combos)
/// - "not-combo" when the model is not a combo/mapping
export async function getComboVisionBridgeDecision(
  model: string
): Promise<ComboVisionBridgeDecision> {
  try {
    const { getComboByName } = await import("@/lib/db/combos");
    const { resolveComboForModel } = await import("@/lib/db/modelComboMappings");

    // 1. Try to find combo by exact name match. The normal Combo resolver also
    // accepts `combo/<name>` for combos stored under their bare name; keep the
    // Vision Bridge capability check on the same lookup path.
    let combo = await getComboByName(model);

    if (!combo && model.startsWith("combo/")) {
      combo = await getComboByName(model.slice("combo/".length));
    }

    // 2. If no exact match, try model-combo mapping
    if (!combo) {
      const mapping = await resolveComboForModel(model);
      if (!mapping) return "not-combo";
      const comboName = resolveVisionComboName(mapping);
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
    // zero vision-capable model steps → "no-vision" (reroute-eligible)
    let hasModelStep = false;
    let hasVisionCapableStep = false;
    let hasNonVisionStep = false;
    for (const step of rawModels) {
      const s = step as Record<string, unknown>;
      if (s.kind === "combo-ref") return "process";
      if (s.kind === "model") {
        hasModelStep = true;
        const targetModel = s.model;
        if (typeof targetModel === "string") {
          const provider =
            typeof s.providerId === "string"
              ? s.providerId
              : typeof s.provider === "string"
                ? s.provider
                : null;
          const caps = getResolvedModelCapabilities({
            provider,
            model: targetModel,
          });
          if (caps.supportsVision === true) {
            hasVisionCapableStep = true;
          } else {
            hasNonVisionStep = true;
          }
        } else {
          return "process";
        }
      }
    }

    // No recognizable steps — don't force bridge
    if (!hasModelStep) return "not-combo";
    // Every model step is proven vision-capable — safe to skip
    if (hasVisionCapableStep && !hasNonVisionStep) return "skip";
    // Mixed combo: some targets lack vision — describe so the combo still answers
    if (hasVisionCapableStep) return "process";
    // Combo exists but NO target can handle images: equivalent to a text-only
    // model, so the whole request may be rerouted to a vision-capable model.
    return "no-vision";
  } catch {
    // On error, try to process images (conservative)
    return "process";
  }
}

/**
 * Extract the text of the LAST user message that carries any (string content,
 * or the first `type: "text"` part of an array content). Used as the
 * task-aware focus hint for the describe path.
 */
function extractLastUserText(messages: unknown[]): string | undefined {
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i] as { role?: unknown; content?: unknown } | null | undefined;
    if (message?.role !== "user") continue;
    if (typeof message.content === "string" && message.content.trim()) {
      return message.content;
    }
    if (Array.isArray(message.content)) {
      for (const part of message.content) {
        const p = part as { type?: unknown; text?: unknown } | null | undefined;
        if (
          (p?.type === "text" || p?.type === "input_text") &&
          typeof p.text === "string" &&
          p.text.trim()
        ) {
          return p.text;
        }
      }
    }
  }
  return undefined;
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
  /**
   * Whether a model string has a usable active credential (true/false).
   * Return `null` when indeterminate (no DB / error) so callers can fail-open.
   */
  hasUsableCredentials?: (model: string) => Promise<boolean | null>;
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

    // 3b. Auto/ prefix — don't skip guardrail entirely. Images still need to be
    // described or rerouted to a vision-capable model. The auto-combo resolver
    // does NOT currently filter models by vision capability, so without the
    // guardrail an image-bearing request assigned to a text-only model will
    // fail upstream with "does not support images".
    const isAuto = model === "auto" || model.startsWith("auto/");

    // Declare before the conditional so they're available to the rest of preCall
    let forceVisionBridge = false;
    let comboVisionBridgeDecision: ComboVisionBridgeDecision | undefined;

    if (!isAuto) {
      forceVisionBridge = isVisionBridgeForcedModel(model);

      // 4. Check if model supports vision
      const capabilities = getResolvedModelCapabilities(model);
      comboVisionBridgeDecision = forceVisionBridge
        ? "process"
        : this.deps.checkModelHasComboMapping
          ? (await this.deps.checkModelHasComboMapping(model))
            ? "process"
            : "skip"
          : await getComboVisionBridgeDecision(model);

      if (comboVisionBridgeDecision === "skip") {
        return { block: false };
      }

      if (capabilities?.supportsVision === true && !forceVisionBridge) {
        // The request model supports vision natively, but check if a
        // model-combo mapping routes this model through a combo where
        // some targets may NOT support vision. In that case, the vision
        // bridge must process images so combo targets can describe them.
        if (comboVisionBridgeDecision !== "process" && comboVisionBridgeDecision !== "no-vision") {
          context.log?.debug?.("VISION_BRIDGE", "Skipping: target model supports vision natively");
          return { block: false };
        }
        // Combo mapping found — fall through to process images
      }
    }
    // For auto models (isAuto=true), force remains false and combo decision
    // remains undefined, which makes the reroute check on line ~189 treat it
    // like a non-combo model — exactly what we want: reroute to a vision model.

    // 5. Get body and normalize Chat Completions `messages` vs Responses `input`.
    // Both containers carry role/content items and are supported by the shared
    // media detector. Preserve the original wire container in modifiedPayload.
    const body = payload as Record<string, unknown>;
    const messages = Array.isArray(body?.messages)
      ? body.messages
      : Array.isArray(body?.input)
        ? body.input
        : null;
    if (!messages || messages.length === 0) {
      return { block: false };
    }

    // 6. Get settings (injectable for testing)
    const getSettings = this.deps.getSettings ?? defaultGetSettings;
    let settings: Record<string, unknown> = {};
    try {
      settings = await getSettings();
    } catch {
      // If getSettings fails, use defaults
    }

    // 7. Resolve runtime settings (new modalityBridge* keys win; legacy
    // visionBridge* keys stay a one-cycle fallback) and check enabled —
    // BEFORE any media traversal, so a disabled bridge never pays the
    // per-request deep scan of every message content part.
    const runtime = resolveVisionBridgeRuntimeSettings(settings);
    if (!runtime.enabled) {
      return { block: false };
    }

    // 8. Check for images using helper (extractImageParts returns empty if no images)
    const imageParts = extractImageParts(messages as Parameters<typeof extractImageParts>[0]);
    if (imageParts.length === 0) {
      return { block: false };
    }

    // 9. Individual non-combo model with images → optionally REROUTE to best vision-capable model
    // instead of describing images through an intermediate vision call.
    //
    // CRITICAL (VibeProxy combo / explicit provider models):
    // When the original model already has usable credentials (e.g. combo target
    // zai/glm-5.2), NEVER whole-request-reroute to another provider. Auto-select
    // prefers opencode-* (priority 0) even when only a broken noauth connection
    // exists, which produced: HTTP log zai → Guardrail reroute → opencode-zen 401
    // "Missing API key" while the combo UI still showed body=zai. Fall through to
    // the image-describe path so the user's chosen model still answers.
    //
    // Reroute also fires for the auto/ prefix (isAuto): the auto-combo resolver
    // does not filter candidates for vision capability, so an image-bearing
    // request with model=auto would land on a text-only model (#7871). Keeping
    // "auto" is never the answer there, so the keep-credentialed-model skip
    // below does not apply to auto — only the reroute-target credential guard.
    const rerouteTextOnly = settings.visionBridgeRerouteTextOnly === true;
    // Reroute when the operator opted in to direct VLM routing for every text-only
    // route (keeps image bytes instead of a lossy bridge description), or when the
    // auto heuristic deems the request eligible. A named combo with ZERO
    // vision-capable targets ("no-vision") is reroute-eligible too: it behaves
    // exactly like a single text-only model, and without this fallback an image
    // request would die in the combo capability filter (capability_mismatch)
    // whenever the describe path cannot run.
    const rerouteEligible =
      rerouteTextOnly ||
      ((comboVisionBridgeDecision === "not-combo" ||
        comboVisionBridgeDecision === "no-vision" ||
        isAuto) &&
        !forceVisionBridge);
    // Forced modes short-circuit BEFORE the auto heuristic (#6640/#7204 untouched):
    // - "describe" skips the whole reroute block → straight to the describe path.
    // - "reroute" skips only the keep-credentialed-model guard; the reroute-target
    //   credential guard still applies, and with no usable target it falls through
    //   to describe (raw images must never reach a text-only backend — #8430).
    if (rerouteEligible && runtime.mode !== "describe") {
      const checkCreds = this.deps.hasUsableCredentials ?? hasUsableCredentialsForModel;
      const originalUsable = runtime.mode === "reroute" ? false : await checkCreds(model);

      if (originalUsable === true && !isAuto && !rerouteTextOnly) {
        // Keep the credentialed model; describe images below if needed.
        context.log?.debug?.(
          "VISION_BRIDGE",
          `Skipping whole-request vision reroute; keeping credentialed model ${model}`
        );
      } else {
        // Honor an explicit operator override from the Vision Bridge settings tab
        // as the fixed reroute target, for consistency with the combo/describe
        // path below (step 10) which always honors it via getVisionBridgeConfig.
        // New modalityBridgeVisionModel wins over legacy visionBridgeModel (same
        // precedence as resolveVisionBridgeRuntimeSettings — runtime.model can't
        // be used here because it backfills the default and this path must
        // auto-select the fastest available vision-capable model when unset).
        const rawConfiguredModel = [
          settings.modalityBridgeVisionModel,
          settings.visionBridgeModel,
        ].find((value): value is string => typeof value === "string" && value.trim().length > 0);
        const configuredModel = rawConfiguredModel?.trim();
        // Propagate the same resolved credential check used by the adjacent
        // checkCreds() calls above/below (#8430) — without this, the router
        // falls back to the real DB-backed hasUsableCredentialsForModel and
        // ignores an injected `deps.hasUsableCredentials` test/DI override.
        const bestModel = await getBestVisionModel(
          { fixedModel: configuredModel },
          { hasUsableCredentials: checkCreds }
        );
        if (bestModel && bestModel !== model) {
          const bestUsable = await checkCreds(bestModel);
          // Only block the reroute when we KNOW the target is unusable (false).
          // `null` (no DB / tests) fails open so existing unit tests keep working.
          // `auto/*` ids (e.g. auto/best-vision) are VIRTUAL combos: credentials
          // resolve through their member models at request time, so a missing
          // "auto" provider row (hasUsableCredentialsForModel → false) must
          // never block the reroute.
          if (bestUsable === false && !bestModel.startsWith("auto/")) {
            context.log?.warn?.(
              "VISION_BRIDGE",
              `Vision reroute target ${bestModel} has no usable credentials; describing images instead of hijacking ${model}`
            );
          } else {
            // Claude-wire backends (minimax, zai, …) reject remote image URLs
            // (MiniMax 403 2013); resolve them to base64 before rerouting so
            // the rerouted request can actually be processed upstream. Use
            // undici fetch to bypass the runtime's hooked global fetch.
            const rerouteBody = await ensureBase64ImagesForClaudeWire(
              body as Parameters<typeof ensureBase64ImagesForClaudeWire>[0],
              bestModel,
              undiciFetch as unknown as typeof fetch
            );
            const modifiedBody = {
              ...(rerouteBody as Record<string, unknown>),
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
        }
      }
      // Fall through: describe images as text (or no-op if describe path can't run)
    }

    // 10. Get configuration — fed from the resolved runtime values so the new
    // modalityBridge* keys are honored; getVisionBridgeConfig keeps producing
    // the same VisionModelConfig shape callVisionModel expects.
    const config = getVisionBridgeConfig({
      visionBridgeEnabled: runtime.enabled,
      visionBridgeModel: runtime.model,
      visionBridgePrompt: runtime.prompt,
      visionBridgeTimeout: runtime.timeoutMs,
      visionBridgeMaxImages: runtime.maxImages,
    });

    // 11. Limit images
    const limitedParts = imageParts.slice(0, config.maxImages);

    // 12. Call vision model for each image in parallel (injectable for testing)
    const callVision = this.deps.callVisionModel ?? defaultCallVisionModel;
    const logger = context.log;
    const startTime = Date.now();

    // Task-aware focus hint: append the LAST user question so the description
    // targets what the user actually asked instead of a generic caption.
    const lastUserText = extractLastUserText(messages);
    const composedPrompt = composeVisionPrompt(config.prompt, lastUserText, runtime.taskAware);
    // Bypass the runtime's hooked global fetch (ProxyFetch) for the self-loop
    // describe call — a dead local proxy (127.0.0.1:8317) would otherwise break
    // every describe. Tests inject their own callVisionModel.
    const describeConfig = {
      ...config,
      prompt: composedPrompt,
      fetchImpl: undiciFetch as unknown as typeof fetch,
    };

    // Shared describe cache (sha256 of contentRef+prompt+model): the same image
    // with the same prompt/model is described once per TTL. Failures are never
    // cached — a throw inside the map happens before the cache write. The model
    // component is the CONFIGURED bridge model (config.model — the bridge-config
    // identity), not the model that actually produced the description:
    // callVisionModel may fall back internally to another vision model, and
    // keying by attempt would fragment the cache and leak router state into the
    // key. Intentional and stable — do not "fix" this to key per attempt.
    //
    // The prompt component is the BASE prompt (`config.prompt`), deliberately
    // NOT the task-aware composed prompt (`composedPrompt`): the composed
    // prompt appends the LAST user text, which changes on every conversation
    // turn. Zoo Code / Claude Code clients resend the FULL transcript each
    // turn, so a text-only follow-up still carries the turn-1 image in the
    // history — the bridge re-enters the describe path — but if the key
    // changed with each new turn it would miss the cache and re-call the
    // vision model (e.g. mimo-v2.5) for byte-identical images. Keying on the
    // stable base prompt makes an unchanged history image reuse the cached
    // description; a genuinely NEW image has a different contentRef and still
    // misses. The task-aware prompt is what the vision model actually receives
    // on the first describe, so no description quality is lost.
    const cache = runtime.cacheEnabled ? getSharedBridgeCacheFor(runtime) : null;

    // Process all images in parallel using Promise.allSettled for fail-partial behavior
    const results = await Promise.allSettled(
      limitedParts.map(async (imagePart, i) => {
        const key = cache ? bridgeCacheKey(imagePart.imageUrl, config.prompt, config.model) : null;
        const cached = key && cache ? cache.get(key) : undefined;
        const description = cached ?? (await callVision(imagePart.imageUrl, describeConfig));
        if (cached === undefined && key && cache) cache.set(key, description);
        recordBridgeUse("vision", { cacheHit: cached !== undefined });
        const capped =
          runtime.maxChars > 0 && description.length > runtime.maxChars
            ? description.slice(0, runtime.maxChars) + "…"
            : description;
        return `[Image ${i + 1}]: ${capped}`;
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
      recordBridgeUse("vision", { failure: true });
      return null;
    });

    // 12b. (#8430) When every describe call failed (all null descriptions) in
    // the combo describe path, the upstream is a confirmed non-vision model that
    // cannot process raw images — replacing them with an "(unavailable)" stub
    // is safe here because the upstream can only handle text. The original #4012
    // preserve-raw behavior only applies to paths where the upstream might still
    // be vision-capable (reroute path / unknown capability).
    // "no-vision" combos are included for the same reason: with ZERO
    // vision-capable targets, the combo capability filter rejects raw images
    // outright (capability_mismatch), so stub text is strictly better than
    // preserving bytes no combo target can consume.
    const allNull = descriptions.every((d) => d === null);
    if (
      allNull &&
      (comboVisionBridgeDecision === "process" || comboVisionBridgeDecision === "no-vision")
    ) {
      for (let i = 0; i < descriptions.length; i++) {
        descriptions[i] = `[Image ${i + 1}]: (unavailable — no vision-capable provider connected)`;
      }
    }

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
