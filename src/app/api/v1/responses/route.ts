import { handleChat } from "@/sse/handlers/chat";
import { withEarlyStreamKeepalive } from "@omniroute/open-sse/utils/earlyStreamKeepalive";
import { resolveResponsesApiModel } from "@/app/api/internal/codex-responses-ws/modelResolution";
import { getModelInfo } from "@/sse/services/model";
import { getComboByName } from "@/lib/db/combos";

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
 * Rewrite a bare ChatGPT-style model id to the codex/ prefix when the model
 * resolves to a codex provider. This fixes the Codex CLI WS→HTTP fallback path:
 * the CLI sends bare "gpt-5.5" over HTTP after WS closes (1008 Policy), and
 * without this rewrite OmniRoute routes it to openrouter instead of codex.
 *
 * Safe: only rewrites when codex/model is genuinely registered; all other models
 * pass through unchanged. Errors are caught and the original request is returned.
 */
async function withCodexPreferredModel(request: Request): Promise<Request> {
  try {
    const clone = request.clone();
    const body = await clone.json().catch(() => null);
    if (!body || typeof body !== "object" || typeof body.model !== "string") {
      return request;
    }
    const { model, changed } = await resolveResponsesApiModel(
      body.model,
      getModelInfo,
      async (name) => !!(await getComboByName(name))
    );
    if (!changed) return request;

    return new Request(request.url, {
      method: request.method,
      headers: request.headers,
      body: JSON.stringify({ ...body, model }),
      signal: request.signal,
    });
  } catch {
    return request;
  }
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
  const resolved = await withCodexPreferredModel(request);
  const accept = String(request.headers?.get?.("accept") || "").toLowerCase();
  if (accept.includes("text/event-stream")) {
    return await withEarlyStreamKeepalive(handleChat(resolved), { signal: request.signal });
  }
  return await handleChat(resolved);
}
