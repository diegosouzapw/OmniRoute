import {
  BaseExecutor,
  mergeUpstreamExtraHeaders,
  setUserAgentHeader,
  type ExecuteInput,
  type ProviderCredentials,
} from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import {
  getQoderDashscopeCompatHeaders,
  QODER_DEFAULT_USER_AGENT,
} from "../config/providerHeaderProfiles.ts";
import { randomUUID } from "node:crypto";
import { sanitizeQwenThinkingToolChoice } from "../services/qwenThinking.ts";
import {
  buildQoderChunk,
  buildQoderCompletionPayload,
  buildQoderPrompt,
  createQoderErrorResponse,
  parseQoderCliFailure,
  parseQoderCliResult,
  runQoderCli,
} from "../services/qoderCli.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max)}…`;
}

/**
 * Wrap a full qodercli reply as an OpenAI-compatible SSE stream (role chunk →
 * content chunk → stop chunk → [DONE]). qodercli's `--print` mode returns the
 * whole answer at once, so there are no incremental deltas to forward.
 */
function buildQoderCliSseStream(model: string, text: string): ReadableStream<Uint8Array> {
  const id = `chatcmpl-${randomUUID()}`;
  const created = Math.floor(Date.now() / 1000);
  const encoder = new TextEncoder();
  const send = (obj: unknown) => encoder.encode(`data: ${JSON.stringify(obj)}\n\n`);
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(
        send(buildQoderChunk({ id, model, created, delta: { role: "assistant", content: "" } }))
      );
      if (text) {
        controller.enqueue(send(buildQoderChunk({ id, model, created, delta: { content: text } })));
      }
      controller.enqueue(
        send(buildQoderChunk({ id, model, created, delta: {}, finishReason: "stop" }))
      );
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
}

/**
 * Peek at the first SSE event from a Qoder response to detect upstream errors
 * that Qoder wraps inside an HTTP 200 SSE envelope ({statusCodeValue, body}).
 * Returns a proper HTTP error Response when found, so downstream fallback
 * logic (combo routing, account fallback) can trigger. For success, re-creates
 * the stream with the first chunk prepended so the body passes through
 * transparently.
 */
async function unwrapQoderEnvelope(response: Response): Promise<Response> {
  if (!response.ok || !response.body) {
    return response;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  const { done, value } = await reader.read();
  if (done) {
    reader.cancel();
    return new Response(
      JSON.stringify({ error: { message: "[qoder] empty response", type: "provider_error" } }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  const text = decoder.decode(value, { stream: true });

  let errorStatus: number | null = null;
  let errorMsg = "";
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    const jsonStr = trimmed.slice(5).trim();
    if (jsonStr === "[DONE]") break;
    try {
      const envelope = JSON.parse(jsonStr) as Record<string, unknown>;
      const statusVal =
        typeof envelope.statusCodeValue === "number" ? envelope.statusCodeValue : 200;
      if (statusVal !== 200) {
        errorStatus = statusVal >= 400 ? statusVal : 502;
        errorMsg =
          typeof envelope.body === "string" ? envelope.body : `upstream status ${statusVal}`;
      }
    } catch {
      // Malformed JSON — treat as non-error; downstream handling parses it.
    }
    break;
  }

  if (errorStatus) {
    reader.cancel();
    const errType =
      errorStatus === 401 || errorStatus === 403 ? "authentication_error" : "provider_error";
    return new Response(
      JSON.stringify({
        error: {
          message: `[qoder error ${errorStatus}: ${sanitizeErrorMessage(truncate(errorMsg, 200))}]`,
          type: errType,
        },
      }),
      { status: errorStatus, headers: { "Content-Type": "application/json" } }
    );
  }

  // Re-create the stream with the first chunk prepended so the success body
  // passes through unchanged.
  const restStream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(value);
    },
    pull(controller) {
      return reader.read().then(({ done, value }) => {
        if (done) {
          controller.close();
          return;
        }
        controller.enqueue(value);
      });
    },
    cancel() {
      reader.cancel();
    },
  });

  return new Response(restStream, {
    status: response.status,
    statusText: response.statusText,
    headers: new Headers(response.headers),
  });
}

function getAuthToken(credentials: ProviderCredentials): string {
  if (typeof credentials.apiKey === "string" && credentials.apiKey.trim()) {
    return credentials.apiKey.trim();
  }
  if (typeof credentials.accessToken === "string" && credentials.accessToken.trim()) {
    return credentials.accessToken.trim();
  }
  if (typeof credentials.refreshToken === "string" && credentials.refreshToken.trim()) {
    return credentials.refreshToken.trim();
  }
  // Fallback: QODER_PERSONAL_ACCESS_TOKEN env var (#966)
  const envToken = String(process.env.QODER_PERSONAL_ACCESS_TOKEN || "").trim();
  if (envToken) return envToken;
  return "";
}

export class QoderExecutor extends BaseExecutor {
  constructor() {
    super("qoder", PROVIDERS.qoder);
  }

  buildHeaders(
    credentials: ProviderCredentials,
    stream = true,
    clientHeaders?: Record<string, string> | null,
    model?: string
  ): Record<string, string> {
    const headers = super.buildHeaders(credentials, stream, clientHeaders, model);
    setUserAgentHeader(headers, QODER_DEFAULT_USER_AGENT);
    return headers;
  }

  transformRequest(model: string, body: unknown): Record<string, unknown> {
    const payload = {
      ...(typeof body === "object" && body !== null ? body : {}),
      model,
    };

    return sanitizeQwenThinkingToolChoice(payload, "QoderExecutor");
  }

  async execute({ model, body, stream, credentials, signal, upstreamExtraHeaders }: ExecuteInput) {
    const token = getAuthToken(credentials);

    if (!token) {
      return {
        response: new Response(
          JSON.stringify({
            error: {
              message: "Qoder access token or API Key is required. Please sign in or set a PAT.",
              type: "authentication_error",
              code: "token_required",
            },
          }),
          { status: 401, headers: { "Content-Type": "application/json" } }
        ),
        url: "https://dashscope.aliyuncs.com",
        headers: { "Content-Type": "application/json" },
        transformedBody: body,
      };
    }

    const resolvedModel = model || "qwen3-coder-plus";

    // Detect token type: PAT (Personal Access Token) starts with "pt-".
    // PATs are driven through the local qodercli binary (see executeViaQoderCli);
    // only the qodercli binary can produce the WASM-signed Cosy request the raw
    // HTTP path can no longer replicate.
    const isPatToken = token.startsWith("pt-");
    if (isPatToken) {
      return this.executeViaQoderCli({ model: resolvedModel, body, stream, token, signal });
    }

    // Non-PAT tokens (OAuth apiKey / DashScope key) → DashScope OpenAI-compatible API.
    let mappedModel = resolvedModel;
    if (resolvedModel === "qwen3.5-plus" || resolvedModel === "qwen3.6-plus") {
      mappedModel = "coder-model";
    } else if (resolvedModel === "vision-model") {
      mappedModel = "qwen3-vl-plus";
    }
    let endpointUrl = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";

    // Check for custom API base via credentials (overrides the default)
    let credentialsApiBase: unknown;
    if (typeof credentials === "object" && credentials !== null) {
      const credsObj = credentials as Record<string, unknown>;
      credentialsApiBase = credsObj.customApiBase || credsObj.resourceUrl;
    }
    if (typeof credentialsApiBase === "string" && credentialsApiBase.trim()) {
      let base = credentialsApiBase.trim();
      if (!base.startsWith("http")) base = `https://${base}`;
      if (!base.endsWith("/v1")) base = base.endsWith("/") ? `${base}v1` : `${base}/v1`;
      endpointUrl = `${base}/chat/completions`;
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...getQoderDashscopeCompatHeaders(),
    };

    mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders);

    const payload = this.transformRequest(mappedModel, body);

    const bodyStr = JSON.stringify(payload);

    try {
      const response = await fetch(endpointUrl, {
        method: "POST",
        headers,
        body: bodyStr,
        signal,
      });

      if (!response.ok) {
        let errText = await response.text();
        return {
          response: new Response(
            JSON.stringify({
              error: {
                message: `Qoder API failed with status ${response.status}: ${errText}`,
                type: response.status === 401 ? "authentication_error" : "provider_error",
              },
            }),
            { status: response.status, headers: { "Content-Type": "application/json" } }
          ),
          url: endpointUrl,
          headers,
          transformedBody: payload,
        };
      }

      // Qoder wraps upstream errors inside an HTTP 200 SSE envelope
      // ({statusCodeValue}). Peek at the first event to detect this and return
      // a proper HTTP error so combo/account fallback logic can trigger.
      const unwrapped = await unwrapQoderEnvelope(response);
      return {
        response: unwrapped,
        url: endpointUrl,
        headers,
        transformedBody: payload,
      };
    } catch (e: unknown) {
      const error = e as Error;
      if (error.name === "AbortError") {
        throw error;
      }
      return {
        response: new Response(
          JSON.stringify({
            error: {
              message: `Qoder fetch error: ${sanitizeErrorMessage(error.message)}`,
              type: "provider_error",
            },
          }),
          { status: 502, headers: { "Content-Type": "application/json" } }
        ),
        url: endpointUrl,
        headers,
        transformedBody: payload,
      };
    }
  }

  /**
   * Drive a PAT (`pt-*`) completion through the local qodercli binary. The CLI
   * performs Qoder's WASM-signed Cosy auth internally, so this is the only path
   * that works for PATs now that the pure-HTTP Cosy reimplementation is dead.
   */
  private async executeViaQoderCli({
    model,
    body,
    stream,
    token,
    signal,
  }: {
    model: string;
    body: unknown;
    stream: boolean;
    token: string;
    signal?: AbortSignal | null;
  }): Promise<{
    response: Response;
    url: string;
    headers: Record<string, string>;
    transformedBody: unknown;
  }> {
    const url = "qodercli://stdio";
    const prompt = buildQoderPrompt(body);

    const run = await runQoderCli({ token, prompt, stream: false, model, signal });

    // Honor client cancellation the same way the HTTP path does.
    if (signal?.aborted) {
      const abortError = new Error("Aborted");
      abortError.name = "AbortError";
      throw abortError;
    }

    if (run.error && /enoent|not found|no such file|spawn/i.test(run.error)) {
      return {
        response: createQoderErrorResponse({
          status: 502,
          message:
            `Qoder CLI (qodercli) was not found on the OmniRoute host (${run.error}). ` +
            "Install it from https://qoder.com or set CLI_QODER_BIN to its path.",
          code: "cli_not_found",
        }),
        url,
        headers: {},
        transformedBody: body,
      };
    }

    if (!run.ok) {
      return {
        response: createQoderErrorResponse(parseQoderCliFailure(run.stderr, run.stdout)),
        url,
        headers: {},
        transformedBody: body,
      };
    }

    const { text, isError, errorMessage } = parseQoderCliResult(run.stdout);
    if (isError) {
      return {
        response: createQoderErrorResponse(parseQoderCliFailure(errorMessage)),
        url,
        headers: {},
        transformedBody: body,
      };
    }

    if (stream) {
      return {
        response: new Response(buildQoderCliSseStream(model, text), {
          status: 200,
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        }),
        url,
        headers: {},
        transformedBody: body,
      };
    }

    return {
      response: new Response(JSON.stringify(buildQoderCompletionPayload({ model, text })), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
      url,
      headers: {},
      transformedBody: body,
    };
  }
}

export default QoderExecutor;

export const __test__ = {
  unwrapQoderEnvelope,
  truncate,
};
