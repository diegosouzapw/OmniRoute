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
