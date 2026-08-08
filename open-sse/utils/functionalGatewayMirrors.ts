/**
 * Functional gateway mirrors (`<gateway-alias>/<original-id>` mirror entries).
 *
 * /v1/models announces each model under its canonical owner provider
 * (`deepseek/deepseek-v4-flash`). But the owner may have NO active credential
 * while a passthrough gateway provider (e.g. agentrouter / openrouter) DOES and
 * routes the same model. Discovery clients (omp, jcode, etc.) then see a model
 * that fails on request, and never the route that works.
 *
 * This module synthesizes a mirror entry under the functional gateway alias:
 *
 *     <gateway-alias>/<original-id>     e.g. agentrouter/deepseek/deepseek-v4-flash
 *
 * The request path already resolves any known provider prefix
 * (open-sse/services/model.ts::resolveProviderAlias), so the mirror is
 * immediately routable with no request-side change. Pure synthesis over the
 * already key-filtered list — no I/O.
 */

export const FUNCTIONAL_GATEWAY_MIRROR_SUFFIX = " (via ";

const FUNCTIONAL_GATEWAY_MIRROR = Symbol("functionalGatewayMirror");

export interface FunctionalGatewayMirrorsDeps {
  /** Ordered list of passthrough gateway provider ids to consider as mirrors. */
  gatewayProviderIds: string[];
  /** True when `provider` is a passthrough gateway that can route arbitrary models. */
  isGateway(provider: string): boolean;
  /** Map a gateway provider id to its catalog alias (e.g. "command-code" -> "cmd"). */
  gatewayAlias(provider: string): string;
  /** True when `gatewayProvider` has an eligible connection that covers `modelId`. */
  gatewayCovers(gatewayProvider: string, modelId: string): boolean;
  /** True when `gatewayProvider` has an active credential/connection. */
  gatewayHasConnection(gatewayProvider: string): boolean;
  /** True when the canonical owner `provider` has an eligible connection for the model. */
  canonicalOwnerHasConnection(provider: string): boolean;
}

interface GatewayMirrorCatalogEntry {
  id?: unknown;
  owned_by?: unknown;
  root?: unknown;
  name?: unknown;
  display_name?: unknown;
  [FUNCTIONAL_GATEWAY_MIRROR]?: true;
  [key: string]: unknown;
}

export function isFunctionalGatewayMirror(model: GatewayMirrorCatalogEntry): boolean {
  return model?.[FUNCTIONAL_GATEWAY_MIRROR] === true;
}

/**
 * Append `<gatewayAlias>/<originalId>` mirror entries for every eligible model.
 * Returns the original array reference unchanged when nothing is eligible.
 */
export function appendFunctionalGatewayMirrors<T extends GatewayMirrorCatalogEntry>(
  models: T[],
  deps: FunctionalGatewayMirrorsDeps
): T[] {
  if (!Array.isArray(models)) return models;

  const aliases: T[] = [];
  for (const model of models) {
    const id = model.id;
    if (typeof id !== "string" || id.length === 0) continue;

    const slashIndex = id.indexOf("/");
    if (slashIndex <= 0) continue; // no provider prefix to re-home
    const owner = id.slice(0, slashIndex);
    const modelId = id.slice(slashIndex + 1);
    if (!modelId || modelId === id) continue;

    // Skip if the canonical owner already has a working connection for this model.
    if (deps.canonicalOwnerHasConnection(owner)) continue;

    // Find a passthrough gateway that actually routes this model AND has a credential.
    let chosenAlias: string | null = null;
    let chosenProvider: string | null = null;
    for (const gatewayProvider of deps.gatewayProviderIds) {
      const alias = deps.gatewayAlias(gatewayProvider);
      if (!alias || alias === owner) continue;
      if (!deps.isGateway(gatewayProvider)) continue;
      if (!deps.gatewayHasConnection(gatewayProvider)) continue;
      if (!deps.gatewayCovers(gatewayProvider, modelId)) continue;
      chosenAlias = alias;
      chosenProvider = gatewayProvider;
      break;
    }
    if (!chosenAlias || !chosenProvider) continue;

    const aliasId = `${chosenAlias}/${id}`;
    // Skip if the mirror already exists in the list.
    if (models.some((m) => m.id === aliasId)) continue;
    // Skip if the id already starts with this gateway alias (would double-prefix).
    if (id.startsWith(`${chosenAlias}/`)) continue;

    const label = typeof model.name === "string" && model.name ? model.name : modelId;
    aliases.push({
      ...model,
      id: aliasId,
      root: id,
      owned_by: chosenProvider,
      display_name: `${label}${FUNCTIONAL_GATEWAY_MIRROR_SUFFIX}${chosenProvider})`,
      [FUNCTIONAL_GATEWAY_MIRROR]: true,
    } as T);
  }

  return aliases.length > 0 ? [...models, ...aliases] : models;
}
