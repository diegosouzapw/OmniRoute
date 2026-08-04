import { getProviderConnectionById, resolveProxyForConnection } from "@/lib/localDb";
import {
  fetchAndPersistProviderLimits,
  refreshAndUpdateCredentials,
} from "@/lib/usage/providerLimits";
import { invalidateCodexQuotaCache } from "@omniroute/open-sse/services/codexQuotaFetcher.ts";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const CODEX_RESET_CREDIT_CONSUME_URL =
  "https://chatgpt.com/backend-api/wham/rate-limit-reset-credits/consume";
const CODEX_RESET_CREDITS_URL = "https://chatgpt.com/backend-api/wham/rate-limit-reset-credits";

type JsonRecord = Record<string, unknown>;

type CodexConnectionLike = JsonRecord & {
  id: string;
  provider: string;
  authType?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
  tokenExpiresAt?: string;
  providerSpecificData?: JsonRecord;
};

export type CodexResetCreditOutcome = "reset" | "alreadyRedeemed";

export interface CodexResetCredit {
  id: string;
  resetType?: string;
  status?: string;
  grantedAt?: string;
  expiresAt?: string | null;
  title?: string;
  description?: string;
}

export type PublicCodexResetCredit = Omit<CodexResetCredit, "id"> & {
  selectionToken: string;
};

export interface CodexResetCreditList {
  credits: PublicCodexResetCredit[];
  availableCount: number;
}

export class CodexResetCreditError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "CodexResetCreditError";
    this.status = status;
    this.code = code;
  }
}

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function normalizeOutcome(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  return normalized || null;
}

function extractOutcome(payload: unknown): string | null {
  const direct = normalizeOutcome(payload);
  if (direct) return direct;

  const record = toRecord(payload);
  for (const key of ["code", "outcome", "status", "result", "type"]) {
    const normalized = normalizeOutcome(record[key]);
    if (normalized) return normalized;
  }

  return null;
}

function parseConsumeOutcome(payload: unknown): CodexResetCreditOutcome {
  const outcome = extractOutcome(payload);
  if (outcome === "reset") return "reset";
  if (outcome === "alreadyredeemed") return "alreadyRedeemed";

  if (outcome === "nocredit" || outcome === "nocredits") {
    throw new CodexResetCreditError(409, "no_credit", "No Codex reset credits are available.");
  }

  if (outcome === "nothingtoreset") {
    throw new CodexResetCreditError(
      409,
      "nothing_to_reset",
      "No exhausted Codex usage limit can be reset right now."
    );
  }

  throw new CodexResetCreditError(
    502,
    "unknown_reset_credit_response",
    "Codex returned an unknown reset-credit response."
  );
}

function throwKnownConsumeError(payload: unknown): void {
  const outcome = extractOutcome(payload);

  if (outcome === "nocredit" || outcome === "nocredits") {
    throw new CodexResetCreditError(409, "no_credit", "No Codex reset credits are available.");
  }

  if (outcome === "nothingtoreset") {
    throw new CodexResetCreditError(
      409,
      "nothing_to_reset",
      "No exhausted Codex usage limit can be reset right now."
    );
  }
}

function extractStringField(record: JsonRecord, keys: string[]): string | null {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim().length > 0) return value.trim();
  }
  return null;
}

function isUnavailableResetCredit(record: JsonRecord): boolean {
  const status = normalizeOutcome(
    record.status ?? record.state ?? record.outcome ?? record.result ?? record.code
  );
  if (
    status &&
    ["consumed", "redeeming", "redeemed", "used", "expired", "unavailable"].includes(status)
  ) {
    return true;
  }
  return record.consumed === true || record.redeemed === true || record.available === false;
}

function parseOptionalTimestamp(record: JsonRecord, keys: string[]): string | null | undefined {
  for (const key of keys) {
    const value = record[key];
    if (value === null) return null;
    if (typeof value === "string" && value.trim().length > 0) return value.trim();
  }
  return undefined;
}

function parseResetCredit(value: unknown): CodexResetCredit | null {
  const record = toRecord(value);
  if (!record || Object.keys(record).length === 0 || isUnavailableResetCredit(record)) return null;
  const id = extractStringField(record, ["credit_id", "creditId", "id"]);
  if (!id) return null;

  const expiresAt = parseOptionalTimestamp(record, [
    "expires_at",
    "expiresAt",
    "expiration_at",
    "expirationAt",
  ]);
  if (expiresAt) {
    const expiresAtMs = Date.parse(expiresAt);
    if (Number.isFinite(expiresAtMs) && expiresAtMs <= Date.now()) return null;
  }

  const resetType = extractStringField(record, ["reset_type", "resetType"]);
  const status = extractStringField(record, ["status", "state"]);
  const grantedAt = parseOptionalTimestamp(record, ["granted_at", "grantedAt"]);
  const title = extractStringField(record, ["title"]);
  const description = extractStringField(record, ["description"]);

  return {
    id,
    ...(resetType ? { resetType } : {}),
    ...(status ? { status } : {}),
    ...(grantedAt !== undefined ? { grantedAt } : {}),
    ...(expiresAt !== undefined ? { expiresAt } : {}),
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
  };
}

function getResetCreditCandidates(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;

  const record = toRecord(payload);
  for (const key of [
    "credits",
    "reset_credits",
    "resetCredits",
    "rate_limit_reset_credits",
    "rateLimitResetCredits",
    "items",
    "data",
  ]) {
    const value = record[key];
    if (Array.isArray(value)) return value;
  }

  return [];
}

function getExpirySortValue(credit: CodexResetCredit): number {
  if (!credit.expiresAt) return Number.POSITIVE_INFINITY;
  const expiresAtMs = Date.parse(credit.expiresAt);
  return Number.isFinite(expiresAtMs) ? expiresAtMs : Number.POSITIVE_INFINITY;
}

function parseAvailableResetCredits(payload: unknown): {
  credits: CodexResetCredit[];
  availableCount: number;
} {
  const credits = getResetCreditCandidates(payload)
    .map(parseResetCredit)
    .filter((credit): credit is CodexResetCredit => credit !== null)
    .map((credit, index) => ({ credit, index }))
    .sort(
      (a, b) => getExpirySortValue(a.credit) - getExpirySortValue(b.credit) || a.index - b.index
    )
    .map(({ credit }) => credit);

  const payloadRecord = toRecord(payload);
  const reportedCount = Number(payloadRecord.available_count ?? payloadRecord.availableCount);

  return {
    credits,
    availableCount: Number.isFinite(reportedCount)
      ? Math.max(0, Math.trunc(reportedCount))
      : credits.length,
  };
}

function toPublicResetCredit(credit: CodexResetCredit): PublicCodexResetCredit {
  const { id, ...metadata } = credit;
  return { ...metadata, selectionToken: id };
}

function selectResetCredit(payload: unknown, requestedCreditId?: string): CodexResetCredit {
  const { credits } = parseAvailableResetCredits(payload);
  if (requestedCreditId) {
    const selected = credits.find((credit) => credit.id === requestedCreditId);
    if (selected) return selected;
    throw new CodexResetCreditError(
      409,
      "selected_credit_unavailable",
      "The selected Codex reset credit is no longer available."
    );
  }

  if (credits[0]) return credits[0];

  throw new CodexResetCreditError(409, "no_credit", "No Codex reset credits are available.");
}

async function readResponsePayload(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function getWorkspaceId(connection: CodexConnectionLike): string | null {
  const providerSpecificData = toRecord(connection.providerSpecificData);
  const workspaceId = providerSpecificData.workspaceId;
  return typeof workspaceId === "string" && workspaceId.trim().length > 0
    ? workspaceId.trim()
    : null;
}

function buildCodexResetCreditHeaders(connection: CodexConnectionLike): Record<string, string> {
  if (!connection.accessToken) {
    throw new CodexResetCreditError(
      401,
      "codex_access_token_missing",
      "Codex OAuth access token is missing."
    );
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${connection.accessToken}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const workspaceId = getWorkspaceId(connection);
  if (workspaceId) headers["chatgpt-account-id"] = workspaceId;

  return headers;
}

async function loadCodexConnection(connectionId: string): Promise<CodexConnectionLike> {
  const connection = (await getProviderConnectionById(
    connectionId
  )) as unknown as CodexConnectionLike | null;

  if (!connection) {
    throw new CodexResetCreditError(404, "connection_not_found", "Connection not found.");
  }

  if (connection.provider !== "codex") {
    throw new CodexResetCreditError(
      400,
      "codex_provider_required",
      "Reset credits can only be redeemed for OpenAI Codex accounts."
    );
  }

  if (connection.authType !== "oauth") {
    throw new CodexResetCreditError(
      400,
      "codex_oauth_required",
      "Codex reset credits require an OAuth connection."
    );
  }

  return connection;
}

async function refreshCodexConnectionIfNeeded(
  connection: CodexConnectionLike,
  force = false
): Promise<CodexConnectionLike> {
  const refreshed = await refreshAndUpdateCredentials(connection, {
    allowRotatingRefresh: true,
    force,
  });
  return refreshed.connection as CodexConnectionLike;
}

async function postConsumeResetCredit(
  connection: CodexConnectionLike,
  idempotencyKey: string,
  creditId: string
): Promise<Response> {
  const headers = buildCodexResetCreditHeaders(connection);
  const proxyInfo = await resolveProxyForConnection(connection.id);
  return runWithProxyContext(proxyInfo?.proxy ?? null, () =>
    fetch(CODEX_RESET_CREDIT_CONSUME_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ redeem_request_id: idempotencyKey, credit_id: creditId }),
      signal: AbortSignal.timeout(15_000),
    })
  );
}

async function fetchResetCredits(connection: CodexConnectionLike): Promise<Response> {
  const headers = buildCodexResetCreditHeaders(connection);
  const proxyInfo = await resolveProxyForConnection(connection.id);
  return runWithProxyContext(proxyInfo?.proxy ?? null, () =>
    fetch(CODEX_RESET_CREDITS_URL, {
      method: "GET",
      headers,
      signal: AbortSignal.timeout(15_000),
    })
  );
}

async function consumeWithAuthRetry(
  connection: CodexConnectionLike,
  idempotencyKey: string,
  requestedCreditId?: string
): Promise<{ connection: CodexConnectionLike; response: Response }> {
  let refreshedConnection = await refreshCodexConnectionIfNeeded(connection);
  let creditsResponse = await fetchResetCredits(refreshedConnection);

  if (creditsResponse.status === 401 || creditsResponse.status === 403) {
    refreshedConnection = await refreshCodexConnectionIfNeeded(refreshedConnection, true);
    creditsResponse = await fetchResetCredits(refreshedConnection);
  }

  const creditsPayload = await readResponsePayload(creditsResponse);
  if (!creditsResponse.ok) {
    throwKnownConsumeError(creditsPayload);
    throw new CodexResetCreditError(
      creditsResponse.status,
      "codex_reset_credit_upstream_error",
      `Codex reset-credit API returned HTTP ${creditsResponse.status}.`
    );
  }

  const credit = selectResetCredit(creditsPayload, requestedCreditId);
  let response = await postConsumeResetCredit(refreshedConnection, idempotencyKey, credit.id);

  if (response.status === 401 || response.status === 403) {
    refreshedConnection = await refreshCodexConnectionIfNeeded(refreshedConnection, true);
    const refreshedCreditsResponse = await fetchResetCredits(refreshedConnection);
    const refreshedCreditsPayload = await readResponsePayload(refreshedCreditsResponse);
    if (!refreshedCreditsResponse.ok) {
      throwKnownConsumeError(refreshedCreditsPayload);
      throw new CodexResetCreditError(
        refreshedCreditsResponse.status,
        "codex_reset_credit_upstream_error",
        `Codex reset-credit API returned HTTP ${refreshedCreditsResponse.status}.`
      );
    }
    const refreshedCredit = selectResetCredit(refreshedCreditsPayload, requestedCreditId);
    response = await postConsumeResetCredit(
      refreshedConnection,
      idempotencyKey,
      refreshedCredit.id
    );
  }

  return { connection: refreshedConnection, response };
}

export async function listCodexResetCredits(connectionId: string): Promise<CodexResetCreditList> {
  if (!connectionId || typeof connectionId !== "string") {
    throw new CodexResetCreditError(400, "connection_id_required", "connectionId is required.");
  }

  try {
    let connection = await loadCodexConnection(connectionId);
    connection = await refreshCodexConnectionIfNeeded(connection);
    let response = await fetchResetCredits(connection);

    if (response.status === 401 || response.status === 403) {
      connection = await refreshCodexConnectionIfNeeded(connection, true);
      response = await fetchResetCredits(connection);
    }

    const payload = await readResponsePayload(response);
    if (!response.ok) {
      throwKnownConsumeError(payload);
      throw new CodexResetCreditError(
        response.status,
        "codex_reset_credit_upstream_error",
        `Codex reset-credit API returned HTTP ${response.status}.`
      );
    }

    const result = parseAvailableResetCredits(payload);
    return {
      availableCount: result.availableCount,
      credits: result.credits.map(toPublicResetCredit),
    };
  } catch (error) {
    if (error instanceof CodexResetCreditError) throw error;
    throw new CodexResetCreditError(
      500,
      "codex_reset_credit_list_failed",
      sanitizeErrorMessage(error) || "Failed to load Codex reset credits."
    );
  }
}

export async function consumeCodexResetCredit(
  connectionId: string,
  idempotencyKey: string,
  creditId?: string
): Promise<{
  outcome: CodexResetCreditOutcome;
  usage: JsonRecord;
}> {
  if (!connectionId || typeof connectionId !== "string") {
    throw new CodexResetCreditError(400, "connection_id_required", "connectionId is required.");
  }
  if (!idempotencyKey || typeof idempotencyKey !== "string" || !idempotencyKey.trim()) {
    throw new CodexResetCreditError(400, "idempotency_key_required", "idempotencyKey is required.");
  }

  try {
    const connection = await loadCodexConnection(connectionId);
    const normalizedCreditId =
      typeof creditId === "string" && creditId.trim().length > 0 ? creditId.trim() : undefined;
    const { response } = await consumeWithAuthRetry(
      connection,
      idempotencyKey.trim(),
      normalizedCreditId
    );
    const payload = await readResponsePayload(response);

    if (!response.ok) {
      throwKnownConsumeError(payload);
      throw new CodexResetCreditError(
        response.status,
        "codex_reset_credit_upstream_error",
        `Codex reset-credit API returned HTTP ${response.status}.`
      );
    }

    const outcome = parseConsumeOutcome(payload);
    invalidateCodexQuotaCache(connectionId);

    const refreshed = await fetchAndPersistProviderLimits(connectionId, "manual", {
      allowRotatingRefresh: true,
    });

    return { outcome, usage: refreshed.usage };
  } catch (error) {
    if (error instanceof CodexResetCreditError) throw error;
    throw new CodexResetCreditError(
      500,
      "codex_reset_credit_failed",
      sanitizeErrorMessage(error) || "Failed to redeem Codex reset credit."
    );
  }
}
