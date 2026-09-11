import { SignJWT, importPKCS8 } from "jose";
import { BaseExecutor, ExecuteInput } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import { getVertexModelTransport, normalizeVertexModelId } from "../config/vertexModels.ts";

interface ServiceAccount {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  [key: string]: unknown;
}

const TOKEN_CACHE = new Map<string, { token: string; expiresAt: number }>();

// OAuth scopes minted into the Vertex SA access token.
//   - cloud-platform authorizes Vertex AI (aiplatform.googleapis.com) for chat/image execution.
//   - generative-language.retriever is ADDITIONALLY required so model discovery can list the live
//     catalog from generativelanguage.googleapis.com/v1beta/models — without it that listing returns
//     403 ACCESS_TOKEN_SCOPE_INSUFFICIENT and discovery silently falls back to the static ~10-model
//     registry list. The extra scope is harmless for execution (cloud-platform still present) and for
//     projects where it isn't needed (the mint never validates scope availability).
export const VERTEX_OAUTH_SCOPES = [
  "https://www.googleapis.com/auth/cloud-platform",
  "https://www.googleapis.com/auth/generative-language.retriever",
] as const;

export function parseSAFromApiKey(apiKey: string): ServiceAccount {
  let parsed: ServiceAccount & { web?: unknown; installed?: unknown };
  try {
    parsed = JSON.parse(apiKey);
  } catch {
    throw new Error("Vertex AI requires a valid Service Account JSON as the API key");
  }
  if (parsed && typeof parsed === "object" && ("web" in parsed || "installed" in parsed)) {
    throw new Error(
      "OAuth client JSON is not a Service Account key; create a Service Account JSON key or provide an OAuth access token"
    );
  }
  return parsed;
}

/**
 * A Service Account credential is a JSON object (type/client_email/private_key). A Vertex AI
 * Express-mode API key is an opaque non-JSON string. Distinguishing them lets the executor
 * support BOTH: Service Account JSON (JWT → OAuth → project-scoped endpoint + Bearer auth) and
 * Express keys (project-less publisher endpoint + query-key auth), instead of failing every
 * Express key with "requires a valid Service Account JSON".
 */
export function looksLikeServiceAccountJson(apiKey: string): boolean {
  if (!apiKey || typeof apiKey !== "string") return false;
  try {
    const parsed = JSON.parse(apiKey);
    return !!parsed && typeof parsed === "object" && !Array.isArray(parsed);
  } catch {
    return false;
  }
}

/** True for a Vertex AI Express-mode API key (a non-empty, non-JSON, non-OAuth credential). */
export function isExpressApiKey(apiKey?: string | null): boolean {
  return (
    typeof apiKey === "string" && apiKey.trim().length > 0 && !looksLikeServiceAccountJson(apiKey)
  );
}

export async function getAccessToken(sa: ServiceAccount): Promise<string> {
  if (!sa.client_email || !sa.private_key) {
    throw new Error(
      "Service Account JSON is missing required fields (client_email or private_key)"
    );
  }

  const cacheKey = sa.client_email;
  const cached = TOKEN_CACHE.get(cacheKey);

  // Buffer of 60 seconds
  if (cached && Date.now() < cached.expiresAt - 60_000) {
    return cached.token;
  }

  const privateKey = await importPKCS8(sa.private_key, "RS256");
  const now = Math.floor(Date.now() / 1000);

  const jwt = await new SignJWT({
    iss: sa.client_email,
    sub: sa.client_email,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
    scope: VERTEX_OAUTH_SCOPES.join(" "),
  })
    .setProtectedHeader({ alg: "RS256", kid: sa.private_key_id })
    .sign(privateKey);

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenRes.ok) {
    const errorText = await tokenRes.text();
    throw new Error(
      `Failed to exchange JWT for Vertex access token: ${tokenRes.status} ${errorText}`
    );
  }

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  if (!accessToken) {
    throw new Error("Vertex AI token exchange succeeded but no access_token found");
  }

  TOKEN_CACHE.set(cacheKey, {
    token: accessToken,
    expiresAt: (now + 3600) * 1000,
  });

  return accessToken;
}

function isPartnerModel(model: string) {
  return getVertexModelTransport(model) === "openai";
}

// Anthropic models need their own branch: they use Vertex's native Anthropic Messages API
// (publishers/anthropic/.../rawPredict), not the generic OpenAI-compatible MaaS endpoint used by
// xAI and open models. Mistral has a separate native rawPredict branch below.
function isClaudeModel(model: string) {
  return getVertexModelTransport(model) === "anthropic";
}

function isMistralModel(model: string) {
  return getVertexModelTransport(model) === "mistral";
}

interface VertexUrlCredentials {
  apiKey?: string | null;
  accessToken?: string | null;
  projectId?: string;
  providerSpecificData?: {
    projectId?: string;
    project?: string;
    region?: string;
  };
}

function configuredVertexProjectId(credentials?: VertexUrlCredentials | null): string | undefined {
  return (
    credentials?.projectId ||
    credentials?.providerSpecificData?.projectId ||
    credentials?.providerSpecificData?.project
  );
}

function projectIdFromServiceAccount(
  credentials?: VertexUrlCredentials | null
): string | undefined {
  if (!credentials?.apiKey) return undefined;
  try {
    const sa = parseSAFromApiKey(credentials.apiKey);
    if (sa.project_id) return sa.project_id;
  } catch {
    // Ignored, handled in execute
  }
  return undefined;
}

function encodeOpaqueApiKey(credentials?: VertexUrlCredentials | null): string | null {
  if (!isExpressApiKey(credentials?.apiKey) || credentials?.accessToken) return null;
  return encodeURIComponent(String(credentials.apiKey).trim());
}

function buildExpressGeminiUrl(
  canonicalModel: string,
  stream: boolean,
  expressKey: string
): string {
  if (getVertexModelTransport(canonicalModel) !== "gemini") {
    throw new Error(
      "Vertex partner models require project-scoped credentials; Express API keys support Gemini models only"
    );
  }
  const op = stream ? "streamGenerateContent?alt=sse&" : "generateContent?";
  return `https://aiplatform.googleapis.com/v1/publishers/google/models/${canonicalModel}:${op}key=${expressKey}`;
}

function buildProjectScopedVertexUrl(
  canonicalModel: string,
  stream: boolean,
  project: string,
  region: string,
  opaqueApiKey: string | null
): string {
  const apiKeySuffix = opaqueApiKey ? `?key=${opaqueApiKey}` : "";
  if (isClaudeModel(canonicalModel)) {
    // streamRawPredict?alt=sse was verified to return a single plain JSON body (not real SSE
    // framing) rather than actual chunked events, which breaks the SSE parser upstream
    // ("stream ended before producing a non-ping SSE event"). rawPredict is confirmed reliable
    // for both streaming and non-streaming requests; always use it here.
    return `https://aiplatform.googleapis.com/v1/projects/${project}/locations/${region}/publishers/anthropic/models/${canonicalModel}:rawPredict${apiKeySuffix}`;
  }
  if (isMistralModel(canonicalModel)) {
    const operation = stream ? "streamRawPredict" : "rawPredict";
    return `https://aiplatform.googleapis.com/v1/projects/${project}/locations/${region}/publishers/mistralai/models/${canonicalModel}:${operation}${apiKeySuffix}`;
  }
  if (isPartnerModel(canonicalModel)) {
    return `https://aiplatform.googleapis.com/v1/projects/${project}/locations/global/endpoints/openapi/chat/completions${apiKeySuffix}`;
  }
  const operation = stream ? "streamGenerateContent?alt=sse" : "generateContent";
  const querySeparator = opaqueApiKey ? (stream ? "&" : "?") : "";
  return `https://aiplatform.googleapis.com/v1/projects/${project}/locations/${region}/publishers/google/models/${canonicalModel}:${operation}${querySeparator}${opaqueApiKey ? `key=${opaqueApiKey}` : ""}`;
}

// Defensive normalizer: target-format resolution for manually-added custom Claude models under
// "vertex"/"vertex-partner" was observed sending a Gemini-shaped body (contents/parts) to the
// Anthropic rawPredict endpoint instead of the configured "claude" format, causing a hard
// "messages: Field required" error upstream regardless of the stored per-model targetFormat. This
// converts a Gemini-shaped body to Anthropic Messages shape so the executor works either way,
// independent of that unresolved upstream resolution gap.
function toAnthropicBody(body: Record<string, unknown>): Record<string, unknown> {
  const contents = body.contents as
    Array<{ role?: string; parts?: Array<{ text?: string }> }> | undefined;
  if (!Array.isArray(contents)) return body;

  const messages = contents.map((c) => ({
    role: c.role === "model" ? "assistant" : "user",
    content: (c.parts || []).map((p) => p.text || "").join(""),
  }));
  const generationConfig = body.generationConfig as { maxOutputTokens?: number } | undefined;
  const systemInstruction = body.systemInstruction as
    { parts?: Array<{ text?: string }> } | undefined;

  const converted: Record<string, unknown> = {
    messages,
    max_tokens: generationConfig?.maxOutputTokens || 4096,
  };
  if (systemInstruction?.parts?.length) {
    converted.system = systemInstruction.parts.map((p) => p.text || "").join("");
  }
  return converted;
}

// rawPredict always returns a single complete JSON body, never real SSE framing (see buildUrl).
// When the caller actually requested a stream, synthesize a genuine Anthropic-native event
// sequence from that JSON so the existing claude-to-openai.ts (and sibling) response translators
// — which already parse real message_start/content_block_*/message_delta/message_stop events —
// can consume it correctly, instead of relying on the OpenAI-`choices`-only JSON→SSE fallback
// (open-sse/utils/jsonToSse.ts) which cannot represent Anthropic's native response shape at all.
function synthesizeClaudeSse(response: Record<string, unknown>): string {
  const messageId = typeof response.id === "string" ? response.id : `msg_${Date.now()}`;
  const model = typeof response.model === "string" ? response.model : "";
  const usage = (response.usage as Record<string, unknown>) || {};
  const stopReason = typeof response.stop_reason === "string" ? response.stop_reason : "end_turn";
  const stopSequence = (response.stop_sequence as string | null | undefined) ?? null;
  const content = Array.isArray(response.content) ? response.content : [];

  const events: Array<{ event: string; data: Record<string, unknown> }> = [];

  events.push({
    event: "message_start",
    data: {
      type: "message_start",
      message: {
        id: messageId,
        type: "message",
        role: "assistant",
        content: [],
        model,
        stop_reason: null,
        stop_sequence: null,
        usage: { input_tokens: usage.input_tokens || 0, output_tokens: 0 },
      },
    },
  });

  content.forEach((block: Record<string, unknown>, index: number) => {
    if (block.type === "text") {
      events.push({
        event: "content_block_start",
        data: { type: "content_block_start", index, content_block: { type: "text", text: "" } },
      });
      if (block.text) {
        events.push({
          event: "content_block_delta",
          data: {
            type: "content_block_delta",
            index,
            delta: { type: "text_delta", text: block.text },
          },
        });
      }
      events.push({ event: "content_block_stop", data: { type: "content_block_stop", index } });
    } else if (block.type === "tool_use") {
      events.push({
        event: "content_block_start",
        data: {
          type: "content_block_start",
          index,
          content_block: { type: "tool_use", id: block.id, name: block.name, input: {} },
        },
      });
      events.push({
        event: "content_block_delta",
        data: {
          type: "content_block_delta",
          index,
          delta: { type: "input_json_delta", partial_json: JSON.stringify(block.input ?? {}) },
        },
      });
      events.push({ event: "content_block_stop", data: { type: "content_block_stop", index } });
    } else if (block.type === "thinking") {
      events.push({
        event: "content_block_start",
        data: {
          type: "content_block_start",
          index,
          content_block: { type: "thinking", thinking: "" },
        },
      });
      if (block.thinking) {
        events.push({
          event: "content_block_delta",
          data: {
            type: "content_block_delta",
            index,
            delta: { type: "thinking_delta", thinking: block.thinking },
          },
        });
      }
      events.push({ event: "content_block_stop", data: { type: "content_block_stop", index } });
    }
  });

  events.push({
    event: "message_delta",
    data: {
      type: "message_delta",
      delta: { stop_reason: stopReason, stop_sequence: stopSequence },
      usage: { output_tokens: usage.output_tokens || 0 },
    },
  });

  events.push({ event: "message_stop", data: { type: "message_stop" } });

  return events.map((e) => `event: ${e.event}\ndata: ${JSON.stringify(e.data)}\n\n`).join("");
}

export class VertexExecutor extends BaseExecutor {
  constructor() {
    super("vertex", PROVIDERS.vertex);
  }

  async execute(input: ExecuteInput) {
    const canonicalModel = normalizeVertexModelId(input.model);
    let canonicalBody = input.body;
    if (canonicalBody && typeof canonicalBody === "object" && !Array.isArray(canonicalBody)) {
      const bodyRecord = canonicalBody as Record<string, unknown>;
      if (typeof bodyRecord.model === "string") {
        const canonicalBodyModel = normalizeVertexModelId(bodyRecord.model);
        if (canonicalBodyModel !== bodyRecord.model) {
          canonicalBody = { ...bodyRecord, model: canonicalBodyModel };
        }
      }
    }
    if (canonicalModel !== input.model || canonicalBody !== input.body) {
      input = { ...input, model: canonicalModel, body: canonicalBody };
    }

    const { credentials, log, model, stream } = input;
    // Defensive: trim stray surrounding whitespace from a pasted credential.
    if (typeof credentials.apiKey === "string") {
      credentials.apiKey = credentials.apiKey.trim();
    }
    // Service Account JSON → mint a short-lived OAuth token (Bearer). An Express-mode API key is
    // sent as-is via x-goog-api-key (see buildHeaders), so no token exchange is needed for it.
    if (
      credentials.apiKey &&
      !credentials.accessToken &&
      looksLikeServiceAccountJson(credentials.apiKey)
    ) {
      try {
        const sa = parseSAFromApiKey(credentials.apiKey);
        credentials.accessToken = await getAccessToken(sa);
      } catch (err: any) {
        log?.error?.("VERTEX", `Failed to generate JWT token: ${err.message}`);
        throw err;
      }
    }
    if (isClaudeModel(model) && input.body && typeof input.body === "object") {
      let body = input.body as Record<string, unknown>;
      if (!Array.isArray(body.messages)) {
        body = toAnthropicBody(body);
        input.body = body;
      }
      // The rawPredict endpoint requires "anthropic_version" in the body (Vertex's substitute
      // for the "anthropic-version" header used by Anthropic's direct API).
      body.anthropic_version ??= "vertex-2023-10-16";
      // Unlike Anthropic's direct API (which reads the model from the body), Vertex's
      // rawPredict endpoint already encodes project/region/model in the URL and 400s with
      // "model: Extra inputs are not permitted" if the translated request body still carries
      // one (the openai→claude request translator copies the client's model field over).
      delete body.model;
    }

    const result = await super.execute(input);

    if (isClaudeModel(model) && stream) {
      const response = result instanceof Response ? result : result?.response;
      if (response?.ok) {
        const contentType = response.headers.get("content-type") || "";
        if (
          contentType.includes("application/json") &&
          !contentType.includes("text/event-stream")
        ) {
          const jsonText = await response.text();
          let newBody = jsonText;
          let newContentType = contentType;
          try {
            newBody = synthesizeClaudeSse(JSON.parse(jsonText));
            newContentType = "text/event-stream";
          } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            log?.warn?.("VERTEX", `Failed to synthesize Claude SSE stream: ${message}`);
          }
          const newHeaders = new Headers(response.headers);
          newHeaders.set("content-type", newContentType);
          newHeaders.delete("content-length");
          const newResponse = new Response(newBody, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders,
          });
          return result instanceof Response ? newResponse : { ...result, response: newResponse };
        }
      }
    }

    return result;
  }

  buildUrl(model: string, stream: boolean, urlIndex = 0, credentials: any = null) {
    const canonicalModel = normalizeVertexModelId(model);
    const configuredProject = configuredVertexProjectId(credentials);
    const opaqueApiKey = encodeOpaqueApiKey(credentials);
    // Vertex AI Express mode: project-less v1 publisher endpoint with the API key passed as a
    // ?key= query parameter. Express currently exposes Gemini models only; opaque Authorization
    // Keys can use project-scoped APIs when a projectId is configured on the connection.
    if (opaqueApiKey && !configuredProject) {
      return buildExpressGeminiUrl(canonicalModel, stream, opaqueApiKey);
    }
    const project =
      projectIdFromServiceAccount(credentials) || configuredProject || "unknown-project";
    const region = credentials?.providerSpecificData?.region || "us-central1";
    return buildProjectScopedVertexUrl(canonicalModel, stream, project, region, opaqueApiKey);
  }

  buildHeaders(credentials: any, stream = true) {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (credentials.accessToken) {
      headers["Authorization"] = `Bearer ${credentials.accessToken}`;
    }
    // Express-mode keys are carried in the ?key= query parameter (see buildUrl), not a header.
    if (stream) {
      headers["Accept"] = "text/event-stream";
    }
    return headers;
  }
}
