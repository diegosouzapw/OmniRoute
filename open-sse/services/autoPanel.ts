/**
 * Auto-panel resolver for the AI Council / debate strategy.
 *
 * When a council request omits an explicit `models[]` panel, the panel is
 * derived from *every model currently connected and healthy* — one representative
 * model per active provider connection. This is the "use full models" mode: the
 * operator connects providers once, and the council fans out across all of them
 * without having to name each model by hand.
 *
 * DRY: this reuses `createVirtualAutoCombo` — the exact same connected-model
 * enumeration the `auto` combo strategy (and `model:"auto"`) already uses. It
 * honours all the same gates (blocked providers, disabled no-auth rows, hidden
 * models, opt-in paid-only filtering, usable-credential check). We do NOT
 * reinvent connection enumeration here.
 *
 * The returned list is deduplicated (a provider can back several connections that
 * resolve to the same model string) and capped at `maxPanel` so a large fleet
 * cannot OOM the parallel fan-out (the same guard fusion/debate enforce).
 */
import { createVirtualAutoCombo, type AutoComboSpec } from "./autoCombo/virtualFactory.ts";
import type { AutoVariant } from "./autoCombo/autoPrefix.ts";
import { DEBATE_DEFAULTS } from "./debate.ts";
import type { ComboLogger } from "./combo/types.ts";

export type ResolveAutoPanelOptions = {
  /** Hard cap on panel size (OOM guard). Defaults to DEBATE_DEFAULTS.maxPanel. */
  maxPanel?: number;
  /** Optional `auto/<category>:<tier>` or `auto/<family>` overlay to narrow the pool. */
  spec?: AutoComboSpec;
  /** Optional auto variant (e.g. "fast"); passed through to createVirtualAutoCombo. */
  variant?: AutoVariant;
  /** Logger for diagnostics; optional. */
  log?: ComboLogger;
};

/**
 * Resolve the council panel from all currently connected, healthy models.
 *
 * @returns a deduplicated list of `provider/model` strings, capped at `maxPanel`.
 *          Empty array when no provider is connected with usable credentials —
 *          callers must treat an empty panel as "cannot run" (400/503).
 */
export async function resolveAutoPanel(
  opts: ResolveAutoPanelOptions = {}
): Promise<string[]> {
  const maxPanel =
    typeof opts.maxPanel === "number" && opts.maxPanel > 0
      ? Math.floor(opts.maxPanel)
      : DEBATE_DEFAULTS.maxPanel;

  const combo = await createVirtualAutoCombo(opts.variant, opts.spec);

  const seen = new Set<string>();
  const panel: string[] = [];
  for (const entry of combo.models) {
    const modelStr = entry.model;
    if (typeof modelStr !== "string" || modelStr.length === 0) continue;
    if (seen.has(modelStr)) continue;
    seen.add(modelStr);
    panel.push(modelStr);
    if (panel.length >= maxPanel) break;
  }

  if (panel.length === 0) {
    opts.log?.warn(
      "COUNCIL",
      "Auto-panel resolved to 0 connected models — no provider has usable credentials"
    );
  } else if (combo.models.length > panel.length) {
    opts.log?.info(
      "COUNCIL",
      `Auto-panel capped at ${panel.length}/${combo.models.length} connected models (maxPanel=${maxPanel})`
    );
  }

  return panel;
}
