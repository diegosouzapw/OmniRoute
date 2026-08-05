/**
 * OpenHands `.env` generator for the OmniRoute AI Gateway.
 *
 * Produces the OpenHands environment that points an OpenHands agent-server at
 * a running OmniRoute instance and fixes the integration gotchas found in the
 * field:
 *   - LLM_MODEL   — OpenHands-friendly model name → OmniRoute model/combo
 *   - LLM_BASE_URL — OmniRoute OpenAI-compatible endpoint
 *   - LLM_API_KEY  — OmniRoute key (sk-...)
 *   - OH_PERSISTENCE_DIR — host-mounted SQLite/conversation persistence
 *   - PERMITTED_CORS_ORIGINS — allow the dashboard origin to reach agent-server
 */

export interface OpenHandsEnvOptions {
  /** OmniRoute base URL as seen from the agent-server (default localhost:20128). */
  omnirouteUrl?: string;
  /** OmniRoute API key (sk-...). */
  apiKey: string;
  /** OpenHands model name (e.g. "deepseek-chat") or OmniRoute combo/model. */
  model: string;
  /** Host directory for OH_PERSISTENCE_DIR (default: current dir + .openhands-state). */
  persistenceDir?: string;
  /** CORS origins that must reach the agent-server (default dashboard origin + localhost). */
  corsOrigins?: string[];
  /** Optional OpenHands sandbox base image. */
  sandboxBaseImage?: string;
}

export function buildOpenHandsEnv(opts: OpenHandsEnvOptions): Record<string, string> {
  const omnirouteHost = (opts.omnirouteUrl ?? "http://localhost:20128").replace(/\/+$/, "");
  const persistence = opts.persistenceDir ?? `${process.cwd()}/.openhands-state`;
  const cors =
    opts.corsOrigins && opts.corsOrigins.length > 0
      ? opts.corsOrigins
      : ["http://localhost:3000", "http://localhost:3001"];

  const env: Record<string, string> = {
    LLM_MODEL: opts.model,
    LLM_BASE_URL: `${omnirouteHost}/v1`,
    LLM_API_KEY: opts.apiKey,
    OH_PERSISTENCE_DIR: persistence,
    PERMITTED_CORS_ORIGINS: cors.join(","),
  };

  if (opts.sandboxBaseImage) {
    env.SANDBOX_BASE_IMAGE = opts.sandboxBaseImage;
  }

  return env;
}

/**
 * Serialize the env record to `.env` file content (KEY=VALUE lines).
 * Values are not quoted unless they contain whitespace or `#`.
 */
export function serializeOpenHandsEnv(env: Record<string, string>): string {
  const lines: string[] = [];
  for (const [key, value] of Object.entries(env)) {
    const needsQuotes = /[\s#]/.test(value);
    lines.push(needsQuotes ? `${key}="${value}"` : `${key}=${value}`);
  }
  return lines.join("\n") + "\n";
}
