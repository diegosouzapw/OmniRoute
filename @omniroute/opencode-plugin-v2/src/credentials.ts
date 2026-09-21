import type { PluginContext } from "@opencode-ai/plugin/v2/promise";
import type { Logger } from "./shared/index.js";

/** Where a resolved key came from, so the failure message can name the fix. */
export type ApiKeyOrigin = "connection" | "option" | "env" | "missing";

export interface ResolvedApiKey {
  key: string;
  origin: ApiKeyOrigin;
}

const ENV_VAR = "OMNIROUTE_API_KEY";

/**
 * `ctx.integration.connection` is newer than the `key`/`env` methods this
 * plugin registers, so a host that predates it exposes `integration` without
 * it. Probing the shape keeps the plugin loadable on both.
 */
function connectionApi(ctx: PluginContext): PluginContext["integration"]["connection"] | undefined {
  const connection = (ctx.integration as Partial<PluginContext["integration"]>).connection;
  if (
    connection === undefined ||
    typeof connection.active !== "function" ||
    typeof connection.resolve !== "function"
  ) {
    return undefined;
  }
  return connection;
}

/**
 * Read the credential the user stored through the host's own auth flow.
 *
 * The plugin advertises `key` and `env` methods on its integration, so a user
 * can connect it from the UI; without this lookup that connection would only
 * feed inference and the catalog fetches would still need a key pasted into
 * the config file.
 *
 * Returns `undefined` (never throws) when there is no connection, when the
 * host is too old to expose one, or when the stored credential is an OAuth
 * grant — this plugin authenticates the gateway with a bearer key, and an
 * access token from an unrelated grant is not one.
 */
async function keyFromConnection(
  ctx: PluginContext,
  integrationID: string,
  log: Logger
): Promise<string | undefined> {
  const connection = connectionApi(ctx);
  if (connection === undefined) return undefined;
  try {
    const active = await connection.active(integrationID);
    if (active === undefined) return undefined;
    const credential = await connection.resolve(active);
    if (credential === undefined) return undefined;
    if (credential.type !== "key") {
      log.warn(
        `[omniroute-v2] ignoring the stored ${credential.type} credential: this plugin authenticates with an API key`
      );
      return undefined;
    }
    return credential.key.length > 0 ? credential.key : undefined;
  } catch (err) {
    log.warn(
      `[omniroute-v2] could not read the stored credential: ${err instanceof Error ? err.message : String(err)}`
    );
    return undefined;
  }
}

/**
 * Resolve the gateway key, preferring the credential the host holds over one
 * written in config. A key in `opencode.json` still wins over the environment
 * so an explicit per-project override keeps working.
 */
export async function resolveApiKey(
  ctx: PluginContext,
  integrationID: string,
  optionKey: string | undefined,
  log: Logger
): Promise<ResolvedApiKey> {
  const stored = await keyFromConnection(ctx, integrationID, log);
  if (stored !== undefined) return { key: stored, origin: "connection" };
  if (optionKey !== undefined && optionKey.length > 0) return { key: optionKey, origin: "option" };
  const fromEnv = process.env[ENV_VAR];
  if (fromEnv !== undefined && fromEnv.length > 0) return { key: fromEnv, origin: "env" };
  return { key: "", origin: "missing" };
}

/**
 * A missing key produces an empty catalog and no error the user can see, so
 * say it once, and name the three ways to supply one.
 */
export function warnIfMissing(resolved: ResolvedApiKey, integrationID: string, log: Logger): void {
  if (resolved.origin !== "missing") return;
  log.warn(
    `[omniroute-v2] no API key for "${integrationID}": the catalog will be empty. ` +
      `Connect the integration from opencode, set "apiKey" in the plugin options, ` +
      `or export ${ENV_VAR}.`
  );
}
