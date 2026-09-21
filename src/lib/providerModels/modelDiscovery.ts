import { z } from "zod";
import {
  getSyncedAvailableModelsForConnection,
  replaceSyncedAvailableModelsForConnection,
  type SyncedAvailableModel,
} from "@/lib/db/models";
import type { VertexModelMetadataProvenance } from "@/lib/providerModels/vertexModelMetadata";
import { CANONICAL_EFFORT_VALUES } from "@/shared/reasoning/effortStandardization";
import { isObsoleteKiroModelAlias } from "@omniroute/open-sse/services/kiroModels.ts";
import { filterSelectableModels } from "@omniroute/open-sse/services/modelLifecycle.ts";
import { getEmbeddingProvider } from "@omniroute/open-sse/config/embeddingRegistry.ts";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function isZeroPrice(value: unknown): boolean {
  if (typeof value === "number") return value === 0;
  if (typeof value !== "string" || value.trim().length === 0) return false;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed === 0;
}

function hasLiveFreeEvidence(
  id: string,
  record: JsonRecord,
  promptPrice: string | number | undefined,
  completionPrice: string | number | undefined
): boolean {
  return (
    record.isFree === true ||
    id.endsWith(":free") ||
    (isZeroPrice(promptPrice) && isZeroPrice(completionPrice))
  );
}

/**
 * Resolve a positive integer token limit from a list of candidate values.
 * Used to fall back across the differently-named context/output fields that
 * upstream catalogs expose (e.g. OpenRouter uses `context_length` /
 * `top_provider.context_length` instead of `inputTokenLimit`). See #3202.
 */
function firstPositiveNumber(...candidates: unknown[]): number | undefined {
  for (const candidate of candidates) {
    if (typeof candidate === "number" && Number.isFinite(candidate) && candidate > 0) {
      return candidate;
    }
  }
  return undefined;
}

function modalitiesIncludeImage(value: unknown): boolean {
  return (
    Array.isArray(value) &&
    value.some((entry) => toNonEmptyString(entry)?.toLowerCase() === "image")
  );
}

// #13918: Lemonade Server's GET /v1/models exposes capabilities only through a
// `labels[]` string array (e.g. ["chat", "vision", "reasoning", "tool-calling"]) —
// it has none of the modality/architecture fields the other shapes below read.
// See https://lemonade-server.ai/docs/api/openai/. Exact (case-insensitive,
// trimmed) membership test only — not a substring match, per the earlier
// false-positive lesson with bare `gemma` id-fragment matching.
function labelsIncludeVision(value: unknown): boolean {
  return (
    Array.isArray(value) &&
    value.some((entry) => toNonEmptyString(entry)?.toLowerCase() === "vision")
  );
}

/**
 * #4264: detect image-input (vision) capability from a discovered model record.
 * Handles the common upstream shapes: an explicit `supportsVision` flag, the
 * OpenRouter `architecture.input_modalities` array and string `architecture.modality`
 * ("text+image->text" — the input side is everything before "->"), a top-level
 * `input_modalities` array, and (#13918) Lemonade Server's `labels[]` array.
 * Returns false when the upstream exposes no modality info.
 */
export function detectVisionInput(record: JsonRecord): boolean {
  if (record.supportsVision === true) return true;

  const architecture = asRecord(record.architecture);
  if (modalitiesIncludeImage(architecture.input_modalities)) return true;
  if (modalitiesIncludeImage(record.input_modalities)) return true;

  const modality = toNonEmptyString(architecture.modality) || toNonEmptyString(record.modality);
  if (modality) {
    const [inputPart] = modality.toLowerCase().split("->");
    if ((inputPart || "").includes("image")) return true;
  }

  if (labelsIncludeVision(record.labels)) return true;

  return false;
}

// #7694: nested `reasoning.supported_efforts` shape some OpenAI-compatible upstreams
// expose (as opposed to the flat `supportedThinkingEfforts` field OmniRoute's own
// import format already emits). Hard Rule #7 — validate the untrusted upstream
// payload with Zod before it is trusted/stored; a malformed shape degrades to
// `undefined` instead of throwing, so one bad record never fails the whole sync.
// The same nesting also carries `default_effort` (e.g. OpenRouter
// `reasoning:{mandatory, default_enabled, default_effort, supported_efforts}`) —
// captured by `detectDefaultThinkingEffort` below and threaded through the
// EXISTING `defaultThinkingEffort` plumbing (`SyncedAvailableModel`,
// RuntimeModelMeta, #6879 `applyDefaultReasoningEffort`), so a model that only
// produces usable output with an explicit effort (measured: OpenRouter stealth
// reasoning models returning `upstream_empty_response` without one) gets the
// vendor-declared default injected instead of failing.
const reasoningDefaultEffortSchema = z
  .object({ default_effort: z.string().optional() })
  .partial()
  .nullable()
  .optional();
const reasoningSupportedEffortsSchema = z
  .object({ supported_efforts: z.array(z.string()).optional() })
  .partial()
  .nullable()
  .optional();

// #8347: CLIProxyAPI-style upstreams expose reasoning tiers as a top-level
// `supported_reasoning_levels` array, or nested under `thinking.levels`. Both accept
// entries that are either plain strings or `{ effort: string }` objects (the report shows
// the object form; `discovery/codex.ts:140` reads the same `supported_reasoning_levels`
// key as a bare existence check). Validate with Zod (Hard Rule #7): a malformed ENTRY is
// dropped individually rather than failing the whole array/record.
const effortEntrySchema = z.union([z.string(), z.object({ effort: z.string() })]);
const effortListSchema = z.array(z.unknown());

const supportedReasoningLevelsSchema = z.object({ supported_reasoning_levels: z.unknown() });
const thinkingLevelsSchema = z.object({ thinking: z.object({ levels: z.unknown() }).partial() });

// Vendor-route catalogs (e.g. Merge Gateway's `/v1/models`) nest per-route
// reasoning capability under `vendors.<vendor>.capabilities.reasoning` — the
// route's accepted effort levels live in `effort_values` (docs.merge.dev,
// "Effort levels per route"): the SAME canonical model lists different
// vocabularies per vendor route, and a request naming an effort level is
// served by a route that honors it when one exists (unpinned requests
// self-narrow). So the safe synced vocabulary is the INTERSECTION across
// vendor routes (a synced level must be honored on every route the model can
// land on), not the union. A route without `effort_values` (absent or empty)
// declares "no effort control" for that vendor and is excluded from the
// intersection. Like the other shapes in this file, detection is shape-gated,
// not provider-gated: a record that declares this structure is declaring its
// effort vocabulary. Validate with Zod (Hard Rule #7); a malformed ENTRY is
// dropped individually (never the whole route — discarding a route would
// WIDEN the intersection, fail-open).
const vendorRouteReasoningCapabilitySchema = z.object({
  effort_values: z.array(z.unknown()).optional(),
});
const vendorRoutesSchema = z.record(z.string(), z.unknown());

function parseVendorRouteEffortValues(record: JsonRecord): string[][] {
  const vendorsParsed = vendorRoutesSchema.safeParse(record.vendors);
  if (!vendorsParsed.success) return [];
  const perVendor: string[][] = [];
  for (const vendorValue of Object.values(vendorsParsed.data)) {
    const vendorRecord = asRecord(vendorValue);
    const reasoningParsed = vendorRouteReasoningCapabilitySchema.safeParse(
      asRecord(vendorRecord.capabilities).reasoning
    );
    if (!reasoningParsed.success || !reasoningParsed.data) continue;
    const efforts = Array.from(
      new Set(
        (reasoningParsed.data.effort_values ?? [])
          .filter((effort): effort is string => typeof effort === "string" && effort.length > 0)
          .map(normalizeSupportedEffort)
      )
    );
    if (efforts.length > 0) perVendor.push(efforts);
  }
  return perVendor;
}

/**
 * Intersect `effort_values` across the record's vendor routes. Returns
 * `undefined` when no vendor route declares a list (shape not present);
 * returns an EMPTY array when routes declare disjoint vocabularies — that
 * emptiness is authoritative (no tier works on every route) and must not
 * fall through to lower-precedence generic shapes.
 */
function vendorRouteSharedEfforts(record: JsonRecord): string[] | undefined {
  const perVendor = parseVendorRouteEffortValues(record);
  if (perVendor.length === 0) return undefined;
  return perVendor.reduce((acc, efforts) => acc.filter((effort) => efforts.includes(effort)));
}

// Maps common upstream synonyms onto OmniRoute's canonical effort vocabulary
// (`src/shared/reasoning/effortStandardization.ts`). Values already in
// `CANONICAL_EFFORT_VALUES`, and any unrecognized provider-native tier (e.g.
// Codex's own "ultra"), pass through unchanged — only known synonyms are mapped.
const EFFORT_SYNONYMS: Record<string, string> = { extra: "xhigh" };

// CrofAI's live `/v1/models` exposes a boolean reasoning capability rather than
// the supported tiers. Keep this provider-specific fallback explicit so the same
// boolean is never interpreted for other discovery sources.
// Live request testing confirms Crof accepts `max` as a distinct top tier.
const CROF_REASONING_EFFORTS = ["none", "low", "medium", "high", "max"] as const;

// Command Code's provider API accepts the documented low/medium/high/xhigh/max
// reasoning_effort values for its reasoning-capable model catalog, but its
// /models response does not declare them. Keep this fallback provider-scoped.
const COMMAND_CODE_REASONING_EFFORTS = ["low", "medium", "high", "xhigh", "max"] as const;

function normalizeSupportedEffort(effort: string): string {
  if ((CANONICAL_EFFORT_VALUES as readonly string[]).includes(effort)) return effort;
  return EFFORT_SYNONYMS[effort.toLowerCase()] || effort;
}

/**
 * #8347: shared parser for the two new upstream shapes (`supported_reasoning_levels`,
 * `thinking.levels`). Accepts a list whose entries are either plain strings or
 * `{ effort: string }` objects, drops malformed entries individually (never throws), and
 * normalizes survivors onto the canonical vocabulary. Returns `undefined` when nothing
 * usable remains, mirroring `detectSupportedThinkingEfforts`'s existing contract.
 */
function parseEffortList(rawList: unknown): string[] | undefined {
  const listParsed = effortListSchema.safeParse(rawList);
  if (!listParsed.success) return undefined;

  const efforts = Array.from(
    new Set(
      listParsed.data
        .map((entry) => {
          const entryParsed = effortEntrySchema.safeParse(entry);
          if (!entryParsed.success) return null;
          const raw =
            typeof entryParsed.data === "string" ? entryParsed.data : entryParsed.data.effort;
          return raw.length > 0 ? normalizeSupportedEffort(raw) : null;
        })
        .filter((effort): effort is string => effort !== null)
    )
  );
  return efforts.length > 0 ? efforts : undefined;
}

/**
 * Read the nested `record.reasoning.default_effort` shape (OpenRouter declares
 * `reasoning:{mandatory, default_enabled, default_effort, supported_efforts}`)
 * and normalize it onto the canonical vocabulary (`max` → `xhigh`, same mapping
 * `detectSupportedThinkingEfforts` applies to the tier list). Returns `undefined`
 * (never throws) when the field is absent or malformed.
 *
 * A flat top-level `defaultThinkingEffort` (OmniRoute's own import format, and
 * kimi-style upstreams) stays authoritative — the nested shape is a fallback.
 */
export function detectDefaultThinkingEffort(record: JsonRecord): string | undefined {
  if (typeof record.defaultThinkingEffort === "string" && record.defaultThinkingEffort.length > 0) {
    return normalizeSupportedEffort(record.defaultThinkingEffort);
  }
  const parsed = reasoningDefaultEffortSchema.safeParse(record.reasoning);
  if (parsed.success && parsed.data) {
    const raw = parsed.data.default_effort;
    if (typeof raw === "string" && raw.length > 0) return normalizeSupportedEffort(raw);
  }
  // Vendor-route fallback — only when the `vendors` shape IS the record's
  // winning effort-vocabulary source. If a higher-precedence declared shape
  // (`reasoning.supported_efforts`, `metadata.reasoning.supported_efforts`)
  // produced a usable list, the record's default must never escape that
  // winning list. Highest shared tier wins, ranked by the canonical order
  // (vendor arrays are not guaranteed sorted).
  const mergeShared = vendorRouteSharedEfforts(record);
  if (mergeShared && mergeShared.length > 0 && !hasUsableDeclaredEffortList(record)) {
    const ranked = mergeShared
      .map((tier) => ({ tier, rank: CANONICAL_EFFORT_VALUES.indexOf(tier as never) }))
      .filter((x) => x.rank >= 0)
      .sort((a, b) => b.rank - a.rank);
    if (ranked.length > 0) return ranked[0].tier;
  }
  return undefined;
}

/**
 * Whether a higher-precedence declared shape (the flat import field, or either
 * #7694 nested `supported_efforts` shape) yields a usable tier list — the
 * exact "usable" semantics the vocabulary detection applies (non-empty after
 * filtering + normalization). Used to decide whether the Merge vendors shape
 * is the record's winning vocabulary source for default-effort derivation.
 */
function hasUsableDeclaredEffortList(record: JsonRecord): boolean {
  if (
    Array.isArray(record.supportedThinkingEfforts) &&
    record.supportedThinkingEfforts.some((e) => typeof e === "string" && e.length > 0)
  ) {
    return true;
  }
  for (const holder of [record.reasoning, asRecord(record.metadata).reasoning]) {
    const shapeParsed = reasoningSupportedEffortsSchema.safeParse(holder);
    if (!shapeParsed.success || !shapeParsed.data) continue;
    const rawEfforts = shapeParsed.data.supported_efforts;
    if (
      Array.isArray(rawEfforts) &&
      rawEfforts.some((e) => typeof e === "string" && e.length > 0)
    ) {
      return true;
    }
  }
  return false;
}

/**
 * #7694: read the nested `record.reasoning.supported_efforts` shape and normalize each
 * tier onto the canonical vocabulary. Returns `undefined` (never throws) when the field
 * is absent or malformed, so it can be used as a fallback alongside the pre-existing flat
 * `record.supportedThinkingEfforts` field without disturbing that field's current
 * pass-through behavior.
 */
export function detectSupportedThinkingEfforts(record: JsonRecord): string[] | undefined {
  const parsed = reasoningSupportedEffortsSchema.safeParse(record.reasoning);
  if (parsed.success && parsed.data) {
    const rawEfforts = parsed.data.supported_efforts;
    if (Array.isArray(rawEfforts)) {
      const efforts = Array.from(
        new Set(
          rawEfforts
            .filter((effort): effort is string => typeof effort === "string" && effort.length > 0)
            .map(normalizeSupportedEffort)
        )
      );
      if (efforts.length > 0) return efforts;
    }
  }

  // neuralwatt-style upstreams wrap the same tier data one level deeper under
  // `metadata.reasoning.supported_efforts` (their /v1/models nests capabilities
  // and reasoning under a `metadata` object). Same semantics and validation as
  // the top-level #7694 shape; placed right after it so a top-level declaration
  // still wins when both are present.
  const metadataRecord = asRecord(record.metadata);
  const metadataParsed = reasoningSupportedEffortsSchema.safeParse(metadataRecord.reasoning);
  if (metadataParsed.success && metadataParsed.data) {
    const rawEfforts = metadataParsed.data.supported_efforts;
    if (Array.isArray(rawEfforts)) {
      const efforts = Array.from(
        new Set(
          rawEfforts
            .filter((effort): effort is string => typeof effort === "string" && effort.length > 0)
            .map(normalizeSupportedEffort)
        )
      );
      if (efforts.length > 0) return efforts;
    }
  }

  // Vendor-route catalogs: intersect `effort_values` across vendor routes.
  // Placed after the flat import field handling (caller) and the
  // #7694/#9160 nested shapes so those explicit per-model declarations keep
  // precedence; runs before the generic `capabilities.effort_tiers` fallback
  // because per-route vocabularies are strictly more specific than a flat
  // tier list. An empty intersection (disjoint routes) is authoritative —
  // nothing works on every route — and must not fall through to a generic
  // tier list.
  const mergeShared = vendorRouteSharedEfforts(record);
  if (mergeShared !== undefined) {
    return mergeShared.length > 0 ? mergeShared : [];
  }

  // #9160: fall back to `capabilities.effort_tiers` before the legacy fields.
  // OmniRoute's own catalog surfaces effort tiers inside `capabilities.effort_tiers`,
  // which the existing `parseEffortList` already handles (string arrays).
  const capabilitiesRecord = asRecord(record.capabilities);
  const capabilitiesParsed = effortListSchema.safeParse(capabilitiesRecord.effort_tiers);
  if (capabilitiesParsed.success) {
    const fromCapabilities = parseEffortList(capabilitiesRecord.effort_tiers);
    if (fromCapabilities) return fromCapabilities;
  }

  // #8347: fall back to `supported_reasoning_levels`, then `thinking.levels` — in that
  // order, per the regression guard for #7694 (the flat field and `reasoning.supported_efforts`
  // both take precedence over these two and are handled above / by the caller).
  const levelsParsed = supportedReasoningLevelsSchema.safeParse(record);
  if (levelsParsed.success) {
    const fromLevels = parseEffortList(levelsParsed.data.supported_reasoning_levels);
    if (fromLevels) return fromLevels;
  }

  const thinkingParsed = thinkingLevelsSchema.safeParse(record);
  if (thinkingParsed.success) {
    const fromThinking = parseEffortList(thinkingParsed.data.thinking?.levels);
    if (fromThinking) return fromThinking;
  }

  return undefined;
}

function hasDeclaredEffortList(record: JsonRecord): boolean {
  if (Array.isArray(record.supportedThinkingEfforts)) return true;
  if (Array.isArray(asRecord(record.reasoning).supported_efforts)) return true;
  if (Array.isArray(asRecord(record.capabilities).effort_tiers)) return true;
  if (Array.isArray(record.supported_reasoning_levels)) return true;
  if (Array.isArray(asRecord(record.thinking).levels)) return true;
  // `vendors.<v>.capabilities.reasoning.effort_values` counts as a declared
  // list so the fallback chain in `normalizeDiscoveredModels` stops here
  // instead of applying provider-specific heuristics to a record that already
  // declares its vocabulary explicitly (mirrors the other declared shapes:
  // detect returning undefined means "declared, nothing usable").
  return parseVendorRouteEffortValues(record).length > 0;
}

export function isAutoFetchModelsEnabled(providerSpecificData: unknown): boolean {
  // Remote discovery writes its response into the shared synced-model cache, so
  // it must be an explicit per-connection opt-in rather than the default.
  return asRecord(providerSpecificData).autoFetchModels === true;
}

const KNOWN_EMBEDDING_PREFIXES = [
  "text-embedding-",
  "bge-",
  "gte-",
  "e5-",
  "nomic-embed",
  "all-minilm",
  "embeddinggemma",
  "jina-embeddings",
  "jina-clip",
  "cohere-embed",
  "multilingual-e5",
];

/** Mirrors CHAT_ENDPOINTS in open-sse/services/modelEndpointPolicy.ts. */
const CHAT_ENDPOINT_HINTS = new Set([
  "chat",
  "chat-completions",
  "chat/completions",
  "messages",
  "responses",
]);

const KNOWN_EMBEDDING_DIMENSIONS: Record<string, number> = {
  "harrier-oss-v1-0.6b": 1024,
  "text-embedding-3-small": 1536,
  "text-embedding-3-large": 3072,
  "text-embedding-ada-002": 1536,
  "bge-m3": 1024,
  "bge-large-en-v1.5": 1024,
  "bge-small-en-v1.5": 384,
  "bge-base-en-v1.5": 768,
  "nomic-embed-text": 768,
  "all-minilm-l6-v2": 384,
  embeddinggemma: 768,
};

export function detectModelModality(
  record: JsonRecord,
  providerId?: string
): {
  isEmbedding: boolean;
  isImage: boolean;
  isRerank: boolean;
  dimensions?: number;
  supportedInputTypes: string[];
} {
  const rawId = toNonEmptyString(record.id) || toNonEmptyString(record.name) || "";
  const modelLeaf = rawId.toLowerCase().split("/").pop() || "";
  const rawLabels = Array.isArray(record.labels)
    ? record.labels
        .map((l) => (typeof l === "string" ? l.trim().toLowerCase() : ""))
        .filter(Boolean)
    : [];
  const typeStr = toNonEmptyString(record.type)?.toLowerCase();
  const objStr = toNonEmptyString(record.object)?.toLowerCase();
  const caps = asRecord(record.capabilities);
  const rawEndpoints = Array.isArray(record.supportedEndpoints)
    ? record.supportedEndpoints.map((e) => (typeof e === "string" ? e.trim().toLowerCase() : ""))
    : [];

  const registryProvider = providerId ? getEmbeddingProvider(providerId) : undefined;
  const registryModel = registryProvider?.models.find(
    (m) => m.id === modelLeaf || m.id === rawId || rawId.endsWith(`/${m.id}`)
  );

  // An explicit chat endpoint is authoritative: a model that upstream says serves
  // chat (e.g. `supportedEndpoints: ["chat", "embeddings"]`) must never be
  // downgraded to embedding/rerank/image by the id/label heuristics below —
  // that would drop it from the chat catalog (#14159 re-land of #12630).
  const hasChatEndpoint = rawEndpoints.some((endpoint) => CHAT_ENDPOINT_HINTS.has(endpoint));

  const isRerank =
    !hasChatEndpoint &&
    (rawLabels.includes("reranking") ||
      rawLabels.includes("rerank") ||
      typeStr === "rerank" ||
      rawEndpoints.includes("rerank") ||
      modelLeaf.includes("rerank"));

  const isImage =
    !hasChatEndpoint &&
    !isRerank &&
    (rawLabels.includes("image") ||
      rawLabels.includes("images") ||
      typeStr === "image" ||
      objStr === "image" ||
      rawEndpoints.includes("images") ||
      rawEndpoints.includes("image") ||
      modelLeaf.startsWith("gpt-image-") ||
      modelLeaf.startsWith("dall-e-") ||
      modelLeaf === "chatgpt-image-latest" ||
      modelLeaf.startsWith("flux-") ||
      modelLeaf.startsWith("sdxl-") ||
      modelLeaf.startsWith("stable-diffusion"));

  const isEmbedding =
    !hasChatEndpoint &&
    !isRerank &&
    !isImage &&
    (rawLabels.includes("embeddings") ||
      rawLabels.includes("embedding") ||
      typeStr === "embedding" ||
      typeStr === "embeddings" ||
      objStr === "embedding" ||
      caps.embeddings === true ||
      caps.embedding === true ||
      rawEndpoints.includes("embeddings") ||
      rawEndpoints.includes("embedding") ||
      Boolean(registryModel) ||
      KNOWN_EMBEDDING_PREFIXES.some((prefix) => modelLeaf.includes(prefix)));

  const dimensions = firstPositiveNumber(
    record.dimensions,
    record.dimension,
    record.embedding_dimension,
    record.embedding_dimensions,
    registryModel?.dimensions,
    KNOWN_EMBEDDING_DIMENSIONS[modelLeaf]
  );

  const supportedInputTypes: string[] = Array.isArray(record.supportedInputTypes)
    ? record.supportedInputTypes.filter((t): t is string => typeof t === "string" && t.length > 0)
    : registryModel?.modalities
      ? (registryModel.modalities as string[])
      : ["text"];

  return {
    isEmbedding,
    isImage,
    isRerank,
    dimensions,
    supportedInputTypes,
  };
}

export function normalizeDiscoveredModels(
  models: unknown,
  providerId?: string
): SyncedAvailableModel[] {
  const items = Array.isArray(models) ? models : [];
  const deduped = new Map<string, SyncedAvailableModel>();

  for (const item of items) {
    const record = asRecord(item);
    const id =
      toNonEmptyString(record.id) ||
      toNonEmptyString(record.name) ||
      toNonEmptyString(record.model);
    if (!id) continue;

    const isCrofReasoningModel = providerId === "crof" && record.reasoning_effort === true;
    const isCommandCodeModel = providerId === "command-code";
    const supportedThinkingEfforts = (() => {
      // The flat import field and every recognized upstream tier array remain
      // authoritative over the provider fallback, including an explicit empty list.
      if (Array.isArray(record.supportedThinkingEfforts)) {
        return record.supportedThinkingEfforts.filter(
          (effort): effort is string => typeof effort === "string" && effort.length > 0
        );
      }
      const detected = detectSupportedThinkingEfforts(record);
      if (detected || hasDeclaredEffortList(record)) return detected;
      if (isCrofReasoningModel) return [...CROF_REASONING_EFFORTS];
      return isCommandCodeModel ? [...COMMAND_CODE_REASONING_EFFORTS] : undefined;
    })();
    // Vendor-declared default effort (OpenRouter `reasoning.default_effort`, or the
    // flat import field). Normalized onto the canonical vocabulary (`max` → `xhigh`).
    const defaultThinkingEffort = detectDefaultThinkingEffort(record);

    const name =
      toNonEmptyString(record.name) ||
      toNonEmptyString(record.displayName) ||
      toNonEmptyString(record.model) ||
      id;

    const modality = detectModelModality(record, providerId);
    // Only non-chat modalities are stamped on the synced row. Chat models keep the
    // tip's exact shape (no `modelType`/`supportedInputTypes` defaults) so the
    // import-mode diff stays stable and existing catalog snapshots do not churn.
    const modelType = modality.isEmbedding
      ? "embedding"
      : modality.isRerank
        ? "rerank"
        : modality.isImage
          ? "image"
          : undefined;
    const explicitInputTypes = Array.isArray(record.supportedInputTypes);

    const supportedEndpoints = Array.isArray(record.supportedEndpoints)
      ? Array.from(
          new Set(
            record.supportedEndpoints
              .map((endpoint) => toNonEmptyString(endpoint))
              .filter((endpoint): endpoint is string => Boolean(endpoint))
          )
        ).sort()
      : modality.isEmbedding
        ? ["embeddings"]
        : modality.isRerank
          ? ["rerank"]
          : modality.isImage
            ? ["images"]
            : undefined;

    const apiFormat =
      toNonEmptyString(record.apiFormat) ||
      (modality.isEmbedding
        ? "embeddings"
        : modality.isRerank
          ? "rerank"
          : modality.isImage
            ? "images-generations"
            : undefined);

    const topProvider = asRecord(record.top_provider);

    // Keep the total context window distinct from an explicit maximum-input limit. Existing
    // providers historically stored context_length as inputTokenLimit, so retain that compatibility
    // outside Vertex while persisting the separate contextWindow field for new consumers.
    // vLLM — and every server that copies its /v1/models shape — reports the
    // window as `max_model_len`, the value the engine was actually started with.
    // Without it a vLLM model syncs with no window at all and the resolver hands
    // out the 128K default, understating a 250K deployment by half. #12858
    const contextWindow = firstPositiveNumber(
      record.context_length,
      record.contextLength,
      record.contextWindow,
      record.max_model_len,
      record.maxModelLen,
      record.max_context_window,
      record.max_tokens,
      topProvider.context_length
    );
    const isVertexProvider = providerId === "vertex" || providerId === "vertex-partner";
    const inputTokenLimit = firstPositiveNumber(
      record.inputTokenLimit,
      ...(isVertexProvider ? [] : [contextWindow])
    );
    const outputTokenLimit = firstPositiveNumber(
      record.outputTokenLimit,
      topProvider.max_completion_tokens
    );

    // #4264: capture image-input (vision) capability at sync time. OpenRouter (and
    // similar passthrough catalogs) declare it via `architecture.input_modalities`
    // (e.g. ["text","image"]) or the string `architecture.modality` ("text+image->text");
    // some providers expose a top-level `input_modalities`. Without this, synced
    // models reached the catalog with no vision flag and vision-capable models
    // (which work at request time) showed up as non-vision after import.
    const supportsVision = detectVisionInput(record);
    const pricing = asRecord(record.pricing);
    const promptPrice =
      typeof pricing.prompt === "string" || typeof pricing.prompt === "number"
        ? pricing.prompt
        : undefined;
    const completionPrice =
      typeof pricing.completion === "string" || typeof pricing.completion === "number"
        ? pricing.completion
        : undefined;
    // Persist only evidence present in this discovery payload. Static catalog
    // membership is intentionally not evidence about this connection's economics.
    const isFree = hasLiveFreeEvidence(id, record, promptPrice, completionPrice);

    deduped.set(id, {
      id,
      name,
      source: "imported",
      ...(apiFormat ? { apiFormat } : {}),
      ...(toNonEmptyString(record.targetFormat)
        ? { targetFormat: toNonEmptyString(record.targetFormat)! }
        : {}),
      ...(toNonEmptyString(record.upstreamProtocol)
        ? { upstreamProtocol: toNonEmptyString(record.upstreamProtocol)! }
        : {}),
      ...(supportedEndpoints && supportedEndpoints.length > 0 ? { supportedEndpoints } : {}),
      ...(supportedThinkingEfforts !== undefined ? { supportedThinkingEfforts } : {}),
      ...(defaultThinkingEffort !== undefined ? { defaultThinkingEffort } : {}),
      ...(typeof inputTokenLimit === "number" ? { inputTokenLimit } : {}),
      ...(isVertexProvider && typeof contextWindow === "number" ? { contextWindow } : {}),
      ...(typeof outputTokenLimit === "number" ? { outputTokenLimit } : {}),
      // The narrowed `object` is not assignable to VertexModelMetadataProvenance; the
      // read path (src/lib/db/models/synced.ts) casts the same field the same way, so
      // keep both sides of the round-trip identical rather than only one of them typed.
      ...(record.metadataProvenance && typeof record.metadataProvenance === "object"
        ? { metadataProvenance: record.metadataProvenance as VertexModelMetadataProvenance }
        : {}),
      ...(typeof record.description === "string" ? { description: record.description } : {}),
      ...(typeof record.supportsThinking === "boolean"
        ? { supportsThinking: record.supportsThinking }
        : isCrofReasoningModel || isCommandCodeModel
          ? { supportsThinking: true }
          : {}),
      ...(record.alwaysThinking === true ? { alwaysThinking: true } : {}),
      ...(typeof record.supportsTools === "boolean" ? { supportsTools: record.supportsTools } : {}),
      ...(typeof record.supportsVideo === "boolean" ? { supportsVideo: record.supportsVideo } : {}),
      ...(isFree ? { isFree: true } : {}),
      ...(supportsVision ? { supportsVision: true } : {}),
      ...(typeof modality.dimensions === "number" && modality.dimensions > 0
        ? { dimensions: modality.dimensions }
        : {}),
      ...((modelType || explicitInputTypes) && modality.supportedInputTypes.length > 0
        ? { supportedInputTypes: modality.supportedInputTypes }
        : {}),
      ...(modelType ? { modelType } : {}),
    });
  }

  return Array.from(deduped.values());
}

export async function getCachedDiscoveredModels(
  providerId: string,
  connectionId: string
): Promise<SyncedAvailableModel[]> {
  const models = await getSyncedAvailableModelsForConnection(providerId, connectionId);
  return providerId === "kiro"
    ? models.filter((model) => !isObsoleteKiroModelAlias(model.id))
    : models;
}

export async function persistDiscoveredModels(
  providerId: string,
  connectionId: string,
  models: unknown
): Promise<SyncedAvailableModel[]> {
  // #11088 (option 1): the synced store is endpoint-agnostic — images/embeddings
  // models must persist so per-connection endpoint routing (#11088) and the
  // /v1/models catalog can see them. Chat selectability is applied at read time
  // (auto-pool expansion, chat projections), not at write time.
  const normalized = filterSelectableModels(
    providerId,
    normalizeDiscoveredModels(models, providerId)
  );
  await replaceSyncedAvailableModelsForConnection(providerId, connectionId, normalized);
  return normalized;
}
