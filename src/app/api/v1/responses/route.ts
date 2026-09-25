import { z } from "zod";
import { handleChat } from "@/sse/handlers/chat";
import { CORS_HEADERS } from "@/shared/utils/cors";
import { createInjectionGuard } from "@/middleware/promptInjectionGuard";
import { resolveResponsesApiModel } from "@/app/api/internal/codex-responses-ws/modelResolution";
import { getModelInfo, getComboForModel } from "@/sse/services/model";
import { generateRequestId } from "@/shared/utils/requestId";
import {
  admitChatRequest,
  admitChatStructure,
  CHAT_ADMISSION_QUEUE_MAX_MS,
  releaseChatAdmissionAfterHandler,
  releaseChatAdmissionWhenDone,
  resolveSessionId,
} from "@/shared/middleware/chatBodyAdmission";
import { SSE_HEARTBEAT_INTERVAL_MS } from "@omniroute/open-sse/config/constants";
import { resolveStreamFlag } from "@omniroute/open-sse/utils/aiSdkCompat";
import { errorResponse } from "@omniroute/open-sse/utils/error";
import {
  withEarlyStreamKeepalive,
  OPENAI_RESPONSES_ERROR_FRAME,
} from "@omniroute/open-sse/utils/earlyStreamKeepalive";
import { resolveKeepaliveThreshold } from "@omniroute/open-sse/utils/keepaliveThreshold";
import { OPENAI_RESPONSES_IN_PROGRESS_FRAME } from "@omniroute/open-sse/utils/sseHeartbeat";

// NOTE: We do NOT call initTranslators() here — the translator registry is
// bootstrapped at module level inside open-sse/translator/index.ts when it
// is first imported. Calling it again from a Next.js Route Handler caused a
// "the worker has exited" uncaughtException crash on Codex CLI requests (#450)
// because the dynamic import runs in a Next.js server worker context where
// certain Node APIs used by the translator bootstrap are not available.
// The translators are always initialized via the open-sse side (chatCore),
// so /v1/responses just delegates to handleChat which handles everything.

// `logger: null` — the guardrail registry re-evaluates this request inside
// handleChat with the pino logger (#11936 dedupe).
const injectionGuard = createInjectionGuard({ logger: null });

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * Rewrite a bare ChatGPT-style model id to the codex/ prefix when the model
 * resolves to a codex provider. This fixes the Codex CLI WS→HTTP fallback path:
 * the CLI sends bare "gpt-5.5" over HTTP after WS closes (1008 Policy), and
 * without this rewrite OmniRoute routes it to openrouter instead of codex.
 *
 * Accepts an optional `preParsedBody` so the route-level admission and injection
 * checks can parse once and avoid re-cloning the request on the hot path.
 *
 * Safe: only rewrites when codex/model is genuinely registered; all other models
 * pass through unchanged. Errors are caught and the original request + body are returned.
 */
export async function withCodexPreferredModel(
  request: Request,
  preParsedBody: any = null
): Promise<{ request: Request; body: any }> {
  try {
    const body =
      preParsedBody ??
      (await request
        .clone()
        .json()
        .catch(() => null));
    if (!body || typeof body !== "object" || typeof body.model !== "string") {
      return { request, body };
    }
    const { model, changed } = await resolveResponsesApiModel(
      body.model,
      getModelInfo,
      async (name) => !!(await getComboForModel(name))
    );
    if (!changed) return { request, body };

    const rewrittenBody = { ...body, model };
    return {
      request: new Request(request.url, {
        method: request.method,
        headers: request.headers,
        body: JSON.stringify(rewrittenBody),
        signal: request.signal,
      }),
      body: rewrittenBody,
    };
  } catch {
    return { request, body: preParsedBody };
  }
}

/**
 * POST /v1/responses - OpenAI Responses API format
 * Handled by the unified chat handler (openai-responses format auto-detected).
 */
async function postHandler(request: any) {
  const sessionId = resolveSessionId(request);
  const admissionResult = await admitChatRequest(request, {
    sessionId,
    queueMs: CHAT_ADMISSION_QUEUE_MAX_MS,
  });
  if (admissionResult.admit === false) return admissionResult.response;

  const admission = admissionResult;
  request = admission.request;
  const finishAdmission = (response: Response) =>
    releaseChatAdmissionWhenDone(response, admission.lease, { signal: request.signal });

  try {
    let parsedBody;
    try {
      parsedBody = await request.json();
    } catch {
      return finishAdmission(errorResponse(400, "Invalid JSON body"));
    }
    const parsed = z.object({}).passthrough().safeParse(parsedBody);
    if (!parsed.success || Array.isArray(parsed.data)) {
      return finishAdmission(errorResponse(400, "Request body must be a JSON object"));
    }
    parsedBody = parsed.data;

    const structuralAdmission = await admitChatStructure(parsedBody, admission.lease, {
      sessionId,
      queueMs: CHAT_ADMISSION_QUEUE_MAX_MS,
      signal: request.signal,
    });
    if (structuralAdmission.admit === false) {
      admission.lease?.release();
      return finishAdmission(structuralAdmission.response);
    }
    admission.lease = structuralAdmission.lease;

    let guardResult;
    try {
      guardResult = injectionGuard(parsedBody);
    } catch (error) {
      console.error("[SECURITY] Injection guard error:", error);
      return finishAdmission(
        new Response(JSON.stringify({ error: "Security check failed" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        })
      );
    }

    const { blocked, result } = guardResult;
    if (blocked) {
      return finishAdmission(
        new Response(
          JSON.stringify({
            error: {
              message: "Request blocked: potential prompt injection detected",
              type: "injection_detected",
              code: "SECURITY_001",
              detections: result.detections.length,
            },
          }),
          { status: 400, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
        )
      );
    }
    if (result.flagged) {
      try {
        request.headers.set("X-Injection-Flagged", "true");
        request.headers.set("X-Injection-Detections", String(result.detections.length));
      } catch {
        // Detection already ran; metadata propagation is best-effort.
      }
    }

    // Codex CLI (wire_api="responses") consumes this endpoint over SSE and its reqwest
    // client drops the connection if no bytes arrive within ~5s. Keep the connection
    // warm with transport comments plus sparse parser-visible events while the upstream
    // produces its first token (#2544).
    const { request: resolved, body: resolvedBody } = await withCodexPreferredModel(
      request,
      parsedBody
    );
    const accept = String(request.headers?.get?.("accept") || "");
    const wantsStreaming = resolveStreamFlag(resolvedBody?.stream, accept, "openai-responses");
    if (wantsStreaming) {
      const thresholdMs = resolveKeepaliveThreshold(resolvedBody?.model);
      const correlationId = generateRequestId();
      const handlerResponse = releaseChatAdmissionAfterHandler(
        handleChat(resolved, null, resolvedBody, correlationId),
        admission.lease,
        { signal: request.signal }
      );
      return await withEarlyStreamKeepalive(handlerResponse, {
        signal: request.signal,
        thresholdMs,
        startupFrame: OPENAI_RESPONSES_IN_PROGRESS_FRAME,
        applicationKeepalive: {
          frame: OPENAI_RESPONSES_IN_PROGRESS_FRAME,
          intervalMs: SSE_HEARTBEAT_INTERVAL_MS,
        },
        errorFrame: OPENAI_RESPONSES_ERROR_FRAME,
        correlationId,
      });
    }

    return finishAdmission(await handleChat(resolved, null, resolvedBody));
  } catch (error) {
    admission.lease?.release();
    throw error;
  }
}

export const POST = postHandler;
