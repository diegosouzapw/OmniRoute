/**
 * Shared Jina AI integration helpers.
 *
 * OmniRoute keeps two dashboard cards because the hosts differ:
 *   - jina-ai      Foundation API  https://api.jina.ai
 *   - jina-reader  Reader          https://r.jina.ai
 *
 * One Jina token works on both hosts. Dashboard connections stay preferred;
 * JINA_AI_API_KEY / JINA_API_KEY are a headless fallback when no usable
 * dashboard key exists. Do not treat the env as billed if a dashboard
 * connection is selected (fill-first, priority ascending).
 */

export const JINA_FOUNDATION_PROVIDER_ID = "jina-ai";
export const JINA_READER_PROVIDER_ID = "jina-reader";
export const JINA_SEARCH_PROVIDER_ID = "jina-search";

export const JINA_FOUNDATION_BASE_URL = "https://api.jina.ai";
export const JINA_READER_BASE_URL = "https://r.jina.ai";
export const JINA_SEARCH_BASE_URL = "https://s.jina.ai";
export const JINA_SEGMENT_BASE_URL = "https://segment.jina.ai";

/** Call-log / credential sentinel when the request used the process env key. */
export const JINA_ENV_CONNECTION_ID = "env:JINA_AI_API_KEY";

export const JINA_ENV_API_KEY_NAMES = ["JINA_AI_API_KEY", "JINA_API_KEY"] as const;

const JINA_CREDENTIAL_PROVIDERS = new Set<string>([
  JINA_FOUNDATION_PROVIDER_ID,
  JINA_READER_PROVIDER_ID,
  JINA_SEARCH_PROVIDER_ID,
]);

export interface JinaEnvCredentials {
  apiKey: string;
  accessToken: null;
  connectionId: typeof JINA_ENV_CONNECTION_ID;
  id: typeof JINA_ENV_CONNECTION_ID;
  provider: string;
  authType: "apikey";
  defaultModel: null;
}

export function isJinaCredentialProvider(providerId: string | null | undefined): boolean {
  return typeof providerId === "string" && JINA_CREDENTIAL_PROVIDERS.has(providerId);
}

/**
 * Read the first non-empty Jina env key. Dashboard connections always win
 * when getProviderCredentials finds one.
 */
export function readJinaEnvApiKey(): string | null {
  for (const name of JINA_ENV_API_KEY_NAMES) {
    const value = process.env[name]?.trim();
    if (value) return value;
  }
  return null;
}

/**
 * Synthetic credentials for headless / Docker operators who inject
 * JINA_AI_API_KEY instead of adding a dashboard connection.
 */
export function buildJinaEnvCredentials(
  providerId: string,
  options: {
    forcedConnectionId?: string | null;
    allowedConnections?: string[] | null;
    excludedConnectionIds?: Iterable<string> | null;
  } = {}
): JinaEnvCredentials | null {
  if (!isJinaCredentialProvider(providerId)) return null;

  const forced =
    typeof options.forcedConnectionId === "string" && options.forcedConnectionId.trim().length > 0
      ? options.forcedConnectionId.trim()
      : null;
  if (forced && forced !== JINA_ENV_CONNECTION_ID) return null;

  const allowed = options.allowedConnections;
  if (Array.isArray(allowed) && allowed.length > 0 && !allowed.includes(JINA_ENV_CONNECTION_ID)) {
    return null;
  }

  if (options.excludedConnectionIds) {
    for (const excluded of options.excludedConnectionIds) {
      if (excluded === JINA_ENV_CONNECTION_ID) return null;
    }
  }

  const apiKey = readJinaEnvApiKey();
  if (!apiKey) return null;

  return {
    apiKey,
    accessToken: null,
    connectionId: JINA_ENV_CONNECTION_ID,
    id: JINA_ENV_CONNECTION_ID,
    provider: providerId,
    authType: "apikey",
    defaultModel: null,
  };
}
