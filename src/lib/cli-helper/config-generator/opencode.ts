import path from "node:path";
import os from "node:os";
import fs from "node:fs";

const CONFIG_PATH = path.join(os.homedir(), ".config", "opencode", "opencode.json");

/**
 * Default context length used when the catalog returns nothing for a model.
 * 128K is the most common modern default and matches what OpenCode/most
 * clients fall back to.
 */
const FALLBACK_CONTEXT_LENGTH = 128_000;

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

/**
 * Resolve the context length for a single catalog entry.
 * Prefers `context_length` (OpenAI-compatible) over `max_context_window_tokens`
 * (llama.cpp-style). Returns `undefined` when neither is a positive integer,
 * letting the caller decide whether to fall back to a default.
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
 * emitted opencode.json. Precedence for the context window:
 *
 *   1. Existing manual override in the user's opencode.json (`limit.context`).
 *   2. Catalog `context_length` / `max_context_window_tokens`.
 *   3. `FALLBACK_CONTEXT_LENGTH` (128K) so OpenCode never sees a missing limit.
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
  // back to the catalog, then to a sensible default. Never emit an entry
  // without `limit.context` — OpenCode's heuristic for missing limits is
  // to clamp to 128K, which is exactly what we fall back to, but emitting
  // the value explicitly is unambiguous and forward-compatible.
  const userLimit = existing?.limit?.context;
  const catalogLimit = catalog ? resolveContextLength(catalog) : undefined;
  const context =
    typeof userLimit === "number" && userLimit > 0
      ? userLimit
      : catalogLimit ?? FALLBACK_CONTEXT_LENGTH;

  // `limit.output` is REQUIRED by OpenCode's v1 provider schema (configV1).
  // Use the catalog's max_output_tokens when available, otherwise fall back
  // to a sensible default (16K is the most common modern output cap).
  const OUTPUT_TOKEN_FALLBACK = 16_000;
  const userOutput = existing?.limit?.output;
  const catalogOutput =
    catalog && typeof catalog.max_output_tokens === "number" && catalog.max_output_tokens > 0
      ? catalog.max_output_tokens
      : undefined;
  const output =
    typeof userOutput === "number" && userOutput > 0
      ? userOutput
      : catalogOutput ?? OUTPUT_TOKEN_FALLBACK;

  const limit: { context: number; input?: number; output: number } = { context, output };
  if (typeof existing?.limit?.input === "number" && existing.limit.input > 0) {
    limit.input = existing.limit.input;
  }
  // If the catalog has a max_input_tokens for non-combo models, surface it.
  if (limit.input === undefined && catalog) {
    const maxInput = (catalog as unknown as Record<string, unknown>).max_input_tokens;
    if (typeof maxInput === "number" && maxInput > 0) limit.input = maxInput;
  }
  entry.limit = limit;

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
   * so every model entry has an explicit `limit.context`. When the catalog
   * request fails (network down, server unreachable, etc.) the generator
   * still emits a usable config using the user's existing entries plus
   * `FALLBACK_CONTEXT_LENGTH`.
   */
  fetchCatalog?: boolean;
  /**
   * Request timeout for the catalog fetch, in milliseconds. Defaults to 5s.
   */
  catalogTimeoutMs?: number;
}

/**
 * Generate a full `opencode.json` document for OmniRoute. Pulls the live
 * model catalog from `/v1/models` so every model — individual and combo —
 * gets an explicit `limit.context`, which is the field OpenCode uses to
 * determine the context window for compaction, overflow detection, and
 * router decisions.
 *
 * Behavior:
 *  - Preserves the user's existing provider name, npm, options, and
 *    per-model names / capability flags.
 *  - For each existing model id, the catalog's `context_length` wins
 *    unless the user already set an explicit `limit.context` in the file.
 *  - For each catalog model id the user did NOT have, a new entry is
 *    added with `limit.context` populated.
 *  - If the catalog fetch fails, the generator still emits a config using
 *    the user's existing entries plus a 128K fallback per model.
 */
export async function generateOpencodeConfig(
  options: GenerateOpencodeOptions
): Promise<string> {
  let base = options.baseUrl;
  let end = base.length;
  while (end > 0 && base[end - 1] === "/") end--;
  base = end < base.length ? base.slice(0, end) : base;
  if (base.endsWith("/v1")) base = base.slice(0, -3);
  const baseURL = `${base}/v1`;

  const providerId = options.providerId?.trim() || "omniroute";
  const fetchCatalog = options.fetchCatalog !== false;
  const timeoutMs = options.catalogTimeoutMs ?? 5_000;

  // Fetch live catalog (best-effort). We never fail generation because of
  // a transient network error — the user's existing config is still usable.
  let catalogById = new Map<string, CatalogModelEntry>();
  if (fetchCatalog) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      const response = await fetch(`${baseURL}/models`, {
        headers: { Authorization: `Bearer ${options.apiKey}` },
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (response.ok) {
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
          catalogById.set(r.id.trim(), r);
        }
      }
    } catch {
      // Catalog fetch failed — fall through to existing-config-only path.
    }
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
  let base = options.baseUrl;
  let end = base.length;
  while (end > 0 && base[end - 1] === "/") end--;
  base = end < base.length ? base.slice(0, end) : base;
  if (base.endsWith("/v1")) base = base.slice(0, -3);

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
