/**
 * LMArenaExecutor — Arena (formerly LMArena) web-session provider.
 *
 * Routes requests through arena.ai create-evaluation with session cookies.
 * Upstream sits behind Cloudflare; traffic goes through tls-client-node Chrome
 * impersonation (see services/lmarenaTlsClient.ts).
 *
 * Helpers: open-sse/executors/lmarena/{cookie,models,stream,response}.ts
 */
import { v7 as uuidv7 } from "uuid";
import { BaseExecutor, type ExecuteInput, type ProviderCredentials } from "./base.ts";
import { tlsFetchLMArena, TlsClientUnavailableError } from "../services/lmarenaTlsClient.ts";
import { readLMArenaCookie, reconstructLMArenaCookie } from "./lmarena/cookie.ts";
import {
  LMARENA_STREAM_URL,
  LMARENA_USER_AGENT,
  buildLmarenaBrowserHeaders,
  markLMArenaCatalogModelDead,
  normalizeLMArenaModelsForCatalog,
  parseLMArenaInitialModels,
  pickLMArenaModelId,
  resolveLMArenaModelId,
  type LMArenaModelMetadata,
} from "./lmarena/models.ts";
import { formatArenaPrompt, parseArenaSSE } from "./lmarena/stream.ts";
import {
  buildArenaUpstreamHttpResponse,
  createOpenAIArenaStream,
  handleNonStreamingArenaResponse,
  mapFailedTlsResult,
  mapNetworkError,
  mapTlsUnavailable,
  missingCookieResult,
} from "./lmarena/response.ts";

export {
  reconstructLMArenaCookie,
  normalizeLMArenaModelsForCatalog,
  parseLMArenaInitialModels,
  pickLMArenaModelId,
  parseArenaSSE,
  markLMArenaCatalogModelDead,
  LMARENA_USER_AGENT,
};
export { clearLMArenaDeadCatalogModels } from "./lmarena/models.ts";
export type { LMArenaModelMetadata };

interface OpenAIMessage {
  role?: string;
  content?: unknown;
}

/** Optional browser-issued reCAPTCHA v3 token (operator-supplied). */
function readRecaptchaToken(credentials: unknown, body: unknown): string | null {
  const fromObj = (v: unknown): string | null => {
    if (!v || typeof v !== "object") return null;
    const rec = v as Record<string, unknown>;
    const direct = rec.recaptchaV3Token ?? rec.recaptchaToken;
    if (typeof direct === "string" && direct.trim()) return direct.trim();
    const psd = rec.providerSpecificData;
    if (psd && typeof psd === "object") {
      const nested = psd as Record<string, unknown>;
      const t = nested.recaptchaV3Token ?? nested.recaptchaToken;
      if (typeof t === "string" && t.trim()) return t.trim();
    }
    return null;
  };
  return fromObj(credentials) ?? fromObj(body);
}

export class LMArenaExecutor extends BaseExecutor {
  constructor(providerConfig = {}) {
    super("lmarena", { format: "openai", ...providerConfig });
  }

  buildUrl(
    _model: string,
    _streamOrCredentials: unknown,
    _urlIndex = 0,
    _credentials: ProviderCredentials | null = null
  ): string {
    return LMARENA_STREAM_URL;
  }

  buildHeaders(
    credentialsOrModel: ProviderCredentials | string,
    streamOrCredentials: unknown = true,
    _clientHeadersOrBody?: unknown,
    _model?: string,
    _health?: Record<string, unknown>
  ): Record<string, string> {
    const credentials =
      typeof credentialsOrModel === "string" ? streamOrCredentials : credentialsOrModel;
    const cookie = readLMArenaCookie(credentials);
    const headers = buildLmarenaBrowserHeaders({
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    });
    if (cookie) headers.Cookie = cookie;
    return headers;
  }

  transformRequest(
    modelOrBody: unknown,
    bodyOrModel: unknown,
    streamOrCredentials?: unknown,
    credentials?: ProviderCredentials
  ): unknown {
    const calledFromBase = typeof streamOrCredentials === "boolean" || credentials !== undefined;
    const model = calledFromBase ? String(modelOrBody) : String(bodyOrModel);
    const body = calledFromBase ? bodyOrModel : modelOrBody;
    const effectiveCredentials = calledFromBase ? credentials : streamOrCredentials;
    const openaiBody = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
    const messages = Array.isArray(openaiBody.messages)
      ? (openaiBody.messages as OpenAIMessage[])
      : [];
    return {
      id: uuidv7(),
      mode: "direct-battle",
      modelAId: model,
      userMessageId: uuidv7(),
      modelAMessageId: uuidv7(),
      userMessage: {
        content: formatArenaPrompt(messages),
        experimental_attachments: [],
        metadata: {},
      },
      modality: "chat",
      recaptchaV3Token: readRecaptchaToken(effectiveCredentials, body),
    };
  }

  async execute(input: ExecuteInput) {
    const { model, body, stream, credentials, signal, log } = input;
    const url = this.buildUrl(model, stream, 0, credentials);
    const headers = this.buildHeaders(credentials, stream);
    const cookie = readLMArenaCookie(credentials);

    if (!cookie) {
      return missingCookieResult(
        url,
        headers,
        this.transformRequest(model, body, stream, credentials)
      );
    }

    const arenaModelId = await resolveLMArenaModelId(model, log);
    const transformedBody = this.transformRequest(
      arenaModelId,
      body,
      stream,
      credentials
    ) as Record<string, unknown>;

    log?.info?.(
      "LMArenaExecutor",
      arenaModelId === model
        ? `Executing request for model: ${model}`
        : `Executing request for model: ${model} (${arenaModelId})`
    );

    try {
      return await this.dispatchTls(url, headers, transformedBody, {
        model,
        arenaModelId,
        stream: !!stream,
        signal,
        log,
      });
    } catch (error) {
      if (error instanceof TlsClientUnavailableError) {
        log?.error?.("LMArenaExecutor", `TLS client unavailable: ${error.message}`);
        return mapTlsUnavailable(error, url, headers, transformedBody);
      }
      const message = error instanceof Error ? error.message : String(error);
      log?.error?.("LMArenaExecutor", `Request failed: ${message}`);
      return mapNetworkError(message, url, headers, transformedBody);
    }
  }

  private async dispatchTls(
    url: string,
    headers: Record<string, string>,
    transformedBody: Record<string, unknown>,
    ctx: {
      model: string;
      arenaModelId: string;
      stream: boolean;
      signal?: AbortSignal;
      log?: ExecuteInput["log"];
    }
  ) {
    const tlsResult = await tlsFetchLMArena(url, {
      method: "POST",
      headers,
      body: JSON.stringify(transformedBody),
      signal: ctx.signal,
      stream: ctx.stream,
      streamEofSymbol: "__OMNIROUTE_LMARENA_EOF_NEVER__",
    });

    const failed = mapFailedTlsResult({
      status: tlsResult.status,
      text: tlsResult.text,
      hasRecaptcha: transformedBody.recaptchaV3Token != null,
      model: ctx.model,
      arenaModelId: ctx.arenaModelId,
      url,
      headers,
      transformedBody,
    });
    if (failed) return failed;

    const upstream = buildArenaUpstreamHttpResponse({
      stream: ctx.stream,
      status: tlsResult.status,
      text: tlsResult.text,
      body: tlsResult.body,
    });

    const response = ctx.stream
      ? await this.handleStreamingResponse(upstream, ctx.model, ctx.signal, ctx.log)
      : await handleNonStreamingArenaResponse(upstream, ctx.model);

    return { response, url, headers, transformedBody };
  }

  private async handleStreamingResponse(
    response: Response,
    model: string,
    signal?: AbortSignal,
    log?: ExecuteInput["log"]
  ): Promise<Response> {
    const reader = response.body?.getReader();
    if (!reader) throw new Error("No response body for streaming");

    const out = createOpenAIArenaStream({ reader, model, signal, log });
    return new Response(out, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }
}
