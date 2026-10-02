/**
 * Muse Code session-ownership glue for handleSingleModelChat.
 *
 * Muse OAuth accounts rotate per SESSION: the first request of a session claims an owner
 * account, every later request/retry stays on it, and a changed credential generation fails
 * closed (409/503) instead of replaying opaque reasoning on another account. The persistence
 * and hashing live in `../../services/museSessionOwnership`; this module only adapts that
 * service to the request loop in `../chat.ts` so the loop keeps a thin call site.
 */

import { getProviderConnections } from "@/lib/db/providers";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import * as log from "../../utils/logger";
import {
  MuseOwnershipError,
  MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS,
  bindMuseGeneration,
  claimMuseSession,
  museClaimCandidates,
  museEmptyResponseRetryDelayMs,
  museSessionScope,
  recordMuseOutput,
  usesMuseOAuthOwnership,
} from "../../services/museSessionOwnership";
import { withSelectedConnectionHeader } from "./selectedConnectionHeader.ts";

type Cred = {
  connectionId: string;
  accessToken?: string;
  apiKey?: string;
  email?: string;
  refreshToken?: string;
  providerSpecificData?: { accountId?: string } | null;
};
type Creds = Cred | { allRateLimited?: boolean; allExpired?: boolean } | null | undefined;

export type MuseOwner = {
  scope: string;
  connectionId: string;
  generation?: string;
  emptyRetries: number;
  emptyOriginal: Response | null;
};

type ClaimArgs = {
  provider: string;
  model: string;
  body: Record<string, unknown>;
  headers: unknown;
  apiKeyId: string | null;
  forcedConnectionId?: string | null;
  preselectedConnectionId?: string | null;
  allowedConnections?: string[] | null;
  allowUnavailable: boolean;
};

/** Claim (or re-read) the session owner. `null` = not a Muse OAuth request; Response = rejected. */
export async function claimMuseOwner(args: ClaimArgs): Promise<MuseOwner | Response | null> {
  if (args.provider !== "muse-code") return null;
  const connections = await getProviderConnections({ provider: "muse-code", isActive: true });
  if (!usesMuseOAuthOwnership(connections, args.forcedConnectionId || args.preselectedConnectionId))
    return null;
  try {
    const scope = museSessionScope(args.body, args.headers, args.apiKeyId);
    const candidates = museClaimCandidates(
      connections,
      args.model,
      args.allowedConnections,
      args.allowUnavailable
    );
    const owner = claimMuseSession(scope, args.body, candidates, args.forcedConnectionId);
    return { scope, ...owner, emptyRetries: 0, emptyOriginal: null };
  } catch (error) {
    if (error instanceof MuseOwnershipError) return errorResponse(error.status, error.message);
    throw error;
  }
}

/** 503 when the credentials selected for this attempt are not the session owner's. */
export function museOwnerUnavailable(owner: MuseOwner, credentials: Creds): Response | null {
  const usable =
    !!credentials &&
    !("allRateLimited" in credentials) &&
    !("allExpired" in credentials) &&
    credentials.connectionId === owner.connectionId;
  return usable
    ? null
    : errorResponse(
        503,
        "Muse session owner is unavailable; cross-account continuation is forbidden."
      );
}

const accountOf = (credentials: Cred) =>
  credentials.providerSpecificData?.accountId ||
  credentials.email ||
  credentials.refreshToken ||
  credentials.connectionId;

/**
 * Fence the owner's credential generation after the token refresh. `onFailure` runs for ANY
 * error (caller releases its leases); a MuseOwnershipError becomes the response, others rethrow.
 */
export function bindMuseOwner(
  owner: MuseOwner,
  credentials: Cred,
  refreshed: Partial<Cred> | null | undefined,
  onFailure: () => void
): Response | null {
  try {
    owner.generation = bindMuseGeneration(
      owner.scope,
      credentials.connectionId,
      refreshed?.accessToken ||
        credentials.accessToken ||
        refreshed?.apiKey ||
        credentials.apiKey ||
        "",
      accountOf(credentials)
    );
    return null;
  } catch (error) {
    onFailure();
    if (error instanceof MuseOwnershipError) return errorResponse(error.status, error.message);
    throw error;
  }
}

/** chatCore hook: re-fence the generation with the credentials of every upstream attempt. */
export function museBeforeUpstreamAttempt(owner: MuseOwner, credentials: Cred) {
  return (attempt: Partial<Cred>) => {
    owner.generation = bindMuseGeneration(
      owner.scope,
      attempt.connectionId || credentials.connectionId,
      attempt.accessToken || attempt.apiKey || "",
      accountOf(credentials)
    );
  };
}

export const museRecordOutput = (owner: MuseOwner, response: Response) =>
  recordMuseOutput(response, owner.scope, owner.generation!);

/** Same-owner retry delay for an empty 200 (never another account); `null` = give up. */
export function museRetryDelay(
  owner: MuseOwner,
  result: { errorCode?: unknown; response: Response },
  label: string,
  aborted: boolean
): number | null {
  const delayMs = museEmptyResponseRetryDelayMs(result.errorCode, owner.emptyRetries);
  if (delayMs === null || aborted) return null;
  owner.emptyOriginal ??= result.response;
  owner.emptyRetries += 1;
  log.warn(
    "MUSE",
    `${label} returned an empty response on owner ${owner.connectionId.slice(0, 8)} — same-owner ` +
      `retry ${owner.emptyRetries}/${MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS.length} in ${delayMs}ms`
  );
  return delayMs;
}

/** Whether a final Muse failure should mark the owner account unavailable (not fence/stream/empty). */
export const museFailureMarksAccount = (result: {
  errorCode?: unknown;
  errorType?: unknown;
}): boolean =>
  result.errorCode !== "MUSE_OWNERSHIP_REJECTED" &&
  result.errorType !== "stream_timeout" &&
  result.errorType !== "stream_early_eof" &&
  museEmptyResponseRetryDelayMs(result.errorCode, 0) === null;

/** Final failure response; once retries are exhausted surface the FIRST empty-response 502. */
export function museFailureResponse(
  owner: MuseOwner,
  result: { errorCode?: unknown; response: Response }
): Response {
  const exhaustedEmpty = museEmptyResponseRetryDelayMs(result.errorCode, 0) !== null;
  return withSelectedConnectionHeader(
    exhaustedEmpty && owner.emptyOriginal ? owner.emptyOriginal : result.response,
    owner.connectionId
  );
}
