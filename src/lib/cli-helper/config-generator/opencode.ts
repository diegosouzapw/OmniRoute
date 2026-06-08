import path from "node:path";
import os from "node:os";
import fs from "node:fs";

const CONFIG_PATH = path.join(os.homedir(), ".config", "opencode", "opencode.json");

/**
 * OpenAI-compatible model entry — subset of fields the /v1/models endpoint
 * returns. Only the fields we need to emit `limit.context` / `limit.output`
 * are typed.
 */
interface CatalogModelEntry {
  id: string;
  owned_by?: string;
  /** OpenAI-compatible field name; some upstreams return this. */
  context_length?: number;
  max_context_window_tokens?: number;
  /** Optional max output tokens; used to populate `limit.output`. */
  max_output_tokens?: number;
  max_input_tokens?: number;
  /** Optional structured capability flags. */
  capabilities?: {
    attachment?: boolean;
    reasoning?: boolean;
    temperature?: boolean;
    tool_calling?: boolean;
    vision?: boolean;
  };
}

/** Per-model override carried over from the user's existing opencode.json. */
interface ExistingModelEntry {
  name?: string;
  attachment?: boolean;
  reasoning?: boolean;
  temperature?: boolean;
  tool_call?: boolean;
  limit?: { context?: number; input?: number; output?: number };
  // Allow arbitrary other keys to round-trip through untouched.
  [key: string]: unknown;
}

interface ExistingProviderEntry {
  name?: string;
  npm?: string;
  options?: Record<string, unknown>;
  models?: Record<string, ExistingModelEntry>;
  [key: string]: unknown;
}

interface ExistingConfig {
  $schema?: string;
  provider?: Record<string, ExistingProviderEntry>;
  model?: string;
  small_model?: string;
  [key: string]: unknown;
}

export interface CatalogFetchResult {
  /** Models keyed by id, as returned by /v1/models. */
  byId: Map<string, CatalogModelEntry>;
  /** Provider ids that had at least one model in the catalog. */
  providerIds: Set<string>;
  /** Models that have a usable `context_length` (positive finite number). */
  modelsWithContext: number;
  /** Total models returned by the catalog. */
  total: number;
}

/**
 * Fetch the live `/v1/models` catalog from OmniRoute. The catalog is the
 * single source of truth for context windows — opencode.json must NOT
 * hardcode values, otherwise we drift from the provider's actual limits.
 */
export async function fetchOmniRouteCatalog(
  baseUrl: string,
  apiKey: string,
  timeoutMs = 5_000
): Promise<CatalogFetchResult> {
  const cleanBase = baseUrl.replace(/\/+$/, "");
  const baseURL = cleanBase.endsWith("/v1") ? cleanBase : `${cleanBase}/v1`;

  const result: CatalogFetchResult = {
    byId: new Map(),
    providerIds: new Set(),
    modelsWithContext: 0,
    total: 0,
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${baseURL}/models`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(
        `OmniRoute /v1/models returned ${response.status} ${response.statusText}`
      );
    }
    const body = (await response.json()) as unknown;
    const list: unknown[] = Array.isArray(body)
      ? body
      : body && typeof body === "object" && Array.isArray((body as { data?: unknown[] }).data)
        ? ((body as { data: unknown[] }).data as unknown[])
        : [];
    for (const raw of list) {
      if (!raw || typeof raw !== "object") continue;
      const r = raw as CatalogModelEntry;
      if (typeof r.id !== "string" || !r.id.trim()) continue;
      const id = r.id.trim();
      result.byId.set(id, r);
      result.total += 1;
      if (typeof r.owned_by === "string" && r.owned_by.length > 0) {
        result.providerIds.add(r.owned_by);
      }
      const candidates = [r.context_length, r.max_context_window_tokens];
      if (candidates.some((c) => typeof c === "number" && Number.isFinite(c) && c > 0)) {
        result.modelsWithContext += 1;
      }
    }
  } finally {
    clearTimeout(timer);
  }
  return result;
}

/**
 * Resolve the context length for a single catalog entry.
 * Prefers `context_length` (OpenAI-compatible) over `max_context_window_tokens`
 * (llama.cpp-style). Returns `undefined` when neither is a positive integer —
 * this is intentional: we MUST NOT invent a default, because combos whose
 * targets' contexts are unknown to the catalog will mis-report a context
 * window. The user can override per-model via `limit.context` in their
 * existing opencode.json, or fix the upstream catalog.
 */
function resolveContextLength(entry: CatalogModelEntry): number | undefined {
  const candidates = [entry.context_length, entry.max_context_window_tokens];
  for (const c of candidates) {
    if (typeof c === "number" && Number.isFinite(c) && c > 0) return c;
  }
  return undefined;
}

/**
 * Build the entry that ends up under `provider.<name>.models[id]` in the
 * emitted opencode.json. Precedence:
 *
 *   1. Existing manual override in the user's opencode.json (`limit.context`).
 *   2. Catalog `context_length` / `max_context_window_tokens`.
 *
 * If neither is available, the entry is returned WITHOUT a `limit` block so
 * the caller can decide whether to skip the model entirely or surface a
 * warning. We never fabricate a default context window.
 */
function buildModelEntry(
  id: string,
  catalog: CatalogModelEntry | undefined,
  existing: ExistingModelEntry | undefined
): ExistingModelEntry {
  // Carry over user-set "name" first; fall back to id when absent.
  const name = (typeof existing?.name === "string" && existing.name.trim()) || id;

  const entry: ExistingModelEntry = { name };

  // Round-trip capability flags from the existing config (if any).
  for (const flag of ["attachment", "reasoning", "temperature", "tool_call"] as const) {
    const value = existing?.[flag];
    if (typeof value === "boolean") entry[flag] = value;
  }

  // Preserve any extra top-level keys the user set (variants, headers, etc.)
  // that we don't model explicitly.
  if (existing) {
    for (const [k, v] of Object.entries(existing)) {
      if (k === "name" || k === "limit") continue;
      if (v === undefined) continue;
      if (!(k in entry)) entry[k] = v;
    }
  }

  // Resolve the context window. Honor an explicit user override, then fall
  // back to the catalog. We do NOT synthesize a default — if the catalog
  // is unaware of a model's window, the opencode.json will simply omit
  // `limit.context` for that model and OpenCode's own heuristics apply.
  // (OpenCode v1 defaults to 128K when `limit.context` is missing.)
  const userLimit = existing?.limit?.context;
  const catalogLimit = catalog ? resolveContextLength(catalog) : undefined;
  const context =
    typeof userLimit === "number" && userLimit > 0
      ? userLimit
      : catalogLimit;

  // `limit.output` is REQUIRED by OpenCode's v1 provider schema (configV1).
  // Use the catalog's max_output_tokens when available; otherwise fall
  // back to the user's existing `limit.output` and finally to a small
  // default (8K) so OpenCode never errors on a totally missing output cap.
  // We do NOT default context — context is a property of the model and
  // we have no business guessing. Output is a per-request setting and a
  // small default is harmless when truly unknown.
  const userOutput = existing?.limit?.output;
  const catalogOutput =
    catalog && typeof catalog.max_output_tokens === "number" && catalog.max_output_tokens > 0
      ? catalog.max_output_tokens
      : undefined;
  const output =
    typeof userOutput === "number" && userOutput > 0
      ? userOutput
      : catalogOutput ?? 8_192;

  // Emit `limit` only if we have at least one of context/output. We never
  // emit a half-baked limit block with only an `output` (would be misleading).
  if (typeof context === "number" || typeof userOutput === "number" || typeof catalogOutput === "number") {
    const limit: { context?: number; input?: number; output?: number } = {};
    if (typeof context === "number") limit.context = context;
    if (typeof userOutput === "number" || typeof catalogOutput === "number") {
      limit.output =
        typeof userOutput === "number" && userOutput > 0
          ? userOutput
          : catalogOutput ?? 8_192;
    }
    const userInput = existing?.limit?.input;
    if (typeof userInput === "number" && userInput > 0) {
      limit.input = userInput;
    } else if (catalog) {
      const maxInput = catalog.max_input_tokens;
      if (typeof maxInput === "number" && maxInput > 0) limit.input = maxInput;
    }
    entry.limit = limit;
  }

  return entry;
}

/**
 * Load the user's current opencode.json (if any) so we can preserve names,
 * capability flags, and explicit `limit.context` overrides. JSONC comments
 * are not supported — we parse as plain JSON. If parsing fails, we fall
 * back to an empty config; the resulting write will lose comments, but
 * that matches the existing CLI behavior of `config set opencode`.
 */
function loadExistingConfig(): ExistingConfig {
  try {
    if (!fs.existsSync(CONFIG_PATH)) return {};
    const raw = fs.readFileSync(CONFIG_PATH, "utf8");
    return JSON.parse(raw) as ExistingConfig;
  } catch {
    return {};
  }
}

export interface GenerateOpencodeOptions {
  baseUrl: string;
  apiKey: string;
  model?: string;
  /**
   * Override the default `provider.id` used in the generated config.
   * Defaults to `"omniroute"`.
   */
  providerId?: string;
  /**
   * If `true` (default), the generator fetches the live `/v1/models` catalog
   * so every model entry has an explicit `limit.context`. The catalog is the
   * single source of truth for context windows; we never invent defaults.
   *
   * When the catalog request fails, the generator throws — opencode.json must
   * not be emitted with stale or fabricated values. The CLI can catch the
   * error and decide whether to surface it to the user.
   */
  fetchCatalog?: boolean;
  /**
   * Request timeout for the catalog fetch, in milliseconds. Defaults to 5s.
   */
  catalogTimeoutMs?: number;
}

/**
 * Generate a full `opencode.json` document for OmniRoute. The catalog is the
 * single source of truth for context windows — we never hardcode values.
 *
 * Behavior:
 *  - Preserves the user's existing provider name, npm, options, and
 *    per-model names / capability flags.
 *  - For each existing model id, the catalog's `context_length` wins
 *    unless the user already set an explicit `limit.context` in the file.
 *  - For each catalog model id the user did NOT have, a new entry is
 *    added with `limit.context` populated when the catalog has it.
 *  - If the catalog has no context for a model AND the user has no
 *    override, the model is emitted WITHOUT a `limit.context` field.
 *    OpenCode's own heuristic (typically 128K) applies.
 *  - Throws if the catalog fetch fails — the user must fix the upstream
 *    before we can generate a reliable opencode.json.
 */
export async function generateOpencodeConfig(
  options: GenerateOpencodeOptions
): Promise<string> {
  const cleanBase = options.baseUrl.replace(/\/+$/, "");
  const baseURL = cleanBase.endsWith("/v1") ? cleanBase : `${cleanBase}/v1`;

  const providerId = options.providerId?.trim() || "omniroute";
  const fetchCatalog = options.fetchCatalog !== false;
  const timeoutMs = options.catalogTimeoutMs ?? 5_000;

  // Fetch live catalog. The catalog is the source of truth — if it fails,
  // we refuse to write an opencode.json that could mislead OpenCode into
  // picking the wrong context window.
  let catalogById = new Map<string, CatalogModelEntry>();
  if (fetchCatalog) {
    const result = await fetchOmniRouteCatalog(baseURL, options.apiKey, timeoutMs);
    catalogById = result.byId;
  } else {
    throw new Error(
      "fetchCatalog=false is not supported. The catalog is the single source " +
        "of truth for context windows — without it, opencode.json would carry " +
        "fabricated or stale values."
    );
  }

  // Load existing config so we preserve names, capability flags, and any
  // explicit `limit.context` overrides the user has set.
  const existing = loadExistingConfig();
  const existingProvider = existing.provider?.[providerId];
  const existingModels = (existingProvider?.models ?? {}) as Record<string, ExistingModelEntry>;

  // Build the merged model map: catalog first, then existing (so existing
  // values can win for matching ids).
  const mergedIds = new Set<string>([...catalogById.keys(), ...Object.keys(existingModels)]);

  const mergedModels: Record<string, ExistingModelEntry> = {};
  for (const id of mergedIds) {
    mergedModels[id] = buildModelEntry(id, catalogById.get(id), existingModels[id]);
  }

  const provider: Record<string, unknown> = {
    name: existingProvider?.name ?? "OmniRoute",
    npm: existingProvider?.npm ?? "@ai-sdk/openai-compatible",
    options: {
      baseURL,
      apiKey: options.apiKey,
      ...(existingProvider?.options ?? {}),
    },
    models: mergedModels,
  };
  // Carry over any other provider-level keys the user set (e.g. headers).
  if (existingProvider) {
    for (const [k, v] of Object.entries(existingProvider)) {
      if (k === "name" || k === "npm" || k === "options" || k === "models") continue;
      provider[k] = v;
    }
  }

  const config: Record<string, unknown> = {
    $schema: existing.$schema ?? "https://opencode.ai/config.json",
    provider: { ...(existing.provider ?? {}), [providerId]: provider },
  };

  // Carry over top-level keys the user may have set (compaction, plugins,
  // permission, mcp, etc.). We intentionally do NOT preserve `model` /
  // `small_model` unless the generator was given an explicit model — the
  // user's top-level model selection may point at a model that no longer
  // exists, so we require an explicit value via `options.model`.
  for (const [k, v] of Object.entries(existing)) {
    if (k === "$schema" || k === "provider" || k === "model" || k === "small_model") continue;
    config[k] = v;
  }

  if (typeof options.model === "string" && options.model.trim()) {
    config.model = `${providerId}/${options.model.trim()}`;
  } else if (typeof existing.model === "string" && existing.model.trim()) {
    // Preserve the user's previous top-level `model` so a re-run doesn't
    // silently drop their selection.
    config.model = existing.model;
  }

  if (typeof existing.small_model === "string" && existing.small_model.trim()) {
    config.small_model = existing.small_model;
  }

  return JSON.stringify(config, null, 2);
}

/**
 * Synchronous variant used by the legacy CLI path. Emits a minimal
 * `opencode.json` (just provider options + top-level model) without a
 * catalog fetch. Kept for back-compat with the previous `config set
 * opencode` command; the async variant above is what callers should use
 * for the full, context-window-aware flow.
 */
export function generateOpencodeConfigSync(options: {
  baseUrl: string;
  apiKey: string;
  model?: string;
}): string {
  const cleanBase = options.baseUrl.replace(/\/+$/, "");
  const base = cleanBase.endsWith("/v1") ? cleanBase.slice(0, -3) : cleanBase;

  const config = {
    provider: "omniroute",
    baseURL: `${base}/v1`,
    apiKey: options.apiKey,
    model: options.model || "opencode",
  };

  return JSON.stringify(config, null, 2);
}

// Backwards-compatible default export: keeps the existing call sites in
// `config.mjs` working. The async variant above is the preferred entry
// point for new callers.
export default generateOpencodeConfigSync;
