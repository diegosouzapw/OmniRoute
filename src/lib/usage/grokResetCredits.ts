import { getProviderConnectionById } from "@/lib/db/providers";
import { isConnectionUnavailableToAuxiliaryActivity } from "@/lib/exclusiveLeaseIsolation";
import {
  fetchAndPersistProviderLimits,
  refreshAndUpdateCredentials,
} from "@/lib/usage/providerLimits";
import { invalidateGrokCliQuotaCache } from "@omniroute/open-sse/services/grokCliQuotaFetcher.ts";
import {
  consumeGrokResetCredit as consumeGrokResetCreditRpc,
  GrokResetCreditError,
  listGrokResetCreditTokens,
  type GrokResetCreditOutcome,
  type PublicGrokResetCredit,
} from "@omniroute/open-sse/services/grokResetCredits.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

export { GrokResetCreditError };

type JsonRecord = Record<string, unknown>;

type GrokConnectionLike = JsonRecord & {
  id: string;
  provider: string;
  authType?: string;
  accessToken?: string;
};

export interface GrokResetCreditList {
  credits: PublicGrokResetCredit[];
  availableCount: number;
}

async function loadGrokConnection(connectionId: string): Promise<GrokConnectionLike> {
  if (await isConnectionUnavailableToAuxiliaryActivity(connectionId)) {
    throw new GrokResetCreditError(
      409,
      "exclusive_lease_active",
      "Reset-credit operations are deferred while an exclusive lease is active."
    );
  }
  const connection = (await getProviderConnectionById(
    connectionId
  )) as unknown as GrokConnectionLike | null;

  if (!connection) {
    throw new GrokResetCreditError(404, "connection_not_found", "Connection not found.");
  }

  if (connection.provider !== "grok-cli") {
    throw new GrokResetCreditError(
      400,
      "grok_provider_required",
      "Reset credits can only be redeemed for Grok Build accounts."
    );
  }

  if (connection.authType !== "oauth") {
    throw new GrokResetCreditError(
      400,
      "grok_oauth_required",
      "Grok reset credits require an OAuth connection."
    );
  }

  return connection;
}

async function refreshGrokConnectionIfNeeded(
  connection: GrokConnectionLike,
  force = false
): Promise<GrokConnectionLike> {
  const refreshed = await refreshAndUpdateCredentials(connection, {
    allowRotatingRefresh: true,
    force,
  });
  return refreshed.connection as GrokConnectionLike;
}

function requireAccessToken(connection: GrokConnectionLike): string {
  const token = typeof connection.accessToken === "string" ? connection.accessToken.trim() : "";
  if (!token) {
    throw new GrokResetCreditError(
      401,
      "grok_access_token_missing",
      "Grok OAuth access token is missing."
    );
  }
  return token;
}

export async function listGrokResetCredits(connectionId: string): Promise<GrokResetCreditList> {
  if (!connectionId || typeof connectionId !== "string") {
    throw new GrokResetCreditError(400, "connection_id_required", "connectionId is required.");
  }

  try {
    let connection = await loadGrokConnection(connectionId);
    connection = await refreshGrokConnectionIfNeeded(connection);
    return await listGrokResetCreditTokens(requireAccessToken(connection));
  } catch (error) {
    if (error instanceof GrokResetCreditError) throw error;
    throw new GrokResetCreditError(
      500,
      "grok_reset_credit_list_failed",
      sanitizeErrorMessage(error) || "Failed to load Grok reset credits."
    );
  }
}

export async function consumeGrokResetCredit(
  connectionId: string,
  // RedeemReset has no idempotency field (live X500 2026-09-05). Kept so the
  // shared /api/usage/codex-reset-credit body schema stays one shape.
  _idempotencyKey: string,
  creditId?: string
): Promise<{
  outcome: GrokResetCreditOutcome;
  usage: JsonRecord;
}> {
  if (!connectionId || typeof connectionId !== "string") {
    throw new GrokResetCreditError(400, "connection_id_required", "connectionId is required.");
  }

  try {
    let connection = await loadGrokConnection(connectionId);
    connection = await refreshGrokConnectionIfNeeded(connection);
    const outcome = await consumeGrokResetCreditRpc(requireAccessToken(connection), {
      tokenId: creditId,
    });
    invalidateGrokCliQuotaCache(connectionId);
    const refreshed = await fetchAndPersistProviderLimits(connectionId, "manual", {
      allowRotatingRefresh: true,
    });
    return { outcome, usage: refreshed.usage };
  } catch (error) {
    if (error instanceof GrokResetCreditError) throw error;
    throw new GrokResetCreditError(
      500,
      "grok_reset_credit_failed",
      sanitizeErrorMessage(error) || "Failed to redeem Grok reset credit."
    );
  }
}
