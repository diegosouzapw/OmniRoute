import path from "node:path";
import {
  buildFactoryLocalSyncMarker,
  syncFactoryCliCredentials,
  type FactoryCliBackend,
  type FactoryCliFileName,
  type FactoryCliSession,
  type FactoryCliSyncExpected,
} from "@omniroute/open-sse/services/factory/localCredentials.ts";
import { ensureCliConfigWriteAllowed, getCliConfigHome } from "@/shared/services/cliRuntime";

type JsonRecord = Record<string, unknown>;
type LocalSyncLogger = {
  warn?: (tag: string, message: string, extra?: Record<string, unknown>) => void;
};

const FACTORY_CLI_STORE_DIRECTORY = ".factory";
const FACTORY_CLI_FILE_NAMES: Record<FactoryCliFileName, true> = {
  "auth.v2.file": true,
  "auth.v2.loginkeychain": true,
};

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function nonemptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function readMarker(value: unknown): {
  backend: FactoryCliBackend;
  fileName: FactoryCliFileName;
  tokenFingerprint: string;
} | null {
  const marker = asRecord(value);
  const backend = marker.backend;
  const fileName = marker.fileName;
  const tokenFingerprint = nonemptyString(marker.tokenFingerprint);
  if (
    (backend !== "file" && backend !== "keychain") ||
    typeof fileName !== "string" ||
    !Object.hasOwn(FACTORY_CLI_FILE_NAMES, fileName) ||
    !tokenFingerprint
  ) {
    return null;
  }
  return {
    backend,
    fileName: fileName as FactoryCliFileName,
    tokenFingerprint,
  };
}

function warn(log: LocalSyncLogger | undefined, connectionId: string, reason: string): void {
  log?.warn?.("TOKEN_REFRESH", "Factory local token sync skipped", { connectionId, reason });
}

/**
 * Sync rotated Factory credentials to the same local Droid store after the DB commit.
 * The CLI store remains untouched unless its token pair still matches the committed
 * generation or the last generation OmniRoute synchronized.
 */
export async function syncFactoryCliSessionAfterPersist(
  credentials: JsonRecord,
  verifiedResult: JsonRecord,
  log?: LocalSyncLogger
): Promise<void> {
  const connectionId = nonemptyString(credentials.connectionId);
  const inputData = asRecord(credentials.providerSpecificData);
  if (!connectionId || inputData.isLocalCli !== true) return;

  try {
    const { getProviderConnectionById, mergeConnectionProviderSpecificData } =
      await import("@/lib/db/providers");
    const committed = await getProviderConnectionById(connectionId);
    if (!committed || committed.provider !== "factory" || committed.authType !== "oauth") {
      warn(log, connectionId, "connection_missing_or_not_factory_oauth");
      return;
    }

    const committedData = asRecord(committed.providerSpecificData);
    if (committedData.isLocalCli !== true) {
      warn(log, connectionId, "local_import_marker_missing");
      return;
    }

    const marker = readMarker(committedData.factoryLocalSync);
    if (!marker) {
      warn(log, connectionId, "local_sync_marker_invalid");
      return;
    }

    const nextAccessToken = nonemptyString(verifiedResult.accessToken);
    const nextRefreshToken =
      nonemptyString(verifiedResult.refreshToken) || nonemptyString(committed.refreshToken);
    if (!nextAccessToken || !nextRefreshToken) {
      warn(log, connectionId, "committed_tokens_missing");
      return;
    }

    // The asynchronous OAuth request may have lost a CAS race. Never mirror a
    // result that is not the credential generation currently stored in OmniRoute.
    if (committed.accessToken !== nextAccessToken || committed.refreshToken !== nextRefreshToken) {
      warn(log, connectionId, "committed_generation_changed");
      return;
    }

    const directory = path.join(getCliConfigHome(), FACTORY_CLI_STORE_DIRECTORY);
    const targetPath = path.join(directory, marker.fileName);
    if (ensureCliConfigWriteAllowed(targetPath, { toolLabel: "Factory Droid" })) {
      warn(log, connectionId, "host_write_refused");
      return;
    }

    const previousAccessToken = nonemptyString(credentials.accessToken);
    const previousRefreshToken = nonemptyString(credentials.refreshToken);
    if (!previousAccessToken || !previousRefreshToken) {
      warn(log, connectionId, "previous_tokens_missing");
      return;
    }

    const organizationId =
      nonemptyString(committedData.workosOrgId) || nonemptyString(committedData.orgId) || undefined;
    const expected: FactoryCliSyncExpected = {
      backend: marker.backend,
      fileName: marker.fileName,
      preRefreshAccessToken: previousAccessToken,
      preRefreshRefreshToken: previousRefreshToken,
      lastSyncedFingerprint: marker.tokenFingerprint,
      activeOrganizationId: organizationId,
    };
    const next: FactoryCliSession = {
      accessToken: nextAccessToken,
      refreshToken: nextRefreshToken,
      activeOrganizationId: organizationId,
      backend: marker.backend,
      fileName: marker.fileName,
    };

    const result = await syncFactoryCliCredentials(directory, expected, next);
    if (result !== "updated" && result !== "unchanged") {
      warn(log, connectionId, `local_store_${result}`);
      return;
    }

    const nextMarker = buildFactoryLocalSyncMarker(
      marker.backend,
      marker.fileName,
      nextAccessToken,
      nextRefreshToken
    );
    await mergeConnectionProviderSpecificData(connectionId, { factoryLocalSync: nextMarker });
  } catch {
    // Local write-back is best-effort after the authoritative DB commit.
    warn(log, connectionId, "local_sync_failed");
  }
}
