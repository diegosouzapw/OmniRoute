/**
 * Devin CLI providers whose upstream catalog embeds the reasoning tier IN the
 * model id itself: `claude-opus-5-low`, `claude-opus-5-medium`, … and
 * `gpt-5-6-sol-max` / `gpt-5-6-sol-low` are distinct upstream models
 * (see `config/providers/registry/devin/catalog.ts`). For these providers a
 * trailing `-{effort}` suffix is NOT a client-side effort variant:
 *
 *  - stripping it (`applyClaudeEffortVariant`) would dispatch a base id that
 *    does not exist upstream — e.g. `dva/claude-opus-5-low` became
 *    `claude-opus-5` and the executor rejected it with
 *    "Model is not present in the current Devin catalog";
 *  - synthesizing variants on top of tier-embedded ids produces phantom ids
 *    (`claude-opus-5-max-low`) that cannot route once the strip is fixed.
 *
 * Ids here cover the provider id and its routing alias, so both canonical and
 * alias-prefixed qualified model ids are recognized.
 */

const DEVIN_LITERAL_MODEL_ID_PROVIDERS = new Set([
  "devin-cli",
  "devin-cli-agentic",
  "devin-desktop",
]);
const DEVIN_LITERAL_MODEL_ID_ALIASES = new Set(["dv", "dva"]);

function bareProviderToken(value: string): string {
  const slash = value.indexOf("/");
  return slash >= 0 ? value.slice(0, slash) : value;
}

/**
 * True when `provider` (a provider id or alias, optionally `provider/model`
 * qualified) serves a Devin catalog whose model ids embed the effort tier and
 * must therefore be treated as literal ids.
 */
export function isDevinLiteralModelIdProvider(provider: string | null | undefined): boolean {
  if (typeof provider !== "string" || provider.length === 0) return false;
  const token = bareProviderToken(provider);
  return DEVIN_LITERAL_MODEL_ID_PROVIDERS.has(token) || DEVIN_LITERAL_MODEL_ID_ALIASES.has(token);
}
