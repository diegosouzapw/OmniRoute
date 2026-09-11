/**
 * Post-request on-spec audit for duplicated tool_calls.
 *
 * Extracted from persistAttemptLogs so attemptLogging.ts stays at the frozen
 * complexity count. validateResponseQuality's streaming peek only sees the
 * START of a stream, so a duplicate that arrives after real content has
 * already been relayed cannot fail the attempt over — this is the first
 * point the fully assembled body is available. Too late to retry; a durable
 * audit row still beats a clean HTTP 200 with no trace.
 *
 * Observed: minimax-m3:free via OpenRouter/GMICloud, 2026-09-02, duplicated
 * a heartbeat_respond call byte-for-byte.
 */

import { logAuditEvent } from "@/lib/compliance";
import { findToolCallSpecViolation } from "../../services/combo/validateQuality.ts";

export function maybeLogToolCallSpecViolation(input: {
  responseBody: unknown;
  provider: string | null | undefined;
  model: string | null | undefined;
  connectionId: string | null;
  httpStatus: number;
  requestId: string;
}): void {
  const violation = findToolCallSpecViolation(input.responseBody);
  if (!violation) return;
  logAuditEvent({
    action: "provider.spec_violation",
    actor: "system",
    target:
      [input.provider, input.connectionId].filter(Boolean).join(":") ||
      input.provider ||
      input.model,
    resourceType: "provider_spec_violation",
    status: "warning",
    requestId: input.requestId,
    details: {
      provider: input.provider,
      model: input.model,
      connectionId: input.connectionId,
      httpStatus: input.httpStatus,
      violation,
    },
  });
}
