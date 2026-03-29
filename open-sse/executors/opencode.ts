import { BaseExecutor, type ExecuteInput, type ProviderCredentials } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import { getModelTargetFormat } from "../config/providerModels.ts";

export class OpencodeExecutor extends BaseExecutor {
  _requestFormat: string | null = null;

  constructor(provider: string) {
    super(provider, PROVIDERS[provider] || PROVIDERS.openai);
  }

  async execute(input: ExecuteInput) {
    this._requestFormat = getModelTargetFormat(this.provider, input.model) || "openai";
    try {
      return await super.execute(input);
    } finally {
      this._requestFormat = null;
    }
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
}
