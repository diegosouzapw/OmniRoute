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

import { isCcDiscoveryAlias } from "./ccDiscoveryAliases.ts";

export const FUNCTIONAL_GATEWAY_MIRROR_SUFFIX = " (via ";

// Kept local (not imported from noThinkingAlias.ts) so this pure helper stays
// free of the model-spec dependency that module pulls in.
const NO_THINKING_PREFIX = "no-think/";

const FUNCTIONAL_GATEWAY_MIRROR = Symbol("functionalGatewayMirror");

export interface FunctionalGatewayMirrorsDeps {
  /** Ordered list of passthrough gateway provider ids to consider as mirrors. */
  gatewayProviderIds: string[];
  /** True when `provider` is a passthrough gateway that can route arbitrary models. */
  isGateway(provider: string): boolean;
  /** Map a gateway provider id to its catalog alias (e.g. "command-code" -> "cmd"). */
  gatewayAlias(provider: string): string;
  /**
   * True when `gatewayProvider` has an eligible connection that covers `modelId`.
   * `modelId` is the full original id (e.g. `oc/big-pickle`): the mirror is
   * `<gatewayAlias>/<originalId>`, so that is exactly what the gateway receives.
   */
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
    const modelId = id.slice(slashIndex + 1);
    if (!modelId || modelId === id) continue;
    // Combos (incl. built-in `auto/*`) are resolved by OmniRoute itself, not by any
    // provider — a gateway cannot route them, so a mirror would be advertised-but-dead.
    if (model.owned_by === "combo") continue;
    // Same for OmniRoute-synthesized ids: a `claude/…` discovery alias and a
    // `no-think/…` variant only resolve through OmniRoute's own prefix handling,
    // which runs on the leading segment — behind a gateway prefix the upstream
    // gateway receives the synthetic id verbatim and rejects it.
    if (isCcDiscoveryAlias(model) || id.startsWith(NO_THINKING_PREFIX)) continue;
    // The id prefix is not always the owner's provider id: in `dual`/`alias` catalog
    // modes it is the short alias (`cx/…` for codex) or a synthetic namespace
    // (`no-think/…`). Checking that prefix against the connection table always
    // misses, so every such model got a dead `<gateway>/<id>` mirror even though its
    // real owner was connected. `owned_by` carries the real provider id.
    const owner =
      typeof model.owned_by === "string" && model.owned_by
        ? model.owned_by
        : id.slice(0, slashIndex);

    // Skip if the canonical owner already has a working connection for this model.
    if (deps.canonicalOwnerHasConnection(owner)) continue;

    // Find a passthrough gateway that actually routes this model AND has a credential.
    let chosenAlias: string | null = null;
    let chosenProvider: string | null = null;
    for (const gatewayProvider of deps.gatewayProviderIds) {
      const alias = deps.gatewayAlias(gatewayProvider);
      if (!alias || alias === owner || gatewayProvider === owner) continue;
      if (!deps.isGateway(gatewayProvider)) continue;
      if (!deps.gatewayHasConnection(gatewayProvider)) continue;
      if (!deps.gatewayCovers(gatewayProvider, id)) continue;
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
