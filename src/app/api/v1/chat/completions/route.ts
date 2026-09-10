import { z } from "zod";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { callCloudWithMachineId } from "@/shared/utils/cloud";
import { handleChat } from "@/sse/handlers/chat";
import { generateRequestId } from "@/shared/utils/requestId";
import { resolveIncomingCorrelationId } from "@/shared/utils/correlationPreserve.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { initTranslators } from "@omniroute/open-sse/translator/index.ts";
import { createInjectionGuard } from "@/middleware/promptInjectionGuard";
import { acceptHeaderForcesStream } from "@omniroute/open-sse/utils/aiSdkCompat.ts";
import {
  OPENAI_CHAT_ERROR_FRAME,
  OPENAI_KEEPALIVE_FRAME,
  OPENAI_STARTUP_FRAME,
  withEarlyStreamKeepalive,
} from "@omniroute/open-sse/utils/earlyStreamKeepalive";
import { resolveKeepaliveThreshold } from "@omniroute/open-sse/utils/keepaliveThreshold";
import {
  admitChatRequest,
  admitChatStructure,
  CHAT_ADMISSION_QUEUE_MAX_MS,
  releaseChatAdmissionAfterHandler,
  releaseChatAdmissionWhenDone,
  resolveSessionId,
} from "@/shared/middleware/chatBodyAdmission";
import {
  readCompressionRequestHeader,
  withCompressionHeaderEcho,
} from "@/shared/utils/compressionHeaderEcho";
import { resolveModelAliasWithSeedFallbackOnBody } from "@/lib/modelAliasResolver";
import {
  assertRuntimeModelProviderAvailable,
  isRuntimeProviderRetirementError,
} from "@/shared/constants/providerRetirement";
import {
  assertCommonChatGptWebModelAvailable,
  isCommonChatGptWebRetirementError,
} from "@/shared/constants/chatgptWebRetirement";
import { ensureSemanticCacheDbBridge } from "@/lib/cache/semanticCacheDbBridge";

let initPromise = null;

// Singleton injection guard instance. `logger: null` — the guardrail registry
// re-evaluates this request inside handleChat with the pino logger (#11936 dedupe).
const injectionGuard = createInjectionGuard({ logger: null });

/**
 * Initialize translators once (Promise-based singleton — no race condition)
 */
function ensureInitialized() {
  if (!initPromise) {
    ensureSemanticCacheDbBridge();
    initPromise = Promise.resolve(initTranslators()).then(() => {
      console.log("[SSE] Translators initialized");
    });
  }
  return initPromise;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

// Minimal request-shape validation (Rule #7 / T06 gate). This is the hottest path in the
// proxy, and the body is already parsed exactly once above into `parsedBody` (see the
// #4380/#7862 comment on the single `request.json()` call) — so this only runs `.safeParse()`
// over that already-parsed object, it does NOT read the body again.
//
// Deliberately permissive: `src/sse/handlers/chat.ts` (deeper in `handleChat`) owns the real
// validation of this payload — messages/model/temperature/top_p/max_tokens/n — and accepts
// shapes this schema must not newly reject, e.g. a `model` that is entirely absent (resolved
// later via `input`/antigravity) or `null`, and message `role`s such as `"developer"` (see
// `open-sse/services/roleNormalizer.ts`) that a stricter enum would exclude. `.passthrough()`
// keeps every other field (stream, tools, reasoning, provider-specific extras, ...) intact.
// This schema only asserts what the route already assumes before handing `parsedBody` to
// `handleChat`: a non-null object, `model` a nullable string when present, `messages` an
// array when present — so `.safeParse()` failing here is always a shape the deep validation
// would already have rejected with its own 400, never a new rejection.
const chatCompletionsRouteShapeSchema = z
  .object({
    model: z.string().nullable().optional(),
    messages: z.array(z.unknown()).optional(),
  })
  .passthrough();

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return handleCorsOptions();
}

export async function POST(request) {
  await ensureInitialized();

  // Content-Type guard (#6414) — reject non-JSON POST bodies with 415 per RFC 7231.
  // OpenAI/Anthropic reject `text/plain` or missing Content-Type at the edge; matching
  // that behavior prevents a text/plain body from silently reaching provider lookup.
  const contentType = request.headers.get("content-type") ?? "";
  const requestContentLengthHeader = request.headers.get("content-length");
  if (!contentType.toLowerCase().split(";")[0].trim().startsWith("application/json")) {
    return new Response(
      JSON.stringify({
        error: {
          message: "Content-Type must be application/json",
          type: "invalid_request_error",
          code: "unsupported_media_type",
        },
      }),
      { status: 415, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
  }

  // Reserve heavyweight capacity atomically and ingest the body with a hard byte bound
  // BEFORE JSON parsing. Missing or dishonest Content-Length values cannot bypass
  // the actual-byte limit. Capacity exhaustion is retryable rather than process-fatal.
  const sessionId = resolveSessionId(request);
  const admissionResult = await admitChatRequest(request, {
    sessionId,
    queueMs: CHAT_ADMISSION_QUEUE_MAX_MS,
  });
  if (admissionResult.admit === false) return admissionResult.response;
  const admission = admissionResult;
  request = admission.request;
  const finishAdmission = (response: Response) =>
    releaseChatAdmissionWhenDone(response, admission.lease);

  try {
    // One-line marker for diagnosing 413 / Server-Action interceptions.
    // Logs only when Content-Length is present so debug noise stays low for
    // typical chat payloads. Opt-in via OMNIROUTE_LOG_REQUEST_SHAPE=1.
    if (process.env.OMNIROUTE_LOG_REQUEST_SHAPE === "1") {
      const ct = contentType;
      const cl = requestContentLengthHeader;
      if (cl && Number(cl) > 256 * 1024) {
        console.error(`[CHAT-ROUTE] large body content-type="${ct}" content-length=${cl}`);
      }
    }

    // Prompt injection guard — inspect body before forwarding. Parse the body ONCE here
    // and thread it to handleChat so the handler does not JSON-parse the (often 270-550 KB)
    // coding-agent payload a second time — the double parse doubled the body's heap
    // residency on the hot path and fed the OOM crash-loop (#4380). #7862 parse-once over
    // the admission-rebuilt request: the bytes are already buffered in memory by
    // admitChatRequest(), so json() parses them directly — no clone(), no second stream read.
    let parsedBody = null;
    try {
      parsedBody = await request.json().catch(() => null);
      if (parsedBody) {
        // Route-level shape gate (T06) — validates the object already parsed above; it
        // never reads the request body a second time. See chatCompletionsRouteShapeSchema
        // for why this stays scoped to record-shaped bodies and deliberately permissive.
        if (isRecord(parsedBody)) {
          const shapeCheck = chatCompletionsRouteShapeSchema.safeParse(parsedBody);
          if (!shapeCheck.success) {
            const issue = shapeCheck.error.issues[0];
            const field = issue?.path?.length ? issue.path.join(".") : "body";
            return finishAdmission(
              errorResponse(400, `${field}: ${issue?.message ?? "Invalid request"}`)
            );
          }

          try {
            assertCommonChatGptWebModelAvailable(parsedBody.model);
          } catch (error) {
            if (isCommonChatGptWebRetirementError(error)) {
              return finishAdmission(
                errorResponse(error.status, error.message, {
                  type: "provider_error",
                  code: error.code,
                })
              );
            }
            throw error;
          }
        }

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

        // Preserve the caller-supplied provider identity long enough to enforce
        // retirement. A persisted alias can otherwise rewrite felo-web/... to a
        // healthy provider before getModelInfo or the executor tombstones see it.
        try {
          assertRuntimeModelProviderAvailable(parsedBody.model);
        } catch (error) {
          if (isRuntimeProviderRetirementError(error)) {
            return finishAdmission(
              errorResponse(error.status, error.message, {
                type: "provider_error",
                code: error.code,
              })
            );
          }
          throw error;
        }

        // Resolve model alias before forwarding to handleChat
        if (parsedBody && typeof parsedBody === "object") {
          await resolveModelAliasWithSeedFallbackOnBody(parsedBody).catch(() => {
            /* swallow — fall through with original model */
          });
        }

        const { blocked, result } = injectionGuard(parsedBody);
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
      }
    } catch (error) {
      console.error("[SECURITY] Prompt injection guard failed:", error);
    }

    // Gate the early SSE keepalive wrapper: only wrap when the client explicitly
    // asks for streaming (body `stream: true`) or the Accept header forces SSE.
    // The parsed body is passed through UNTOUCHED — the actual stream/JSON framing
    // stays decided by chatCore/resolveStreamFlag (legacy streaming default and the
    // per-key `streamDefaultMode: "json"` opt-in are preserved).
    const parsedBodyIsRecord = isRecord(parsedBody);
    const acceptHeader = request.headers.get("accept") || "";
    const acceptForcesStream =
      parsedBodyIsRecord && acceptHeaderForcesStream(acceptHeader, parsedBody.stream);
    const wantsStreaming = (parsedBodyIsRecord && parsedBody.stream === true) || acceptForcesStream;

    // #6422 — capture the compression request header once so we can echo it back
    // on the response when internal early-returns (idempotency cache, some combo
    // paths) drop the meta the docs promise.
    const compressionRequestHeader = readCompressionRequestHeader(request);

    // #11739: preserve caller-provided X-Correlation-Id when present; generate only when absent.
    const callerCorrelationId = resolveIncomingCorrelationId(
      request.headers.get("x-correlation-id")
    );

    if (wantsStreaming) {
      const reqId = callerCorrelationId ?? generateRequestId();
      // Wrap the real handler response, not the synthetic early-keepalive response. If the
      // client cancels while handleChat is still pending, earlyStreamKeepalive will cancel the
      // eventual handler body; only that confirmed cleanup releases heavyweight capacity.
      const handlerResponse = releaseChatAdmissionAfterHandler(
        handleChat(request, null, parsedBody, reqId),
        admission.lease
      );
      const streamedResponse = await withEarlyStreamKeepalive(handlerResponse, {
        signal: request.signal,
        thresholdMs: resolveKeepaliveThreshold(parsedBody?.model),
        keepaliveFrame: OPENAI_KEEPALIVE_FRAME,
        startupFrame: OPENAI_STARTUP_FRAME,
        errorFrame: OPENAI_CHAT_ERROR_FRAME,
        extraHeaders: { "X-Correlation-Id": reqId },
      });
      return withCompressionHeaderEcho(streamedResponse, compressionRequestHeader);
    }

    return finishAdmission(
      withCompressionHeaderEcho(
        await handleChat(request, null, parsedBody, callerCorrelationId ?? undefined),
        compressionRequestHeader
      )
    );
  } catch (error) {
    admission.lease?.release();
    throw error;
  }
}
