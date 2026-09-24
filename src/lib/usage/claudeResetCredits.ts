import { getProviderConnectionById } from "@/lib/db/providers";
import { isConnectionUnavailableToAuxiliaryActivity } from "@/lib/exclusiveLeaseIsolation";
import {
  fetchAndPersistProviderLimits,
  refreshAndUpdateCredentials,
} from "@/lib/usage/providerLimits";
import {
  claimClaudeResetCredit,
  parseAllClaudeResetCredits,
  resolveClaudeOrganizationUuid,
  type PublicClaudeResetCredit,
  type ClaudeResetCreditList,
} from "@omniroute/open-sse/services/claudeLimitReset.ts";
import { getClaudeCodeVersion } from "@omniroute/open-sse/executors/claudeIdentity.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

export { PublicClaudeResetCredit, ClaudeResetCreditList };

type JsonRecord = Record<string, unknown>;

type ClaudeConnectionLike = JsonRecord & {
  id: string;
  provider: string;
  authType?: string;
  accessToken?: string;
  providerSpecificData?: JsonRecord;
};

export type ClaudeResetCreditOutcome = "reset" | "alreadyRedeemed";

export class ClaudeResetCreditError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "ClaudeResetCreditError";
    this.status = status;
    this.code = code;
  }
}

async function loadClaudeConnection(connectionId: string): Promise<ClaudeConnectionLike> {
  if (await isConnectionUnavailableToAuxiliaryActivity(connectionId)) {
    throw new ClaudeResetCreditError(
      409,
      "exclusive_lease_active",
      "Reset-credit operations are deferred while an exclusive lease is active."
    );
  }
  const connection = (await getProviderConnectionById(
    connectionId
  )) as unknown as ClaudeConnectionLike | null;

  if (!connection) {
    throw new ClaudeResetCreditError(404, "connection_not_found", "Connection not found.");
  }

  if (connection.provider !== "claude") {
    throw new ClaudeResetCreditError(
      400,
      "claude_provider_required",
      "Reset credits can only be redeemed for Claude accounts."
    );
  }

  if (connection.authType !== "oauth") {
    throw new ClaudeResetCreditError(
      400,
      "claude_oauth_required",
      "Claude reset credits require an OAuth connection."
    );
  }

  return connection;
}

async function refreshClaudeConnectionIfNeeded(
  connection: ClaudeConnectionLike,
  force = false
): Promise<ClaudeConnectionLike> {
  const refreshed = await refreshAndUpdateCredentials(connection, {
    allowRotatingRefresh: true,
    force,
  });
  return refreshed.connection as ClaudeConnectionLike;
}

function requireAccessToken(connection: ClaudeConnectionLike): string {
  const token = typeof connection.accessToken === "string" ? connection.accessToken.trim() : "";
  if (!token) {
    throw new ClaudeResetCreditError(
      401,
      "claude_access_token_missing",
      "Claude OAuth access token is missing."
    );
  }
  return token;
}

async function fetchClaudeUsageBody(accessToken: string): Promise<unknown> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 10_000);
  try {
    const res = await fetch(
      "https://api.anthropic.com/api/oauth/usage?at_wall=1&cedar_ember=1&skip_spend=1",
      {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*",
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "User-Agent": `claude-cli/${getClaudeCodeVersion()} (external, cli)`,
          "x-app": "cli",
          "anthropic-beta": "oauth-2025-04-20",
        },
        signal: ctrl.signal,
      }
    );
    if (!res.ok) {
      const errBody = (await res.json().catch(() => null)) as JsonRecord | null;
      const msg =
        (typeof errBody?.message === "string" ? errBody.message : null) || `HTTP ${res.status}`;
      throw new ClaudeResetCreditError(
        res.status === 429 ? 429 : 502,
        res.status === 429 ? "rate_limited" : "claude_usage_failed",
        `Failed to fetch Claude usage: ${msg}`
      );
    }
    return await res.json().catch(() => ({}));
  } finally {
    clearTimeout(timer);
  }
}

export async function listClaudeResetCredits(connectionId: string): Promise<ClaudeResetCreditList> {
  if (!connectionId || typeof connectionId !== "string") {
    throw new ClaudeResetCreditError(400, "connection_id_required", "connectionId is required.");
  }

  try {
    let connection = await loadClaudeConnection(connectionId);
    connection = await refreshClaudeConnectionIfNeeded(connection);
    const token = requireAccessToken(connection);
    const usageBody = await fetchClaudeUsageBody(token);
    return parseAllClaudeResetCredits(usageBody);
  } catch (error) {
    if (error instanceof ClaudeResetCreditError) throw error;
    throw new ClaudeResetCreditError(
      500,
      "claude_reset_credit_list_failed",
      sanitizeErrorMessage(error) || "Failed to load Claude reset credits."
    );
  }
}

export async function consumeClaudeResetCredit(
  connectionId: string,
  idempotencyKey: string,
  creditId?: string
): Promise<{
  outcome: ClaudeResetCreditOutcome;
  usage: JsonRecord;
}> {
  if (!connectionId || typeof connectionId !== "string") {
    throw new ClaudeResetCreditError(400, "connection_id_required", "connectionId is required.");
  }

  try {
    let connection = await loadClaudeConnection(connectionId);
    connection = await refreshClaudeConnectionIfNeeded(connection);
    const token = requireAccessToken(connection);
    const orgUuid = await resolveClaudeOrganizationUuid(connection.providerSpecificData, token);
    if (!orgUuid) {
      throw new ClaudeResetCreditError(
        400,
        "claude_organization_uuid_missing",
        "No organization UUID found for Claude connection; cannot claim reset."
      );
    }

    const claim = await claimClaudeResetCredit(token, orgUuid, {
      creditId,
      requestId: idempotencyKey,
    });

    if (claim.result === "reset" || claim.result === "not_limited") {
      const refreshed = await fetchAndPersistProviderLimits(connectionId, "manual", {
        allowRotatingRefresh: true,
      });
      return { outcome: "reset", usage: refreshed.usage };
    }
    if (claim.result === "already_used") {
      throw new ClaudeResetCreditError(
        409,
        "already_used",
        "This reset credit has already been used this week."
      );
    }
    if (claim.result === "cooldown") {
      throw new ClaudeResetCreditError(
        429,
        "cooldown_active",
        `Reset is in cooldown until ${claim.nextAvailableAt ?? "later"}.`
      );
    }
    if (claim.result === "ineligible") {
      throw new ClaudeResetCreditError(
        403,
        "ineligible",
        "Account is not eligible to claim this reset credit."
      );
    }
    throw new ClaudeResetCreditError(
      502,
      `claim_${claim.result}`,
      `Reset credit claim failed: ${claim.result}`
    );
  } catch (error) {
    if (error instanceof ClaudeResetCreditError) throw error;
    throw new ClaudeResetCreditError(
      500,
      "claude_reset_credit_failed",
      sanitizeErrorMessage(error) || "Failed to redeem Claude reset credit."
    );
  }
}
