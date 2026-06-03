/**
 * OpenCode provider plugin for OmniRoute AI Gateway.
 *
 * Generates an OpenCode-compatible provider object that points to a running
 * OmniRoute instance. The output follows the OpenCode config schema
 * (https://opencode.ai/config.json) and delegates the runtime to
 * `@ai-sdk/openai-compatible` so OpenCode can drive any OmniRoute-exposed
 * model through its standard OpenAI-compatible client.
 *
 * Two ways to consume the helper:
 *
 *  1. As code, when you build your own opencode.json programmatically:
 *
 *     ```ts
 *     import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";
 *     const config = buildOmniRouteOpenCodeConfig({
 *       baseURL: "http://localhost:20128",
 *       apiKey: "sk_omniroute",
 *     });
 *     // config -> { $schema, provider: { omniroute: { npm, name, options, models } } }
 *     ```
 *
 *  2. As a single-provider entry to merge into an existing opencode.json:
 *
 *     ```ts
 *     import { createOmniRouteProvider } from "@omniroute/opencode-provider";
 *     const provider = createOmniRouteProvider({ baseURL, apiKey });
 *     // provider -> the value to place under provider.omniroute in opencode.json
 *     ```
 *
 * Note: `baseURL` accepts both `http://host:port` and `http://host:port/v1`.
 * The helper normalises trailing slashes / `/v1` so you never get `/v1/v1`.
 */

export const OMNIROUTE_PROVIDER_KEY = "omniroute" as const;
export const OMNIROUTE_PROVIDER_NPM = "@ai-sdk/openai-compatible" as const;
export const OPENCODE_CONFIG_SCHEMA = "https://opencode.ai/config.json" as const;

/**
 * Default catalog of models surfaced to OpenCode when the caller does not
 * supply an explicit `models` list.
 *
 * Curated set covering the most commonly deployed OmniRoute models. Synced
 * with the Alph4d0g/opencode-omniroute-auth OMNIROUTE_DEFAULT_MODELS constant
 * (https://github.com/Alph4d0g/opencode-omniroute-auth, MIT) and extended
 * with Claude Code passthrough models (`cc/` prefix).
 */
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "cc/claude-opus-4-8",
  "cc/claude-opus-4-7",
  "cc/claude-sonnet-4-6",
  "cc/claude-haiku-4-5-20251001",
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;

/**
 * Optional capability flags surfaced to OpenCode's model picker.
 *
 * OpenCode reads these per-model keys (snake_case in JSON) to render badges
 * and to gate features such as image attachments, reasoning mode, temperature
 * controls and tool-calling. Omitted flags default to OpenCode's heuristics.
 *
 * Mirrors the capability shape used by Alph4d0g/opencode-omniroute-auth
 * (https://github.com/Alph4d0g/opencode-omniroute-auth, MIT).
 */
export interface ModelCapabilities {
  /** Display label shown in the model picker. Falls back to the model id. */
  label?: string;
  /** Model accepts image / file attachments. */
  attachment?: boolean;
  /** Model exposes a "reasoning" / extended-thinking surface. */
  reasoning?: boolean;
  /** Model honours the `temperature` parameter. */
  temperature?: boolean;
  /** Model supports tool / function calling. */
  tool_call?: boolean;
}

/**
 * Default per-model context window sizes (tokens) for the curated default catalog.
 * Matches the context lengths used by OmniRoute's provider registry.
 */
export const OMNIROUTE_DEFAULT_MODEL_CONTEXT_LENGTHS: Record<string, number> = {
  "cc/claude-opus-4-8": 1_000_000,
  "cc/claude-opus-4-7": 1_000_000,
  "cc/claude-sonnet-4-6": 200_000,
  "cc/claude-haiku-4-5-20251001": 200_000,
  "claude-opus-4-5-thinking": 200_000,
  "claude-sonnet-4-5-thinking": 200_000,
  "gemini-3.1-pro-high": 1_000_000,
  "gemini-3-flash": 1_000_000,
};

/**
 * Default per-model capability hints for the curated default catalog.
 *
 * Conservative defaults: every default model accepts attachments, tool calls
 * and temperature; `reasoning` is opt-in per model id. Callers override per
 * model via `OmniRouteProviderOptions.modelCapabilities`.
 */
export const OMNIROUTE_DEFAULT_MODEL_CAPABILITIES: Record<string, ModelCapabilities> = {
  "cc/claude-opus-4-8": { attachment: true, reasoning: true, temperature: true, tool_call: true },
  "cc/claude-opus-4-7": { attachment: true, reasoning: true, temperature: true, tool_call: true },
  "cc/claude-sonnet-4-6": { attachment: true, reasoning: true, temperature: true, tool_call: true },
  "cc/claude-haiku-4-5-20251001": { attachment: true, temperature: true, tool_call: true },
  "claude-opus-4-5-thinking": {
    attachment: true,
    reasoning: true,
    temperature: true,
    tool_call: true,
  },
  "claude-sonnet-4-5-thinking": {
    attachment: true,
    reasoning: true,
    temperature: true,
    tool_call: true,
  },
  "gemini-3.1-pro-high": { attachment: true, reasoning: true, temperature: true, tool_call: true },
  "gemini-3-flash": { attachment: true, temperature: true, tool_call: true },
};

export interface OmniRouteProviderOptions {
  /** OmniRoute base URL, with or without trailing `/v1`. Required. */
  baseURL: string;
  /** OmniRoute API key. Required. Use `sk_omniroute` for local instances without REQUIRE_API_KEY. */
  apiKey: string;
  /** Override the display name shown in OpenCode. Default: `"OmniRoute"`. */
  displayName?: string;
  /** Override the model catalog. Defaults to `OMNIROUTE_DEFAULT_OPENCODE_MODELS`. */
  models?: readonly string[];
  /** Optional human-readable labels keyed by model id. Overridden by `modelCapabilities[id].label`. */
  modelLabels?: Record<string, string>;
  /**
   * Optional capability overrides keyed by model id. Merged on top of
   * `OMNIROUTE_DEFAULT_MODEL_CAPABILITIES` for ids in the default catalog;
   * for custom ids the override is used verbatim.
   */
  modelCapabilities?: Record<string, ModelCapabilities>;
  /**
   * Primary model for OpenCode (top-level `model` key).
   * Emitted as `"omniroute/<id>"`. When omitted the key is not written.
   */
  model?: string;
  /**
   * Secondary / cheap model for OpenCode (top-level `small_model` key).
   * Emitted as `"omniroute/<id>"`. When omitted the key is not written.
   */
  smallModel?: string;
}

/** Per-model entry written under `provider.omniroute.models[id]`. */
export interface OpenCodeModelEntry {
  name: string;
  attachment?: boolean;
  reasoning?: boolean;
  temperature?: boolean;
  tool_call?: boolean;
  /**
   * Context window limit. OpenCode reads this to determine usable context
   * length for compaction, overflow detection, and router decisions.
   * Maps to `limit.context` in OpenCode's provider config schema.
   */
  limit?: {
    /** Maximum context length in tokens (e.g. 200000 for Claude, 1000000 for Gemini). */
    context: number;
    /** Optional per-request max input tokens. */
    input?: number;
    /** Optional max output tokens. */
    output?: number;
  };
}

export interface OpenCodeProviderEntry {
  /** Identifier of the OpenCode runtime package that will speak to OmniRoute. */
  npm: typeof OMNIROUTE_PROVIDER_NPM;
  /** Display name in the OpenCode UI. */
  name: string;
  /** Options forwarded to `@ai-sdk/openai-compatible`. */
  options: {
    baseURL: string;
    apiKey: string;
  };
  /** Model catalog surfaced to OpenCode. */
  models: Record<string, OpenCodeModelEntry>;
}

export interface OpenCodeConfigDocument {
  $schema: typeof OPENCODE_CONFIG_SCHEMA;
  /** Primary model for OpenCode, e.g. `"omniroute/claude-sonnet-4-5-thinking"`. */
  model?: string;
  /** Secondary / cheap model for OpenCode, e.g. `"omniroute/gemini-3-flash"`. */
  small_model?: string;
  provider: {
    [OMNIROUTE_PROVIDER_KEY]: OpenCodeProviderEntry;
  };
}

function requireNonEmpty(value: unknown, field: string): string {
  if (typeof value !== "string") {
    throw new TypeError(`@omniroute/opencode-provider: ${field} must be a string`);
  }
  const trimmed = value.trim();
  if (!trimmed) {
    throw new Error(`@omniroute/opencode-provider: ${field} is required and cannot be empty`);
  }
  return trimmed;
}

/**
 * Normalise the user-supplied baseURL so the final `options.baseURL` always
 * ends in exactly one `/v1`. Accepts both `http://host` and `http://host/v1`.
 */
export function normalizeBaseURL(rawBaseURL: string): string {
  const trimmed = requireNonEmpty(rawBaseURL, "baseURL");
  try {
    new URL(trimmed);
  } catch {
    throw new Error(
      `@omniroute/opencode-provider: baseURL is not a valid URL: ${JSON.stringify(rawBaseURL)}`
    );
  }
  let base = trimmed;
  let end = base.length;
  while (end > 0 && base[end - 1] === "/") end--;
  base = end < base.length ? base.slice(0, end) : base;
  if (base.endsWith("/v1")) base = base.slice(0, -3);
  return base + "/v1";
}

/**
 * Build the `provider.omniroute` entry for an OpenCode config document.
 * The returned object is JSON-serialisable and safe to embed verbatim.
 */
export function createOmniRouteProvider(options: OmniRouteProviderOptions): OpenCodeProviderEntry {
  const baseURL = normalizeBaseURL(options.baseURL);
  const apiKey = requireNonEmpty(options.apiKey, "apiKey");

  const modelList =
    options.models && options.models.length > 0
      ? [...options.models]
      : [...OMNIROUTE_DEFAULT_OPENCODE_MODELS];

  const labels = options.modelLabels ?? {};
  const overrides = options.modelCapabilities ?? {};
  const models: Record<string, OpenCodeModelEntry> = {};
  const seen = new Set<string>();
  for (const raw of modelList) {
    const id = typeof raw === "string" ? raw.trim() : "";
    if (!id || seen.has(id)) continue;
    seen.add(id);
    const defaults = OMNIROUTE_DEFAULT_MODEL_CAPABILITIES[id] ?? {};
    const override = overrides[id] ?? {};
    const merged: ModelCapabilities = { ...defaults, ...override };
    const explicitLabel =
      typeof merged.label === "string" && merged.label.trim()
        ? merged.label.trim()
        : typeof labels[id] === "string" && labels[id].trim()
          ? labels[id].trim()
          : id;
    const entry: OpenCodeModelEntry = { name: explicitLabel };
    if (typeof merged.attachment === "boolean") entry.attachment = merged.attachment;
    if (typeof merged.reasoning === "boolean") entry.reasoning = merged.reasoning;
    if (typeof merged.temperature === "boolean") entry.temperature = merged.temperature;
    if (typeof merged.tool_call === "boolean") entry.tool_call = merged.tool_call;

    // Include context window limit when known — OpenCode reads this to
    // determine usable context length for compaction & overflow detection.
    const contextLength = OMNIROUTE_DEFAULT_MODEL_CONTEXT_LENGTHS[id];
    if (typeof contextLength === "number" && contextLength > 0) {
      entry.limit = { context: contextLength };
    }

    models[id] = entry;
  }

  return {
    npm: OMNIROUTE_PROVIDER_NPM,
    name: options.displayName?.trim() || "OmniRoute",
    options: { baseURL, apiKey },
    models,
  };
}

/**
 * Build a full OpenCode config document (with `$schema` + `provider.omniroute`).
 * Useful when scaffolding a fresh `opencode.json`.
 *
 * When `options.model` / `options.smallModel` are supplied they are emitted as
 * top-level `model` / `small_model` keys prefixed with `"omniroute/"` so
 * OpenCode resolves them through the configured provider.
 */
export function buildOmniRouteOpenCodeConfig(
  options: OmniRouteProviderOptions
): OpenCodeConfigDocument {
  const doc: OpenCodeConfigDocument = {
    $schema: OPENCODE_CONFIG_SCHEMA,
    provider: {
      [OMNIROUTE_PROVIDER_KEY]: createOmniRouteProvider(options),
    },
  };

  if (options.model !== undefined) {
    const id = options.model.trim();
    if (id) doc.model = `${OMNIROUTE_PROVIDER_KEY}/${id}`;
  }

  if (options.smallModel !== undefined) {
    const id = options.smallModel.trim();
    if (id) doc.small_model = `${OMNIROUTE_PROVIDER_KEY}/${id}`;
  }

  return doc;
}

/**
 * Merge the OmniRoute provider entry (and optional `model` / `small_model`
 * keys) into an already-existing OpenCode config object.
 *
 * Performs a non-destructive merge: all top-level keys in `existing` are
 * preserved. The `provider` map is shallow-merged so other providers already
 * present are not removed. If `existing.provider.omniroute` already exists it
 * is overwritten by the newly built entry.
 *
 * `model` and `small_model` are only written when supplied in `options`.
 *
 * @example
 * ```ts
 * const existing = JSON.parse(readFileSync("opencode.json", "utf8"));
 * const updated = mergeIntoExistingConfig(existing, {
 *   baseURL: "http://localhost:20128",
 *   apiKey: "sk_omniroute",
 *   model: "claude-sonnet-4-5-thinking",
 * });
 * writeFileSync("opencode.json", JSON.stringify(updated, null, 2));
 * ```
 */
export function mergeIntoExistingConfig(
  existing: Record<string, unknown>,
  options: OmniRouteProviderOptions
): Record<string, unknown> {
  const partial = buildOmniRouteOpenCodeConfig(options);

  const merged: Record<string, unknown> = { ...existing };

  if (partial.model !== undefined) merged.model = partial.model;
  if (partial.small_model !== undefined) merged.small_model = partial.small_model;

  const existingProvider =
    typeof existing.provider === "object" && existing.provider !== null
      ? (existing.provider as Record<string, unknown>)
      : {};

  merged.provider = {
    ...existingProvider,
    [OMNIROUTE_PROVIDER_KEY]: partial.provider[OMNIROUTE_PROVIDER_KEY],
  };

  return merged;
}

/**
 * The 7 read-only MCP scopes that allow inspection without any write access.
 * Suitable for shared / public environments.
 */
export const OMNIROUTE_MCP_DEFAULT_SCOPES = [
  "read:health",
  "read:combos",
  "read:quota",
  "read:usage",
  "read:models",
  "read:cache",
  "read:compression",
] as const;

export type OmniRouteMCPScope = (typeof OMNIROUTE_MCP_DEFAULT_SCOPES)[number] | string;

export interface OmniRouteMCPOptions {
  /** Absolute path to the MCP server entry point (TypeScript or compiled JS). */
  serverPath: string;
  /** OmniRoute API key forwarded to the MCP server as `OMNIROUTE_API_KEY`. */
  apiKey: string;
  /**
   * Management API key used for management-scoped operations.
   * When supplied it is forwarded as `OMNIROUTE_MANAGEMENT_API_KEY`.
   */
  managementApiKey?: string;
  /**
   * Comma-separated scope list passed as `OMNIROUTE_MCP_SCOPES`.
   * When omitted `OMNIROUTE_MCP_ENFORCE_SCOPES` is not set and all scopes are
   * available (development default). Pass an explicit list to restrict access.
   */
  scopes?: OmniRouteMCPScope[];
  /**
   * Runtime used to execute the MCP server.
   *
   * - `"tsx"` (default) — runs via `npx tsx` for TypeScript source files.
   * - `"node"` — runs via `node` for compiled JS outputs.
   */
  runtime?: "tsx" | "node";
}

export interface OpenCodeMCPServerEntry {
  command: string;
  args: string[];
  env: Record<string, string>;
}

/**
 * Build the `mcp.servers.omniroute` entry for an OpenCode config document.
 *
 * @example
 * ```ts
 * const mcpEntry = createOmniRouteMCPEntry({
 *   serverPath: "/home/user/.local/share/omniroute/open-sse/mcp-server/server.ts",
 *   apiKey: "sk_omniroute",
 *   managementApiKey: "sk_manage_...",
 *   scopes: ["read:health", "read:combos", "execute:completions"],
 * });
 * // Place at config.mcp.servers.omniroute
 * ```
 */
export function createOmniRouteMCPEntry(options: OmniRouteMCPOptions): OpenCodeMCPServerEntry {
  const serverPath = requireNonEmpty(options.serverPath, "serverPath");
  const apiKey = requireNonEmpty(options.apiKey, "apiKey");

  const runtime = options.runtime ?? "tsx";

  const command = runtime === "tsx" ? "npx" : "node";
  const args = runtime === "tsx" ? ["tsx", serverPath] : [serverPath];

  const env: Record<string, string> = {
    OMNIROUTE_API_KEY: apiKey,
  };

  if (options.managementApiKey !== undefined) {
    const mgmtKey = options.managementApiKey.trim();
    if (mgmtKey) env.OMNIROUTE_MANAGEMENT_API_KEY = mgmtKey;
  }

  if (options.scopes !== undefined && options.scopes.length > 0) {
    env.OMNIROUTE_MCP_ENFORCE_SCOPES = "true";
    env.OMNIROUTE_MCP_SCOPES = options.scopes.join(",");
  }

  return { command, args, env };
}

async function fetchJSON<T>(url: string, apiKey: string, timeoutMs: number): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`received HTTP ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`@omniroute/opencode-provider: request to ${url} failed: ${message}`);
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Lightweight model descriptor returned by `fetchLiveModels`.
 * The shape mirrors the subset of fields that OmniRoute's `/v1/models`
 * endpoint reliably provides across versions, normalised from both
 * camelCase and snake_case variants used by different OmniRoute releases.
 *
 * Attribution: field-variant normalisation logic adapted from
 * https://github.com/Alph4d0g/opencode-omniroute-auth (MIT).
 */
export interface OmniRouteLiveModel {
  id: string;
  name: string;
  /** Context window length in tokens (e.g. 200000 for Claude, 1000000 for Gemini). */
  contextLength?: number;
}

/**
 * Fetch the live model catalog from a running OmniRoute instance.
 *
 * Returns an array of `{ id, name }` objects from `GET /v1/models`. Handles
 * both the camelCase (`modelId`, `displayName`) and snake_case (`model_id`,
 * `display_name`) field variants across OmniRoute versions.
 *
 * Useful for dynamically populating the `models` option of
 * `createOmniRouteProvider` / `buildOmniRouteOpenCodeConfig` instead of
 * relying on `OMNIROUTE_DEFAULT_OPENCODE_MODELS`.
 *
 * @param baseURL   - OmniRoute base URL (with or without `/v1`).
 * @param apiKey    - OmniRoute API key.
 * @param timeoutMs - Request timeout in milliseconds (default 5000).
 *
 * @example
 * ```ts
 * const models = await fetchLiveModels("http://localhost:20128", "sk_omniroute");
 * const config = buildOmniRouteOpenCodeConfig({
 *   baseURL: "http://localhost:20128",
 *   apiKey: "sk_omniroute",
 *   models: models.map((m) => m.id),
 *   modelLabels: Object.fromEntries(models.map((m) => [m.id, m.name])),
 * });
 * ```
 */
export async function fetchLiveModels(
  baseURL: string,
  apiKey: string,
  timeoutMs = 5_000
): Promise<OmniRouteLiveModel[]> {
  const key = requireNonEmpty(apiKey, "apiKey");
  const url = `${normalizeBaseURL(baseURL)}/models`;

  const body = await fetchJSON<unknown>(url, key, timeoutMs);

  const rawList: unknown[] = Array.isArray(body)
    ? body
    : body && typeof body === "object" && Array.isArray((body as { data?: unknown[] }).data)
      ? ((body as { data: unknown[] }).data as unknown[])
      : [];

  const models: OmniRouteLiveModel[] = [];
  for (const raw of rawList) {
    if (typeof raw !== "object" || raw === null) continue;
    const r = raw as Record<string, unknown>;

    const id =
      typeof r.id === "string"
        ? r.id.trim()
        : typeof r.modelId === "string"
          ? r.modelId.trim()
          : typeof r.model_id === "string"
            ? r.model_id.trim()
            : "";

    if (!id) continue;

    const name =
      typeof r.name === "string"
        ? r.name.trim()
        : typeof r.displayName === "string"
          ? r.displayName.trim()
          : typeof r.display_name === "string"
            ? r.display_name.trim()
            : id;

    // Extract context_length from OmniRoute's /v1/models response.
    // OmniRoute returns context_length in snake_case for both synced
    // models (with inputTokenLimit) and custom models; the catalog's
    // getDefaultContextFallback also injects it from registry defaults.
    const contextLength =
      typeof r.context_length === "number" && r.context_length > 0
        ? r.context_length
        : typeof r.max_context_window_tokens === "number" && r.max_context_window_tokens > 0
          ? r.max_context_window_tokens
          : undefined;

    models.push({ id, name: name || id, ...(contextLength ? { contextLength } : {}) });
  }

  return models;
}

/**
 * Valid per-combo compression override values.
 * An empty string clears any existing override (inherits global setting).
 */
export type OmniRouteCompressionOverride =
  | ""
  | "off"
  | "lite"
  | "standard"
  | "aggressive"
  | "ultra"
  | "rtk"
  | "stacked";

const VALID_COMPRESSION_OVERRIDES = new Set<string>([
  "",
  "off",
  "lite",
  "standard",
  "aggressive",
  "ultra",
  "rtk",
  "stacked",
]);

/** Slim combo descriptor returned by `listCombos`. */
export interface OmniRouteCombo {
  id: string;
  name: string;
  strategy: string;
  active: boolean;
  compressionOverride: OmniRouteCompressionOverride;
}

/**
 * Fetch the active routing combo list from a running OmniRoute instance.
 *
 * Returns an array of combo descriptors from `GET /api/combos`. The
 * `compressionOverride` field reflects the per-combo compression strategy
 * (one of the 8 recognised values; empty string means "inherit global").
 *
 * Requires a management-scoped API key (Bearer `manage` scope) when the
 * instance has `REQUIRE_API_KEY` enabled.
 *
 * @param baseURL          - OmniRoute base URL (with or without `/v1`).
 * @param managementApiKey - API key with `manage` scope.
 * @param timeoutMs        - Request timeout in milliseconds (default 5000).
 */
export async function listCombos(
  baseURL: string,
  managementApiKey: string,
  timeoutMs = 5_000
): Promise<OmniRouteCombo[]> {
  const key = requireNonEmpty(managementApiKey, "managementApiKey");
  const base = normalizeBaseURL(baseURL).replace(/\/v1$/, "");
  const url = `${base}/api/combos`;

  const body = await fetchJSON<unknown>(url, key, timeoutMs);
  const rawList: unknown[] = Array.isArray(body)
    ? body
    : body && typeof body === "object" && Array.isArray((body as { combos?: unknown[] }).combos)
      ? ((body as { combos: unknown[] }).combos as unknown[])
      : [];

  const combos: OmniRouteCombo[] = [];
  for (const raw of rawList) {
    if (typeof raw !== "object" || raw === null) continue;
    const r = raw as Record<string, unknown>;

    const id = typeof r.id === "string" ? r.id.trim() : "";
    if (!id) continue;

    const name = typeof r.name === "string" ? r.name.trim() : id;
    const strategy = typeof r.strategy === "string" ? r.strategy : "";
    const active = typeof r.active === "boolean" ? r.active : false;

    const rawOverride = typeof r.compressionOverride === "string" ? r.compressionOverride : "";
    const compressionOverride = VALID_COMPRESSION_OVERRIDES.has(rawOverride)
      ? (rawOverride as OmniRouteCompressionOverride)
      : "";

    combos.push({ id, name, strategy, active, compressionOverride });
  }

  return combos;
}

/**
 * Options for `createOmniRouteComboConfig`.
 * Mirrors the subset of combo fields exposed by the OmniRoute `/api/combos`
 * PATCH / POST payload that are safe to set programmatically.
 */
export interface OmniRouteComboConfigOptions {
  /** Human-readable combo name. */
  name: string;
  /** Routing strategy (e.g. `"priority"`, `"weighted"`, `"round-robin"`). */
  strategy: string;
  /**
   * Per-combo compression override.
   * Empty string removes any override (inherits global setting).
   */
  compressionOverride?: OmniRouteCompressionOverride;
  /** Whether this combo is active for routing. Default: `true`. */
  active?: boolean;
  /**
   * Ordered list of provider IDs in this combo.
   * Required for create operations; optional for updates.
   */
  providers?: string[];
}

/**
 * Build a typed combo payload suitable for OmniRoute's management API.
 *
 * The returned object is JSON-serialisable and safe to pass as the body of a
 * `POST /api/combos` (create) or `PATCH /api/combos/:id` (update) request.
 *
 * @example
 * ```ts
 * const payload = createOmniRouteComboConfig({
 *   name: "claude-primary",
 *   strategy: "priority",
 *   compressionOverride: "standard",
 *   providers: ["anthropic-claude-opus", "anthropic-claude-sonnet"],
 * });
 * await fetch(`${baseURL}/api/combos`, {
 *   method: "POST",
 *   headers: { Authorization: `Bearer ${mgmtKey}`, "Content-Type": "application/json" },
 *   body: JSON.stringify(payload),
 * });
 * ```
 */
export function createOmniRouteComboConfig(
  options: OmniRouteComboConfigOptions
): Record<string, unknown> {
  const name = requireNonEmpty(options.name, "name");
  const strategy = requireNonEmpty(options.strategy, "strategy");

  const payload: Record<string, unknown> = {
    name,
    strategy,
    active: options.active ?? true,
  };

  if (options.compressionOverride !== undefined) {
    payload.compressionOverride = options.compressionOverride;
  }

  if (options.providers !== undefined) {
    const providers = options.providers.filter((p) => typeof p === "string" && p.trim());
    if (providers.length > 0) {
      payload.providers = providers;
    }
  }

  return payload;
}

/**
 * Override fields supported per agent / mode entry. Mirrors the subset of
 * OpenCode's `AgentConfig` schema that is safe to set declaratively from a
 * config generator. Only fields present in
 * https://opencode.ai/config.json#AgentConfig are exposed.
 */
export interface OmniRouteRoleOverrides {
  /** Forward to OpenCode's `temperature` field. */
  temperature?: number;
  /** Forward to OpenCode's `top_p` field. */
  top_p?: number;
}

/** Per-role binding used by `createOmniRouteAgentBlock`. */
export interface OmniRouteAgentRole extends OmniRouteRoleOverrides {
  /** OmniRoute model id, e.g. `"claude-sonnet-4-5-thinking"`. */
  modelId: string;
  /** Optional tools allow-list; per OpenCode schema, map of tool name → enabled. */
  tools?: Record<string, boolean>;
  /** Optional system prompt for this agent role. */
  prompt?: string;
}

/** Options for `createOmniRouteAgentBlock`. */
export interface OmniRouteAgentBlockOptions {
  /** Per-role bindings. Keys become entries under OpenCode's `agent` block. */
  roles: Record<string, OmniRouteAgentRole>;
}

/** Single entry inside the emitted OpenCode `agent` block. */
export interface OpenCodeAgentEntry extends OmniRouteRoleOverrides {
  /** Always emitted as `"omniroute/<modelId>"`. */
  model: string;
  /** Per OpenCode schema, `Record<string, boolean>`. */
  tools?: Record<string, boolean>;
  /** Optional system prompt. */
  prompt?: string;
}

function buildAgentEntry(role: OmniRouteAgentRole): OpenCodeAgentEntry | undefined {
  if (!role || typeof role.modelId !== "string") return undefined;
  const modelId = role.modelId.trim();
  if (!modelId) return undefined;
  const entry: OpenCodeAgentEntry = { model: `${OMNIROUTE_PROVIDER_KEY}/${modelId}` };
  if (typeof role.temperature === "number") entry.temperature = role.temperature;
  if (typeof role.top_p === "number") entry.top_p = role.top_p;
  if (role.tools && typeof role.tools === "object" && !Array.isArray(role.tools)) {
    const tools: Record<string, boolean> = {};
    for (const [name, enabled] of Object.entries(role.tools)) {
      if (typeof name !== "string" || !name.trim()) continue;
      if (typeof enabled !== "boolean") continue;
      tools[name] = enabled;
    }
    if (Object.keys(tools).length > 0) entry.tools = tools;
  }
  if (typeof role.prompt === "string" && role.prompt.trim()) {
    entry.prompt = role.prompt;
  }
  return entry;
}

/**
 * Build the OpenCode `agent` block, pre-wired so each agent role routes to a
 * specific OmniRoute model. Useful for `.opencode/agent/*.md` defaults and
 * scaffolded `opencode.json` files.
 *
 * Emitted fields are limited to those declared in OpenCode's `AgentConfig`
 * schema (`model`, `temperature`, `top_p`, `tools`, `prompt`). The `tools`
 * field is a `Record<string, boolean>` per the schema, not a string array.
 *
 * Roles with empty / missing `modelId` are skipped.
 *
 * @example
 * ```ts
 * const agentBlock = createOmniRouteAgentBlock({
 *   roles: {
 *     build: { modelId: "claude-sonnet-4-5-thinking", temperature: 0.2 },
 *     plan: { modelId: "claude-opus-4-5-thinking", top_p: 0.95 },
 *     review: { modelId: "gemini-3-flash", tools: { edit: false, bash: false } },
 *   },
 * });
 * // -> { build: { model: "omniroute/claude-sonnet-4-5-thinking", temperature: 0.2 }, ... }
 * ```
 */
export function createOmniRouteAgentBlock(
  options: OmniRouteAgentBlockOptions
): Record<string, OpenCodeAgentEntry> {
  const out: Record<string, OpenCodeAgentEntry> = {};
  const roles = options.roles ?? {};
  for (const [roleName, role] of Object.entries(roles)) {
    const entry = buildAgentEntry(role);
    if (entry) out[roleName] = entry;
  }
  return out;
}

/**
 * Per-mode binding used by `createOmniRouteModesBlock`.
 *
 * @deprecated OpenCode's top-level `mode` block is deprecated in favour of
 * `agent`. Prefer `OmniRouteAgentRole` + `createOmniRouteAgentBlock`. This
 * type and the corresponding helper are kept for back-compat with configs
 * still using `mode:`.
 */
export interface OmniRouteMode extends OmniRouteAgentRole {}

/**
 * Options for `createOmniRouteModesBlock`.
 *
 * @deprecated See `OmniRouteMode`.
 */
export interface OmniRouteModesBlockOptions {
  /** Per-mode bindings. Keys become entries under OpenCode's deprecated top-level `mode` block. */
  modes: Record<string, OmniRouteMode>;
}

/**
 * Single entry inside the emitted OpenCode `mode` block.
 *
 * @deprecated See `OmniRouteMode`.
 */
export interface OpenCodeModeEntry extends OpenCodeAgentEntry {}

/**
 * Build the OpenCode top-level `mode` block, pre-wired so each mode routes to
 * a specific OmniRoute model. Emits the same shape as the `agent` block since
 * OpenCode's schema treats them identically (both reference `AgentConfig`).
 *
 * Modes with empty / missing `modelId` are skipped.
 *
 * @deprecated OpenCode's top-level `mode` block is deprecated in favour of
 * `agent`. Prefer `createOmniRouteAgentBlock`. This helper is kept for
 * back-compat with configs still using `mode:`.
 *
 * @example
 * ```ts
 * const modesBlock = createOmniRouteModesBlock({
 *   modes: {
 *     build: { modelId: "claude-sonnet-4-5-thinking", tools: { edit: true, bash: true } },
 *     plan: { modelId: "claude-opus-4-5-thinking", prompt: "Plan first, code later." },
 *     review: { modelId: "gemini-3-flash" },
 *   },
 * });
 * ```
 */
export function createOmniRouteModesBlock(
  options: OmniRouteModesBlockOptions
): Record<string, OpenCodeModeEntry> {
  const out: Record<string, OpenCodeModeEntry> = {};
  const modes = options.modes ?? {};
  for (const [modeName, mode] of Object.entries(modes)) {
    const entry = buildAgentEntry(mode);
    if (entry) out[modeName] = entry;
  }
  return out;
}

export default createOmniRouteProvider;
