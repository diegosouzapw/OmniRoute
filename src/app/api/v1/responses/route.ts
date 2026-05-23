import { handleChat } from "@/sse/handlers/chat";
import { withEarlyStreamKeepalive } from "@omniroute/open-sse/utils/earlyStreamKeepalive";

// NOTE: We do NOT call initTranslators() here — the translator registry is
// bootstrapped at module level inside open-sse/translator/index.ts when it
// is first imported. Calling it again from a Next.js Route Handler caused a
// "the worker has exited" uncaughtException crash on Codex CLI requests (#450)
// because the dynamic import runs in a Next.js server worker context where
// certain Node APIs used by the translator bootstrap are not available.
// The translators are always initialized via the open-sse side (chatCore),
// so /v1/responses just delegates to handleChat which handles everything.

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * POST /v1/responses - OpenAI Responses API format
 * Handled by the unified chat handler (openai-responses format auto-detected).
 */
export async function POST(request) {
  // Codex CLI (wire_api="responses") consumes this endpoint over SSE and its reqwest
  // client drops the connection if no bytes arrive within ~5s. Keep the connection
  // warm with early keepalives while the upstream produces its first token (#2544).
  // Non-streaming callers (JSON) keep the original verbatim path untouched.
  const accept = String(request.headers?.get?.("accept") || "").toLowerCase();
  if (accept.includes("text/event-stream")) {
    return await withEarlyStreamKeepalive(handleChat(request), { signal: request.signal });
  }
  return await handleChat(request);
}
