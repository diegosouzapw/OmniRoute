import type { CatalogDraft } from "@opencode-ai/plugin/v2/promise";
import { type HostContract, detectHostContract, emitsLegacyFields } from "./compat.js";
import type { Model as LegacyModelV2 } from "@opencode-ai/sdk/v2";
import type { ModelV2Info, ProviderV2Info } from "@opencode-ai/sdk/v2/types";
import {
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

// The shared mappers speak the legacy (`Provider.models[id]`) `Model` shape
// (imported from `@opencode-ai/sdk/v2`, also re-exported by the plugin root
// as `ModelV2`); the real v2 `CatalogDraft` carries `ModelV2Info` instead.
// Convert the fields 1:1 at the draft boundary -- NEVER `as unknown as` the
// whole model.
//
// Binary-compat note: the prod binary (beta-17823) reads a top-level
// `package` field on both Model and Provider structs (`package:a.Package`,
// gated by `isAISDK = startsWith("aisdk:")`), with a model-to-provider
// fallback (`package: u.package ?? s.package`). The pinned SDK types
// (1.18.29) only know the `api` block, so the binary field is published via
// the typed extensions below (spread/Object.assign, never `any`).
export const BINARY_AISDK_PREFIX = "aisdk:";

/** Top-level `package` as the legacy contract expects it (`aisdk:<npm>`). */
export interface BinaryCompatPackage {
  package: string;
}

/**
 * The legacy contract keeps on the model/provider itself what the `api` block
 * carries in the pinned types: the aisdk package, the endpoint (as
 * `settings.baseURL`) and the per-request headers. None of these keys collide
 * with a key of `ModelV2Info`/`ProviderV2Info`, so both field sets can be
 * published on the same object.
 */
export interface BinaryCompatFields extends BinaryCompatPackage {
  settings: Record<string, unknown>;
  headers: Record<string, string>;
}

/** Legacy variants read their options from `settings`, not `headers`/`body`. */
export type BinaryCompatVariant = ModelV2Info["variants"][number] & {
  settings: Record<string, unknown>;
};

export type BinaryCompatModel = ModelV2Info & BinaryCompatFields;
export type BinaryCompatProvider = ProviderV2Info &
  BinaryCompatPackage & {
    settings: Record<string, unknown>;
  };

export function toBinaryPackage(npm: string): string {
  return npm.startsWith(BINARY_AISDK_PREFIX) ? npm : `${BINARY_AISDK_PREFIX}${npm}`;
}
export function legacyApiToInfoApi(api: LegacyModelV2["api"]): ModelV2Info["api"] {
  if (!api || typeof api.npm !== "string" || api.npm.length === 0) {
    throw new Error(
      "[omniroute-v2] refusing to publish a model without an api block (missing api.npm)"
    );
  }
  return { id: api.id, type: "aisdk", package: api.npm, url: api.url };
}

function legacyCostToInfoCost(cost: LegacyModelV2["cost"]): ModelV2Info["cost"] {
  return [{ input: cost.input, output: cost.output, cache: cost.cache }];
}

function legacyCapabilitiesToInfoCapabilities(
  caps: LegacyModelV2["capabilities"]
): ModelV2Info["capabilities"] {
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

function legacyToInfo(providerID: string, modelID: string, m: LegacyModelV2): ModelV2Info {
  const variants = Object.entries(m.variants ?? {}).map(([id, body]) => ({
    id,
    headers: {},
    body: body as Record<string, unknown>,
  }));
  const parsed = Date.parse(m.release_date);
  return {
    id: modelID,
    providerID,
    ...(m.family !== undefined ? { family: m.family } : {}),
    name: m.name,
    api: legacyApiToInfoApi(m.api),
    capabilities: legacyCapabilitiesToInfoCapabilities(m.capabilities),
    request: { headers: { ...m.headers }, body: { ...m.options } },
    variants,
    time: { released: Number.isNaN(parsed) ? 0 : parsed },
    cost: legacyCostToInfoCost(m.cost),
    status: m.status,
    enabled: true,
    limit: { ...m.limit },
  };
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
 * Project the `api` block onto the legacy top-level fields. Only the `aisdk`
 * variant of `ModelApi`/`ProviderApi` carries a package, so the caller narrows
 * before calling; a `native` api has no legacy equivalent and publishes
 * nothing (the legacy contract has no native models).
 */
function legacyModelFields(info: ModelV2Info): BinaryCompatFields | undefined {
  if (info.api.type !== "aisdk") return undefined;
  const settings: Record<string, unknown> = {
    ...(info.api.settings ?? {}),
    ...info.request.body,
  };
  if (info.api.url !== undefined) settings.baseURL = info.api.url;
  return {
    package: toBinaryPackage(info.api.package),
    settings,
    headers: { ...info.request.headers },
  };
}

/** `{id, headers, body}` (pinned types) plus `{settings}` (legacy contract). */
function legacyVariants(variants: ModelV2Info["variants"]): BinaryCompatVariant[] {
  return variants.map((variant) => ({ ...variant, settings: { ...variant.body } }));
}

function assignModelFields(
  target: ModelV2Info,
  source: LegacyModelV2,
  contract: HostContract
): void {
  const info = legacyToInfo(target.providerID || source.providerID, target.id || source.id, source);
  target.name = info.name;
  target.api = info.api;
  target.capabilities = info.capabilities;
  target.request = info.request;
  target.variants = info.variants;
  target.time = info.time;
  target.cost = info.cost;
  target.status = info.status;
  target.enabled = info.enabled;
  target.limit = info.limit;
  if (info.family !== undefined) {
    target.family = info.family;
  }
  if (!emitsLegacyFields(contract)) return;
  const legacy = legacyModelFields(info);
  if (legacy !== undefined) {
    Object.assign(target, legacy);
    target.variants = legacyVariants(info.variants);
  }
}

function assignProviderFields(
  target: ProviderV2Info,
  source: { name: string; api: ProviderV2Info["api"]; integrationID: string },
  contract: HostContract
): void {
  target.name = source.name;
  target.api = source.api;
  target.integrationID = source.integrationID;
  if (!emitsLegacyFields(contract)) return;
  // The legacy contract defaults `Provider.Info.package` to `""` and model
  // resolution falls back to it (`package: model.package ?? provider.package`),
  // so the provider carries the same `aisdk:<npm>` value as its models, and
  // the endpoint as `settings.baseURL`.
  if (source.api.type !== "aisdk") return;
  const settings: Record<string, unknown> = { ...(source.api.settings ?? {}) };
  if (source.api.url !== undefined) settings.baseURL = source.api.url;
  Object.assign(target, { package: toBinaryPackage(source.api.package), settings });
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

/** Everything the combo publishing pass reads, passed as one value. */
interface PublishContext {
  draft: CatalogDraft;
  opts: ResolvedOptions;
  log: Logger;
  providerId: string;
  hostContract: HostContract;
  enrichment: OmniRouteEnrichmentMap;
  rawModelById: Map<string, OmniRouteRawModelEntry>;
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
    draft,
    opts,
    log,
    providerId: X,
    hostContract,
    enrichment,
    rawModelById,
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
  const resolvedByName = new Map<string, LegacyModelV2>();
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
      draft.model.update(X, mid, (m) => {
        assignModelFields(m, mapped, hostContract);
      });
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
function synthesizeNestedMember(name: string, nested: LegacyModelV2): OmniRouteRawModelEntry {
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

export async function publishCatalog(
  draft: CatalogDraft,
  opts: ResolvedOptions,
  fetchers?: CatalogFetchers
): Promise<PublishCounts> {
  const X = opts.providerId;
  const log = opts.logger ?? createLogger(opts.startupDebug ? "debug" : (opts.logLevel ?? "warn"));
  const modelsTimeout = opts.timeouts?.models ?? opts.timeoutMs;
  const combosTimeout = opts.timeouts?.combos ?? opts.timeoutMs;
  // v1 parity keeps the 5s auto-combos budget when no per-endpoint value is
  // set (P2 resolves it in index.ts; direct publishCatalog callers may only
  // pass timeoutMs).
  const autoCombosTimeout = opts.timeouts?.autoCombos ?? 5_000;
  // The contract is discovered from the object the host seeds into the
  // provider draft, which the host fills before any model is published. The
  // verdict is then reused for every model: the model seed carries no
  // discriminating key, and a single provider/model pair always speaks one
  // contract.
  let hostContract: HostContract = "unknown";
  draft.provider.update(X, (p) => {
    hostContract = detectHostContract(p);
    assignProviderFields(
      p,
      {
        name: opts.displayName ?? "OmniRoute",
        api: {
          type: "aisdk",
          package: "@ai-sdk/openai-compatible",
          url: ensureV1Suffix(opts.baseURL),
        },
        integrationID: X,
      },
      hostContract
    );
  });
  log.debug(`[omniroute-v2] host catalog contract detected: ${hostContract}`);

  const modelsFetcher = fetchers?.fetcher ?? fetchers?.models;
  const combosFetcher = fetchers?.combosFetcher ?? fetchers?.combos;
  const autoCombosFetcher = fetchers?.autoCombosFetcher ?? fetchers?.autoCombos;
  const providersFetcher = fetchers?.providersFetcher ?? fetchers?.providers;

  let rawModels: OmniRouteRawModelEntry[];
  try {
    rawModels = modelsFetcher ? await modelsFetcher(opts.baseURL, opts.apiKey, modelsTimeout) : [];
  } catch (err) {
    log.warn(
      `[omniroute-v2] models fetch failed, publishing empty catalog: ${err instanceof Error ? err.message : String(err)}`
    );
    return { models: 0, combos: 0, autoCombos: 0 };
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
    draft.model.update(X, mid, (m) => {
      assignModelFields(m, mapped, hostContract);
    });
    publishedKeys.add(X + "/" + mid);
    publishedModelIds.set(X + "/" + mid, mapped.id);
    modelCount += 1;
  }

  const warnedCombos = opts.collisionWarned ?? new Set<string>();
  const cacheKey = `${opts.baseURL}::${opts.providerId}`;
  const comboCount = await publishCombos({
    draft,
    opts,
    log,
    providerId: X,
    hostContract,
    enrichment,
    rawModelById,
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
  if (comboCount === undefined) return { models: modelCount, combos: 0, autoCombos: 0 };

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
    return { models: modelCount, combos: comboCount, autoCombos: 0 };
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
    draft.model.update(X, mapped.id, (m) => {
      assignModelFields(m, mapped, hostContract);
    });
    publishedKeys.add(key);
    publishedModelIds.set(key, mapped.id);
    autoComboCount += 1;
  }

  return { models: modelCount, combos: comboCount, autoCombos: autoComboCount };
}
