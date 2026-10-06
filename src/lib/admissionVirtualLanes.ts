/**
 * Adaptive virtual admission lanes (#9654) — src-side activation surface.
 *
 * The adaptive gate itself (`open-sse/services/admission/runtime.ts`) reads
 * `OMNIROUTE_CHAT_VIRTUAL_LANES` from env at process-global construction. This
 * module is the activation layer that lives where the DB is reachable:
 *
 *  - `resolveAdaptiveVirtualLanesFlag` resolves the flag with **env-wins**
 *    precedence (env > DB override > default) — the OPPOSITE of the generic
 *    `resolveFeatureFlag` (db-wins), for the same reason as
 *    `getCcAliasGlobalState`: the runtime gate reads env directly, so the
 *    dashboard must report the source that matches actual gate behavior.
 *  - `warmAdaptiveVirtualLanesIntoRuntime` (called from the Node boot path)
 *    folds a DB-sourced override into the process-global runtime's env at
 *    construction time, so a dashboard toggle actually gates after restart.
 *    No-op when env/default — the lazy runtime already reads process.env.
 *
 * Env truthiness mirrors the runtime read (`runtime.ts`): only `"1"` or
 * `"true"` enable; any other set value is explicitly off (and still wins).
 */
import { getFeatureFlagOverride } from "@/lib/db/featureFlags";

export const ADAPTIVE_VIRTUAL_LANES_FLAG_KEY = "OMNIROUTE_CHAT_VIRTUAL_LANES";

export type AdaptiveVirtualLanesFlagState = {
  enabled: boolean;
  source: "env" | "db" | "default";
};

export type AdaptiveVirtualLanesFlagDeps = {
  env?: NodeJS.ProcessEnv;
  getOverride?: (key: string) => string | undefined;
};

const ENV_ON = new Set(["1", "true"]);

/**
 * Resolve the effective state of the adaptive virtual-lanes flag and where it
 * came from. Env wins over the DB override (env-wins), matching the runtime
 * gate's own env-only read.
 */
export function resolveAdaptiveVirtualLanesFlag(
  deps: AdaptiveVirtualLanesFlagDeps = {}
): AdaptiveVirtualLanesFlagState {
  const env = deps.env ?? process.env;
  const envValue = env[ADAPTIVE_VIRTUAL_LANES_FLAG_KEY];
  if (envValue !== undefined && envValue !== "") {
    return { enabled: ENV_ON.has(envValue), source: "env" };
  }

  const getOverride = deps.getOverride ?? getFeatureFlagOverride;
  const dbOverride = getOverride(ADAPTIVE_VIRTUAL_LANES_FLAG_KEY);
  if (dbOverride !== undefined) {
    const enabled = dbOverride === "true" || dbOverride === "1" || dbOverride === "yes";
    return { enabled, source: "db" };
  }

  return { enabled: false, source: "default" };
}

export type AdaptiveVirtualLanesWarmDeps = {
  resolve?: (deps?: AdaptiveVirtualLanesFlagDeps) => AdaptiveVirtualLanesFlagState;
  reload?: (options: { env?: NodeJS.ProcessEnv }) => unknown;
};

/**
 * Boot warm (#9654 U7): when the DB override is the effective source, fold it
 * into the process-global adaptive admission runtime's env so the dashboard
 * toggle actually gates — the runtime reads env only at construction, hence
 * `requiresRestart: true`. Returns true when it materialized, false when
 * env/default already cover the state. Never throws.
 */
export async function warmAdaptiveVirtualLanesIntoRuntime(
  deps: AdaptiveVirtualLanesWarmDeps = {}
): Promise<boolean> {
  const resolve = deps.resolve ?? resolveAdaptiveVirtualLanesFlag;
  const state = resolve();
  if (state.source !== "db") return false;

  const reload =
    deps.reload ??
    (await import("@omniroute/open-sse/services/admission/runtime.ts"))
      .reloadAdaptiveAdmissionRuntime;
  reload({
    env: {
      ...(process.env ?? {}),
      [ADAPTIVE_VIRTUAL_LANES_FLAG_KEY]: state.enabled ? "1" : "0",
    },
  });
  return true;
}
