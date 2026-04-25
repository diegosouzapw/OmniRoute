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
import {
  buildGitLabDirectGatewayUrl,
  buildGitLabOAuthEndpoints,
  getCachedGitLabDirectAccess,
  isGitLabDirectAccessDisabled,
  parseGitLabDirectAccessDetails,
  resolveGitLabOAuthBaseUrl,
  type GitLabDirectAccessDetails,
} from "@/lib/oauth/gitlab";

type OpenAIMessage = {
  role?: string;
  content?: unknown;
};

type JsonRecord = Record<string, unknown>;

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

function buildPrompt(messages: OpenAIMessage[] | undefined): string {
  if (!Array.isArray(messages)) return "";

  const systemParts: string[] = [];
  const userParts: string[] = [];

  for (const message of messages) {
    const role = String(message?.role || "user").toLowerCase();
    const text = extractTextContent(message?.content);
    if (!text) continue;

    if (role === "system" || role === "developer") {
      systemParts.push(text);
      continue;
    }

    if (role === "user") {
      userParts.push(text);
    }
  }

  const latestUserPrompt = userParts.at(-1) || "";
  if (!systemParts.length) {
    return latestUserPrompt;
  }

  return `System instructions:\n${systemParts.join("\n\n")}\n\n${latestUserPrompt}`.trim();
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

function buildSseChunk(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

function buildStreamingResponse(
  content: string,
  model: string,
  id: string,
  created: number
): Response {
  const encoder = new TextEncoder();

  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(
        encoder.encode(
          buildSseChunk({
            id,
            object: "chat.completion.chunk",
            created,
            model,
            choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
          })
        )
      );

      if (content) {
        controller.enqueue(
          encoder.encode(
            buildSseChunk({
              id,
              object: "chat.completion.chunk",
              created,
              model,
              choices: [{ index: 0, delta: { content }, finish_reason: null }],
            })
          )
        );
      }

      controller.enqueue(
        encoder.encode(
          buildSseChunk({
            id,
            object: "chat.completion.chunk",
            created,
            model,
            choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
          })
        )
      );
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

function buildJsonCompletion(
  content: string,
  model: string,
  id: string,
  created: number
): Response {
  const estimated = Math.max(1, Math.ceil(content.length / 4));
  return new Response(
    JSON.stringify({
      id,
      object: "chat.completion",
      created,
      model,
      choices: [
        {
          index: 0,
          message: { role: "assistant", content },
          finish_reason: "stop",
        },
      ],
      usage: {
        prompt_tokens: estimated,
        completion_tokens: estimated,
        total_tokens: estimated * 2,
      },
    }),
    {
      status: 200,
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
    const prompt = buildPrompt(body.messages as OpenAIMessage[] | undefined);
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
      ...(prompt ? { user_instruction: prompt } : {}),
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
    const prompt = buildPrompt(
      (input.body as Record<string, unknown>)?.messages as OpenAIMessage[]
    );
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
      (input.body as Record<string, unknown>) || {},
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
    const response = input.stream
      ? buildStreamingResponse(content, resolvedModel, responseId, created)
      : buildJsonCompletion(content, resolvedModel, responseId, created);

    return { response, url: activeTarget.url, headers: requestHeaders, transformedBody };
  }
}

export default GitlabExecutor;
