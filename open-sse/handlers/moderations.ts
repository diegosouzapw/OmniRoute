/**
 * Moderation Handler
 *
 * Handles POST /v1/moderations (OpenAI Moderations API format).
 */

import { getModerationProvider, parseModerationModel } from "../config/moderationRegistry.js";
import { errorResponse } from "../utils/error.js";

/**
 * Handle moderation request
 *
 * @param {Object} options
 * @param {Object} options.body - JSON body { model, input }
 * @param {Object} options.credentials - Provider credentials { apiKey }
 * @returns {Response}
 */
/** @returns {Promise<any>} */
export async function handleModeration({ body, credentials }) {
  if (!body.input) {
    return errorResponse(400, "input is required");
  }

  // Default to latest moderation model
  const model = body.model || "omni-moderation-latest";
  const { provider: providerId, model: modelId } = parseModerationModel(model);
  const providerConfig = providerId ? getModerationProvider(providerId) : null;

  if (!providerConfig) {
    return errorResponse(
      400,
      `No moderation provider found for model "${model}". Available: openai`
    );
  }

  const token = credentials?.apiKey || credentials?.accessToken;
  if (!token) {
    return errorResponse(401, `No credentials for moderation provider: ${providerId}`);
  }

  try {
    const res = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        model: modelId,
        input: body.input,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return new Response(errText, {
        status: res.status,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const data = await res.json();
    return Response.json(data, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (err) {
    return errorResponse(500, `Moderation request failed: ${err.message}`);
  }
}
