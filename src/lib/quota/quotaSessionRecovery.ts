/** Opt-in, durable recovery of non-streaming turns after definitive quota failure. */
import { getApiKeyMetadata } from "@/lib/db/apiKeys";
import { isEncryptionEnabled } from "@/lib/db/encryption";
import {
  claimQuotaRecoveryTicket,
  completeQuotaRecoveryTicket,
  enqueueQuotaRecoveryTicket,
  expireQuotaRecoveryTickets,
  failQuotaRecoveryTicket,
  listDueQuotaRecoveryTickets,
  markQuotaRecoveryNeedsConfirmation,
  readQuotaRecoveryRequest,
  reconcileInterruptedQuotaRecoveries,
  reconcileStaleRunningQuotaRecoveries,
  rescheduleQuotaRecoveryTicket,
  type QuotaRecoveryTicket,
} from "@/lib/db/quotaRecoveryTickets";
import { extractApiKey, isValidApiKey } from "@/sse/services/auth";
import { CORS_HEADERS } from "@/shared/utils/cors";

const TURN_KEY_RE = /^[A-Za-z0-9._:-]{1,128}$/;
const POLL_INTERVAL_MS = 60_000;
const TICKET_TTL_MS = 24 * 60 * 60_000;
const MAX_REQUEST_BYTES = 512 * 1024;
const MAX_RESULT_BYTES = 1024 * 1024;

type RecoverableEndpoint = "chat/completions" | "responses";
type StoredRequest = { apiKey: string; sessionId: string; body: Record<string, unknown> };

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/** No tools, opaque continuation state, partial stream, or pinned account may be replayed. */
export function isSafeQuotaRecoveryBody(body: unknown): body is Record<string, unknown> {
  if (!isPlainRecord(body) || body.stream !== false) return false;
  if (Array.isArray(body.tools) && body.tools.length > 0) return false;
  if (body.tool_choice != null || body.previous_response_id != null) return false;
  if (body.parallel_tool_calls === true || (typeof body.n === "number" && body.n !== 1)) {
    return false;
  }
  const history = Array.isArray(body.messages)
    ? body.messages
    : Array.isArray(body.input)
      ? body.input
      : null;
  if (!history || history.length === 0) return false;
  return !history.some((entry) => {
    if (!isPlainRecord(entry)) return true;
    return (
      entry.role === "tool" ||
      entry.type === "function_call" ||
      entry.type === "function_call_output" ||
      entry.tool_calls != null ||
      entry.call_id != null
    );
  });
}

export function quotaRecoveryDelayMs(response: Response, now = Date.now()): number {
  const retryAfter = response.headers.get("retry-after");
  if (retryAfter) {
    const numeric = Number(retryAfter);
    const delay = Number.isFinite(numeric) ? numeric * 1000 : Date.parse(retryAfter) - now;
    if (Number.isFinite(delay) && delay > 0)
      return Math.min(Math.max(delay, POLL_INTERVAL_MS), TICKET_TTL_MS);
  }
  return POLL_INTERVAL_MS;
}

/** Status and error text must both support quota exhaustion; generic 429 is insufficient. */
export async function isTerminalQuotaResponse(response: Response): Promise<boolean> {
  if (![402, 429, 503].includes(response.status)) return false;
  const text = await response
    .clone()
    .text()
    .catch(() => "");
  if (text.length > 16_384) return false;
  return /quota[_\s-]*(?:exhausted|limit|reached)|credits?[_\s-]*exhausted|all\s+\d*\s*(?:accounts?|connections?)\s+(?:have\s+)?exhausted/i.test(
    text
  );
}

export async function maybeQueueQuotaSessionRecovery(input: {
  request: Request;
  body: unknown;
  response: Response;
  endpoint: RecoverableEndpoint;
}): Promise<Response> {
  const { request, body, response, endpoint } = input;
  if (request.headers.get("x-omniroute-quota-recovery") !== "auto") return response;
  const sessionId = request.headers.get("x-omniroute-session")?.trim() ?? "";
  const turnId = request.headers.get("x-omniroute-recovery-turn")?.trim() ?? "";
  if (
    request.signal.aborted ||
    !TURN_KEY_RE.test(sessionId) ||
    !TURN_KEY_RE.test(turnId) ||
    request.headers.has("x-omniroute-connection") ||
    !isSafeQuotaRecoveryBody(body)
  ) {
    return response;
  }
  if (!(await isTerminalQuotaResponse(response))) return response;
  if (!isEncryptionEnabled()) return response;
  const apiKey = extractApiKey(request, { allowUrl: false });
  if (!apiKey || !(await isValidApiKey(apiKey))) return response;
  const metadata = await getApiKeyMetadata(apiKey);
  if (
    !metadata?.id ||
    metadata.isActive === false ||
    metadata.isBanned === true ||
    metadata.noLog === true
  ) {
    return response;
  }

  const payload = JSON.stringify({ apiKey, sessionId, body } satisfies StoredRequest);
  if (Buffer.byteLength(payload) > MAX_REQUEST_BYTES) return response;
  const now = Date.now();
  let ticket: QuotaRecoveryTicket;
  try {
    ticket = enqueueQuotaRecoveryTicket({
      apiKeyId: metadata.id,
      turnKey: `${sessionId}:${turnId}`,
      endpoint,
      requestPayload: payload,
      nextAttemptAt: new Date(now + quotaRecoveryDelayMs(response, now)).toISOString(),
      expiresAt: new Date(now + TICKET_TTL_MS).toISOString(),
    });
  } catch {
    return response;
  }
  return new Response(
    JSON.stringify({
      recovery: {
        id: ticket.id,
        state: ticket.state,
        poll: `/api/v1/quota-recoveries/${ticket.id}`,
        expiresAt: ticket.expiresAt,
      },
    }),
    {
      status: 202,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    }
  );
}

async function dispatchTicket(ticket: QuotaRecoveryTicket): Promise<void> {
  const claimed = claimQuotaRecoveryTicket(ticket.id);
  if (!claimed) return;
  const raw = readQuotaRecoveryRequest(ticket.id);
  if (!raw) {
    markQuotaRecoveryNeedsConfirmation(ticket.id);
    return;
  }
  let stored: StoredRequest;
  try {
    stored = JSON.parse(raw) as StoredRequest;
    if (!isSafeQuotaRecoveryBody(stored.body) || !TURN_KEY_RE.test(stored.sessionId)) {
      failQuotaRecoveryTicket(ticket.id);
      return;
    }
  } catch {
    failQuotaRecoveryTicket(ticket.id);
    return;
  }

  try {
    const route =
      ticket.endpoint === "responses"
        ? await import("@/app/api/v1/responses/route")
        : await import("@/app/api/v1/chat/completions/route");
    const request = new Request(`http://localhost/api/v1/${ticket.endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stored.apiKey}`,
        "Content-Type": "application/json",
        "x-omniroute-session": stored.sessionId,
      },
      body: JSON.stringify(stored.body),
    });
    const response = await route.POST(request);
    if (response.ok) {
      const body = await response.text();
      if (Buffer.byteLength(body) > MAX_RESULT_BYTES) {
        markQuotaRecoveryNeedsConfirmation(ticket.id);
        return;
      }
      completeQuotaRecoveryTicket(ticket.id, body);
    } else if (await isTerminalQuotaResponse(response)) {
      rescheduleQuotaRecoveryTicket(
        ticket.id,
        new Date(Date.now() + quotaRecoveryDelayMs(response)).toISOString()
      );
    } else {
      // An unclassified server failure may have executed upstream. Do not replay it.
      markQuotaRecoveryNeedsConfirmation(ticket.id);
    }
  } catch {
    markQuotaRecoveryNeedsConfirmation(ticket.id);
  }
}

let recoveryTimer: ReturnType<typeof setInterval> | null = null;
let tickRunning = false;

export async function runQuotaSessionRecoveryTick(now = new Date()): Promise<void> {
  if (tickRunning) return;
  tickRunning = true;
  try {
    expireQuotaRecoveryTickets(now);
    reconcileStaleRunningQuotaRecoveries(now);
    for (const ticket of listDueQuotaRecoveryTickets(now)) {
      await dispatchTicket(ticket);
    }
  } finally {
    tickRunning = false;
  }
}

export function startQuotaSessionRecovery(): void {
  if (recoveryTimer) return;
  // A restart loses the in-process knowledge of whether the upstream accepted
  // a `running` dispatch. Preserve it for the owner to explicitly resolve.
  reconcileInterruptedQuotaRecoveries();
  recoveryTimer = setInterval(() => {
    void runQuotaSessionRecoveryTick().catch((error) => {
      console.error(
        "[QUOTA_RECOVERY] Poll failed:",
        error instanceof Error ? error.message : error
      );
    });
  }, POLL_INTERVAL_MS);
  recoveryTimer.unref?.();
  void runQuotaSessionRecoveryTick().catch(() => {});
}
