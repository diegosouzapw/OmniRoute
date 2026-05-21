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
        return {
          apiKey,
          baseURL: resolvedBaseURL,
          fetch: createOmniRouteFetchInterceptor({
            apiKey,
            baseURL: resolvedBaseURL,
          }),
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

// ────────────────────────────────────────────────────────────────────────────
// Combo discovery (T-05) — /api/combos pass-through with LCD capability roll-up
// ────────────────────────────────────────────────────────────────────────────

/**
 * Raw shape of a single combo entry as returned by OmniRoute's `/api/combos`.
 *
 * Schema established via a live probe against
 * `https://or4269-preprod.mrmm.xyz/api/combos` with a management-scoped key
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
  const trimmed = baseURL.replace(/\/+$/, "");
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
  baseURL: string
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
    interleaved: false,
  };

  return {
    id: combo.id,
    providerID: providerId,
    api: {
      id: "openai-compatible",
      url: baseURL,
      npm: "@ai-sdk/openai-compatible",
    },
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
  const trimmed = config.baseURL.replace(/\/+$/, "");
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
          // eslint-disable-next-line no-console
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
