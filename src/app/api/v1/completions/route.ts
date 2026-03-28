import { CORS_ORIGIN, CORS_HEADERS } from "@/shared/utils/cors";
import { buildClientRawRequest, handleChat } from "@/sse/handlers/chat";
import { initTranslators } from "@omniroute/open-sse/translator/index.ts";
import { createInjectionGuard } from "@/middleware/promptInjectionGuard";

let initPromise = null;
const injectionGuard = createInjectionGuard();

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
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": CORS_ORIGIN,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * POST /v1/completions — Legacy OpenAI Completions API
 *
 * Accepts both the modern chat format (messages[]) and the legacy
 * text-completions format (prompt string). Legacy requests are
 * automatically normalized to chat/completions format before routing.
 *
 * @see https://platform.openai.com/docs/api-reference/completions
 */
export async function POST(request: Request) {
  await ensureInitialized();

  // Prompt injection guard
  try {
    const cloned = request.clone();
    const body = await cloned.json().catch(() => null);
    if (body) {
      const { blocked, result } = injectionGuard(body);
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

      // Normalize legacy completions format: { prompt, model } → { messages, model }
      // If the body has `prompt` but no `messages`, convert to chat format.
      if (body.prompt !== undefined && !body.messages) {
        const prompt = Array.isArray(body.prompt) ? body.prompt.join("\n") : String(body.prompt);
        const normalized = {
          ...body,
          messages: [{ role: "user", content: prompt }],
        };
        delete normalized.prompt;

        const newRequest = new Request(request.url, {
          method: request.method,
          headers: request.headers,
          body: JSON.stringify(normalized),
        });
        return await handleChat(newRequest, buildClientRawRequest(request, body));
      }
    }
  } catch (error) {
    console.error("[SECURITY] Prompt injection guard failed:", error);
    return new Response(
      JSON.stringify({
        error: {
          message: "Security validation temporarily unavailable",
          type: "security_guard_unavailable",
          code: "SECURITY_002",
        },
      }),
      { status: 503, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
  }

  // Standard path: body already has messages[] (chat format)
  return await handleChat(request);
}
