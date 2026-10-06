/**
 * Shared Gemini (Google AI Studio) integration helpers.
 *
 * Dashboard `gemini` connections stay preferred. GEMINI_API_KEY /
 * GOOGLE_API_KEY are a headless fallback when no usable dashboard key
 * exists — the same class of bug as unused JINA_AI_API_KEY. Do not treat
 * the env as billed if a dashboard connection is selected (fill-first).
 */

export const GEMINI_PROVIDER_ID = "gemini";

/** Call-log / credential sentinel when the request used the process env key. */
export const GEMINI_ENV_CONNECTION_ID = "env:GEMINI_API_KEY";

export const GEMINI_ENV_API_KEY_NAMES = ["GEMINI_API_KEY", "GOOGLE_API_KEY"] as const;

export interface GeminiEnvCredentials {
  apiKey: string;
  accessToken: null;
  connectionId: typeof GEMINI_ENV_CONNECTION_ID;
  id: typeof GEMINI_ENV_CONNECTION_ID;
  provider: string;
  authType: "apikey";
  defaultModel: null;
}

export function isGeminiCredentialProvider(providerId: string | null | undefined): boolean {
  return providerId === GEMINI_PROVIDER_ID;
}

/**
 * Read the first non-empty Gemini env key. Dashboard connections always win
 * when getProviderCredentials finds one.
 */
export function readGeminiEnvApiKey(): string | null {
  for (const name of GEMINI_ENV_API_KEY_NAMES) {
    const value = process.env[name]?.trim();
    if (value) return value;
  }
  return null;
}

/**
 * Synthetic credentials for headless / Docker operators who inject
 * GEMINI_API_KEY (or GOOGLE_API_KEY) instead of adding a dashboard connection.
 */
export function buildGeminiEnvCredentials(
  providerId: string,
  options: {
    forcedConnectionId?: string | null;
    allowedConnections?: string[] | null;
    excludedConnectionIds?: Iterable<string> | null;
  } = {}
): GeminiEnvCredentials | null {
  if (!isGeminiCredentialProvider(providerId)) return null;

  const forced =
    typeof options.forcedConnectionId === "string" && options.forcedConnectionId.trim().length > 0
      ? options.forcedConnectionId.trim()
      : null;
  if (forced && forced !== GEMINI_ENV_CONNECTION_ID) return null;

  const allowed = options.allowedConnections;
  if (Array.isArray(allowed) && allowed.length > 0 && !allowed.includes(GEMINI_ENV_CONNECTION_ID)) {
    return null;
  }

  if (options.excludedConnectionIds) {
    for (const excluded of options.excludedConnectionIds) {
      if (excluded === GEMINI_ENV_CONNECTION_ID) return null;
    }
  }

  const apiKey = readGeminiEnvApiKey();
  if (!apiKey) return null;

  return {
    apiKey,
    accessToken: null,
    connectionId: GEMINI_ENV_CONNECTION_ID,
    id: GEMINI_ENV_CONNECTION_ID,
    provider: providerId,
    authType: "apikey",
    defaultModel: null,
  };
}
