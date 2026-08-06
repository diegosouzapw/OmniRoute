import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

import { getProviderCredentialsWithQuotaPreflight } from "./auth";
import { checkAndRefreshToken } from "./tokenRefresh";
import * as log from "../utils/logger";

interface ImageGenerationResult {
  success: boolean;
  status?: number;
  error?: unknown;
  data?: unknown;
}

interface ImageCredentialRetryOptions {
  provider: string;
  requestedModel: string | null;
  credentials: any;
  execute: (credentials: any) => Promise<ImageGenerationResult>;
}

interface ImageCredentialRetryResult {
  credentials: any;
  result: ImageGenerationResult;
}

function connectionIdOf(credentials: any): string | null {
  const connectionId = credentials?.connectionId;
  return typeof connectionId === "string" && connectionId.trim().length > 0
    ? connectionId.trim()
    : null;
}

function isCredentialSentinel(credentials: any): boolean {
  return Boolean(credentials?.allRateLimited || credentials?.allExpired);
}

async function selectNextCredentials(
  provider: string,
  requestedModel: string | null,
  excludedConnectionIds: Set<string>
) {
  return getProviderCredentialsWithQuotaPreflight(provider, null, null, requestedModel, {
    excludeConnectionIds: Array.from(excludedConnectionIds),
  });
}

/**
 * Keep image requests on the same credential lifecycle as chat requests.
 *
 * Each connection is attempted at most once. A refresh failure or upstream 401
 * excludes only that connection for the current request; it does not mutate the
 * account into a terminal state because another request may refresh it normally.
 */
export async function executeImageWithCredentialFallback({
  provider,
  requestedModel,
  credentials,
  execute,
}: ImageCredentialRetryOptions): Promise<ImageCredentialRetryResult> {
  // Local/no-auth image providers intentionally have no credential row. They
  // still need one direct attempt, but there is no account identity to refresh
  // or rotate after a 401.
  if (!credentials) {
    return { credentials, result: await execute(credentials) };
  }

  const excludedConnectionIds = new Set<string>();
  let currentCredentials = credentials;
  let lastCredentials = credentials;
  let lastResult: ImageGenerationResult | null = null;

  while (currentCredentials && !isCredentialSentinel(currentCredentials)) {
    const connectionId = connectionIdOf(currentCredentials);
    if (connectionId && excludedConnectionIds.has(connectionId)) break;
    if (connectionId) excludedConnectionIds.add(connectionId);

    try {
      currentCredentials = await checkAndRefreshToken(provider, currentCredentials);
    } catch (error) {
      log.warn("IMAGE", "Credential refresh failed; trying another image-provider account", {
        provider,
        connectionId,
        error: sanitizeErrorMessage(error instanceof Error ? error : new Error(String(error))),
      });
      if (!connectionId) throw error;
      currentCredentials = await selectNextCredentials(
        provider,
        requestedModel,
        excludedConnectionIds
      );
      continue;
    }

    lastCredentials = currentCredentials;
    lastResult = await execute(currentCredentials);
    if (lastResult.success || Number(lastResult.status) !== 401 || !connectionId) {
      return { credentials: lastCredentials, result: lastResult };
    }

    log.warn("IMAGE", "Image provider rejected credentials; trying another account", {
      provider,
      connectionId,
    });
    currentCredentials = await selectNextCredentials(
      provider,
      requestedModel,
      excludedConnectionIds
    );
  }

  return {
    credentials: lastCredentials,
    result: lastResult || {
      success: false,
      status: 401,
      error: "Authentication failed for all eligible image-provider accounts",
    },
  };
}
