/**
 * Request-path resolver for the `claude/…` cc-discovery aliases.
 *
 * The /v1/models catalog mirrors every enabled non-Claude model (and combo)
 * under a `claude/<id>` id so Claude Code's gateway model discovery — which only
 * lists ids starting with `claude`/`anthropic` — can surface them. When a client
 * sends one of those mirror ids back on a request, it must be resolved to the
 * real id BEFORE provider/combo resolution runs on the raw string. This module
 * is the single shared entry point for that, called from every request transport
 * that resolves a provider from the client model string:
 *   - src/sse/handlers/chat.ts (all /v1/chat, /v1/messages, /v1/responses, … )
 *   - src/app/api/internal/codex-responses-ws/route.ts (Codex Responses WS bridge)
 *
 * A legitimate `claude/<real-claude-model>` id (the actual Claude OAuth provider
 * namespace) is always left untouched — see the pure `stripCcDiscoveryAlias`.
 */
import {
  stripCcDiscoveryAlias,
  type CcDiscoveryStripResult,
} from "@omniroute/open-sse/handlers/chatCore/ccDiscoveryAliasStrip.ts";
import { getModelsByProviderId } from "@omniroute/open-sse/config/providerModels.ts";
import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import { getProviderById, getProviderByAlias } from "@/shared/constants/providers";
import { getCachedProviderNodes } from "@/lib/db/readCache";
import { getComboByName } from "@/lib/db/combos";
import {
  resolveCcAliasEnabled,
  getCcAliasGlobalState,
  getCcAliasProviderSetting,
  getCcAliasModelSetting,
  type CcAliasSetting,
} from "@/lib/db/ccDiscoveryAliases";
import { incrementCcAliasRequestCount } from "@/lib/db/ccDiscoveryMetrics";

// Virtual provider key combos are gated under (mirrors
// src/app/api/v1/models/ccAliasPredicate.ts — combos have no real provider id,
// so the gate addresses them via this synthetic key on BOTH the catalog and the
// request side; they must match or an alias could be listed yet rejected).
const CC_DISCOVERY_COMBO_PROVIDER_KEY = "combo";
const CC_DISCOVERY_PREFIX = "claude/";

/** Injectable lookups — real implementations in {@link resolveCcDiscoveryAliasStrip}. */
export interface CcDiscoveryResolveDeps {
  /** Ids of the real "claude" OAuth provider's own models. */
  claudeModelIds: Set<string>;
  /** True when `prefix` is a built-in registry provider id or alias. */
  isRegistryProvider(prefix: string): boolean;
  /** Prefixes of operator-defined compatible provider nodes (DB) — Gap 1. */
  customProviderPrefixes: Set<string>;
  /** Combo row by name (or null). Only called for `claude/combo/<name>` ids. */
  getCombo(name: string): Promise<{ models?: unknown[] } | null>;
  gateGlobal(): boolean;
  gateProvider(providerId: string): CcAliasSetting;
  gateModel(providerId: string, modelId: string): CcAliasSetting;
}

type CcAliasTarget = {
  /** `claude/combo/<name>` rather than `claude/<provider>/<model>`. */
  isComboAlias: boolean;
  comboName: string | null;
  providerPrefix: string | null;
  modelPart: string | null;
};

/** Split the part after `claude/` into either a combo name or a provider/model pair. */
function parseCcAliasTarget(rest: string): CcAliasTarget {
  if (rest.startsWith("combo/")) {
    return {
      isComboAlias: true,
      comboName: rest.slice("combo/".length),
      providerPrefix: null,
      modelPart: null,
    };
  }
  const slashIndex = rest.indexOf("/");
  if (slashIndex <= 0) {
    return { isComboAlias: false, comboName: null, providerPrefix: null, modelPart: null };
  }
  return {
    isComboAlias: false,
    comboName: null,
    providerPrefix: rest.slice(0, slashIndex),
    modelPart: rest.slice(slashIndex + 1),
  };
}

/** Resolve the three-level gate (model > provider > global) for a parsed alias target. */
function resolveGateFor(target: CcAliasTarget, deps: CcDiscoveryResolveDeps): boolean {
  const gateProviderId = target.isComboAlias
    ? CC_DISCOVERY_COMBO_PROVIDER_KEY
    : target.providerPrefix;
  if (!gateProviderId) return deps.gateGlobal();

  const modelKey = target.isComboAlias ? target.comboName : target.modelPart;
  return resolveCcAliasEnabled({
    model: deps.gateModel(gateProviderId, modelKey as string),
    provider: deps.gateProvider(gateProviderId),
    global: deps.gateGlobal(),
  });
}

/**
 * Testable core: resolve a `claude/…` alias to its real id using injected
 * lookups (no DB/registry access here — that lives in the production wrapper).
 */
export async function resolveCcDiscoveryAliasStripWith(
  modelStr: string | null | undefined,
  deps: CcDiscoveryResolveDeps
): Promise<CcDiscoveryStripResult> {
  if (typeof modelStr !== "string" || !modelStr.startsWith(CC_DISCOVERY_PREFIX)) {
    return { model: modelStr ?? "", stripped: false };
  }

  const rest = modelStr.slice(CC_DISCOVERY_PREFIX.length);

  // Legitimate Claude OAuth provider model — never touch it.
  if (deps.claudeModelIds.has(rest)) {
    return { model: modelStr, stripped: false };
  }

  const target = parseCcAliasTarget(rest);
  const combo = target.comboName ? await deps.getCombo(target.comboName) : null;
  const comboExists = combo !== null && Array.isArray(combo?.models) && combo.models.length > 0;
  const gateEnabled = resolveGateFor(target, deps);

  // NOTE: no DB side effects here — this injectable core stays pure so its unit
  // tests open no SQLite handle. The usage metric is recorded by the production
  // wrapper `resolveCcDiscoveryAliasStrip` below, which already touches the DB.
  return stripCcDiscoveryAlias(modelStr, {
    isClaudeProviderModel: (r) => deps.claudeModelIds.has(r),
    // Gap 1: recognize both built-in registry providers AND operator-defined
    // compatible nodes, matching exactly the prefixes the catalog can mirror.
    isKnownProviderPrefix: (prefix) =>
      deps.isRegistryProvider(prefix) || deps.customProviderPrefixes.has(prefix),
    hasCombo: () => comboExists,
    aliasEnabledFor: () => gateEnabled,
  });
}

/**
 * True when `prefix` names a provider the router can actually reach.
 *
 * Deliberately broader than the `open-sse` REGISTRY alone: enterprise-cloud
 * providers such as `azure-ai` / `azure-openai` live only in the provider
 * CATALOG (src/shared/constants/providers/…) yet route fine, so a registry-only
 * check made the request path reject `claude/azure-ai/<model>` ids that the
 * catalog had already advertised — see cc-discovery-alias-routable-prefix.test.ts.
 */
export function isRoutableProviderPrefix(prefix: string): boolean {
  if (!prefix) return false;
  if (getRegistryEntry(prefix) !== null) return true;
  if (getProviderById(prefix) !== undefined) return true;
  return getProviderByAlias(prefix) !== null;
}

/**
 * Production entry point: build the real lookups and resolve. Cheap-exit for any
 * id that does not start with `claude/` (the overwhelmingly common case) so a
 * normal request pays only a single `startsWith` check.
 */
export async function resolveCcDiscoveryAliasStrip(
  modelStr: string | null | undefined
): Promise<CcDiscoveryStripResult> {
  if (typeof modelStr !== "string" || !modelStr.startsWith(CC_DISCOVERY_PREFIX)) {
    return { model: modelStr ?? "", stripped: false };
  }

  const claudeModelIds = new Set(getModelsByProviderId("claude").map((m) => m.id));

  // Operator-defined compatible provider nodes (OpenAI/Anthropic-compatible),
  // keyed by their `prefix` — the same source catalog.ts uses to mirror them.
  const customProviderPrefixes = new Set<string>();
  try {
    const nodes = (await getCachedProviderNodes()) as Array<{ prefix?: unknown }>;
    for (const node of nodes) {
      if (typeof node?.prefix === "string" && node.prefix) {
        customProviderPrefixes.add(node.prefix);
      }
    }
  } catch {
    // A node-fetch failure just means custom prefixes are unavailable this call;
    // built-in registry providers still resolve.
  }

  const { enabled: globalEnabled } = getCcAliasGlobalState();

  const result = await resolveCcDiscoveryAliasStripWith(modelStr, {
    claudeModelIds,
    isRegistryProvider: (prefix) => isRoutableProviderPrefix(prefix),
    customProviderPrefixes,
    getCombo: (name) => getComboByName(name),
    gateGlobal: () => globalEnabled,
    gateProvider: (providerId) => getCcAliasProviderSetting(providerId),
    gateModel: (providerId, modelId) => getCcAliasModelSetting(providerId, modelId),
  });

  // Best-effort usage metric — never blocks/slows the request, never throws
  // (incrementCcAliasRequestCount already swallows its own errors). Lives in the
  // production wrapper (not the injectable core) so the core's unit tests stay
  // DB-free.
  if (result.stripped) {
    incrementCcAliasRequestCount(result.model);
  }

  return result;
}
