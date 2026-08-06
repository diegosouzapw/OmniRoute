import type { RegistryEntry } from "../../shared.ts";
import { normalizeBaseUrl } from "../../../../utils/urlSanitize.ts";

// Poe (creator.poe.com) — OpenAI-compatible chat/responses gateway. #8082: the
// built-in `poe` provider (NAMED_OPENAI_STYLE_PROVIDERS, passthroughModels:true)
// had no REGISTRY entry, so model discovery's `getRegistryEntry("poe")?.baseUrl`
// resolved to undefined and every request failed with "No base URL configured
// for provider" even though credentials/inference worked fine. This base URL is
// the single source of truth other Poe code paths should read from (see
// src/lib/providers/validation/audioMiscProviders.ts::validatePoeProvider).
//
// #8969: canonical `poe` is the API-key provider (DefaultExecutor → api.poe.com).
// The web-cookie GraphQL transport lives only on `poe-web` / PoeWebExecutor —
// never alias `poe` to that executor (it posts to /api/gql_POST and returns 405).
export const POE_DEFAULT_BASE_URL = "https://api.poe.com/v1";

export const POE_CHAT_COMPLETIONS_URL = `${POE_DEFAULT_BASE_URL}/chat/completions`;
export const POE_RESPONSES_URL = `${POE_DEFAULT_BASE_URL}/responses`;
export const POE_MESSAGES_URL = `${POE_DEFAULT_BASE_URL}/messages`;

/** Official Claude model ids are the only ones Poe accepts on /v1/messages. */
export function isPoeMessagesEligibleModel(model: string | null | undefined): boolean {
  if (typeof model !== "string" || !model) return false;
  return /(?:^|[\/._-])claude(?:[\/._-]|$)/i.test(model);
}

export type PoeUpstreamProtocol = "chat" | "responses" | "messages";

/**
 * Normalize an operator-supplied or registry Poe base URL onto one of the three
 * documented API surfaces. Accepts bare host, `/v1`, full chat/completions URL,
 * and trailing-slash variants.
 */
export function resolvePoeUpstreamUrl(opts: {
  protocol: PoeUpstreamProtocol;
  configuredBaseUrl?: string | null;
  responsesBaseUrl?: string | null;
  messagesUrl?: string | null;
  defaultChatUrl?: string | null;
}): string {
  const defaultChat = opts.defaultChatUrl || POE_CHAT_COMPLETIONS_URL;
  const defaultResponses = opts.responsesBaseUrl || POE_RESPONSES_URL;
  const defaultMessages = opts.messagesUrl || POE_MESSAGES_URL;

  if (opts.protocol === "responses" && !opts.configuredBaseUrl) {
    return defaultResponses;
  }
  if (opts.protocol === "messages" && !opts.configuredBaseUrl) {
    return defaultMessages;
  }
  if (opts.protocol === "chat" && !opts.configuredBaseUrl) {
    return defaultChat;
  }

  const raw = normalizeBaseUrl(opts.configuredBaseUrl || defaultChat);
  // Strip any known protocol suffix so we can re-append the requested one.
  const root = raw
    .replace(/\/chat\/completions\/?$/i, "")
    .replace(/\/responses\/?$/i, "")
    .replace(/\/messages\/?$/i, "")
    .replace(/\/$/, "");

  const withV1 = /\/v1$/i.test(root) ? root : `${root}/v1`;

  if (opts.protocol === "responses") return `${withV1}/responses`;
  if (opts.protocol === "messages") return `${withV1}/messages`;
  return `${withV1}/chat/completions`;
}

export const poeProvider: RegistryEntry = {
  id: "poe",
  alias: "poe",
  format: "openai",
  executor: "default",
  baseUrl: POE_CHAT_COMPLETIONS_URL,
  responsesBaseUrl: POE_RESPONSES_URL,
  // Anthropic-compatible Messages API — official Claude models only
  // (https://creator.poe.com/docs/external-applications/anthropic-compatible-api).
  // Routed via each claude-* model's targetFormat: "claude" below; GPT/Gemini
  // stay on Chat Completions / Responses.
  messagesUrl: POE_MESSAGES_URL,
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "gpt-5.2", name: "GPT-5.2" },
    {
      id: "claude-opus-4.8",
      name: "Claude Opus 4.8",
      targetFormat: "claude",
    },
    { id: "gemini-3.0-pro", name: "Gemini 3.0 Pro" },
  ],
};
