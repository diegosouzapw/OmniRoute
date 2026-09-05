import { randomBytes } from "node:crypto";

import {
  acquireExclusiveConnectionLease,
  releaseExclusiveConnectionLease,
} from "@/lib/db/exclusiveConnectionLeases";
import { getProviderConnectionById } from "@/lib/db/providers";
import { resolveProxyForConnection } from "@/lib/db/settings";
import { isConnectionUnavailableToAuxiliaryActivity } from "@/lib/exclusiveLeaseIsolation";
import { fetchAndPersistProviderLimits } from "@/lib/usage/providerLimits";
import {
  fetchGlmResetCardList,
  getGlmResetCardEnvelopeMessage,
  getGlmResetCardEnvelopeStatus,
  isGlmResetCardEnvelopeOk,
  isGlmResetCardListEnvelopeOk,
  parseGlmResetCards,
  redeemGlmResetCard,
  type GlmResetCard,
} from "@omniroute/open-sse/services/usage/glmResetCards.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import {
  runWithDirectFetchContext,
  runWithProxyContext,
} from "@omniroute/open-sse/utils/proxyFetch.ts";

type JsonRecord = Record<string, unknown>;

export const GLM_RESET_CARD_PROVIDERS = ["glm", "glm-cn", "glmt", "zai"] as const;

const ATTEMPT_TTL_MS = 10 * 60_000;
const MAX_ATTEMPTS = 500;

// Short-lived synthetic operation lease: `exclusive_connection_leases` has no FK on
// api_key_id, so a namespaced synthetic id is schema-legal. The partial unique index
// on (connection_id) WHERE state = 'ACTIVE' gives an atomic fence around the wire
// operations that no check-then-act availability probe can provide.
const OPERATION_LEASE_TTL_MS = 60_000;
const OPERATION_LEASE_API_KEY_ID = "omniroute:glm-reset-card-operation";
const OPERATION_LEASE_OWNER_PREFIX = "vlo_";

type ProxyLike = Parameters<typeof runWithProxyContext>[0];

/** A connection with no proxy must go explicitly direct — passing null to
 * runWithProxyContext would inherit an ambient context instead. */
function runWithConnectionFetch<T>(proxy: ProxyLike, fn: () => T): T {
  return proxy ? runWithProxyContext(proxy, fn) : runWithDirectFetchContext(fn);
}

/** Map transport-layer proxy failures to safe typed errors. Public messages are
 * static: the underlying error text can embed proxy host:port topology. */
function toSafeTransportError(error: unknown, fallback: GlmResetCardError): GlmResetCardError {
  const err = error as { code?: unknown; errorCode?: unknown };
  const code = typeof err?.code === "string" ? err.code : null;
  const errorCode = typeof err?.errorCode === "string" ? err.errorCode : null;
  if (code === "PROXY_UNREACHABLE" || errorCode === "proxy_unreachable") {
    return new GlmResetCardError(503, "proxy_unreachable", "The connection proxy is unreachable.");
  }
  if (code === "PROXY_FAMILY_UNAVAILABLE" || errorCode === "proxy_family_unavailable") {
    return new GlmResetCardError(
      502,
      "proxy_family_unavailable",
      "No proxy is available for this request."
    );
  }
  if (code === "PROXY_REQUEST_FAILED" || errorCode === "proxy_request_failed") {
    return new GlmResetCardError(502, "proxy_request_failed", "The proxy request failed.");
  }
  if (code === "RELAY_TIMEOUT" || errorCode === "relay_timeout") {
    return new GlmResetCardError(504, "relay_timeout", "The proxied request timed out.");
  }
  return fallback;
}

/** Atomically claim the connection for one list/use operation. */
async function withOperationLease<T>(
  connection: GlmConnectionLike,
  operation: () => Promise<T>
): Promise<T> {
  const leaseOwnerId = OPERATION_LEASE_OWNER_PREFIX + randomBytes(32).toString("base64url");
  const acquired = acquireExclusiveConnectionLease({
    leaseOwnerId,
    apiKeyId: OPERATION_LEASE_API_KEY_ID,
    provider: connection.provider,
    connectionId: connection.id,
    ttlMs: OPERATION_LEASE_TTL_MS,
  });
  if (acquired.kind === "CONNECTION_BUSY" || acquired.kind === "OWNER_ALREADY_ACTIVE") {
    throw new GlmResetCardError(
      409,
      "exclusive_lease_active",
      "Reset-card operations are deferred while an exclusive lease is active."
    );
  }
  try {
    return await operation();
  } finally {
    releaseExclusiveConnectionLease({
      leaseOwnerId,
      generation: acquired.lease.generation,
      apiKeyId: OPERATION_LEASE_API_KEY_ID,
    });
  }
}

type GlmConnectionLike = JsonRecord & {
  id: string;
  provider: string;
  apiKey?: string;
  providerSpecificData?: JsonRecord;
};

export type PublicGlmResetCard = Omit<GlmResetCard, "id"> & {
  selectionToken: string;
};

export interface GlmResetCardListResult {
  credits: PublicGlmResetCard[];
  availableCount: number;
  lastFiveHourResetAt: string | null;
  lastWeekResetAt: string | null;
}

export interface GlmResetCardConsumeResult {
  outcome: "reset";
  usage?: JsonRecord;
  refreshPending?: true;
}

interface RedemptionAttempt {
  requestedSelection: string | null;
  card?: GlmResetCard;
  inFlight?: Promise<GlmResetCardConsumeResult>;
  committed?: GlmResetCardConsumeResult;
  expiresAt: number;
}

const redemptionAttempts = new Map<string, RedemptionAttempt>();

export class GlmResetCardError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "GlmResetCardError";
    this.status = status;
    this.code = code;
  }
}

export function isGlmResetCardProvider(provider: unknown): boolean {
  return (
    typeof provider === "string" &&
    (GLM_RESET_CARD_PROVIDERS as readonly string[]).includes(provider)
  );
}

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toPublicCard(card: GlmResetCard): PublicGlmResetCard {
  const { id, ...metadata } = card;
  return { ...metadata, selectionToken: id };
}

function getProviderSpecificData(connection: GlmConnectionLike): JsonRecord {
  return {
    ...toRecord(connection.providerSpecificData),
    ...(connection.provider === "glm-cn" ? { apiRegion: "china" } : {}),
  };
}

async function loadGlmConnection(connectionId: string): Promise<GlmConnectionLike> {
  if (await isConnectionUnavailableToAuxiliaryActivity(connectionId)) {
    throw new GlmResetCardError(
      409,
      "exclusive_lease_active",
      "Reset-card operations are deferred while an exclusive lease is active."
    );
  }

  const connection = (await getProviderConnectionById(
    connectionId
  )) as unknown as GlmConnectionLike | null;

  if (!connection) {
    throw new GlmResetCardError(404, "connection_not_found", "Connection not found.");
  }
  if (!isGlmResetCardProvider(connection.provider)) {
    throw new GlmResetCardError(
      400,
      "glm_provider_required",
      "Reset cards can only be redeemed for GLM coding-plan accounts."
    );
  }
  if (!connection.apiKey) {
    throw new GlmResetCardError(
      401,
      "glm_api_key_missing",
      "GLM coding-plan API key is missing on this connection."
    );
  }

  return connection;
}

function assertEnvelopeOk(
  payload: unknown,
  httpStatus: number,
  fallbackMessage: string,
  requireListData = false
): void {
  const envelopeOk = requireListData
    ? isGlmResetCardListEnvelopeOk(payload)
    : isGlmResetCardEnvelopeOk(payload);
  if (envelopeOk && httpStatus < 400) return;

  const status = getGlmResetCardEnvelopeStatus(payload, httpStatus);
  if (status === 401 || status === 403) {
    throw new GlmResetCardError(
      401,
      "glm_reset_card_unauthorized",
      "The GLM API key was rejected by the reset-card API."
    );
  }

  const upstreamMessage = getGlmResetCardEnvelopeMessage(payload);
  throw new GlmResetCardError(
    status >= 400 ? status : 502,
    "glm_reset_card_upstream_error",
    sanitizeErrorMessage(upstreamMessage) || fallbackMessage
  );
}

function pruneAttempts(now = Date.now()): void {
  for (const [key, attempt] of redemptionAttempts) {
    if (!attempt.inFlight && attempt.expiresAt <= now) redemptionAttempts.delete(key);
  }

  if (redemptionAttempts.size <= MAX_ATTEMPTS) return;
  for (const [key, attempt] of redemptionAttempts) {
    if (!attempt.inFlight) redemptionAttempts.delete(key);
    if (redemptionAttempts.size <= MAX_ATTEMPTS) break;
  }
}

function attemptKey(connectionId: string, idempotencyKey: string): string {
  return `${connectionId}:${idempotencyKey}`;
}

function normalizeSelection(selectionToken?: string): string | null {
  return typeof selectionToken === "string" && selectionToken.trim() ? selectionToken.trim() : null;
}

function assertCompatibleAttempt(
  attempt: RedemptionAttempt,
  requestedSelection: string | null
): void {
  if (attempt.requestedSelection !== requestedSelection) {
    throw new GlmResetCardError(
      409,
      "idempotency_key_conflict",
      "This idempotency key is already bound to a different reset-card selection."
    );
  }
}

async function refreshAfterCommit(connectionId: string): Promise<GlmResetCardConsumeResult> {
  try {
    const refreshed = await fetchAndPersistProviderLimits(connectionId, "manual", {
      allowRotatingRefresh: true,
    });
    return { outcome: "reset", usage: refreshed.usage };
  } catch {
    // Redemption is already irreversible. The caller can preserve its current
    // quotas and refresh later instead of turning committed success into a 500.
    return { outcome: "reset", refreshPending: true };
  }
}

export async function listGlmResetCards(connectionId: string): Promise<GlmResetCardListResult> {
  if (!connectionId || typeof connectionId !== "string") {
    throw new GlmResetCardError(400, "connection_id_required", "connectionId is required.");
  }

  try {
    const connection = await loadGlmConnection(connectionId);
    const proxyInfo = await resolveProxyForConnection(connection.id);
    const { response, payload } = await withOperationLease(connection, () =>
      runWithConnectionFetch(proxyInfo?.proxy ?? null, () =>
        fetchGlmResetCardList(connection.apiKey as string, getProviderSpecificData(connection))
      )
    );
    assertEnvelopeOk(payload, response.status, "The GLM reset-card API returned an error.", true);

    const parsed = parseGlmResetCards(payload);
    return {
      credits: parsed.cards.map(toPublicCard),
      availableCount: parsed.availableCount,
      lastFiveHourResetAt: parsed.lastFiveHourResetAt,
      lastWeekResetAt: parsed.lastWeekResetAt,
    };
  } catch (error) {
    if (error instanceof GlmResetCardError) throw error;
    throw toSafeTransportError(
      error,
      new GlmResetCardError(500, "glm_reset_card_list_failed", "Failed to load GLM reset cards.")
    );
  }
}

async function executeRedemption(
  attempt: RedemptionAttempt,
  connection: GlmConnectionLike,
  requestId: string,
  proxyConfig: ProxyLike
): Promise<void> {
  const providerSpecificData = getProviderSpecificData(connection);
  const apiKey = connection.apiKey as string;

  if (!attempt.card) {
    const listed = await runWithConnectionFetch(proxyConfig, () =>
      fetchGlmResetCardList(apiKey, providerSpecificData)
    );
    assertEnvelopeOk(
      listed.payload,
      listed.response.status,
      "The GLM reset-card API returned an error.",
      true
    );

    const { cards } = parseGlmResetCards(listed.payload);
    const card = attempt.requestedSelection
      ? cards.find((entry) => entry.id === attempt.requestedSelection)
      : cards[0];
    if (!card) {
      throw new GlmResetCardError(
        409,
        attempt.requestedSelection ? "selected_card_unavailable" : "no_reset_card",
        attempt.requestedSelection
          ? "The selected GLM reset card is no longer available."
          : "No GLM reset cards are available."
      );
    }
    attempt.card = card;
  }

  // A transport rejection is ambiguous: z.ai may have committed the card before
  // the response was lost. Keep `attempt.card`, and the next call will retry the
  // exact same body/requestId without relisting.
  const redeemed = await runWithConnectionFetch(proxyConfig, () =>
    redeemGlmResetCard(apiKey, providerSpecificData, attempt.card as GlmResetCard, requestId)
  );
  assertEnvelopeOk(
    redeemed.payload,
    redeemed.response.status,
    "The GLM reset-card API rejected the redemption."
  );
}

export async function consumeGlmResetCard(
  connectionId: string,
  idempotencyKey: string,
  selectionToken?: string
): Promise<GlmResetCardConsumeResult> {
  if (!connectionId || typeof connectionId !== "string") {
    throw new GlmResetCardError(400, "connection_id_required", "connectionId is required.");
  }
  if (!idempotencyKey || typeof idempotencyKey !== "string" || !idempotencyKey.trim()) {
    throw new GlmResetCardError(400, "idempotency_key_required", "idempotencyKey is required.");
  }

  const requestId = idempotencyKey.trim();
  const requestedSelection = normalizeSelection(selectionToken);
  const key = attemptKey(connectionId, requestId);

  pruneAttempts();
  const activeAttempt = redemptionAttempts.get(key);
  if (activeAttempt?.inFlight) {
    assertCompatibleAttempt(activeAttempt, requestedSelection);
    activeAttempt.expiresAt = Date.now() + ATTEMPT_TTL_MS;
    return activeAttempt.inFlight;
  }

  try {
    const connection = await loadGlmConnection(connectionId);
    const proxyInfo = await resolveProxyForConnection(connection.id);

    const existing = redemptionAttempts.get(key);
    if (existing) {
      assertCompatibleAttempt(existing, requestedSelection);
      existing.expiresAt = Date.now() + ATTEMPT_TTL_MS;
      if (existing.committed) return existing.committed;
      if (existing.inFlight) return existing.inFlight;
    }

    const attempt: RedemptionAttempt = existing ?? {
      requestedSelection,
      expiresAt: Date.now() + ATTEMPT_TTL_MS,
    };
    redemptionAttempts.set(key, attempt);

    const operation = (async () => {
      await withOperationLease(connection, () =>
        executeRedemption(attempt, connection, requestId, proxyInfo?.proxy ?? null)
      );
      return runWithConnectionFetch(proxyInfo?.proxy ?? null, () =>
        refreshAfterCommit(connection.id)
      );
    })();
    attempt.inFlight = operation;

    try {
      const result = await operation;
      attempt.committed = result;
      attempt.expiresAt = Date.now() + ATTEMPT_TTL_MS;
      return result;
    } catch (error) {
      // Keep ambiguous transport failures after a card has been selected. A lease
      // conflict is also a retryable local deferral, so it must not discard the
      // selected card/requestId binding from a previous ambiguous attempt.
      const retryableLeaseConflict =
        error instanceof GlmResetCardError && error.code === "exclusive_lease_active";
      if ((error instanceof GlmResetCardError && !retryableLeaseConflict) || !attempt.card) {
        redemptionAttempts.delete(key);
      } else {
        attempt.expiresAt = Date.now() + ATTEMPT_TTL_MS;
      }
      throw error;
    } finally {
      attempt.inFlight = undefined;
    }
  } catch (error) {
    if (error instanceof GlmResetCardError) throw error;
    throw toSafeTransportError(
      error,
      new GlmResetCardError(500, "glm_reset_card_failed", "Failed to redeem GLM reset card.")
    );
  }
}
