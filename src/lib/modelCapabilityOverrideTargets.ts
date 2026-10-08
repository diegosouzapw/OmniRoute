/**
 * Pure catalog → Model Override target conversion.
 *
 * The operator-facing Model Overrides surface must present a compatible
 * provider node under its configured public `prefix` (e.g. `vibeproxy/gpt-4o`)
 * — never the generated `openai-compatible-chat-<uuid>` node id (#9557).
 *
 * The pricing catalog keeps the internal `id` (the DB node id, which PricingTab
 * uses to key pricing data) and, when the node has a configured prefix, also
 * carries `displayPrefix`. This helper prefers `displayPrefix` for the public
 * label/target while leaving the raw id untouched for storage/runtime lookup.
 *
 * Model-Overrides eligibility seam: a compatible provider node is eligible only
 * when it is the unique, non-reserved runtime-routable winner of its configured
 * prefix. The catalog marks such winners with `modelOverrideEligible === true`
 * (and a `displayPrefix`); reserved/losing/no-public-prefix compatible nodes are
 * marked `modelOverrideEligible === false` and are SKIPPED — never surfaced
 * under a generated node UUID. Built-in / no-compatible catalog entries carry no
 * flag and remain targetable.
 */

export interface PricingCatalogModel {
  id: string;
  name: string;
}

export interface PricingCatalogProvider {
  id: string;
  alias: string;
  displayPrefix?: string;
  /** Explicit Model-Overrides eligibility; undefined ⇒ eligible (built-in/no-compatible). */
  modelOverrideEligible?: boolean;
  models: PricingCatalogModel[];
}

export interface ModelOverrideTarget {
  target: string;
  provider: string;
  modelId: string;
  label: string;
}

/**
 * Whether a catalog provider is targetable in Model Overrides. Only compatible
 * nodes marked ineligible (reserved/losing/no-public-prefix) are skipped; all
 * built-in and no-compatible entries are eligible.
 */
export function isModelOverrideEligible(provider: PricingCatalogProvider): boolean {
  return provider.modelOverrideEligible !== false;
}

/**
 * Public display prefix for a compatible provider node, falling back to its
 * internal id when no operator-configured prefix is set.
 */
export function modelOverrideProviderPrefix(provider: PricingCatalogProvider): string {
  return provider.displayPrefix?.trim() || provider.id;
}

/**
 * Convert the /api/pricing/models catalog into Model Override targets. Each
 * target uses the node's public prefix (when configured) so the selector,
 * search, selected model, and the target sent to the override API never expose
 * a generated node UUID. Ineligible compatible nodes are skipped entirely.
 */
import { normalizeForSearch } from "@/shared/utils/turkishText";

export function toModelOverrideTargets(
  catalog: Record<string, PricingCatalogProvider>
): ModelOverrideTarget[] {
  return Object.values(catalog).flatMap((provider) => {
    if (!isModelOverrideEligible(provider)) return [];
    const prefix = modelOverrideProviderPrefix(provider);
    return provider.models.map((model) => ({
      target: `${prefix}/${model.id}`,
      provider: prefix,
      modelId: model.id,
      label: `${prefix}/${model.id}`,
    }));
  });
}

/** Window for the default (unfiltered) picker view. Unchanged UX. */
const DEFAULT_MODEL_OVERRIDE_TARGET_WINDOW = 80;

/**
 * Window for a filtered view. Wide enough that a matched provider's full model
 * list can never be crowded out of the window by sibling providers whose names
 * merely share a substring (413 providers / 12.8k+ targets today; `bai` alone
 * renders 58 rows).
 */
const FILTERED_MODEL_OVERRIDE_TARGET_WINDOW = 300;

/**
 * Relevance tiers for a query match; higher sorts first.
 *
 * The picker's search is a plain substring match across provider/model/label,
 * so a short query like `bai` also matches `baichuan`, `bailian-coding-plan`,
 * `baidu`, and `bailing` — and the old fixed `slice(0, 80)` cut in catalog
 * order, hiding the intended provider (provider #233 of 413) behind its
 * alphabetically-lucky neighbors. Scoring encodes operator intent:
 * exact provider match > provider-scoped form (`bai/`) > provider prefix >
 * model-id prefix > plain substring.
 */
function scoreModelOverrideTarget(target: ModelOverrideTarget, query: string): number {
  const provider = normalizeForSearch(target.provider);
  const modelId = normalizeForSearch(target.modelId);
  const label = normalizeForSearch(target.label);

  // Parity with the previous filter: same fields, same substring semantics.
  if (!(provider.includes(query) || modelId.includes(query) || label.includes(query))) {
    return 0;
  }

  if (provider === query) return 1000;
  // Tiers: scoped form `bai/` (900) > provider prefix (800) > model-id
  // prefix (600) > plain substring (200).
  if (query.endsWith("/") && normalizeForSearch(target.target).startsWith(query)) {
    return 900;
  }
  if (provider.startsWith(query)) return 800;
  if (modelId.startsWith(query)) return 600;
  return 200;
}

/**
 * Filter and rank Model Override targets for the picker's search box.
 *
 * - No query: first 80 targets in catalog order (previous behavior, unchanged).
 * - With a query: same substring fields as before, ranked by relevance so the
 *   intended provider leads, windowed at 300 so a full provider match is never
 *   crowded out by weaker matches.
 *
 * Ties keep catalog order (explicit index tiebreak, not sort stability).
 */
export function filterModelOverrideTargets(
  targets: readonly ModelOverrideTarget[],
  query: string
): ModelOverrideTarget[] {
  const q = normalizeForSearch(query);
  const cap = q ? FILTERED_MODEL_OVERRIDE_TARGET_WINDOW : DEFAULT_MODEL_OVERRIDE_TARGET_WINDOW;
  if (!q) return targets.slice(0, cap);

  const scored: Array<{ target: ModelOverrideTarget; score: number; index: number }> = [];
  for (let index = 0; index < targets.length; index++) {
    const target = targets[index];
    const score = scoreModelOverrideTarget(target, q);
    if (score > 0) scored.push({ target, score, index });
  }
  scored.sort((a, b) => b.score - a.score || a.index - b.index);
  return scored.slice(0, cap).map((entry) => entry.target);
}
