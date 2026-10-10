import { getProviderConnectionById, updateProviderConnection } from "@/lib/db/providers";
import type { BaseExecutor } from "@omniroute/open-sse/executors/base";
import { isUnrecoverableRefreshError } from "@omniroute/open-sse/services/tokenRefresh/shared.ts";
import {
  rotationGroupFor,
  serializeRefresh,
} from "@omniroute/open-sse/services/refreshSerializer.ts";
import { getAccessToken } from "@omniroute/open-sse/services/tokenRefresh.ts";

type JsonRecord = Record<string, unknown>;

type CredentialRefreshResult = JsonRecord & {
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  expiresAt?: string;
  copilotToken?: string;
  copilotTokenExpiresAt?: string;
};

export interface ProviderConnectionLike {
  id: string;
  provider: string;
  authType?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string | null;
  tokenExpiresAt?: string | null;
  providerSpecificData?: JsonRecord;
  testStatus?: string;
  isActive?: boolean;
  lastError?: string | null;
  lastErrorAt?: string | null;
  lastErrorType?: string | null;
  lastErrorSource?: string | null;
  errorCode?: string | number | null;
  rateLimitedUntil?: string | null;
  backoffLevel?: number;
}

export interface CredentialRefreshOptions {
  allowRotatingRefresh?: boolean;
  force?: boolean;
}

export type CredentialExecutorResolver = (provider: string) => Promise<BaseExecutor>;

function withStatus(error: Error, status: number): Error & { status: number } {
  return Object.assign(error, { status });
}

/**
 * Whether the quota path may refresh this provider's token.
 *
 * Rotating-refresh providers mint a single-use refresh token on every refresh,
 * so bulk quota sync must not refresh siblings concurrently. The on-demand path
 * explicitly opts in and remains serialized per rotation group.
 */
export function shouldAttemptRotatingRefresh(
  provider: string,
  allowRotatingRefresh: boolean | undefined
): boolean {
  if (rotationGroupFor(provider) === null) return true;
  return allowRotatingRefresh === true;
}

function buildCredentialUpdateData(
  connection: ProviderConnectionLike,
  refreshResult: CredentialRefreshResult
): JsonRecord {
  const updateData: JsonRecord = {
    updatedAt: new Date().toISOString(),
  };

  if (refreshResult.accessToken) {
    updateData.accessToken = refreshResult.accessToken;
  }
  if (refreshResult.refreshToken) {
    updateData.refreshToken = refreshResult.refreshToken;
  }
  if (refreshResult.expiresIn) {
    const expiresAt = new Date(Date.now() + refreshResult.expiresIn * 1000).toISOString();
    updateData.expiresAt = expiresAt;
    updateData.tokenExpiresAt = expiresAt;
  } else if (refreshResult.expiresAt) {
    updateData.expiresAt = refreshResult.expiresAt;
    updateData.tokenExpiresAt = refreshResult.expiresAt;
  }
  if (refreshResult.copilotToken || refreshResult.copilotTokenExpiresAt) {
    updateData.providerSpecificData = {
      ...(connection.providerSpecificData || {}),
      copilotToken: refreshResult.copilotToken,
      copilotTokenExpiresAt: refreshResult.copilotTokenExpiresAt,
    };
  }

  return updateData;
}

async function refreshFactoryCredentialsWithCommit(
  connection: ProviderConnectionLike,
  credentials: JsonRecord
): Promise<{ connection: ProviderConnectionLike; refreshed: boolean }> {
  let committed: ProviderConnectionLike | null = null;
  const result = (await getAccessToken("factory", credentials, console, null, async (refreshed) => {
    const updateData = buildCredentialUpdateData(connection, refreshed as CredentialRefreshResult);
    if (
      refreshed.providerSpecificData &&
      typeof refreshed.providerSpecificData === "object" &&
      !Array.isArray(refreshed.providerSpecificData)
    ) {
      updateData.providerSpecificData = refreshed.providerSpecificData;
    }
    const saved = await updateProviderConnection(connection.id, updateData, {
      mergeProviderSpecificData: true,
    });
    if (!saved || typeof saved.id !== "string") {
      throw withStatus(new Error("Factory credential persistence failed"), 409);
    }
    committed = { ...connection, ...saved, id: saved.id, provider: "factory" };
  })) as CredentialRefreshResult | null;

  if (!result || isUnrecoverableRefreshError(result)) {
    if (connection.accessToken) return { connection, refreshed: false };
    throw withStatus(
      new Error("Failed to refresh credentials. Please re-authorize the connection."),
      401
    );
  }
  if (!result.accessToken) return { connection, refreshed: false };
  if (committed) return { connection: committed, refreshed: true };

  const winner = await getProviderConnectionById(connection.id);
  if (
    winner?.provider === "factory" &&
    typeof winner.accessToken === "string" &&
    winner.accessToken
  ) {
    return {
      connection: {
        ...connection,
        ...winner,
        id: connection.id,
        provider: "factory",
        accessToken: winner.accessToken,
      },
      refreshed: false,
    };
  }
  throw withStatus(new Error("Factory refresh was superseded without a committed credential"), 409);
}

/** Refresh and persist credentials using a caller-supplied executor resolver. */
export async function refreshAndUpdateCredentialsWithResolver(
  connection: ProviderConnectionLike,
  resolveExecutor: CredentialExecutorResolver,
  opts: CredentialRefreshOptions = {}
) {
  if (!shouldAttemptRotatingRefresh(connection.provider, opts.allowRotatingRefresh)) {
    return { connection, refreshed: false };
  }
  const executor = await resolveExecutor(connection.provider);
  const credentials = {
    connectionId: connection.id,
    accessToken: connection.accessToken,
    refreshToken: connection.refreshToken,
    expiresAt: connection.tokenExpiresAt || connection.expiresAt || null,
    providerSpecificData: connection.providerSpecificData,
    copilotToken: connection.providerSpecificData?.copilotToken,
    copilotTokenExpiresAt: connection.providerSpecificData?.copilotTokenExpiresAt,
  };

  if (!opts.force && !executor.needsRefresh(credentials)) {
    return { connection, refreshed: false };
  }
  if (connection.provider === "factory") {
    return refreshFactoryCredentialsWithCommit(connection, credentials);
  }

  const refreshResult = (await serializeRefresh(connection.provider, () =>
    executor.refreshCredentials(credentials, console)
  )) as CredentialRefreshResult | null;

  // A dead refresh token surfaces as an unrecoverable sentinel, not a falsy
  // result: without this guard the truthy sentinel would read as a success
  // and the helper would persist it as refreshed credentials.
  if (!refreshResult || isUnrecoverableRefreshError(refreshResult)) {
    if (connection.accessToken) {
      return { connection, refreshed: false };
    }
    throw withStatus(
      new Error("Failed to refresh credentials. Please re-authorize the connection."),
      401
    );
  }

  const updateData = buildCredentialUpdateData(connection, refreshResult);

  await updateProviderConnection(connection.id, updateData);

  return {
    connection: {
      ...connection,
      ...updateData,
      providerSpecificData:
        (updateData.providerSpecificData as JsonRecord | undefined) ||
        connection.providerSpecificData,
    },
    refreshed: true,
  };
}
