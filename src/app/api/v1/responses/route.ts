import { handleChat } from "@/sse/handlers/chat";
import {
  withEarlyStreamKeepalive,
  RESPONSES_STARTUP_THINKING_FRAME,
  OPENAI_RESPONSES_ERROR_FRAME,
} from "@omniroute/open-sse/utils/earlyStreamKeepalive";
import { withInjectionGuard } from "@/middleware/promptInjectionGuard";
import { resolveResponsesApiModel } from "@/app/api/internal/codex-responses-ws/modelResolution";
import { getModelInfo } from "@/sse/services/model";
import { getComboByName } from "@/lib/db/combos";
import { resolveKeepaliveThreshold } from "@omniroute/open-sse/utils/keepaliveThreshold";

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
 * Accepts an optional `preParsedBody` (threaded from withInjectionGuard via #4041)
 * to avoid re-cloning the request when the body was already parsed upstream.
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
      async (name) => !!(await getComboByName(name))
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
 *
 * `preParsedBody` is threaded from withInjectionGuard (#4041) so the body is
 * parsed at most once per request instead of 3-4x on the hot codex path.
 */
async function postHandler(request: any, context: any, preParsedBody: any = null) {
  // Codex CLI (wire_api="responses") consumes this endpoint over SSE and its reqwest
  // client drops the connection if no bytes arrive within ~5s. Keep the connection
  // warm with early keepalives while the upstream produces its first token (#2544).
  // Non-streaming callers (JSON) keep the original verbatim path untouched.
  const { request: resolved, body: resolvedBody } = await withCodexPreferredModel(
    request,
    preParsedBody
  );
  const accept = String(request.headers?.get?.("accept") || "").toLowerCase();
  if (accept.includes("text/event-stream")) {
    // Adaptive threshold: web-session and anonymous-fallback providers are slower
    // to produce the first byte, so use a longer keepalive threshold (15s vs 2s).
    // Reuse resolvedBody.model — no extra clone/parse needed (#4041).
    const model = resolvedBody?.model;
    const thresholdMs = resolveKeepaliveThreshold(model);
    return await withEarlyStreamKeepalive(handleChat(resolved, null, resolvedBody), {
      signal: request.signal,
      thresholdMs,
      startupFrame: RESPONSES_STARTUP_THINKING_FRAME,
      errorFrame: OPENAI_RESPONSES_ERROR_FRAME,
    });
  }
  return await handleChat(resolved, null, resolvedBody);
}

export const POST = withInjectionGuard(postHandler);
