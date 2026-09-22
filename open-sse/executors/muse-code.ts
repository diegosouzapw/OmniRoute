import {
  DefaultExecutor,
} from "./default.ts";
import type {
  ExecutorLog,
  ProviderCredentials,
} from "./base.ts";
import {
  META_MUSE_API_KEY_TTL_SECONDS,
  MetaMuseAuthError,
  mintMuseCodeApiKey,
} from "../services/museCodeAuth.ts";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : null;
}

/**
 * Muse Code uses the normal OpenAI-compatible executor for inference, plus two
 * provider-specific behaviours:
 *
 * 1. OAuth connections store Meta's OIDC identity token as refreshToken. When
 *    the daily Model API key approaches expiry, re-mint a new key from that
 *    identity token.
 * 2. Muse's Responses API supports a 24h prompt-cache retention window. The
 *    generic executor intentionally strips this field for strict upstreams, so
 *    restore it only on the Muse Code route after generic sanitisation.
 */
export class MuseCodeExecutor extends DefaultExecutor {
  constructor() {
    super("muse-code");
  }

  async refreshCredentials(
    credentials: ProviderCredentials,
    log?: ExecutorLog | null
  ): Promise<Partial<ProviderCredentials> | null> {
    if (!credentials.refreshToken) return null;

    try {
      const accessToken = await mintMuseCodeApiKey(credentials.refreshToken);
      return {
        accessToken,
        refreshToken: credentials.refreshToken,
        expiresAt: new Date(Date.now() + META_MUSE_API_KEY_TTL_SECONDS * 1000).toISOString(),
      };
    } catch (error) {
      if (error instanceof MetaMuseAuthError && (error.status === 401 || error.status === 403)) {
        log?.warn?.(
          "TOKEN_REFRESH",
          "Meta Muse identity is no longer authorised; reconnect the Meta account"
        );
        return null;
      }
      log?.warn?.(
        "TOKEN_REFRESH",
        `Meta Muse API-key re-mint failed: ${error instanceof Error ? error.message : String(error)}`
      );
      return null;
    }
  }

  transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: ProviderCredentials
  ): unknown {
    const original = asRecord(body);
    const requestedRetention =
      typeof original?.prompt_cache_retention === "string"
        ? original.prompt_cache_retention
        : "24h";
    const cleaned = super.transformRequest(model, body, stream, credentials);
    const record = asRecord(cleaned);
    if (!record) return cleaned;

    return {
      ...record,
      prompt_cache_retention: requestedRetention,
    };
  }
}

export default MuseCodeExecutor;
