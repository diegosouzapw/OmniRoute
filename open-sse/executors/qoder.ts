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
import { sanitizeQwenThinkingToolChoice } from "../services/qwenThinking.ts";

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

    // Detect token type: PAT (Personal Access Token) starts with "pt-"
    const isPatToken = token.startsWith("pt-");

    let mappedModel = resolvedModel;
    let endpointUrl: string;

    if (isPatToken) {
      endpointUrl = "https://api.qoder.com/v1/chat/completions";
    } else {
      if (resolvedModel === "qwen3.5-plus" || resolvedModel === "qwen3.6-plus") {
        mappedModel = "coder-model";
      } else if (resolvedModel === "vision-model") {
        mappedModel = "qwen3-vl-plus";
      }
      endpointUrl = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";
    }

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
      ...(isPatToken ? {} : getQoderDashscopeCompatHeaders()),
    };

    mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders);

    const payload = this.transformRequest(mappedModel, body, stream, credentials);

    const bodyStr = JSON.stringify(payload);

    try {
      const response = await fetch(endpointUrl, {
        method: "POST",
        headers,
        body: bodyStr,
        signal,
      });

      const newHeaders = new Headers(response.headers);

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

      return {
        response: new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders,
        }),
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
              message: `Qoder fetch error: ${error.message}`,
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
}

export default QoderExecutor;
