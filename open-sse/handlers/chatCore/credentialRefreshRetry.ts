import { refreshWithRetry, runWithOnPersist, runWithCasGuard } from "../../services/tokenRefresh.ts";
import { getProviderConnectionById, updateProviderConnection } from "@/lib/db/providers";
import { shouldIsolateProbeFailures } from "@/shared/utils/probeOrigin";
import { FORMATS } from "../../translator/formats.ts";

export interface CredentialRefreshRetryInput {
  targetFormat: string;
  translatedBody: Record<string, unknown> | null | undefined;
  executor: { refreshCredentials?: (credentials: Record<string, unknown>, log?: unknown) => Promise<unknown> };
  credentials: Record<string, unknown>;
  provider: string;
  resilienceSettings: { tokenRefreshBreaker: { scope: string; failureThreshold: number; cooldownMs: number } };
  log?: { info?: (...args: unknown[]) => void; warn?: (...args: unknown[]) => void };
  onCredentialsRefreshed?: (payload: Record<string, unknown>) => Promise<void> | void;
  connectionId?: string | null;
  getCurrentConnectionId: () => string | null | undefined;
}

export async function runCredentialRefreshRetry(input: CredentialRefreshRetryInput) {
  const { targetFormat, translatedBody, executor, credentials, provider, resilienceSettings, log, onCredentialsRefreshed, connectionId, getCurrentConnectionId } = input;
  let credentialRefreshPersistRan = false;
  const hadStreamOptions =
    targetFormat === FORMATS.OPENAI_RESPONSES &&
    translatedBody &&
    typeof translatedBody === "object" &&
    "stream_options" in translatedBody;
  if (hadStreamOptions) {
    delete (translatedBody as Record<string, unknown>).stream_options;
  }

  const executeRefreshCredentials = async (
    currentCreds: Record<string, unknown>
  ): Promise<Record<string, unknown> | null> => {
    if (typeof executor.refreshCredentials !== "function") {
      return null;
    }
    if (hadStreamOptions) {
      return null;
    }
    if (await shouldIsolateProbeFailures()) {
      return null;
    }

    const targetCredentials = (currentCreds || credentials || {}) as Record<string, unknown>;
    const attemptedRefreshToken =
      typeof targetCredentials?.refreshToken === "string" ? targetCredentials.refreshToken : null;
    credentialRefreshPersistRan = false;
    const persistFn = onCredentialsRefreshed
      ? async (refreshResult: Record<string, unknown>) => {
          credentialRefreshPersistRan = true;
          Object.assign(targetCredentials, refreshResult);
          Object.assign(credentials, refreshResult);
          await onCredentialsRefreshed(refreshResult);
        }
      : undefined;

    const casConnectionId =
      typeof targetCredentials?.connectionId === "string"
        ? targetCredentials.connectionId.trim()
        : "";
    const casReread = casConnectionId
      ? async () => {
          const latest = await getProviderConnectionById(casConnectionId);
          return typeof latest?.refreshToken === "string" ? latest.refreshToken : null;
        }
      : null;

    const newCredentials = (await refreshWithRetry(
      () =>
        runWithCasGuard(
          casReread ? { expectedRefreshToken: attemptedRefreshToken, reread: casReread } : null,
          () =>
            runWithOnPersist(persistFn, () => executor.refreshCredentials?.(targetCredentials, log))
        ),
      3,
      log,
      provider,
      {
        ...(casConnectionId ? { connectionId: casConnectionId } : {}),
        scope: resilienceSettings.tokenRefreshBreaker.scope,
        failureThreshold: resilienceSettings.tokenRefreshBreaker.failureThreshold,
        cooldownMs: resilienceSettings.tokenRefreshBreaker.cooldownMs,
      }
    )) as null | Record<string, unknown>;

    if (newCredentials?.accessToken || newCredentials?.copilotToken) {
      log?.info?.("TOKEN", `${provider?.toUpperCase()} | refreshed`);
      if (!credentialRefreshPersistRan) {
        Object.assign(targetCredentials, newCredentials);
        Object.assign(credentials, newCredentials);
      }
      const errorConnectionId = String(getCurrentConnectionId() || connectionId || "");
      if (errorConnectionId) {
        updateProviderConnection(errorConnectionId, newCredentials).catch(() => {});
      }
      return newCredentials;
    }
    return null;
  };

  const handleCredentialsRefreshed = async (refreshed: Record<string, unknown>) => {
    Object.assign(credentials, refreshed);
    if (!credentialRefreshPersistRan && onCredentialsRefreshed) {
      credentialRefreshPersistRan = true;
      const targetConnectionId =
        (credentials as { connectionId?: string })?.connectionId ||
        (credentials as { id?: string })?.id ||
        getCurrentConnectionId() ||
        connectionId;
      try {
        await onCredentialsRefreshed({
          ...refreshed,
          provider,
          connectionId: targetConnectionId,
        });
      } catch (refreshErr) {
        log?.warn?.(
          "REFRESH",
          `onCredentialsRefreshed persistence callback failed for connection ${targetConnectionId}: ${refreshErr}`
        );
      }
    }
  };

  return { executeRefreshCredentials, handleCredentialsRefreshed };
}
