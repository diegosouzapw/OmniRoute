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

import type { Plugin } from "@opencode-ai/plugin";

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
 * Plugin factory. Returns the OpenCode Plugin object wired with the three
 * hooks. Concrete hook bodies land in subsequent tickets (T-02 auth,
 * T-03 provider.models, T-04 fetch interceptor, T-06 Gemini sanitization,
 * T-07 config backward-compat).
 *
 * The scaffold returns a no-op shape so the plugin loads cleanly under
 * `@opencode-ai/plugin` from the very first publish. Each hook is replaced
 * in turn during the ticket sequence.
 */
export const OmniRoutePlugin: Plugin = async (_ctx) => {
  return {
    // hooks land here in T-02 / T-03 / T-04 / T-06 / T-07
  };
};

export default OmniRoutePlugin;
