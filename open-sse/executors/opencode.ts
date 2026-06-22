import { randomUUID } from "crypto";
import {
  BaseExecutor,
  setUserAgentHeader,
  type ExecuteInput,
  type ProviderCredentials,
} from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import { getModelTargetFormat } from "../config/providerModels.ts";
import {
  injectReasoningContentForThinkingModel,
  isThinkingMessageModel,
} from "../utils/reasoningContentInjector.ts";

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

  buildHeaders(
    credentials: ProviderCredentials | null,
    stream = true,
    clientHeaders?: Record<string, string> | null,
    model?: string
  ) {
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

    if (clientHeaders) {
      const clientUA = clientHeaders["User-Agent"] || clientHeaders["user-agent"];
      if (clientUA) {
        setUserAgentHeader(headers, clientUA);
      }

      // Forward OpenCode request metadata headers from client
      const findClientHeader = (name: string) =>
        Object.entries(clientHeaders).find(
          ([key]) => key.toLowerCase() === name.toLowerCase()
        )?.[1];

      const opencodeHeaderKeys = [
        "x-opencode-session",
        "x-opencode-request",
        "x-opencode-project",
        "x-opencode-client",
      ];
      for (const headerName of opencodeHeaderKeys) {
        const value = findClientHeader(headerName);
        if (value) {
          headers[headerName] = value;
        }
      }

      // #4022: OpenCode CLI only emits x-opencode-* headers when the provider id
      // starts with "opencode". For a custom-named provider (e.g. "omniroute") it
      // instead sends x-session-affinity / X-Session-Id, which both carry the same
      // OpenCode sessionID. Map that session id onto x-opencode-session so session
      // continuity to the opencode.ai upstream works regardless of how the user
      // named the provider. Scoped to this executor (opencode.ai/zen upstreams
      // only) — the generic DefaultExecutor intentionally does NOT do this, to
      // avoid leaking the client session id to arbitrary third-party upstreams.
      if (!headers["x-opencode-session"]) {
        const sessionAffinity =
          findClientHeader("x-session-affinity") || findClientHeader("x-session-id");
        if (sessionAffinity) {
          headers["x-opencode-session"] = sessionAffinity;

          // #4465: a custom-named provider only reaches this fallback because the
          // OpenCode CLI did NOT emit the x-opencode-* set (it only does so when the
          // provider id starts with "opencode"). It therefore also dropped
          // x-opencode-request, a per-request correlation id. Synthesize one so these
          // users are not disadvantaged versus opencode-prefixed providers on the
          // opencode.ai upstream. x-opencode-client / x-opencode-project are NOT
          // fabricated: their valid values are opencode-internal and inventing them
          // could be rejected upstream — they remain forward-only above. Scoped to this
          // executor (opencode.ai/zen) and only to the fallback path, so the direct
          // OpenCode CLI flow (which controls its own request id) is untouched.
          if (!headers["x-opencode-request"]) {
            headers["x-opencode-request"] = randomUUID();
          }
        }
      }
    }

    void model;

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
    if (modifiedBody && typeof modifiedBody === "object" && !Array.isArray(modifiedBody)) {
      const mb = modifiedBody as Record<string, unknown>;
      const m = String(model || "");
      const effortLevels = ["low", "medium", "high", "max"] as const;
      const matchedLevel = effortLevels.find((level) => m.endsWith(`-${level}`));
      if (matchedLevel) {
        const base = m.slice(0, -matchedLevel.length - 1);
        if (base.toLowerCase() === "deepseek-v4-pro") {
          mb.model = "deepseek-v4-pro";
          if (mb.reasoning_effort === undefined) {
            mb.reasoning_effort = matchedLevel;
          }
        }
      }
    }
    // #1543 / upstream PR #1099: thinking-mode upstreams routed through OpenCode
    // (DeepSeek V4 Flash, Kimi, MiniMax, ...) require reasoning_content echoed
    // back on assistant messages, or they 400 with "reasoning_content must be
    // passed back". OpenAI clients drop it across turns, so we inject a
    // placeholder for the affected model families.
    if (isThinkingMessageModel(model)) {
      modifiedBody = injectReasoningContentForThinkingModel(modifiedBody);
    }
    return modifiedBody;
  }
}
