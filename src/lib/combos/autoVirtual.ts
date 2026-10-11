/**
 * @file autoVirtual.ts
 * @description Shared helpers for materializing built-in `auto/*` virtual combos
 * in dashboard/API read paths (auto catalog, control center, combo test probes).
 * Virtual auto combos have no persisted row — they are resolved live from the
 * currently connected providers/models, same as request-time routing.
 */

/**
 * True when `id` addresses a built-in virtual auto combo rather than a
 * persisted combo row — either the bare default `auto` or an `auto/<suffix>` id
 * (variants, `auto/<category>[:<tier>]`, `auto/<family>`).
 */
export function isAutoComboId(id: string): boolean {
  return id === "auto" || id.startsWith("auto/");
}

/**
 * Resolve an `auto` / `auto/*` id into its live virtual combo using the same
 * built-in catalog as request-time routing. Throws for ids the runtime would
 * not resolve.
 */
export async function materializeAutoCombo(modelStr: string) {
  if (!isAutoComboId(modelStr)) {
    throw new Error(`Not an auto combo id: ${modelStr}`);
  }
  if (modelStr === "auto") {
    const { createVirtualAutoCombo } =
      await import("@omniroute/open-sse/services/autoCombo/virtualFactory");
    const combo = await createVirtualAutoCombo(undefined);
    combo.name = modelStr;
    combo.id = modelStr;
    return combo;
  }
  const { createBuiltinAutoCombo } =
    await import("@omniroute/open-sse/services/autoCombo/builtinCatalog");
  return createBuiltinAutoCombo(modelStr, modelStr.slice("auto/".length));
}
