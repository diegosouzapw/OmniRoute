import type { AutoVariant } from "./autoPrefix";
import { VALID_VARIANTS } from "./autoPrefix";

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
};

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

export async function createBuiltinAutoCombo(modelStr: string, suffix: string) {
  const resolved = resolveAutoVariant(modelStr, suffix);
  if (!resolved.recognized) {
    throw new Error(`Unknown built-in auto combo: ${modelStr}`);
  }

  const { createVirtualAutoCombo } = await import("./virtualFactory.ts");
  const virtualCombo = await createVirtualAutoCombo(resolved.variant);
  virtualCombo.name = modelStr;
  virtualCombo.id = modelStr;
  return virtualCombo;
}
