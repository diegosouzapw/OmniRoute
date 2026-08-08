/**
 * catalogResponse.ts — the tail of the /v1/models build: the post-filter chain and
 * the response envelope.
 *
 * Extracted from catalog.ts so the full catalog build and the quota-exclusive
 * short-circuit share one implementation. Two paths emitting the same envelope by
 * copy would drift; the quota path in particular silently lost the discovery
 * mirrors the first time it was written as a duplicate.
 */

import { appendNoThinkingVariants } from "@omniroute/open-sse/utils/noThinkingAlias";
import { appendClaudeEffortVariants } from "@omniroute/open-sse/utils/claudeEffortVariants";
import { appendSyncedEffortVariants } from "@omniroute/open-sse/utils/syncedEffortVariants";
import { appendCcDiscoveryAliases } from "@omniroute/open-sse/utils/ccDiscoveryAliases";
import { appendFunctionalGatewayMirrors } from "@omniroute/open-sse/utils/functionalGatewayMirrors";
import { isCcAliasGlobalEnabled, getCcAliasSettingsBulk } from "@/lib/db/ccDiscoveryAliases";
import { buildCcAliasPredicate } from "./ccAliasPredicate";
import {
  isFunctionalGatewayGlobalEnabled,
  getFunctionalGatewaySettingsBulk,
} from "@/lib/db/functionalGatewayMirrors";
import { buildFunctionalGatewayPredicate } from "./functionalGatewayPredicate";
import { getPassthroughProviders, REGISTRY } from "@omniroute/open-sse/config/providerRegistry";
import { hasEligibleConnectionForModel } from "@/domain/connectionModelRules";
import { dedupeExactCatalogIds } from "./catalogDedupe";
import { sortCatalogModelsProviderGrouped } from "./catalogOrder";
import {
  disambiguateCatalogModelNames,
  enrichCatalogModelEntry,
} from "@/lib/modelMetadataRegistry";
import { isModelCatalogNamesEnabled } from "@/shared/utils/featureFlags";
import { maybeOmitCatalogModelName } from "./catalogHelpers";
import { isCodexModelCatalogClient } from "./catalogRequest";

/**
 * Post-filter chain applied AFTER the API-key filter, so variants and mirrors are
 * only derived from models the caller may actually see.
 *
 * Shared by the full build and by the quota-exclusive short-circuit: the quota path
 * returns early, but it still owes the caller these steps — the discovery mirrors in
 * particular are what let Claude Code see a quota pool's models at all.
 */
export function applyCatalogPostFilters(
  request: Request,
  models: Array<Record<string, any>>,
  ctx: {
    connections: any;
    prefixMode: string;
    aliasToProviderId: Record<string, string>;
    hideNoThinkVariants?: boolean;
  }
): Array<Record<string, any>> {
  let finalModels = models;

  // variants are only generated for surviving models.
  if (new URL(request.url).searchParams.get("configuredOnly") === "true") {
    finalModels = finalModels.filter((m) => {
      if (!m.root) return true;
      return hasEligibleConnectionForModel(ctx.connections, m.root);
    });
  }

  // Advertise Claude reasoning-effort variants (claude/<model>-{low,medium,high[,xhigh]}).
  // Derived from the already key-filtered list so a variant only appears when its real
  // model is permitted. Runs before the no-thinking pass: the gateway already routes these
  // suffixed ids (claudeEffortVariant.ts), this just makes them selectable in catalog-only
  // clients (OpenCode) that can't set a reasoning_effort config the way VS Code does.
  finalModels = appendClaudeEffortVariants(
    finalModels,
    ctx.prefixMode === "canonical" ? ctx.aliasToProviderId : undefined
  );

  // Advertise no-thinking gateway variants (Fase 8.1). Derived from the already
  // key-filtered list, so a variant only appears when its real model is permitted.
  // #9418: skip when hideNoThinkVariants is on — the ids are still routable when
  // sent explicitly, just not advertised in the catalog.
  if (!ctx.hideNoThinkVariants) {
    finalModels = appendNoThinkingVariants(
      finalModels,
      ctx.prefixMode === "canonical" ? ctx.aliasToProviderId : undefined
    );
  }

  // Advertise `claude/<id>` discovery-mirror aliases so Claude Code's gateway
  // model discovery (which only lists `claude`/`anthropic`-prefixed ids) can see
  // every model this gate allows. Gated 3 levels deep (global > provider > model,
  // see ccDiscoveryAliases.ts) and default-off. Deliberately NOT filtered by model
  // `type` here — non-chat entries (embedding/image/etc.) get a mirror too; the
  // gate itself (default-off + explicit opt-in) is the operator's filter, not a
  // hardcoded type allowlist.
  const ccAliasGlobal = isCcAliasGlobalEnabled();
  const ccAliasSettings = getCcAliasSettingsBulk();
  if (ccAliasGlobal || ccAliasSettings.providers.size > 0 || ccAliasSettings.models.size > 0) {
    finalModels = appendCcDiscoveryAliases(
      finalModels,
      buildCcAliasPredicate({
        global: ccAliasGlobal,
        providers: ccAliasSettings.providers,
        models: ccAliasSettings.models,
      })
    );
  }

  // Advertise `<gateway-alias>/<id>` functional-gateway mirrors so discovery
  // clients surface the route that actually has a credential, even when the
  // canonical owner provider has none (e.g. `deepseek/deepseek-v4-flash` fails
  // 404 but `agentrouter/deepseek/deepseek-v4-flash` returns 200). Gated 3
  // levels deep (global > provider > model, see db/functionalGatewayMirrors.ts)
  // and default-off. Only emits a mirror when the canonical owner has no
  // eligible connection for the model AND a passthrough gateway with an active
  // credential covers it.
  const fgGlobal = isFunctionalGatewayGlobalEnabled();
  const fgSettings = getFunctionalGatewaySettingsBulk();
  if (fgGlobal || fgSettings.providers.size > 0 || fgSettings.models.size > 0) {
    const gatewayProviderIds = [...getPassthroughProviders()];
    finalModels = appendFunctionalGatewayMirrors(finalModels, {
      gatewayProviderIds,
      isGateway: (provider) => getPassthroughProviders().has(provider),
      gatewayAlias: (provider) => REGISTRY[provider]?.alias || provider,
      gatewayCovers: (provider, modelId) =>
        hasEligibleConnectionForModel(
          ctx.connections.filter((c) => c.provider === provider),
          modelId
        ),
      gatewayHasConnection: (provider) => ctx.connections.some((c) => c.provider === provider),
      canonicalOwnerHasConnection: (owner) =>
        hasEligibleConnectionForModel(
          ctx.connections.filter((c) => c.provider === owner),
          owner
        ),
    });
    finalModels = finalModels.filter((m) =>
      buildFunctionalGatewayPredicate({ global: fgGlobal, ...fgSettings })(m)
    );
  }

  // #7694: advertise `<provider>/<model>-<tier>` variants for synced models that
  // captured `reasoning.supported_efforts` at sync time (capabilities.effort_tiers).
  // Derived from the already key-filtered list; skips codex/kimi (own suffix mechanism).
  finalModels = appendSyncedEffortVariants(finalModels);

  // #4424 follow-up — drop exact-duplicate ids that slip through the per-source push
  // guards (e.g. `codex/gpt-5.5`, `veo-free/seedance` listed twice). Keyed by listing
  // identity (id, type, subtype) so the intentional same-id audio transcription/speech
  // pair survives. Independent of MODELS_CATALOG_PREFIX_MODE; runs as the final guard.
  finalModels = dedupeExactCatalogIds(finalModels);

  return finalModels;
}

/**
 * Enrich the selected models and serialise the catalog response.
 *
 * Shared by the full build and by the quota-exclusive short-circuit so both emit a
 * byte-identical envelope. `getContextFallback` supplies the registry default
 * context length for non-combo entries; the quota path passes a no-op because its
 * entries are all `owned_by: "combo"`, which skips enrichment entirely.
 */
export function finalizeCatalogResponse(
  request: Request,
  finalModels: Array<Record<string, unknown>>,
  getContextFallback: (model: Record<string, unknown>) => number | undefined,
  headers: Record<string, string>
): Response {
  const includeModelNames = isModelCatalogNamesEnabled();
  const enrichedModels = disambiguateCatalogModelNames(
    finalModels.map((model) => {
      if (model.owned_by === "combo") {
        return maybeOmitCatalogModelName(model, includeModelNames);
      }
      const enriched = enrichCatalogModelEntry(model);
      const fallbackContextLength = getContextFallback(enriched);
      const listedModel = fallbackContextLength
        ? { ...enriched, context_length: fallbackContextLength }
        : enriched;
      return maybeOmitCatalogModelName(listedModel, includeModelNames);
    })
  );
  // Canonical provider-grouped publication: one contiguous block per provider,
  // combos pinned first. Stable — preserves combo sort_order, connection priority,
  // and equal-id audio twins. Grouped by owned_by (canonical identity), not the
  // routing alias prefix. Applied after enrichment/disambiguation so the final
  // serialized order is what every consumer sees; cached as part of the body.
  const orderedModels = sortCatalogModelsProviderGrouped(enrichedModels);
  // Codex CLI compatibility: its model-catalog refresh (codex_models_manager) does
  // GET /v1/models?client_version=<v> and decodes a JSON object with a TOP-LEVEL
  // `models` array, so the OpenAI-standard `{object,data}` shape makes it fail with
  // "missing field `models`" and log "failed to refresh available models" on every
  // startup. For codex clients only (detected by the codex originator/user-agent) we add
  // an EMPTY `models: []` so the decode succeeds and the error disappears. Every other
  // OpenAI consumer keeps the byte-identical `{object,data}` response.
  //
  // We deliberately keep it EMPTY rather than mirroring the catalog: codex replaces its
  // built-in per-model agent prompt (`base_instructions`, ~21k chars) with whatever a
  // populated entry carries for the selected model, so emitting our models with an
  // empty/foreign `base_instructions` would drop codex's agent prompt to nothing and
  // break its agent behavior (verified empirically against codex 0.137). An empty array
  // keeps codex on its built-in model info — same inference as today, minus the error.
  const responseBody: Record<string, unknown> = {
    object: "list",
    data: orderedModels,
  };
  if (isCodexModelCatalogClient(request)) {
    responseBody.models = [];
  }

  return Response.json(responseBody, { headers });
}
