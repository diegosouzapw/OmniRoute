import type { ModelCapabilityResolutionSnapshot } from "@/lib/modelCapabilities";

import type { AutoVariant } from "./autoPrefix";
import { VALID_VARIANTS } from "./autoPrefix";
import type { PreparedVirtualAutoComboInputs } from "./virtualFactory";
import { parseAutoSuffix, type AutoCategory, type AutoTier } from "./suffixComposition";
import { isValidModelFamily, AUTO_FAMILY_IDS } from "./modelFamily";

export { AUTO_FAMILY_IDS };

/**
 * Built-in `auto/*` catalog → AutoVariant resolution.
 *
 * The dashboard advertises a zero-setup `auto/*` catalog (e.g. `auto/best-coding`).
 * Each catalog id maps to a router variant and is materialized into a virtual
 * auto-combo on demand via `createVirtualAutoCombo`, without requiring persisted DB
 * combo rows. Extracted from `chatHelpers.ts` so that handler stays under the
 * file-size cap and the catalog lives alongside the rest of the autoCombo service.
 */

export const VALID_AUTO_VARIANTS = new Set<AutoVariant>(VALID_VARIANTS);

export const AUTO_TEMPLATE_VARIANTS: Record<string, AutoVariant | undefined> = {
  "auto/best-coding": "coding",
  "auto/best-reasoning": "smart",
  "auto/best-fast": "fast",
  "auto/best-vision": "smart",
  "auto/best-chat": undefined,
  "auto/best-coding-fast": "fast",
  "auto/pro-coding": "coding",
  "auto/pro-reasoning": "smart",
  "auto/pro-vision": "smart",
  "auto/pro-chat": undefined,
  "auto/pro-fast": "fast",
  "auto/coding": "coding",
  "auto/fast": "fast",
  "auto/chat": undefined,
  // #4235 Phase A: these are valid variants (parseAutoPrefix accepts them) and
  // the README advertises them, but they were missing from this catalog so
  // `/v1/models` + the dashboard never listed them. Surface them explicitly.
  "auto/cheap": "cheap",
  "auto/offline": "offline",
  "auto/smart": "smart",
  "auto/claude-opus": "smart",
  "auto/claude-sonnet": "coding",
  "auto/claude-haiku": "fast",
  "auto/best-free": "cheap",
  // Subscription-first routing (see `subscriptionLadder.ts`). `auto/subscription`
  // maps to no weight variant on purpose: its pool is already restricted to
  // plan-included connections, so the scorer should rank them on merit rather
  // than bias toward cheap/fast within an allowance the operator already paid for.
  "auto/subscription": undefined,
  "auto/thrifty": "cheap",
  // Chaos mode — parallel dispatch to top-N stable models
  "auto/best-chaos": "chaos",
  "auto/chaos": "chaos",
};

/**
 * #4235 Phase B — curated `auto/<category>[:<tier>]` combos advertised in `/v1/models`
 * and the dashboard. ANY valid `auto/<category>:<tier>` resolves on demand (so clients
 * can ask for combinations not listed here); this curated set keeps the advertised
 * catalog from exploding into the full category × tier matrix.
 */
export const AUTO_SUFFIX_VARIANTS: string[] = [
  "auto/coding:fast",
  "auto/coding:cheap",
  "auto/coding:free",
  "auto/coding:pro",
  "auto/coding:reliable",
  "auto/reasoning",
  "auto/reasoning:pro",
  "auto/vision",
  "auto/multimodal",
];

/**
 * Flat `auto/*` ids that carry a tier overlay even though they are not written
 * in `<category>:<tier>` form. `auto/best-free` established the pattern; the
 * two subscription-first ids reuse it so a caller can ask for the behavior
 * without also having to pick a category.
 */
export const FLAT_TIER_OVERLAY_IDS: Record<string, AutoTier> = {
  "auto/best-free": "free",
  "auto/subscription": "subscription",
  "auto/thrifty": "thrifty",
};

type ResolvedAutoVariant =
  { recognized: true; variant: AutoVariant | undefined } | { recognized: false };

export function resolveAutoVariant(modelStr: string, suffix: string): ResolvedAutoVariant {
  if (Object.prototype.hasOwnProperty.call(AUTO_TEMPLATE_VARIANTS, modelStr)) {
    return { recognized: true, variant: AUTO_TEMPLATE_VARIANTS[modelStr] };
  }
  if (VALID_AUTO_VARIANTS.has(suffix as AutoVariant)) {
    return { recognized: true, variant: suffix as AutoVariant };
  }
  return { recognized: false };
}

/**
 * Recognize any built-in `auto/*` id: a flat-variant template (legacy) OR a
 * `auto/<category>[:<tier>]` suffix (#4235 Phase B). Used by the chat handler to
 * decide whether an `auto/` model is a valid built-in before materializing it.
 */
export function isRecognizedBuiltinAuto(modelStr: string, suffix: string): boolean {
  return (
    resolveAutoVariant(modelStr, suffix).recognized ||
    parseAutoSuffix(suffix).valid ||
    isValidModelFamily(suffix)
  );
}

/**
 * #6328 (follow-up to #6495 / #6512): recognize built-in `auto/*` ids whose
 * intent is paid-tier only, so callers can REMOVE — not just hide — them from
 * advertised catalogs when the operator opts into `hidePaidModels`.
 *
 * Two shapes qualify as paid-tier:
 *   - flat variants prefixed `auto/pro-*` (e.g. `auto/pro-coding`)
 *   - suffix variants with the `:pro` tier (e.g. `auto/coding:pro`)
 *
 * Non-`pro` `auto/*` ids (auto/coding, auto/best-*, auto/coding:free, …) keep
 * their advertised status; the candidate-pool filter in `virtualFactory` (#6512)
 * already excludes paid backends from them at request time. `auto/<family>` ids
 * are unaffected — the family is a backend selector, not a tier.
 */
export function isPaidTierAutoId(autoId: string): boolean {
  if (typeof autoId !== "string" || !autoId.startsWith("auto/")) return false;
  const suffix = autoId.slice("auto/".length);
  if (suffix.startsWith("pro-")) return true;
  const parsed = parseAutoSuffix(suffix);
  return parsed.valid && parsed.tier === "pro";
}

/**
 * Resolved spec for a built-in `auto/*` id: either a flat variant (legacy) or
 * a category/tier overlay (#4235 Phase B). Category `vision`/`multimodal` adds
 * a candidate filter so the virtual combo only scores vision-capable models.
 */
export type BuiltinAutoSpec =
  { variant: AutoVariant | undefined } | { category: AutoCategory; tier?: AutoTier };

/**
 * Vision-flavored flat ids that MUST resolve to the `vision` category (candidate
 * filter by capability), not to a flat variant: the vision-bridge guardrail and
 * its self-loop depend on `auto/best-vision` picking a model that can actually
 * see images. Mapping it to `smart` scored ALL candidates and resolved to
 * text-only models (e.g. deepseek-v4-flash-free), breaking every describe call.
 */
const VISION_CATEGORY_AUTO_IDS: Record<string, { category: "vision"; tier?: AutoTier }> = {
  "auto/best-vision": { category: "vision" },
  "auto/pro-vision": { category: "vision", tier: "pro" },
};

/**
 * Pure resolver for a built-in `auto/*` id. Extracted from
 * `createBuiltinAutoCombo` so the catalog mapping is unit-testable without
 * materializing a virtual combo (which requires the DB).
 */
export function resolveBuiltinAutoSpec(modelStr: string, suffix: string): BuiltinAutoSpec {
  const visionSpec = VISION_CATEGORY_AUTO_IDS[modelStr];
  if (visionSpec) return visionSpec;

  const resolved = resolveAutoVariant(modelStr, suffix);
  if (resolved.recognized) {
    return { variant: resolved.variant };
  }

  const parsed = parseAutoSuffix(suffix);
  if (parsed.valid) {
    return {
      category: parsed.category as AutoCategory,
      ...(parsed.tier ? { tier: parsed.tier } : {}),
    };
  }

  return { variant: undefined };
}

export async function prepareBuiltinAutoComboInputs(
  resolutionSnapshot?: ModelCapabilityResolutionSnapshot
): Promise<PreparedVirtualAutoComboInputs> {
  const { prepareVirtualAutoComboInputs } = await import("./virtualFactory.ts");
  return prepareVirtualAutoComboInputs({
    includeResolvedCapabilities: true,
    resolutionSnapshot,
  });
}

export async function createBuiltinAutoCombo(
  modelStr: string,
  suffix: string,
  prepared?: PreparedVirtualAutoComboInputs
) {
  const { createVirtualAutoCombo, createVirtualAutoComboFromPrepared } =
    await import("./virtualFactory.ts");
  const materialize = (
    variant: AutoVariant | undefined,
    spec?: Parameters<typeof createVirtualAutoCombo>[1]
  ) =>
    prepared
      ? createVirtualAutoComboFromPrepared(prepared, variant, spec)
      : createVirtualAutoCombo(variant, spec);

  const spec = resolveBuiltinAutoSpec(modelStr, suffix);

  if ("category" in spec) {
    // #4235 Phase B category/tier path (incl. vision ids like auto/best-vision).
    const virtualCombo = await materialize(undefined, {
      category: spec.category,
      ...(spec.tier ? { tier: spec.tier } : {}),
    });
    virtualCombo.name = modelStr;
    virtualCombo.id = modelStr;
    return virtualCombo;
  }

  if ("variant" in spec && spec.variant !== undefined) {
    const overlayTier = FLAT_TIER_OVERLAY_IDS[modelStr];
    const virtualCombo = await materialize(spec.variant, {
      ...(overlayTier ? { tier: overlayTier } : {}),
    });
    virtualCombo.name = modelStr;
    virtualCombo.id = modelStr;
    return virtualCombo;
  }

  // Advertised `auto/*` ids whose template maps to no variant (auto/chat,
  // auto/best-chat, auto/pro-chat) still materialize via the default
  // (unconstrained) virtual combo rather than throwing "Unknown built-in".
  if (Object.prototype.hasOwnProperty.call(AUTO_TEMPLATE_VARIANTS, modelStr)) {
    const overlayTier = FLAT_TIER_OVERLAY_IDS[modelStr];
    const virtualCombo = await materialize(
      undefined,
      overlayTier ? { tier: overlayTier } : undefined
    );
    virtualCombo.name = modelStr;
    virtualCombo.id = modelStr;
    return virtualCombo;
  }

  // #4235 Phase B: `auto/<category>[:<tier>]` (e.g. auto/coding:fast, auto/vision).
  const parsed = parseAutoSuffix(suffix);
  if (parsed.valid) {
    const virtualCombo = await materialize(undefined, {
      category: parsed.category,
      tier: parsed.tier,
    });
    virtualCombo.name = modelStr;
    virtualCombo.id = modelStr;
    return virtualCombo;
  }

  // #6453: `auto/<family>` (e.g. auto/glm, auto/minimax, auto/zai, auto/mimo,
  // auto/gemma, auto/llama, auto/gemini) — spans whatever installed backends
  // currently expose that model family, degrading gracefully as backends rotate.
  if (isValidModelFamily(suffix)) {
    const virtualCombo = await materialize(undefined, { family: suffix });
    virtualCombo.name = modelStr;
    virtualCombo.id = modelStr;
    return virtualCombo;
  }

  throw new Error(`Unknown built-in auto combo: ${modelStr}`);
}
