import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { callCloudWithMachineId } from "@/shared/utils/cloud";
import { handleChat } from "@/sse/handlers/chat";
import { initTranslators } from "@omniroute/open-sse/translator/index.ts";
import { createInjectionGuard } from "@/middleware/promptInjectionGuard";
import { withEarlyStreamKeepalive } from "@omniroute/open-sse/utils/earlyStreamKeepalive";
import { resolveKeepaliveThreshold } from "@omniroute/open-sse/utils/keepaliveThreshold";
import {
  getChatCompletionsEarlyKeepaliveModel,
  shouldUseEarlyKeepaliveForChatCompletions,
} from "./earlyKeepalive";

let initPromise = null;

// Singleton injection guard instance
const injectionGuard = createInjectionGuard();

/**
 * Initialize translators once (Promise-based singleton — no race condition)
 */
function ensureInitialized() {
  if (!initPromise) {
    initPromise = Promise.resolve(initTranslators()).then(() => {
      console.log("[SSE] Translators initialized");
    });
  }
  return initPromise;
}

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return handleCorsOptions();
}

export async function POST(request) {
  await ensureInitialized();

  // One-line marker for diagnosing 413 / Server-Action interceptions.
  // Logs only when Content-Length is present so debug noise stays low for
  // typical chat payloads. Toggle off via OMNIROUTE_LOG_REQUEST_SHAPE=0.
  if (process.env.OMNIROUTE_LOG_REQUEST_SHAPE !== "0") {
    const ct = request.headers.get("content-type") ?? "";
    const cl = request.headers.get("content-length");
    if (cl && Number(cl) > 256 * 1024) {
      console.error(`[CHAT-ROUTE] large body content-type="${ct}" content-length=${cl}`);
    }
  }

  let parsedBody: unknown = null;

  // Prompt injection guard — inspect body before forwarding
  try {
    const cloned = request.clone();
    parsedBody = await cloned.json().catch(() => null);
    if (parsedBody) {
      const { blocked, result } = injectionGuard(parsedBody);
      if (blocked) {
        return new Response(
          JSON.stringify({
            error: {
              message: "Request blocked: potential prompt injection detected",
              type: "injection_detected",
              code: "SECURITY_001",
              detections: result.detections.length,
            },
          }),
          { status: 400, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
        );
      }
    }
  } catch (error) {
    console.error("[SECURITY] Prompt injection guard failed:", error);
  }

  if (
    shouldUseEarlyKeepaliveForChatCompletions(parsedBody, request.headers.get("accept"))
  ) {
    const thresholdMs = resolveKeepaliveThreshold(
      getChatCompletionsEarlyKeepaliveModel(parsedBody)
    );
    return await withEarlyStreamKeepalive(handleChat(request), {
      signal: request.signal,
      thresholdMs,
    });
  }

  return await handleChat(request);
}
