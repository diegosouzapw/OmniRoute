import type { Model, Provider } from "@opencode/plugin";
import type { LegacyModel } from "./legacy-model.js";
import {
  isHttpUrl,
  type ApiFormatV2,
  type LogLevel,
  type Logger,
  type OmniRouteAutoCombosFetcher,
  type OmniRouteCombosFetcher,
  type OmniRouteEnrichmentFetcher,
  type OmniRouteEnrichmentMap,
  type OmniRouteModelsFetcher,
  type OmniRouteProviderConnection,
  type OmniRouteProvidersFetcher,
  type OmniRouteRawAutoCombo,
  type OmniRouteRawCombo,
  type OmniRouteRawModelEntry,
  applyEnrichment,
  buildCanonicalToAliasMap,
  canonicalDedupSet,
  createLogger,
  defaultOmniRouteEnrichmentFetcher,
  defaultOmniRouteProvidersFetcher,
  ensureV1Suffix,
  isUsableCombo,
  isUsableRawModelId,
  lookupEnrichment,
  mapAutoComboToModelV2,
  mapComboToModelV2,
  mapRawModelToModelV2,
  usableProviderAliasSet,
} from "./shared/index.js";

export type ModelsFetcher = OmniRouteModelsFetcher;
export type CombosFetcher = OmniRouteCombosFetcher;
export type AutoCombosFetcher = OmniRouteAutoCombosFetcher;
export type ProvidersFetcher = OmniRouteProvidersFetcher;
export type EnrichmentFetcher = OmniRouteEnrichmentFetcher;

export interface EndpointTimeouts {
  models?: number;
  combos?: number;
  autoCombos?: number;
  enrichment?: number;
}

export interface ResolvedOptions {
  providerId: string;
  baseURL: string;
  apiKey: string;
  managementReadToken?: string;
  timeoutMs: number;
  timeouts?: EndpointTimeouts;
  logger?: Logger;
  logLevel?: LogLevel;
  startupDebug?: boolean;
  modelCacheTtlMs: number;
  /** v1 parity: prefix the display name with the upstream provider label. */
  providerTag?: boolean;
  displayName?: string;
  apiFormat?: ApiFormatV2;
  visibleModels?: string[];
  hiddenModels?: string[];
  usableOnly: boolean;
  enrichment?: OmniRouteEnrichmentMap | boolean;
  /**
   * Shared collision-warning dedupe set keyed `cacheKey::comboKey`. When
   * omitted a fresh per-publish set is used. index.ts passes one setup-wide
   * set so a repeated publish (stale replay + refresh) warns once per key.
   */
  collisionWarned?: Set<string>;
}

export interface CatalogFetchers {
  fetcher?: ModelsFetcher;
  combosFetcher?: CombosFetcher;
  autoCombosFetcher?: AutoCombosFetcher;
  providersFetcher?: ProvidersFetcher;
  enrichmentFetcher?: EnrichmentFetcher;
  models?: ModelsFetcher;
  combos?: CombosFetcher;
  autoCombos?: AutoCombosFetcher;
  providers?: ProvidersFetcher;
  enrichment?: EnrichmentFetcher;
  /**
   * Called when a gateway source cannot be read. Without it this function
   * degrades silently — the catalog publishes with raw ids and no combos and
   * nothing says why, which is the failure the plugin path reports.
   */
  onSourceError?: (endpoint: string, reason: string) => void;
}

export type StableModelInfo = Model.Info;
export type StableProviderInfo = Provider.Info;

/**
 * Structural mirror of the stable `ctx.provider.transform` editor, used as
 * the parameter type where the payload is handed to the host (and in tests
 * that fake the editor). Kept as documentation of the contract surface even
 * where only `add` is exercised.
 */
export interface StableProviderEditor {
  add(input: { info: StableProviderInfo; models: readonly StableModelInfo[] }): void;
  get(providerID: string): { provider: StableProviderInfo } | undefined;
  list(): readonly { provider: StableProviderInfo }[];
  update(providerID: string, update: (provider: StableProviderInfo) => void): void;
  remove(providerID: string): void;
  readonly models: {
    set(providerID: string, models: readonly StableModelInfo[]): void;
    update(providerID: string, modelID: string, update: (model: StableModelInfo) => void): void;
    remove(providerID: string, modelID: string): void;
  };
}

/**
 * Project the legacy catalog entry the shared mappers produce onto the
 * stable `Model.Info` shape. The mapper layer stays untouched; only this
 * boundary knows both shapes. Extra legacy-only keys (`api`, `options`,
 * string `release_date`) are dropped, never cast across.
 */
export function legacyToStable(
  providerID: string,
  modelID: string,
  m: LegacyModel,
  apiKey: string,
  baseURL: string
): StableModelInfo {
  if (!m.api || typeof m.api.npm !== "string" || m.api.npm.length === 0) {
    throw new Error(
      "[omniroute-v2] refusing to publish a model without an api block (missing api.npm)"
    );
  }
  if (!isHttpUrl(m.api.url)) {
    throw new Error(
      "[omniroute-v2] refusing to publish a model whose api block carries no http(s) url"
    );
  }
  const stablePackage =
    m.api.npm === "@ai-sdk/anthropic" ? "@opencode/ai/providers/anthropic" : NPM_OPENAI_COMPAT;
  const input: string[] = [];
  if (m.capabilities.input.text) input.push("text");
  if (m.capabilities.input.audio) input.push("audio");
  if (m.capabilities.input.image) input.push("image");
  if (m.capabilities.input.video) input.push("video");
  if (m.capabilities.input.pdf) input.push("pdf");
  const output: string[] = [];
  if (m.capabilities.output.text) output.push("text");
  if (m.capabilities.output.audio) output.push("audio");
  if (m.capabilities.output.image) output.push("image");
  if (m.capabilities.output.video) output.push("video");
  if (m.capabilities.output.pdf) output.push("pdf");
  const variants = Object.entries(m.variants ?? {}).map(([id, body]) => ({
    id,
    settings: { ...(body as Record<string, unknown>) },
    headers: {},
    body: { ...(body as Record<string, unknown>) },
  }));
  const parsed = Date.parse(m.release_date);
  const info = {
    id: modelID,
    modelID,
    providerID,
    ...(m.family !== undefined ? { family: m.family } : {}),
    name: m.name,
    package: stablePackage,
    settings: { baseURL: ensureV1Suffix(baseURL), apiKey },
    headers: { ...m.headers },
    ...(Object.keys(m.options).length > 0 ? { body: { ...m.options } } : {}),
    capabilities: { tools: m.capabilities.toolcall, input, output },
    variants,
    time: { released: Number.isNaN(parsed) ? 0 : parsed },
    cost: [
      { input: m.cost.input, output: m.cost.output, cache: { ...m.cost.cache } },
    ],
    status: m.status,
    enabled: true,
    limit: { ...m.limit },
  } as unknown;
  return info as StableModelInfo;
}

const NPM_OPENAI_COMPAT = "@opencode/ai/providers/openai-compatible";

/**
 * Fail-fast guard for a pre-mapped `api` block: the snapshot filter and the
 * stale-entry suite assert on it, and the beta-replay adapter relies on the
 * same refusal for entries that bypass the mapper. New mapper output always
 * carries a valid block via `resolveApiBlockV2`, so this fires only on stale
 * snapshots or hand-built entries.
 */
export function legacyApiToInfoApi(api: LegacyModel["api"]): {
  id: string;
  type: "aisdk";
  package: string;
  url: string;
} {
  if (!api || typeof api.npm !== "string" || api.npm.length === 0) {
    throw new Error(
      "[omniroute-v2] refusing to publish a model without an api block (missing api.npm)"
    );
  }
  // The host reads `api.url` in `prepareOptions` and never falls back to the
  // provider's own, so a model published without one reaches the AI SDK with no
  // baseURL and fails at call time with a bare `Invalid URL` — no request on the
  // wire, nothing in the gateway logs, no model named.
  if (!isHttpUrl(api.url)) {
    throw new Error(
      "[omniroute-v2] refusing to publish a model whose api block carries no http(s) url"
    );
  }
  return { id: api.id, type: "aisdk", package: api.npm, url: api.url };
}

function legacyCostToInfoCost(cost: LegacyModel["cost"]): StableModelInfo["cost"] {
  const c = [{ input: cost.input, output: cost.output, cache: cost.cache }];
  return c as unknown as StableModelInfo["cost"];
}

function legacyCapabilitiesToInfoCapabilities(
  caps: LegacyModel["capabilities"]
): StableModelInfo["capabilities"] {
  const input: string[] = [];
  if (caps.input.text) input.push("text");
  if (caps.input.audio) input.push("audio");
  if (caps.input.image) input.push("image");
  if (caps.input.video) input.push("video");
  if (caps.input.pdf) input.push("pdf");
  const output: string[] = [];
  if (caps.output.text) output.push("text");
  if (caps.output.audio) output.push("audio");
  if (caps.output.image) output.push("image");
  if (caps.output.video) output.push("video");
  if (caps.output.pdf) output.push("pdf");
  return { tools: caps.toolcall, input, output };
}

function legacyToInfo(providerID: string, modelID: string, m: LegacyModel): StableModelInfo {
  const variants = Object.entries(m.variants ?? {}).map(([id, body]) => ({
    id,
    headers: {},
    body: body as Record<string, unknown>,
  }));
  const parsed = Date.parse(m.release_date);
  const out = {
    id: modelID,
    modelID,
    providerID,
    ...(m.family !== undefined ? { family: m.family } : {}),
    name: m.name,
    capabilities: legacyCapabilitiesToInfoCapabilities(m.capabilities),
    headers: { ...m.headers },
    variants,
    time: { released: Number.isNaN(parsed) ? 0 : parsed },
    cost: legacyCostToInfoCost(m.cost),
    status: m.status,
    enabled: true,
    limit: { ...m.limit },
  };
  return out as unknown as StableModelInfo;
}

export interface PublishCounts {
  models: number;
  combos: number;
  autoCombos: number;
}

export interface ModelListFilter {
  exact: Set<string>;
  suffixes: Set<string>;
}

export function compileModelListFilter(list?: string[]): ModelListFilter | undefined {
  if (!list || list.length === 0) return undefined;
  const exact = new Set<string>();
  const suffixes = new Set<string>();
  for (const id of list) {
    if (id.includes("/")) {
      exact.add(id);
    } else {
      suffixes.add(id);
    }
  }
  if (exact.size === 0 && suffixes.size === 0) return undefined;
  return { exact, suffixes };
}

function matchesSuffix(id: string, suffixes: Set<string>): boolean {
  if (suffixes.size === 0) return false;
  const slash = id.indexOf("/");
  const suffix = slash > 0 ? id.slice(slash + 1) : id;
  return suffixes.has(suffix);
}

export function passesModelAllowlist(
  id: string,
  visible?: ModelListFilter,
  hidden?: ModelListFilter
): boolean {
  if (hidden) {
    if (hidden.exact.has(id) || matchesSuffix(id, hidden.suffixes)) return false;
  }
  if (visible) {
    if (!visible.exact.has(id) && !matchesSuffix(id, visible.suffixes)) return false;
  }
  return true;
}

export function passesComboAllowlist(combo: OmniRouteRawCombo, visible?: ModelListFilter): boolean {
  if (!visible) return true;
  const steps = Array.isArray(combo.models) ? combo.models : [];
  if (steps.length === 0) return true;
  let sawResolvableMember = false;
  for (const step of steps) {
    if (step?.kind === "combo-ref") continue;
    const modelId = typeof step?.model === "string" ? step.model : "";
    if (modelId.length === 0) continue;
    sawResolvableMember = true;
    if (visible.exact.has(modelId) || matchesSuffix(modelId, visible.suffixes)) return true;
  }
  if (!sawResolvableMember) return true;
  return false;
}

/**
 * Copy the converted legacy fields onto a stable `Model.Info` target.
 * Kept for the beta-replay adapter below (`publishCatalog`), which reuses it
 * per entry; new code calls `legacyToStable` via `buildProviderPayload`.
 */
export function assignModelFields(
  target: StableModelInfo,
  source: LegacyModel,
  apiKey: string,
  baseURL: string
): void {
  const info = legacyToStable(
    (target.providerID as string) || source.providerID,
    (target.id as string) || source.id,
    source,
    apiKey,
    baseURL
  );
  Object.assign(target, info);
}

/**
 * Copy the provider identity fields onto a stable `Provider.Info` target.
 * Kept for the beta-replay adapter below (`publishCatalog` writes `name` /
 * `integrationID` through it before adding stable fields); new code builds
 * the provider object inline in `buildProviderPayload`.
 */
export function assignProviderFields(
  target: StableProviderInfo,
  source: { name: string; integrationID: string },
  _contract?: unknown
): void {
  (target as { name: string }).name = source.name;
  (target as { integrationID: string }).integrationID = source.integrationID;
}

/** A widened capability flag (`boolean | { field }`) read back as a plain flag. */
function isCapabilityEnabled(value: boolean | { field: string }): boolean {
  return value !== false;
}

/**
 * Combo steps reach us from the gateway with a shape the SDK types do not
 * describe (`kind`, `comboName`, `model` appear per step kind). One reader
 * keeps that single untyped boundary in one place instead of scattering casts.
 */
function readStepField(step: unknown, key: "kind" | "comboName" | "model"): unknown {
  return (step as Record<string, unknown> | null | undefined)?.[key];
}

/**
 * Resolve the display-name + pricing overlay. A caller may hand over a
 * ready-made map (tests, pre-resolved overlays) or turn the fetch off; a
 * failed fetch soft-fails to an empty map so the catalog still publishes,
 * with mapper-default names and zeroed pricing rather than nothing at all.
 */
async function resolveEnrichmentOverlay(
  opts: ResolvedOptions,
  fetchers: CatalogFetchers | undefined,
  log: Logger
): Promise<OmniRouteEnrichmentMap> {
  if (opts.enrichment instanceof Map) return opts.enrichment;
  if (opts.enrichment === false) return new Map();
  const fetchEnrichment =
    fetchers?.enrichmentFetcher ?? fetchers?.enrichment ?? defaultOmniRouteEnrichmentFetcher;
  try {
    return await fetchEnrichment(
      opts.baseURL,
      opts.managementReadToken ?? opts.apiKey,
      opts.timeouts?.enrichment ?? opts.timeoutMs,
      fetchers?.onSourceError
    );
  } catch (err) {
    log.warn(
      `[omniroute-v2] enrichment fetch failed, continuing without names/pricing: ${err instanceof Error ? err.message : String(err)}`
    );
    return new Map();
  }
}

/**
 * Resolve the provider aliases worth publishing when `usableOnly` is on.
 * Gated on the flag, so the default configuration issues no request at all.
 * The filter subtracts: a failed or empty connections fetch yields
 * `undefined` and keeps the whole catalog, because only a prefix proven not
 * provisioned may be dropped.
 */
async function resolveUsableAliases(
  opts: ResolvedOptions,
  providersFetcher: OmniRouteProvidersFetcher | undefined,
  onSourceError: ((endpoint: string, reason: string) => void) | undefined,
  enrichment: OmniRouteEnrichmentMap,
  timeoutMs: number,
  log: Logger
): Promise<ReturnType<typeof usableProviderAliasSet> | undefined> {
  if (!opts.usableOnly) return undefined;
  let rawConnections: OmniRouteProviderConnection[];
  try {
    const fetchProviders = providersFetcher ?? defaultOmniRouteProvidersFetcher;
    rawConnections = await fetchProviders(
      opts.baseURL,
      opts.managementReadToken ?? opts.apiKey,
      timeoutMs,
      onSourceError
    );
  } catch (err) {
    log.warn(
      `[omniroute-v2] providers fetch failed, usableOnly filter disabled for this refresh: ${err instanceof Error ? err.message : String(err)}`
    );
    rawConnections = [];
  }
  return rawConnections.length > 0 ? usableProviderAliasSet(rawConnections, enrichment) : undefined;
}

/** Everything the combo collection pass reads, passed as one value. */
interface PublishContext {
  opts: ResolvedOptions;
  log: Logger;
  providerId: string;
  enrichment: OmniRouteEnrichmentMap;
  rawModelById: Map<string, OmniRouteRawModelEntry>;
  collected: Map<string, LegacyModel>;
  publishedKeys: Set<string>;
  publishedModelIds: Map<string, string>;
  visibleFilter: ReturnType<typeof compileModelListFilter>;
  hiddenFilter: ReturnType<typeof compileModelListFilter>;
  usable: ReturnType<typeof usableProviderAliasSet> | undefined;
  canonicalToAlias: ReturnType<typeof buildCanonicalToAliasMap>;
  combosFetcher: CatalogFetchers["combos"] | undefined;
  combosTimeout: number;
  /** Shared with the auto-combos pass: one collision warning per key, per run. */
  warnedCombos: Set<string>;
  cacheKey: string;
}

/**
 * Fetch the gateway's combos and publish them, resolving nested combo-refs to
 * a fixpoint first: a combo whose members are themselves combos only knows its
 * lowest common denominator once those are known. Combos that never resolve
 * are dropped rather than published with a fabricated capability set, and
 * reported once.
 *
 * Returns the number published, or `undefined` when the combos fetch failed —
 * the caller then publishes a models-only catalog instead of an empty one.
 */
async function publishCombos(ctx: PublishContext): Promise<number | undefined> {
  const {
    opts,
    log,
    providerId: X,
    enrichment,
    rawModelById,
    collected,
    publishedKeys,
    publishedModelIds,
    visibleFilter,
    hiddenFilter,
    usable,
    canonicalToAlias,
    combosFetcher,
    combosTimeout,
    warnedCombos,
    cacheKey,
  } = ctx;
  let rawCombos: OmniRouteRawCombo[];
  try {
    rawCombos = combosFetcher
      ? await combosFetcher(opts.baseURL, opts.managementReadToken ?? opts.apiKey, combosTimeout)
      : [];
  } catch (err) {
    log.warn(
      `[omniroute-v2] combos fetch failed, falling back to models-only catalog: ${err instanceof Error ? err.message : String(err)}`
    );
    return undefined;
  }

  let comboCount = 0;
  // Ported from v1 (fixpoint 8 passes + warn once per (cacheKey, comboKey)
  // + intentional-dedup exception). Nested combo-refs resolve against the
  // friendly combo name; unresolvable combos are dropped (never published
  // with a fabricated empty LCD) and reported once.
  const MAX_COMBO_PASSES = 8;
  const pending = rawCombos.filter((combo) => {
    if (!combo || !combo.id) return false;
    if (combo.isHidden === true) return false;
    if (usable && !isUsableCombo(combo, usable)) return false;
    if (visibleFilter && !passesComboAllowlist(combo, visibleFilter)) return false;
    // Deny wins for combos too: a user who hides an id expects it gone from
    // the picker whether it is a model or a combo built on it.
    if (hiddenFilter && passesComboAllowlist(combo, hiddenFilter)) return false;
    return true;
  });
  const resolvedByName = new Map<string, LegacyModel>();
  let unresolved: typeof pending = [];

  for (let pass = 0; pass < MAX_COMBO_PASSES && pending.length > 0; pass++) {
    const stillPending: typeof pending = [];
    for (const combo of pending) {
      const memberSteps = Array.isArray(combo.models) ? combo.models : [];
      const memberEntries: OmniRouteRawModelEntry[] = [];
      let deferred = false;
      for (const step of memberSteps) {
        const kind = readStepField(step, "kind");
        if (kind === "combo-ref") {
          const comboName = readStepField(step, "comboName");
          if (typeof comboName !== "string" || comboName.length === 0) continue;
          const nested = resolvedByName.get(comboName);
          if (!nested) {
            deferred = true;
            break;
          }
          memberEntries.push(synthesizeNestedMember(comboName, nested));
          continue;
        }
        const modelId = readStepField(step, "model");
        if (typeof modelId !== "string" || modelId.length === 0) continue;
        const member = rawModelById.get(modelId);
        if (member) memberEntries.push(member);
      }
      if (deferred) {
        stillPending.push(combo);
        continue;
      }
      const mapped = mapComboToModelV2(combo, memberEntries, X, opts.baseURL, opts.apiFormat);
      applyEnrichment(mapped, lookupEnrichment(combo.id, enrichment, canonicalToAlias), {
        isCombo: true,
      });
      const mid = mapped.id.startsWith(X + "/") ? mapped.id.slice(X.length + 1) : mapped.id;
      const key = X + "/" + mid;
      if (publishedKeys.has(key)) {
        // Intentional dedup (v1 parity): `/v1/models` pre-mirrors combos as
        // raw entries, so the combo's friendly NAME matches the overwritten
        // entry's model id (bare or provider-prefixed, endsWith to cover
        // both). Only warn on a genuine accidental collision (name differs
        // from the entry it overwrites).
        const existingId = publishedModelIds.get(key) ?? "";
        const friendly =
          typeof combo.name === "string" && combo.name.trim().length > 0
            ? combo.name.trim()
            : combo.id;
        const isIntentionalDedup =
          existingId === friendly ||
          existingId === X + "/" + friendly ||
          existingId.endsWith("/" + friendly);
        if (!isIntentionalDedup) {
          const dedupeKey = `${cacheKey}::${key}`;
          if (!warnedCombos.has(dedupeKey)) {
            warnedCombos.add(dedupeKey);
            log.warn(`[omniroute-v2] combo key "${key}" collides with a model id; combo wins.`);
          }
        }
      }
      collected.set(key, mapped);
      publishedKeys.add(key);
      publishedModelIds.set(key, mapped.id);
      comboCount += 1;
      const lookupName =
        typeof combo.name === "string" && combo.name.trim().length > 0
          ? combo.name.trim()
          : combo.id;
      if (!resolvedByName.has(lookupName)) resolvedByName.set(lookupName, mapped);
    }
    if (stillPending.length === pending.length) {
      unresolved = stillPending;
      break;
    }
    unresolved = stillPending;
    pending.length = 0;
    pending.push(...stillPending);
  }

  if (unresolved.length > 0) {
    log.warn(
      `[omniroute-v2] ${unresolved.length} combo(s) could not resolve all nested combo-refs after ${MAX_COMBO_PASSES} passes; dropped to avoid over-claiming.`
    );
  }
  return comboCount;
}

/**
 * Synthesize a raw-model entry from an already-resolved nested combo so a
 * parent combo's LCD folds the whole nested capability vector (context,
 * output, modalities, capabilities) instead of only direct raw members.
 * v1 parity (combo member synthesis at nested resolution time).
 */
function synthesizeNestedMember(name: string, nested: LegacyModel): OmniRouteRawModelEntry {
  const inputModalities: string[] = [];
  if (nested.capabilities.input.text) inputModalities.push("text");
  if (nested.capabilities.input.audio) inputModalities.push("audio");
  if (nested.capabilities.input.image) inputModalities.push("image");
  if (nested.capabilities.input.video) inputModalities.push("video");
  if (nested.capabilities.input.pdf) inputModalities.push("pdf");
  const outputModalities: string[] = [];
  if (nested.capabilities.output.text) outputModalities.push("text");
  if (nested.capabilities.output.audio) outputModalities.push("audio");
  if (nested.capabilities.output.image) outputModalities.push("image");
  if (nested.capabilities.output.video) outputModalities.push("video");
  if (nested.capabilities.output.pdf) outputModalities.push("pdf");
  return {
    id: `combo-ref:${name}`,
    context_length: nested.limit.context,
    max_output_tokens: nested.limit.output,
    ...(nested.limit.input !== undefined ? { max_input_tokens: nested.limit.input } : {}),
    owned_by: "combo",
    input_modalities: inputModalities,
    output_modalities: outputModalities,
    capabilities: {
      temperature: nested.capabilities.temperature,
      // A raw entry carries plain flags; the mapped model widens them to
      // `boolean | { field }` (custom reasoning/thinking field). Every
      // non-false form means the capability is present, which is all the
      // LCD fold reads.
      reasoning: isCapabilityEnabled(nested.capabilities.reasoning),
      thinking: isCapabilityEnabled(nested.capabilities.interleaved),
      attachment: nested.capabilities.attachment,
      tool_calling: nested.capabilities.toolcall,
    },
  };
}

/**
 * Collect the full catalog (models + combos + auto-combos) as legacy entries
 * keyed `providerId/bareId`, then project them onto the stable contract in
 * `buildProviderPayload`. Collect-then-project keeps every fetch/filter/LCD
 * behavior identical to the beta path while the only host touchpoint is the
 * single `editor.add` in the payload builder.
 */
export interface CollectedCatalog {
  entries: Map<string, LegacyModel>;
  counts: PublishCounts;
}

export async function collectCatalog(
  opts: ResolvedOptions,
  fetchers?: CatalogFetchers
): Promise<CollectedCatalog> {
  const X = opts.providerId;
  const log = opts.logger ?? createLogger(opts.startupDebug ? "debug" : (opts.logLevel ?? "warn"));
  const modelsTimeout = opts.timeouts?.models ?? opts.timeoutMs;
  const combosTimeout = opts.timeouts?.combos ?? opts.timeoutMs;
  // v1 parity keeps the 5s auto-combos budget when no per-endpoint value is
  // set (P2 resolves it in index.ts; direct publishCatalog callers may only
  // pass timeoutMs).
  const autoCombosTimeout = opts.timeouts?.autoCombos ?? 5_000;

  const modelsFetcher = fetchers?.fetcher ?? fetchers?.models;
  const combosFetcher = fetchers?.combosFetcher ?? fetchers?.combos;
  const autoCombosFetcher = fetchers?.autoCombosFetcher ?? fetchers?.autoCombos;
  const providersFetcher = fetchers?.providersFetcher ?? fetchers?.providers;

  const empty: CollectedCatalog = {
    entries: new Map(),
    counts: { models: 0, combos: 0, autoCombos: 0 },
  };
  let rawModels: OmniRouteRawModelEntry[];
  try {
    rawModels = modelsFetcher ? await modelsFetcher(opts.baseURL, opts.apiKey, modelsTimeout) : [];
  } catch (err) {
    log.warn(
      `[omniroute-v2] models fetch failed, publishing empty catalog: ${err instanceof Error ? err.message : String(err)}`
    );
    return empty;
  }

  const visibleFilter = compileModelListFilter(opts.visibleModels);
  const hiddenFilter = compileModelListFilter(opts.hiddenModels);

  const enrichment = await resolveEnrichmentOverlay(opts, fetchers, log);
  const canonicalToAlias = buildCanonicalToAliasMap(enrichment);
  const canonicalDedup = canonicalDedupSet(rawModels, canonicalToAlias);

  const usable = await resolveUsableAliases(
    opts,
    providersFetcher,
    fetchers?.onSourceError,
    enrichment,
    modelsTimeout,
    log
  );

  const rawModelById = new Map<string, OmniRouteRawModelEntry>();
  for (const entry of rawModels) {
    if (entry.id) rawModelById.set(entry.id, entry);
  }

  const publishedKeys = new Set<string>();
  // Mapped model id per published key (models and combos alike). Mirrors
  // v1's `models[comboKey]` lookup so the intentional-dedup check sees the
  // overwritten entry's id, not just key presence.
  const publishedModelIds = new Map<string, string>();
  const collected = new Map<string, LegacyModel>();
  let modelCount = 0;
  for (const entry of rawModels) {
    if (!entry.id) continue;
    if (canonicalDedup.has(entry.id)) continue;
    if (usable && !isUsableRawModelId(entry.id, usable)) continue;
    if (!passesModelAllowlist(entry.id, visibleFilter, hiddenFilter)) continue;
    const mapped = mapRawModelToModelV2(entry, {
      providerId: X,
      baseURL: opts.baseURL,
      apiFormat: opts.apiFormat,
    });
    applyEnrichment(mapped, lookupEnrichment(entry.id, enrichment, canonicalToAlias), {
      providerTag: opts.providerTag !== false,
    });
    const mid = mapped.id.startsWith(X + "/") ? mapped.id.slice(X.length + 1) : mapped.id;
    const key = X + "/" + mid;
    collected.set(key, mapped);
    publishedKeys.add(key);
    publishedModelIds.set(key, mapped.id);
    modelCount += 1;
  }

  const warnedCombos = opts.collisionWarned ?? new Set<string>();
  const cacheKey = `${opts.baseURL}::${opts.providerId}`;
  const comboCount = await publishCombos({
    opts,
    log,
    providerId: X,
    enrichment,
    rawModelById,
    collected,
    publishedKeys,
    publishedModelIds,
    visibleFilter,
    hiddenFilter,
    usable,
    canonicalToAlias,
    combosFetcher,
    combosTimeout,
    warnedCombos,
    cacheKey,
  });
  if (comboCount === undefined)
    return { entries: collected, counts: { models: modelCount, combos: 0, autoCombos: 0 } };

  // Migration: v1 published opencode-X; v2 publishes X bare. Sessions pinned
  // opencode-X resolve ModelUnavailableError -- see RELEASE.md migration note.
  // Re-publishing under "opencode-"+X here is FORBIDDEN: a double
  // publish would double chat entries in the picker.

  // Auto combos: virtual server-side entries from /api/combos/auto, keyed
  // "auto" / "auto/<variant>" (v1 parity). Fail-open: a fetcher throw keeps
  // models + combos and only warns - old gateways may not serve the
  // endpoint at all (the default fetcher maps 404 to [] itself).
  let rawAutoCombos: OmniRouteRawAutoCombo[];
  try {
    rawAutoCombos = autoCombosFetcher
      ? await autoCombosFetcher(
          opts.baseURL,
          opts.managementReadToken ?? opts.apiKey,
          autoCombosTimeout
        )
      : [];
  } catch (err) {
    log.warn(
      `[omniroute-v2] auto combos fetch failed, falling back to models+combos catalog: ${err instanceof Error ? err.message : String(err)}`
    );
    return { entries: collected, counts: { models: modelCount, combos: comboCount, autoCombos: 0 } };
  }

  let autoComboCount = 0;
  for (const autoCombo of rawAutoCombos) {
    if (!autoCombo || !autoCombo.id) continue;
    if (autoCombo.isHidden === true) continue;
    // Auto combos are catalog entries like any other: an id a user asked to
    // hide must stay hidden, and an allowlist that excludes it must exclude
    // it. They used to skip both filters entirely.
    if (!passesModelAllowlist(autoCombo.id, visibleFilter, hiddenFilter)) continue;
    if (usable && !isUsableRawModelId(autoCombo.id, usable)) continue;
    const mapped = mapAutoComboToModelV2(autoCombo, X, opts.baseURL, opts.apiFormat);
    applyEnrichment(mapped, lookupEnrichment(autoCombo.id, enrichment, canonicalToAlias), {
      isCombo: true,
      isAutoCombo: true,
    });
    const key = X + "/" + mapped.id;
    if (publishedKeys.has(key)) {
      const dedupeKey = `${cacheKey}::${key}`;
      if (!warnedCombos.has(dedupeKey)) {
        warnedCombos.add(dedupeKey);
        log.warn(
          `[omniroute-v2] auto combo key "${key}" collides with a model id; auto combo wins.`
        );
      }
    }
    collected.set(key, mapped);
    publishedKeys.add(key);
    publishedModelIds.set(key, mapped.id);
    autoComboCount += 1;
  }

  return { entries: collected, counts: { models: modelCount, combos: comboCount, autoCombos: autoComboCount } };
}

/**
 * Project a collected catalog onto the stable contract: one provider `info`
 * plus one `Model.Info` per entry. The provider carries the endpoint and the
 * inference key (`settings.baseURL` + `settings.apiKey`, verified live
 * against 2.0.12) so inference authenticates; each model repeats them because
 * the host merges model settings over provider settings at request time.
 */
export function buildProviderPayload(
  collected: CollectedCatalog,
  opts: ResolvedOptions
): { info: StableProviderInfo; models: StableModelInfo[] } {
  const X = opts.providerId;
  const info = {
    id: X,
    name: opts.displayName ?? "OmniRoute",
    activation: "enabled",
    package: NPM_OPENAI_COMPAT,
    settings: { baseURL: ensureV1Suffix(opts.baseURL), apiKey: opts.apiKey },
    integrationID: X,
  } as unknown as StableProviderInfo;
  const models: StableModelInfo[] = [];
  for (const [key, legacy] of collected.entries) {
    const slash = key.indexOf("/");
    const bareId = slash > 0 ? key.slice(slash + 1) : legacy.id;
    models.push(legacyToStable(X, bareId, legacy, opts.apiKey, opts.baseURL));
  }
  return { info, models };
}

/**
 * Beta-draft publish path: replays a collected catalog into a beta
 * `CatalogDraft`-shaped editor. The 19 legacy suite files drive it with
 * injected fetchers and read back `api`/`request` aliases plus counts, so
 * removing it means rewriting those files to `collectCatalog` +
 * `buildProviderPayload` (done for host-contract/api-package/smoke; the rest
 * keep the adapter). New product code uses `collectCatalog` +
 * `buildProviderPayload` directly; `src/index.ts` never calls this.
 */
export async function publishCatalog(
  draft: {
    provider: { update: (id: string, fn: (p: Record<string, unknown>) => void) => void };
    model: {
      update: (pid: string, mid: string, fn: (m: Record<string, unknown>) => void) => void;
    };
  },
  opts: ResolvedOptions,
  fetchers?: CatalogFetchers
): Promise<PublishCounts> {
  const collected = await collectCatalog(opts, fetchers);
  const payload = buildProviderPayload(collected, opts);
  const X = opts.providerId;
  draft.provider.update(X, (p) => {
    const info = payload.info as unknown as Record<string, unknown>;
    for (const [k, v] of Object.entries(info)) p[k] = v;
    // Beta-shaped aliases the legacy suite reads: `api` block plus
    // `request` (headers/body). The stable payload carries the same data as
    // top-level `package`/`settings`/`headers`/`body`.
    const settings = (info.settings ?? {}) as Record<string, unknown>;
    const npm = String(info.package ?? "").replace("@opencode/ai/providers/", "@ai-sdk/");
    p["api"] = { type: "aisdk", package: npm, url: settings["baseURL"] };
    p["request"] = { headers: (info.headers ?? {}) as Record<string, string>, body: (info.body ?? {}) as Record<string, unknown> };
  });
  for (const m of collected.entries.keys()) {
    const slash = m.indexOf("/");
    const mid = slash > 0 ? m.slice(slash + 1) : m;
    const stable = payload.models.find(
      (s) => (s.id as string) === mid || `${X}/${s.id as string}` === m
    );
    if (!stable) continue;
    draft.model.update(X, mid, (target) => {
      for (const [k, v] of Object.entries(stable as unknown as Record<string, unknown>))
        target[k] = v;
      // Beta-shaped aliases, same projection as the provider above.
      const s = stable as unknown as Record<string, any>;
      const npm = String(s.package ?? "").replace("@opencode/ai/providers/", "@ai-sdk/");
      target["api"] = { type: "aisdk", package: npm, url: s.settings?.baseURL };
      target["request"] = { headers: s.headers ?? {}, body: s.body ?? {} };
    });
  }
  return collected.counts;
}
