import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";

const INNER_AI_CHAT_URL = "https://chatapi.innerai.com/chat";
const INNER_AI_PROFILE_URL = "https://platformapi.innerai.com/api/v1/users/profile";
const INNER_AI_MODELS_URL = "https://platformapi.innerai.com/api/v1/ai_models";

const INNER_AI_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const MODELS_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

// ── Types ─────────────────────────────────────────────────────────────────────

interface InnerAiModel {
  id: string; // UUID from platformapi
  llm_model: string;
  name?: string;
  enable?: boolean;
  visible?: boolean;
  unavailable_api?: boolean;
  pro_only?: boolean;
  ultra_only?: boolean;
}

interface CredentialCache {
  email: string;
  deviceId: string;
}

// ── In-memory caches ──────────────────────────────────────────────────────────

// Keyed by first 32 chars of the token JWT
const credentialCache = new Map<string, CredentialCache>();
const modelsCache = new Map<string, { models: InnerAiModel[]; expiresAt: number }>();

function tokenCacheKey(token: string): string {
  return token.slice(0, 32);
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Decode JWT payload without verifying signature. */
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

/** Parse the credential string.
 *
 * Accepted formats:
 *   "eyJhbG..." — token only (no email, chat will try without USER-EMAIL)
 *   "eyJhbG... user@example.com" — token + email (recommended)
 *   "token=eyJhbG... user@example.com" — same with token= prefix
 */
function parseCredential(rawApiKey: string): { token: string; credEmail: string } {
  const trimmed = rawApiKey.trim();
  // Strip "token=<value>" prefix if present
  const eqIdx = trimmed.indexOf("=");
  const stripped =
    eqIdx > 0 && !trimmed.startsWith("eyJ") ? trimmed.slice(eqIdx + 1).trim() : trimmed;

  // Split by the LAST space; if the last part looks like an email it's the credential email
  const lastSpace = stripped.lastIndexOf(" ");
  if (lastSpace > 0) {
    const possibleEmail = stripped.slice(lastSpace + 1).trim();
    if (possibleEmail.includes("@")) {
      return { token: stripped.slice(0, lastSpace).trim(), credEmail: possibleEmail };
    }
  }
  return { token: stripped, credEmail: "" };
}

function makeErrorResult(status: number, message: string, body: unknown) {
  return {
    response: new Response(
      JSON.stringify({
        error: {
          message: sanitizeErrorMessage(message),
          type: "upstream_error",
          code: `HTTP_${status}`,
        },
      }),
      { status, headers: { "Content-Type": "application/json" } }
    ),
    url: INNER_AI_CHAT_URL,
    headers: {} as Record<string, string>,
    transformedBody: body,
  };
}

/** Build request headers for Inner.ai API calls. */
function buildHeaders(token: string, email: string, deviceId: string): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent": INNER_AI_USER_AGENT,
    // Cookie-based auth — the token cookie is scoped to .innerai.com so all
    // *.innerai.com subdomains expect it via Cookie header.
    Cookie: `token=${token}`,
    "USER-TOKEN": token,
    "DEVICE-ID": deviceId,
    Origin: "https://app.innerai.com",
    Referer: "https://app.innerai.com/",
  };
  if (email) headers["USER-EMAIL"] = email;
  return headers;
}

// ── Credential resolution (email + deviceId from JWT + profile API) ───────────

async function resolveCredentials(
  token: string,
  credEmail: string,
  signal?: AbortSignal | null
): Promise<CredentialCache> {
  const key = tokenCacheKey(token);
  const cached = credentialCache.get(key);
  if (cached) return cached;

  // Decode device_id from JWT payload (accept multiple field names)
  const payload = decodeJwtPayload(token);
  const deviceId = String(
    payload?.device_id ?? payload?.deviceId ?? payload?.["device-id"] ?? payload?.did ?? ""
  ).trim();

  // Build profile request headers — include cookie auth + custom headers
  const profileHeaders: Record<string, string> = {
    Cookie: `token=${token}`,
    "USER-TOKEN": token,
    "User-Agent": INNER_AI_USER_AGENT,
    Origin: "https://app.innerai.com",
    Referer: "https://app.innerai.com/",
  };
  if (deviceId) profileHeaders["DEVICE-ID"] = deviceId;

  // Attempt to fetch email from profile API — non-fatal if it fails
  let email = "";
  try {
    const profileResp = await fetch(INNER_AI_PROFILE_URL, {
      headers: profileHeaders,
      signal: signal ?? undefined,
    });

    if (profileResp.ok) {
      const body = await profileResp.json().catch(() => null);
      const b = body as Record<string, unknown> | null;
      email = String(
        (b?.data as Record<string, unknown>)?.email ??
          (b?.user as Record<string, unknown>)?.email ??
          (b?.profile as Record<string, unknown>)?.email ??
          b?.email ??
          ""
      ).trim();
    }
  } catch {
    // Profile fetch failed — proceed without email
  }

  // Fallback 1: use the email provided directly in the credential string
  if (!email && credEmail) email = credEmail;

  // Fallback 2: extract email from JWT sub if it looks like one
  if (!email && typeof payload?.sub === "string" && payload.sub.includes("@")) {
    email = payload.sub;
  }

  const creds: CredentialCache = { email, deviceId };
  credentialCache.set(key, creds);
  return creds;
}

// ── Model resolution (dynamic fetch + cache) ──────────────────────────────────

async function resolveModels(
  token: string,
  deviceId: string,
  email: string,
  signal?: AbortSignal | null
): Promise<InnerAiModel[]> {
  const key = tokenCacheKey(token);
  const cached = modelsCache.get(key);
  if (cached && Date.now() < cached.expiresAt) return cached.models;

  const resp = await fetch(INNER_AI_MODELS_URL, {
    headers: buildHeaders(token, email, deviceId),
    signal: signal ?? undefined,
  });

  if (!resp.ok) return [];

  const body = await resp.json().catch(() => null);
  let raw: InnerAiModel[] = [];
  if (Array.isArray(body)) {
    raw = body as InnerAiModel[];
  } else if (Array.isArray((body as Record<string, unknown>)?.data)) {
    raw = (body as Record<string, unknown>).data as InnerAiModel[];
  } else if (Array.isArray((body as Record<string, unknown>)?.ai_models)) {
    raw = (body as Record<string, unknown>).ai_models as InnerAiModel[];
  }

  // Keep only text/chat models that are enabled and available for this account.
  // Prefer the ai_model_categories field; fall back to llm_model heuristic.
  const nonTextPattern =
    /image|video|audio|img|vid|sound|music|voice|tts|stt|track|clip|avatar|cartoon|flux|stable.diff|recraft|ideogram|leonardo|magnific|bria|seedream|luma|kling|pika|veo|wan-|heygen|did-|vidu|pixverse|sora-|gen-[0-9]|playground|gemini-fal|gamma|lyria|clothes|whisper/i;
  const models = raw.filter((m) => {
    if (m.enable === false || m.unavailable_api) return false;
    const cats = Array.isArray((m as Record<string, unknown>).ai_model_categories)
      ? ((m as Record<string, unknown>).ai_model_categories as Array<Record<string, unknown>>)
      : null;
    if (cats && cats.length > 0) {
      return cats.some((c) => String(c.unique_identifier ?? c.name ?? "").toLowerCase() === "text");
    }
    return !nonTextPattern.test(m.llm_model);
  });

  modelsCache.set(key, { models, expiresAt: Date.now() + MODELS_CACHE_TTL_MS });
  return models;
}

/** Find the Inner.ai model entry matching the requested OmniRoute model ID.
 *
 * Matching strategy (first match wins):
 * 1. Exact `llm_model` match
 * 2. Case-insensitive `llm_model` match
 * 3. `llm_model` contains the requested ID
 * 4. Fallback: first model in list
 */
function findModel(models: InnerAiModel[], requestedId: string): InnerAiModel | null {
  if (models.length === 0) return null;
  const lower = requestedId.toLowerCase();
  return (
    models.find((m) => m.llm_model === requestedId) ??
    models.find((m) => m.llm_model.toLowerCase() === lower) ??
    models.find((m) => m.llm_model.toLowerCase().includes(lower)) ??
    models[0]
  );
}

// ── Message building ───────────────────────────────────────────────────────────

/** Convert an OpenAI messages array to Inner.ai's single message string.
 *
 * Inner.ai accepts a single `message` field. For multi-turn conversations we
 * include previous turns with labelled prefixes.
 */
function buildMessageContent(messages: Array<Record<string, unknown>>): string {
  const parts: string[] = [];

  for (const msg of messages) {
    const content =
      typeof msg.content === "string"
        ? msg.content
        : Array.isArray(msg.content)
          ? (msg.content as Array<Record<string, unknown>>)
              .filter((c) => c?.type === "text")
              .map((c) => String(c.text ?? ""))
              .join("")
          : "";
    if (!content.trim()) continue;

    if (msg.role === "system") {
      parts.push(`[Instructions]\n${content}`);
    } else if (msg.role === "assistant") {
      parts.push(`[Assistant]\n${content}`);
    } else {
      parts.push(content);
    }
  }

  return parts.join("\n\n");
}

// ── SSE transformation ─────────────────────────────────────────────────────────

/** Transform Inner.ai SSE stream to OpenAI-compatible SSE stream.
 *
 * Inner.ai format: `data: {"type":"text","item":"chunk"}`
 *                  `data: {"type":"end_stream","item":"end"}`
 *
 * Error event types: `missing_credits`, `reached_limit`, `rate_limit_reached`,
 *                    `rate_limit_longer_reached`
 * Ignored event types: `status` (e.g. `code: "provider_timeout_retry"`)
 */
function transformInnerAiSSE(upstream: ReadableStream, model: string): ReadableStream {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const id = `chatcmpl-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const created = Math.floor(Date.now() / 1000);
  let buffer = "";
  let emittedRole = false;

  const chunkEvent = (delta: Record<string, unknown>, finishReason?: string | null) =>
    `data: ${JSON.stringify({
      id,
      object: "chat.completion.chunk",
      created,
      model,
      choices: [{ index: 0, delta, finish_reason: finishReason ?? null }],
    })}\n\n`;

  return new ReadableStream({
    async start(controller) {
      const reader = upstream.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data:")) continue;
            const jsonStr = line.slice(5).trim();
            if (!jsonStr || jsonStr === "[DONE]") continue;

            let data: Record<string, unknown>;
            try {
              data = JSON.parse(jsonStr) as Record<string, unknown>;
            } catch {
              continue;
            }

            const type = String(data.type ?? "");
            const item = String(data.item ?? "");

            if (type === "text") {
              if (!item) continue;
              if (!emittedRole) {
                emittedRole = true;
                controller.enqueue(encoder.encode(chunkEvent({ role: "assistant", content: "" })));
              }
              controller.enqueue(encoder.encode(chunkEvent({ content: item })));
            } else if (type === "end_stream") {
              if (!emittedRole) {
                emittedRole = true;
                controller.enqueue(encoder.encode(chunkEvent({ role: "assistant", content: "" })));
              }
              controller.enqueue(encoder.encode(chunkEvent({}, "stop")));
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              controller.close();
              return;
            } else if (
              type === "missing_credits" ||
              type === "reached_limit" ||
              type === "rate_limit_reached" ||
              type === "rate_limit_longer_reached"
            ) {
              const errorMsg =
                type === "missing_credits"
                  ? "Inner.ai: not enough credits"
                  : type === "reached_limit"
                    ? "Inner.ai: usage limit reached"
                    : "Inner.ai: rate limit reached — try again later";
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({
                    error: { message: errorMsg, type: "rate_limit_error", code: type },
                  })}\n\n`
                )
              );
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              controller.close();
              return;
            }
            // type === "status" (e.g. provider_timeout_retry) → ignore
          }
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err || "Stream error");
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              error: { message: sanitizeErrorMessage(message), type: "upstream_error" },
            })}\n\n`
          )
        );
      }

      // Stream ended without explicit end_stream
      if (!emittedRole) {
        controller.enqueue(encoder.encode(chunkEvent({ role: "assistant", content: "" })));
      }
      controller.enqueue(encoder.encode(chunkEvent({}, "stop")));
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
}

/** Collect Inner.ai SSE stream into a single content string (non-streaming path). */
async function collectContent(upstream: ReadableStream): Promise<string> {
  const decoder = new TextDecoder();
  const reader = upstream.getReader();
  let buffer = "";
  let content = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      const jsonStr = line.slice(5).trim();
      if (!jsonStr || jsonStr === "[DONE]") continue;

      let data: Record<string, unknown>;
      try {
        data = JSON.parse(jsonStr) as Record<string, unknown>;
      } catch {
        continue;
      }

      if (data.type === "text" && typeof data.item === "string") {
        content += data.item;
      }
    }
  }
  return content;
}

// ── Executor ──────────────────────────────────────────────────────────────────

export class InnerAiExecutor extends BaseExecutor {
  async execute(input: ExecuteInput) {
    const { body, credentials, signal, stream: wantStream } = input;
    const bodyObj = (body || {}) as Record<string, unknown>;

    const rawToken = String(credentials?.apiKey ?? "").trim();
    if (!rawToken) {
      return makeErrorResult(
        401,
        "Missing Inner.ai token — paste your token cookie from DevTools → Application → Cookies → .innerai.com",
        body
      );
    }
    const { token, credEmail } = parseCredential(rawToken);

    // Resolve email + deviceId (decoded from JWT + profile API)
    let creds: CredentialCache;
    try {
      creds = await resolveCredentials(token, credEmail, signal);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to authenticate with Inner.ai";
      credentialCache.delete(tokenCacheKey(token));
      return makeErrorResult(401, message, body);
    }
    const { email, deviceId } = creds;

    // Resolve model from Inner.ai models API (dynamic, cached 1h)
    const requestedModel = String(bodyObj.model ?? "").trim() || "gpt-4o";
    let models: InnerAiModel[] = [];
    try {
      models = await resolveModels(token, deviceId, email, signal);
    } catch {
      // Non-fatal: proceed with empty list; synthetic model entry will be used
    }

    const modelEntry: InnerAiModel = findModel(models, requestedModel) ?? {
      id: "",
      llm_model: requestedModel,
    };

    // Build message content from OpenAI messages array
    const rawMessages = Array.isArray(bodyObj.messages) ? bodyObj.messages : [];
    const messages = rawMessages as Array<Record<string, unknown>>;
    const messageContent = buildMessageContent(messages);
    if (!messageContent.trim()) {
      return makeErrorResult(400, "No message content to send", body);
    }

    const innerAiBody = {
      message: messageContent,
      session_id: crypto.randomUUID(),
      context_type: "no_context",
      ai_model: {
        id: modelEntry?.id || undefined,
        llm_model: modelEntry?.llm_model ?? requestedModel,
      },
      is_extension: false,
      env: "production",
      temporary: true,
      use_web_search: false,
      knowledge_list: [],
    };

    const reqHeaders = buildHeaders(token, email, deviceId);

    // POST to Inner.ai chat API
    let upstream: Response;
    try {
      upstream = await fetch(INNER_AI_CHAT_URL, {
        method: "POST",
        headers: reqHeaders,
        body: JSON.stringify(innerAiBody),
        signal: signal ?? undefined,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Request failed";
      return makeErrorResult(
        502,
        `Inner.ai request failed: ${sanitizeErrorMessage(message)}`,
        body
      );
    }

    if (upstream.status === 401 || upstream.status === 403) {
      credentialCache.delete(tokenCacheKey(token));
      return makeErrorResult(
        upstream.status,
        "Inner.ai authentication failed — re-paste your token cookie",
        body
      );
    }

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => "");
      return makeErrorResult(
        upstream.status,
        `Inner.ai returned HTTP ${upstream.status}: ${sanitizeErrorMessage(errText)}`,
        body
      );
    }

    if (!upstream.body) {
      return makeErrorResult(502, "Inner.ai returned an empty response", body);
    }

    const resolvedModel = modelEntry?.llm_model ?? requestedModel;

    if (wantStream !== false) {
      return {
        response: new Response(transformInnerAiSSE(upstream.body, resolvedModel), {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        }),
        url: INNER_AI_CHAT_URL,
        headers: reqHeaders,
        transformedBody: innerAiBody,
      };
    }

    // Non-streaming: collect content and return as JSON
    const content = await collectContent(upstream.body);
    const completionId = `chatcmpl-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    return {
      response: new Response(
        JSON.stringify({
          id: completionId,
          object: "chat.completion",
          created: Math.floor(Date.now() / 1000),
          model: resolvedModel,
          choices: [
            {
              index: 0,
              message: { role: "assistant", content },
              finish_reason: "stop",
            },
          ],
          usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
        }),
        { headers: { "Content-Type": "application/json" } }
      ),
      url: INNER_AI_CHAT_URL,
      headers: reqHeaders,
      transformedBody: innerAiBody,
    };
  }
}
