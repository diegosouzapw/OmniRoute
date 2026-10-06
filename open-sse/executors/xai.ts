import { BaseExecutor, type ExecutorLog, type ProviderCredentials } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import { getModelTargetFormat } from "../config/providerModels.ts";
import { isResponsesEndpointPath } from "../utils/responsesEndpoint.ts";
import { chatRequestToXaiResponses } from "@/lib/providers/xai/translators/openai-chat.ts";
import { capXaiRequestHistory } from "../services/xaiMessageCap.ts";

type JsonRecord = Record<string, unknown>;

/**
 * xAI/Grok model ids (open-sse/config/providers/registry/xai/index.ts) that accept
 * a graduated `reasoning_effort`. Kept narrow and reconciled against the REAL
 * catalog rather than upstream's example ids (grok-4/grok-3 do not exist here):
 *   - grok-4.3                  — current-generation flagship, reasoning-capable.
 *   - grok-4.20-0309-reasoning  — explicit reasoning variant.
 *
 * grok-4.20-multi-agent-0309 is intentionally left unclassified (neither allow
 * nor deny): its reasoning support is not documented in the local catalog, so
 * we pass it through unchanged rather than guess.
 */
const REASONING_ALLOWED = ["grok-4.3", "grok-4.20-0309-reasoning"];

/**
 * Model ids that reject `reasoning_effort` outright:
 *   - grok-build-0.1                — build/tool-oriented model, no reasoning mode.
 *   - grok-4.20-0309-non-reasoning   — already encodes "no reasoning" in the id;
 *     forwarding reasoning_effort here would be redundant/rejected upstream.
 */
const REASONING_DENIED = ["grok-build-0.1", "grok-4.20-0309-non-reasoning"];

/** `-{level}` suffixes some clients append to a model id to select reasoning intensity. */
const EFFORT_SUFFIXES = ["low", "medium", "high", "xhigh"] as const;

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

/**
 * xAI/Grok executor (port of decolua/9router#2147).
 *
 * Some Grok clients select reasoning intensity via a `-{low,medium,high,xhigh}`
 * suffix on the model id (e.g. `grok-4.3-high`) rather than a native
 * `reasoning_effort` field — xAI itself does not recognize the suffixed id.
 * This executor:
 *   1. Parses and strips that suffix off the model id before the request
 *      reaches xAI, mapping it to `reasoning_effort` for allow-listed models.
 *   2. Strips any `reasoning_effort` for deny-listed models — including ids
 *      that already encode their reasoning state in the name (`-reasoning` /
 *      `-non-reasoning`), which must not be double-mutated by also stacking a
 *      `reasoning_effort` field on top of what the id already declares.
 *   3. Leaves unclassified models and bodies untouched otherwise.
 */
export class XaiExecutor extends BaseExecutor {
  constructor(provider = "xai") {
    super(provider, PROVIDERS[provider]);
  }

  buildUrl(
    model: string,
    _stream: boolean,
    _urlIndex = 0,
    credentials: ProviderCredentials | null = null
  ) {
    if (getModelTargetFormat(this.provider, model) === "openai-responses") {
      return this.config.responsesBaseUrl || this.config.baseUrl;
    }
    if (isResponsesEndpointPath(credentials?.requestEndpointPath)) {
      return this.config.responsesBaseUrl || this.config.baseUrl;
    }
    return this.config.baseUrl;
  }

  async refreshCredentials(
    credentials: ProviderCredentials,
    log?: ExecutorLog | null
  ): Promise<Partial<ProviderCredentials> | null> {
    if (this.provider !== "xai-oauth" || !credentials.refreshToken) return null;

    try {
      const response = await fetch(this.config.tokenUrl || "https://auth.x.ai/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: this.config.clientId || "",
          refresh_token: credentials.refreshToken,
        }),
      });

      if (!response.ok) {
        log?.warn?.("TOKEN_REFRESH", `xAI OAuth refresh failed with status ${response.status}`);
        return null;
      }

      const data = await response.json();
      if (!data.access_token) {
        log?.warn?.("TOKEN_REFRESH", "xAI OAuth refresh response omitted access_token");
        return null;
      }

      const expiresIn = Number(data.expires_in) || 21600;
      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token || credentials.refreshToken,
        expiresAt: new Date(Date.now() + expiresIn * 1000).toISOString(),
      };
    } catch (error) {
      log?.warn?.(
        "TOKEN_REFRESH",
        `xAI OAuth refresh error: ${error instanceof Error ? error.message : String(error)}`
      );
      return null;
    }
  }

  transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: ProviderCredentials
  ): unknown {
    const cleaned = super.transformRequest(model, body, stream, credentials);
    const record = asRecord(cleaned);
    if (!record) return cleaned;

    let out: JsonRecord = { ...record };
    const nativeXaiPassthrough = record._nativeXaiResponsesPassthrough === true;
    delete out._nativeXaiResponsesPassthrough;
    delete out._nativeCodexPassthrough;

    const useResponses =
      nativeXaiPassthrough ||
      getModelTargetFormat(this.provider, model) === "openai-responses" ||
      isResponsesEndpointPath(credentials?.requestEndpointPath);

    // #10165: chat/completions clients send messages + max_tokens; xAI /v1/responses
    // requires input + max_output_tokens. Convert at the executor edge so a missed
    // chatCore translation cannot ship a chat-shaped body to Responses.
    if (useResponses) {
      if (Array.isArray(out.messages) && out.input == null) {
        out = chatRequestToXaiResponses(out as never) as unknown as JsonRecord;
      } else {
        if (out.max_completion_tokens != null && out.max_output_tokens == null) {
          out.max_output_tokens = out.max_completion_tokens;
          delete out.max_completion_tokens;
        }
        if (out.max_tokens != null && out.max_output_tokens == null) {
          out.max_output_tokens = out.max_tokens;
          delete out.max_tokens;
        }
        if (out.response_format != null && out.text == null) {
          out.text = { format: out.response_format };
          delete out.response_format;
        }
      }
      // Keep model id from the routed request when the translator left it empty.
      if (out.model == null && model) out.model = model;
      // After chat→Responses expansion, `input` is what xAI counts toward 800.
      return capXaiRequestHistory(out);
    }

    let modelId = typeof out.model === "string" ? out.model : model;

    let suffixEffort: string | null = null;
    for (const level of EFFORT_SUFFIXES) {
      const suffix = `-${level}`;
      if (modelId.endsWith(suffix)) {
        suffixEffort = level;
        modelId = modelId.slice(0, -suffix.length);
        break;
      }
    }
    if (suffixEffort && typeof out.model === "string") {
      out.model = modelId;
    }

    const isDenied = REASONING_DENIED.some((id) => modelId.includes(id));
    const isAllowed = REASONING_ALLOWED.some((id) => modelId.includes(id));

    if (isDenied) {
      delete out.reasoning_effort;
    } else if (isAllowed) {
      const effort = suffixEffort || out.reasoning_effort;
      if (effort) out.reasoning_effort = effort;
    }

    return capXaiRequestHistory(out);
  }
}

export default XaiExecutor;
