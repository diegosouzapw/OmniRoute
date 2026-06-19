import { handleChat } from "@/sse/handlers/chat";
import { initTranslators } from "@omniroute/open-sse/translator/index.ts";

let initialized = false;

/**
 * Initialize translators once.
 */
async function ensureInitialized() {
  if (!initialized) {
    await initTranslators();
    initialized = true;
    console.log("[SSE] Translators initialized for /v1/antigravity");
  }
}

/**
 * Handle CORS preflight.
 */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * POST /v1/antigravity — Antigravity/cloudcode-compatible endpoint.
 *
 * Accepts the Antigravity IDE's cloudcode envelope
 *   { model, project, request: { contents, systemInstruction, tools, generationConfig } }
 * and returns a cloudcode SSE reply
 *   { response: { candidates: [...], usageMetadata } }.
 *
 * `detectFormatFromEndpoint()` classifies the `/antigravity` path as
 * sourceFormat "antigravity" (mirrors `/v1/messages` → claude), so `handleChat`
 * translates the request antigravity→openai, routes it to the resolved
 * provider/model, and translates the response openai→antigravity — reusing the
 * already-registered bidirectional translators. The AgentBridge MITM proxy
 * (`server.cjs`) forwards the IDE's intercepted cloudcode request here.
 */
export async function POST(request: Request): Promise<Response> {
  await ensureInitialized();
  return await handleChat(request);
}
