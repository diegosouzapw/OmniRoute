/**
 * opencodeFreeTierContract.ts — the request contract OpenCode Zen's free tier enforces.
 *
 * Measured against the live endpoint on 2026-09-17, on three models and both the Chat
 * Completions and Responses surfaces: the upstream answers 403 FreeTierError unless the
 * request carries all four of
 *
 *   1. `stream: true` in the body,
 *   2. a non-empty `tools` array (the content is not inspected),
 *   3. a session header shaped `ses_` + 12 hex + 14 base62 whose 12-hex time part decodes
 *      to the client's `Identifier.descending()` counter window (`0xFC0–0xFFF`). The shape
 *      alone is not enough — the value is validated too, since 2026-10-13 — so a session
 *      is minted by `opencodeHeaders.ts` (`canonicalId`) rather than copied arbitrarily,
 *   4. a `User-Agent` carrying `opencode/<version>` with version >= 1.17 (an older
 *      version answers 426 UpgradeRequired rather than 403).
 *
 * Removing any single one of the four turns a 200 into a 403. Paid models on the same
 * host are not gated (a paid model without tools answers 401 CreditsError), which is why
 * `requiresFreeTierRequestContract` narrows the contract to free-tier models.
 *
 * Measured again on 2026-10-14: the free tier moved. The client now takes its base URL
 * from the models.dev catalog (`https://opencode.ai/inference/v1`), and the very same
 * request is refused on `/zen/v1`; on the new base a declared `read` or `bash` whose
 * parameters carry no properties is refused, while an empty schema on a name outside the
 * quartet still passes. `FREE_TIER_INFERENCE_BASE_URL` and `placeholderToolParameters`
 * carry those two facts.
 *
 * The module also owns the free-model catalog — the catalog is what decides whether the
 * contract applies, so the two belong together and the executor imports them from here —
 * and the way back: the forced stream is rebuilt into a JSON body for a caller that asked
 * for JSON, reusing the shared event-stream parsers.
 */
import { parseSSEToOpenAIResponse, parseSSEToResponsesOutput } from "../handlers/sseParser.ts";
import { readSyncedOpencodeFamilyModelIds } from "@/lib/db/models";
import { getModelCatalogCacheVersion } from "@/lib/db/readCache";
import { getModelsDevPricing, getSyncedCapability } from "@/lib/modelsDevSync";
import {
  confirmBorrowedToolNames,
  getObservedToolNames,
  getObservedToolParameters,
  noteRefusedBorrowedToolNames,
  recordAcceptedToolNames,
  recordAcceptedToolSchemas,
  resolvePlaceholderNames,
} from "./opencodeToolObservation.ts";
import { isOpencodeFreeTierRefusal } from "./opencodeGeoBlock.ts";
import { requestPublishedEndpointRefresh } from "../utils/opencodePublishedEndpoint.ts";
import {
  forgetAttempt,
  planShape,
  recallAttempt,
  recordInjection,
  rememberAttempt,
  shapeKeyOf,
} from "./opencodeRequestShape.ts";

/**
 * What one gated request declared, kept until its outcome is known.
 *
 * `borrowed` means the placeholder came from the observation store rather than from the
 * caller or the configuration, which is the only case where a refusal says anything about
 * that store.
 */
export interface FreeTierContractAttempt {
  readonly provider: string;
  readonly model: string;
  readonly session: string | undefined;
  readonly borrowed: boolean;
  readonly clientToolNames: readonly string[];
  /** The caller's own tool entries, kept so an accepted request teaches their schemas. */
  readonly clientTools?: readonly unknown[];
  /** A refusal may still be replayed in the other shape: its outcome is noted afterwards. */
  readonly probe?: boolean;
  /**
   * True when this attempt injected placeholder tools the caller had not sent. Kept as a
   * separate flag from `borrowed`: a placeholder this layer added is ours to attribute, while
   * `borrowed` means it came from the observation store.
   */
  readonly injectedPlaceholders?: boolean;
}

/**
 * Free-vs-premium is derived from the synced catalog when one exists, not a static list.
 *
 * The upstream free tier rotates constantly — models.dev lists dozens of `-free` ids and
 * adds/retires them without notice — so a hard-coded set goes stale overnight (measured
 * 2026-10-14: 5 of the 6 ids the old `OPENCODE_FREE_MODELS` held were already absent from
 * the live `/zen/v1/models` list, 4 of them `deprecated`). When the catalog is synced, a
 * model is free-tier iff:
 *
 *   1. **available** — its id is in the synced live catalog for the `opencode` family
 *      (what `GET https://opencode.ai/zen/v1/models` reported at discovery time), which
 *      catches ids the upstream has since delisted; and
 *   2. **free** — models.dev reports `cost.input === 0 && cost.output === 0` for it, which
 *      catches free models that carry no `-free` suffix (`big-pickle`) and drops the ones
 *      that gained a price; and
 *   3. **not deprecated** — `status !== "deprecated"` as a secondary guard.
 *
 * Signals are read synchronously from data OmniRoute already syncs — the live catalog via
 * the discovery writer (`syncedAvailableModels`) and cost/status via `models.dev`
 * (`modelsDevSync.ts`) — memoized on `getModelCatalogCacheVersion()`, which every catalog
 * write bumps. No per-request fetch, and no table to rot.
 *
 * When the catalog has never been synced (a fresh install, or a unit test with no DB), the
 * check **falls back to the legacy heuristic** — the `-free` suffix plus the registry's
 * known free ids — rather than treating every model as premium. Failing closed there would
 * 402 every free model on an unsynced deployment and regress the pre-change behavior; the
 * fallback keeps the status quo until discovery runs, and the synced catalog then takes
 * over. `OPENCODE_LEGACY_FREE_MODELS` is therefore retained only as that fallback.
 *
 * For `opencode-go`, there is no free tier — ALL models require an API key.
 */
interface OpencodeFreeCatalog {
  /** Catalog version this snapshot was built from; a bump invalidates it. */
  readonly version: number;
  /** Free ids from the synced catalog, or `null` when no catalog has been synced. */
  readonly free: ReadonlySet<string> | null;
}

/**
 * Legacy free ids kept only as the unsynced-catalog fallback (see the block above).
 *
 * `deepseek-v4-flash-free` appears in both the noauth and the zen registry; the rotating
 * `-free` ids are covered by the suffix rule alongside this set.
 */
const OPENCODE_LEGACY_FREE_MODELS = new Set([
  "big-pickle",
  "deepseek-v4-flash-free",
  "mimo-v2.5-free",
  "hy3-free",
  "nemotron-3-ultra-free",
  "north-mini-code-free",
]);

/** Provider ids whose live catalog feeds the `opencode` family (canonical + aliases). */
const OPENCODE_CATALOG_PROVIDER_IDS = ["opencode", "opencode-zen"] as const;

let freeCatalogCache: OpencodeFreeCatalog | null = null;

/**
 * Test seam: pin the free-model set without a synced catalog, so unit tests can exercise
 * `isPremiumOpencodeModel` (and the request contract it gates) deterministically. Pass
 * `null` to restore the catalog-driven lookup.
 */
let testFreeModelsOverride: ReadonlySet<string> | null = null;

export function _setOpencodeFreeModelsForTests(ids: readonly string[] | null): void {
  testFreeModelsOverride = ids === null ? null : new Set(ids);
  freeCatalogCache = null;
}

/** The free ids the synced catalog implies, or `null` when nothing has been synced. */
function deriveFreeIdsFromCatalog(): Set<string> | null {
  try {
    const available = readSyncedOpencodeFamilyModelIds();
    if (available.size === 0) return null;
    const free = new Set<string>();
    const pricing = getModelsDevPricing();
    const byProvider = pricing[OPENCODE_CATALOG_PROVIDER_IDS[0]] ?? pricing["opencode-zen"];
    for (const id of available) {
      const cost = byProvider?.[id];
      if (!cost || cost.input !== 0 || cost.output !== 0) continue;
      const status = getSyncedCapability(OPENCODE_CATALOG_PROVIDER_IDS[0], id)?.status;
      if (status === "deprecated") continue;
      free.add(id);
    }
    return free;
  } catch {
    // No DB / no synced pricing yet: no catalog, fall back to the legacy heuristic.
    return null;
  }
}

/** Build (or reuse) the free-model snapshot for the current catalog version. */
function opencodeFreeModelCatalog(): ReadonlySet<string> | null {
  if (testFreeModelsOverride) return testFreeModelsOverride;

  const version = getModelCatalogCacheVersion();
  if (freeCatalogCache && freeCatalogCache.version === version) return freeCatalogCache.free;

  const free = deriveFreeIdsFromCatalog();
  freeCatalogCache = { version, free };
  return free;
}

/**
 * Determine whether a model requires an API key on the given opencode provider.
 *
 * - `opencode-go`: ALL models require a key (no free tier).
 * - `opencode` / `opencode-zen`: premium = any model NOT in the synced free catalog
 *   (available ∩ free ∧ not deprecated). With no synced catalog, the legacy heuristic
 *   (`-free` suffix or the registry's known free ids) is used instead.
 * - Unknown models are assumed premium (fail-safe).
 */
export function isPremiumOpencodeModel(model: string, provider: string): boolean {
  // opencode-go has no free tier — every model requires a key.
  if (provider === "opencode-go") return true;

  const id = model.trim();
  const catalog = opencodeFreeModelCatalog();
  if (catalog) return !catalog.has(id);

  // Unsynced catalog: the legacy rule, so an unsynced deployment keeps its behavior.
  if (id.endsWith("-free")) return false;
  return !OPENCODE_LEGACY_FREE_MODELS.has(id);
}

/**
 * The upstream surface a request is served on, as told apart by the registry `baseUrl`.
 *
 * The gate is a property of the surface, not of billing: `/zen/v1` refuses a request that
 * carries no tools, while `/zen/go/v1` refuses one that carries any (upstream
 * anomalyco/opencode#44300 and #44382, "Endpoint is unavailable" for any request
 * containing tools). Passing the surface in keeps this module free of registry imports and
 * covers every entry of the family — including the `oc` alias, which resolves to
 * `opencode` before an executor is ever picked.
 */
export type OpencodeSurface = "zen" | "go" | "other";

const ZEN_SURFACE_BASE_URLS = new Set([
  "https://opencode.ai/zen/v1",
  // Published endpoint since 2026-10 (models.opencode.ai catalog `api` field).
  "https://opencode.ai/inference/v1",
]);
const GO_SURFACE_BASE_URL = "https://opencode.ai/zen/go/v1";

/**
 * Where a gated free-tier request is sent. Since 2026-10-14 the OpenCode client takes its
 * base URL from the models.dev catalog (`https://opencode.ai/inference/v1`), and the free
 * tier refuses the very same request on `/zen/v1` with 403 FreeTierError. Paid models keep
 * the registry base URL, which still serves them.
 */
export const FREE_TIER_INFERENCE_BASE_URL = "https://opencode.ai/inference/v1";

/** Tell the surfaces apart by a known `baseUrl`, so provider ids and aliases stay out. */
export function surfaceFromBaseUrl(baseUrl: string | null | undefined): OpencodeSurface {
  if (baseUrl && ZEN_SURFACE_BASE_URLS.has(baseUrl)) return "zen";
  if (baseUrl === GO_SURFACE_BASE_URL) return "go";
  return "other";
}

function isOpencodeHost(url: string): boolean {
  try {
    return new URL(url).hostname === "opencode.ai";
  } catch {
    return false;
  }
}

/**
 * The surface a provider is served on. Decided by provider rather than by URL equality, so
 * the surface holds when the endpoint moves (the URL now follows the published catalog).
 * A connection base URL outside opencode.ai (a local relay) is `other`: no contract is
 * imposed on it.
 */
export function surfaceForProvider(
  provider: string | null | undefined,
  connectionBaseUrl?: unknown
): OpencodeSurface {
  if (
    typeof connectionBaseUrl === "string" &&
    connectionBaseUrl &&
    !isOpencodeHost(connectionBaseUrl)
  ) {
    return "other";
  }
  if (provider === "opencode-go") return "go";
  if (provider === "opencode" || provider === "oc" || provider === "opencode-zen") return "zen";
  return "other";
}

/**
 * Operator opt-out for the body half of the contract.
 *
 * The headers stay in place either way: they are what the upstream validates by shape, and
 * they cost nothing. The body half is the half built on an observation of someone else's
 * service, so it is the half worth being able to switch off without waiting for a release.
 * Read per call, so a change takes effect immediately.
 */
function isBodyContractEnabled(): boolean {
  return (process.env.OPENCODE_FREE_TIER_REQUEST_CONTRACT || "").trim().toLowerCase() !== "off";
}

/**
 * Whether the upstream gates this request at all.
 *
 * Scope only — it ignores the opt-out on purpose, because the headers are applied either
 * way: they are what the upstream validates by shape, they cost nothing, and switching
 * them off with the body half would turn an opt-out into a second failure mode.
 */
export function isGatedFreeTierRequest(
  surface: OpencodeSurface,
  provider: string,
  model: string
): boolean {
  if (surface !== "zen") return false;
  return !isPremiumOpencodeModel(model, provider);
}

/** Whether the body half of the contract applies: gated, and not switched off. */
export function requiresFreeTierRequestContract(
  surface: OpencodeSurface,
  provider: string,
  model: string
): boolean {
  return isGatedFreeTierRequest(surface, provider, model) && isBodyContractEnabled();
}

/** The placeholder tool name the official client uses for the same purpose. */
const PLACEHOLDER_TOOL_NAME = "read";
export const DEFAULT_PLACEHOLDER_TOOL_NAME = PLACEHOLDER_TOOL_NAME;

/**
 * Operator-supplied placeholder tool names, comma-separated.
 *
 * The upstream inspects which names a request declares, and what it accepts differs by
 * model and moves over time (measured 2026-09-18: one made-up name is accepted on
 * `big-pickle` and refused on two other free models that had accepted it the day before).
 * That is an observation about someone else's service, not a fact about this project, so
 * it belongs in configuration rather than in a constant that needs a release to change.
 *
 * Empty or unset falls back to the built-in name, so an install that sets nothing keeps
 * the previous behaviour. Read per call, so a change takes effect immediately.
 */
export function configuredPlaceholderToolNames(): string[] {
  const raw = process.env.OPENCODE_FREE_TIER_PLACEHOLDER_TOOLS || "";
  const kept: string[] = [];
  for (const part of raw.split(",")) {
    const name = part.trim();
    if (kept.length >= 32) break;
    if (!/^[A-Za-z_][A-Za-z0-9_-]{0,63}$/.test(name)) continue;
    if (!kept.includes(name)) kept.push(name);
  }
  return kept;
}
const PLACEHOLDER_TOOL_DESCRIPTION =
  "Do not call this tool. It exists only for API compatibility and must never be invoked.";
/**
 * Minimal parameter schemas for injected placeholder tools, mirroring the OpenCode client's
 * argument names. Since 2026-10-14 the free tier refuses a declared `read` or `bash` whose
 * parameter object has no properties (measured on /inference/v1: `read` + `bash` with
 * `properties: {}` is 403, the same pair with `{command}` on `bash` is 200, and a request
 * with no property-bearing `read` is 403), while an empty schema on a name outside the
 * quartet (`webfetch`, `_noop`) still passes.
 */
const PLACEHOLDER_TOOL_PARAMETER_SCHEMAS: Readonly<Record<string, Record<string, unknown>>> = {
  bash: { type: "object", properties: { command: { type: "string" } }, required: ["command"] },
  glob: { type: "object", properties: { pattern: { type: "string" } }, required: ["pattern"] },
  grep: { type: "object", properties: { pattern: { type: "string" } }, required: ["pattern"] },
  read: { type: "object", properties: { filePath: { type: "string" } }, required: ["filePath"] },
};

/**
 * Parameter schema for an injected placeholder tool named `name`: the schema the client
 * last sent for that name when one was seen, else the quartet's minimal schema, else an
 * inert optional property. Never an empty schema: the upstream refuses a client tool name
 * declared with `properties: {}` and accepts the same name with any property (measured
 * 2026-10-14).
 */
export function placeholderToolParameters(name: string): Record<string, unknown> {
  return (
    getObservedToolParameters(name) ??
    PLACEHOLDER_TOOL_PARAMETER_SCHEMAS[name] ?? {
      type: "object",
      properties: { unused: { type: "string", description: "Unused." } },
    }
  );
}

/**
 * Bring a free-tier request up to the upstream contract, without overriding anything the
 * caller already decided: client tools are kept as they are, and the placeholder tool is
 * only added when the caller sent none or when client-supplied tools do not yet carry the
 * required placeholder tool. Idempotent.
 *
 * The placeholder differs per surface: Chat Completions takes the nested function shape,
 * the Responses surface takes the flat one. Neither carries a `tool_choice` — the upstream
 * rejects any value but "auto" (measured 2026-09-18: 400 invalid_request_error, `only
 * "auto" is supported for tool_choice`), so a `tool_choice` the caller did not send is
 * never added, and one the caller did send travels unchanged. Any other body format only
 * gets the streaming flag: injecting a tool shape blind would be a guess.
 *
 * Which names go in is resolved by `resolvePlaceholderNames`, because the upstream does
 * inspect them.
 */
export function applyFreeTierRequestContract<T>(
  body: T,
  requestFormat: string | null,
  placeholderNames: readonly string[] = [PLACEHOLDER_TOOL_NAME]
): T {
  if (!body || typeof body !== "object" || Array.isArray(body)) return body;
  const record = body as Record<string, unknown>;
  const next: Record<string, unknown> = { ...record, stream: true };

  const existingNames = new Set(clientToolNamesOf(next));
  const baseNames = placeholderNames.length > 0 ? placeholderNames : [PLACEHOLDER_TOOL_NAME];
  const namesToAdd = baseNames.filter((name) => !existingNames.has(name));

  if (namesToAdd.length === 0) return next as T;

  const existingTools = Array.isArray(next.tools) ? [...next.tools] : [];

  if (requestFormat === "openai-responses") {
    next.tools = [
      ...existingTools,
      ...namesToAdd.map((name) => ({
        type: "function",
        name,
        description: PLACEHOLDER_TOOL_DESCRIPTION,
        parameters: placeholderToolParameters(name),
      })),
    ];
    return next as T;
  }

  if (requestFormat === "openai" || requestFormat === null) {
    next.tools = [
      ...existingTools,
      ...namesToAdd.map((name) => ({
        type: "function",
        function: {
          name,
          description: PLACEHOLDER_TOOL_DESCRIPTION,
          parameters: placeholderToolParameters(name),
        },
      })),
    ];
    return next as T;
  }

  return next as T;
}

/**
 * Merge a gated request's own tools with the names the store last saw accepted.
 *
 * A client that declares tools is left alone by `applyFreeTierRequestContract` — but the
 * upstream inspects WHICH names are declared, and a subset it never saw pass (measured
 * 2026-09-21: the 5 explore-agent tools `[glob, grep, read, webfetch, websearch]` on
 * `muse-spark-1.3-contributor-free`, 11 refusals, zero passes) is answered 403
 * FreeTierError. When such a refusal comes back, this rebuilds the same body with the
 * observed names appended after the client's own entries: the client tools keep their
 * full shape (description, parameters) so the model can still call them, while the
 * appended names carry the schema the client last sent for them when one was seen,
 * else the minimal parameter schema `placeholderToolParameters` gives — the same
 * entries the placeholder path builds.
 *
 * Pure: returns the input body unchanged when no observed names are missing, so the
 * caller can skip the retry on identity alone. Resolution order is the store's own:
 * this conversation first, then any conversation on the model, then the operator's
 * configured names.
 */
export function mergeClientToolsWithObserved<T>(
  body: T,
  requestFormat: string | null,
  provider: string,
  model: string,
  session: string | undefined,
  configured: readonly string[]
): T {
  if (!body || typeof body !== "object" || Array.isArray(body)) return body;
  const record = body as Record<string, unknown>;
  if (!Array.isArray(record.tools) || record.tools.length === 0) return body;
  const own = session ? getObservedToolNames(provider, model, session) : null;
  const observed = own ?? getObservedToolNames(provider, model) ?? configured;
  const have = new Set(clientToolNamesOf(body));
  const missing = observed.filter((name) => !have.has(name));
  if (missing.length === 0) return body;
  const next: Record<string, unknown> = { ...(record as Record<string, unknown>) };
  if (requestFormat === "openai-responses") {
    next.tools = [
      ...(record.tools as unknown[]),
      ...missing.map((name) => ({
        type: "function",
        name,
        description: PLACEHOLDER_TOOL_DESCRIPTION,
        parameters: placeholderToolParameters(name),
      })),
    ];
    return next as T;
  }
  if (requestFormat === "openai" || requestFormat === null) {
    next.tools = [
      ...(record.tools as unknown[]),
      ...missing.map((name) => ({
        type: "function",
        function: {
          name,
          description: PLACEHOLDER_TOOL_DESCRIPTION,
          parameters: placeholderToolParameters(name),
        },
      })),
    ];
    return next as T;
  }
  return body;
}

function clientToolNamesOf(body: unknown): string[] {
  if (!body || typeof body !== "object" || Array.isArray(body)) return [];
  const tools = (body as Record<string, unknown>).tools;
  if (!Array.isArray(tools)) return [];
  const names: string[] = [];
  for (const tool of tools) {
    if (!tool || typeof tool !== "object") continue;
    const entry = tool as { name?: unknown; function?: { name?: unknown } };
    const name = typeof entry.name === "string" ? entry.name : entry.function?.name;
    if (typeof name === "string") names.push(name);
  }
  return names;
}

/**
 * Bring one request up to the contract and report what it ended up declaring.
 *
 * Single entry point for the executor: it decides whether the contract applies to this
 * surface and model, resolves the placeholder names, applies the body changes, and hands
 * back the attempt so the outcome can be fed to `noteFreeTierOutcome`.
 */
/**
 * The attempt of the request being served, found by the identity of the body the executor was
 * handed. It cannot live on the executor: that instance is shared, and two requests in flight
 * would read each other's attempt when they finish. It is released when the request is over.
 */
export function attemptFor(origin: unknown): FreeTierContractAttempt | null {
  return recallAttempt<FreeTierContractAttempt>(origin);
}

function isTrackable(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}

/**
 * The shape a request goes out in first. The OpenCode client already sends what the upstream
 * expects, so its request goes out as written (`bare` = streaming only) and is replayed in
 * the other shape if refused; any other caller gets the tools first, as before.
 */
function firstShape(
  origin: object | undefined,
  eligible: boolean,
  key: string,
  fromOpencodeClient: boolean
): { shape: "tools" | "bare"; probe: boolean } {
  const preferred = fromOpencodeClient ? "bare" : "tools";
  return origin && eligible
    ? planShape(origin, key, preferred)
    : { shape: preferred, probe: false };
}

function ownToolsOf(body: unknown): unknown[] {
  const tools = (body as { tools?: unknown } | null)?.tools;
  return Array.isArray(tools) ? tools : [];
}

export function prepareFreeTierRequest<T>(
  body: T,
  requestFormat: string | null,
  surface: OpencodeSurface,
  provider: string,
  model: string,
  session?: string,
  origin?: object,
  fromOpencodeClient = false
): { body: T; attempt: FreeTierContractAttempt | null } {
  const clientToolNames = clientToolNamesOf(body);
  if (!requiresFreeTierRequestContract(surface, provider, model)) {
    if (isTrackable(origin)) forgetAttempt(origin);
    return { body, attempt: null };
  }
  const eligible = isTrackable(origin) && clientToolNames.length === 0;
  const key = eligible ? shapeKeyOf(provider, model, body) : "";
  const plan = firstShape(origin, eligible, key, fromOpencodeClient);
  const chosen = plan.shape;
  const names = resolvePlaceholderNames(provider, model, session, configuredPlaceholderToolNames());
  const borrowed = clientToolNames.length === 0 && names.length > 0 && chosen === "tools";
  const attempt: FreeTierContractAttempt = {
    provider,
    model,
    session,
    borrowed,
    clientToolNames,
    clientTools: clientToolNames.length > 0 ? ownToolsOf(body) : [],
    probe: plan.probe,
  };
  if (isTrackable(origin)) rememberAttempt(origin, attempt);
  if (isTrackable(origin) && eligible) {
    recordInjection(origin, {
      shape: chosen,
      key,
      probe: plan.probe,
      replayNote: (verdict) => noteFreeTierOutcome({ ...attempt, probe: false }, verdict),
    });
  }
  return {
    body:
      chosen === "bare"
        ? withStreaming(body)
        : applyFreeTierRequestContract(body, requestFormat, names),
    attempt,
  };
}

function withStreaming<T>(body: T): T {
  if (!body || typeof body !== "object" || Array.isArray(body)) return body;
  return { ...(body as Record<string, unknown>), stream: true } as T;
}

/**
 * What the upstream answered, with enough detail to tell a refusal about the
 * tools apart from any other failure. A bare boolean keeps the legacy callers
 * compiling: `true` counts as an acceptance, `false` carries no verdict and is
 * never counted.
 */
export interface FreeTierOutcome {
  readonly ok: boolean;
  readonly status: number | null;
  readonly bodyText: string | null;
}

/**
 * Feed a gated request's outcome back, so the next one borrows a shape that still works.
 *
 * An accepted request teaches which names the upstream takes right now; a refused one only
 * teaches something when the names it carried came from the store AND the refusal says
 * something about the tools (a 403/451 carrying the refusal signals — a 429, a 5xx or a
 * refusal about something else leaves the store alone).
 */
export function noteFreeTierOutcome(
  attempt: FreeTierContractAttempt | null,
  outcome: boolean | FreeTierOutcome
): void {
  if (!attempt) return;
  const decided: FreeTierOutcome =
    typeof outcome === "boolean" ? { ok: outcome, status: null, bodyText: null } : outcome;
  if (decided.ok) {
    if (attempt.clientToolNames.length > 0) {
      recordAcceptedToolNames(
        attempt.provider,
        attempt.model,
        attempt.session,
        attempt.clientToolNames
      );
      recordAcceptedToolSchemas(attempt.clientTools ?? []);
    } else if (attempt.borrowed && !attempt.probe) {
      confirmBorrowedToolNames(attempt.provider, attempt.model, attempt.session);
    }
    return;
  }
  if (decided.status === null) return;
  const refused = isOpencodeFreeTierRefusal(decided.status, decided.bodyText);
  // A moved endpoint answers with this same refusal: re-read the published catalog
  // (coalesced, fire-and-forget). Nothing is replayed — the next request uses the value.
  if (refused && surfaceForProvider(attempt.provider) === "zen") {
    requestPublishedEndpointRefresh();
  }
  if (attempt.probe) return;
  if (!attempt.borrowed) return;
  if (refused) {
    noteRefusedBorrowedToolNames(attempt.provider, attempt.model, attempt.session);
  }
}

/**
 * Rebuild a JSON body from the event stream the contract forced.
 *
 * The contract makes the upstream request streamed even when the caller asked for JSON, so
 * the conversion back has to happen here rather than in one caller: `handleChatCore` knows
 * how to buffer an event stream, but the other executor consumers (the compression judge,
 * token counting) call `execute()` and then read `response.json()`. Handing them the raw
 * event stream would throw on a request they explicitly asked not to stream.
 *
 * The conversion is LAZY: the returned body drains and parses the upstream only when the
 * caller reads it, so the executor never blocks on a stream that has not arrived yet — the
 * caller's own read timeout governs, and a caller that cancels pays nothing. Only a
 * successful event-stream response is converted; a streaming caller, a refusal and an
 * already-JSON body pass through untouched.
 */
export function rebuildJsonFromForcedStream(
  response: Response,
  requestFormat: string | null,
  model: string
): Response {
  if (!response.ok || !response.body) return response;
  if (!(response.headers.get("content-type") || "").includes("text/event-stream")) {
    return response;
  }
  const upstream = response;
  let drained = false;
  const body = new ReadableStream<Uint8Array>(
    {
      async pull(controller) {
        if (drained) {
          controller.close();
          return;
        }
        drained = true;
        try {
          const rawSse = await upstream.text();
          const parsed =
            requestFormat === "openai-responses"
              ? parseSSEToResponsesOutput(rawSse, model)
              : parseSSEToOpenAIResponse(rawSse, model);
          const out = parsed && typeof parsed === "object" ? JSON.stringify(parsed) : rawSse;
          controller.enqueue(new TextEncoder().encode(out));
        } catch (err) {
          controller.error(err);
          return;
        }
        controller.close();
      },
      cancel(reason) {
        // Only when nothing started draining: once `text()` holds the reader, cancelling the
        // upstream body directly throws "ReadableStream is locked".
        if (!drained && !upstream.bodyUsed && upstream.body && !upstream.body.locked) {
          void upstream.body.cancel(reason);
        }
      },
    },
    // No pull before the caller reads: a caller that never reads (or cancels) must not make
    // the executor wait on an upstream stream that may never arrive.
    { highWaterMark: 0 }
  );
  const headers = new Headers(response.headers);
  headers.set("content-type", "application/json");
  headers.delete("content-length");
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
