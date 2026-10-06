/**
 * Convert OpenAI Responses API format to standard chat completions format.
 * Delegates to the canonical translator to avoid logic duplication.
 */
import { requiresReasoningReplay } from "../../services/reasoningCache.ts";
import { requiresAuthenticReasoningContent } from "../../utils/reasoningContentInjector.ts";
import { openaiResponsesToOpenAIRequest } from "../request/openai-responses.ts";
import { toRecord } from "../request/openai-responses/helpers.ts";

export function convertResponsesApiFormat(
  body: Record<string, unknown>,
  credentials: unknown = null,
  provider: unknown = null,
  model: unknown = null
): Record<string, unknown> {
  const bodyModel = toRecord(body).model;
  const requestedModel =
    typeof bodyModel === "string" && bodyModel.trim().length > 0
      ? bodyModel.includes("/") || typeof provider !== "string" || provider.length === 0
        ? bodyModel
        : `${provider}/${bodyModel}`
      : provider;
  const credentialRecord =
    credentials && typeof credentials === "object" && !Array.isArray(credentials)
      ? (credentials as Record<string, unknown>)
      : {};
  const translationCredentials =
    requiresAuthenticReasoningContent(provider, model) ||
    requiresReasoningReplay({
      provider: String(provider ?? ""),
      model: String(model ?? ""),
      allowLegacyFallback: false,
    })
      ? { ...credentialRecord, _preserveReasoningContent: true }
      : credentials;
  const converted = openaiResponsesToOpenAIRequest(
    requestedModel,
    body,
    null,
    translationCredentials
  );
  if (!converted || typeof converted !== "object" || Array.isArray(converted)) {
    throw new TypeError("Responses request conversion must produce an object");
  }
  return converted as Record<string, unknown>;
}
