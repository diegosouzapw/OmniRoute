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
import type { AuthHook, Plugin, PluginOptions, ProviderHook } from "@opencode-ai/plugin";
import type { Model as ModelV2 } from "@opencode-ai/sdk/v2";
import { z } from "zod";

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

export const DEFAULT_MODEL_CACHE_TTL_MS = 300_000 as const;

/**
 * Resolve effective options from the optional plugin-options object,
 * applying defaults. Centralises the providerId fallback so every hook
 * sees a consistent identifier.
 */
export function resolveOmniRoutePluginOptions(
  opts?: OmniRoutePluginOptions
): Required<Pick<OmniRoutePluginOptions, "providerId" | "displayName" | "modelCacheTtl">> &
  Pick<OmniRoutePluginOptions, "baseURL"> {
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
  const { providerId, displayName, baseURL } = resolveOmniRoutePluginOptions(opts);

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
        return {
          apiKey: (auth as { key: string }).key,
          baseURL: baseURL ?? undefined,
          // fetch interceptor wired in T-04
        };
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
  return {
    auth: createOmniRouteAuthHook(resolved),
    provider: createOmniRouteProviderHook(resolved),
    // config shim lands in T-07
  };
};

export default OmniRoutePlugin;

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

  const trimmed = baseURL.replace(/\/+$/, "");
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
  ctx: { providerId: string; baseURL: string }
): ModelV2 {
  const caps = raw.capabilities ?? {};
  const inMods = new Set(raw.input_modalities ?? ["text"]);
  const outMods = new Set(raw.output_modalities ?? ["text"]);

  return {
    id: raw.id,
    providerID: ctx.providerId,
    api: {
      id: "openai-compatible",
      url: ctx.baseURL,
      npm: "@ai-sdk/openai-compatible",
    },
    name: raw.id, // OmniRoute /v1/models has no separate display name; id IS the label
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
      interleaved: false,
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
  };
}

/**
 * Internal cache key: `${baseURL}::sha256(apiKey)`. We hash the apiKey so
 * the key is safe to log / inspect via debugger without leaking the secret.
 * Different (baseURL, apiKey) tuples MUST keep independent cache entries:
 * a single OC user may register prod + preprod OmniRoute side-by-side with
 * distinct keys, and serving one's catalog from the other's cache would be
 * a correctness bug, not just a privacy one.
 */
function modelsCacheKey(baseURL: string, apiKey: string): string {
  const h = createHash("sha256").update(apiKey).digest("hex");
  return `${baseURL}::${h}`;
}

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
 *     the injected fetcher; maps each raw entry through `mapRawModelToModelV2`;
 *     caches the result by `(baseURL, sha256(apiKey))` for `modelCacheTtl`.
 *   - Cache is in-memory per hook instance. OC refreshes its model list
 *     more often than the TTL during interactive sessions, so a single
 *     hook serves many `models()` calls — caching avoids hammering
 *     `/v1/models` on every keystroke in the model picker.
 *   - On fetch failure we propagate the error to OC (rather than swallowing
 *     to `{}`) so the user sees an actionable message. An empty catalog
 *     would silently hide the provider from the picker.
 *
 * @param opts Plugin options (providerId, baseURL, modelCacheTtl, …).
 * @param deps Dependency injection. `fetcher` defaults to the live HTTP
 *             fetcher; `now` defaults to `Date.now` (overridable for TTL
 *             tests). `cache` lets the caller share state across
 *             reconstructions (unused outside tests today).
 */
export function createOmniRouteProviderHook(
  opts?: OmniRoutePluginOptions,
  deps: {
    fetcher?: OmniRouteModelsFetcher;
    now?: () => number;
    cache?: Map<string, { models: Record<string, ModelV2>; expiresAt: number }>;
  } = {}
): ProviderHook {
  const resolved = resolveOmniRoutePluginOptions(opts);
  const fetcher = deps.fetcher ?? defaultOmniRouteModelsFetcher;
  const now = deps.now ?? Date.now;
  const cache =
    deps.cache ?? new Map<string, { models: Record<string, ModelV2>; expiresAt: number }>();

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
      // baseURL (auth backends sometimes stash it next to the key). No
      // silent default to localhost: a misconfigured plugin should surface
      // a clear error, not phantom /v1/models calls. Cast through unknown
      // because the Auth union (OAuth | ApiAuth | WellKnownAuth) doesn't
      // declare baseURL on any branch — we duck-type it as a defensive
      // extension point.
      const authBaseURL = (auth as unknown as { baseURL?: unknown }).baseURL;
      const baseURL = resolved.baseURL ?? (typeof authBaseURL === "string" ? authBaseURL : "");
      if (!baseURL) {
        return {};
      }

      const cacheKey = modelsCacheKey(baseURL, apiKey);
      const cached = cache.get(cacheKey);
      const t = now();
      if (cached && cached.expiresAt > t) {
        return cached.models;
      }

      const raw = await fetcher(baseURL, apiKey, 10_000);
      const models: Record<string, ModelV2> = {};
      for (const entry of raw) {
        if (!entry.id) continue;
        models[entry.id] = mapRawModelToModelV2(entry, {
          providerId: resolved.providerId,
          baseURL,
        });
      }
      cache.set(cacheKey, { models, expiresAt: t + resolved.modelCacheTtl });
      return models;
    },
  };
}
