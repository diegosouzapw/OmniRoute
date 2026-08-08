/**
 * Convert OpenAI Responses API format to standard chat completions format.
 * Delegates to the canonical translator to avoid logic duplication.
 */
import { openaiResponsesToOpenAIRequest } from "../request/openai-responses.ts";
import { toRecord } from "../request/openai-responses/helpers.ts";

export function convertResponsesApiFormat(body, credentials = null, provider = null) {
  const bodyModel = toRecord(body).model;
  const requestedModel =
    typeof bodyModel === "string" && bodyModel.trim().length > 0
      ? bodyModel.includes("/") || typeof provider !== "string" || provider.length === 0
        ? bodyModel
        : `${provider}/${bodyModel}`
      : provider;
  return openaiResponsesToOpenAIRequest(requestedModel, body, null, credentials);
}
