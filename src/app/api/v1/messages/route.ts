import { handleChat } from "@/sse/handlers/chat";
import { generateRequestId } from "@/shared/utils/requestId";
import { resolveIncomingCorrelationId } from "@/shared/utils/correlationPreserve.ts";
import { initTranslators } from "@omniroute/open-sse/translator/index.ts";
import { withInjectionGuard } from "@/middleware/promptInjectionGuard";
import { withChatAdmission } from "@/shared/middleware/withChatAdmission";
import { requireJsonContentType } from "@/shared/middleware/requireJsonContentType";
import {
  getDeadlineController,
  withDeadlineSignal,
  withEarlyStreamKeepalive,
  ANTHROPIC_PING_FRAME,
} from "@omniroute/open-sse/utils/earlyStreamKeepalive";
import { resolveKeepaliveThreshold } from "@omniroute/open-sse/utils/keepaliveThreshold";
import { resolveStreamFlag } from "@omniroute/open-sse/utils/aiSdkCompat";

let initialized = false;

/**
 * Initialize translators once
 */
async function ensureInitialized() {
  if (!initialized) {
    await initTranslators();
    initialized = true;
    console.log("[SSE] Translators initialized for /v1/messages");
  }
}

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * POST /v1/messages - Claude format (auto convert via handleChat)
 *
 * `preParsedBody` is threaded from withInjectionGuard (#4041) so the body is
 * parsed at most once per request.
 */
async function postHandler(request: any, context: any, preParsedBody: any = null) {
  // Reject non-JSON Content-Type with 415 before touching the body — mirrors OpenAI's
  // reference API and matches /v1/chat/completions (#6414).
  const ctRejection = requireJsonContentType(request);
  if (ctRejection) return ctRejection;

  await ensureInitialized();
  // Streaming Anthropic clients (Claude Code, the Anthropic SDK) drop the connection
  // when no bytes arrive while a large prompt is processed before the first token — a
  // big context can exceed the client's stream/first-token watchdog. OmniRoute holds
  // the response until the first useful upstream byte (ensureStreamReadiness), so keep
  // the connection warm with early keepalives during that gap — same wrapper used by
  // /v1/responses (#2544). Anthropic clients ignore SSE comments for their watchdog, so
  // emit a real `event: ping` (ANTHROPIC_PING_FRAME). Non-streaming callers keep the
  // verbatim path.
  let body = preParsedBody;
  if (body == null) {
    try {
      body = await request
        .clone()
        .json()
        .catch(() => null);
    } catch {
      // body unavailable / non-JSON — handleChat will return its normal validation error
    }
  }
  const accept = String(request.headers?.get?.("accept") || "");
  const wantsStreaming = resolveStreamFlag(body?.stream, accept, "claude");
  if (wantsStreaming) {
    // Single id for handler + keepalive bytes + deadline warn (matches the
    // chat/completions convention: caller id preserved, generated when absent).
    const correlationId =
      resolveIncomingCorrelationId(request.headers.get("x-correlation-id")) ?? generateRequestId();
    return await withEarlyStreamKeepalive(handleChat(request, null, body, correlationId), {
      signal: request.signal,
      thresholdMs: resolveKeepaliveThreshold(body?.model),
      keepaliveFrame: ANTHROPIC_PING_FRAME,
      correlationId,
      deadlineController: getDeadlineController(request),
    });
  }
  return await handleChat(request, null, body);
}

// Deadline wrap OUTSIDE the admission HOC so the HOC's own lease release
// observes the combined signal (client abort OR deadline abort) and frees its
// slot immediately at expiry — same as the other routes. postHandler recovers
// the same controller via getDeadlineController (never a second one).
// The admitted handler may return a bare Response; the async wrapper lifts it.
function withDeadlineAdmission(handler: (...args: any[]) => Promise<Response> | Response) {
  return async function deadlineAdmittedHandler(...args: any[]) {
    const [request, ...rest] = args;
    const { wrappedReq } = withDeadlineSignal(request);
    return handler(wrappedReq, ...rest);
  };
}

// `logger: null` — the guardrail registry re-evaluates this request inside
// handleChat with the pino logger (#11936 dedupe).
export const POST = withDeadlineAdmission(
  withChatAdmission(withInjectionGuard(postHandler, { logger: null }))
);
