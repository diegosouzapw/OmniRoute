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

import type { AuthHook, Plugin, PluginOptions } from "@opencode-ai/plugin";

/**
 * Plugin options accepted as the second element of the `plugin: [name, opts]`
 * tuple in opencode.json. All fields optional; defaults keep the
 * single-instance "omniroute" case working with zero configuration.
 */
export interface OmniRoutePluginOptions {
  /**
   * OpenCode provider id this plugin instance binds to. Multiple plugin
   * instances may coexist by giving each a different `providerId`
   * (e.g. "omniroute", "omniroute-preprod", "omniroute-local").
   *
   * Maps directly to `ProviderHook.id` and `AuthHook.provider` in the
   * @opencode-ai/plugin contract.
   *
   * @default "omniroute"
   */
  providerId?: string;

  /**
   * Display name shown in the OpenCode UI for this provider instance.
   *
   * @default `OmniRoute` (or `OmniRoute (${providerId})` when providerId !== "omniroute")
   */
  displayName?: string;

  /**
   * `/v1/models` TTL cache duration in milliseconds. Lower for fast iteration
   * during model catalog edits on the server; higher to reduce request load.
   *
   * @default 300_000 (5 minutes)
   */
  modelCacheTtl?: number;

  /**
   * Override default base URL for the OmniRoute instance. Resolved at runtime
   * from auth.json (set by `/connect`) when not provided here. Useful for
   * pinning a development OmniRoute instance without going through /connect.
   */
  baseURL?: string;
}

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
 * Coerce a raw `PluginOptions` (record from opencode.json) into our typed
 * options shape. Unknown keys are dropped — this isolates the plugin from
 * config-schema drift.
 */
function coercePluginOptions(opts?: PluginOptions): OmniRoutePluginOptions | undefined {
  if (!opts || typeof opts !== "object") return undefined;
  const out: OmniRoutePluginOptions = {};
  if (typeof opts.providerId === "string") out.providerId = opts.providerId;
  if (typeof opts.displayName === "string") out.displayName = opts.displayName;
  if (typeof opts.modelCacheTtl === "number") out.modelCacheTtl = opts.modelCacheTtl;
  if (typeof opts.baseURL === "string") out.baseURL = opts.baseURL;
  return out;
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
    // provider hook lands in T-03; config shim in T-07
  };
};

export default OmniRoutePlugin;
