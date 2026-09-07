import { handleChat } from "@/sse/handlers/chat";
import { withInjectionGuard } from "@/middleware/promptInjectionGuard";
import { withChatAdmission } from "@/shared/middleware/withChatAdmission";
import { requireJsonContentType } from "@/shared/middleware/requireJsonContentType";
import {
  withEarlyStreamKeepalive,
  ANTHROPIC_PING_FRAME,
} from "@omniroute/open-sse/utils/earlyStreamKeepalive";
import { resolveKeepaliveThreshold } from "@omniroute/open-sse/utils/keepaliveThreshold";
import { resolveStreamFlag } from "@omniroute/open-sse/utils/aiSdkCompat";
import {
  getBifrostRoutingConfig,
  resolveRelayRoutingBackend,
  shouldTryBifrostForRequest,
  getActiveBifrostCooldown,
  recordBifrostFailure,
  clearBifrostFailure,
  getRoutingFallbackHeader,
  getRoutingFallbackReasonHeader,
  type BifrostRoutingConfig,
  type RelayRoutingBackend,
} from "@/shared/services/bifrost/bifrostRouting.ts";
import { dispatchToBifrost } from "@/shared/services/bifrost/bifrostClient.ts";

let initialized = false;

async function ensureInitialized() {
  if (!initialized) {
    const { initTranslators } = await import("@omniroute/open-sse/translator/index");
    await initTranslators();
    initialized = true;
  }
}

async function executeBifrostAttempt(
  request: Request,
  body: Record<string, unknown>,
  bifrostConfig: BifrostRoutingConfig
): Promise<{ response?: Response; fallbackHeader?: string }> {
  try {
    const bifrostResult = await dispatchToBifrost({
      request,
      body,
      config: bifrostConfig,
    });

    if (bifrostResult.statusCode < 500) {
      clearBifrostFailure(bifrostConfig.baseUrl);
      return { response: bifrostResult.response };
    }

    recordBifrostFailure(bifrostConfig.baseUrl, `http_${bifrostResult.statusCode}`);
    return { fallbackHeader: "bifrost-error" };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    recordBifrostFailure(bifrostConfig.baseUrl, message);
    return { fallbackHeader: "bifrost-error" };
  }
}

async function tryBifrostFastPath(
  request: Request,
  body: Record<string, unknown> | null,
  bifrostConfig: BifrostRoutingConfig | null,
  relayBackend: RelayRoutingBackend
): Promise<{ response?: Response; fallbackHeader?: string }> {
  if (!body || !bifrostConfig) return {};
  const bifrostDecision = shouldTryBifrostForRequest(relayBackend, bifrostConfig, body);
  if (!bifrostDecision.tryBifrost) return {};

  const cooldown = relayBackend === "auto" ? getActiveBifrostCooldown(bifrostConfig.baseUrl) : null;
  if (cooldown) {
    return { fallbackHeader: `bifrost-cooldown; remaining=${cooldown.remainingMs}` };
  }

  return executeBifrostAttempt(request, body, bifrostConfig);
}

function applyBifrostHeaders(
  res: Response,
  bifrostConfig: BifrostRoutingConfig | null,
  relayBackend: RelayRoutingBackend,
  fallbackHeaderValue?: string
): Response {
  if (!bifrostConfig) return res;
  const fallbackHeader = getRoutingFallbackHeader(relayBackend, bifrostConfig);
  if (fallbackHeader || fallbackHeaderValue) {
    res.headers.set("X-Routing-Fallback", fallbackHeaderValue || fallbackHeader || "bifrost");
    const reasonCode = getRoutingFallbackReasonHeader(fallbackHeaderValue);
    if (reasonCode) {
      res.headers.set("X-Routing-Fallback-Reason", reasonCode);
    }
  }
  return res;
}

async function postHandler(request: any, _context: any, preParsedBody: any = null) {
  const ctRejection = requireJsonContentType(request);
  if (ctRejection) return ctRejection;

  await ensureInitialized();
  let body = preParsedBody;
  if (body == null) {
    try {
      body = await request
        .clone()
        .json()
        .catch(() => null);
    } catch {
      // non-JSON
    }
  }
  const accept = String(request.headers?.get?.("accept") || "");
  const wantsStreaming = resolveStreamFlag(body?.stream, accept, "claude");

  const relayBackend = resolveRelayRoutingBackend();
  const bifrostConfig = getBifrostRoutingConfig();

  const fastPathResult = await tryBifrostFastPath(request, body, bifrostConfig, relayBackend);
  if (fastPathResult.response) {
    return fastPathResult.response;
  }

  const applyHeaders = (res: Response) =>
    applyBifrostHeaders(res, bifrostConfig, relayBackend, fastPathResult.fallbackHeader);

  if (wantsStreaming) {
    return applyHeaders(
      await withEarlyStreamKeepalive(handleChat(request, null, body), {
        signal: request.signal,
        thresholdMs: resolveKeepaliveThreshold(body?.model),
        keepaliveFrame: ANTHROPIC_PING_FRAME,
      })
    );
  }
  return applyHeaders(await handleChat(request, null, body));
}

export const POST = withChatAdmission(withInjectionGuard(postHandler, { logger: null }));
