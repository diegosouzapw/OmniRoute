import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  OPERATOR_EGRESS_FUTURE_TOLERANCE_MS,
  isKnownProxyMember,
  upsertOperatorEgress,
} from "@/lib/db/proxyOperatorEgress";
import {
  proxyEgressKey,
  noteProxyRecovered,
  noteProxyRefusal,
} from "@omniroute/open-sse/utils/proxyRefusalMemory.ts";
import { isRoutableEgressAddress } from "@/shared/network/egressAddress";
import {
  isOperatorEgressEnabled,
  isProxySkipRecentlyFailedEnabled,
} from "@/shared/utils/featureFlags";
import { proxyOperatorEgressPushSchema } from "@/shared/validation/schemas";
import type { proxyOperatorRefusalSchema } from "@/shared/validation/schemas/proxy";
import type { z } from "zod";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

/**
 * POST /api/settings/proxies/operator-egress — accept operator-provided dated
 * egress observations per pool member, plus dated outage signals for the
 * refusal memory.
 *
 * Incoming push only: this route makes no outbound calls (no SSRF surface —
 * every address is validated as a routable IP literal and never fetched).
 * Auth first (401 wins over 404), then 404 when the flag is off (before any
 * read or write), then the versioned Zod shape, then the per-address liveness
 * checks (routable literal, observedAt within the +5 min future tolerance).
 * Unknown members are counted `ignored`, never a batch error. The `refusals`
 * batch is evaluated before any address write: a hard refusal rejection (shape
 * or borrowed reason) answers 400 with nothing written anywhere; soft refusal
 * signals (unknown member, stale date, disabled read flag, unusable entry) are
 * counted `refusalsIgnored`.
 *
 *   POST { version: 1, members: [{ host, port, addresses[], observedAt }], refusals?: [{ entry, host, port, reason, observedAt, recovered? }] }
 *     -> 200 { version, stored, ignored, rejected: [{ member, address?, reason }], refusalsStored, refusalsIgnored }
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

type LiveRefusal = { key: string; recovered: boolean };
type OperatorEgressPushRefusal = z.infer<typeof proxyOperatorRefusalSchema>;

function collectLiveRefusals(
  refusals: OperatorEgressPushRefusal[],
  nowMs: number
): { live: LiveRefusal[]; ignored: number } {
  const live: LiveRefusal[] = [];
  let ignored = 0;
  for (const refusal of refusals) {
    const evaluated = splitLiveRefusal(refusal, nowMs);
    if ("ignored" in evaluated) {
      ignored += 1;
      continue;
    }
    live.push(evaluated);
  }
  return { live, ignored };
}

function storeLiveRefusals(liveRefusals: LiveRefusal[], nowMs: number): number {
  let stored = 0;
  for (const live of liveRefusals) {
    if (live.recovered) noteProxyRecovered(live.key, "operator_reported", nowMs);
    else noteProxyRefusal(live.key, "operator_reported", nowMs);
    stored += 1;
  }
  return stored;
}

function isFreshObservedAt(observedAt: string, nowMs: number): boolean {
  const observedMs = Date.parse(observedAt);
  return Number.isFinite(observedMs) && observedMs - nowMs <= OPERATOR_EGRESS_FUTURE_TOLERANCE_MS;
}

function refusalFreshness(observedAt: string, nowMs: number): "live" | "stale" | "future" {
  const observedMs = Date.parse(observedAt);
  if (!Number.isFinite(observedMs)) return "stale";
  if (observedMs - nowMs > OPERATOR_EGRESS_FUTURE_TOLERANCE_MS) return "future";
  if (nowMs - observedMs > OPERATOR_EGRESS_FUTURE_TOLERANCE_MS) return "stale";
  return "live";
}

// Evaluate one outage signal without writing: soft outcomes return a counted
// ignore reason, hard outcomes never reach here (Zod rejects them first).
function splitLiveRefusal(
  refusal: OperatorEgressPushRefusal,
  nowMs: number
): { key: string; recovered: boolean } | { ignored: string } {
  if (!isRoutableEgressAddress(refusal.host)) return { ignored: "unroutable-host" };
  const freshness = refusalFreshness(refusal.observedAt, nowMs);
  if (freshness === "stale") return { ignored: "stale-observed-at" };
  if (freshness === "future") return { ignored: "future-observed-at" };
  if (!isKnownProxyMember(refusal.host, refusal.port)) return { ignored: "unknown-member" };
  if (!isProxySkipRecentlyFailedEnabled()) return { ignored: "skip-disabled" };
  const key = proxyEgressKey(refusal.entry);
  if (key === null) return { ignored: "unusable-entry" };
  return { key, recovered: refusal.recovered === true };
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

    // Refusal liveness is evaluated before any address write so a hard refusal
    // rejection (400) leaves both the address table and the memory untouched.
    const { live: liveRefusals, ignored: refusalsIgnored } = collectLiveRefusals(
      validation.data.refusals ?? [],
      nowMs
    );

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
    const refusalsStored = storeLiveRefusals(liveRefusals, nowMs);
    return Response.json({
      version: 1,
      stored: result.stored,
      ignored: result.ignored,
      rejected: allRejected,
      refusalsStored,
      refusalsIgnored,
    });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to store operator egress observations");
  }
}
