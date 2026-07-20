import { CORS_HEADERS } from "../utils/cors.ts";
/**
 * Responses API Handler for Workers
 * Converts Chat Completions to Codex Responses API format
 */

import { handleChatCore } from "./chatCore.ts";
import { convertResponsesApiFormat } from "../translator/helpers/responsesApiHelper.ts";
import { collectResponsesTools } from "../translator/request/openai-responses/additionalTools.ts";
import { createResponsesApiTransformStream } from "../transformer/responsesTransformer.ts";
import { createSseHeartbeatTransform, HEARTBEAT_SHAPES } from "../utils/sseHeartbeat.ts";
import { SSE_HEARTBEAT_INTERVAL_MS } from "../config/constants.ts";

function collectCustomToolNames(
  tools: unknown[],
  customToolNames: Set<string>,
  blockedNames = new Set<string>()
) {
  for (const toolValue of tools) {
    if (!toolValue || typeof toolValue !== "object" || Array.isArray(toolValue)) continue;
    const tool = toolValue as Record<string, unknown>;

    if (tool.type === "custom" && typeof tool.name === "string" && !blockedNames.has(tool.name)) {
      const name = tool.name.trim();
      if (name) customToolNames.add(name);
    }

    if (tool.type === "namespace" && Array.isArray(tool.tools)) {
      collectCustomToolNames(tool.tools, customToolNames, blockedNames);
    }
  }
}

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
  const inputItems = Array.isArray(body?.input) ? body.input : [];
  const rootTools = Array.isArray(body?.tools) ? body.tools : [];
  const topLevelToolNames = new Set(
    rootTools
      .filter((tool) => tool?.type !== "namespace" && typeof tool?.name === "string")
      .map((tool) => tool.name.trim())
      .filter(Boolean)
  );
  const customToolNames = new Set<string>();
  collectCustomToolNames(
    collectResponsesTools(body?.tools, inputItems),
    customToolNames,
    topLevelToolNames
  );

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
  const transformStream = createResponsesApiTransformStream(null, undefined, { customToolNames });
  const transformedBody = response.body.pipeThrough(transformStream).pipeThrough(
    createSseHeartbeatTransform({
      signal,
      intervalMs: SSE_HEARTBEAT_INTERVAL_MS,
      shape: HEARTBEAT_SHAPES.OPENAI_RESPONSES_IN_PROGRESS,
    })
  );

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
