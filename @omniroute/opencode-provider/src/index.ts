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
 * supply an explicit `models` list. Mirrors the curated set used by the
 * OmniRoute dashboard's "OpenCode" config generator.
 */
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;

export interface OmniRouteProviderOptions {
  /** OmniRoute base URL, with or without trailing `/v1`. Required. */
  baseURL: string;
  /** OmniRoute API key. Required. Use `sk_omniroute` for local instances without REQUIRE_API_KEY. */
  apiKey: string;
  /** Override the display name shown in OpenCode. Default: `"OmniRoute"`. */
  displayName?: string;
  /** Override the model catalog. Defaults to `OMNIROUTE_DEFAULT_OPENCODE_MODELS`. */
  models?: readonly string[];
  /** Optional human-readable labels keyed by model id. */
  modelLabels?: Record<string, string>;
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
  models: Record<string, { name: string }>;
}

export interface OpenCodeConfigDocument {
  $schema: typeof OPENCODE_CONFIG_SCHEMA;
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
    // Reject malformed URLs early.
    new URL(trimmed);
  } catch {
    throw new Error(
      `@omniroute/opencode-provider: baseURL is not a valid URL: ${JSON.stringify(rawBaseURL)}`
    );
  }
  return trimmed.replace(/\/+$/, "").replace(/\/v1$/, "") + "/v1";
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
  const models: Record<string, { name: string }> = {};
  const seen = new Set<string>();
  for (const raw of modelList) {
    const id = typeof raw === "string" ? raw.trim() : "";
    if (!id || seen.has(id)) continue;
    seen.add(id);
    const label = typeof labels[id] === "string" && labels[id].trim() ? labels[id].trim() : id;
    models[id] = { name: label };
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
 */
export function buildOmniRouteOpenCodeConfig(
  options: OmniRouteProviderOptions
): OpenCodeConfigDocument {
  return {
    $schema: OPENCODE_CONFIG_SCHEMA,
    provider: {
      [OMNIROUTE_PROVIDER_KEY]: createOmniRouteProvider(options),
    },
  };
}

export default createOmniRouteProvider;
