import { createHash, randomUUID } from "node:crypto";
import { CodeBuddyBaseExecutor, NEUTRAL_PROMPT } from "./codebuddy/shared.ts";
import type { ProviderCredentials } from "./base.ts";

/**
 * Deterministic RFC-4122-v5-shaped UUID derived from a session key, mirroring
 * the official client's per-conversation id (uuid5 over the session key).
 */
export function stableUuidFrom(key: string): string {
  const hash = createHash("sha1").update(key).digest("hex");
  const timeHigh = ((parseInt(hash.slice(12, 16), 16) & 0x0fff) | 0x5000)
    .toString(16)
    .padStart(4, "0");
  const clockSeq = ((parseInt(hash.slice(16, 20), 16) & 0x3fff) | 0x8000)
    .toString(16)
    .padStart(4, "0");
  return [
    hash.slice(0, 8),
    hash.slice(8, 12),
    timeHigh,
    clockSeq,
    hash.slice(20, 32),
  ].join("-");
}

function readHeader(headers: Record<string, string> | Headers | unknown, name: string): string {
  if (typeof (headers as Headers)?.get === "function") {
    const value = (headers as Headers).get(name);
    return typeof value === "string" ? value.trim() : "";
  }
  if (!headers || typeof headers !== "object") return "";
  const obj = headers as Record<string, string>;
  const key = Object.keys(obj).find((k) => k.toLowerCase() === name.toLowerCase());
  const value = key ? obj[key] : undefined;
  return typeof value === "string" ? value.trim() : "";
}

function writeHeader(
  headers: Record<string, string> | Headers | unknown,
  name: string,
  value: string
): void {
  if (typeof (headers as Headers)?.set === "function") {
    (headers as Headers).set(name, value);
    return;
  }
  if (!headers || typeof headers !== "object") return;
  const obj = headers as Record<string, string>;
  const key = Object.keys(obj).find((k) => k.toLowerCase() === name.toLowerCase());
  obj[key || name] = value;
}

/**
 * Attach the conversation-correlation family the gateway's channel verification
 * demands (HTTP 400 code 11128 "conversation id missing" without it). Values
 * that already exist and are non-empty are preserved, so a caller tracking its
 * own conversation keeps it; blank values count as absent.
 *
 * All three of `X-Conversation-ID`, `X-Conversation-Request-ID` and
 * `X-Conversation-Message-ID` are required — verified A/B against the live
 * gateway, where any two of them are still answered 11128. `X-Request-ID` is
 * NOT part of the requirement; it is mirrored from the message id because the
 * official client sends it.
 */
export function withConversationHeaders<T extends Record<string, string> | Headers>(
  headers: T,
  body: unknown = null
): T {
  const b = body && typeof body === "object" ? (body as Record<string, unknown>) : null;
  const sessionKey =
    (typeof b?.session_id === "string" && b.session_id) ||
    (typeof b?.prompt_cache_key === "string" && b.prompt_cache_key) ||
    (typeof b?.conversation_id === "string" && b.conversation_id) ||
    null;

  const messages = Array.isArray(b?.messages) ? (b?.messages as Array<Record<string, unknown>>) : null;
  const firstUser = messages ? messages.find((m) => m?.role === "user") : null;
  const userText =
    typeof firstUser?.content === "string"
      ? firstUser.content
      : Array.isArray(firstUser?.content)
        ? (firstUser.content as Array<Record<string, unknown>>)
            .map((part) => (part && typeof part.text === "string" ? part.text : ""))
            .join("\n")
        : "";
  const conversationKey = sessionKey || (userText ? `cbai:${userText}` : null);

  if (!readHeader(headers, "X-Conversation-ID")) {
    writeHeader(
      headers,
      "X-Conversation-ID",
      conversationKey ? stableUuidFrom(conversationKey) : randomUUID()
    );
  }
  if (!readHeader(headers, "X-Conversation-Request-ID")) {
    writeHeader(headers, "X-Conversation-Request-ID", randomUUID());
  }

  const messageId =
    readHeader(headers, "X-Conversation-Message-ID") ||
    readHeader(headers, "X-Request-ID") ||
    randomUUID();
  if (!readHeader(headers, "X-Conversation-Message-ID")) {
    writeHeader(headers, "X-Conversation-Message-ID", messageId);
  }
  if (!readHeader(headers, "X-Request-ID")) {
    writeHeader(headers, "X-Request-ID", messageId);
  }

  return headers;
}

/**
 * CodeBuddyIntlExecutor — talks to https://www.codebuddy.ai/v2/chat/completions
 *
 * CodeBuddy International gateway strictly requires:
 * 1. The first message in the request to be a system prompt (rejects with 400
 *    "first message is not system prompt" otherwise).
 * 2. Channel verification: the `X-Conversation-*` header family that the
 *    official IDE sends (HTTP 400 code 11128 "conversation id missing" without it).
 */
export class CodeBuddyIntlExecutor extends CodeBuddyBaseExecutor {
  constructor(providerId: string = "codebuddy-intl") {
    super(providerId);
  }

  buildHeaders(
    credentials: ProviderCredentials,
    stream: boolean = true,
    clientHeaders?: Record<string, string> | null,
    model?: string | null,
    _health?: unknown,
    body?: unknown
  ): Record<string, string> {
    const headers = super.buildHeaders(credentials, stream, clientHeaders, model, _health, body);
    try {
      return withConversationHeaders(headers, body);
    } catch (error) {
      const err = error as Error | undefined;
      throw new Error(
        `CodeBuddy channel verification: could not attach the X-Conversation-* family ` +
          `(${err?.message || error}). The intl gateway rejects any request without it ` +
          `(HTTP 400 code 11128 "conversation id missing"), so this request cannot succeed.`
      );
    }
  }

  transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: ProviderCredentials
  ): unknown {
    const transformed = super.transformRequest(model, body, stream, credentials);
    if (!transformed || typeof transformed !== "object" || Array.isArray(transformed)) {
      return transformed;
    }
    const out = transformed as Record<string, unknown>;

    if (Array.isArray(out.messages)) {
      const first = out.messages[0] as Record<string, unknown> | undefined;
      if (!first || first.role !== "system") {
        out.messages = [{ role: "system", content: NEUTRAL_PROMPT }, ...out.messages];
      }
    }

    return out;
  }

  parseError(
    response: Response,
    bodyText: string
  ): { status: number; message: string; resetsAtMs?: number } {
    if (bodyText) {
      try {
        const data = JSON.parse(bodyText);
        const msg = String(data?.msg || data?.message || "");

        // Code 11128 is overloaded: it also carries "first message is not system
        // prompt" (a body-shape problem fixed in transformRequest). Only the
        // conversation-id variant is channel verification, so branch on the
        // message, never on the code alone.
        if (data?.code === 11128 && /conversation id missing/i.test(msg)) {
          const tip = data?.displayTips?.en || data?.displayMsg?.en || "";
          return {
            status: 400,
            message:
              'CodeBuddy channel verification failed (11128 "conversation id missing"): ' +
              "the upstream gateway requires the X-Conversation-* header family the official " +
              "IDE sends, supplied by CodeBuddyIntlExecutor.buildHeaders(). If this appears, " +
              "the gate likely changed (e.g. a new required header)." +
              (tip ? ` Upstream said: ${tip}` : ""),
          };
        }
      } catch {}
    }
    return super.parseError(response, bodyText);
  }
}
