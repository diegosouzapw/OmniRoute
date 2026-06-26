import { handleChat } from "@/sse/handlers/chat";
import { initTranslators } from "@omniroute/open-sse/translator/index.ts";
import { withInjectionGuard } from "@/middleware/promptInjectionGuard";
import {
  withEarlyStreamKeepalive,
  ANTHROPIC_PING_FRAME,
} from "@omniroute/open-sse/utils/earlyStreamKeepalive";
import { resolveKeepaliveThreshold } from "@omniroute/open-sse/utils/keepaliveThreshold";

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
  await ensureInitialized();
  // Streaming Anthropic clients (Claude Code, the Anthropic SDK) drop the connection
  // when no bytes arrive while a large prompt is processed before the first token — a
  // big context can exceed the client's stream/first-token watchdog. OmniRoute holds
  // the response until the first useful upstream byte (ensureStreamReadiness), so keep
  // the connection warm with early keepalives during that gap — same wrapper used by
  // /v1/responses (#2544). Anthropic clients ignore SSE comments for their watchdog, so
  // emit a real `event: ping` (ANTHROPIC_PING_FRAME). Non-streaming callers keep the
  // verbatim path.
  const accept = String(request.headers?.get?.("accept") || "").toLowerCase();
  if (accept.includes("text/event-stream")) {
    let model;
    try {
      const body = preParsedBody ?? (await request.clone().json().catch(() => null));
      model = body?.model;
    } catch {
      // body unavailable / non-JSON — fall back to the default keepalive threshold
    }
    return await withEarlyStreamKeepalive(handleChat(request, null, preParsedBody), {
      signal: request.signal,
      thresholdMs: resolveKeepaliveThreshold(model),
      keepaliveFrame: ANTHROPIC_PING_FRAME,
    });
  }
  return await handleChat(request, null, preParsedBody);
}

export const POST = withInjectionGuard(postHandler);
