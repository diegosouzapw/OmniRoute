import { CORS_HEADERS } from "../utils/cors.ts";
/**
 * Responses API Handler for Workers
 * Converts Chat Completions to Codex Responses API format
 */

import { handleChatCore } from "./chatCore.ts";
import { convertResponsesApiFormat } from "../translator/helpers/responsesApiHelper.ts";
import { createResponsesApiTransformStream } from "../transformer/responsesTransformer.ts";
import { createSseHeartbeatTransform } from "../utils/sseHeartbeat.ts";

/**
 * Handle /v1/responses request
 * @param {object} options
 * @param {object} options.body - Request body (Responses API format)
 * @param {object} options.modelInfo - { provider, model }
 * @param {object} options.credentials - Provider credentials
 * @param {object} options.log - Logger instance (optional)
 * @param {function} options.onCredentialsRefreshed - Callback when credentials are refreshed
 * @param {function} options.onRequestSuccess - Callback when request succeeds
 * @param {function} options.onDisconnect - Callback when client disconnects
 * @param {string} options.connectionId - Connection ID for usage tracking
 * @param {AbortSignal} [options.signal] - Abort signal for request/disconnect cleanup
 * @returns {Promise<{success: boolean, response?: Response, status?: number, error?: string}>}
 */
export async function handleResponsesCore({
  body,
  modelInfo,
  credentials,
  log,
  onCredentialsRefreshed,
  onRequestSuccess,
  onDisconnect,
  connectionId,
  signal,
}) {
  // Convert Responses API format to Chat Completions format
  const convertedBody = convertResponsesApiFormat(body, credentials);

  // Ensure stream is enabled
  convertedBody.stream = true;

  // Call chat core handler
  const result = await handleChatCore({
    body: convertedBody,
    modelInfo,
    credentials,
    log,
    onCredentialsRefreshed,
    onRequestSuccess,
    onDisconnect,
    clientRawRequest: null,
    connectionId,
    userAgent: null,
    comboName: null,
  });

  if (!result.success || !result.response) {
    return result;
  }

  const response = result.response;
  const contentType = response.headers.get("Content-Type") || "";

  // If not SSE or error, return as-is
  if (!contentType.includes("text/event-stream") || response.status !== 200) {
    return result;
  }

  // Transform SSE stream to Responses API format (no logging in worker)
  const transformStream = createResponsesApiTransformStream(null);
  const transformedBody = response.body
    .pipeThrough(transformStream)
    .pipeThrough(createSseHeartbeatTransform({ signal }));

  return {
    success: true,
    response: new Response(transformedBody, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    }),
  };
}
