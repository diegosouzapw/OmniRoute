import { BaseExecutor, type ExecuteInput, type ProviderCredentials } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import { getModelTargetFormat, getProviderModel } from "../config/providerModels.ts";
import { sanitizeQwenThinkingToolChoice } from "../services/qwenThinking.ts";

const FORMAT_FALLBACK_CHAIN = ["openai", "claude"];

export class OpencodeExecutor extends BaseExecutor {
  _requestFormat: string | null = null;

  constructor(provider: string) {
    super(provider, PROVIDERS[provider] || PROVIDERS.openai);
  }

  async execute(input: ExecuteInput) {
    const alias = this.provider;
    const staticFormat = getModelTargetFormat(alias, input.model);
    const isStatic = getProviderModel(alias, input.model) !== undefined;
    const formats = isStatic ? [staticFormat || "openai"] : FORMAT_FALLBACK_CHAIN;

    let lastResult: {
      response: Response;
      url: string;
      headers: Record<string, string>;
      transformedBody: unknown;
    } | null = null;
    for (const format of formats) {
      this._requestFormat = format;
      try {
        lastResult = await super.execute(input);
        if (lastResult.response.status !== 500 || isStatic) return lastResult;
        input.log?.debug?.(
          "FORMAT_FALLBACK",
          `${input.model}: ${format} returned 500, trying next format`
        );
      } finally {
        this._requestFormat = null;
      }
    }
    return lastResult!;
  }

  buildUrl(
    model: string,
    stream: boolean,
    urlIndex = 0,
    credentials: ProviderCredentials | null = null
  ) {
    void urlIndex;
    void credentials;

    const base = this.config.baseUrl;
    switch (this._requestFormat) {
      case "claude":
        return `${base}/messages`;
      case "openai-responses":
        return `${base}/responses`;
      case "gemini":
        return `${base}/models/${model}:${stream ? "streamGenerateContent?alt=sse" : "generateContent"}`;
      default:
        return `${base}/chat/completions`;
    }
  }

  buildHeaders(credentials: ProviderCredentials | null, stream = true) {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const key = credentials?.apiKey || credentials?.accessToken;

    if (key) {
      if (this._requestFormat === "claude") {
        headers["x-api-key"] = key;
      } else {
        headers["Authorization"] = `Bearer ${key}`;
      }
    }

    if (this._requestFormat === "claude") {
      headers["anthropic-version"] = "2023-06-01";
    }

    if (stream) {
      headers["Accept"] = "text/event-stream";
    }

    return headers;
  }

  transformRequest(
    model: string,
    body: any,
    stream: boolean,
    credentials: ProviderCredentials
  ): any {
    let modifiedBody = super.transformRequest(model, body, stream, credentials);
    if (
      modifiedBody &&
      typeof modifiedBody === "object" &&
      Array.isArray(modifiedBody.tools) &&
      modifiedBody.tools.length > 128
    ) {
      modifiedBody.tools = modifiedBody.tools.slice(0, 128);
    }
    modifiedBody = sanitizeQwenThinkingToolChoice(modifiedBody, "OpencodeExecutor");
    return modifiedBody;
  }
}
