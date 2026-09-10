import { AutoComboConfig } from "./engine";
import { MODE_PACKS } from "./modePacks";
import { DEFAULT_WEIGHTS, ScoringWeights } from "./scoring";
import { getCachedProviderConnections } from "@/lib/db/readCache";
import { getSettings } from "@/lib/db/settings";
import { getProviderRegistry } from "./providerRegistryAccessor";
import type { ConnectionFields } from "@/lib/db/encryption";
import { NOAUTH_PROVIDERS } from "@/shared/constants/providers";
import { isMicrosoftDesignerWebRetiredProviderId } from "@/shared/constants/designerWebRetirement";
import { isRuntimeRetiredProviderId } from "@/shared/constants/providerRetirement";
import { isCommonChatGptWebRetiredProviderId } from "@/shared/constants/chatgptWebRetirement";
import { hasUsableWebSessionCredential } from "@/shared/providers/webSessionCredentials";
import { toNumber } from "@/shared/utils/numeric";
import { isCompatibleProviderConnectionId } from "@/shared/utils/compatibleProviderId";
import { defaultLogger as log } from "@omniroute/open-sse/utils/logger";
import { getTokenLimit } from "../contextManager";
import {
  createModelCapabilityResolutionSnapshot,
  getResolvedModelCapabilities,
  type ModelCapabilityResolutionSnapshot,
} from "@/lib/modelCapabilities";
import {
  buildAutoCandidateFilter,
  tierToWeightVariant,
  type AutoCategory,
  type AutoTier,
} from "./suffixComposition";
import { classifyTier } from "../tierResolver";
import type { AutoVariant } from "./autoPrefix";
import { buildFamilyCandidateFilter, type ModelFamily } from "./modelFamily";
import { getHiddenModelsByProvider } from "@/models";
import { getSyncedAvailableModelsByConnection, getCustomModels } from "@/lib/db/models";
import { filterPaidOnlyCandidates } from "./paidModelFilter";
import { filterModelExposureCandidates } from "./modelExposureFilter";
import {
  filterSubscriptionOnlyCandidates,
  orderPoolByRung,
  type LadderOptions,
} from "./subscriptionLadder";
import {
  classifyStrictZeroCostCandidate,
  filterStrictZeroCostCandidates,
  filterTosAvoidCandidates,
  findBudgetEntry,
} from "./strictZeroCostFilter";
import { resolveFreeAccessState } from "./freeAccessQuota";
import { isModelExcludedByConnection } from "@/domain/connectionModelRules";
import { resolveProviderAlias } from "../model.ts";
import { filterExcludedCandidates } from "./candidateOverrides";
import { getExcludedConnectionIds } from "@/lib/db/autoCandidateOverrides";
import {
  filterResilienceBlockedCandidates,
  buildConnectionResilienceMap,
  SYNTHETIC_NOAUTH_CONNECTION_ID as RESILIENCE_NOAUTH_CONNECTION_ID,
} from "./resilienceCandidateFilter";
import type { ChaosTuning } from "./chaosEngine";

/** #4235 Phase B: optional category/tier overlay for `auto/<category>:<tier>` combos.
 * #6453: optional `family` overlay for `auto/<family>` combos (e.g. `auto/glm`) —
 * mutually exclusive with category/tier, applied instead of them when present. */
export interface AutoComboSpec {
  category?: AutoCategory;
  tier?: AutoTier;
  family?: ModelFamily;
}

/** Once-per-process empty-pool AUTO warns (steady empty is not a metronome). */
const emptyPoolWarned = new Set<string>();

export function warnEmptyAutoPoolOnce(label: string, message: string, _now = Date.now()): boolean {
  if (emptyPoolWarned.has(label)) return false;
  emptyPoolWarned.add(label);
  log.warn("AUTO", message);
  return true;
}

/** Test-only: reset the once-per-label set (also models emptiness reappearing). */
export function resetEmptyAutoPoolWarnStateForTests(): void {
  emptyPoolWarned.clear();
}

/** Minimal connection shape needed for virtual auto-combo factory */
interface VirtualFactoryConn extends ConnectionFields {
  id: string;
  provider: string;
  defaultModel?: string;
  expiresAt?: number | string | null;
  tokenExpiresAt?: number | string | null;
  providerSpecificData?: Record<string, unknown> | null;
}

type NoAuthProviderDefinition = {
  id?: string;
  alias?: string;
  noAuth?: boolean;
  serviceKinds?: string[];
};

export interface VirtualAutoComboCandidate {
  provider: string;
  /** A concrete connection for synthetic/no-auth candidates; null for a logical provider/model candidate. */
  connectionId: string | null;
  /** Credentialed accounts that are eligible to serve this provider/model pair. */
  allowedConnectionIds?: string[];
  model: string;
  modelStr: string; // e.g., 'openai/gpt-4o'
  costPer1MTokens: number; // from providerRegistry
  /** Build-local capability snapshot. Runtime calls rebuild it; catalog entries reuse it. */
  resolvedContextLength?: number | null;
  resolvedMaxOutputTokens?: number | null;
  resolvedSupportsVision?: boolean;
  resolvedReasoning?: boolean;
  resolvedSupportsThinking?: boolean;
  /**
   * Why STRICT_ZERO_COST would exclude this candidate, or null when it would
   * not. Only populated for the read-only inspector build (`skip`), where the
   * guard is deliberately not applied — dispatch builds leave it undefined and
   * do no extra work.
   */
  freeAccessExclusion?: import("./strictZeroCostFilter").StrictZeroCostExclusionReason | null;
}

type VirtualAutoCombo = AutoComboConfig & {
  strategy: "auto";
  models: Array<{
    id: string;
    kind: "model";
    model: string;
    providerId: string;
    connectionId: string | null;
    allowedConnectionIds?: string[];
    weight: number;
    label: string;
    /** Carried through from the candidate for the read-only inspector; absent
     * on every dispatch build. */
    freeAccessExclusion?: import("./strictZeroCostFilter").StrictZeroCostExclusionReason | null;
  }>;
  /** MAX of candidates' context windows — safe to advertise because the
   * auto-combo context pre-filter routes oversized requests to large-window
   * candidates. null when the pool is empty. */
  advertisedContextLength: number | null;
  advertisedMaxOutputTokens: number | null;
  autoConfig: {
    candidatePool: string[];
    weights: ScoringWeights;
    explorationRate: number;
    routerStrategy: string;
  };
  config: {
    auto: {
      candidatePool: string[];
      weights: ScoringWeights;
      explorationRate: number;
      routerStrategy: string;
    };
    chaos?: {
      enabled: true;
      panelSize: number;
      judgeModel?: string;
      tuning: ChaosTuning;
    };
  };
};

/**
 * Build-local candidate snapshots shared by the built-in entries in one model-catalog build.
 * Runtime routing does not retain or reuse this object across requests.
 */
export interface PreparedVirtualAutoComboInputs {
  readonly regularCandidates: readonly VirtualAutoComboCandidate[];
  readonly familyCandidates: readonly VirtualAutoComboCandidate[];
  /**
   * `provider_connections.auth_type` per connection id. Subscription-first
   * routing classifies billing per CONNECTION (`connectionBilling.ts`), and
   * the candidate pool only carries connection ids — so the auth types are
   * captured here, during the one bulk connection read this function already
   * does, instead of re-reading the DB per pool narrowing.
   */
  readonly authTypeByConnectionId?: ReadonlyMap<string, string | null>;
  /** Operator settings for the subscription ladder; absent = feature off. */
  readonly subscriptionLadder?: SubscriptionLadderSettings;
}

/**
 * Operator-facing knobs for subscription-first routing. Mirrors the Zod shape
 * in `src/shared/validation/settingsSchemas.ts`.
 *
 * Deliberately TUNING ONLY — there is no `enabled` flag here. `auto/subscription`
 * and `auto/thrifty` are new ids that nothing routes through unless a caller
 * asks for them by name, so requesting the id IS the opt-in. A settings toggle
 * that could switch them off would be actively dangerous: it would leave an id
 * whose whole promise is "plan-included only" quietly serving the full pool,
 * paid models included.
 */
export interface SubscriptionLadderSettings {
  exitCutoffPercent?: number;
  reentryMinRemainingPercent?: number;
  rungBudgetUsd?: Record<string, number>;
  /** Staleness bound for a cached quota reading, derived from the existing
   * `autoRefreshProviderQuotaInterval` exactly as STRICT_ZERO_COST does. */
  maxStateAgeMs: number;
}

function readSubscriptionLadderSettings(
  settings: Record<string, unknown>
): SubscriptionLadderSettings {
  const maxStateAgeMs = (Number(settings.autoRefreshProviderQuotaInterval) || 180) * 1000;
  const raw = settings.subscriptionLadder;
  if (!raw || typeof raw !== "object") return { maxStateAgeMs };
  const value = raw as Record<string, unknown>;
  const numeric = (key: string): number | undefined =>
    typeof value[key] === "number" && Number.isFinite(value[key] as number)
      ? (value[key] as number)
      : undefined;
  const exitCutoffPercent = numeric("exitCutoffPercent");
  const reentryMinRemainingPercent = numeric("reentryMinRemainingPercent");
  return {
    maxStateAgeMs,
    ...(exitCutoffPercent === undefined ? {} : { exitCutoffPercent }),
    ...(reentryMinRemainingPercent === undefined ? {} : { reentryMinRemainingPercent }),
    ...(value.rungBudgetUsd && typeof value.rungBudgetUsd === "object"
      ? { rungBudgetUsd: value.rungBudgetUsd as Record<string, number> }
      : {}),
  };
}

/**
 * Build the injected dependencies the pure ladder module needs. Everything it
 * touches is resolved here — the live quota cache, connection auth types, and
 * the economic tier resolver — so `subscriptionLadder.ts` itself stays free of
 * DB, network, and registry imports.
 */
function buildLadderOptions(
  prepared: PreparedVirtualAutoComboInputs,
  tier: "subscription" | "thrifty"
): LadderOptions {
  const tuning = prepared.subscriptionLadder;
  const authTypes = prepared.authTypeByConnectionId;
  return {
    enabled: true,
    resolveFreeAccessState,
    resolveAuthType: (connectionId: string) => authTypes?.get(connectionId) ?? null,
    resolveEconomicTier: (provider: string, model: string) => {
      try {
        const resolved = classifyTier(provider, model).tier;
        return resolved === "free" || resolved === "premium" ? resolved : "cheap";
      } catch {
        // Same conservative default `safeClassifyTier` uses in suffixComposition.
        return "cheap";
      }
    },
    maxStateAgeMs: tuning?.maxStateAgeMs ?? 180_000,
    // The two groupings read a missing quota reading OPPOSITELY on purpose —
    // see `LadderOptions.admitUnknownQuota`.
    admitUnknownQuota: tier === "thrifty",
    ...(tuning?.exitCutoffPercent === undefined
      ? {}
      : { exitCutoffPercent: tuning.exitCutoffPercent }),
    ...(tuning?.reentryMinRemainingPercent === undefined
      ? {}
      : { reentryMinRemainingPercent: tuning.reentryMinRemainingPercent }),
    ...(tuning?.rungBudgetUsd ? { rungBudgetUsd: tuning.rungBudgetUsd } : {}),
  };
}

function toExpiryMs(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;

  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string" && value.trim().length > 0
        ? Number(value)
        : Number.NaN;

  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed < 10_000_000_000 ? parsed * 1000 : parsed;
  }

  if (typeof value === "string") {
    const timestamp = new Date(value).getTime();
    return Number.isFinite(timestamp) ? timestamp : null;
  }

  return null;
}

function hasUsableOAuthToken(conn: VirtualFactoryConn): boolean {
  if (typeof conn.accessToken !== "string" || conn.accessToken.trim().length === 0) return false;

  const expiryMs = toExpiryMs(conn.tokenExpiresAt) ?? toExpiryMs(conn.expiresAt);

  return expiryMs === null || expiryMs > Date.now();
}

function hasProviderSpecificSessionData(conn: VirtualFactoryConn): boolean {
  return hasUsableWebSessionCredential(conn.provider, conn.providerSpecificData);
}

/**
 * #11180: a custom compatible connection (`openai-compatible-*` /
 * `anthropic-compatible-*`) may legitimately carry no credential at all,
 * because it points at a self-hosted backend the operator started without one
 * (`llama-server --host 0.0.0.0` with no `--api-key`, Ollama, vLLM). For those
 * IDs "no credential" is the normal configuration rather than an unconfigured
 * connection, so the credential gate must not silently drop them from every
 * `auto/*` pool while direct `<provider>/<model>` calls keep working.
 *
 * Deliberately narrow: only the four generated compatible-provider ID shapes
 * qualify. A first-party provider with an empty key really is unconfigured and
 * stays filtered out, and the no-auth registry allowlist below is untouched.
 */
function isKeylessEligibleConnection(conn: VirtualFactoryConn): boolean {
  return isCompatibleProviderConnectionId(conn.provider);
}

function hasUsableConnectionCredential(conn: VirtualFactoryConn): boolean {
  const hasApiKey = typeof conn.apiKey === "string" && conn.apiKey.trim().length > 0;
  return (
    hasApiKey ||
    hasUsableOAuthToken(conn) ||
    hasProviderSpecificSessionData(conn) ||
    isKeylessEligibleConnection(conn)
  );
}

const SYNTHETIC_NOAUTH_CONNECTION_ID = RESILIENCE_NOAUTH_CONNECTION_ID;

// Allowlist of no-auth (keyless) providers permitted to enter the `auto`/`auto-*`
// candidate pool. Narrowed to the backends verified to answer without any
// configuration on our reference egress (VPS .15): `opencode` returns 200
// there, while duckduckgo-web (429/VQD rate limit),
// chipotle (502), aihorde (401, anon key rejected)
// and the others are unreliable. The excluded providers stay fully usable via
// direct `<alias>/<model>` calls — they are just kept OUT of auto-routing until
// re-verified. Re-add an id here to bring it back into every auto/* pool.
//
// Scope (operator decision 2026-07-24, refs #8183/#6453/#7032): this allowlist
// targets public-HTTP-egress reliability for the category/tier and flat-variant
// `auto/*` pools (auto/best-free, auto/coding:fast, ...). It does NOT apply to
// `auto/<family>` pools (auto/glm, auto/zai, ...) — a family combo is an
// identity selector ("whatever genuinely serves GLM"), not a reliability-curated
// pool, so it admits any no-auth backend that genuinely serves the family (e.g.
// auggie, a local CLI subprocess with zero HTTP egress, belongs in auto/glm
// regardless of this list). See the `bypassAllowlist` param below.
const AUTO_COMBO_NOAUTH_ALLOWLIST = new Set<string>(["opencode"]);

function isChatAutoComboNoAuthProvider(
  providerDef: NoAuthProviderDefinition,
  bypassAllowlist: boolean
): boolean {
  if (providerDef.noAuth !== true) return false;
  if (!bypassAllowlist && !AUTO_COMBO_NOAUTH_ALLOWLIST.has(providerDef.id)) return false;
  if (!Array.isArray(providerDef.serviceKinds) || providerDef.serviceKinds.length === 0)
    return true;
  return providerDef.serviceKinds.includes("llm");
}

function getNoAuthCandidates(
  excludedProviders: Set<string>,
  blockedProviders: Set<string>,
  disabledNoAuthProviders: Set<string>,
  noAuthProviderSpecificData: Map<string, Record<string, unknown> | null | undefined>,
  hiddenModelsMap: Map<string, Set<string>>,
  bypassAllowlist: boolean
): VirtualAutoComboCandidate[] {
  const registry = getProviderRegistry();
  const candidates: VirtualAutoComboCandidate[] = [];

  for (const providerDef of Object.values(NOAUTH_PROVIDERS) as NoAuthProviderDefinition[]) {
    if (!isChatAutoComboNoAuthProvider(providerDef, bypassAllowlist)) continue;

    const providerId = providerDef.id;
    if (!providerId || excludedProviders.has(providerId)) continue;
    if (
      blockedProviders.has(providerId) ||
      (typeof providerDef.alias === "string" && blockedProviders.has(providerDef.alias))
    )
      continue;
    // #6557: a no-auth provider with its OWN provider_connections row explicitly
    // disabled (isActive=false, the toggle on the main Providers grid card once an
    // Account/fingerprint exists) must not be routed to, even though it has no
    // entry in the separate `settings.blockedProviders` list.
    if (
      disabledNoAuthProviders.has(providerId) ||
      (typeof providerDef.alias === "string" && disabledNoAuthProviders.has(providerDef.alias))
    )
      continue;

    const providerInfo = registry[providerId];
    const registryModels = Array.isArray(providerInfo?.models) ? providerInfo.models : [];
    if (registryModels.length === 0) continue;

    // No-auth providers do not have provider_connections rows. Use the same
    // synthetic connection id returned by getProviderCredentials() so the
    // downstream combo path can still carry a stable target/account identity.
    // Prefer provider aliases because some canonical provider IDs are reserved
    // for credentialed tiers with different routing semantics.
    const registryAlias =
      typeof providerInfo?.alias === "string" && providerInfo.alias.trim().length > 0
        ? providerInfo.alias
        : null;
    const routingPrefix = providerDef.alias || registryAlias || providerId;

    // #7622: honor the "Excluded Models" field (`providerSpecificData.excludedModels`)
    // already enforced at dispatch time (src/sse/services/auth.ts) for no-auth
    // providers' own provider_connections row (#6557), so an excluded model never
    // enters the auto-combo/fusion candidate pool in the first place.
    const providerSpecificData =
      noAuthProviderSpecificData.get(providerId) ??
      (typeof providerDef.alias === "string"
        ? noAuthProviderSpecificData.get(providerDef.alias)
        : undefined);

    // #7620: honor the eye-icon "hidden" flag (isHidden, from the
    // modelCompatOverrides/customModels key_value namespaces) the same way the
    // credentialed-connection loop below does, so a hidden no-auth model never
    // enters the auto-combo/fusion candidate pool either.
    const hiddenLookupIds = [
      providerId,
      typeof providerDef.alias === "string" ? providerDef.alias : null,
      registryAlias,
      routingPrefix,
      resolveProviderAlias(providerId),
      resolveProviderAlias(routingPrefix),
    ];
    const hiddenModels = new Set<string>();
    for (const id of hiddenLookupIds) {
      if (!id) continue;
      for (const modelId of hiddenModelsMap.get(id) ?? []) hiddenModels.add(modelId);
    }

    for (const model of registryModels) {
      const modelId = typeof model?.id === "string" && model.id.trim().length > 0 ? model.id : null;
      if (!modelId) continue;
      if (isModelExcludedByConnection(modelId, providerSpecificData)) continue;
      if (hiddenModels?.has(modelId)) continue;
      candidates.push({
        provider: providerId,
        connectionId: SYNTHETIC_NOAUTH_CONNECTION_ID,
        model: modelId,
        modelStr: `${routingPrefix}/${modelId}`,
        costPer1MTokens: 0,
      });
    }
  }

  return candidates;
}

/**
 * Creates a virtual AutoCombo configuration dynamically based on connected providers and a specified variant.
 * This combo is not persisted in the DB.
 */
/**
 * Aggregate the context window / max output to ADVERTISE for an auto combo.
 *
 * MAX across candidates (not min): the auto-combo context pre-filter
 * (combo.ts::filterTargetsByRequestCompatibility + the estimated-tokens
 * pre-filter) already routes oversized requests away from small-window
 * candidates, so advertising the largest window lets clients (e.g. opencode)
 * keep their smart auto-compaction calibrated to the best candidate instead
 * of compacting prematurely — or, worse, receiving 0 and disabling
 * compaction entirely (the "agent keeps forgetting things" bug).
 *
 * Unknown candidates resolve through getTokenLimit()'s fallback chain, so a
 * non-empty pool always yields a positive contextLength.
 *
 * maxOutputTokens has no such guaranteed fallback in getResolvedModelCapabilities()
 * — registry entries and models.dev sync data are both optional per model, so a
 * candidate pool whose members all lack that specific field (e.g. #6453's
 * provider-family combos, `auto/llama` and friends, over no-auth/free-tier
 * registry entries that were never annotated with maxOutputTokens) would
 * otherwise advertise `null`, which mirrors the `context: 0` bug this module's
 * docstring describes for contextLength (opencode disables smart auto-compaction
 * entirely when a limit is falsy). Fall back to a conservative generic default so
 * a non-empty pool always yields a positive maxOutputTokens too.
 */
const DEFAULT_ADVERTISED_MAX_OUTPUT_TOKENS = 8192;

type AdvertisedLimitCandidate = {
  provider: string;
  model: string;
  resolvedContextLength?: number | null;
  resolvedMaxOutputTokens?: number | null;
};

export function computeAdvertisedLimits(candidates: AdvertisedLimitCandidate[]): {
  contextLength: number | null;
  maxOutputTokens: number | null;
} {
  if (!Array.isArray(candidates) || candidates.length === 0) {
    return { contextLength: null, maxOutputTokens: null };
  }

  let contextLength: number | null = null;
  let maxOutputTokens: number | null = null;
  for (const candidate of candidates) {
    const limit =
      candidate.resolvedContextLength !== undefined
        ? candidate.resolvedContextLength
        : getTokenLimit(candidate.provider, candidate.model);
    if (typeof limit === "number" && Number.isFinite(limit) && limit > 0) {
      contextLength = contextLength === null ? limit : Math.max(contextLength, limit);
    }
    const output =
      candidate.resolvedMaxOutputTokens !== undefined
        ? candidate.resolvedMaxOutputTokens
        : getResolvedModelCapabilities({
            provider: candidate.provider,
            model: candidate.model,
          }).maxOutputTokens;
    if (typeof output === "number" && Number.isFinite(output) && output > 0) {
      maxOutputTokens = maxOutputTokens === null ? output : Math.max(maxOutputTokens, output);
    }
  }
  if (maxOutputTokens === null) {
    maxOutputTokens = DEFAULT_ADVERTISED_MAX_OUTPUT_TOKENS;
  }
  return { contextLength, maxOutputTokens };
}

// Catalog-scale pools can contain hundreds of models. Keep both candidate construction
// and capability preparation cooperative instead of monopolising one event-loop turn.
const VIRTUAL_AUTO_PREPARATION_YIELD_INTERVAL = 4;

type PreparedCapabilityValues = {
  resolvedContextLength: number | null;
  resolvedMaxOutputTokens: number | null;
  resolvedSupportsVision: boolean;
  resolvedReasoning: boolean;
  resolvedSupportsThinking: boolean;
};

type PreparedCapabilityState = {
  /** Nested provider → model memo; collision-free for arbitrary model ids. */
  byTarget: Map<string, Map<string, PreparedCapabilityValues>>;
  resolvedSinceYield: number;
  /** Build-local bulk maps; one per catalog prepare, never retained at runtime. */
  resolutionSnapshot: ModelCapabilityResolutionSnapshot;
};

function yieldVirtualAutoPreparationTurn(): Promise<void> {
  return new Promise((resolve) => setImmediate(resolve));
}

async function attachPreparedCapabilityValues(
  candidates: readonly VirtualAutoComboCandidate[],
  state: PreparedCapabilityState
): Promise<VirtualAutoComboCandidate[]> {
  const prepared: VirtualAutoComboCandidate[] = [];
  for (const candidate of candidates) {
    let byModel = state.byTarget.get(candidate.provider);
    if (!byModel) {
      byModel = new Map();
      state.byTarget.set(candidate.provider, byModel);
    }
    let values = byModel.get(candidate.model);
    if (!values) {
      const contextLength = getTokenLimit(
        candidate.provider,
        candidate.model,
        state.resolutionSnapshot
      );
      const capabilities = getResolvedModelCapabilities(
        {
          provider: candidate.provider,
          model: candidate.model,
        },
        undefined,
        state.resolutionSnapshot
      );
      const maxOutputTokens = capabilities.maxOutputTokens;
      values = {
        resolvedContextLength:
          Number.isFinite(contextLength) && contextLength > 0 ? contextLength : null,
        resolvedMaxOutputTokens:
          typeof maxOutputTokens === "number" &&
          Number.isFinite(maxOutputTokens) &&
          maxOutputTokens > 0
            ? maxOutputTokens
            : null,
        resolvedSupportsVision: capabilities.supportsVision === true,
        resolvedReasoning: capabilities.reasoning === true,
        resolvedSupportsThinking: capabilities.supportsThinking === true,
      };
      byModel.set(candidate.model, values);
      state.resolvedSinceYield++;
      if (state.resolvedSinceYield >= VIRTUAL_AUTO_PREPARATION_YIELD_INTERVAL) {
        state.resolvedSinceYield = 0;
        await yieldVirtualAutoPreparationTurn();
      }
    }
    prepared.push({ ...candidate, ...values });
  }
  return prepared;
}

export async function prepareVirtualAutoComboInputs(
  options: {
    includeResolvedCapabilities?: boolean;
    resolutionSnapshot?: ModelCapabilityResolutionSnapshot;
  } = {},
  skip = false // #9133 — inspector opt-out, see filterResilienceBlockedCandidates
): Promise<PreparedVirtualAutoComboInputs> {
  const [rawConnections, rawDisabledNoAuthConnections, settings] = await Promise.all([
    getCachedProviderConnections({ isActive: true }) as Promise<VirtualFactoryConn[]>,
    // #6557: synthetic no-auth credentials bypass active filtering, but a real Add Account
    // row may exist; its isActive=false must also gate auto-combo.
    getCachedProviderConnections({ isActive: false }) as Promise<VirtualFactoryConn[]>,
    getSettings().catch(() => ({}) as Record<string, unknown>),
  ]);
  const available = (conn: VirtualFactoryConn) =>
    !isCommonChatGptWebRetiredProviderId(conn.provider);
  const connections = rawConnections.filter(available);
  const disabledNoAuthConnections = rawDisabledNoAuthConnections.filter(available);
  const blockedProviders = new Set(
    Array.isArray(settings.blockedProviders) ? (settings.blockedProviders as string[]) : []
  );
  const disabledNoAuthProviders = new Set(
    disabledNoAuthConnections
      .filter((conn) => conn.provider in NOAUTH_PROVIDERS)
      .map((conn) => conn.provider)
  );
  const runtimeConnections = connections.filter(
    (connection) =>
      !isMicrosoftDesignerWebRetiredProviderId(connection.provider) &&
      !isRuntimeRetiredProviderId(connection.provider)
  );
  const hiddenModelsMap = getHiddenModelsByProvider();
  // #7622: a no-auth provider's own provider_connections row (#6557) can carry
  // `providerSpecificData.excludedModels` regardless of its isActive state (the
  // dispatch-time enforcement in auth.ts does not gate on isActive either), so
  // gather it from BOTH the active and disabled connection lists.
  const noAuthProviderSpecificData = new Map<string, Record<string, unknown> | null | undefined>();
  for (const conn of [...runtimeConnections, ...disabledNoAuthConnections]) {
    if (conn.provider in NOAUTH_PROVIDERS) {
      noAuthProviderSpecificData.set(conn.provider, conn.providerSpecificData);
    }
  }

  const validConnections = runtimeConnections.filter(hasUsableConnectionCredential);

  const candidatePool: VirtualAutoComboCandidate[] = [];
  const registry = getProviderRegistry();
  const connectionsByProvider = new Map<string, VirtualFactoryConn[]>();
  for (const conn of validConnections) {
    const providerConnections = connectionsByProvider.get(conn.provider) ?? [];
    providerConnections.push(conn);
    connectionsByProvider.set(conn.provider, providerConnections);
  }

  // Build one logical candidate per provider/model and keep account fallback as an
  // allowlist on that candidate. This avoids both the old "first registry model per
  // connection" blind spot and a connections × models Cartesian candidate pool.
  let candidateModelsSinceYield = 0;
  for (const [providerId, providerConnections] of connectionsByProvider) {
    const providerInfo = registry[providerId];
    const registryModelIds = Array.isArray(providerInfo?.models)
      ? providerInfo.models
          .map((model) => (typeof model?.id === "string" ? model.id.trim() : ""))
          .filter(Boolean)
      : [];
    const registryModelIdSet = new Set(registryModelIds);
    const defaultModelIds = providerConnections
      .map((conn) => (typeof conn.defaultModel === "string" ? conn.defaultModel.trim() : ""))
      .filter(Boolean);
    const hiddenModels = hiddenModelsMap.get(providerId);

    // #auto-pool-visible-only: build the credentialed pool from the models the user
    // actually has available (synced + custom non-hidden) when any exist, falling
    // back to the static catalog only when the user has none. This keeps catalog-only
    // models (e.g. openrouter/auto) out of every auto/* pool when the operator only
    // synced a subset (e.g. OpenRouter with importFreeModelsOnly).
    const [syncedByConnection, customModels] = await Promise.all([
      getSyncedAvailableModelsByConnection(providerId),
      getCustomModels(providerId),
    ]);
    const userVisibleIds = new Set<string>();
    for (const models of Object.values(syncedByConnection)) {
      for (const m of models) if (m.id && !hiddenModels?.has(m.id)) userVisibleIds.add(m.id);
    }
    for (const m of customModels) if (m.id && !hiddenModels?.has(m.id)) userVisibleIds.add(m.id);
    const hasUserModels = userVisibleIds.size > 0;
    const modelIds = hasUserModels
      ? Array.from(userVisibleIds)
      : Array.from(new Set([...registryModelIds, ...defaultModelIds]));

    for (const modelId of modelIds) {
      candidateModelsSinceYield++;
      if (candidateModelsSinceYield >= VIRTUAL_AUTO_PREPARATION_YIELD_INTERVAL) {
        candidateModelsSinceYield = 0;
        await yieldVirtualAutoPreparationTurn();
      }
      if (hiddenModels?.has(modelId)) continue;

      const allowedConnectionIds = providerConnections
        .filter((conn) => {
          if (isModelExcludedByConnection(modelId, conn.providerSpecificData)) return false;
          if (hasUserModels) {
            // User-synced models are scoped to the connections that carry them;
            // custom models are provider-wide like registry models.
            const connSynced = syncedByConnection[conn.id] ?? [];
            const isSyncedForConn = connSynced.some((m) => m.id === modelId);
            const isCustomForProvider = customModels.some((m) => m.id === modelId);
            return isSyncedForConn || isCustomForProvider || conn.defaultModel?.trim() === modelId;
          }
          // Registry models are provider-wide. A non-registry default (for a custom
          // or passthrough model) is scoped only to connections that selected it.
          return registryModelIdSet.has(modelId) || conn.defaultModel?.trim() === modelId;
        })
        .map((conn) => conn.id);
      if (allowedConnectionIds.length === 0) continue;

      candidatePool.push({
        provider: providerId,
        connectionId: null,
        allowedConnectionIds,
        model: modelId,
        modelStr: `${providerId}/${modelId}`,
        costPer1MTokens: 0, // Not used in virtual auto-combo (LKGP uses session stickiness)
      });
    }
  }

  // #7623: honor existing model lockouts + connection cooldown/terminal state so
  // auto/* never advertises models the dispatch path would immediately skip.
  const connectionsById = buildConnectionResilienceMap([
    ...runtimeConnections,
    ...disabledNoAuthConnections,
  ]);

  const connectedProviders = new Set(validConnections.map((conn) => conn.provider));
  const buildPreparedPool = (bypassNoAuthAllowlist: boolean) => {
    let pool = [
      ...candidatePool,
      ...getNoAuthCandidates(
        connectedProviders,
        blockedProviders,
        disabledNoAuthProviders,
        noAuthProviderSpecificData,
        hiddenModelsMap,
        bypassNoAuthAllowlist
      ),
    ];

    const resilienceFilteredPool = filterResilienceBlockedCandidates(pool, connectionsById, skip);
    if (resilienceFilteredPool !== pool) pool = resilienceFilteredPool;

    // #6512 (follow-up to #6328/#6495): when the operator opts into `hidePaidModels`,
    // exclude paid-only backends from EVERY `auto/*` candidate pool.
    const paidFilteredPool = filterPaidOnlyCandidates(pool, settings.hidePaidModels === true);
    if (paidFilteredPool !== pool) pool = paidFilteredPool;

    // #11481: mandatory mirror of the /v1/models exposure allow/deny list —
    // see src/shared/utils/modelExposureList.ts for why (#6512's lesson).
    const exposureFilteredPool = filterModelExposureCandidates(pool, settings);
    if (exposureFilteredPool !== pool) pool = exposureFilteredPool;

    // STRICT_ZERO_COST: opt-in, off by default (`settings.freeAccessPolicy !== "strict"`
    // leaves `pool` byte-identical, same contract as `hidePaidModels`). See
    // `strictZeroCostFilter.ts` for why this is stricter than `hidePaidModels` alone —
    // including the connection-safety invariant it enforces per-connection, not just
    // per-candidate: `resolveFreeAccessState` here is a raw pass-through of the real
    // per-(provider,connectionId) resolver; the filter itself decides which connection(s)
    // on each candidate to check and rewrites `allowedConnectionIds` to the SAFE subset.
    const strictZeroCostThresholds = {
      // 1 percentage point of headroom, not 0: `freeAccessQuota.ts` reports
      // remaining allowance as a percentage, and a raw ">0" comparison would
      // let a reading of e.g. 0.3% (rounding noise, not real headroom) pass.
      minRemainingAllowance: 1,
      maxStateAgeMs: toNumber(settings.autoRefreshProviderQuotaInterval, 180) * 1000,
    };
    const strictZeroCostOn = settings.freeAccessPolicy === "strict";
    const strictFilteredPool = filterStrictZeroCostCandidates(pool, {
      // The read-only candidate inspector (#9133) must be able to see what the
      // guard would exclude, and why — the same opt-out the resilience filter
      // already honours through `skip`. Dispatch (`skip === false`) is unaffected.
      enabled: strictZeroCostOn && !skip,
      resolveFreeAccessState,
      ...strictZeroCostThresholds,
    });
    if (strictFilteredPool !== pool) pool = strictFilteredPool;

    // Annotate here rather than in the handler: this is where the thresholds and
    // `resolveFreeAccessState` already live. Doing it downstream would mean a second
    // copy of both, with nothing to keep them in agreement.
    if (strictZeroCostOn && skip) {
      pool = pool.map((candidate) => {
        const verdict = classifyStrictZeroCostCandidate(
          candidate,
          findBudgetEntry(candidate),
          resolveFreeAccessState,
          strictZeroCostThresholds
        );
        return {
          ...candidate,
          freeAccessExclusion: verdict.outcome === "safe" ? null : verdict.outcome,
        };
      });
    }

    // Separate, optional ToS guard — independent of economic safety on purpose.
    const tosFilteredPool = filterTosAvoidCandidates(pool, settings.excludeTosAvoid === true);
    if (tosFilteredPool !== pool) pool = tosFilteredPool;

    return pool;
  };

  const regularCandidates = buildPreparedPool(false);
  // #6453/#8183: family selectors bypass the reliability-curated no-auth allowlist.
  const familyCandidates = buildPreparedPool(true);
  // Subscription-first routing inputs, captured from the connection read above
  // so no later stage has to touch the DB again.
  const authTypeByConnectionId = new Map<string, string | null>();
  for (const conn of connections) {
    authTypeByConnectionId.set(conn.id, typeof conn.authType === "string" ? conn.authType : null);
  }
  const subscriptionLadder = readSubscriptionLadderSettings(settings);
  if (!options.includeResolvedCapabilities) {
    return { regularCandidates, familyCandidates, authTypeByConnectionId, subscriptionLadder };
  }

  // One uninterrupted bulk read of all three capability tables for this prepare only.
  // Do not yield between the three loads; later cooperative yields remain fine because
  // catalog generation guards already prevent publishing across intervening writes.
  const capabilityState: PreparedCapabilityState = {
    byTarget: new Map(),
    resolvedSinceYield: 0,
    resolutionSnapshot: options.resolutionSnapshot ?? createModelCapabilityResolutionSnapshot(),
  };
  return {
    regularCandidates: await attachPreparedCapabilityValues(regularCandidates, capabilityState),
    familyCandidates: await attachPreparedCapabilityValues(familyCandidates, capabilityState),
    authTypeByConnectionId,
    subscriptionLadder,
  };
}

/**
 * Score candidates at snapshot time using available data (capabilities, tier)
 * and the mode-pack's dominant factors. Runtime telemetry (p95 latency, quota
 * remaining) is not available during combo creation — this uses static signals only.
 *
 * Returns a map from modelStr → normalized weight score [0, 1].
 */
export function computeSnapshotWeights(
  candidates: readonly VirtualAutoComboCandidate[],
  weights: ScoringWeights
): Map<string, number> {
  const scores = new Map<string, number>();
  for (const c of candidates) {
    let score = 0;

    // taskFit: reasoning + vision capable models score higher when taskFit is weighted
    if (weights.taskFit > 0) {
      if (c.resolvedReasoning || c.resolvedSupportsThinking) score += weights.taskFit * 0.6;
      if (c.resolvedSupportsVision) score += weights.taskFit * 0.3;
    }

    // stability: models with richer capabilities are assumed more stable
    if (weights.stability > 0) {
      const capabilityCount =
        Number(c.resolvedReasoning ?? false) +
        Number(c.resolvedSupportsThinking ?? false) +
        Number(c.resolvedSupportsVision ?? false);
      score += weights.stability * Math.min(capabilityCount / 2, 1);
    }

    // Tier-based scoring (single classifyTier call covers both checks)
    let tierInfo: { tier: string } | null = null;
    if (weights.tierPriority > 0 || weights.costInv > 0) {
      try {
        tierInfo = classifyTier(c.provider, c.model);
      } catch {
        // fall through with zero
      }
    }
    if (tierInfo && weights.tierPriority > 0 && tierInfo.tier === "premium")
      score += weights.tierPriority;
    if (tierInfo && weights.costInv > 0 && tierInfo.tier === "free") score += weights.costInv;

    // latencyInv: all candidates get a base score when latency matters
    // (no runtime data at snapshot time, so equal baseline)
    if (weights.latencyInv > 0) score += weights.latencyInv * 0.5;

    // health + quota: no runtime telemetry at snapshot time → neutral baseline
    score += (weights.health + weights.quota) * 0.5;

    scores.set(c.modelStr, Math.min(score, 1));
  }
  return scores;
}

function clonePreparedCandidates(
  candidates: readonly VirtualAutoComboCandidate[]
): VirtualAutoComboCandidate[] {
  return candidates.map((candidate) => ({
    ...candidate,
    ...(candidate.allowedConnectionIds
      ? { allowedConnectionIds: [...candidate.allowedConnectionIds] }
      : {}),
  }));
}

export async function createVirtualAutoComboFromPrepared(
  prepared: PreparedVirtualAutoComboInputs,
  variant: AutoVariant | undefined,
  spec?: AutoComboSpec,
  apiKeyId?: string,
  autoChannel?: string
): Promise<VirtualAutoCombo> {
  let candidatePool = clonePreparedCandidates(
    spec?.family ? prepared.familyCandidates : prepared.regularCandidates
  );

  // #7819 (Level 2): per-API-key candidate exclusions. Fail-open — an absent
  // apiKeyId/autoChannel (every caller before #7819) or a DB lookup failure
  // both leave the pool untouched, so default (unconfigured) routing stays
  // byte-identical to pre-#7819 behavior.
  let excludedConnectionIds: Set<string> = new Set();
  if (apiKeyId && autoChannel) {
    try {
      excludedConnectionIds = await getExcludedConnectionIds(apiKeyId, autoChannel);
    } catch (err) {
      log.warn("AUTO", "Failed to load auto-candidate overrides; routing unfiltered", { err });
    }
  }
  const overrideFilteredPool = filterExcludedCandidates(candidatePool, excludedConnectionIds);
  if (overrideFilteredPool !== candidatePool) {
    candidatePool.length = 0;
    candidatePool.push(...overrideFilteredPool);
  }

  if (candidatePool.length === 0) {
    log.warn("AUTO", "No connected providers with valid credentials for virtual auto-combo");
    const emptyPool: string[] = [];
    const autoConfig = {
      candidatePool: emptyPool,
      weights: { ...DEFAULT_WEIGHTS },
      explorationRate: 0.05,
      routerStrategy: "lkgp",
    };
    return {
      id: `virtual-auto-${variant || "default"}`,
      name: `Auto ${variant || "Default"}`,
      type: "auto" as const,
      strategy: "auto",
      models: [],
      candidatePool: emptyPool,
      weights: autoConfig.weights,
      explorationRate: autoConfig.explorationRate,
      routerStrategy: autoConfig.routerStrategy,
      autoConfig,
      config: { auto: autoConfig },
      advertisedContextLength: null,
      advertisedMaxOutputTokens: null,
    };
  }

  // #4235 Phase B: narrow the pool by the `auto/<category>:<tier>` overlay
  // (vision/reasoning capability, free/premium model tier).
  //
  // Default behavior: when the filter yields zero candidates, return an EMPTY
  // pool — never silently fall back to the full pool. This makes
  // `auto/coding:free` actually mean "free tier only" and prevents a paid
  // expensive model from being picked just because no free provider is
  // connected. Operators who want the old "never break routing, lose the bias"
  // behavior can opt back in via the env var below.
  let effectivePool = candidatePool;
  // #6453: `auto/<family>` narrows by model family instead of category/tier. The
  // two overlays are mutually exclusive on the spec (family takes precedence when
  // both are somehow present, which callers never do in practice).
  const candidateFilter = spec?.family
    ? buildFamilyCandidateFilter(spec.family)
    : spec
      ? buildAutoCandidateFilter(spec.category, spec.tier)
      : null;
  if (candidateFilter) {
    const narrowed = candidatePool.filter((candidate) => candidateFilter(candidate));
    const label = spec?.family
      ? `auto/${spec.family}`
      : `auto/${spec?.category ?? ""}${spec?.tier ? `:${spec.tier}` : ""}`;
    if (narrowed.length > 0) {
      effectivePool = narrowed;
    } else if (
      !spec?.family &&
      (process.env.OMNIROUTE_AUTO_FREE_FALLBACK_TO_FULL_POOL === "true" ||
        process.env.OMNIROUTE_AUTO_FREE_FALLBACK_TO_FULL_POOL === "1")
    ) {
      // Opt-in legacy behavior (category/tier only): warn loudly, then keep the full pool.
      log.warn(
        "AUTO",
        `${label} matched no connected models; falling back to the full pool (OMNIROUTE_AUTO_FREE_FALLBACK_TO_FULL_POOL=true)`
      );
    } else {
      // Family combos always degrade to an empty pool when unavailable — a family
      // is a hard identity constraint, not a soft optimization bias, so there is
      // no sensible "fall back to the full pool" behavior for it.
      warnEmptyAutoPoolOnce(
        label,
        `${label} matched no connected models; returning an empty pool.${spec?.family ? "" : ' Set OMNIROUTE_AUTO_FREE_FALLBACK_TO_FULL_POOL=true to restore the legacy "use full pool" behavior.'}`
      );
      effectivePool = [];
    }
  }

  // Subscription-first routing (`auto/subscription`, `auto/thrifty`). Applied
  // AFTER the category/tier narrowing above because, unlike every other tier,
  // these two select on the connection's billing class and its live quota
  // state rather than on the model's catalog price — see
  // `subscriptionLadder.ts` and `docs/routing/SUBSCRIPTION_LADDER.md`.
  if (spec?.tier === "subscription" || spec?.tier === "thrifty") {
    const ladderOptions = buildLadderOptions(prepared, spec.tier);
    const beforeCount = effectivePool.length;
    effectivePool =
      spec.tier === "subscription"
        ? filterSubscriptionOnlyCandidates(effectivePool, ladderOptions)
        : orderPoolByRung(effectivePool, ladderOptions);
    if (spec.tier === "subscription" && effectivePool.length === 0 && beforeCount > 0) {
      // Intended, not a defect: the operator asked for plan-included capacity
      // only, and right now there is none with verified headroom. Failing
      // closed here is the entire promise of the id — the caller's existing
      // empty-pool path turns it into a clear error rather than a silent,
      // billable fallback.
      warnEmptyAutoPoolOnce(
        "auto/subscription",
        "auto/subscription: no plan-included connection has verified quota headroom; " +
          "returning an empty pool rather than falling back to paid capacity."
      );
    }
  }

  let weights: ScoringWeights = { ...DEFAULT_WEIGHTS };
  let explorationRate = 0.05; // Default exploration rate
  let routerStrategy = "lkgp"; // All auto variants use LKGP

  switch (variant) {
    case "coding":
      weights = { ...MODE_PACKS["quality-first"] };
      break;
    case "fast":
      weights = { ...MODE_PACKS["ship-fast"] };
      break;
    case "cheap":
      weights = { ...MODE_PACKS["cost-saver"] };
      break;
    case "offline":
      weights = { ...MODE_PACKS["offline-friendly"] };
      break;
    case "smart":
      weights = { ...MODE_PACKS["quality-first"] };
      explorationRate = 0.1; // Override default exploration rate
      break;
    case "lkgp":
      // LKGP is default for all auto variants, this variant just explicitly names it.
      // Use default weights.
      break;
    case "chaos":
      // Chaos mode: select top-N most stable models and fan them out in parallel
      // (strategy "fusion"). Prioritize health + stability via the chaos-mode pack.
      weights = { ...MODE_PACKS["chaos-mode"] };
      explorationRate = 0; // no exploration — only the proven-stable set
      break;
    case undefined: // Default auto
      // Use default weights
      break;
  }

  // #4235 Phase B: category/tier weight overlay. A non-chat category leans
  // quality-first; the tier then refines toward latency (fast), cost (cheap/floor)
  // or availability (reliable). free/pro keep the base weights — their bias is the
  // candidate filter above (free → free-tier models, pro → premium models).
  if (spec) {
    if (spec.category && spec.category !== "chat") {
      weights = { ...MODE_PACKS["quality-first"] };
    }
    const weightVariant = tierToWeightVariant(spec.tier);
    if (weightVariant === "fast") {
      weights = { ...MODE_PACKS["ship-fast"] };
    } else if (weightVariant === "cheap") {
      weights = { ...MODE_PACKS["cost-saver"] };
    } else if (weightVariant === "reliability") {
      weights = { ...MODE_PACKS["reliability-first"] };
    }
  }

  const providerPool = [...new Set(effectivePool.map((c) => c.provider))];
  const snapshotScores = computeSnapshotWeights(effectivePool, weights);
  const models = effectivePool.map((candidate, index) => ({
    id: `virtual-auto-${variant || "default"}-${index + 1}-${candidate.provider}`,
    kind: "model" as const,
    model: candidate.modelStr,
    providerId: candidate.provider,
    connectionId: candidate.connectionId,
    ...(candidate.allowedConnectionIds
      ? { allowedConnectionIds: candidate.allowedConnectionIds }
      : {}),
    weight: snapshotScores.get(candidate.modelStr) ?? 1,
    label: candidate.provider,
    ...(candidate.freeAccessExclusion === undefined
      ? {}
      : { freeAccessExclusion: candidate.freeAccessExclusion }),
  }));
  const autoConfig = {
    candidatePool: providerPool,
    weights,
    explorationRate,
    routerStrategy,
  };

  // Chaos mode fans out to the top-N most stable models in parallel. Panel size
  // is capped to keep a single IDE request from fanning out to dozens of providers;
  // operators can override via env var OMNIROUTE_CHAOS_MAX_PANEL (default 5).
  //
  // Provider diversity: when multiple candidates from the same provider exist, only
  // the highest-scored model per provider is included. This prevents a single
  // provider from monopolizing the panel and gives the IDE truly diverse answers.
  const isChaos = variant === "chaos";
  const CHAOS_MAX_PANEL = (() => {
    const env = process.env.OMNIROUTE_CHAOS_MAX_PANEL;
    const parsed = env ? parseInt(env, 10) : 5;
    return Number.isFinite(parsed) && parsed > 0 ? Math.min(parsed, 10) : 5;
  })();
  let chaosModels: typeof models;
  if (isChaos) {
    // Deduplicate by provider: keep first occurrence per provider (models are
    // already scored/sorted by health + stability from scoring).
    const seenProviders = new Set<string>();
    const diverse: typeof models = [];
    for (const m of models) {
      if (seenProviders.has(m.providerId)) continue;
      seenProviders.add(m.providerId);
      diverse.push(m);
      if (diverse.length >= CHAOS_MAX_PANEL) break;
    }
    chaosModels = diverse.length > 0 ? diverse : models.slice(0, CHAOS_MAX_PANEL);
  } else {
    chaosModels = models;
  }

  const advertisedLimits = computeAdvertisedLimits(effectivePool);

  return {
    id: `virtual-auto-${variant || "default"}`,
    name: `Auto ${variant || "Default"}`,
    type: "auto",
    strategy: "auto",
    models: chaosModels,
    candidatePool: providerPool,
    weights,
    explorationRate,
    routerStrategy,
    autoConfig,
    // For chaos, stash the panel size + a flag so downstream handlers can detect
    // the broadcast mode and stream each panel model back to IDEs that opt in.
    config: {
      auto: autoConfig,
      ...(isChaos
        ? {
            chaos: {
              enabled: true,
              panelSize: chaosModels.length,
              judgeModel: chaosModels[0]?.model,
              tuning: {
                panelHardTimeoutMs:
                  Number(process.env.OMNIROUTE_CHAOS_PANEL_TIMEOUT_MS) || undefined,
                minPanel: Number(process.env.OMNIROUTE_CHAOS_MIN_PANEL) || undefined,
              },
            },
          }
        : {}),
    },
    advertisedContextLength: advertisedLimits.contextLength,
    advertisedMaxOutputTokens: advertisedLimits.maxOutputTokens,
  };
}

export async function createVirtualAutoCombo(
  variant: AutoVariant | undefined,
  spec?: AutoComboSpec,
  apiKeyId?: string,
  autoChannel?: string
): Promise<VirtualAutoCombo> {
  const prepared = await prepareVirtualAutoComboInputs();
  return createVirtualAutoComboFromPrepared(prepared, variant, spec, apiKeyId, autoChannel);
}
