import { CORS_HEADERS } from "@/shared/utils/cors";
import { buildClientRawRequest, handleChat } from "@/sse/handlers/chat";
import { initTranslators } from "@omniroute/open-sse/translator/index.ts";
import { createInjectionGuard } from "@/middleware/promptInjectionGuard";
import { asTextCompletionResponse } from "./textCompletionTransform.ts";
import {
  readCompressionRequestHeader,
  withCompressionHeaderEcho,
} from "@/shared/utils/compressionHeaderEcho";

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

  // #6422 — capture the compression request header once so we can echo it back
  // on the response when internal early-returns drop the meta the docs promise.
  const compressionRequestHeader = readCompressionRequestHeader(request);

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
        // #3571 — translate the chat-pipeline response back to the legacy
        // text-completion shape so OpenAI Completion clients (e.g. TabbyML) work.
        // Thread `body.model` so response `body.model` echoes the caller's
        // requested identifier, matching the `x-omniroute-model` header, and
        // echo the compression header on the way out.
        return withCompressionHeaderEcho(
          await asTextCompletionResponse(
            await handleChat(newRequest, buildClientRawRequest(request, body)),
            typeof body.model === "string" ? body.model : undefined
          ),
          compressionRequestHeader
        );
      }
    }
  } catch (error) {
    console.error("[SECURITY] Prompt injection guard failed:", error);
  }

  // Standard path: body already has messages[] (chat format). Still emit the legacy
  // text-completion shape — this is the /v1/completions contract (#3571).
  // Re-read body.model so the response echoes the caller's requested identifier.
  let requestedModel: string | undefined;
  try {
    const bodyForModel = await request.clone().json().catch(() => null);
    if (bodyForModel && typeof bodyForModel.model === "string") {
      requestedModel = bodyForModel.model;
    }
  } catch {
    // ignore — asTextCompletionResponse falls back to upstream body.model
  }
  return withCompressionHeaderEcho(
    await asTextCompletionResponse(await handleChat(request), requestedModel),
    compressionRequestHeader
  );
}
