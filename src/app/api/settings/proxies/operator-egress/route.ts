import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  OPERATOR_EGRESS_FUTURE_TOLERANCE_MS,
  upsertOperatorEgress,
} from "@/lib/db/proxyOperatorEgress";
import { isRoutableEgressAddress } from "@/shared/network/egressAddress";
import { isOperatorEgressEnabled } from "@/shared/utils/featureFlags";
import { proxyOperatorEgressPushSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

/**
 * POST /api/settings/proxies/operator-egress — accept operator-provided dated
 * egress observations per pool member.
 *
 * Incoming push only: this route makes no outbound calls (no SSRF surface —
 * every address is validated as a routable IP literal and never fetched).
 * Auth first (401 wins over 404), then 404 when the flag is off (before any
 * read or write), then the versioned Zod shape, then the per-address liveness
 * checks (routable literal, observedAt within the +5 min future tolerance).
 * Unknown members are counted `ignored`, never a batch error.
 *
 *   POST { version: 1, members: [{ host, port, addresses[], observedAt }] }
 *     -> 200 { version, stored, ignored, rejected: [{ member, address?, reason }] }
 *     -> 401 without management auth · 404 when the flag is off · 400 on shape/liveness
 */
type OperatorEgressPushMember = {
  host: string;
  port: number;
  addresses: string[];
  observedAt: string;
};

type OperatorEgressPushRejection = {
  member: string;
  address?: string;
  reason: string;
};

function isFreshObservedAt(observedAt: string, nowMs: number): boolean {
  const observedMs = Date.parse(observedAt);
  return Number.isFinite(observedMs) && observedMs - nowMs <= OPERATOR_EGRESS_FUTURE_TOLERANCE_MS;
}

function splitLiveMember(
  member: OperatorEgressPushMember,
  nowMs: number,
  rejected: OperatorEgressPushRejection[]
): OperatorEgressPushMember | null {
  const memberKey = `${member.host}:${member.port}`;
  if (!isRoutableEgressAddress(member.host)) {
    rejected.push({ member: memberKey, reason: "unroutable-host" });
    return null;
  }
  if (!isFreshObservedAt(member.observedAt, nowMs)) {
    rejected.push({ member: memberKey, reason: "future-observed-at" });
    return null;
  }
  const liveAddresses = member.addresses.filter((address) => {
    if (!isRoutableEgressAddress(address)) {
      rejected.push({ member: memberKey, address, reason: "unroutable-address" });
      return false;
    }
    return true;
  });
  if (liveAddresses.length === 0) return null;
  return { ...member, addresses: liveAddresses };
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  if (!isOperatorEgressEnabled()) {
    return createErrorResponse({
      status: 404,
      message: "Operator egress observations are disabled",
      type: "not_found",
    });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return createErrorResponse({
      status: 400,
      message: "Invalid JSON body",
      type: "invalid_request",
    });
  }

  try {
    const validation = validateBody(proxyOperatorEgressPushSchema, rawBody);
    if (isValidationFailure(validation)) {
      return createErrorResponse({
        status: 400,
        message: validation.error.message,
        details: validation.error.details,
        type: "invalid_request",
      });
    }

    const nowMs = Date.now();
    const rejected: OperatorEgressPushRejection[] = [];
    const accepted: OperatorEgressPushMember[] = [];
    for (const member of validation.data.members) {
      const live = splitLiveMember(member, nowMs, rejected);
      if (live !== null) accepted.push(live);
    }

    const result = upsertOperatorEgress(accepted);
    const allRejected = [...rejected, ...result.rejected];
    if (accepted.length === 0 && allRejected.length > 0) {
      return createErrorResponse({
        status: 400,
        message: allRejected[0].address
          ? `${allRejected[0].member} ${allRejected[0].address}: ${allRejected[0].reason}`
          : `${allRejected[0].member}: ${allRejected[0].reason}`,
        details: allRejected,
        type: "invalid_request",
      });
    }
    return Response.json({
      version: 1,
      stored: result.stored,
      ignored: result.ignored,
      rejected: allRejected,
    });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to store operator egress observations");
  }
}
