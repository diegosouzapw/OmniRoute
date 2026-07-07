import { randomUUID } from "node:crypto";

import {
  BaseExecutor,
  mergeAbortSignals,
  mergeUpstreamExtraHeaders,
  type ExecuteInput,
  type ExecutorLog,
  type ProviderCredentials,
} from "./base.ts";
import { FETCH_TIMEOUT_MS } from "../config/constants.ts";
import { getAccessToken } from "../services/tokenRefresh.ts";
import { prepareToolMessages, buildToolAwareResult } from "../translator/webTools.ts";
import {
  buildStreamingResponse,
  buildJsonCompletion,
  buildToolJsonCompletion,
  buildToolStreamingResponse,
} from "./gitlabResponses.ts";
import {
  buildGitLabDirectGatewayUrl,
  buildGitLabOAuthEndpoints,
  getCachedGitLabDirectAccess,
  isGitLabDirectAccessDisabled,
  parseGitLabDirectAccessDetails,
  resolveGitLabOAuthBaseUrl,
  type GitLabDirectAccessDetails,
} from "@/lib/oauth/gitlab";

type OpenAIToolCall = {
  id?: string;
  type?: string;
  function?: { name?: string; arguments?: string };
};

type OpenAIMessage = {
  role?: string;
  content?: unknown;
  tool_calls?: OpenAIToolCall[];
  tool_call_id?: string;
  name?: string;
};

type JsonRecord = Record<string, unknown>;

/**
 * Bounds for GitLab's `code_suggestions` `small_file` generation contract. Its AI-Gateway
 * validation guard rejects an oversized/over-structured prompt with
 * `422 {"detail":"Validation error"}` (tokens 0/0, pre-inference). Turn-1 is small and
 * passes; a long folded tool-exchange history trips it — so the serialized prompt (and the
 * `user_instruction` field) must stay bounded (#6220).
 */
const MAX_TOOL_EXCHANGE_CHARS = 24_000;
const MAX_TOOL_RESULT_CHARS = 8_000;
const MAX_USER_INSTRUCTION_CHARS = 4_000;

function capText(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max)}\n…[truncated ${text.length - max} chars]`;
}

type GitLabRequestTarget = {
  mode: "monolith" | "direct";
  url: string;
  headers: Record<string, string>;
};

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function extractTextContent(content: unknown): string {
  if (typeof content === "string") {
    return content.trim();
  }

  if (!Array.isArray(content)) {
    return "";
  }

  return content
    .map((part) => {
      if (!part || typeof part !== "object") return "";
      const item = part as Record<string, unknown>;
      if (item.type === "text" && typeof item.text === "string") {
        return item.text;
      }
      if (item.type === "input_text" && typeof item.text === "string") {
        return item.text;
      }
      return "";
    })
    .filter((text) => text.trim().length > 0)
    .join("\n")
    .trim();
}

/**
 * GitLab code_suggestions is a single-prompt completion API (no chat roles), so the
 * OpenAI message array must be flattened to text.
 *
 * Simple conversations keep the legacy shape (system instructions + latest user message).
 * But when the array carries a **tool exchange** — an assistant with `tool_calls` or a
 * `tool` result message — the full conversation is serialized instead, folding each tool
 * result back keyed by its `tool_call_id`. Without this, `buildPrompt` dropped the
 * assistant/tool turns and re-derived a byte-identical turn-1 prompt, so the model kept
 * re-emitting the same `<tool>` call forever (#6220). Complements the tool_call emission
 * added in #6051.
 */
function hasToolExchange(messages: OpenAIMessage[]): boolean {
  return messages.some((message) => {
    const role = String(message?.role || "user").toLowerCase();
    if (role === "tool") return true;
    return (
      role === "assistant" && Array.isArray(message?.tool_calls) && message.tool_calls.length > 0
    );
  });
}

/** Legacy flatten: system instructions + the latest user message. */
function buildSimplePrompt(messages: OpenAIMessage[]): string {
  const systemParts: string[] = [];
  const userParts: string[] = [];
  for (const message of messages) {
    const role = String(message?.role || "user").toLowerCase();
    const text = extractTextContent(message?.content);
    if (!text) continue;
    if (role === "system" || role === "developer") {
      systemParts.push(text);
    } else if (role === "user") {
      userParts.push(text);
    }
  }
  const latestUserPrompt = userParts.at(-1) || "";
  if (!systemParts.length) return latestUserPrompt;
  return `System instructions:\n${systemParts.join("\n\n")}\n\n${latestUserPrompt}`.trim();
}

/** Render an assistant turn (its text plus any tool calls) for the tool-exchange prompt. */
function renderAssistantTurn(message: OpenAIMessage, text: string): string | null {
  const lines: string[] = [];
  if (text) lines.push(text);
  for (const tc of Array.isArray(message?.tool_calls) ? message.tool_calls : []) {
    const id = tc?.id ? ` [${tc.id}]` : "";
    lines.push(
      `Called tool ${tc?.function?.name || "tool"}${id} with arguments: ${tc?.function?.arguments ?? ""}`
    );
  }
  return lines.length ? `Assistant: ${lines.join("\n")}` : null;
}

/** Render one message as a labeled conversation line for the tool-exchange prompt. */
function renderConversationTurn(message: OpenAIMessage, role: string, text: string): string | null {
  if (role === "user") return text ? `User: ${text}` : null;
  if (role === "assistant") return renderAssistantTurn(message, text);
  if (role === "tool") {
    const id = message?.tool_call_id ? ` for ${message.tool_call_id}` : "";
    const name = message?.name ? ` (${message.name})` : "";
    return `Tool result${name}${id}: ${text}`;
  }
  return null;
}

/**
 * Keep only what the `small_file` generation contract can carry: every system message,
 * the latest user message, and the most-recent tool round (the last assistant `tool_calls`
 * turn onward). Older turns are dropped so `content_above_cursor` stays bounded (#6220).
 */
function selectBoundedMessages(messages: OpenAIMessage[]): OpenAIMessage[] {
  let lastUserIdx = -1;
  let lastToolRoundIdx = -1;
  messages.forEach((message, idx) => {
    const role = String(message?.role || "user").toLowerCase();
    if (role === "user") lastUserIdx = idx;
    if (role === "assistant" && Array.isArray(message?.tool_calls) && message.tool_calls.length) {
      lastToolRoundIdx = idx;
    }
  });
  const tailStart = lastToolRoundIdx >= 0 ? lastToolRoundIdx : lastUserIdx;
  const kept: OpenAIMessage[] = [];
  messages.forEach((message, idx) => {
    const role = String(message?.role || "user").toLowerCase();
    if (role === "system" || role === "developer") {
      kept.push(message);
    } else if (idx === lastUserIdx || idx >= tailStart) {
      kept.push(message);
    }
  });
  return kept;
}

/**
 * Serialize the most-recent turn history so the model sees the tool result (#6220), but
 * BOUNDED: only the last tool round is kept, each tool result is capped, and the whole
 * prompt is capped — otherwise the folded history trips GitLab's `small_file` 422 guard.
 */
function buildToolExchangePrompt(messages: OpenAIMessage[]): string {
  const systemParts: string[] = [];
  const convo: string[] = [];
  for (const message of selectBoundedMessages(messages)) {
    const role = String(message?.role || "user").toLowerCase();
    let text = extractTextContent(message?.content);
    if (role === "system" || role === "developer") {
      if (text) systemParts.push(text);
      continue;
    }
    if (role === "tool") text = capText(text, MAX_TOOL_RESULT_CHARS);
    const line = renderConversationTurn(message, role, text);
    if (line) convo.push(line);
  }
  const header = systemParts.length
    ? `System instructions:\n${systemParts.join("\n\n")}\n\n`
    : "";
  const body = `${header}${convo.join(
    "\n\n"
  )}\n\nContinue the response using the tool result above; do not repeat the tool call.`.trim();
  return capText(body, MAX_TOOL_EXCHANGE_CHARS);
}

/**
 * The user's actual instruction — the latest user message, capped. Kept separate from the
 * folded history so it is NOT duplicated into an oversized `user_instruction`, the likely
 * offending 422 field on tool-calling follow-up turns (#6220).
 */
function buildLatestUserInstruction(messages: OpenAIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const role = String(messages[i]?.role || "user").toLowerCase();
    if (role === "user") {
      const text = extractTextContent(messages[i]?.content);
      if (text) return capText(text, MAX_USER_INSTRUCTION_CHARS);
    }
  }
  return "";
}

/**
 * GitLab code_suggestions is a single-prompt completion API (no chat roles), so the
 * OpenAI message array must be flattened to text. Simple conversations keep the legacy
 * shape; a tool exchange (assistant `tool_calls` or a `tool` result) serializes the full
 * conversation so the model continues instead of re-emitting the same `<tool>` call
 * forever (#6220). Complements the tool_call emission added in #6051.
 */
export function buildPrompt(messages: OpenAIMessage[] | undefined): string {
  if (!Array.isArray(messages)) return "";
  return hasToolExchange(messages)
    ? buildToolExchangePrompt(messages)
    : buildSimplePrompt(messages);
}

function toOpenAIError(status: number, message: string): Response {
  return new Response(
    JSON.stringify({
      error: {
        message,
        type:
          status === 401 || status === 403
            ? "authentication_error"
            : status === 429
              ? "rate_limit_error"
              : "api_error",
      },
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}

function mergeCredentials(
  current: ProviderCredentials,
  patch: Partial<ProviderCredentials> | null | undefined
): ProviderCredentials {
  if (!patch) return current;
  return {
    ...current,
    ...patch,
    providerSpecificData: {
      ...(current.providerSpecificData || {}),
      ...(patch.providerSpecificData || {}),
    },
  };
}

function resolveGitLabRoot(credentials: ExecuteInput["credentials"]): string {
  return resolveGitLabOAuthBaseUrl(credentials?.providerSpecificData);
}

function resolveResponseModel(payload: JsonRecord, fallbackModel: string): string {
  const modelField = payload.model;
  if (typeof modelField === "string" && modelField.trim().length > 0) {
    return modelField.trim();
  }

  const modelRecord = asRecord(modelField);
  const modelName =
    typeof modelRecord.name === "string" && modelRecord.name.trim().length > 0
      ? modelRecord.name.trim()
      : typeof modelRecord.id === "string" && modelRecord.id.trim().length > 0
        ? modelRecord.id.trim()
        : null;
  if (modelName) {
    return modelName;
  }

  const metadata = asRecord(payload.metadata);
  const metadataModelDetails = asRecord(metadata.model_details);
  const payloadModelDetails = asRecord(payload.model_details);
  const nestedCandidates = [metadataModelDetails, payloadModelDetails];
  for (const candidate of nestedCandidates) {
    const value =
      typeof candidate.model_name === "string" && candidate.model_name.trim().length > 0
        ? candidate.model_name.trim()
        : typeof candidate.name === "string" && candidate.name.trim().length > 0
          ? candidate.name.trim()
          : null;
    if (value) {
      return value;
    }
  }

  return fallbackModel;
}

function buildMonolithHeaders(token: string | null): Record<string, string> {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function buildDirectHeaders(directAccess: GitLabDirectAccessDetails): Record<string, string> {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${directAccess.token}`,
    ...directAccess.headers,
  };
}

function isGitLabDuoOAuthProvider(providerId: string): boolean {
  return providerId === "gitlab-duo";
}

async function persistGitLabDirectAccessCache(
  input: ExecuteInput,
  credentials: ProviderCredentials,
  root: string,
  directAccess: GitLabDirectAccessDetails
) {
  if (!input.onCredentialsRefreshed) return;

  await input.onCredentialsRefreshed({
    providerSpecificData: {
      ...(credentials.providerSpecificData || {}),
      baseUrl: root,
      gitlabDirectAccess: {
        token: directAccess.token,
        baseUrl: directAccess.baseUrl,
        expiresAt: directAccess.expiresAt,
        headers: directAccess.headers,
      },
    },
  });
}

export class GitlabExecutor extends BaseExecutor {
  constructor(providerId = "gitlab") {
    super(providerId, {
      id: providerId,
      baseUrl: "https://gitlab.com/api/v4/code_suggestions/completions",
      headers: { "Content-Type": "application/json" },
    });
  }

  buildUrl(
    _model: string,
    _stream: boolean,
    _urlIndex = 0,
    credentials: ExecuteInput["credentials"] | null = null
  ): string {
    const endpoints = buildGitLabOAuthEndpoints(resolveGitLabRoot(credentials || {}));
    return endpoints.publicCompletionsUrl;
  }

  buildHeaders(credentials: ExecuteInput["credentials"], _stream = false): Record<string, string> {
    const token = credentials?.apiKey || credentials?.accessToken || null;
    return buildMonolithHeaders(token);
  }

  transformRequest(
    _model: string,
    body: Record<string, unknown>,
    _stream: boolean,
    credentials: ExecuteInput["credentials"]
  ): Record<string, unknown> {
    const messages = body.messages as OpenAIMessage[] | undefined;
    const prompt = buildPrompt(messages);
    // On a tool-exchange follow-up, `content_above_cursor` already carries the (bounded)
    // folded history — sending the same long text again as `user_instruction` is the
    // likely field that trips GitLab's `small_file` 422 guard. Send only the short latest
    // user message there instead (#6220). Simple turns keep the legacy behavior.
    const isToolExchange = Array.isArray(messages) && hasToolExchange(messages);
    const userInstruction = isToolExchange
      ? buildLatestUserInstruction(messages as OpenAIMessage[])
      : prompt;
    const providerData =
      credentials?.providerSpecificData && typeof credentials.providerSpecificData === "object"
        ? credentials.providerSpecificData
        : {};

    const projectPath =
      typeof providerData.projectPath === "string" && providerData.projectPath.trim().length > 0
        ? providerData.projectPath.trim()
        : undefined;
    const fileName =
      typeof providerData.fileName === "string" && providerData.fileName.trim().length > 0
        ? providerData.fileName.trim()
        : "snippet.txt";

    return {
      current_file: {
        file_name: fileName,
        content_above_cursor: prompt,
        content_below_cursor: "",
      },
      intent: "generation",
      generation_type: "small_file",
      stream: false,
      ...(projectPath ? { project_path: projectPath } : {}),
      ...(userInstruction ? { user_instruction: userInstruction } : {}),
    };
  }

  async refreshCredentials(credentials: ProviderCredentials, log: ExecutorLog | null) {
    if (!isGitLabDuoOAuthProvider(this.provider) || !credentials.refreshToken) {
      return null;
    }
    try {
      return await getAccessToken(this.provider, credentials, log);
    } catch (error) {
      log?.error?.(
        "TOKEN",
        `GitLab Duo refresh error: ${error instanceof Error ? error.message : String(error)}`
      );
      return null;
    }
  }

  needsRefresh(credentials?: ProviderCredentials | null) {
    if (
      isGitLabDuoOAuthProvider(this.provider) &&
      !credentials?.accessToken &&
      credentials?.refreshToken
    ) {
      return true;
    }
    return super.needsRefresh(credentials);
  }

  private async fetchGitLabDirectAccess(
    root: string,
    accessToken: string,
    signal: AbortSignal | null | undefined
  ): Promise<{
    directAccess: GitLabDirectAccessDetails | null;
    response: Response | null;
    bodyText: string;
  }> {
    const endpoints = buildGitLabOAuthEndpoints(root);
    const timeoutSignal = AbortSignal.timeout(FETCH_TIMEOUT_MS);
    const combinedSignal = signal ? mergeAbortSignals(signal, timeoutSignal) : timeoutSignal;
    const response = await fetch(endpoints.directAccessUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      signal: combinedSignal,
    });

    const bodyText = await response.text();
    if (!response.ok) {
      return { directAccess: null, response, bodyText };
    }

    const parsed = bodyText ? JSON.parse(bodyText) : {};
    return {
      directAccess: parseGitLabDirectAccessDetails(parsed),
      response,
      bodyText,
    };
  }

  private async resolveRequestTarget(
    input: ExecuteInput,
    credentials: ProviderCredentials
  ): Promise<{
    target: GitLabRequestTarget | null;
    credentials: ProviderCredentials;
    errorResponse: Response | null;
  }> {
    const root = resolveGitLabRoot(credentials);
    const endpoints = buildGitLabOAuthEndpoints(root);

    if (!isGitLabDuoOAuthProvider(this.provider)) {
      return {
        target: {
          mode: "monolith",
          url: endpoints.publicCompletionsUrl,
          headers: buildMonolithHeaders(credentials.apiKey || credentials.accessToken || null),
        },
        credentials,
        errorResponse: null,
      };
    }

    if (!credentials.accessToken) {
      return {
        target: null,
        credentials,
        errorResponse: toOpenAIError(401, "GitLab Duo OAuth connection is missing an access token"),
      };
    }

    const cachedDirectAccess = getCachedGitLabDirectAccess(credentials.providerSpecificData);
    if (cachedDirectAccess) {
      return {
        target: {
          mode: "direct",
          url: buildGitLabDirectGatewayUrl(cachedDirectAccess.baseUrl),
          headers: buildDirectHeaders(cachedDirectAccess),
        },
        credentials,
        errorResponse: null,
      };
    }

    try {
      const { directAccess, response, bodyText } = await this.fetchGitLabDirectAccess(
        root,
        credentials.accessToken,
        input.signal
      );

      if (directAccess) {
        await persistGitLabDirectAccessCache(input, credentials, root, directAccess);
        const mergedCredentials = mergeCredentials(credentials, {
          providerSpecificData: {
            ...(credentials.providerSpecificData || {}),
            baseUrl: root,
            gitlabDirectAccess: {
              token: directAccess.token,
              baseUrl: directAccess.baseUrl,
              expiresAt: directAccess.expiresAt,
              headers: directAccess.headers,
            },
          },
        });

        return {
          target: {
            mode: "direct",
            url: buildGitLabDirectGatewayUrl(directAccess.baseUrl),
            headers: buildDirectHeaders(directAccess),
          },
          credentials: mergedCredentials,
          errorResponse: null,
        };
      }

      if (!response) {
        return {
          target: {
            mode: "monolith",
            url: endpoints.publicCompletionsUrl,
            headers: buildMonolithHeaders(credentials.accessToken),
          },
          credentials,
          errorResponse: null,
        };
      }

      if (response.status === 401) {
        return {
          target: null,
          credentials,
          errorResponse: toOpenAIError(401, "GitLab Duo direct access token request was rejected"),
        };
      }

      if (response.status === 403 && !isGitLabDirectAccessDisabled(response.status, bodyText)) {
        return {
          target: null,
          credentials,
          errorResponse: toOpenAIError(403, "GitLab Duo direct access scope is unavailable"),
        };
      }

      return {
        target: {
          mode: "monolith",
          url: endpoints.publicCompletionsUrl,
          headers: buildMonolithHeaders(credentials.accessToken),
        },
        credentials,
        errorResponse: null,
      };
    } catch (error) {
      return {
        target: {
          mode: "monolith",
          url: endpoints.publicCompletionsUrl,
          headers: buildMonolithHeaders(credentials.accessToken),
        },
        credentials,
        errorResponse: null,
      };
    }
  }

  private async performRequest(
    input: ExecuteInput,
    target: GitLabRequestTarget,
    transformedBody: Record<string, unknown>
  ) {
    const headers = { ...target.headers };
    mergeUpstreamExtraHeaders(headers, input.upstreamExtraHeaders);
    const timeoutSignal = AbortSignal.timeout(FETCH_TIMEOUT_MS);
    const combinedSignal = input.signal
      ? mergeAbortSignals(input.signal, timeoutSignal)
      : timeoutSignal;
    const response = await fetch(target.url, {
      method: "POST",
      headers,
      body: JSON.stringify(transformedBody),
      signal: combinedSignal,
    });
    return { response, headers };
  }

  async execute(input: ExecuteInput) {
    const bodyObj = (input.body as Record<string, unknown>) || {};
    const rawMessages = (bodyObj.messages as OpenAIMessage[]) || [];

    // Emulate OpenAI tool calling for GitLab Duo (which has no native function
    // calling). When `tools` are present we serialize the tool contract into the
    // prompt and parse `<tool>{...}</tool>` blocks back out of the completion text
    // into OpenAI `tool_calls` — the same web-tool-emulation idiom used by the
    // qwen-web / duckduckgo-web executors (#6051).
    const { hasTools, requestedTools, effectiveMessages } = prepareToolMessages(
      bodyObj,
      rawMessages as Array<{ role: string; content: unknown }>
    );

    const prompt = buildPrompt(effectiveMessages as OpenAIMessage[]);
    if (!prompt) {
      return {
        response: toOpenAIError(400, "GitLab Duo requires at least one user message"),
      };
    }

    let activeCredentials = input.credentials;
    if (this.needsRefresh(activeCredentials)) {
      const refreshed = await this.refreshCredentials(activeCredentials, input.log || null);
      if (refreshed) {
        activeCredentials = mergeCredentials(activeCredentials, refreshed);
        await input.onCredentialsRefreshed?.({
          ...refreshed,
          providerSpecificData: {
            ...(input.credentials.providerSpecificData || {}),
            ...(refreshed.providerSpecificData || {}),
          },
        });
      }
    }

    const transformedBody = this.transformRequest(
      input.model,
      { ...bodyObj, messages: effectiveMessages },
      false,
      activeCredentials
    );

    const {
      target,
      credentials: resolvedCredentials,
      errorResponse,
    } = await this.resolveRequestTarget(input, activeCredentials);
    if (errorResponse || !target) {
      return {
        response: errorResponse || toOpenAIError(500, "GitLab Duo target resolution failed"),
      };
    }
    activeCredentials = resolvedCredentials;

    let upstream: Response;
    let requestHeaders: Record<string, string>;
    let activeTarget = target;
    try {
      const requestResult = await this.performRequest(input, target, transformedBody);
      upstream = requestResult.response;
      requestHeaders = requestResult.headers;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        response: toOpenAIError(502, `GitLab Duo connection failed: ${message}`),
        url: target.url,
        headers: target.headers,
        transformedBody,
      };
    }

    if (!upstream.ok && target.mode === "direct") {
      const fallbackTarget: GitLabRequestTarget = {
        mode: "monolith",
        url: buildGitLabOAuthEndpoints(resolveGitLabRoot(activeCredentials)).publicCompletionsUrl,
        headers: buildMonolithHeaders(activeCredentials.accessToken || null),
      };

      try {
        const fallbackResult = await this.performRequest(input, fallbackTarget, transformedBody);
        upstream = fallbackResult.response;
        requestHeaders = fallbackResult.headers;
        activeTarget = fallbackTarget;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          response: toOpenAIError(502, `GitLab Duo connection failed: ${message}`),
          url: fallbackTarget.url,
          headers: fallbackTarget.headers,
          transformedBody,
        };
      }
    }

    if (!upstream.ok) {
      const text = await upstream.text();
      const message =
        upstream.status === 401 || upstream.status === 403
          ? `GitLab Duo auth failed: ${upstream.status}`
          : upstream.status === 429
            ? "GitLab Duo rate limited the request"
            : text || `GitLab Duo request failed: ${upstream.status}`;
      return {
        response: toOpenAIError(upstream.status, message),
        url: activeTarget.url,
        headers: requestHeaders,
        transformedBody,
      };
    }

    const payload = (await upstream.json()) as JsonRecord;
    const choices = Array.isArray(payload.choices) ? payload.choices : [];
    const firstChoice =
      choices[0] && typeof choices[0] === "object" ? (choices[0] as JsonRecord) : {};
    const content =
      typeof firstChoice.text === "string"
        ? firstChoice.text
        : typeof payload.content === "string"
          ? payload.content
          : "";
    const resolvedModel = resolveResponseModel(payload, input.model);
    const responseId = `chatcmpl-gitlab-${randomUUID()}`;
    const created = Math.floor(Date.now() / 1000);

    if (hasTools) {
      const {
        content: toolContent,
        toolCalls,
        finishReason,
      } = buildToolAwareResult(content, requestedTools, "gitlab");
      const message: Record<string, unknown> = { role: "assistant", content: toolContent };
      if (toolCalls) {
        message.tool_calls = toolCalls;
        message.content = null;
      }
      const response = input.stream
        ? buildToolStreamingResponse(message, finishReason, resolvedModel, responseId, created)
        : buildToolJsonCompletion(message, finishReason, resolvedModel, responseId, created);
      return { response, url: activeTarget.url, headers: requestHeaders, transformedBody };
    }

    const response = input.stream
      ? buildStreamingResponse(content, resolvedModel, responseId, created)
      : buildJsonCompletion(content, resolvedModel, responseId, created);

    return { response, url: activeTarget.url, headers: requestHeaders, transformedBody };
  }
}

export default GitlabExecutor;
