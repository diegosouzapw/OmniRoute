/**
 * OpenCode plugin for the OmniRoute AI Gateway.
 *
 * Implements the official `@opencode-ai/plugin` Plugin contract (auth +
 * provider + config hooks) to drive a running OmniRoute instance from
 * OpenCode without hand-curated `provider.<id>.models` blocks in
 * opencode.json[c]:
 *
 *   - `auth`     — registers `/connect <providerId>` flow (API key prompt)
 *   - `provider` — dynamic `/v1/models` fetch with TTL cache, capabilities
 *                  pass-through (OmniRoute is the source of truth — no
 *                  client-side variant synthesis)
 *   - `config`   — backward-compat shim for OC versions that predate the
 *                  `provider.models` hook (≤ 1.14.48)
 *
 * Two ways to consume the plugin:
 *
 *  1. Single-instance (default `providerId: "omniroute"`):
 *
 *     ```json
 *     {
 *       "$schema": "https://opencode.ai/config.json",
 *       "plugin": ["@omniroute/opencode-plugin"]
 *     }
 *     ```
 *
 *  2. Multi-instance via plugin options (prod + preprod side by side):
 *
 *     ```json
 *     {
 *       "$schema": "https://opencode.ai/config.json",
 *       "plugin": [
 *         ["@omniroute/opencode-plugin", { "providerId": "omniroute" }],
 *         ["@omniroute/opencode-plugin", { "providerId": "omniroute-preprod" }]
 *       ]
 *     }
 *     ```
 *
 * Then `opencode connect <providerId>` to provision the API key per instance.
 *
 * Companion library: `@omniroute/opencode-provider` (build-time config generator)
 * remains supported for users who can't run plugins (CI, scripted scaffolding).
 *
 * @see https://opencode.ai/docs/plugins for the OpenCode plugin contract.
 * @see https://github.com/diegosouzapw/OmniRoute for the AI Gateway.
 */

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import type { AuthHook, Config, Plugin, PluginOptions, ProviderHook } from "@opencode-ai/plugin";
import type { Model as ModelV2 } from "@opencode-ai/sdk/v2";
import { z } from "zod";
import { logger as _logger, setLogLevel, type LogLevel as _LogLevel } from "./logger.js";
import {
  PROVIDER_TAG_SEPARATOR as _PROVIDER_TAG_SEPARATOR,
  shortProviderLabel as _shortProviderLabel,
  normaliseFreeLabel as _normaliseFreeLabel,
  formatAutoComboName,
  autoComboModelId,
  formatFreeBudget,
  type AutoVariant,
  AUTO_VARIANTS,
  AUTO_VARIANT_DESCRIPTIONS,
  type FreeModelFreeType,
} from "./naming.js";

/**
 * Zod schema for plugin options accepted as the second element of the
 * `plugin: [name, opts]` tuple in opencode.json. Strict by design — unknown
 * keys are rejected so typos in opencode.json surface immediately at plugin
 * construction time instead of silently being dropped.
 *
 * Doc per field:
 *
 *  - `providerId`     OpenCode provider id this plugin instance binds to.
 *                     Multiple plugin instances coexist by giving each a
 *                     different `providerId` ("omniroute", "omniroute-preprod",
 *                     "omniroute-local"). Maps to `ProviderHook.id` and
 *                     `AuthHook.provider` in the @opencode-ai/plugin contract.
 *                     Default: "omniroute".
 *  - `displayName`    Label rendered in the OpenCode UI. Default derives
 *                     from providerId.
 *  - `modelCacheTtl`  `/v1/models` TTL cache duration in milliseconds.
 *                     Default: 300_000 (5 min).
 *  - `baseURL`        Override base URL for this OmniRoute instance. When
 *                     absent, the loader falls back to a credential-attached
 *                     baseURL set by `/connect`.
 */
/**
 * Optional feature toggles. Every field is opt-in/out per call; defaults
 * mirror the v0.1.0 behaviour so existing opencode.json files do not need
 * to change.
 *
 *  - `combos`               Discover `/api/combos` and surface them as
 *                           pseudo-models with LCD capabilities. Default true.
 *  - `enrichment`           Pull display names + pricing from
 *                           `/api/pricing/models` and overlay them onto the
 *                           ModelV2 entries derived from `/v1/models`. Solves
 *                           the "raw id in UI" complaint without client-side
 *                           heuristics. Default true.
 *  - `compressionMetadata`  Pull `/api/context/combos` so combo entries can
 *                           be tagged with their compression pipeline
 *                           (e.g. `rtk:standard → caveman:full`). Off by
 *                           default — adds one network call per refresh and
 *                           the data is only useful for combo entries.
 *  - `geminiSanitization`   Strip `$schema`/`$ref`/`additionalProperties`
 *                           from `tools[].function.parameters` when the
 *                           model id contains "gemini". Default true.
 *  - `mcpAutoEmit`          Auto-write an `mcp.<providerId>` remote entry
 *                           into the OC config pointing at
 *                           `<baseURL>/api/mcp/stream` with the resolved
 *                           Bearer token. Default false — keeps opencode.json
 *                           in control unless explicitly opted in.
 *  - `mcpToken`             Optional separate Bearer token to use in the
 *                           auto-emitted MCP entry. Falls back to the
 *                           provider's API key (from auth.json) when unset.
 *                           Useful when a narrower-scoped MCP-only key is
 *                           preferred over the chat/inference key.
 *  - `fetchInterceptor`     Inject Authorization: Bearer + Content-Type on
 *                           every outbound request to baseURL. Default true.
 *  - `debugLog`             Capture every outbound request + response to a
 *                           JSONL file at
 *                           `~/.local/share/opencode/plugins/omniroute-debug-{providerId}.jsonl`.
 *                           Each line: `{ reqId, ts, url, method, reqBody,
 *                           resStatus, resBody, durationMs }`.
 *                           Default false. Opt-in.
 *  - `apiFormat`            Per-provider-prefix API format routing. Model IDs
 *                           whose prefix (the part before `/`) matches an entry
 *                           in `anthropicPrefixes` are served via the Anthropic
 *                           SDK (`@ai-sdk/anthropic`, sends to `/v1/messages`
 *                           with native cache_control, tool_choice, etc.).
 *                           All other models fall back to `openai-compatible`.
 *
 *                           Default `anthropicPrefixes`:
 *                             ["cc", "claude", "anthropic", "kiro", "kr"]
 *                           (covers OmniRoute's canonical Anthropic aliases).
 *
 *                           Set `anthropicPrefixes: []` to disable and force
 *                           everything through OpenAI-compat.
 *
 *                           Example:
 *                           ```json
 *                           "apiFormat": { "anthropicPrefixes": ["cc","claude","anthropic","kiro"] }
 *                           ```
 */
const apiFormatSchema = z
  .object({
    anthropicPrefixes: z.array(z.string()).optional(),
  })
  .strict()
  .optional();

const featuresSchema = z
  .object({
    combos: z.boolean().optional(),
    autoCombos: z.boolean().optional(),
    enrichment: z.boolean().optional(),
    compressionMetadata: z.boolean().optional(),
    geminiSanitization: z.boolean().optional(),
    mcpAutoEmit: z.boolean().optional(),
    mcpToken: z.string().min(1).optional(),
    fetchInterceptor: z.boolean().optional(),
    usableOnly: z.boolean().optional(),
    diskCache: z.boolean().optional(),
    providerTag: z.boolean().optional(),
    debugLog: z.boolean().optional(),
    startupDebug: z.boolean().optional(),
    logLevel: z.enum(["error", "warn", "info", "debug"]).optional(),
    apiFormat: apiFormatSchema,
  })
  .strict();

const optionsSchema = z
  .object({
    providerId: z
      .string()
      .min(1)
      .regex(/^[a-z0-9-]+$/i, "providerId must be a slug")
      .optional(),
    displayName: z.string().min(1).optional(),
    modelCacheTtl: z.number().positive().optional(),
    baseURL: z.string().url().optional(),
    features: featuresSchema.optional(),
  })
  .strict();

/**
 * Plugin options shape — inferred directly from the Zod schema so the
 * validator and the static type can never drift. Replaces the standalone
 * interface previously declared here (T-02). Every consumer continues to
 * import `OmniRoutePluginOptions` as before; only the source of truth
 * shifted from a hand-written interface to `z.infer<typeof optionsSchema>`.
 */
export type OmniRoutePluginOptions = z.infer<typeof optionsSchema>;

export const OMNIROUTE_PROVIDER_KEY = "omniroute" as const;

/** Deployed plugin version (injected at build time by tsup define). */
export const PLUGIN_VERSION: string =
  ((globalThis as Record<string, unknown>).__PLUGIN_VERSION__ as string) ?? "dev";

/** Deployed plugin git commit hash (injected at build time by tsup define). */
export const PLUGIN_GIT_HASH: string =
  ((globalThis as Record<string, unknown>).__PLUGIN_GIT_HASH__ as string) ?? "unknown";

export const DEFAULT_MODEL_CACHE_TTL_MS = 300_000 as const;

// Manual trim helpers avoid polynomial-regex CodeQL warnings on
// user-supplied baseURL strings (string.replace(/\/+$/, "")). The same
// behaviour, no backtracking.
function trimTrailingSlashes(value: string): string {
  let i = value.length;
  while (i > 0 && value.charCodeAt(i - 1) === 0x2f /* "/" */) i--;
  return i === value.length ? value : value.slice(0, i);
}

function trimTrailingDashes(value: string): string {
  let i = value.length;
  while (i > 0 && value.charCodeAt(i - 1) === 0x2d /* "-" */) i--;
  return i === value.length ? value : value.slice(0, i);
}
function trimLeadingDashes(value: string): string {
  let i = 0;
  while (i < value.length && value.charCodeAt(i) === 0x2d /* "-" */) i++;
  return i === 0 ? value : value.slice(i);
}

/**
 * Resolve effective options from the optional plugin-options object,
 * applying defaults. Centralises the providerId fallback so every hook
 * sees a consistent identifier.
 */
export function resolveOmniRoutePluginOptions(
  opts?: OmniRoutePluginOptions
): Required<Pick<OmniRoutePluginOptions, "providerId" | "displayName" | "modelCacheTtl">> &
  Pick<OmniRoutePluginOptions, "baseURL" | "features"> {
  const providerId = opts?.providerId ?? OMNIROUTE_PROVIDER_KEY;
  const displayName =
    opts?.displayName ??
    (providerId === OMNIROUTE_PROVIDER_KEY ? "OmniRoute" : `OmniRoute (${providerId})`);
  const modelCacheTtl =
    typeof opts?.modelCacheTtl === "number" && opts.modelCacheTtl > 0
      ? opts.modelCacheTtl
      : DEFAULT_MODEL_CACHE_TTL_MS;
  return {
    providerId,
    displayName,
    modelCacheTtl,
    baseURL: opts?.baseURL,
    features: opts?.features,
  };
}

/**
 * Strict parse of raw plugin options (as received from opencode.json or a
 * direct factory call) into the validated `OmniRoutePluginOptions` shape.
 *
 *   - `null` / `undefined` → `{}` (no opts is valid, defaults take over).
 *   - Unknown keys → throws (strict schema catches typos in opencode.json).
 *   - Empty / malformed values (e.g. empty providerId, non-URL baseURL,
 *     negative modelCacheTtl) → throws.
 *
 * Validation happens at plugin invocation time (inside `OmniRoutePlugin`),
 * NOT at module import — so a bad opencode.json fails the affected plugin
 * instance with an actionable message instead of crashing the whole TUI on
 * startup.
 *
 * Exported so callers and tests can validate options independent of the
 * full plugin factory invocation.
 */
export function parseOmniRoutePluginOptions(opts: unknown): OmniRoutePluginOptions {
  if (opts === null || opts === undefined) return {};
  const result = optionsSchema.safeParse(opts);
  if (!result.success) {
    const errs = result.error.issues
      .map((i) => {
        const path = i.path.length > 0 ? i.path.join(".") : "<root>";
        return `${path}: ${i.message}`;
      })
      .join("; ");
    throw new Error(`Invalid @omniroute/opencode-plugin options: ${errs}`);
  }
  return result.data;
}

/**
 * Internal coercion shim. Delegates to `parseOmniRoutePluginOptions` to keep
 * the public surface stable while routing all validation through the Zod
 * schema. Always returns an object (never undefined) so downstream hooks see
 * the same shape regardless of whether opencode.json passed `null`,
 * `undefined`, or an empty bag.
 */
function coercePluginOptions(opts?: PluginOptions): OmniRoutePluginOptions {
  return parseOmniRoutePluginOptions(opts);
}

// ────────────────────────────────────────────────────────────────────────────
// Per-prefix API format routing (apiFormat feature)
// ────────────────────────────────────────────────────────────────────────────

/**
 * Default provider-prefix list that triggers the Anthropic SDK format.
 * Covers OmniRoute's canonical Anthropic aliases: `cc/`, `claude/`,
 * `anthropic/`, plus the user-configured `kiro/` and `kr/` upstream
 * connections that proxy Anthropic models.
 */
export const DEFAULT_ANTHROPIC_PREFIXES = ["cc", "claude", "anthropic", "kiro", "kr"];

/**
 * Ensure a baseURL ends with `/v1` so the OpenAI-compat SDK constructs
 * `/v1/chat/completions` correctly. The Anthropic SDK does NOT want `/v1`
 * (it appends `/v1/messages` automatically), so callers should branch on
 * format first.
 */
export function ensureV1Suffix(url: string): string {
  const trimmed = trimTrailingSlashes(url);
  return trimmed.endsWith("/v1") ? trimmed : `${trimmed}/v1`;
}

/**
 * Resolve the API block (id + url + npm package) for a given model id.
 *
 * Decision matrix:
 * - If the model id's prefix (the substring before the first `/`) is in
 *   `apiFormat.anthropicPrefixes` (or the default list), return the
 *   Anthropic SDK block: `id: "anthropic"`, `url: baseURL` (no `/v1`),
 *   `npm: "@ai-sdk/anthropic"`.
 * - Otherwise return the OpenAI-compat block: `id: "openai-compatible"`,
 *   `url: baseURL + "/v1"`, `npm: "@ai-sdk/openai-compatible"`.
 *
 * Combos span multiple providers. Callers should pass each combo member's
 * id through this function and pick the LCD format (lowest common
 * denominator that every upstream actually understands).
 */
export function resolveApiBlock(
  modelId: string,
  baseURL: string,
  apiFormat?: { anthropicPrefixes?: string[] }
): { id: string; url: string; npm: string } {
  const prefixes = apiFormat?.anthropicPrefixes ?? DEFAULT_ANTHROPIC_PREFIXES;
  const slash = modelId.indexOf("/");
  const prefix = slash === -1 ? modelId : modelId.slice(0, slash);
  const isAnthropic = prefixes.includes(prefix);
  return isAnthropic
    ? {
        id: "anthropic",
        url: trimTrailingSlashes(baseURL),
        npm: "@ai-sdk/anthropic",
      }
    : {
        id: "openai-compatible",
        url: ensureV1Suffix(baseURL),
        npm: "@ai-sdk/openai-compatible",
      };
}

/**
 * Build the AuthHook portion of the plugin for a given options bag. Exported
 * standalone so the auth contract can be unit-tested without faking the full
 * PluginInput / Hooks surface.
 *
 * Contract notes:
 *   - `provider` binds to `providerId` (NOT a hardcoded module constant — fixes
 *     the multi-instance bug in opencode-omniroute-auth@1.2.1 which pinned
 *     `OMNIROUTE_PROVIDER_ID = "omniroute"` at module scope).
 *   - `methods[0]` is the `api` flavor (no OAuth flow; OmniRoute issues bearer
 *     keys directly). Label includes the resolved displayName so multi-instance
 *     setups stay distinguishable in the OC TUI.
 *   - `methods[0].prompts` uses the official `{type:"text", key, message}`
 *     shape from `@opencode-ai/plugin@1.15.6`. The contract does NOT expose
 *     a `mask: true` flag on text prompts — the OC TUI is expected to handle
 *     credential masking by itself (per OC's `auth login` UX).
 *   - `loader` reads the stored credentials via `getAuth()` and projects them
 *     into the AI-SDK `openai-compatible` options shape (`apiKey`, `baseURL`).
 *     The fetch interceptor (`fetch`) is wired in T-04; left absent here so
 *     downstream code falls back to the SDK default fetch.
 *   - The loader rejects non-`api` auth flavors (oauth / wellknown) and empty
 *     keys by returning `{}` — OC then surfaces the `/connect` flow to the
 *     user instead of dispatching a request with bogus credentials.
 */
export function createOmniRouteAuthHook(opts?: OmniRoutePluginOptions): AuthHook {
  const { providerId, displayName, baseURL, features } = resolveOmniRoutePluginOptions(opts);
  // Both fetch-layer features default ON (parity with the rest of the plugin's
  // `features.X !== false` convention). Honoring them here lets users disable
  // the interceptor/sanitizer from opencode.json — previously these flags were
  // documented and schema-validated but silently ignored.
  const wantFetchInterceptor = (features ?? {}).fetchInterceptor !== false;
  const wantGeminiSanitization = (features ?? {}).geminiSanitization !== false;
  const wantDebugLog = (features ?? {}).debugLog === true;

  const hook: AuthHook = {
    provider: providerId,
    methods: [
      {
        type: "api",
        label: `${displayName} API Key`,
        prompts: [
          {
            type: "text",
            key: "apiKey",
            message: `OmniRoute API key (${providerId})`,
          },
        ],
      },
    ],
    loader: async (getAuth, _provider) => {
      const auth = await getAuth();
      if (
        auth &&
        typeof auth === "object" &&
        (auth as { type?: unknown }).type === "api" &&
        typeof (auth as { key?: unknown }).key === "string" &&
        (auth as { key: string }).key.length > 0
      ) {
        const apiKey = (auth as { key: string }).key;
        // baseURL resolution: plugin opts win, then a credential-attached
        // baseURL (some auth backends stash it alongside the key), else empty.
        // Re-cast through `unknown` first: Auth is a discriminated union
        // (api | oauth | wellknown) and TS refuses a direct narrowing to a
        // hypothetical `{ baseURL: string }` shape because WellKnownAuth has
        // no `baseURL`. We've already checked the runtime type via typeof so
        // the unknown-bridge is a safe assertion, not a lie.
        const authBaseURL = (auth as unknown as { baseURL?: unknown }).baseURL;
        const resolvedBaseURL = baseURL ?? (typeof authBaseURL === "string" ? authBaseURL : "");
        // Without a baseURL the interceptor can't tell which requests to
        // intercept (it would either gate-keep nothing or, worse, all
        // outbound traffic). Fall back to apiKey-only and let the SDK use
        // its default fetch. The /connect flow + plugin opts should make
        // this branch unreachable in practice.
        if (!resolvedBaseURL) {
          return { apiKey };
        }
        // Composition: sanitise Gemini tool schemas FIRST (T-06), then inject
        // Bearer (T-04). Both layers are pure with respect to the other's
        // concern (body vs headers) so order is logically free; wrapping the
        // pure body-transform around the header-injecting interceptor reads
        // cleaner and keeps T-06 testable in isolation against any inner fetch
        // (real or stub). Each layer is gated by its feature flag; when both
        // are disabled we fall back to the SDK's default fetch (apiKey only).
        let composedFetch: typeof fetch | undefined;
        if (wantFetchInterceptor) {
          composedFetch = createOmniRouteFetchInterceptor({
            apiKey,
            baseURL: resolvedBaseURL,
          });
        }
        if (wantGeminiSanitization) {
          composedFetch = createGeminiSanitizingFetch(composedFetch ?? fetch);
        }
        if (wantDebugLog || debugLogEnabled(providerId)) {
          composedFetch = createDebugLoggingFetch(composedFetch ?? fetch, providerId, wantDebugLog);
        }
        return composedFetch
          ? { apiKey, baseURL: resolvedBaseURL, fetch: composedFetch }
          : { apiKey, baseURL: resolvedBaseURL };
      }
      return {};
    },
  };

  return hook;
}

/**
 * Plugin factory. Returns the OpenCode Plugin object wired with the three
 * hooks. Concrete hook bodies land in subsequent tickets (T-03 provider.models,
 * T-04 fetch interceptor, T-06 Gemini sanitization, T-07 config backward-compat).
 *
 * Per `@opencode-ai/plugin@1.15.6`, the Plugin signature is
 * `(input: PluginInput, options?: PluginOptions) => Promise<Hooks>` — opts
 * arrive as the SECOND argument (from the `[name, opts]` tuple in
 * opencode.json), NOT as a closure binding. Multi-instance support follows
 * from each plugin tuple invoking the factory with its own opts.
 */
export const OmniRoutePlugin: Plugin = async (_input, options) => {
  const resolved = coercePluginOptions(options);
  // T-07: a single per-plugin-instance cache shared between the provider
  // hook (T-03/T-05) and the config-shim hook (T-07). On OC ≥1.14.49 both
  // hooks fire within the same Plugin invocation, so a shared cache keeps
  // /v1/models + /api/combos at exactly one round-trip per TTL refresh
  // instead of two. On OC ≤1.14.48 only the config hook runs; the cache
  // still works (single producer + single consumer through the same map).
  // Each `OmniRoutePlugin(...)` invocation gets its OWN cache via closure,
  // so prod + preprod side-by-side instances do NOT collide.
  const sharedCache: OmniRouteFetchCache = new Map();
  // Debug breadcrumb: confirm server() invocation + resolved options.
  // Useful when diagnosing "is the plugin even running" from OC logs.
  const _ver: string =
    ((globalThis as Record<string, unknown>).__PLUGIN_VERSION__ as string) ?? "dev";
  const _hash: string =
    ((globalThis as Record<string, unknown>).__PLUGIN_GIT_HASH__ as string) ?? "unknown";
  const _prefixes = resolved.features?.apiFormat?.anthropicPrefixes ?? DEFAULT_ANTHROPIC_PREFIXES;
  _logger.always(
    `v${_ver} (${_hash}) initialized` +
      ` providerId=${resolved.providerId}` +
      ` baseURL=${resolved.baseURL ?? "(from auth.json)"}` +
      ` modelCacheTtl=${resolved.modelCacheTtl}ms` +
      ` apiFormat=anthropic:[${_prefixes.join(",")}]` +
      ` debugLog=${resolved.features?.debugLog ?? false}` +
      ` logLevel=${resolved.features?.startupDebug ? "debug" : (resolved.features?.logLevel ?? "warn")}`
  );

  // Wire log level: startupDebug:true → "debug", explicit logLevel wins.
  setLogLevel(resolved.features?.startupDebug ? "debug" : (resolved.features?.logLevel ?? "warn"));
  return {
    auth: createOmniRouteAuthHook(resolved),
    provider: createOmniRouteProviderHook(resolved, { cache: sharedCache }),
    config: createOmniRouteConfigHook(resolved, { cache: sharedCache }),
  };
};

/**
 * v1 plugin shape per OC plugin loader (`packages/opencode/src/plugin/shared.ts:readV1Plugin`).
 * OC checks the default export for an object with `{id, server}` shape FIRST.
 * If that fails it falls back to legacy `getLegacyPlugins` which walks every
 * named export and rejects any non-function value — our package has
 * constants (OMNIROUTE_PROVIDER_KEY, DEFAULT_MODEL_CACHE_TTL_MS) + types +
 * schemas as named exports, so the legacy path always fails for us.
 *
 * Using v1 shape skips the legacy walk entirely. The `id` field is the
 * plugin MODULE identifier (one per published package); per-instance
 * `providerId` still flows through `options.providerId` as before.
 */
const OmniRouteV1Plugin = {
  id: "@omniroute/opencode-plugin",
  server: OmniRoutePlugin,
};

export default OmniRouteV1Plugin;

// ────────────────────────────────────────────────────────────────────────────
// Provider hook (T-03) — /v1/models pass-through with TTL cache
// ────────────────────────────────────────────────────────────────────────────

/**
 * Raw shape of a `/v1/models` entry from OmniRoute. Captured verbatim from
 * the prod gateway response (sample at /tmp/prod-v1-models.json: 455 entries).
 * STRICT source-of-truth (OQ-3): every field that lands in ModelV2 traces
 * back to this shape — no client-side variant synthesis.
 */
export interface OmniRouteRawModelEntry {
  id: string;
  object?: string;
  owned_by?: string;
  root?: string | null;
  parent?: string | null;
  context_length?: number;
  max_input_tokens?: number;
  max_output_tokens?: number;
  input_modalities?: string[];
  output_modalities?: string[];
  capabilities?: {
    tool_calling?: boolean;
    reasoning?: boolean;
    vision?: boolean;
    thinking?: boolean;
    attachment?: boolean;
    structured_output?: boolean;
    temperature?: boolean;
  };
  release_date?: string;
  last_updated?: string;
  api_format?: string;
}

/**
 * Fetcher contract: returns the raw `/v1/models` entry list from a running
 * OmniRoute instance. Surfaced as a dependency so unit tests can inject a
 * stub without monkey-patching global `fetch`.
 *
 * Why we inline this instead of using `@omniroute/opencode-provider`'s
 * `fetchLiveModels`: the sibling helper returns a stripped `{id, name,
 * contextLength?}` shape (see opencode-provider/src/index.ts:480-569) that
 * drops the `capabilities` / `*_modalities` / `max_*_tokens` blocks T-03
 * needs for ModelV2 pass-through. Adopting the sibling here would force a
 * client-side re-fetch or re-introduce the synthesis we explicitly rejected
 * in OQ-3. A 30-line raw fetcher is cheaper than mutating the sibling's
 * stable v0.1.0 contract.
 */
export type OmniRouteModelsFetcher = (
  baseURL: string,
  apiKey: string,
  timeoutMs?: number
) => Promise<OmniRouteRawModelEntry[]>;

/**
 * Default fetcher: `GET <baseURL>/v1/models` with bearer auth + AbortController
 * timeout. Accepts both the `{object:"list", data:[…]}` envelope OmniRoute
 * emits today and a bare-array envelope (defensive — keeps the plugin
 * working if a future OmniRoute build trims the wrapper). Anything that
 * isn't an object with a string `id` is filtered out silently.
 */
export const defaultOmniRouteModelsFetcher: OmniRouteModelsFetcher = async (
  baseURL,
  apiKey,
  timeoutMs = 10_000
) => {
  if (!apiKey) throw new Error("@omniroute/opencode-plugin: apiKey required to fetch /v1/models");
  if (!baseURL) throw new Error("@omniroute/opencode-plugin: baseURL required to fetch /v1/models");

  const trimmed = trimTrailingSlashes(baseURL);
  // Tolerate both `https://host` and `https://host/v1` forms — the gateway
  // exposes /v1/models either way; we just don't want a double `/v1/v1`.
  const url = /\/v\d+$/.test(trimmed) ? `${trimmed}/models` : `${trimmed}/v1/models`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(
        `@omniroute/opencode-plugin: GET ${url} failed: ${res.status} ${res.statusText}`
      );
    }
    const body = (await res.json()) as unknown;
    const rawList: unknown[] = Array.isArray(body)
      ? body
      : body && typeof body === "object" && Array.isArray((body as { data?: unknown }).data)
        ? ((body as { data: unknown[] }).data as unknown[])
        : [];
    const out: OmniRouteRawModelEntry[] = [];
    for (const r of rawList) {
      if (r && typeof r === "object" && typeof (r as { id?: unknown }).id === "string") {
        out.push(r as OmniRouteRawModelEntry);
      }
    }
    return out;
  } finally {
    clearTimeout(timer);
  }
};

/**
 * Map a raw `/v1/models` entry → `ModelV2` (the type @opencode-ai/sdk/v2
 * exports as `Model`, re-exported by @opencode-ai/plugin as `ModelV2`).
 *
 * ModelV2 (as of @opencode-ai/sdk@v2 — see node_modules path
 * `@opencode-ai/sdk/dist/v2/gen/types.gen.d.ts:964-1043`) requires a much
 * richer shape than the T-03 spec's mapping table assumed. Concretely it
 * expects:
 *   - flat `id`, `name`, `providerID`, `api: {id,url,npm}`
 *   - nested `capabilities: { temperature, reasoning, attachment, toolcall,
 *     input:{text,audio,image,video,pdf}, output:{…}, interleaved }`
 *   - `cost: { input, output, cache:{read,write} }` (NOT optional)
 *   - `limit: { context, input?, output }`
 *   - `status: "alpha"|"beta"|"deprecated"|"active"`, `options:{}`, `headers:{}`
 *   - `release_date: string`
 *
 * Deviations from the T-03 spec (documented per ticket §2 "CRITICAL: Check
 * the actual ModelV2 type and adapt if field names differ"):
 *   1. Spec's flat `tool_call` / `reasoning` / `attachment` / `modalities`
 *      top-level fields don't exist in ModelV2 — folded into
 *      `capabilities.{toolcall, reasoning, attachment, input.*, output.*}`.
 *   2. `cost: undefined` is illegal (cost is required). OmniRoute doesn't
 *      surface pricing on /v1/models, so we emit a zeroed cost block.
 *      Downstream OC reads this for display only — the live pricing is
 *      OmniRoute's responsibility at routing time.
 *   3. `tool_call` (spec) → `toolcall` (ModelV2 field name; one word).
 *   4. `attachment` (spec) maps from `capabilities.vision` per OmniRoute
 *      convention: vision = ability to receive image attachments. If the
 *      raw entry happens to expose an explicit `capabilities.attachment`
 *      (some combo entries do), that wins.
 *   5. `thinking` from OmniRoute has no 1:1 ModelV2 slot. We OR it into
 *      `reasoning` so thinking-only models still surface a non-false
 *      reasoning flag.
 *   6. `last_updated` from OmniRoute has no ModelV2 slot — dropped (the
 *      spec also flagged this as "may not exist", and the prod sample
 *      confirms it's optional). `release_date` lands in ModelV2.release_date
 *      with `""` fallback (the field is required as `string`).
 *   7. `temperature: true` per OmniRoute convention (OpenAI-compat mode
 *      always supports the temperature knob). If a raw entry sets
 *      `capabilities.temperature` explicitly, that wins.
 *   8. Input/output modality arrays: each known modality flips its boolean.
 *      Unknown strings (future OmniRoute additions) are ignored — when the
 *      server adds new modalities we can map them here without breaking
 *      existing entries.
 *   9. `status: "active"` — OmniRoute doesn't tier models alpha/beta on
 *      /v1/models, and OC needs a non-deprecated status to expose the
 *      model in the picker. If a future entry surfaces an explicit
 *      lifecycle hint we can map it then.
 *  10. `options: {}` and `headers: {}` left empty — they're escape hatches
 *      for OC users to attach per-model overrides; the provider plugin
 *      must not preempt them.
 *  11. `limit.input` is OPTIONAL on ModelV2 (the `?` modifier). We only
 *      emit it when OmniRoute supplies `max_input_tokens` — keeps the
 *      shape clean for combo entries that only carry context_length.
 */

export function mapRawModelToModelV2(
  raw: OmniRouteRawModelEntry,
  ctx: { providerId: string; baseURL: string; apiFormat?: { anthropicPrefixes?: string[] } }
): ModelV2 {
  const caps = raw.capabilities ?? {};
  const inMods = new Set(raw.input_modalities ?? ["text"]);
  const outMods = new Set(raw.output_modalities ?? ["text"]);

  return {
    id: raw.id,
    /**
     * Display name. Falls back to raw.id when no enrichment is available;
     * the caller (`createOmniRouteProviderHook`) overlays
     * `/api/pricing/models` data via `applyEnrichment` when
     * `features.enrichment` is true.
     */
    name: _normaliseFreeLabel(raw.id),
    capabilities: {
      temperature: caps.temperature ?? true,
      reasoning: Boolean(caps.reasoning || caps.thinking),
      attachment: Boolean(caps.attachment ?? caps.vision ?? false),
      toolcall: Boolean(caps.tool_calling ?? false),
      input: {
        text: inMods.has("text"),
        audio: inMods.has("audio"),
        image: inMods.has("image"),
        video: inMods.has("video"),
        pdf: inMods.has("pdf"),
      },
      output: {
        text: outMods.has("text"),
        audio: outMods.has("audio"),
        image: outMods.has("image"),
        video: outMods.has("video"),
        pdf: outMods.has("pdf"),
      },
      interleaved: Boolean(caps.thinking),
    },
    cost: {
      input: 0,
      output: 0,
      cache: { read: 0, write: 0 },
    },
    limit: {
      context: typeof raw.context_length === "number" ? raw.context_length : 0,
      ...(typeof raw.max_input_tokens === "number" ? { input: raw.max_input_tokens } : {}),
      output: typeof raw.max_output_tokens === "number" ? raw.max_output_tokens : 0,
    },
    status: "active",
    options: {},
    headers: {},
    release_date: raw.release_date ?? "",
    providerID: ctx.providerId,
    api: resolveApiBlock(raw.id, ctx.baseURL, ctx.apiFormat),
  };
}

// ────────────────────────────────────────────────────────────────────────────
// Combo discovery (T-05) — /api/combos pass-through with LCD capability roll-up
// ────────────────────────────────────────────────────────────────────────────

/**
 * Raw shape of a single combo entry as returned by OmniRoute's `/api/combos`.
 *
 * Schema established via a live probe against
 * an OmniRoute `/api/combos` endpoint with a management-scoped key
 * (response saved at /tmp/t05-combos.json) cross-referenced against the
 * source-of-truth in this repo:
 *
 *   - `src/app/api/combos/route.ts` GET handler — emits `{combos: [...]}`
 *     envelope after `getCombos()`.
 *   - `src/lib/db/combos.ts` `getCombos()` — returns rows persisted via
 *     `createCombo` / `updateCombo`, each shaped by `normalizeStoredCombo`.
 *   - `src/lib/combos/steps.ts` `ComboModelStep` + `ComboRefStep` — define
 *     the `models[]` array entry shape (a step references a member model
 *     by its full provider-prefixed id, e.g. `"claude-opus-4-5-thinking"`).
 *
 * Note: the preprod gateway returned `{combos: []}` at probe time (no combos
 * provisioned). The defensive parser accepts both `{combos:[...]}` and a
 * bare array envelope so the plugin keeps working if a future OmniRoute
 * build trims the wrapper (mirrors the same pattern in the sibling
 * `@omniroute/opencode-provider#listCombos`).
 *
 * STRICT source-of-truth (OQ-3, per T-03): every ModelV2 field a combo
 * surfaces traces back to either (a) this raw combo entry or (b) the LCD
 * roll-up across its raw member models. No client-side variant synthesis.
 */
export interface OmniRouteRawComboMemberRef {
  /** Step kind: "model" references a raw model id; "combo-ref" nests another combo. */
  kind?: "model" | "combo-ref";
  /** Full model id referenced by this step (when kind === "model"). */
  model?: string;
  /** Nested combo name (when kind === "combo-ref"). */
  comboName?: string;
  /** Routing weight inside the combo (0–100, advisory at LCD time). */
  weight?: number;
  /** Step-local label, distinct from the parent combo's display name. */
  label?: string;
}

export interface OmniRouteRawCombo {
  id: string;
  name?: string;
  /** Routing strategy. Surfaced for forward-compat but not consumed by LCD. */
  strategy?: string;
  /** Member step list. Only `kind: "model"` steps participate in LCD. */
  models?: OmniRouteRawComboMemberRef[];
  /** Hidden combos are excluded from the OC model picker. */
  isHidden?: boolean;
  /** When OmniRoute attaches a lifecycle hint we forward it; today it doesn't. */
  release_date?: string;
}

/**
 * Fetcher contract for `/api/combos`. Same DI shape as
 * `OmniRouteModelsFetcher` so unit tests can inject a stub instead of
 * monkey-patching global `fetch`.
 */
export type OmniRouteCombosFetcher = (
  baseURL: string,
  apiKey: string,
  timeoutMs?: number
) => Promise<OmniRouteRawCombo[]>;

/**
 * Default fetcher: `GET <baseURL>/api/combos` with bearer auth +
 * AbortController timeout. Accepts both the `{combos: [...]}` envelope the
 * gateway emits today and a bare-array envelope (defensive — keeps the
 * plugin working if a future OmniRoute build trims the wrapper).
 *
 * Differences from `defaultOmniRouteModelsFetcher`:
 *   - URL is `/api/combos`, NOT `/v1/combos`. The `/v1/...` namespace is the
 *     OpenAI-compatible surface (chat completions, models); combo discovery
 *     lives on the management plane under `/api/...`. We tolerate both
 *     `https://host` and `https://host/v1` baseURL forms by stripping the
 *     trailing `/v1` segment before appending `/api/combos`.
 *   - Combos endpoint requires a management-scoped API key when
 *     `REQUIRE_API_KEY` is enabled. We don't enforce that here; the
 *     gateway returns 401/403 with an actionable error which we propagate.
 *
 * Anything that isn't an object with a string `id` is filtered out silently.
 */
export const defaultOmniRouteCombosFetcher: OmniRouteCombosFetcher = async (
  baseURL,
  apiKey,
  timeoutMs = 10_000
) => {
  if (!apiKey) throw new Error("@omniroute/opencode-plugin: apiKey required to fetch /api/combos");
  if (!baseURL)
    throw new Error("@omniroute/opencode-plugin: baseURL required to fetch /api/combos");

  // Strip trailing slashes, then strip a trailing `/v1` so we land on the
  // management plane. Models live under `/v1/models`; combos live under
  // `/api/combos` from the same gateway root.
  const trimmed = trimTrailingSlashes(baseURL);
  const root = trimmed.replace(/\/v\d+$/, "");
  const url = `${root}/api/combos`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(
        `@omniroute/opencode-plugin: GET ${url} failed: ${res.status} ${res.statusText}`
      );
    }
    const body = (await res.json()) as unknown;
    const rawList: unknown[] = Array.isArray(body)
      ? body
      : body && typeof body === "object" && Array.isArray((body as { combos?: unknown }).combos)
        ? ((body as { combos: unknown[] }).combos as unknown[])
        : [];
    const out: OmniRouteRawCombo[] = [];
    for (const r of rawList) {
      if (r && typeof r === "object" && typeof (r as { id?: unknown }).id === "string") {
        out.push(r as OmniRouteRawCombo);
      }
    }
    return out;
  } finally {
    clearTimeout(timer);
  }
};

/**
 * Map a raw combo entry → `ModelV2` by computing the lowest-common-denominator
 * (LCD) of its underlying member models. The LCD policy is the only way to
 * surface a single capability vector to OpenCode without lying: if any member
 * lacks a capability, the combo as a whole cannot guarantee it.
 *
 * LCD rules:
 *   - `limit.context` = `min(...members.context_length)`.
 *   - `limit.output` = `min(...members.max_output_tokens)`.
 *   - `limit.input` = `min(...members.max_input_tokens)` ONLY when every
 *     member declares one (ModelV2.limit.input is optional — better to
 *     omit than to fabricate a min over partial data).
 *   - `capabilities.toolcall` / `reasoning` / `attachment` / `temperature`:
 *     `every(member ⇒ supports?)`. The `reasoning` axis ORs across
 *     `reasoning` and `thinking` per member before AND-ing across the
 *     combo (mirrors `mapRawModelToModelV2`). The `attachment` axis ORs
 *     across `attachment` and `vision` per member. The `temperature` axis
 *     uses default-true semantics: a member supports temperature unless
 *     it explicitly declares `temperature: false`.
 *   - `capabilities.input.*` / `output.*`: flattened AND across members'
 *     modality flags. Missing arrays default to `["text"]` (same default
 *     as `mapRawModelToModelV2`).
 *
 * Defensive: empty members array → ALL capabilities `false`, limits zero.
 * That's an intentional safety posture (you can't route through an empty
 * combo, so OC should grey it out in the picker).
 *
 * Spec mapping (T-05 §Scope.3): `cost` zeroed; `status = "active"`;
 * `release_date = combo.release_date ?? ""`; `api.id = "openai-compatible"`;
 * `name = combo.name ?? combo.id`.
 *
 * @param combo Raw `/api/combos` entry.
 * @param members Raw `/v1/models` entries for THIS combo's member ids.
 *                Caller resolves `combo.models[].model` ids; unknown ids
 *                are silently dropped before this call.
 * @param providerId OpenCode provider id (multi-instance aware).
 * @param baseURL Resolved gateway base URL for ModelV2.api.url.
 */
export function mapComboToModelV2(
  combo: OmniRouteRawCombo,
  members: OmniRouteRawModelEntry[],
  providerId: string,
  baseURL: string,
  apiFormat?: { anthropicPrefixes?: string[] }
): ModelV2 {
  // `every` over an empty array returns true (would lie about an empty
  // combo's capabilities) — short-circuit to all-false when no members.
  const hasMembers = members.length > 0;

  const memberInMods = members.map((m) => new Set(m.input_modalities ?? ["text"]));
  const memberOutMods = members.map((m) => new Set(m.output_modalities ?? ["text"]));

  const modalityAllHave = (sets: Array<Set<string>>, key: string): boolean =>
    hasMembers && sets.every((s) => s.has(key));

  const contextValues = members
    .map((m) => m.context_length)
    .filter((v): v is number => typeof v === "number" && v > 0);
  const outputValues = members
    .map((m) => m.max_output_tokens)
    .filter((v): v is number => typeof v === "number" && v > 0);
  const inputValues = members
    .map((m) => m.max_input_tokens)
    .filter((v): v is number => typeof v === "number" && v > 0);

  const everyDeclaresInput = hasMembers && inputValues.length === members.length;

  const capabilities: ModelV2["capabilities"] = {
    temperature:
      hasMembers && members.every((m) => (m.capabilities?.temperature ?? true) !== false),
    reasoning:
      hasMembers &&
      members.every((m) => Boolean(m.capabilities?.reasoning || m.capabilities?.thinking)),
    attachment:
      hasMembers &&
      members.every((m) => Boolean(m.capabilities?.attachment ?? m.capabilities?.vision ?? false)),
    toolcall: hasMembers && members.every((m) => Boolean(m.capabilities?.tool_calling ?? false)),
    input: {
      text: modalityAllHave(memberInMods, "text"),
      audio: modalityAllHave(memberInMods, "audio"),
      image: modalityAllHave(memberInMods, "image"),
      video: modalityAllHave(memberInMods, "video"),
      pdf: modalityAllHave(memberInMods, "pdf"),
    },
    output: {
      text: modalityAllHave(memberOutMods, "text"),
      audio: modalityAllHave(memberOutMods, "audio"),
      image: modalityAllHave(memberOutMods, "image"),
      video: modalityAllHave(memberOutMods, "video"),
      pdf: modalityAllHave(memberOutMods, "pdf"),
    },
    interleaved: hasMembers && members.every((m) => Boolean(m.capabilities?.thinking)),
  };

  // Combos span multiple providers. Use Anthropic format only when ALL
  // members resolve to Anthropic — otherwise fall back to OpenAI-compat
  // (lowest common denominator that every upstream understands).
  const comboApiBlock = (() => {
    if (!hasMembers) return resolveApiBlock("", baseURL, apiFormat);
    const allAnthropic = members.every(
      (m) => resolveApiBlock(m.id, baseURL, apiFormat).id === "anthropic"
    );
    return allAnthropic
      ? resolveApiBlock(members[0].id, baseURL, apiFormat)
      : {
          id: "openai-compatible",
          url: ensureV1Suffix(baseURL),
          npm: "@ai-sdk/openai-compatible",
        };
  })();

  return {
    id: combo.id,
    providerID: providerId,
    api: comboApiBlock,
    name: combo.name && combo.name.trim().length > 0 ? combo.name : combo.id,
    capabilities,
    cost: {
      input: 0,
      output: 0,
      cache: { read: 0, write: 0 },
    },
    limit: {
      context: contextValues.length > 0 ? Math.min(...contextValues) : 0,
      ...(everyDeclaresInput ? { input: Math.min(...inputValues) } : {}),
      output: outputValues.length > 0 ? Math.min(...outputValues) : 0,
    },
    status: "active",
    options: {},
    headers: {},
    release_date: combo.release_date ?? "",
  };
}

// ─────────────────────────────────────────────────────────────────────────
// AUTO COMBOS — virtual server-side combos exposed via /api/combos/auto
// ─────────────────────────────────────────────────────────────────────────

/**
 * Raw shape of an auto combo entry as returned by OmniRoute's
 * `/api/combos/auto` endpoint. Auto combos are virtual — they self-manage
 * provider selection via scoring/bandit exploration at runtime.
 */
export interface OmniRouteRawAutoCombo {
  /** Stable id (e.g. "auto", "auto/coding"). */
  id: string;
  /** Human-readable name (e.g. "Auto", "Auto Coding"). */
  name: string;
  /** Variant key or undefined for the default auto. */
  variant?: AutoVariant;
  /** Provider names eligible for this auto combo. */
  candidatePool?: string[];
  /** Number of candidates resolved at fetch time. */
  candidateCount?: number;
  /** MAX of candidates' context windows, served by newer OmniRoute builds.
   * Absent on older servers — mapper falls back to a safe positive default. */
  context_length?: number;
  /** MAX of candidates' max output tokens (same provenance as context_length). */
  max_output_tokens?: number;
  /** Whether this auto combo should be hidden from the picker. */
  isHidden?: boolean;
  /** Auto-combo configuration. */
  config?: {
    auto?: {
      candidatePool?: string[];
      explorationRate?: number;
      routerStrategy?: string;
    };
  };
}

/**
 * Fetcher contract for `/api/combos/auto`. Returns the list of virtual
 * auto combos the server can create. Same DI pattern as other fetchers.
 */
export type OmniRouteAutoCombosFetcher = (
  baseURL: string,
  apiKey: string,
  timeoutMs?: number
) => Promise<OmniRouteRawAutoCombo[]>;

/**
 * Default auto combos fetcher: `GET <baseURL>/api/combos/auto`.
 *
 * Fault-tolerant: returns empty array on 404 (endpoint doesn't exist yet)
 * or any non-2xx / network error. Logs a warning in those cases.
 */
export const defaultOmniRouteAutoCombosFetcher: OmniRouteAutoCombosFetcher = async (
  baseURL,
  apiKey,
  timeoutMs = 5_000
) => {
  if (!apiKey || !baseURL) return [];

  const trimmed = trimTrailingSlashes(baseURL);
  const root = trimmed.replace(/\/v\d+$/, "");
  const url = `${root}/api/combos/auto`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      signal: controller.signal,
    });
    // 404 = endpoint not deployed yet — expected during rollout
    if (res.status === 404) {
      console.warn(
        `[omniroute-plugin] /api/combos/auto not available (404) — auto combos disabled`
      );
      return [];
    }
    if (!res.ok) {
      console.warn(
        `[omniroute-plugin] /api/combos/auto failed: ${res.status} ${res.statusText} — auto combos disabled`
      );
      return [];
    }
    const body = (await res.json()) as unknown;
    const rawList: unknown[] = Array.isArray(body)
      ? body
      : body && typeof body === "object" && Array.isArray((body as { combos?: unknown }).combos)
        ? ((body as { combos: unknown[] }).combos as unknown[])
        : [];
    const out: OmniRouteRawAutoCombo[] = [];
    for (const r of rawList) {
      if (r && typeof r === "object" && typeof (r as { id?: unknown }).id === "string") {
        out.push(r as OmniRouteRawAutoCombo);
      }
    }
    return out;
  } catch (err) {
    // Network error, timeout, abort — all non-fatal
    console.warn(
      `[omniroute-plugin] /api/combos/auto fetch failed: ${err instanceof Error ? err.message : String(err)} — auto combos disabled`
    );
    return [];
  } finally {
    clearTimeout(timer);
  }
};

/** Fallbacks when the server does not advertise auto-combo limits (older
 * OmniRoute builds). MUST be positive: OpenCode's overflow guard treats
 * `limit.context === 0` as "never overflow" and silently DISABLES smart
 * auto-compaction, letting the session grow until the gateway's destructive
 * history purge kicks in (the "agent keeps forgetting things" bug). */
const AUTO_COMBO_FALLBACK_CONTEXT = 128_000;
const AUTO_COMBO_FALLBACK_OUTPUT = 8_192;

/**
 * Convert a raw auto combo into a static model entry for the OpenCode picker.
 * Auto combos have tool_call=true, reasoning=true by default (they route
 * to capable models). Context/output limits come from the server (MAX of
 * the candidate pool's windows — the gateway's context pre-filter routes
 * oversized requests to large-window candidates); a safe positive fallback
 * applies when the server omits them. Never 0.
 */
export function mapAutoComboToStaticEntry(
  autoCombo: OmniRouteRawAutoCombo
): OmniRouteStaticModelEntry {
  const variant = autoCombo.variant;
  const name = formatAutoComboName(variant, autoCombo.candidateCount);
  const context =
    typeof autoCombo.context_length === "number" && autoCombo.context_length > 0
      ? autoCombo.context_length
      : AUTO_COMBO_FALLBACK_CONTEXT;
  const output =
    typeof autoCombo.max_output_tokens === "number" && autoCombo.max_output_tokens > 0
      ? autoCombo.max_output_tokens
      : AUTO_COMBO_FALLBACK_OUTPUT;
  return {
    name,
    attachment: false,
    reasoning: true,
    temperature: true,
    tool_call: true,
    limit: { context, output },
    modalities: {
      input: ["text"],
      output: ["text"],
    },
    cost: { input: 0, output: 0, cache_read: 0, cache_write: 0 },
  };
}

// ─────────────────────────────────────────────────────────────────────────
// ENRICHMENT — pull display names + pricing from /api/pricing/models so
// the UI doesn't have to render raw model ids. Gated by features.enrichment.
// ─────────────────────────────────────────────────────────────────────────

/**
 * Per-model enrichment overlay derived from OmniRoute's
 * `/api/pricing/models` endpoint. The endpoint returns a per-provider
 * catalog with curated `name` strings (e.g. `Claude 4.7 Opus`,
 * `GPT 5.5 Pro`, `Gemini 3.1 Pro`) and per-million-token pricing
 * (`pricing.input`, `pricing.output`, `pricing.cacheRead`,
 * `pricing.cacheWrite`). These overlay the ModelV2 entries produced by
 * `mapRawModelToModelV2`.
 */
export interface OmniRouteEnrichmentEntry {
  /** Human-readable display name. Replaces ModelV2.name when present. */
  name?: string;
  /** Per-million-token cost overlay onto ModelV2.cost. */
  pricing?: {
    input?: number;
    output?: number;
    cacheRead?: number;
    cacheWrite?: number;
  };
  /**
   * Provider alias prefix seen in `/v1/models` ids (e.g. `cc`, `gemini-cli`).
   * Populated by `defaultOmniRouteEnrichmentFetcher` from
   * `/api/pricing/models` keys. Drives the `usableOnly` alias↔canonical
   * resolution.
   */
  providerAlias?: string;
  /**
   * Canonical provider id used by `/api/providers` connections (e.g.
   * `claude`, `gemini-cli`, `kiro`). Populated from the per-provider
   * `entry.id` field inside `/api/pricing/models`.
   */
  providerCanonical?: string;
  /**
   * Human-readable upstream provider label (e.g. `Claude`, `Kiro`,
   * `Windsurf`, `GitHub Models`). Populated from the per-provider
   * `entry.name` field inside `/api/pricing/models`. Used by the
   * `providerTag` feature to suffix `ModelV2.name` with the routing
   * destination so the OC TUI picker can differentiate the same
   * model id sold through different upstream connections.
   */
  providerDisplayName?: string;
  /** Free-model budget type (from freeModelCatalog). */
  freeType?: FreeModelFreeType;
  /** Monthly token budget for recurring free models. */
  monthlyTokens?: number;
  /** Credit token budget for credit-based free models. */
  creditTokens?: number;
}

/** Map keyed by full model id (possibly namespaced, e.g. `cc/claude-sonnet-4-6`). */
export type OmniRouteEnrichmentMap = Map<string, OmniRouteEnrichmentEntry>;

export type OmniRouteEnrichmentFetcher = (
  baseURL: string,
  apiKey: string,
  timeoutMs?: number
) => Promise<OmniRouteEnrichmentMap>;

/**
 * Default enrichment fetcher — pulls nice display names from
 * `GET /api/pricing/models` and merges per-million-token pricing from
 * `GET /api/pricing` (the actual pricing source — `/api/pricing/models` is
 * a catalog endpoint whose entries are `{id, name, custom}` only).
 *
 * `/api/pricing/models` shape (catalog):
 *  - `{ [providerAlias]: { id, alias, name, models: [{ id, name, custom }] } }`
 *
 * `/api/pricing` shape (pricing only):
 *  - `{ [providerAlias]: { [modelId]: { input, output, cached, reasoning, cache_creation } } }`
 *    where values are USD per million tokens.
 *
 * The two responses are joined on `(providerAlias, modelId)` and the merged
 * entries are stored under both `${providerAlias}/${modelId}` and bare
 * `${modelId}` keys so downstream lookups against either form succeed.
 *
 * Soft-fails (returns whatever was collected) on non-2xx or parse errors;
 * the two fetches are independent so one missing source still surfaces the
 * other.
 */
export const defaultOmniRouteEnrichmentFetcher: OmniRouteEnrichmentFetcher = async (
  baseURL,
  apiKey,
  timeoutMs = 10_000
) => {
  const out: OmniRouteEnrichmentMap = new Map();
  if (!baseURL || !apiKey) return out;
  const root = baseURL.replace(/\/v1\/?$/, "").replace(/\/$/, "");
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    Accept: "application/json",
  };

  // ── 1. Catalog with nice display names ────────────────────────────────
  const catalogAc = new AbortController();
  const catalogTimer = setTimeout(() => catalogAc.abort(), timeoutMs);
  try {
    const res = await fetch(`${root}/api/pricing/models`, {
      method: "GET",
      headers,
      signal: catalogAc.signal,
    });
    if (res.ok) {
      const body = (await res.json()) as unknown;
      const providers =
        (body as { providers?: Record<string, { models?: unknown[] }> })?.providers ??
        (body as Record<string, { models?: unknown[] }>);
      if (providers && typeof providers === "object") {
        for (const [providerAlias, slot] of Object.entries(providers)) {
          if (!slot || typeof slot !== "object") continue;
          const models = (slot as { models?: unknown[] }).models;
          if (!Array.isArray(models)) continue;
          // Canonical id sits at the per-provider top level (e.g.
          // `pricing-models.cc.id === 'claude'`). Falls back to the alias
          // itself when missing — common case alias===canonical.
          const canonicalRaw = (slot as { id?: unknown }).id;
          const providerCanonical =
            typeof canonicalRaw === "string" && canonicalRaw.length > 0
              ? canonicalRaw
              : providerAlias;
          // Upstream provider human label (e.g. `Claude`, `Kiro`,
          // `GitHub Models`). Optional — falls back to undefined when
          // OmniRoute hasn't curated a label for this slot.
          const slotNameRaw = (slot as { name?: unknown }).name;
          const providerDisplayName =
            typeof slotNameRaw === "string" && slotNameRaw.trim().length > 0
              ? slotNameRaw.trim()
              : undefined;
          for (const m of models) {
            if (!m || typeof m !== "object") continue;
            const id = (m as { id?: unknown }).id;
            if (typeof id !== "string" || id.length === 0) continue;
            const name = (m as { name?: unknown }).name;
            const entry: OmniRouteEnrichmentEntry = {
              providerAlias,
              providerCanonical,
            };
            if (providerDisplayName) entry.providerDisplayName = providerDisplayName;
            if (typeof name === "string" && name.trim().length > 0) entry.name = name;
            const namespaced = `${providerAlias}/${id}`;
            if (!out.has(namespaced)) out.set(namespaced, entry);
            if (!out.has(id)) out.set(id, entry);
          }
        }
      }
    }
  } catch {
    // Soft-fail; keep going to pricing fetch.
  } finally {
    clearTimeout(catalogTimer);
  }

  // ── 2. Pricing values from /api/pricing ───────────────────────────────
  const priceAc = new AbortController();
  const priceTimer = setTimeout(() => priceAc.abort(), timeoutMs);
  try {
    const res = await fetch(`${root}/api/pricing`, {
      method: "GET",
      headers,
      signal: priceAc.signal,
    });
    if (res.ok) {
      const body = (await res.json()) as unknown;
      if (body && typeof body === "object" && !Array.isArray(body)) {
        for (const [providerAlias, slot] of Object.entries(body as Record<string, unknown>)) {
          if (!slot || typeof slot !== "object" || Array.isArray(slot)) continue;
          for (const [modelId, raw] of Object.entries(slot as Record<string, unknown>)) {
            if (!raw || typeof raw !== "object") continue;
            const p = raw as Record<string, unknown>;
            const parsed: NonNullable<OmniRouteEnrichmentEntry["pricing"]> = {};
            // OmniRoute `/api/pricing` keys:
            //   input         → cost.input
            //   output        → cost.output
            //   cached        → cost.cache.read   (alias: cacheRead)
            //   cache_creation → cost.cache.write (alias: cacheWrite)
            // Tolerate alternative spellings for forward-compat.
            if (typeof p.input === "number") parsed.input = p.input;
            if (typeof p.output === "number") parsed.output = p.output;
            const cacheRead =
              typeof p.cached === "number"
                ? p.cached
                : typeof p.cacheRead === "number"
                  ? p.cacheRead
                  : undefined;
            if (typeof cacheRead === "number") parsed.cacheRead = cacheRead;
            const cacheWrite =
              typeof p.cache_creation === "number"
                ? p.cache_creation
                : typeof p.cacheWrite === "number"
                  ? p.cacheWrite
                  : undefined;
            if (typeof cacheWrite === "number") parsed.cacheWrite = cacheWrite;
            if (Object.keys(parsed).length === 0) continue;
            const namespaced = `${providerAlias}/${modelId}`;
            const existingNs = out.get(namespaced);
            if (existingNs)
              existingNs.pricing = {
                ...(existingNs.pricing ?? {}),
                ...parsed,
              };
            else out.set(namespaced, { pricing: parsed });
            const existingBare = out.get(modelId);
            if (existingBare)
              existingBare.pricing = {
                ...(existingBare.pricing ?? {}),
                ...parsed,
              };
            else out.set(modelId, { pricing: parsed });
          }
        }
      }
    }
  } catch {
    // Soft-fail; return whatever names we collected.
  } finally {
    clearTimeout(priceTimer);
  }

  // ── 3. Free model budgets from /api/free-tier/summary ──────────────────
  // Best-effort fetch: populates freeType/monthlyTokens/creditTokens on
  // enrichment entries that match. 404 = endpoint doesn't exist — skip.
  // Uses the EXISTING /api/free-tier/summary endpoint (no new server code).
  const freeAc = new AbortController();
  const freeTimer = setTimeout(() => freeAc.abort(), timeoutMs);
  try {
    const res = await fetch(`${root}/api/free-tier/summary`, {
      method: "GET",
      headers,
      signal: freeAc.signal,
    });
    if (res.ok) {
      const body = (await res.json()) as unknown;
      // Response shape: { perModel: FreeModelBudget[], ... }
      const perModel: unknown[] =
        body && typeof body === "object" && Array.isArray((body as { perModel?: unknown }).perModel)
          ? ((body as { perModel: unknown[] }).perModel as unknown[])
          : Array.isArray(body)
            ? (body as unknown[])
            : [];
      let matched = 0;
      for (const fm of perModel) {
        if (!fm || typeof fm !== "object") continue;
        const fmObj = fm as Record<string, unknown>;
        const provider = typeof fmObj.provider === "string" ? fmObj.provider : "";
        const modelId = typeof fmObj.modelId === "string" ? fmObj.modelId : "";
        const freeType = typeof fmObj.freeType === "string" ? fmObj.freeType : "";
        if (!modelId || !freeType) continue;
        const monthlyTokens =
          typeof fmObj.monthlyTokens === "number" ? fmObj.monthlyTokens : undefined;
        const creditTokens =
          typeof fmObj.creditTokens === "number" ? fmObj.creditTokens : undefined;
        // Match against enrichment entries: namespaced, bare, and displayName
        const displayName = typeof fmObj.displayName === "string" ? fmObj.displayName : "";
        const candidates = [
          `${provider}/${modelId}`,
          modelId,
          ...(displayName ? [displayName] : []),
        ];
        for (const key of candidates) {
          const entry = out.get(key);
          if (entry) {
            entry.freeType = freeType as FreeModelFreeType;
            if (monthlyTokens !== undefined) entry.monthlyTokens = monthlyTokens;
            if (creditTokens !== undefined) entry.creditTokens = creditTokens;
            matched++;
            break;
          }
        }
      }
      _logger.debug(
        `free-tier/summary: ${perModel.length} models returned, ${matched} matched enrichment entries`
      );
    }
  } catch {
    // Soft-fail; free metadata is optional.
  } finally {
    clearTimeout(freeTimer);
  }

  return out;
};

// ── Startup diagnostics writer (file-based) ──────────────────────────────
// OC doesn't capture plugin console.warn in its log file. Write diagnostics
// to a file so they're readable after session starts. Capped at 64KB.
async function writeStartupDiagnostics(params: {
  providerId: string;
  baseURL: string;
  modelCount: number;
  comboCount: number;
  enrichmentSize: number;
  autoComboCount: number;
  enrichment: OmniRouteEnrichmentMap;
  autoCombos: OmniRouteRawAutoCombo[];
}): Promise<void> {
  const {
    providerId,
    baseURL,
    modelCount,
    comboCount,
    enrichmentSize,
    autoComboCount,
    enrichment,
    autoCombos,
  } = params;
  const enriched = [...enrichment.entries()];
  const withName = enriched.filter(([, e]) => e.name);
  const withPricing = enriched.filter(([, e]) => e.pricing);
  const withFree = enriched.filter(([, e]) => e.freeType);

  const lines: string[] = [];
  lines.push(`=== startupDebug ${new Date().toISOString()} ===`);
  lines.push(`providerId=${providerId} baseURL=${baseURL}`);
  lines.push(
    `models=${modelCount} combos=${comboCount} enrichment=${enrichmentSize} autoCombos=${autoComboCount}`
  );
  lines.push(
    `enrichment: ${withName.length} with name, ${withPricing.length} with pricing, ${withFree.length} free`
  );
  if (withFree.length > 0) {
    lines.push(`free models (${withFree.length}):`);
    for (const [k, e] of withFree.slice(0, 10)) {
      lines.push(
        `  ${k} → name=${e.name ?? "(none)"}, freeType=${e.freeType}, monthly=${e.monthlyTokens ?? 0}, credits=${e.creditTokens ?? 0}`
      );
    }
  } else {
    lines.push(
      `NO free models detected. ` +
        (enrichmentSize === 0
          ? "Enrichment map is EMPTY."
          : `Enrichment has ${enrichmentSize} entries but none have freeType.`)
    );
  }
  const sampleNames = enriched
    .filter(([, e]) => e.name)
    .slice(0, 5)
    .map(([k, e]) => `  ${k} → "${e.name}"`);
  if (sampleNames.length > 0) {
    lines.push(`sample enriched names:`);
    lines.push(sampleNames.join("\n"));
  }
  if (autoCombos.length > 0) {
    lines.push(
      `auto combos: ${autoCombos.length} — ${autoCombos.map((ac) => `${ac.id}(${ac.candidateCount ?? "?"}p)`).join(", ")}`
    );
  }
  lines.push(`=== end startupDebug ===\n`);

  const diagnostics = lines.join("\n");
  _logger.debug(diagnostics);

  try {
    const diagDir =
      process.env.OPENCODE_DATA_DIR ?? path.join(os.homedir(), ".local/share/opencode");
    const diagPath = path.join(diagDir, "plugins", "omniroute-startup-diagnostics.log");
    let existing = "";
    try {
      existing = await readFile(diagPath, "utf8");
    } catch {
      /* first write */
    }
    const KEEP = 65_536;
    const combined = existing + diagnostics;
    const trimmed = combined.length > KEEP ? combined.slice(combined.length - KEEP) : combined;
    await writeFile(diagPath, trimmed, "utf8");
  } catch {
    /* best effort */
  }
}

/**
 * Separator used by `applyProviderTag` between the upstream provider
 * label (prefix) and the enriched model name. ASCII hyphen with
 * surrounding spaces — terminal-safe everywhere, never collides with
 * a model id (those use slashes / dots / underscores).
 *
 * Layout: `<short-label> - <model name>` (label leads so column scans
 * group by provider — e.g. `Claude - Claude Opus 4.7`,
 * `Kiro - Claude Opus 4.7`).
 */
export const PROVIDER_TAG_SEPARATOR = _PROVIDER_TAG_SEPARATOR;

// Re-export from naming.ts — thin wrapper preserving OmniRouteEnrichmentEntry signature
export function shortProviderLabel(
  enrichment: OmniRouteEnrichmentEntry | undefined
): string | undefined {
  return _shortProviderLabel(enrichment);
}

/**
 * Prepend the upstream provider label to `model.name` so the OC TUI
 * picker can differentiate the same model id sold through different
 * upstream connections (e.g. `cc/claude-opus-4-7` via Anthropic
 * vs `kr/claude-opus-4-7` via Kiro). Result shape:
 *
 *   `<label>${PROVIDER_TAG_SEPARATOR}<enriched name>`
 *   → `Claude - Claude Opus 4.7`
 *   → `Kiro - Claude Opus 4.7`
 *   → `AssemblyAI - Universal 2 (Transcription)` (slot.name fits, used verbatim)
 *   → `GHM - GPT 5`           (slot.name "GitHub Models" > 12 chars → UPPER(alias))
 *
 * Mutates the model in place and is idempotent — running twice never
 * double-prefixes. No-op when:
 *
 *  - `enrichment` is undefined,
 *  - {@link shortProviderLabel} returns `undefined`
 *    (no `providerDisplayName` AND no `providerAlias`),
 *  - the current `model.name` already starts with the prefix.
 *
 * Combos are intentionally skipped by callers (they're multi-upstream
 * by definition; the `Combo: ` prefix conveys that). Raw models call
 * this after `applyEnrichment` so the tag layers on top of the
 * friendly name.
 */
export function applyProviderTag(
  model: ModelV2,
  enrichment: OmniRouteEnrichmentEntry | undefined
): ModelV2 {
  const label = shortProviderLabel(enrichment);
  if (!label) return model;
  const prefix = `${label}${PROVIDER_TAG_SEPARATOR}`;
  if (model.name.startsWith(prefix)) return model;
  // When enrichment already prepended [Free], move it before the provider
  // tag: "[Free] GPT-4.1" → "[Free] GHM - GPT-4.1" not "GHM - [Free] GPT-4.1"
  if (model.name.startsWith("[Free] ")) {
    model.name = `[Free] ${prefix}${model.name.slice(7)}`;
  } else {
    model.name = `${prefix}${model.name}`;
  }
  return model;
}

/**
 * Reverse-index the enrichment map from `providerCanonical → providerAlias`.
 *
 * OmniRoute's `/api/pricing/models` is keyed by short ALIAS (`cc`, `cx`,
 * `pol`). But `/v1/models` exposes some models a SECOND time under their
 * CANONICAL name (`claude/claude-opus-4-7`, `codex/gpt-5.5`,
 * `pollinations/midjourney`). Without a reverse map, those canonical
 * rows miss enrichment entirely and surface as raw ids in the picker.
 *
 * Built once per refresh from the enrichment entries themselves — no
 * hardcoded registry. Only records `canonical → alias` mappings when
 * both are present AND distinct (skips slots where alias === canonical
 * like `kiro`).
 */
export function buildCanonicalToAliasMap(
  enrichment: OmniRouteEnrichmentMap | undefined
): Map<string, string> {
  const out = new Map<string, string>();
  if (!enrichment) return out;
  for (const entry of enrichment.values()) {
    const alias = typeof entry.providerAlias === "string" ? entry.providerAlias.trim() : "";
    const canonical =
      typeof entry.providerCanonical === "string" ? entry.providerCanonical.trim() : "";
    if (alias.length === 0 || canonical.length === 0) continue;
    if (alias === canonical) continue;
    if (!out.has(canonical)) out.set(canonical, alias);
  }
  return out;
}

/**
 * Enrichment lookup with alias-fallback chain.
 *
 * Resolution order (first hit wins):
 *
 *   1. `enrichment.get(rawId)` — direct hit on `<prefix>/<modelId>` or
 *      bare id (the fetcher writes under both forms).
 *   2. If `rawId` is `<canonical>/<modelId>` and `canonicalToAlias` has
 *      a mapping for `canonical`, try `<alias>/<modelId>`. This rescues
 *      duplicate rows like `claude/claude-opus-4-7` (canonical) when
 *      enrichment only indexed under `cc/claude-opus-4-7` (alias).
 *   3. Bare `<modelId>` as a last resort. Already covered by step 1 in
 *      practice (fetcher writes bare keys), but kept defensive.
 *
 * Returns `undefined` when no lookup hits.
 */
export function lookupEnrichment(
  rawId: string,
  enrichment: OmniRouteEnrichmentMap | undefined,
  canonicalToAlias: Map<string, string>
): OmniRouteEnrichmentEntry | undefined {
  if (!enrichment) return undefined;
  const direct = enrichment.get(rawId);
  if (direct) return direct;
  const slash = rawId.indexOf("/");
  if (slash > 0) {
    const prefix = rawId.slice(0, slash);
    const modelId = rawId.slice(slash + 1);
    const alias = canonicalToAlias.get(prefix);
    if (alias && alias !== prefix) {
      const viaAlias = enrichment.get(`${alias}/${modelId}`);
      if (viaAlias) return viaAlias;
    }
    const bare = enrichment.get(modelId);
    if (bare) return bare;
  }
  return undefined;
}

/**
 * Pre-pass: detect raw rows that are the CANONICAL twin of an ALIAS row
 * already in the catalog. Returns the set of canonical-keyed ids to skip
 * during the raw-model loop so each model surfaces exactly once under
 * its enriched alias key.
 *
 * Example: `/v1/models` returns BOTH `cc/claude-opus-4-7` and
 * `claude/claude-opus-4-7`. The former is enriched (alias `cc` exists
 * in `/api/pricing/models`); the latter is raw. We keep `cc/...` and
 * drop `claude/...`.
 *
 * Built once per refresh. Cheap — O(M) where M = raw model count.
 */
export function canonicalDedupSet(
  rawModels: ReadonlyArray<OmniRouteRawModelEntry>,
  canonicalToAlias: Map<string, string>
): Set<string> {
  const drop = new Set<string>();
  if (canonicalToAlias.size === 0) return drop;
  // Index every alias key present in the raw catalog.
  const aliasKeys = new Set<string>();
  for (const m of rawModels) {
    if (typeof m.id === "string" && m.id.length > 0) aliasKeys.add(m.id);
  }
  for (const m of rawModels) {
    if (typeof m.id !== "string" || m.id.length === 0) continue;
    const slash = m.id.indexOf("/");
    if (slash <= 0) continue;
    const prefix = m.id.slice(0, slash);
    const modelId = m.id.slice(slash + 1);
    const alias = canonicalToAlias.get(prefix);
    if (!alias || alias === prefix) continue;
    // Canonical row only gets suppressed if the alias row actually
    // exists — otherwise we'd hide the model entirely.
    if (aliasKeys.has(`${alias}/${modelId}`)) drop.add(m.id);
  }
  return drop;
}

/**
 * Build a per-alias index of enrichment metadata so we can render the
 * provider prefix even for raw models that don't have their own
 * curated `/api/pricing/models` entry.
 *
 * Real example: OmniRoute's `pricing['cohere']` slot lists 10 curated
 * models but `/v1/models` also returns `cohere/rerank-multilingual-v3.0`
 * and `cohere/rerank-v4.0-fast` (not in the curated 10). Without this
 * index, those rows surface in the picker as `cohere/...` with no
 * `Cohere - ` prefix because the per-model enrichment lookup misses.
 *
 * This index records the first non-empty `providerDisplayName` seen
 * for each alias, plus the alias itself. Callers use it to synthesize
 * a minimal `OmniRouteEnrichmentEntry` whenever the direct lookup
 * misses but the raw id's prefix matches a known alias.
 *
 * Built once per refresh; first-wins on duplicate alias (matches
 * `buildCanonicalToAliasMap` semantics).
 */
export function buildAliasIndex(
  enrichment: OmniRouteEnrichmentMap | undefined
): Map<string, OmniRouteEnrichmentEntry> {
  const out = new Map<string, OmniRouteEnrichmentEntry>();
  if (!enrichment) return out;
  for (const entry of enrichment.values()) {
    const alias = typeof entry.providerAlias === "string" ? entry.providerAlias.trim() : "";
    if (alias.length === 0) continue;
    if (out.has(alias)) {
      // First-wins, but upgrade to the first entry that carries a
      // non-empty providerDisplayName so the prefix renders nicely.
      const existing = out.get(alias);
      if (
        existing &&
        (!existing.providerDisplayName || existing.providerDisplayName.trim().length === 0) &&
        typeof entry.providerDisplayName === "string" &&
        entry.providerDisplayName.trim().length > 0
      ) {
        out.set(alias, entry);
      }
      continue;
    }
    out.set(alias, entry);
  }
  return out;
}

/**
 * Resolve a synthesised enrichment entry for `applyProviderTag` /
 * `shortProviderLabel` consumption, combining two sources:
 *
 *  1. The direct per-model enrichment match (if present).
 *  2. A per-alias fallback derived from `buildAliasIndex` — covers raw
 *     ids whose prefix matches a known alias but the specific model
 *     id wasn't curated in `/api/pricing/models`. Example:
 *     `cohere/rerank-multilingual-v3.0` falls back to the cohere slot's
 *     `providerDisplayName='Cohere'` even though that specific id
 *     isn't in the curated 10-model list.
 *
 * Returns `undefined` when neither source surfaces an alias.
 *
 * NOTE: this function is read-only over its inputs; it never mutates
 * the underlying `direct` entry. When it falls back to the alias
 * index, it constructs a fresh minimal entry exposing only the
 * provider-prefix fields (`providerAlias`, `providerCanonical`,
 * `providerDisplayName`). Other fields (name, pricing) are explicitly
 * left undefined so `applyEnrichment` won't accidentally overwrite a
 * model name with the alias-slot label.
 */
export function resolveProviderTagEntry(
  rawId: string,
  direct: OmniRouteEnrichmentEntry | undefined,
  aliasIndex: Map<string, OmniRouteEnrichmentEntry>,
  canonicalToAlias?: Map<string, string>
): OmniRouteEnrichmentEntry | undefined {
  if (direct) {
    const alias = typeof direct.providerAlias === "string" ? direct.providerAlias.trim() : "";
    const display =
      typeof direct.providerDisplayName === "string" ? direct.providerDisplayName.trim() : "";
    if (alias.length > 0 || display.length > 0) return direct;
  }
  const slash = rawId.indexOf("/");
  if (slash <= 0) return direct;
  const prefix = rawId.slice(0, slash);
  // 1. Direct alias lookup (`cohere/...` → cohere slot keyed by alias=cohere).
  let fromAlias = aliasIndex.get(prefix);
  // 2. Canonical fallback (`pollinations/...` → look up via alias `pol`).
  if (!fromAlias && canonicalToAlias) {
    const alias = canonicalToAlias.get(prefix);
    if (alias) fromAlias = aliasIndex.get(alias);
  }
  if (!fromAlias) return direct;
  // Synthesize: borrow only the provider-prefix metadata.
  return {
    providerAlias: fromAlias.providerAlias,
    providerCanonical: fromAlias.providerCanonical,
    providerDisplayName: fromAlias.providerDisplayName,
  };
}

/**
 * Apply enrichment overlay onto a ModelV2 entry. Mutates and returns the
 * passed entry for convenience.
 */
/**
 * Normalise a model display name so free-tier models always carry a
 * consistent `[Free] ` prefix instead of a trailing `(Free)` suffix or an
 * ad-hoc `free` word anywhere in the name.
 *
 * Examples:
 *   "GPT-4.1 (Free)"          → "[Free] GPT-4.1"
 *   "DeepSeek V4 Flash Free"  → "[Free] DeepSeek V4 Flash"
 *   "Claude Opus 4.7"         → "Claude Opus 4.7"   (unchanged)
 */
export { _normaliseFreeLabel as normaliseFreeLabel };

export function applyEnrichment(
  model: ModelV2,
  enrichment: OmniRouteEnrichmentEntry | undefined
): ModelV2 {
  if (!enrichment) return model;
  if (enrichment.name && enrichment.name.trim().length > 0) {
    model.name = _normaliseFreeLabel(enrichment.name);
  }
  if (enrichment.pricing) {
    if (typeof enrichment.pricing.input === "number") {
      model.cost.input = enrichment.pricing.input;
    }
    if (typeof enrichment.pricing.output === "number") {
      model.cost.output = enrichment.pricing.output;
    }
    if (typeof enrichment.pricing.cacheRead === "number") {
      model.cost.cache.read = enrichment.pricing.cacheRead;
    }
    if (typeof enrichment.pricing.cacheWrite === "number") {
      model.cost.cache.write = enrichment.pricing.cacheWrite;
    }
  }
  return model;
}

// ─────────────────────────────────────────────────────────────────────────
// COMPRESSION METADATA — pull /api/context/combos so combo entries can be
// tagged with their compression pipeline. Gated by
// features.compressionMetadata (off by default).
// ─────────────────────────────────────────────────────────────────────────

/** Single step in a compression combo's pipeline. */
export interface OmniRouteCompressionStep {
  engine: string; // "rtk" | "caveman" | "aggressive" | ...
  intensity?: string; // "minimal" | "lite" | "standard" | "full" | "ultra" | "aggressive"
}

/** Compression combo as returned by /api/context/combos. */
export interface OmniRouteCompressionCombo {
  id: string;
  name?: string;
  description?: string;
  pipeline: OmniRouteCompressionStep[];
  isDefault?: boolean;
}

export type OmniRouteCompressionMetaFetcher = (
  baseURL: string,
  apiKey: string,
  timeoutMs?: number
) => Promise<OmniRouteCompressionCombo[]>;

/**
 * Default compression-metadata fetcher — calls `GET /api/context/combos`.
 * Tolerates envelope shapes `{ combos: [...] }`, `[...]`, or
 * `{ data: [...] }`. Soft-fails (returns []) on non-2xx or parse errors.
 */
export const defaultOmniRouteCompressionMetaFetcher: OmniRouteCompressionMetaFetcher = async (
  baseURL,
  apiKey,
  timeoutMs = 10_000
) => {
  const empty: OmniRouteCompressionCombo[] = [];
  if (!baseURL || !apiKey) return empty;
  const root = baseURL.replace(/\/v1\/?$/, "").replace(/\/$/, "");
  const url = `${root}/api/context/combos`;
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      signal: ac.signal,
    });
    if (!res.ok) return empty;
    const body = (await res.json()) as unknown;
    const list = Array.isArray(body)
      ? body
      : Array.isArray((body as { combos?: unknown[] })?.combos)
        ? (body as { combos: unknown[] }).combos
        : Array.isArray((body as { data?: unknown[] })?.data)
          ? (body as { data: unknown[] }).data
          : [];
    const out: OmniRouteCompressionCombo[] = [];
    for (const raw of list) {
      if (!raw || typeof raw !== "object") continue;
      const id = (raw as { id?: unknown }).id;
      const pipeline = (raw as { pipeline?: unknown }).pipeline;
      if (typeof id !== "string" || id.length === 0) continue;
      if (!Array.isArray(pipeline)) continue;
      const steps: OmniRouteCompressionStep[] = [];
      for (const step of pipeline) {
        if (!step || typeof step !== "object") continue;
        const engine = (step as { engine?: unknown }).engine;
        if (typeof engine !== "string" || engine.length === 0) continue;
        const intensity = (step as { intensity?: unknown }).intensity;
        const entry: OmniRouteCompressionStep = { engine };
        if (typeof intensity === "string" && intensity.length > 0) {
          entry.intensity = intensity;
        }
        steps.push(entry);
      }
      const combo: OmniRouteCompressionCombo = { id, pipeline: steps };
      const name = (raw as { name?: unknown }).name;
      if (typeof name === "string" && name.length > 0) combo.name = name;
      const description = (raw as { description?: unknown }).description;
      if (typeof description === "string") combo.description = description;
      const isDefault = (raw as { isDefault?: unknown }).isDefault;
      if (typeof isDefault === "boolean") combo.isDefault = isDefault;
      out.push(combo);
    }
    return out;
  } catch {
    return empty;
  } finally {
    clearTimeout(timer);
  }
};

/**
 * Map of well-known compression-intensity tokens to a single emoji
 * conveying "how much" compression is applied. Traffic-light palette:
 *
 *   🟢 minimal / lite   — almost no loss
 *   🟡 standard          — balanced
 *   🟠 aggressive / full — heavy
 *   🔴 ultra             — extreme
 *
 * Lookup is case-insensitive. Unknown intensities fall through to the
 * raw text form (`engine:<intensity>`) so we never hide a value that
 * OmniRoute knows but the plugin doesn't.
 *
 * Exported for callers (and tests) that want to assemble their own
 * pipeline strings.
 */
export const COMPRESSION_INTENSITY_EMOJI: Record<string, string> = {
  minimal: "🟢",
  lite: "🟢",
  standard: "🟡",
  aggressive: "🟠",
  full: "🟠",
  ultra: "🔴",
};

/**
 * Format a compression pipeline as a short human-readable string for
 * combo `name` decoration. Intensity tokens render as a traffic-light
 * emoji so a column scan reveals "how compressed" the combo is at a
 * glance:
 *
 *   `[rtk🟡 → caveman🟠]`    (rtk:standard → caveman:full)
 *   `[rtk🔴]`                 (rtk:ultra, single-step)
 *   `[caveman]`               (engine without intensity, no emoji)
 *   `[rtk:custom-thing]`      (unknown intensity, raw-text fallback)
 */
export function formatCompressionPipeline(pipeline: OmniRouteCompressionStep[]): string {
  if (!pipeline || pipeline.length === 0) return "";
  return (
    "[" +
    pipeline
      .map((s) => {
        if (!s.intensity) return s.engine;
        const emoji = COMPRESSION_INTENSITY_EMOJI[s.intensity.toLowerCase()];
        return emoji ? `${s.engine}${emoji}` : `${s.engine}:${s.intensity}`;
      })
      .join(" → ") +
    "]"
  );
}

// ─────────────────────────────────────────────────────────────────────────
// /api/providers (provider-connection status) — optional read used by the
// `features.usableOnly` filter. Returns the operator's installed OmniRoute
// provider connections, each with `provider` (canonical id), `isActive`,
// `testStatus`. We treat a provider as USABLE when at least one of its
// connections is `isActive: true && testStatus: 'active'`. Aliases (e.g.
// `cc → claude`) are resolved through the enrichment map.
// ─────────────────────────────────────────────────────────────────────────

/** Subset of `/api/providers/connections[]` we read. Other fields are kept as a permissive index signature. */
export interface OmniRouteProviderConnection {
  /** Connection UUID. */
  id: string;
  /** Canonical provider id, e.g. `claude`, `gemini-cli`, `kiro`. Matches `entry.id` in `/api/pricing/models`. */
  provider: string;
  /** Connection auth flavor, e.g. `apikey`, `oauth`, `cookie`. */
  authType?: string;
  /** Operator-visible label. */
  name?: string;
  /** Operator toggle — when false, the connection is provisioned but disabled. */
  isActive?: boolean;
  /** Health-check verdict — `active` means routable; `expired`/`error`/`unavailable` mean not. */
  testStatus?: string;
  /** Permissive bag — additional fields (priority, backoffLevel, etc.) pass through untouched. */
  [k: string]: unknown;
}

export type OmniRouteProvidersFetcher = (
  baseURL: string,
  apiKey: string,
  timeoutMs?: number
) => Promise<OmniRouteProviderConnection[]>;

/**
 * Default providers fetcher — calls `GET /api/providers`. Tolerates envelope
 * shapes `{ connections: [...] }`, `[...]`, or `{ data: [...] }`. Soft-fails
 * (returns []) on non-2xx or parse errors so the `usableOnly` filter
 * gracefully degrades to "no filter" instead of hiding the whole catalog.
 */
export const defaultOmniRouteProvidersFetcher: OmniRouteProvidersFetcher = async (
  baseURL,
  apiKey,
  timeoutMs = 10_000
) => {
  const empty: OmniRouteProviderConnection[] = [];
  if (!baseURL || !apiKey) return empty;
  const root = baseURL.replace(/\/v1\/?$/, "").replace(/\/$/, "");
  const url = `${root}/api/providers`;
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      signal: ac.signal,
    });
    if (!res.ok) return empty;
    const body = (await res.json()) as unknown;
    const list = Array.isArray(body)
      ? body
      : Array.isArray((body as { connections?: unknown[] })?.connections)
        ? (body as { connections: unknown[] }).connections
        : Array.isArray((body as { data?: unknown[] })?.data)
          ? (body as { data: unknown[] }).data
          : [];
    const out: OmniRouteProviderConnection[] = [];
    for (const raw of list) {
      if (!raw || typeof raw !== "object") continue;
      const provider = (raw as { provider?: unknown }).provider;
      if (typeof provider !== "string" || provider.length === 0) continue;
      const id = (raw as { id?: unknown }).id;
      const idStr = typeof id === "string" && id.length > 0 ? id : provider;
      out.push({ ...(raw as Record<string, unknown>), id: idStr, provider });
    }
    return out;
  } catch {
    return empty;
  } finally {
    clearTimeout(timer);
  }
};

/**
 * Compute the set of provider aliases that have at least one healthy,
 * active connection. Resolves alias → canonical id through the enrichment
 * map (which is keyed under both `${alias}/${id}` and bare `${id}` — we
 * walk only the namespaced keys to derive the alias↔canonical mapping).
 *
 * Returns:
 *   - `aliases`: set of alias prefixes safe to keep (e.g. `cc`, `gemini-cli`).
 *   - `canonicals`: set of canonical provider ids (e.g. `claude`, `kiro`).
 *
 * Callers should treat membership in EITHER set as "usable" — raw model
 * ids may be `<alias>/<model>` (`cc/claude-opus-4-7`) OR `<canonical>/<model>`
 * (`claude/sonnet-4`) depending on the OmniRoute deployment's `/v1/models`
 * surface shape.
 *
 * Subtract-filter semantics: callers MUST also keep models whose prefix is
 * unknown to BOTH `/api/pricing/models` and `/api/providers` (e.g.
 * agentrouter-style synthetic prefixes). The right boolean is "if I see this
 * prefix in EITHER catalog table AND it's not usable, drop; otherwise keep".
 */
export function usableProviderAliasSet(
  connections: OmniRouteProviderConnection[],
  enrichment: OmniRouteEnrichmentMap | undefined
): {
  aliases: Set<string>;
  canonicals: Set<string>;
  knownAliases: Set<string>;
} {
  const usableCanonicals = new Set<string>();
  for (const c of connections) {
    if (!c || c.isActive !== true) continue;
    if (typeof c.testStatus === "string" && c.testStatus !== "active") continue;
    if (typeof c.provider === "string" && c.provider.length > 0) {
      usableCanonicals.add(c.provider);
    }
  }
  const aliases = new Set<string>();
  const knownAliases = new Set<string>();
  if (enrichment) {
    // Walk enrichment entries to map alias → canonical via the metadata
    // populated by `defaultOmniRouteEnrichmentFetcher`. Every entry carries
    // its providerAlias + providerCanonical so the namespaced/bare key
    // duplication is harmless. Collect EVERY alias we encounter (regardless
    // of usability) into `knownAliases` so the downstream filter can decide
    // "this prefix was in /api/pricing/models" in O(1) instead of O(E).
    for (const entry of enrichment.values()) {
      const alias = entry.providerAlias;
      const canonical = entry.providerCanonical;
      if (typeof alias !== "string" || alias.length === 0) continue;
      knownAliases.add(alias);
      if (typeof canonical !== "string" || canonical.length === 0) continue;
      if (usableCanonicals.has(canonical)) aliases.add(alias);
    }
  }
  // Always include every usable canonical as an alias too — handles the
  // common case where `/v1/models` ids use the canonical id directly
  // (e.g. `gemini-cli/gemini-1.5-pro`).
  for (const canonical of usableCanonicals) aliases.add(canonical);
  return { aliases, canonicals: usableCanonicals, knownAliases };
}

/**
 * Decide whether a raw `/v1/models` id passes the `usableOnly` filter.
 *
 * Rules (subtract-filter — bias toward keep):
 *   - id has no `/` → keep (combos/synthetic entries handled separately).
 *   - prefix matches a known usable alias OR canonical → keep.
 *   - prefix is unknown to BOTH the connection table AND the enrichment
 *     map → keep (we can't prove it's NOT usable; could be agentrouter).
 *   - prefix is known to the enrichment map BUT not in usable set → drop.
 *
 * Pure function — exported so static + dynamic hooks share the same
 * verdict logic without divergence.
 */
export function isUsableRawModelId(
  id: string,
  usable: {
    aliases: Set<string>;
    canonicals: Set<string>;
    knownAliases: Set<string>;
  },
  enrichment: OmniRouteEnrichmentMap | undefined
): boolean {
  const slash = id.indexOf("/");
  if (slash <= 0) return true;
  const prefix = id.slice(0, slash);
  if (usable.aliases.has(prefix) || usable.canonicals.has(prefix)) return true;
  // O(1) "known prefix" check via pre-calculated knownAliases set.
  // If prefix was in /api/pricing/models but is NOT in usable set,
  // drop the model. Unknown prefixes (e.g. agentrouter-style synthetic)
  // pass through (subtract-filter semantics).
  if (usable.knownAliases.has(prefix)) return false;
  return true;
}

/**
 * Decide whether a combo passes the `usableOnly` filter. A combo keeps
 * when AT LEAST ONE of its members maps to a usable canonical provider.
 * Combos with zero resolvable members pass through (already degraded to
 * all-false LCD posture and surfaced as cosmetic-only entries).
 */
export function isUsableCombo(
  combo: OmniRouteRawCombo,
  usable: {
    aliases: Set<string>;
    canonicals: Set<string>;
    knownAliases: Set<string>;
  }
): boolean {
  const steps = Array.isArray(combo.models) ? combo.models : [];
  if (steps.length === 0) return true;
  // The provider id is folded INTO the full model string by OmniRoute's
  // `normalizeComboRecord` (e.g. "cc/claude-opus-4-7") — combo member refs do
  // NOT carry a separate `providerId` field. Derive the prefix from `step.model`
  // and apply the same subtract-filter verdict as `isUsableRawModelId`.
  let sawResolvableMember = false;
  for (const step of steps) {
    // Nested combo refs carry no model id we can resolve to a provider here.
    if (step?.kind === "combo-ref") continue;
    const modelId = typeof step?.model === "string" ? step.model : "";
    const slash = modelId.indexOf("/");
    if (slash <= 0) continue; // no provider prefix to evaluate
    sawResolvableMember = true;
    const prefix = modelId.slice(0, slash);
    if (usable.aliases.has(prefix) || usable.canonicals.has(prefix)) return true;
    // Unknown prefix (not in the known-alias universe) → can't prove
    // unroutable; keep. Known-but-not-usable prefixes keep scanning.
    if (!usable.knownAliases.has(prefix)) return true;
  }
  // No member resolved to a provider prefix → can't prove unroutable; keep.
  if (!sawResolvableMember) return true;
  // Every resolvable member used a known-but-non-usable prefix → drop.
  return false;
}

/**
 * Slugify a combo display name into a copy/paste-friendly URL-safe segment.
 * Lowercases, replaces any run of non-alphanumeric chars with a single dash,
 * trims leading/trailing dashes. Empty input or all-special input returns
 * the empty string (caller must fall back to the combo's UUID id).
 *
 * Example: `Claude Tier` → `claude-tier`, `GPT 5.5 / Pro` → `gpt-5-5-pro`.
 */
export function slugifyComboName(name: string): string {
  if (typeof name !== "string") return "";
  return trimLeadingDashes(trimTrailingDashes(name.toLowerCase().replace(/[^a-z0-9]+/g, "-")));
}

/**
 * Build a combo's static-block key (bare slug like `MASTER`, `MASTER-LIGHT`),
 * guaranteeing uniqueness across an entire static catalog. If `<slug>` is
 * already present in `used`, suffixes a short UUID-prefix disambiguator from
 * `combo.id` so the second combo doesn't silently overwrite the first.
 * Mutates `used` in place by recording the chosen key. Returns the final
 * bare key.
 *
 * NOTE: the key MUST NOT carry a `combo/` namespace prefix — OpenCode
 * parses model IDs on `/` to extract a provider prefix, and `combo/MASTER`
 * would be treated as provider=`combo`, model=`MASTER`, causing a
 * credentials-not-found error. See PR #4184.
 *
 * Falls back to bare `<id>` when the friendly name slugifies to the empty
 * string (e.g. a combo named just punctuation).
 */
export function buildComboKey(combo: OmniRouteRawCombo, used: Set<string>): string {
  const friendlyName = combo.name && combo.name.trim().length > 0 ? combo.name.trim() : combo.id;
  let slug = slugifyComboName(friendlyName);
  if (slug.length === 0) slug = combo.id;
  let key = slug;
  if (used.has(key)) {
    const tail = combo.id.split("-")[0] ?? combo.id;
    key = slug + "-" + tail;
    // Defensive: in the (impossible) event the disambiguated key also
    // collides, append the full id.
    if (used.has(key)) key = slug + "-" + combo.id;
  }
  used.add(key);
  return key;
}

/**
 * Internal cache key: `${baseURL}::sha256(apiKey)`. We hash the apiKey so
 * the key is safe to log / inspect via debugger without leaking the secret.
 * Different (baseURL, apiKey) tuples MUST keep independent cache entries:
 * a single OC user may register prod + preprod OmniRoute side-by-side with
 * distinct keys, and serving one's catalog from the other's cache would be
 * a correctness bug, not just a privacy one.
 */
// codeql[js/insufficient-password-hash]: the input here is an API-key
// identifier we use solely to derive an in-memory cache lookup key — it is
// never stored, transmitted, compared against a hash, or used as a password.
// SHA-256 is intentional: cheap + deterministic, prevents the raw secret
// from sitting in memory dumps alongside the cache map. Slow KDFs (bcrypt/
// argon2) would defeat the purpose (sub-ms lookups on every request).
function modelsCacheKey(baseURL: string, credentialId: string): string {
  const h = createHash("sha256").update(credentialId).digest("hex");
  return `${baseURL}::${h}`;
}

/**
 * Shared fetch-result cache entry. Holds the RAW `/v1/models` + `/api/combos`
 * responses (NOT a pre-derived ModelV2 / static-entry shape) so the provider
 * hook (T-03/T-05) and the config-shim hook (T-07) can derive their own
 * output shapes from the same source without re-fetching.
 *
 * Why raw instead of derived:
 *   - provider hook emits ModelV2 (rich nested capabilities + cost + limits).
 *   - config hook emits the stripped sibling shape
 *     (`{name, attachment, reasoning, tool_call, temperature, limit?}`).
 *   - These overlap but neither is a superset of the other (ModelV2 has no
 *     `tool_call` field — it's `toolcall`; the stripped shape has no
 *     `cost`/`status`/`headers`). Caching the raw responses is the only
 *     lossless option.
 *   - On OC ≥1.14.49 cold start BOTH hooks fire within the same
 *     OmniRoutePlugin instance — sharing the cache means /v1/models +
 *     /api/combos each hit the gateway exactly ONCE per TTL refresh, not
 *     twice.
 */
export interface OmniRouteFetchCacheEntry {
  rawModels: OmniRouteRawModelEntry[];
  rawCombos: OmniRouteRawCombo[];
  rawAutoCombos: OmniRouteRawAutoCombo[];
  /** Display-name + pricing overlay from /api/pricing/models. Empty Map when feature is disabled or fetch failed. */
  rawEnrichment: OmniRouteEnrichmentMap;
  /** Compression combos from /api/context/combos. Empty array when feature is disabled or fetch failed. */
  rawCompressionCombos: OmniRouteCompressionCombo[];
  /** Provider connections from /api/providers. Empty array when feature is disabled or fetch failed. */
  rawConnections: OmniRouteProviderConnection[];
  expiresAt: number;
}

export type OmniRouteFetchCache = Map<string, OmniRouteFetchCacheEntry>;

/**
 * Build the ProviderHook portion of the plugin for a given options bag.
 * Exported standalone so the contract is unit-testable without faking the
 * full PluginInput / Hooks surface, and so multi-instance setups can each
 * own their own cache (a fresh hook closure per plugin tuple).
 *
 * Behavioural contract:
 *   - `id` binds to the resolved `providerId` (multi-instance: each plugin
 *     tuple's hook lists models under its own provider id).
 *   - `models(provider, ctx)` extracts the api key from `ctx.auth` (rejecting
 *     non-`api` flavors with `{}` — same posture as the auth loader); calls
 *     both `/v1/models` and `/api/combos` fetchers; maps raw `/v1/models`
 *     entries through `mapRawModelToModelV2`; maps each `/api/combos` entry
 *     through `mapComboToModelV2` (LCD across its member models); merges
 *     combos into the same map under their combo id; caches the unified
 *     result by `(baseURL, sha256(apiKey))` for `modelCacheTtl`.
 *   - **Combo / model ID collisions: combos win.** OmniRoute treats combos
 *     as the curated routing surface; if a combo and a raw model share an
 *     id the operator's intent is clearly the combo. We emit a
 *     `console.warn` exactly once per `(baseURL, apiKey, comboId)`
 *     collision so the operator can spot the unusual naming choice
 *     without log spam on every cache refresh.
 *   - **Combos fetch failure does NOT break the catalog**: soft-fail with
 *     a `console.warn` and fall back to a models-only catalog. Rationale:
 *     `/api/combos` requires a management-scoped key and OmniRoute may
 *     not have any combos provisioned (preprod returned `{combos: []}`
 *     at probe time). Hard-failing the entire catalog when combos are
 *     optional would silently hide the whole provider from OC's model
 *     picker.
 *   - **`/v1/models` fetch failure DOES propagate.** Without models
 *     there's no catalog at all, so an empty `{}` would just mask the
 *     error.
 *   - Cache is in-memory per hook instance, shared between models and
 *     combos (one fetch pair per (baseURL, apiKey) per TTL refresh).
 *
 * @param opts Plugin options (providerId, baseURL, modelCacheTtl, …).
 * @param deps Dependency injection. `fetcher` defaults to the live
 *             `/v1/models` HTTP fetcher; `combosFetcher` defaults to the
 *             live `/api/combos` HTTP fetcher (override for tests / to
 *             disable combos by injecting one that returns `[]`). `now`
 *             defaults to `Date.now` (overridable for TTL tests). `cache`
 *             lets the caller share state across reconstructions (unused
 *             outside tests today).
 */
export function createOmniRouteProviderHook(
  opts?: OmniRoutePluginOptions,
  deps: {
    fetcher?: OmniRouteModelsFetcher;
    combosFetcher?: OmniRouteCombosFetcher;
    autoCombosFetcher?: OmniRouteAutoCombosFetcher;
    enrichmentFetcher?: OmniRouteEnrichmentFetcher;
    compressionMetaFetcher?: OmniRouteCompressionMetaFetcher;
    providersFetcher?: OmniRouteProvidersFetcher;
    now?: () => number;
    cache?: OmniRouteFetchCache;
  } = {}
): ProviderHook {
  const resolved = resolveOmniRoutePluginOptions(opts);
  const fetcher = deps.fetcher ?? defaultOmniRouteModelsFetcher;
  // T-05: combo discovery merges `/api/combos` entries into the same map as
  // `/v1/models`. Default fetcher is declared further down the file; the
  // reference resolves at hook-invocation time, not at hook-construction
  // time, so source-order beyond hoisting rules has no semantic effect.
  const combosFetcher = deps.combosFetcher ?? defaultOmniRouteCombosFetcher;
  const autoCombosFetcher = deps.autoCombosFetcher ?? defaultOmniRouteAutoCombosFetcher;
  const enrichmentFetcher = deps.enrichmentFetcher ?? defaultOmniRouteEnrichmentFetcher;
  const compressionMetaFetcher =
    deps.compressionMetaFetcher ?? defaultOmniRouteCompressionMetaFetcher;
  const providersFetcher = deps.providersFetcher ?? defaultOmniRouteProvidersFetcher;
  // Features defaults (mirror v0.1.0 behavior when unset).
  const features = resolved.features ?? {};
  const wantCombos = features.combos !== false;
  const wantAutoCombos = features.autoCombos !== false;
  const wantEnrichment = features.enrichment !== false;
  const wantCompressionMeta = features.compressionMetadata === true;
  const wantUsableOnly = features.usableOnly === true;
  const wantProviderTag = features.providerTag !== false;
  const now = deps.now ?? Date.now;
  // T-07: cache holds RAW fetch results (not pre-derived ModelV2) so that
  // the config-shim hook can share the same cache and derive its stripped
  // sibling shape from the same source without a second round-trip.
  const cache: OmniRouteFetchCache = deps.cache ?? new Map();
  // T-05: collision-warning deduper. Emit warn once per (cacheKey, comboId)
  // tuple per hook instance so the operator sees the unusual naming choice
  // once per session, not once per cache refresh.
  const collisionWarned = new Set<string>();

  return {
    id: resolved.providerId,
    async models(_provider, ctx) {
      // Auth narrowing — same posture as the auth loader (T-02). Non-api
      // flavors and empty keys → empty catalog. OC then exposes the
      // /connect flow rather than spamming /v1/models with bad creds.
      const auth = ctx?.auth;
      if (
        !auth ||
        typeof auth !== "object" ||
        (auth as { type?: unknown }).type !== "api" ||
        typeof (auth as { key?: unknown }).key !== "string" ||
        (auth as { key: string }).key.length === 0
      ) {
        return {};
      }
      const apiKey = (auth as { key: string }).key;

      // baseURL resolution: plugin opts first, then credential-attached
      // baseURL (auth backends sometimes stash it next to the key), then the
      // provider config itself — a baseURL set via opencode.json provider
      // options (or a config hook) lands on `provider.options` and is not
      // visible through either of the first two links. No silent default to
      // localhost: a misconfigured plugin should surface a clear warning,
      // not phantom /v1/models calls. Cast through unknown because the Auth
      // union (OAuth | ApiAuth | WellKnownAuth) doesn't declare baseURL on
      // any branch — we duck-type it as a defensive extension point.
      const authBaseURL = (auth as unknown as { baseURL?: unknown }).baseURL;
      const providerBaseURL = (_provider as { options?: { baseURL?: unknown } } | undefined)
        ?.options?.baseURL;
      const baseURL =
        resolved.baseURL ??
        (typeof authBaseURL === "string" && authBaseURL.length > 0 ? authBaseURL : undefined) ??
        (typeof providerBaseURL === "string" && providerBaseURL.length > 0
          ? providerBaseURL
          : undefined) ??
        "";
      if (!baseURL) {
        console.warn(
          `[omniroute-plugin] provider.models(${resolved.providerId}): ` +
            `no baseURL resolvable — checked plugin opts, auth.json, and provider config. ` +
            `Set baseURL in opencode.json plugin options or run \`opencode connect ${resolved.providerId}\` with a baseURL.`
        );
        return {};
      }

      const cacheKey = modelsCacheKey(baseURL, apiKey);
      const t = now();
      const cached = cache.get(cacheKey);

      let rawModels: OmniRouteRawModelEntry[];
      let rawCombos: OmniRouteRawCombo[];
      let rawAutoCombos: OmniRouteRawAutoCombo[];
      let rawEnrichment: OmniRouteEnrichmentMap;
      let rawCompressionCombos: OmniRouteCompressionCombo[];
      let rawConnections: OmniRouteProviderConnection[];
      if (cached && cached.expiresAt > t) {
        rawModels = cached.rawModels;
        rawCombos = cached.rawCombos;
        rawAutoCombos = cached.rawAutoCombos;
        rawEnrichment = cached.rawEnrichment;
        rawCompressionCombos = cached.rawCompressionCombos;
        rawConnections = cached.rawConnections;
      } else {
        // Models fetch is required (no catalog otherwise → silent provider
        // disappearance). We do NOT wrap this in a try; let the error
        // propagate to OC's UI.
        rawModels = await fetcher(baseURL, apiKey, 10_000);

        // T-05: combos fetch is best-effort, gated by features.combos.
        // Soft-fail on any error: emit a console.warn and fall back to a
        // models-only catalog. Rationale: /api/combos requires a
        // management-scoped key and OmniRoute may not have any combos
        // provisioned. Hard-failing when combos are optional would
        // silently hide the whole provider from OC's picker.
        rawCombos = [];
        if (wantCombos) {
          try {
            rawCombos = await combosFetcher(baseURL, apiKey, 10_000);
          } catch (err) {
            console.warn(
              "[omniroute-plugin] combos fetch failed, falling back to models-only catalog",
              err
            );
          }
        }

        // Auto combos fetch — virtual server-side combos. Best-effort,
        // gated by features.autoCombos. Soft-fails silently (the endpoint
        // may not exist yet on older OmniRoute versions).
        rawAutoCombos = [];
        if (wantAutoCombos) {
          try {
            rawAutoCombos = await autoCombosFetcher(baseURL, apiKey, 5_000);
          } catch {
            // Already handled inside the default fetcher — this catch
            // is belt-and-suspenders for injected stubs.
          }
        }

        // Enrichment fetch (nice names + pricing). Best-effort, gated by
        // features.enrichment. Soft-fails to empty map.
        rawEnrichment = new Map();
        if (wantEnrichment) {
          try {
            rawEnrichment = await enrichmentFetcher(baseURL, apiKey, 10_000);
          } catch (err) {
            console.warn(
              "[omniroute-plugin] enrichment fetch failed, falling back to raw ids",
              err
            );
          }
        }

        // Compression metadata fetch. Off by default, gated by
        // features.compressionMetadata. Soft-fails to empty array.
        rawCompressionCombos = [];
        if (wantCompressionMeta) {
          try {
            rawCompressionCombos = await compressionMetaFetcher(baseURL, apiKey, 10_000);
          } catch (err) {
            console.warn("[omniroute-plugin] compression-metadata fetch failed", err);
          }
        }

        // Provider-connections fetch. Off by default, gated by
        // features.usableOnly. Soft-fails to empty array — when the
        // connection table is unreadable we skip the filter entirely
        // (subtract-filter semantics: don't drop everything we couldn't
        // verify).
        rawConnections = [];
        if (wantUsableOnly) {
          try {
            rawConnections = await providersFetcher(baseURL, apiKey, 10_000);
          } catch (err) {
            console.warn(
              "[omniroute-plugin] /api/providers fetch failed; usableOnly filter disabled for this refresh",
              err
            );
          }
        }

        cache.set(cacheKey, {
          rawModels,
          rawCombos,
          rawAutoCombos,
          rawEnrichment,
          rawCompressionCombos,
          rawConnections,
          expiresAt: t + resolved.modelCacheTtl,
        });

        // Debug breadcrumb: surface fetch result so operators can confirm
        // the dynamic pipeline fired and how much catalog OmniRoute returned.
        // Emitted once per cache miss (TTL refresh) — quiet on cache hits.
        console.warn(
          `[omniroute-plugin] catalog refreshed for providerId=${resolved.providerId} baseURL=${baseURL}: ` +
            `${rawModels.length} models + ${rawCombos.length} combos + ` +
            `${rawEnrichment.size} enrichment entries + ` +
            `${rawCompressionCombos.length} compression combos + ` +
            `${rawConnections.length} connections ` +
            `(TTL=${resolved.modelCacheTtl}ms)`
        );

        // ── Startup debug: deep-dive into enrichment + auto combos ──────
        if (resolved.features?.startupDebug === true) {
          await writeStartupDiagnostics({
            providerId: resolved.providerId,
            baseURL,
            modelCount: rawModels.length,
            comboCount: rawCombos.length,
            enrichmentSize: rawEnrichment.size,
            autoComboCount: rawAutoCombos.length,
            enrichment: rawEnrichment,
            autoCombos: rawAutoCombos,
          });
        }
      }

      // Lookup index for LCD member resolution: O(1) per member lookup.
      // Indexed by raw model `id` — combo steps reference this exact
      // string per ComboModelStep in src/lib/combos/steps.ts.
      const rawModelById = new Map<string, OmniRouteRawModelEntry>();
      for (const entry of rawModels) {
        if (entry.id) rawModelById.set(entry.id, entry);
      }

      // usableOnly filter — compute the set of usable alias prefixes once
      // per refresh. Empty when feature is off OR connection fetch failed
      // OR no connections returned, in which case we keep everything
      // (subtract-filter semantics: only drop when we can prove a prefix
      // is NOT usable; never hide the catalog on a soft-fail).
      const usable =
        wantUsableOnly && rawConnections.length > 0
          ? usableProviderAliasSet(rawConnections, rawEnrichment)
          : undefined;

      // Build the canonical→alias reverse map AND the canonical-dedup
      // set once per refresh. Together they fix the dual-keyed
      // `/v1/models` problem where the same model surfaces under BOTH
      // `<alias>/<id>` (enriched) AND `<canonical>/<id>` (raw): we keep
      // the alias key and skip the canonical twin entirely.
      const canonicalToAlias = buildCanonicalToAliasMap(rawEnrichment);
      const canonicalDedup = canonicalDedupSet(rawModels, canonicalToAlias);
      const aliasIndex = buildAliasIndex(rawEnrichment);

      // Map raw models → ModelV2 keyed by id. When enrichment data is
      // present (features.enrichment, default on), overlay the nicer
      // display name + pricing from /api/pricing/models via the
      // alias-fallback lookup chain (covers canonical rows lacking
      // direct pricing entries).
      const models: Record<string, ModelV2> = {};
      for (const entry of rawModels) {
        if (!entry.id) continue;
        if (canonicalDedup.has(entry.id)) continue;
        if (usable && !isUsableRawModelId(entry.id, usable, rawEnrichment)) continue;
        const model = mapRawModelToModelV2(entry, {
          providerId: resolved.providerId,
          baseURL,
          apiFormat: resolved.features?.apiFormat,
        });
        const enrichEntry = lookupEnrichment(entry.id, rawEnrichment, canonicalToAlias);
        applyEnrichment(model, enrichEntry);
        // Prepend upstream provider label (e.g. `Claude - Claude Opus 4.7`)
        // so the picker groups same-model rows by upstream connection.
        // Idempotent + gated by `features.providerTag` (default-on).
        // Combos skip this on purpose. The alias-index fallback rescues
        // raw rows like `cohere/rerank-multilingual-v3.0` whose specific
        // model id isn't in `/api/pricing/models` but whose slot is.
        if (wantProviderTag) {
          const tagEntry = resolveProviderTagEntry(
            entry.id,
            enrichEntry,
            aliasIndex,
            canonicalToAlias
          );
          applyProviderTag(model, tagEntry);
        }
        models[entry.id] = model;
      }

      // Default compression combo (used to decorate ALL combo names when
      // compression metadata is present). OmniRoute returns at most one
      // entry with `isDefault: true` per /api/context/combos.
      const defaultCompression = wantCompressionMeta
        ? rawCompressionCombos.find((c) => c.isDefault === true)
        : undefined;

      // T-05: map raw combos → ModelV2. Skip hidden combos (operator
      // preference — provisioned but intentionally not surfaced).
      // Resolve each combo's member step list into the matching raw
      // model entries; unknown member ids are silently dropped before
      // mapComboToModelV2 sees them, which then degrades to the
      // all-false LCD posture if zero members remain.
      //
      // Combos are keyed under the `combo/<slug>` namespace so the TUI
      // picker separates them from provider/model pairs and the UUID
      // never surfaces. This mirrors `buildStaticProviderEntry` so the
      // static + dynamic catalogs publish identical keys.
      const comboNames = new Set<string>();
      for (const combo of rawCombos) {
        if (!combo || combo.isHidden === true) continue;
        const n = combo.name && combo.name.trim().length > 0 ? combo.name.trim() : combo.id;
        if (typeof n === "string" && n.length > 0) comboNames.add(n);
      }
      for (const key of Object.keys(models)) {
        if (comboNames.has(key)) delete models[key];
      }

      // ── Combo LCD across nested combo-refs (T-NN) ───────────────────────
      // Combos can nest other combos via `kind: "combo-ref"` members
      // (e.g. MASTER-LIGHT contains OldLLM, KIRO, Opecode Zen FREE). The
      // nested combo's own `limit.context` is computed below in this same
      // loop, so we need a fixpoint iteration: if a combo-ref points at a
      // combo not yet processed, defer this combo and try again after the
      // sibling combos catch up. We bound the retries so a circular combo
      // graph can't deadlock the picker.
      const MAX_COMBO_PASSES = 8;
      const usedComboKeys = new Set<string>();
      // Combos in `rawCombos` that still need (re)processing this round.
      // Shrinks as combos resolve.
      let pending = rawCombos.filter((combo) => {
        if (!combo.id) return false;
        if (combo.isHidden === true) return false;
        if (usable && !isUsableCombo(combo, usable)) return false;
        return true;
      });
      // Resolved nested combos keyed by their friendly name, so parent
      // combos that reference them via combo-ref can lift the full
      // capability vector (not just the context window) into their own
      // LCD pass.
      const resolvedComboModelsByName = new Map<string, ModelV2>();

      for (let pass = 0; pass < MAX_COMBO_PASSES && pending.length > 0; pass++) {
        const stillPending: typeof pending = [];
        for (const combo of pending) {
          const memberSteps = Array.isArray(combo.models) ? combo.models : [];
          const memberEntries: OmniRouteRawModelEntry[] = [];
          let deferredThisPass = false;

          for (const step of memberSteps) {
            // Unknown-bridge: ComboMemberRef's DTS type only declares
            // `model?: string`, so verify the runtime shape before reading
            // either `model` (raw member) or `comboName` (nested combo).
            const stepKind = (step as unknown as { kind?: unknown }).kind;

            if (stepKind === "combo-ref") {
              const comboName = (step as unknown as { comboName?: unknown }).comboName;
              if (typeof comboName !== "string" || comboName.length === 0) {
                continue;
              }
              const nestedModel = resolvedComboModelsByName.get(comboName);
              if (!nestedModel) {
                // Nested combo hasn't been processed yet. Defer this
                // combo to the next pass.
                deferredThisPass = true;
                break;
              }
              // Synthesize a member entry that contributes only the
              // nested combo's pre-computed context_length + max_output.
              // Other capability axes default conservatively (no tool
              // calls, no vision) — a nested combo's modalities are an
              // OR, but if we let raw-model defaults leak in we'd
              // over-claim. The combo's own LCD (computed by
              // mapComboToModelV2 from the synthesized entries) will only
              // further restrict capabilities, so this is safe.
              // Synthesize a member entry carrying the nested combo's
              // pre-computed context + capabilities + modalities so the
              // parent combo's LCD is accurate across the whole graph
              // (not just its direct raw-model members).
              const inputModalities: string[] = [];
              if (nestedModel.capabilities.input.text) inputModalities.push("text");
              if (nestedModel.capabilities.input.audio) inputModalities.push("audio");
              if (nestedModel.capabilities.input.image) inputModalities.push("image");
              if (nestedModel.capabilities.input.video) inputModalities.push("video");
              if (nestedModel.capabilities.input.pdf) inputModalities.push("pdf");

              const outputModalities: string[] = [];
              if (nestedModel.capabilities.output.text) outputModalities.push("text");
              if (nestedModel.capabilities.output.audio) outputModalities.push("audio");
              if (nestedModel.capabilities.output.image) outputModalities.push("image");
              if (nestedModel.capabilities.output.video) outputModalities.push("video");
              if (nestedModel.capabilities.output.pdf) outputModalities.push("pdf");

              memberEntries.push({
                id: `combo-ref:${comboName}`,
                context_length: nestedModel.limit.context,
                max_output_tokens: nestedModel.limit.output,
                max_input_tokens: nestedModel.limit.input ?? 0,
                owned_by: "combo",
                input_modalities: inputModalities,
                output_modalities: outputModalities,
                capabilities: {
                  temperature: nestedModel.capabilities.temperature,
                  reasoning: nestedModel.capabilities.reasoning,
                  thinking: nestedModel.capabilities.interleaved,
                  attachment: nestedModel.capabilities.attachment,
                  tool_calling: nestedModel.capabilities.toolcall,
                },
              } as unknown as OmniRouteRawModelEntry);
              continue;
            }

            const modelId = (step as unknown as { model?: unknown }).model;
            if (typeof modelId !== "string" || modelId.length === 0) continue;
            const member = rawModelById.get(modelId);
            if (member) memberEntries.push(member);
          }

          if (deferredThisPass) {
            stillPending.push(combo);
            continue;
          }

          const mapped = mapComboToModelV2(
            combo,
            memberEntries,
            resolved.providerId,
            baseURL,
            features.apiFormat
          );
          const hasMembers = memberEntries.length > 0;

          // Apply enrichment overlay to combos too (OmniRoute's
          // /api/pricing/models surfaces combos alongside provider-scoped
          // models with curated names).
          applyEnrichment(mapped, rawEnrichment.get(combo.id));

          // unroutable combo would mislead the picker.
          if (hasMembers && defaultCompression && defaultCompression.pipeline.length > 0) {
            const tag = formatCompressionPipeline(defaultCompression.pipeline);
            if (tag.length > 0 && !mapped.name.includes(tag)) {
              mapped.name = `${mapped.name} ${tag}`;
            }
          }

          const comboKey = buildComboKey(combo, usedComboKeys);

          // Collision policy: combos win. Warn ONCE per (cacheKey, comboKey)
          // when overwriting a same-key raw model so the operator can spot
          // the unusual naming choice without log spam.
          if (Object.prototype.hasOwnProperty.call(models, comboKey)) {
            const dedupeKey = `${cacheKey}::${comboKey}`;
            if (!collisionWarned.has(dedupeKey)) {
              collisionWarned.add(dedupeKey);
              console.warn(
                `[omniroute-plugin] combo key "${comboKey}" collides with a model id; combo wins.`
              );
            }
          }
          models[comboKey] = mapped;

          // Make this combo's resolved model available to parent combos
          // that reference it via combo-ref. Use the friendly name
          // (combo.name) since that's the lookup key on the parent side.
          const lookupName =
            combo.name && combo.name.trim().length > 0 ? combo.name.trim() : combo.id;
          resolvedComboModelsByName.set(lookupName, mapped);
        }
        if (stillPending.length === pending.length) break;
        pending = stillPending;
      }

      if (pending.length > 0) {
        console.warn(
          `[omniroute-plugin] ${pending.length} combo(s) could not resolve all nested combo-refs after ${MAX_COMBO_PASSES} passes; they will advertise context=0 to avoid over-claiming.`
        );
      }

      // ── Auto combos in dynamic catalog ────────────────────────────────
      // Convert virtual auto combos from /api/combos/auto into ModelV2
      // entries so they appear in the dynamic provider.models() path
      // (used by OpenCode ≥1.14.49).
      if (rawAutoCombos.length > 0) {
        for (const autoCombo of rawAutoCombos) {
          if (!autoCombo || !autoCombo.id) continue;
          if (autoCombo.isHidden === true) continue;
          const entry = mapAutoComboToStaticEntry(autoCombo);
          const key = autoComboModelId(autoCombo.variant);
          const mapped: ModelV2 = {
            id: key,
            name: entry.name,
            capabilities: {
              temperature: entry.temperature ?? true,
              reasoning: entry.reasoning ?? false,
              attachment: entry.attachment ?? false,
              toolcall: entry.tool_call ?? false,
              input: {
                text: true,
                audio: false,
                image: false,
                video: false,
                pdf: false,
              },
              output: {
                text: true,
                audio: false,
                image: false,
                video: false,
                pdf: false,
              },
              interleaved: false,
            },
            cost: {
              input: 0,
              output: 0,
              cache: { read: 0, write: 0 },
            },
            limit: {
              context: entry.limit?.context ?? 0,
              output: entry.limit?.output ?? 0,
            },
            api: {
              id: "openai-compatible",
              url: ensureV1Suffix(baseURL),
              npm: "@ai-sdk/openai-compatible",
            },
            status: "active",
            release_date: "",
            providerID: resolved.providerId,
            options: {},
            headers: {},
          };
          models[key] = mapped;
        }
      }

      return models;
    },
  };
}

// ────────────────────────────────────────────────────────────────────────────
// Fetch interceptor (T-04) — Bearer + Content-Type injection on outbound
// provider requests targeting the configured OmniRoute baseURL
// ────────────────────────────────────────────────────────────────────────────

/**
 * Build a `fetch`-compatible interceptor that injects `Authorization: Bearer`
 * (and a default `Content-Type`) onto outbound requests targeting the given
 * `baseURL`. Requests to any other host pass through untouched — the apiKey
 * is treated as a secret bound to the configured OmniRoute instance and
 * MUST NOT leak to third-party endpoints (a vector AI-SDKs occasionally
 * exercise when a tool call rewrites the URL mid-flight).
 *
 * Ported from Alph4d0g's `opencode-omniroute-auth@1.2.1` `createFetchInterceptor`
 * (their `dist/src/plugin.js:477-516`) with these intentional deviations:
 *
 *   - **`baseURL` is required** here (no `localhost:20128/v1` fallback). T-04
 *     callers always have an authoritative baseURL (from plugin opts or
 *     auth.json); a silent local default would be a footgun.
 *   - **Content-Type defaulting is gated on `init.body` presence**. Their
 *     version unconditionally sets `application/json` even on `GET /v1/models`,
 *     which is harmless but noisy; we only set it when there's a body to
 *     describe.
 *   - **Gemini schema sanitisation is NOT applied here** — that's T-06's
 *     responsibility and will land as a body-transform step inside this
 *     same function (or as a thin wrapper around it).
 *   - **Header merge strategy mirrors theirs**: Request-attached headers
 *     first, then `init.headers` overlay, then our injected
 *     Authorization/Content-Type — so the apiKey we own ALWAYS wins over
 *     any caller-supplied Bearer for the same OmniRoute provider.
 *
 * @see https://opencode.ai/docs/plugins for the AuthLoaderResult.fetch contract
 *      (the returned function is invoked by the AI-SDK in lieu of global fetch).
 */
export function createOmniRouteFetchInterceptor(config: {
  apiKey: string;
  baseURL: string;
}): typeof fetch {
  const trimmed = trimTrailingSlashes(config.baseURL);
  // Use `<base>/` for prefix matching to prevent suffix-spoof attacks
  // (e.g. baseURL `https://or.example.com/v1` should NOT match
  // `https://or.example.com/v1-attacker.evil/...`).
  const prefix = `${trimmed}/`;
  return async (input, init = {}) => {
    const url =
      typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;

    const targetsOmniRoute = url === trimmed || url.startsWith(prefix);
    if (!targetsOmniRoute) {
      return fetch(input, init);
    }

    // Merge order: Request-attached headers (when input is a Request) →
    // init.headers overlay → our injected headers last (so we win).
    const headers = new Headers(input instanceof Request ? input.headers : undefined);
    if (init.headers) {
      const initHeaders = new Headers(init.headers);
      initHeaders.forEach((value, key) => {
        headers.set(key, value);
      });
    }

    headers.set("Authorization", `Bearer ${config.apiKey}`);
    // Only default Content-Type when the caller actually has a body AND
    // hasn't already declared the media type themselves.
    const hasBody = init.body != null || input instanceof Request;
    if (!headers.has("Content-Type") && hasBody) {
      headers.set("Content-Type", "application/json");
    }

    return fetch(input, { ...init, headers });
  };
}

// ────────────────────────────────────────────────────────────────────────────
// Gemini tool-schema sanitisation (T-06) — strip JSON-schema keywords that
// the Gemini API rejects from outbound chat-completion / responses bodies
// when the target model is a Gemini variant.
// ────────────────────────────────────────────────────────────────────────────

/**
 * JSON-Schema keywords that the Gemini API rejects when present anywhere in
 * a function-calling tool definition. Standard OpenAI / Anthropic clients
 * happily emit these (they're valid Draft-07 schema) but Gemini's tool
 * validator throws on them, breaking OmniRoute → Gemini chains transparently.
 *
 * Source: behavioural reverse-engineering from Alph4d0g's
 * opencode-omniroute-auth@1.2.1 (dist/src/plugin.js:517).
 */
const GEMINI_SCHEMA_KEYS_TO_REMOVE = new Set(["$schema", "$ref", "ref", "additionalProperties"]);

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * Recursively strip `GEMINI_SCHEMA_KEYS_TO_REMOVE` from an arbitrary
 * JSON-Schema-shaped record. Walks both the record's own properties and
 * any nested objects / arrays so deeply nested `properties.x.properties.y`
 * trees are reached without a separate traversal pass. Mutates in place
 * and reports whether any key was deleted so callers can skip a
 * `JSON.stringify` round-trip when nothing changed.
 */
function stripSchemaKeys(schema: Record<string, unknown>): boolean {
  let changed = false;
  for (const key of Object.keys(schema)) {
    if (GEMINI_SCHEMA_KEYS_TO_REMOVE.has(key)) {
      delete schema[key];
      changed = true;
      continue;
    }
    const value = schema[key];
    if (Array.isArray(value)) {
      for (const item of value) {
        if (isRecord(item)) {
          changed = stripSchemaKeys(item) || changed;
        }
      }
      continue;
    }
    if (isRecord(value)) {
      changed = stripSchemaKeys(value) || changed;
    }
  }
  return changed;
}

/**
 * Walk every tool definition in the payload and strip Gemini-incompatible
 * schema keywords. Handles both chat-completion shape
 * (`tools[].function.parameters`) and Responses-API shape
 * (`tools[].input_schema`), plus the Gemini-native `function_declaration`
 * variant some adapters use.
 *
 * Also strips top-level schema keywords from the payload itself — clients
 * occasionally attach a top-level `$schema` declaration when re-serialising
 * tool bundles, and Gemini rejects those too.
 */
function sanitizeToolSchemaContainer(payload: Record<string, unknown>): boolean {
  let changed = false;
  // Top-level keyword strip — covers payload-level `$schema` etc.
  for (const key of Object.keys(payload)) {
    if (GEMINI_SCHEMA_KEYS_TO_REMOVE.has(key)) {
      delete payload[key];
      changed = true;
    }
  }
  const tools = (payload as { tools?: unknown }).tools;
  if (!Array.isArray(tools)) {
    return changed;
  }
  for (const tool of tools) {
    if (!isRecord(tool)) continue;
    const fn = (tool as { function?: unknown }).function;
    if (isRecord(fn) && isRecord((fn as { parameters?: unknown }).parameters)) {
      changed = stripSchemaKeys(fn.parameters as Record<string, unknown>) || changed;
    }
    const fnDecl = (tool as { function_declaration?: unknown }).function_declaration;
    if (isRecord(fnDecl) && isRecord((fnDecl as { parameters?: unknown }).parameters)) {
      changed = stripSchemaKeys(fnDecl.parameters as Record<string, unknown>) || changed;
    }
    const inputSchema = (tool as { input_schema?: unknown }).input_schema;
    if (isRecord(inputSchema)) {
      changed = stripSchemaKeys(inputSchema) || changed;
    }
  }
  return changed;
}

/**
 * Pure function — recursively strip Gemini-incompatible JSON-Schema
 * keywords (`$schema`, `$ref`, `ref`, `additionalProperties`) from the
 * tool definitions on a chat-completions / responses payload.
 *
 * Walks:
 *   - `payload.tools[].function.parameters` (OpenAI chat-completions shape)
 *   - `payload.tools[].function_declaration.parameters` (Gemini-native shape
 *     some adapters round-trip)
 *   - `payload.tools[].input_schema` (Responses-API shape)
 *   - all `properties.<x>` (and `properties.<x>.properties.<y>`…) inside
 *     each container, recursing through nested objects and arrays.
 *   - top-level payload keys (some clients attach a payload-level `$schema`).
 *
 * Returns the cleaned payload. Does NOT mutate input — clones first via
 * `structuredClone` so callers can keep a reference to the original. If
 * the payload is not a record, or carries no tools and no top-level
 * stripped keys, returns a (still cloned) equivalent.
 *
 * Exported so the body-transform layer is unit-testable independent of the
 * fetch wrapper.
 */
export function sanitizeGeminiToolSchemas(payload: unknown): unknown {
  if (!isRecord(payload)) {
    // Non-record payloads (string, array, number, null) can't carry tool
    // schemas. Pass back the same value — there's nothing to clone-and-strip
    // and propagating the original keeps caller semantics simple.
    return payload;
  }
  // structuredClone is available in Node 18+; the package's engines field
  // already requires Node >=22.22.3 so we can rely on it without a
  // JSON round-trip fallback.
  const cloned = structuredClone(payload) as Record<string, unknown>;
  sanitizeToolSchemaContainer(cloned);
  return cloned;
}

/**
 * Detect whether a payload is bound for a Gemini model. Returns true if
 * `payload.model` is a string AND matches any known Gemini routing pattern:
 *
 *   - case-insensitive substring `gemini` (covers bare `gemini-1.5-pro`,
 *     `gemini-2.5-flash`, etc.)
 *   - `models/gemini-…` (Google Generative AI canonical id form)
 *   - `google-vertex/gemini-…` (OpenCode + AI-SDK Vertex routing prefix)
 *   - `gemini-cli/…` (real OmniRoute alias surfaced on b35 prod `/v1/models`)
 *
 * Liberal by design: a false positive (cleaning a payload that didn't
 * need cleaning) costs only a structuredClone + one walk; a false negative
 * breaks the whole chain by forwarding $schema/additionalProperties to
 * Gemini which throws 400 INVALID_ARGUMENT. The first three checks
 * collapse into the case-insensitive substring check, but they're
 * documented separately so future maintainers see the intent.
 *
 * Exported so callers and tests can probe detection independent of the
 * fetch wrapper.
 */
export function shouldSanitizeForGemini(payload: unknown): boolean {
  if (!isRecord(payload)) return false;
  const model = (payload as { model?: unknown }).model;
  if (typeof model !== "string") return false;
  return /gemini/i.test(model);
}

/**
 * Module-level latch so the streaming-body warning fires AT MOST once per
 * Node process. ReadableStream bodies can't be safely cloned + JSON-parsed
 * without consuming the stream (and re-creating a stream that survives both
 * read paths is non-trivial), so the sanitiser skips them — but we want
 * the operator to see one heads-up that schema stripping won't run on
 * those requests.
 */
let geminiStreamingWarningEmitted = false;

/**
 * Wrapper over an inner `fetch` that applies Gemini schema sanitisation to
 * outbound chat-completion / responses request bodies.
 *
 * Behaviour:
 *   - URL gate: only inspects requests whose URL path contains
 *     `/chat/completions` or `/responses` (lenient about prefix — works for
 *     `/v1/chat/completions`, `/openai/v1/chat/completions`, …).
 *   - Body extraction handles `string`, `Buffer` / `Uint8Array`,
 *     `URLSearchParams` (calls `.toString()`), `Blob` (`await .text()`),
 *     AND `Request` input where the body lives on the Request not init.
 *     `ReadableStream` bodies are skipped (see below).
 *   - Body must JSON.parse to a record; otherwise pass-through.
 *   - `shouldSanitizeForGemini` gates the actual transform — non-Gemini
 *     payloads pass through unchanged regardless of endpoint.
 *   - Fail-open: ANY error during extraction / parse / sanitise falls back
 *     to forwarding the original `(input, init)` to the inner fetch.
 *     Sanitisation is a best-effort guard, never a hard failure mode.
 *   - `ReadableStream` bodies → skipped with a ONE-TIME `console.warn`.
 *     The Gemini-quirk only manifests with tool calls in the body, and
 *     OC streams plain text deltas; the operator should still know.
 *
 * @param inner The next fetch in the chain (typically the Bearer-injecting
 *              interceptor from `createOmniRouteFetchInterceptor`).
 */
export function createGeminiSanitizingFetch(inner: typeof fetch): typeof fetch {
  return async (input, init) => {
    try {
      const url =
        typeof input === "string"
          ? input
          : input instanceof URL
            ? input.toString()
            : input instanceof Request
              ? input.url
              : "";

      // URL gate — match the path substring with prefix tolerance.
      const targetsCompletions = url.includes("/chat/completions") || url.includes("/responses");
      if (!targetsCompletions) {
        return inner(input, init);
      }

      // Body extraction. Cover the body shapes the AI-SDK + adapter layer
      // actually emit; bail to pass-through on anything we can't read
      // synchronously without consuming a stream.
      let rawBody: string | undefined;
      const initBody = init?.body as unknown;

      if (typeof initBody === "string") {
        rawBody = initBody;
      } else if (initBody instanceof URLSearchParams) {
        // Form-encoded bodies are never chat-completion JSON; pass-through.
        return inner(input, init);
      } else if (typeof Buffer !== "undefined" && initBody instanceof Buffer) {
        rawBody = initBody.toString("utf8");
      } else if (initBody instanceof Uint8Array) {
        rawBody = new TextDecoder().decode(initBody);
      } else if (initBody instanceof ReadableStream) {
        // Streaming body — skip with one-shot warning.
        if (!geminiStreamingWarningEmitted) {
          geminiStreamingWarningEmitted = true;

          console.warn(
            "[omniroute-plugin] sanitizeGemini: streaming Request body, skipping schema strip (Gemini may reject)"
          );
        }
        return inner(input, init);
      } else if (
        initBody !== null &&
        initBody !== undefined &&
        typeof (initBody as { text?: unknown }).text === "function"
      ) {
        // Blob-like (has .text(): Promise<string>). Streaming was already
        // matched above — anything left with a `.text` method we can buffer.
        try {
          rawBody = await (initBody as { text(): Promise<string> }).text();
        } catch {
          return inner(input, init);
        }
      } else if (initBody === undefined && input instanceof Request) {
        // Body lives on the Request object itself, not init. Clone before
        // reading — consuming the original Request body would make it
        // unreadable downstream.
        try {
          rawBody = await (input as Request).clone().text();
        } catch {
          return inner(input, init);
        }
      }

      if (rawBody === undefined || rawBody.length === 0) {
        return inner(input, init);
      }

      let payload: unknown;
      try {
        payload = JSON.parse(rawBody);
      } catch {
        // Non-JSON body → pass-through, never throw.
        return inner(input, init);
      }

      if (!shouldSanitizeForGemini(payload)) {
        return inner(input, init);
      }

      const cleaned = sanitizeGeminiToolSchemas(payload);
      const newBody = JSON.stringify(cleaned);
      // Cloning init: we need to replace `body` without mutating the caller's
      // init bag. If init was undefined (Request-input path), construct one.
      const newInit: RequestInit = { ...(init ?? {}), body: newBody };
      return inner(input, newInit);
    } catch {
      // Total fail-open — never let a sanitiser bug break the request path.
      return inner(input, init);
    }
  };
}

/**
 * Test-only hook: reset the module-level streaming-warning latch so each
 * test can independently assert the one-shot semantics. Not part of the
 * public stability contract — prefixed with `__` per convention to signal
 * "do not depend on this from production code".
 */
export function __resetGeminiStreamingWarning(): void {
  geminiStreamingWarningEmitted = false;
}

// ────────────────────────────────────────────────────────────────────────────
// Config hook (T-07) — backward-compat shim for OC ≤1.14.48
//
// OC ≤1.14.48 does NOT call `provider.models()` at startup; it reads the
// catalog from the static `provider.<id>` config block instead. OC ≥1.14.49
// calls `provider.models()` dynamically AND merges the dynamic catalog over
// any static block (dynamic wins on collision). To support both, the plugin
// publishes a static block via `config` AND a dynamic one via `provider.models`
// — OC's resolution order picks the right one per OC version. This module
// implements the static-publish half.
//
// Sibling shape source-of-truth: see
// `@omniroute/opencode-provider/src/index.ts` (`createOmniRouteProvider`,
// `OpenCodeProviderEntry`, `OpenCodeModelEntry`). We replicate that shape
// here rather than depending on the sibling package — the plugin must stay
// self-contained (npm-installable on its own, no peer dep on the provider
// builder).
// ────────────────────────────────────────────────────────────────────────────

/**
 * Per-model entry shape under `provider.<id>.models[modelId]`. Mirrors
 * `OpenCodeModelEntry` exported by `@omniroute/opencode-provider`. Stripped
 * down to the fields OC's static catalog reader actually consumes — NOT a
 * full ModelV2 (that's the dynamic-hook shape). Optional fields are omitted
 * when OmniRoute didn't surface a value, NOT emitted as `undefined` — the
 * resulting JSON must be diffable across OmniRoute deployments without
 * `undefined` noise.
 */
/** Modalities accepted by OC's static catalog reader (see `@opencode-ai/sdk`). */
export type OmniRouteModalityKind = "text" | "audio" | "image" | "video" | "pdf";

const STATIC_MODALITY_VALUES: ReadonlySet<OmniRouteModalityKind> = new Set([
  "text",
  "audio",
  "image",
  "video",
  "pdf",
]);

/** Normalise + filter raw modality list to the values OC accepts. Deduped. */
function normaliseModalities(raw: unknown): OmniRouteModalityKind[] {
  if (!Array.isArray(raw)) return [];
  const out: OmniRouteModalityKind[] = [];
  const seen = new Set<string>();
  for (const v of raw) {
    if (typeof v !== "string") continue;
    const lower = v.toLowerCase() as OmniRouteModalityKind;
    if (!STATIC_MODALITY_VALUES.has(lower)) continue;
    if (seen.has(lower)) continue;
    seen.add(lower);
    out.push(lower);
  }
  return out;
}

export interface OmniRouteStaticModelEntry {
  /** Display label rendered in OC's model picker. Defaults to the model id. */
  name: string;
  /** ISO date the model was released. Surfaces in OC's model card when present. */
  release_date?: string;
  /** Model accepts image / file attachments. */
  attachment?: boolean;
  /** Model exposes a reasoning / extended-thinking surface. */
  reasoning?: boolean;
  /** Model honours the `temperature` parameter. */
  temperature?: boolean;
  /** Model supports function / tool calling. */
  tool_call?: boolean;
  /**
   * Per-million-token cost. Maps from OmniRoute `/api/pricing` shape:
   * `input`/`output` pass through; `cached` → `cache_read`;
   * `cache_creation` → `cache_write`. Omitted when no pricing slot resolves.
   */
  cost?: {
    input: number;
    output: number;
    cache_read?: number;
    cache_write?: number;
  };
  /**
   * Context-window limits. OC's static reader requires both `context` AND
   * `output` when `limit` is present, so the field is only emitted when
   * BOTH are known.
   */
  limit?: {
    context: number;
    output: number;
  };
  /**
   * Modality lists the model accepts (input) and emits (output). Maps from
   * OmniRoute's `input_modalities` / `output_modalities` on `/v1/models`.
   * Emitted only when at least one modality is known — without this field
   * OC's runtime catalog defaults `input.image: false` even when the model
   * card has `attachment: true`, which blocks clipboard image paste in the
   * TUI for vision-capable models.
   */
  modalities?: {
    input: OmniRouteModalityKind[];
    output: OmniRouteModalityKind[];
  };
}

/**
 * Static `provider.<id>` block written to `input.provider` by the config hook.
 * Mirrors `OpenCodeProviderEntry` from `@omniroute/opencode-provider`.
 *
 *   - `npm` is always `"@ai-sdk/openai-compatible"` — OmniRoute exposes an
 *     OpenAI-compatible surface and that's the AI-SDK adapter that speaks it.
 *   - `options.baseURL` MUST be the fully-qualified `/v1` URL (the AI-SDK
 *     appends paths like `/chat/completions` directly under it).
 *   - `options.apiKey` is the bearer token; the fetch interceptor (T-04)
 *     also injects it on the dynamic path, but the static block needs it
 *     embedded too so OC ≤1.14.48 can construct the SDK client without
 *     going through the auth hook.
 */
export interface OmniRouteStaticProviderEntry {
  npm: "@ai-sdk/openai-compatible";
  name: string;
  options: {
    baseURL: string;
    apiKey: string;
  };
  models: Record<string, OmniRouteStaticModelEntry>;
}

/**
 * Build the static `provider.<id>` block from raw `/v1/models` + `/api/combos`
 * responses. Pure function — no I/O, no side effects, no dependency on the
 * sibling provider package. Exported so callers and tests can construct the
 * block independently of the auth.json + fetch pipeline.
 *
 * Mapping rules (per the sibling `createOmniRouteProvider` output spec):
 *
 *   - One entry per raw model AND one entry per non-hidden combo.
 *   - `name` = model id (no separate display name on `/v1/models`).
 *   - `attachment` = `caps.attachment ?? caps.vision ?? false` — same
 *     convention as `mapRawModelToModelV2` (T-03).
 *   - `reasoning` = `caps.reasoning || caps.thinking`. Booleans only — we
 *     do NOT emit the field when both source flags are absent (keeps the
 *     stripped shape minimal).
 *   - `temperature` = `caps.temperature ?? true` — OpenAI-compat surface
 *     supports temperature by default; only an explicit `false` suppresses.
 *   - `tool_call` = `caps.tool_calling ?? false`.
 *   - `limit.context` = raw `context_length` when > 0; omitted otherwise.
 *   - `limit.input` = raw `max_input_tokens` when present.
 *   - `limit.output` = raw `max_output_tokens` when present.
 *
 * For combos: LCD across member raw models (matches `mapComboToModelV2`):
 *
 *   - `attachment`, `reasoning`, `tool_call`, `temperature`: `every` member.
 *   - `limit.context` = min(member context_lengths).
 *   - `limit.input` = min(member max_input_tokens) ONLY when every member
 *     declares one.
 *   - `limit.output` = min(member max_output_tokens).
 *   - Empty members → all-false / limits omitted.
 *
 * Collision: combos win (matches the dynamic provider hook).
 *
 * @param rawModels Raw `/v1/models` entries (may be empty).
 * @param rawCombos Raw `/api/combos` entries (may be empty).
 * @param opts      Resolved plugin options (we read `displayName` + `providerId`).
 * @param baseURL   Fully-qualified `/v1` base URL — written verbatim to
 *                  `options.baseURL`. Caller is responsible for `/v1`
 *                  normalisation; we do NOT touch it here.
 * @param apiKey    Bearer token — written verbatim to `options.apiKey`.
 */
export function buildStaticProviderEntry(
  rawModels: OmniRouteRawModelEntry[],
  rawCombos: OmniRouteRawCombo[],
  opts: ReturnType<typeof resolveOmniRoutePluginOptions>,
  baseURL: string,
  apiKey: string,
  enrichment?: OmniRouteEnrichmentMap,
  compressionCombos?: OmniRouteCompressionCombo[],
  connections?: OmniRouteProviderConnection[],
  rawAutoCombos?: OmniRouteRawAutoCombo[]
): OmniRouteStaticProviderEntry {
  const models: Record<string, OmniRouteStaticModelEntry> = {};

  // usableOnly filter — compute once when feature enabled AND we have
  // connection data to filter against. Soft-fail (empty connections list)
  // disables the filter rather than hiding the catalog.
  const wantUsableOnly = opts.features?.usableOnly === true;
  const usable =
    wantUsableOnly && connections && connections.length > 0
      ? usableProviderAliasSet(connections, enrichment)
      : undefined;
  // Provider-tag suffix — default-on, opt-out via `features.providerTag: false`.
  // Prepends e.g. `Claude - ` to enriched raw-model names so the picker
  // can tell `cc/claude-opus-4-7` (Anthropic) apart from `kr/claude-opus-4-7`
  // (Kiro). Combos skip this by design.
  const wantProviderTag = opts.features?.providerTag !== false;

  // Build a name-set of every non-hidden combo from `/api/combos`. OmniRoute
  // pre-mirrors combos into `/v1/models` with the friendly name as the raw
  // id (e.g. `claude-primary`, `gemini-pro`), so without dedup the static
  // catalog ends up with both `claude-primary` (raw, opaque) AND the same
  // combo under `combo/claude-primary` (rich LCD). We suppress the raw twin
  // so each combo surfaces exactly once, under the `combo/` namespace.
  const comboNames = new Set<string>();
  for (const combo of rawCombos) {
    if (!combo || combo.isHidden === true) continue;
    const name = combo.name && combo.name.trim().length > 0 ? combo.name.trim() : combo.id;
    if (typeof name === "string" && name.length > 0) comboNames.add(name);
  }

  // Build the canonical→alias reverse map AND the canonical-dedup set
  // once per static-block construction. Same shape as the dynamic hook
  // so both catalogs publish identical keys (no `claude/X` raw twin
  // shadowing the enriched `cc/X` row).
  const canonicalToAlias = buildCanonicalToAliasMap(enrichment);
  const canonicalDedup = canonicalDedupSet(rawModels, canonicalToAlias);
  const aliasIndex = buildAliasIndex(enrichment);

  // Raw model entries → stripped per-model shape.
  for (const raw of rawModels) {
    if (!raw.id) continue;
    // Skip the 20 named no-slash entries that shadow combos under the
    // `combo/<name>` namespace. We keep `codex-auto-review` and any other
    // future no-slash raw entry that doesn't have a matching combo.
    if (comboNames.has(raw.id)) continue;
    // Skip canonical-named twins when the alias-keyed enriched row exists.
    if (canonicalDedup.has(raw.id)) continue;
    if (usable && !isUsableRawModelId(raw.id, usable, enrichment)) continue;
    const caps = raw.capabilities ?? {};
    // Enrichment overlay: `/api/pricing/models` carries human display names
    // (e.g. "Claude Opus 4.7" for raw id "cc/claude-opus-4-7"). The OC TUI
    // model picker reads this `name` straight from the static block on
    // OC ≤1.15.5 where the dynamic provider hook never fires. Falls back
    // to the raw id when no enrichment entry is found. The alias-fallback
    // lookup rescues `<canonical>/<id>` rows whose enrichment indexed only
    // under `<alias>/<id>`.
    const enrichmentEntry = lookupEnrichment(raw.id, enrichment, canonicalToAlias);
    const enrichmentName = enrichmentEntry?.name;
    let displayName = enrichmentName && enrichmentName.length > 0 ? enrichmentName : raw.id;
    // Provider-tag PREFIX — `<label> - <name>` so the picker groups by
    // upstream provider when scanning a column of model names. Mirrors
    // `applyProviderTag` used in the dynamic hook. Idempotent: skip
    // when the name already starts with the prefix. The alias-index
    // fallback rescues raw rows like `cohere/rerank-multilingual-v3.0`
    // whose specific model id isn't in `/api/pricing/models` but whose
    // slot is.
    if (wantProviderTag) {
      const tagEntry = resolveProviderTagEntry(
        raw.id,
        enrichmentEntry,
        aliasIndex,
        canonicalToAlias
      );
      const label = shortProviderLabel(tagEntry);
      if (label) {
        const prefix = `${label}${PROVIDER_TAG_SEPARATOR}`;
        if (!displayName.startsWith(prefix)) displayName = `${prefix}${displayName}`;
      }
    }
    const entry: OmniRouteStaticModelEntry = { name: displayName };

    const attachment = caps.attachment ?? caps.vision;
    if (typeof attachment === "boolean") entry.attachment = attachment;

    if (typeof caps.reasoning === "boolean" || typeof caps.thinking === "boolean") {
      entry.reasoning = Boolean(caps.reasoning || caps.thinking);
    }

    if (typeof caps.temperature === "boolean") {
      entry.temperature = caps.temperature;
    }

    if (typeof caps.tool_calling === "boolean") {
      entry.tool_call = caps.tool_calling;
    }

    // OC's SDK schema requires BOTH `context` and `output` when `limit` is
    // present. We previously emitted `limit.input` too, but the SDK reader
    // doesn't accept it — drop it. Only emit `limit` when both required
    // values are known.
    if (
      typeof raw.context_length === "number" &&
      raw.context_length > 0 &&
      typeof raw.max_output_tokens === "number" &&
      raw.max_output_tokens > 0
    ) {
      entry.limit = {
        context: raw.context_length,
        output: raw.max_output_tokens,
      };
    }

    // Modalities — emit when OmniRoute surfaced any. Without this field
    // OC's runtime model defaults `input.image: false` even for vision-
    // capable models, blocking clipboard image paste in the TUI.
    const inModalities = normaliseModalities(raw.input_modalities);
    const outModalities = normaliseModalities(raw.output_modalities);
    if (inModalities.length > 0 || outModalities.length > 0) {
      entry.modalities = {
        input: inModalities.length > 0 ? inModalities : ["text"],
        output: outModalities.length > 0 ? outModalities : ["text"],
      };
    }

    // Cost from enrichment pricing (sourced from `/api/pricing`). Map
    // OmniRoute field names to OC's static-schema field names.
    const pricing = enrichmentEntry?.pricing;
    if (pricing && (typeof pricing.input === "number" || typeof pricing.output === "number")) {
      const cost: NonNullable<OmniRouteStaticModelEntry["cost"]> = {
        input: typeof pricing.input === "number" ? pricing.input : 0,
        output: typeof pricing.output === "number" ? pricing.output : 0,
      };
      if (typeof pricing.cacheRead === "number") cost.cache_read = pricing.cacheRead;
      if (typeof pricing.cacheWrite === "number") cost.cache_write = pricing.cacheWrite;
      entry.cost = cost;
    }

    // release_date from /v1/models — surfaces in OC's model card when present.
    if (typeof raw.release_date === "string" && raw.release_date.length > 0) {
      entry.release_date = raw.release_date;
    }

    models[raw.id] = entry;
  }

  // Combo entries → stripped LCD shape. Each combo is keyed as
  // `combo/<friendly-name>` so the OC TUI model picker shows them under a
  // distinct namespace (e.g. `combo/claude-primary`) instead of the opaque
  // upstream UUID id (e.g. `b4a0211e-e3e1-472d-b252-fb9bf6d1c935`).
  const rawModelById = new Map<string, OmniRouteRawModelEntry>();
  for (const m of rawModels) {
    if (m.id) rawModelById.set(m.id, m);
  }

  // Resolve the default compression pipeline once — its short signature
  // (e.g. `[rtk:standard → caveman:full]`) is appended to every routable
  // combo `name` so operators can see what compression a combo applies
  // at a glance. Provider hook does the same decoration when feature is
  // on. Suffix is suppressed for combos with no resolvable members —
  // claiming compression on an unroutable combo would mislead the
  // picker.
  let compressionSuffix = "";
  if (compressionCombos && compressionCombos.length > 0) {
    const def = compressionCombos.find((c) => c.isDefault === true);
    if (def) {
      const sig = formatCompressionPipeline(def.pipeline);
      if (sig.length > 0) compressionSuffix = ` ${sig}`;
    }
  }

  // Track combo keys to detect slug collisions across the catalog.
  const usedComboKeys = new Set<string>();
  const reportedCollisions = new Set<string>();

  // ── Combo LCD across nested combo-refs (T-NN mirror) ─────────────────
  // Mirror of the dynamic-catalog fixpoint iteration: combos can nest
  // other combos via `kind: "combo-ref"` members (e.g. MASTER-LIGHT
  // contains OldLLM, KIRO, Opecode Zen FREE). The nested combo's own
  // capabilities and limits are computed in this same loop, so we need
  // a fixpoint pass: if a combo-ref points at a combo not yet processed,
  // defer this combo and try again after the sibling combos catch up.
  // We bound the retries so a circular combo graph can't deadlock the
  // picker, and we break early when a pass makes no progress.
  const MAX_STATIC_COMBO_PASSES = 8;
  const resolvedStaticCombosByName = new Map<string, OmniRouteStaticModelEntry>();
  let pendingStatic = rawCombos.filter((combo) => {
    if (!combo.id) return false;
    if (combo.isHidden === true) return false;
    if (usable && !isUsableCombo(combo, usable)) return false;
    return true;
  });

  for (let pass = 0; pass < MAX_STATIC_COMBO_PASSES && pendingStatic.length > 0; pass++) {
    const stillPendingStatic: typeof pendingStatic = [];
    for (const combo of pendingStatic) {
      const memberSteps = Array.isArray(combo.models) ? combo.models : [];
      const memberEntries: OmniRouteRawModelEntry[] = [];
      let deferredThisPass = false;

      for (const step of memberSteps) {
        const stepKind = (step as unknown as { kind?: unknown }).kind;

        if (stepKind === "combo-ref") {
          const comboName = (step as unknown as { comboName?: unknown }).comboName;
          if (typeof comboName !== "string" || comboName.length === 0) {
            continue;
          }
          const nestedEntry = resolvedStaticCombosByName.get(comboName);
          if (!nestedEntry) {
            deferredThisPass = true;
            break;
          }
          // Synthesize a raw-model-shaped member entry carrying the
          // nested combo's pre-computed context + capabilities +
          // modalities. Mirrors the dynamic path so the static catalog
          // stays in lockstep with the dynamic one.
          const inputModalities = (nestedEntry.modalities?.input ?? ["text"]) as string[];
          const outputModalities = (nestedEntry.modalities?.output ?? ["text"]) as string[];
          memberEntries.push({
            id: `combo-ref:${comboName}`,
            context_length: nestedEntry.limit?.context ?? 0,
            max_output_tokens: nestedEntry.limit?.output ?? 0,
            max_input_tokens: 0,
            owned_by: "combo",
            input_modalities: inputModalities,
            output_modalities: outputModalities,
            capabilities: {
              temperature: nestedEntry.temperature,
              reasoning: nestedEntry.reasoning,
              thinking: nestedEntry.reasoning,
              attachment: nestedEntry.attachment,
              tool_calling: nestedEntry.tool_call,
            },
          } as unknown as OmniRouteRawModelEntry);
          continue;
        }

        const modelId = (step as unknown as { model?: unknown }).model;
        if (typeof modelId !== "string" || modelId.length === 0) continue;
        const member = rawModelById.get(modelId);
        if (member) memberEntries.push(member);
      }

      if (deferredThisPass) {
        stillPendingStatic.push(combo);
        continue;
      }

      const hasMembers = memberEntries.length > 0;
      const friendlyName =
        combo.name && combo.name.trim().length > 0 ? combo.name.trim() : combo.id;
      const displayName =
        hasMembers && compressionSuffix ? `${friendlyName} ${compressionSuffix}` : friendlyName;
      const entry: OmniRouteStaticModelEntry = { name: displayName };

      if (hasMembers) {
        // LCD across capabilities — every member must support for the combo
        // to support. Mirrors mapComboToModelV2.
        entry.attachment = memberEntries.every((m) =>
          Boolean(m.capabilities?.attachment ?? m.capabilities?.vision ?? false)
        );
        entry.reasoning = memberEntries.every((m) =>
          Boolean(m.capabilities?.reasoning || m.capabilities?.thinking)
        );
        entry.temperature = memberEntries.every(
          (m) => (m.capabilities?.temperature ?? true) !== false
        );
        entry.tool_call = memberEntries.every((m) =>
          Boolean(m.capabilities?.tool_calling ?? false)
        );

        // LCD across limits — min over declared values. OC's SDK static schema
        // accepts only `context` + `output` on `limit`, so we drop the legacy
        // `input` emission. Emit only when BOTH context AND output are known
        // across at least one member (mirrors the required-field constraint).
        const contextValues = memberEntries
          .map((m) => m.context_length)
          .filter((v): v is number => typeof v === "number" && v > 0);
        const outputValues = memberEntries
          .map((m) => m.max_output_tokens)
          .filter((v): v is number => typeof v === "number" && v > 0);

        if (contextValues.length > 0 && outputValues.length > 0) {
          entry.limit = {
            context: Math.min(...contextValues),
            output: Math.min(...outputValues),
          };
        }

        // LCD across modalities — combo accepts modality M iff every member
        // accepts M. Same intersection rule as runtime capabilities.
        const inSets = memberEntries.map((m) => new Set(normaliseModalities(m.input_modalities)));
        const outSets = memberEntries.map((m) => new Set(normaliseModalities(m.output_modalities)));
        const intersect = (sets: Set<OmniRouteModalityKind>[]): OmniRouteModalityKind[] => {
          if (sets.length === 0) return [];
          const [first, ...rest] = sets;
          const out: OmniRouteModalityKind[] = [];
          for (const v of first) {
            if (rest.every((s) => s.has(v))) out.push(v);
          }
          return out;
        };
        const inModalities = intersect(inSets);
        const outModalities = intersect(outSets);
        if (inModalities.length > 0 || outModalities.length > 0) {
          entry.modalities = {
            input: inModalities.length > 0 ? inModalities : ["text"],
            output: outModalities.length > 0 ? outModalities : ["text"],
          };
        }
      } else {
        // Empty members → safety posture: all caps false. Caller's OC picker
        // will grey out an unroutable combo rather than promise capabilities
        // we can't honour.
        entry.attachment = false;
        entry.reasoning = false;
        entry.temperature = false;
        entry.tool_call = false;
      }

      // Key under bare slug (e.g. `claude-primary`) — no `combo/` prefix
      // because OpenCode parses model IDs on `/` and would treat
      // `combo/MASTER` as provider=`combo`. Slug collisions across
      // combos are disambiguated with a short UUID-prefix suffix; see
      // `buildComboKey` for the policy.
      models[buildComboKey(combo, usedComboKeys)] = entry;

      // Make this combo's resolved entry available to parent combos
      // that reference it via combo-ref. Use the friendly name since
      // that's the lookup key on the parent side.
      resolvedStaticCombosByName.set(friendlyName, entry);
    }

    if (stillPendingStatic.length === pendingStatic.length) {
      // No progress in this pass — remaining combos have unresolvable
      // refs (missing nested combo, circular graph, or nested combo
      // with no members). Break early to avoid wasting the pass budget.
      break;
    }
    pendingStatic = stillPendingStatic;
  }

  if (pendingStatic.length > 0) {
    console.warn(
      `[omniroute-plugin] ${pendingStatic.length} combo(s) in the static catalog could not resolve all nested combo-refs after ${MAX_STATIC_COMBO_PASSES} passes; they will be omitted.`
    );
  }

  // ── Auto combos ────────────────────────────────────────────────────────
  // Virtual server-side combos (auto/coding, auto/fast, etc.) are fetched
  // from /api/combos/auto and added as model entries. They self-manage
  // provider selection at runtime via scoring/bandit exploration.
  if (rawAutoCombos && rawAutoCombos.length > 0) {
    for (const autoCombo of rawAutoCombos) {
      if (!autoCombo || !autoCombo.id) continue;
      if (autoCombo.isHidden === true) continue;
      const entry = mapAutoComboToStaticEntry(autoCombo);
      // Use the variant as the key: "auto", "auto/coding", etc.
      const key = autoComboModelId(autoCombo.variant);
      if (models[key]) {
        // Collision with a raw model or DB combo — auto combo wins (log once)
        if (!reportedCollisions.has(key)) {
          reportedCollisions.add(key);
          console.warn(
            `[omniroute-plugin] auto combo key "${key}" collides with an existing model; auto combo wins.`
          );
        }
      }
      models[key] = entry;
    }
  }

  return {
    npm: "@ai-sdk/openai-compatible",
    name: opts.displayName,
    options: { baseURL, apiKey },
    models,
  };
}

/**
 * Shape we expect inside `auth.json`. The file is keyed by providerId, with
 * each entry being a flavor-tagged credential. Today only the `api` flavor
 * is consumed by this plugin (OAuth + WellKnown flavors are passed through
 * but never decoded into a static block).
 */
interface AuthJsonApiEntry {
  type: "api";
  key: string;
  baseURL?: string;
}

type AuthJsonShape = Record<string, AuthJsonApiEntry | { type?: string; [k: string]: unknown }>;

/**
 * Read & parse `auth.json` from OC's data dir. The path resolution mirrors
 * OC core's:
 *
 *   `${OPENCODE_DATA_DIR ?? path.join(os.homedir(), ".local/share/opencode")}/auth.json`
 *
 * Returns `undefined` when the file is missing (most-common case on a fresh
 * install — silent no-op). Returns `null` when the file exists but doesn't
 * parse as JSON (logs ONE warn so the operator sees the corruption).
 *
 * Exported as a dependency-injectable function on `createOmniRouteConfigHook`
 * so tests can stub it without monkey-patching `node:fs/promises`.
 */
// ─────────────────────────────────────────────────────────────────────────
// Disk-cache fallback. Persists the last successful raw-fetch snapshot to
// `${OPENCODE_DATA_DIR ?? ~/.local/share/opencode}/plugins/omniroute-<providerId>.json`.
// When `/v1/models` is unreachable (e.g. IP whitelist drop, offline laptop)
// AND the in-memory cache is cold, the config hook reads from disk so the
// last-known catalog still surfaces in OC's model picker. Feature-flagged:
// `features.diskCache !== false` (default-on).
// ─────────────────────────────────────────────────────────────────────────

/** Disk snapshot envelope. Versioned for forward-compat. */
interface OmniRouteDiskSnapshot {
  v: 1;
  rawModels: OmniRouteRawModelEntry[];
  rawCombos: OmniRouteRawCombo[];
  rawAutoCombos?: OmniRouteRawAutoCombo[];
  /** Serialised as array-of-pairs (Map is not JSON-friendly). */
  rawEnrichment: Array<[string, OmniRouteEnrichmentEntry]>;
  rawCompressionCombos: OmniRouteCompressionCombo[];
  rawConnections: OmniRouteProviderConnection[];
  /** When the snapshot was written (epoch ms). */
  writtenAt: number;
}

/** Resolve the disk-snapshot path for a given providerId. */
export function diskSnapshotPath(providerId: string): string {
  const dir = process.env.OPENCODE_DATA_DIR ?? path.join(os.homedir(), ".local/share/opencode");
  return path.join(dir, "plugins", `omniroute-${providerId}.json`);
}

export type OmniRouteDiskSnapshotWriter = (
  providerId: string,
  entry: Omit<OmniRouteFetchCacheEntry, "expiresAt">
) => Promise<void>;

export type OmniRouteDiskSnapshotReader = (
  providerId: string
) => Promise<Omit<OmniRouteFetchCacheEntry, "expiresAt"> | undefined>;

/** Best-effort disk write. Soft-fails on any I/O error (no exception thrown). */
export const defaultDiskSnapshotWriter: OmniRouteDiskSnapshotWriter = async (providerId, entry) => {
  try {
    const file = diskSnapshotPath(providerId);
    // Restrict perms to the owner: the snapshot lives alongside auth.json
    // (0o600) and embeds provider topology + masked connection records.
    await mkdir(path.dirname(file), { recursive: true, mode: 0o700 });
    const snapshot: OmniRouteDiskSnapshot = {
      v: 1,
      rawModels: entry.rawModels,
      rawCombos: entry.rawCombos,
      rawAutoCombos: entry.rawAutoCombos,
      rawEnrichment: Array.from(entry.rawEnrichment.entries()),
      rawCompressionCombos: entry.rawCompressionCombos,
      rawConnections: entry.rawConnections,
      writtenAt: Date.now(),
    };
    await writeFile(file, JSON.stringify(snapshot), {
      encoding: "utf8",
      mode: 0o600,
    });
  } catch {
    // Soft-fail; caller already has the in-memory cache.
  }
};

/** Best-effort disk read. Returns `undefined` when missing/corrupt/unreadable. */
export const defaultDiskSnapshotReader: OmniRouteDiskSnapshotReader = async (providerId) => {
  try {
    const file = diskSnapshotPath(providerId);
    const body = await readFile(file, "utf8");
    const parsed = JSON.parse(body) as Partial<OmniRouteDiskSnapshot>;
    if (!parsed || parsed.v !== 1) return undefined;
    return {
      rawModels: Array.isArray(parsed.rawModels) ? parsed.rawModels : [],
      rawCombos: Array.isArray(parsed.rawCombos) ? parsed.rawCombos : [],
      rawAutoCombos: Array.isArray(parsed.rawAutoCombos) ? parsed.rawAutoCombos : [],
      rawEnrichment: new Map(Array.isArray(parsed.rawEnrichment) ? parsed.rawEnrichment : []),
      rawCompressionCombos: Array.isArray(parsed.rawCompressionCombos)
        ? parsed.rawCompressionCombos
        : [],
      rawConnections: Array.isArray(parsed.rawConnections) ? parsed.rawConnections : [],
    };
  } catch {
    return undefined;
  }
};

/** No-op disk-cache pair — used by tests to avoid filesystem side effects. */
export const noopDiskSnapshotWriter: OmniRouteDiskSnapshotWriter = async () => {};

// ────────────────────────────────────────────────────────────────────────────
// Debug logging (features.debugLog)
// ────────────────────────────────────────────────────────────────────────────

/**
 * One captured request/response pair written to the debug JSONL log.
 * Schema documented in the schema-aware `DebugLogEntry` interface below.
 */
export interface DebugLogEntry {
  reqId: string;
  providerId: string;
  ts: number;
  url: string;
  method: string;
  reqHeaders: Record<string, string>;
  reqBody: unknown;
  resStatus: number | null;
  resHeaders: Record<string, string>;
  resBody: unknown;
  durationMs: number | null;
  error?: string;
}

function debugLogDir(): string {
  return join(
    process.env.OPENCODE_DATA_DIR ?? join(homedir(), ".local", "share", "opencode"),
    "plugins"
  );
}

function debugLogPath(providerId: string): string {
  return join(debugLogDir(), `omniroute-debug-${providerId}.jsonl`);
}

function debugStatePath(providerId: string): string {
  return join(debugLogDir(), `omniroute-debug-${providerId}.state.json`);
}

export function debugLogEnabled(providerId: string): boolean {
  try {
    const p = debugStatePath(providerId);
    if (!existsSync(p)) return false;
    const s = JSON.parse(readFileSync(p, "utf8")) as { enabled?: boolean };
    return s.enabled === true;
  } catch {
    return false;
  }
}

export function debugLogSetEnabled(providerId: string, enabled: boolean): void {
  try {
    const dir = debugLogDir();
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(debugStatePath(providerId), JSON.stringify({ enabled, ts: Date.now() }, null, 2));
  } catch (err) {
    // best-effort; never break the auth flow
    console.warn(`[omniroute-plugin] debugLogSetEnabled failed: ${(err as Error).message}`);
  }
}

export function debugLogAppend(entry: DebugLogEntry): void {
  try {
    const dir = debugLogDir();
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    appendFileSync(debugLogPath(entry.providerId), JSON.stringify(entry) + "\n", "utf8");
  } catch (err) {
    console.warn(`[omniroute-plugin] debugLogAppend failed: ${(err as Error).message}`);
  }
}

export function debugLogRead(providerId: string, limit = 20): DebugLogEntry[] {
  try {
    const p = debugLogPath(providerId);
    if (!existsSync(p)) return [];
    const lines = readFileSync(p, "utf8").trim().split("\n").filter(Boolean);
    return lines
      .slice(-limit)
      .map((line) => {
        try {
          return JSON.parse(line) as DebugLogEntry;
        } catch {
          return null;
        }
      })
      .filter((e): e is DebugLogEntry => e !== null);
  } catch {
    return [];
  }
}

export function debugLogGetById(providerId: string, reqId: string): DebugLogEntry | null {
  try {
    const p = debugLogPath(providerId);
    if (!existsSync(p)) return null;
    const lines = readFileSync(p, "utf8").trim().split("\n").filter(Boolean);
    for (let i = lines.length - 1; i >= 0; i--) {
      try {
        const e = JSON.parse(lines[i]) as DebugLogEntry;
        if (e.reqId === reqId) return e;
      } catch {
        // skip malformed
      }
    }
    return null;
  } catch {
    return null;
  }
}

export function debugLogClear(providerId: string): void {
  try {
    const p = debugLogPath(providerId);
    if (existsSync(p)) writeFileSync(p, "", "utf8");
  } catch (err) {
    console.warn(`[omniroute-plugin] debugLogClear failed: ${(err as Error).message}`);
  }
}

/**
 * Wrap a fetch function to capture request/response pairs into the debug
 * JSONL log. Honours the `featureDefault` opt-in flag and the on-disk
 * runtime toggle (`debugLogEnabled`).
 */
export function createDebugLoggingFetch(
  inner: typeof fetch,
  providerId: string,
  featureDefault: boolean
): typeof fetch {
  return async (input, init) => {
    const active = featureDefault || debugLogEnabled(providerId);
    if (!active) return inner(input, init);
    const reqId = randomUUID();
    const url =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.toString()
          : input instanceof Request
            ? input.url
            : String(input);
    const method = (
      init?.method ?? (typeof input === "string" ? "GET" : ((input as Request).method ?? "GET"))
    ).toUpperCase();
    const reqHeaders: Record<string, string> = {};
    if (input instanceof Request) {
      input.headers.forEach((v, k) => (reqHeaders[k] = v));
    }
    if (init?.headers) {
      const h = init.headers;
      if (h instanceof Headers) h.forEach((v, k) => (reqHeaders[k] = v));
      else if (Array.isArray(h)) for (const [k, v] of h) reqHeaders[k] = v;
      else Object.assign(reqHeaders, h);
    }
    let reqBody: unknown = undefined;
    if (init?.body) {
      if (typeof init.body === "string") {
        try {
          reqBody = JSON.parse(init.body);
        } catch {
          reqBody = init.body.slice(0, 4096);
        }
      } else {
        reqBody = "[non-string body]";
      }
    } else if (input instanceof Request) {
      try {
        const clonedReq = input.clone();
        const text = await clonedReq.text();
        try {
          reqBody = JSON.parse(text);
        } catch {
          reqBody = text.slice(0, 4096);
        }
      } catch {
        reqBody = "[body unreadable]";
      }
    }
    const t0 = Date.now();
    try {
      const res = await inner(input, init);
      const durationMs = Date.now() - t0;
      const resHeaders: Record<string, string> = {};
      res.headers.forEach((v, k) => (resHeaders[k] = v));
      let resBody: unknown = undefined;
      try {
        const clone = res.clone();
        const ct = clone.headers.get("content-type") ?? "";
        if (ct.includes("application/json")) {
          resBody = await clone.json();
        } else if (ct.includes("text/event-stream")) {
          resBody = "[stream]";
        } else if (ct.includes("text/")) {
          const txt = await clone.text();
          resBody = txt.length > 4096 ? txt.slice(0, 4096) + "...[truncated]" : txt;
        } else {
          resBody = `[${ct || "unknown"} body, status ${res.status}]`;
        }
      } catch {
        resBody = "[body unparseable]";
      }
      debugLogAppend({
        reqId,
        providerId,
        ts: t0,
        url,
        method,
        reqHeaders,
        reqBody,
        resStatus: res.status,
        resHeaders,
        resBody,
        durationMs,
      });
      return res;
    } catch (err) {
      const durationMs = Date.now() - t0;
      debugLogAppend({
        reqId,
        providerId,
        ts: t0,
        url,
        method,
        reqHeaders,
        reqBody,
        resStatus: null,
        resHeaders: {},
        resBody: undefined,
        durationMs,
        error: (err as Error).message,
      });
      throw err;
    }
  };
}
export const noopDiskSnapshotReader: OmniRouteDiskSnapshotReader = async () => undefined;

export type OmniRouteReadAuthJson = () => Promise<AuthJsonShape | undefined | null>;

export const defaultReadAuthJson: OmniRouteReadAuthJson = async () => {
  const dir = process.env.OPENCODE_DATA_DIR ?? path.join(os.homedir(), ".local/share/opencode");
  const file = path.join(dir, "auth.json");
  let body: string;
  try {
    body = await readFile(file, "utf8");
  } catch {
    // File missing or unreadable — silent no-op. This is the expected path
    // on a fresh install BEFORE `/connect` has been run.
    return undefined;
  }
  try {
    const parsed = JSON.parse(body) as unknown;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as AuthJsonShape;
    }
    return null;
  } catch {
    return null;
  }
};

/**
 * Build the config-hook portion of the plugin for a given options bag.
 * Exported standalone so the contract is unit-testable without faking the
 * full PluginInput / Hooks surface, and so multi-instance setups can each
 * own their own (auth.json reader, fetch cache, fetcher) trio.
 *
 * Behavioural contract:
 *   - Runs BEFORE `auth.loader` in the OC startup sequence (per the
 *     @opencode-ai/plugin contract). `getAuth()` is NOT available here,
 *     so we read `auth.json` directly via the injected reader.
 *   - No-op when:
 *       (a) `auth.json` is missing / unreadable (fresh install before
 *           `/connect`),
 *       (b) `auth.json[providerId]` is missing or not type-api,
 *       (c) `apiKey` is empty after extraction,
 *       (d) `baseURL` is unresolvable (neither opts.baseURL nor
 *           `auth.json[providerId].baseURL`),
 *       (e) `input.provider[providerId]` is ALREADY set (operator override
 *           wins — we never clobber manually-curated catalogs).
 *     Each no-op path emits ONE debug-level breadcrumb to `console.warn`
 *     so the operator can diagnose without log spam. Malformed `auth.json`
 *     warns once and continues as if the file were missing.
 *   - Fail-open on fetcher errors: a `/v1/models` failure → still publish
 *     a stub `{models: {}}` provider block (so OC has a complete-shape
 *     entry to render). A `/api/combos` failure → publish models-only.
 *     Both paths emit ONE `console.warn`.
 *   - When the provider hook (T-03/T-05) has ALREADY populated the shared
 *     cache for this (baseURL, apiKey) tuple, we reuse the raw payloads
 *     directly — no second fetch. (And vice-versa: the config hook fires
 *     first on OC ≥1.14.49 cold start, populating the cache for the
 *     provider hook moments later.)
 *   - DUAL-PUBLISH SAFE: on OC ≥1.14.49 BOTH this static block and the
 *     dynamic `provider.models()` result will land in OC's catalog
 *     reducer. The dynamic block wins by OC's own merge rule — see
 *     OpenCode core's provider resolution order — so emitting both is a
 *     correctness-positive: ≤1.14.48 reads static, ≥1.14.49 prefers
 *     dynamic but the static one keeps things responsive during the
 *     ~50ms window before the dynamic fetch resolves.
 *
 * @param opts Plugin options (validated, resolved with defaults).
 * @param deps Dependency injection.
 *   - `readAuthJson`     — replaces `defaultReadAuthJson` (test stub).
 *   - `fetcher`          — replaces `defaultOmniRouteModelsFetcher`.
 *   - `combosFetcher`    — replaces `defaultOmniRouteCombosFetcher`.
 *   - `now`              — clock for cache TTL (default `Date.now`).
 *   - `cache`            — shared fetch-result cache (see
 *                          `OmniRouteFetchCache`). Pass the same Map the
 *                          provider hook owns to dedupe round-trips.
 *   - `logger`           — `{warn}` sink for breadcrumb capture in tests.
 *                          Defaults to `console`.
 */
export function createOmniRouteConfigHook(
  opts?: OmniRoutePluginOptions,
  deps: {
    readAuthJson?: OmniRouteReadAuthJson;
    fetcher?: OmniRouteModelsFetcher;
    combosFetcher?: OmniRouteCombosFetcher;
    autoCombosFetcher?: OmniRouteAutoCombosFetcher;
    enrichmentFetcher?: OmniRouteEnrichmentFetcher;
    compressionMetaFetcher?: OmniRouteCompressionMetaFetcher;
    providersFetcher?: OmniRouteProvidersFetcher;
    diskSnapshotReader?: OmniRouteDiskSnapshotReader;
    diskSnapshotWriter?: OmniRouteDiskSnapshotWriter;
    now?: () => number;
    cache?: OmniRouteFetchCache;
    logger?: { warn: (...args: unknown[]) => void };
  } = {}
): (input: Config) => Promise<void> {
  const resolved = resolveOmniRoutePluginOptions(opts);
  const readAuthJson = deps.readAuthJson ?? defaultReadAuthJson;
  const fetcher = deps.fetcher ?? defaultOmniRouteModelsFetcher;
  const combosFetcher = deps.combosFetcher ?? defaultOmniRouteCombosFetcher;
  const autoCombosFetcher = deps.autoCombosFetcher ?? defaultOmniRouteAutoCombosFetcher;
  const enrichmentFetcher = deps.enrichmentFetcher ?? defaultOmniRouteEnrichmentFetcher;
  const compressionMetaFetcher =
    deps.compressionMetaFetcher ?? defaultOmniRouteCompressionMetaFetcher;
  const providersFetcher = deps.providersFetcher ?? defaultOmniRouteProvidersFetcher;
  const diskSnapshotReader = deps.diskSnapshotReader ?? defaultDiskSnapshotReader;
  const diskSnapshotWriter = deps.diskSnapshotWriter ?? defaultDiskSnapshotWriter;
  const now = deps.now ?? Date.now;
  const cache: OmniRouteFetchCache = deps.cache ?? new Map();
  const logger = deps.logger ?? console;
  const features = resolved.features ?? {};
  const wantAutoCombos = features.autoCombos !== false;
  const wantEnrichment = features.enrichment !== false;
  const wantCompressionMeta = features.compressionMetadata === true;
  const wantUsableOnly = features.usableOnly === true;
  const wantDiskCache = features.diskCache !== false;
  const wantProviderTag = features.providerTag !== false;

  return async (input: Config) => {
    // (e) operator override — `input.provider[providerId]` already set →
    // leave it alone. Manually curated catalogs ALWAYS win over the plugin's
    // generated block. Detect-and-respect before any I/O.
    const existingProviders = (input as { provider?: Record<string, unknown> }).provider;
    if (existingProviders && existingProviders[resolved.providerId] !== undefined) {
      logger.warn(
        `[omniroute-plugin] config shim skipped: provider.${resolved.providerId} already set by user`
      );
      return;
    }

    // Read auth.json. `undefined` = missing file (silent path), `null` =
    // malformed JSON (warn once and treat as missing).
    let authJson: AuthJsonShape | undefined | null;
    try {
      authJson = await readAuthJson();
    } catch {
      // Reader threw — be conservative and treat like a missing file.
      authJson = undefined;
    }

    if (authJson === null) {
      logger.warn("[omniroute-plugin] config shim: auth.json failed to parse; treating as missing");
      authJson = undefined;
    }

    const entry = authJson?.[resolved.providerId] as AuthJsonApiEntry | undefined;
    const apiKey = entry && entry.type === "api" && typeof entry.key === "string" ? entry.key : "";

    if (!apiKey) {
      // (c) no apiKey — silent no-op (with debug breadcrumb). The operator
      // hasn't run `/connect <providerId>` yet, OR the stored credential
      // isn't api-flavored. OC will handle the `/connect` flow at runtime.
      logger.warn(
        `[omniroute-plugin] config shim skipped: no apiKey for providerId=${resolved.providerId}`
      );
      return;
    }

    // baseURL resolution: opts.baseURL wins, then auth.json's stored baseURL.
    // No silent localhost default — a misconfigured plugin should surface a
    // breadcrumb and skip, not phantom requests.
    const storedBaseURL = entry && typeof entry.baseURL === "string" ? entry.baseURL : undefined;
    const baseURL = resolved.baseURL ?? storedBaseURL ?? "";
    if (!baseURL) {
      logger.warn(
        `[omniroute-plugin] config shim skipped: no baseURL for providerId=${resolved.providerId}`
      );
      return;
    }

    // Try the shared cache first. On OC ≥1.14.49 the provider hook may have
    // populated it moments earlier; on OC ≤1.14.48 only this hook runs but
    // the cache still works (single producer + consumer through one Map).
    const cacheKey = modelsCacheKey(baseURL, apiKey);
    const t = now();
    const cached = cache.get(cacheKey);

    let rawModels: OmniRouteRawModelEntry[];
    let rawCombos: OmniRouteRawCombo[];
    let rawAutoCombos: OmniRouteRawAutoCombo[];
    let rawEnrichment: OmniRouteEnrichmentMap;
    let rawCompressionCombos: OmniRouteCompressionCombo[];
    let rawConnections: OmniRouteProviderConnection[];

    if (cached && cached.expiresAt > t) {
      rawModels = cached.rawModels;
      rawCombos = cached.rawCombos;
      rawAutoCombos = cached.rawAutoCombos;
      rawEnrichment = cached.rawEnrichment;
      rawCompressionCombos = cached.rawCompressionCombos;
      rawConnections = cached.rawConnections;
    } else {
      // Fail-open fetcher errors: on /v1/models throw, fall back to empty
      // catalog (still publish a stub block so OC has a complete-shape
      // entry); on /api/combos throw, publish models-only. Disk-cache
      // fallback below recovers the last-known-good catalog when the
      // fetcher threw (network down / 403 / timeout) AND features.diskCache
      // !== false. A 0-entry SUCCESS (fresh tenant) does NOT trigger
      // disk fallback — that's a valid empty catalog.
      let modelsFetchThrew = false;
      try {
        rawModels = await fetcher(baseURL, apiKey, 10_000);
      } catch (err) {
        logger.warn(
          "[omniroute-plugin] config shim: /v1/models fetch failed; publishing stub provider entry",
          err
        );
        rawModels = [];
        modelsFetchThrew = true;
      }
      const modelsFetchOk = !modelsFetchThrew && rawModels.length > 0;

      rawCombos = [];
      try {
        rawCombos = await combosFetcher(baseURL, apiKey, 10_000);
      } catch (err) {
        logger.warn(
          "[omniroute-plugin] config shim: /api/combos fetch failed; publishing models-only static catalog",
          err
        );
      }

      rawAutoCombos = [];
      if (wantAutoCombos) {
        try {
          rawAutoCombos = await autoCombosFetcher(baseURL, apiKey, 5_000);
        } catch {
          // Already handled inside the default fetcher
        }
      }

      // Eagerly fetch enrichment so the static block can overlay human
      // display names on raw model ids. On OC ≤1.15.5 the dynamic
      // `provider.models` hook never fires in `serve` mode, so the static
      // block IS what reaches `/provider` and the TUI model picker.
      // Gated by `features.enrichment` (default-on). Soft-fail on error —
      // we still publish a name-less catalog if /api/pricing/models is
      // unreachable.
      rawEnrichment = new Map();
      if (wantEnrichment) {
        try {
          rawEnrichment = await enrichmentFetcher(baseURL, apiKey, 10_000);
        } catch (err) {
          logger.warn(
            "[omniroute-plugin] config shim: /api/pricing/models fetch failed; publishing raw-id static catalog",
            err
          );
        }
      }

      // Compression-metadata fetch — opt-in via features.compressionMetadata.
      // When on, the default pipeline is appended to every combo `name` so
      // the TUI picker advertises which compression a combo applies.
      rawCompressionCombos = [];
      if (wantCompressionMeta) {
        try {
          rawCompressionCombos = await compressionMetaFetcher(baseURL, apiKey, 10_000);
        } catch (err) {
          logger.warn(
            "[omniroute-plugin] config shim: /api/context/combos fetch failed; publishing combos without compression suffix",
            err
          );
        }
      }

      // Provider-connections fetch — opt-in via features.usableOnly. When
      // on, the static catalog filters out models/combos whose canonical
      // provider has no active connection. Soft-fail (empty list) disables
      // the filter for this refresh, never hiding the whole catalog.
      rawConnections = [];
      if (wantUsableOnly) {
        try {
          rawConnections = await providersFetcher(baseURL, apiKey, 10_000);
        } catch (err) {
          logger.warn(
            "[omniroute-plugin] config shim: /api/providers fetch failed; usableOnly filter disabled for this refresh",
            err
          );
        }
      }

      // Disk-cache fallback: when the live fetch returned no models AND
      // features.diskCache !== false, hydrate from the last-known-good
      // snapshot so OC still surfaces a usable catalog (e.g. IP whitelist
      // drop, offline laptop). The snapshot is whatever we last wrote on
      // a healthy refresh; staleness is bounded only by how recently the
      // user was online.
      if (modelsFetchThrew && wantDiskCache) {
        const snapshot = await diskSnapshotReader(resolved.providerId);
        if (snapshot && snapshot.rawModels.length > 0) {
          logger.warn(
            `[omniroute-plugin] config shim: /v1/models unreachable; using stale disk cache (${snapshot.rawModels.length} models)`
          );
          rawModels = snapshot.rawModels;
          rawCombos = snapshot.rawCombos;
          rawAutoCombos = snapshot.rawAutoCombos ?? [];
          rawEnrichment = snapshot.rawEnrichment;
          rawCompressionCombos = snapshot.rawCompressionCombos;
          rawConnections = snapshot.rawConnections;
        }
      }

      // Cache even partial results — a subsequent provider-hook call should
      // not re-burn the timeout window on the same broken endpoint.
      cache.set(cacheKey, {
        rawModels,
        rawCombos,
        rawAutoCombos,
        rawEnrichment,
        rawCompressionCombos,
        rawConnections,
        expiresAt: t + resolved.modelCacheTtl,
      });

      // Startup diagnostics (file-based) — fires at startup via config hook
      if (resolved.features?.startupDebug === true) {
        await writeStartupDiagnostics({
          providerId: resolved.providerId,
          baseURL,
          modelCount: rawModels.length,
          comboCount: rawCombos.length,
          enrichmentSize: rawEnrichment.size,
          autoComboCount: rawAutoCombos.length,
          enrichment: rawEnrichment,
          autoCombos: rawAutoCombos,
        });
      }

      // Disk-cache write: persist the last successful (or any non-empty)
      // catalog so a subsequent cold start with a failed fetch can recover.
      // Best-effort; soft-fail keeps us moving when the data dir isn't
      // writable (e.g. read-only container).
      if (modelsFetchOk && wantDiskCache) {
        await diskSnapshotWriter(resolved.providerId, {
          rawModels,
          rawCombos,
          rawAutoCombos,
          rawEnrichment,
          rawCompressionCombos,
          rawConnections,
        });
      }
    }

    const block = buildStaticProviderEntry(
      rawModels,
      rawCombos,
      resolved,
      baseURL,
      apiKey,
      rawEnrichment,
      rawCompressionCombos,
      rawConnections,
      rawAutoCombos
    );

    // Mutate the input.provider map. The Config type declares
    // `provider?: {[key: string]: ProviderConfig}` — we initialise the
    // bag when absent so users who never set `provider` in opencode.json
    // still get the static block.
    const inputWithProvider = input as { provider?: Record<string, unknown> };
    if (!inputWithProvider.provider) {
      inputWithProvider.provider = {};
    }
    inputWithProvider.provider[resolved.providerId] = block;

    // ─────────────────────────────────────────────────────────────────────
    // MCP auto-emit — opt-in via features.mcpAutoEmit. When enabled, writes
    // an `input.mcp[<providerId>]` remote entry pointing at
    // `<baseURL>/api/mcp/stream` with the resolved Bearer token. Token
    // resolution: features.mcpToken wins if set; otherwise falls back to
    // the same apiKey used for chat. Operator overrides win (same posture
    // as provider-block emit): if input.mcp[providerId] is already set,
    // we leave it alone.
    // ─────────────────────────────────────────────────────────────────────
    if (features.mcpAutoEmit === true) {
      const mcpKey = features.mcpToken ?? apiKey;
      if (!mcpKey) {
        logger.warn(
          `[omniroute-plugin] mcp auto-emit skipped: no Bearer token for providerId=${resolved.providerId}`
        );
      } else {
        const inputWithMcp = input as { mcp?: Record<string, unknown> };
        if (!inputWithMcp.mcp) {
          inputWithMcp.mcp = {};
        }
        if (inputWithMcp.mcp[resolved.providerId] !== undefined) {
          logger.warn(
            `[omniroute-plugin] mcp auto-emit skipped: mcp.${resolved.providerId} already set by user`
          );
        } else {
          // Strip a trailing `/v1` from baseURL when present so we land on
          // the MCP transport at /api/mcp/stream, not /v1/api/mcp/stream.
          const mcpRoot = baseURL.replace(/\/v1\/?$/, "").replace(/\/$/, "");
          inputWithMcp.mcp[resolved.providerId] = {
            type: "remote",
            url: `${mcpRoot}/api/mcp/stream`,
            enabled: true,
            headers: {
              Authorization: `Bearer ${mcpKey}`,
            },
          };
        }
      }
    }
  };
}
