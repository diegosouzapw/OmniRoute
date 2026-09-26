import {
  linkPendingFirstChunk,
  logProxyEvent,
  settlePendingFirstChunk,
} from "../../lib/proxyLogger";
import { updateAttemptTiming } from "../../lib/db/proxyLogs";

/** One request actually sent: the outlet snapshot plus what came back. */
export type AttemptJournalEntry = {
  proxy: unknown;
  rotationAccount?: string | null;
  upstreamStatus?: number;
  error?: string | null;
  durationMs?: number | null;
  /** Send start -> response headers received; null when unknown (network throw). */
  headersMs?: number | null;
  /** Send start -> first useful body byte; null until the byte arrives. */
  firstChunkMs?: number | null;
  /**
   * Fired once when the first useful body byte is read downstream, or with
   * null when the body settles without one. Set by the capture wrapper when
   * it envelopes the raw upstream body; read here.
   */
  onFirstChunk?: ((firstChunkMs: number | null) => void) | null;
  /** True once the envelope replaced the raw body (single-wrap guard). */
  bodyTracked?: boolean;
};

/**
 * Non-negative integer durations only: unknown, clock-skewed, or malformed
 * values stay null so partially migrated databases never corrupt a row.
 */
export function sanitizeAttemptTiming(value: unknown): number | null {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 ? value : null;
}

export type ProxyJournalInput = {
  result: { success: boolean; status?: number | null; error?: string | null };
  proxyInfo: {
    proxy?: unknown;
    level?: string;
    levelId?: string | null;
    upstreamStatus?: number;
    attempts?: AttemptJournalEntry[];
  } | null;
  proxyLatency: number;
  provider: string;
  model: string;
  credentials: { connectionId?: string | null };
  comboName: string | null;
  clientRawRequest: {
    headers?: Record<string, string | string[] | undefined>;
  } | null;
  tlsFingerprintUsed: boolean;
  rotationAccount: string | null;
  correlationId: string | null;
};

function attemptTextStatus(attempt: AttemptJournalEntry): string {
  if (typeof attempt.upstreamStatus === "number") {
    if (attempt.upstreamStatus === 408 || attempt.upstreamStatus === 504) return "timeout";
    return attempt.upstreamStatus < 400 ? "success" : "error";
  }
  return attempt.error && /timed? ?out|504|408/i.test(attempt.error) ? "timeout" : "error";
}

type ProxyConfig = { type: string; host: string; port: number | string } | null;

function asProxyConfig(value: unknown): ProxyConfig {
  return (value as ProxyConfig) || null;
}

// Resolve the egress IP (the IP the upstream actually saw) from cache — never
// blocking the request. Warm it in the background for next time. null until
// the first warm completes; direct (no proxy) is also tracked.
async function resolveCachedEgress(proxy: unknown): Promise<string | null> {
  try {
    const { getCachedEgressIp, warmEgressIp } = await import("../../lib/proxyEgress");
    const { proxyConfigToUrl } = await import("@omniroute/open-sse/utils/proxyDispatcher.ts");
    const proxyUrl = proxy ? proxyConfigToUrl(proxy) : null;
    const cached = getCachedEgressIp(proxyUrl);
    warmEgressIp(proxyUrl);
    return cached;
  } catch {
    // egress visibility is best-effort; never break the request path
    return null;
  }
}

function extractClientIp(clientRawRequest: ProxyJournalInput["clientRawRequest"]): string | null {
  const rawIp =
    clientRawRequest?.headers?.["x-forwarded-for"] ||
    clientRawRequest?.headers?.["x-real-ip"] ||
    clientRawRequest?.headers?.["cf-connecting-ip"] ||
    null;
  const rawIpValue = Array.isArray(rawIp) ? rawIp[0] : rawIp;
  return typeof rawIpValue === "string" ? rawIpValue.split(",")[0].trim() : null;
}

async function resolveEgressPerProxy(outlets: unknown[]): Promise<Map<unknown, string | null>> {
  // One cache read per distinct outlet (a retry through the same proxy reads
  // once): repeated sends usually share outlets, so the map stays tiny.
  const egressIps = new Map<unknown, string | null>();
  for (const outlet of outlets) {
    if (!egressIps.has(outlet)) egressIps.set(outlet, await resolveCachedEgress(outlet));
  }
  return egressIps;
}

function abandonedRowLevel(
  attempt: AttemptJournalEntry,
  proxyInfo: ProxyJournalInput["proxyInfo"]
): string {
  if (!attempt.proxy) return "direct";
  return proxyInfo?.level || "account";
}

/** Final send of the journal, if any (the row the request settled on). */
function servedTimingPair(attempts: AttemptJournalEntry[] | null): {
  headersMs: number | null;
  firstChunkMs: number | null;
} {
  const served = attempts?.[attempts.length - 1] ?? null;
  return attemptTimingPair(served);
}

/**
 * Link-then-settle a journaled row: registers the row for a late first byte,
 * then settles immediately when the byte is already known (early path). The
 * late path (median/late order) is settled by the upstream body wrapper once
 * the first byte arrives: the attempt record carries the callback, armed here
 * to the journaled row id. Single call site for both journal rows.
 */
function settleAttemptTiming(
  entry: { id: string },
  attempt: AttemptJournalEntry | null | undefined,
  firstChunkMs: number | null
): void {
  linkPendingFirstChunk(entry.id, entry as never, firstChunkMs !== null, true);
  if (firstChunkMs !== null) {
    settlePendingFirstChunk(entry.id, firstChunkMs, (id, patch) => updateAttemptTiming(id, patch));
    return;
  }
  const record = attempt;
  if (record?.bodyTracked && !record.onFirstChunk) {
    const rowId = entry.id;
    record.onFirstChunk = (lateMs) => {
      settlePendingFirstChunk(rowId, lateMs, (id, patch) => updateAttemptTiming(id, patch));
      record.onFirstChunk = null;
    };
  }
}

/** Timing pair carried from a send record onto its log row (test seam). */
export function attemptTimingPair(attempt: AttemptJournalEntry | null | undefined): {
  headersMs: number | null;
  firstChunkMs: number | null;
} {
  return {
    headersMs: sanitizeAttemptTiming(attempt?.headersMs),
    firstChunkMs: sanitizeAttemptTiming(attempt?.firstChunkMs),
  };
}

function logAbandonedRow(
  attempt: AttemptJournalEntry,
  index: number,
  shared: {
    proxyInfo: ProxyJournalInput["proxyInfo"];
    provider: string;
    model: string;
    credentials: ProxyJournalInput["credentials"];
    comboName: string | null;
    clientIp: string | null;
    egressIps: Map<unknown, string | null>;
    rotationAccount: string | null;
    correlationId: string | null;
  }
): void {
  const { proxyInfo, provider, model, credentials, comboName } = shared;
  const timing = attemptTimingPair(attempt);
  const entry = logProxyEvent({
    status: attemptTextStatus(attempt),
    proxy: asProxyConfig(attempt.proxy),
    level: abandonedRowLevel(attempt, proxyInfo),
    levelId: proxyInfo?.levelId || null,
    provider,
    targetUrl: `${provider}/${model}`,
    clientIp: shared.clientIp,
    egressIp: shared.egressIps.get(attempt.proxy) ?? null,
    latencyMs: attempt.durationMs ?? 0,
    error: attempt.error || null,
    connectionId: credentials.connectionId,
    comboId: comboName || null,
    account: credentials.connectionId?.slice(0, 8) || null,
    rotationAccount: attempt.rotationAccount ?? shared.rotationAccount ?? null,
    correlationId: shared.correlationId || null,
    tlsFingerprint: false,
    upstreamStatus: attempt.upstreamStatus ?? null,
    attemptNumber: index + 1,
    attemptIssue: "abandoned",
    headersMs: timing.headersMs,
    firstChunkMs: timing.firstChunkMs,
  });
  settleAttemptTiming(entry, attempt, timing.firstChunkMs);
}

// One row per request actually sent: the final row is the send the request
// settled on, earlier rows are the refused sends sharing its correlation id.
export async function logProxyJournal(input: ProxyJournalInput): Promise<void> {
  const {
    result,
    proxyInfo,
    proxyLatency,
    provider,
    model,
    credentials,
    comboName,
    clientRawRequest,
    tlsFingerprintUsed,
    rotationAccount,
    correlationId,
  } = input;
  const journal = proxyInfo?.attempts;
  const attempts = Array.isArray(journal) && journal.length > 0 ? journal : null;
  const journalRows = attempts ? attempts.slice(0, -1) : [];
  const clientIp = extractClientIp(clientRawRequest);

  const egressIps = await resolveEgressPerProxy([
    ...journalRows.map((row) => row.proxy),
    proxyInfo?.proxy ?? null,
  ]);
  const shared = {
    proxyInfo,
    provider,
    model,
    credentials,
    comboName,
    clientIp,
    egressIps,
    rotationAccount,
    correlationId,
  };

  for (let index = 0; index < journalRows.length; index++) {
    logAbandonedRow(journalRows[index], index, shared);
  }

  const servedTiming = servedTimingPair(attempts);
  const servedEntry = logProxyEvent({
    status: result.success
      ? "success"
      : result.status === 408 || result.status === 504
        ? "timeout"
        : "error",
    proxy: asProxyConfig(proxyInfo?.proxy),
    level: proxyInfo?.level || "direct",
    levelId: proxyInfo?.levelId || null,
    provider,
    targetUrl: `${provider}/${model}`,
    clientIp,
    egressIp: egressIps.get(proxyInfo?.proxy) ?? null,
    latencyMs: proxyLatency,
    error: result.success ? null : result.error || null,
    connectionId: credentials.connectionId,
    comboId: comboName || null,
    account: credentials.connectionId?.slice(0, 8) || null,
    rotationAccount: rotationAccount || null,
    correlationId: correlationId || null,
    tlsFingerprint: tlsFingerprintUsed,
    upstreamStatus: proxyInfo?.upstreamStatus ?? null,
    attemptNumber: attempts ? attempts.length : null,
    attemptIssue: attempts ? ("served" as const) : null,
    headersMs: servedTiming.headersMs,
    firstChunkMs: servedTiming.firstChunkMs,
  });
  settleAttemptTiming(servedEntry, attempts?.[attempts.length - 1], servedTiming.firstChunkMs);

  // Abandoned sends are already written above, in attempt order; nothing follows.
}
