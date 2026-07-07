import type { AutoVariant } from "./autoPrefix";
import { VALID_VARIANTS } from "./autoPrefix";
import { parseAutoSuffix } from "./suffixComposition";
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
  "auto/best-free": "cheap",
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

type ResolvedAutoVariant =
  | { recognized: true; variant: AutoVariant | undefined }
  | { recognized: false };

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

export async function createBuiltinAutoCombo(modelStr: string, suffix: string) {
  const { createVirtualAutoCombo } = await import("./virtualFactory.ts");

  const resolved = resolveAutoVariant(modelStr, suffix);
  if (resolved.recognized) {
    const spec = modelStr === "auto/best-free" ? { tier: "free" as const } : undefined;
    const virtualCombo = await createVirtualAutoCombo(resolved.variant, spec);
    virtualCombo.name = modelStr;
    virtualCombo.id = modelStr;
    return virtualCombo;
  }

  // #4235 Phase B: `auto/<category>[:<tier>]` (e.g. auto/coding:fast, auto/vision).
  const parsed = parseAutoSuffix(suffix);
  if (parsed.valid) {
    const virtualCombo = await createVirtualAutoCombo(undefined, {
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
    const virtualCombo = await createVirtualAutoCombo(undefined, { family: suffix });
    virtualCombo.name = modelStr;
    virtualCombo.id = modelStr;
    return virtualCombo;
  }

  throw new Error(`Unknown built-in auto combo: ${modelStr}`);
}
