import { CORS_HEADERS } from "@/shared/utils/cors";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { isRequireApiKeyEnabled } from "@/shared/utils/featureFlags";
import { withChatAdmission } from "@/shared/middleware/withChatAdmission";
import {
  countTextTokens,
  tokenizerContextFromBody,
  type TokenizerContext,
} from "@/shared/utils/tiktokenCounter";
import { extractApiKey, isValidApiKey } from "@/sse/services/auth";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";

/**
 * POST /v1/responses/input_tokens — local Responses token count.
 *
 * This static segment deliberately shadows the `[...path]` passthrough route.
 * Forwarding this preflight upstream is never useful and is actively harmful:
 *
 *   - For Codex OAuth the upstream subpath is not served for the account
 *     (`404 {"detail":"Not Found"}` once the request gets through), so the
 *     round trip can only ever fail.
 *   - The same request reaches OpenAI's Cloudflare edge, which answers a
 *     managed challenge (`cf-mitigated: challenge`, HTTP 403). Before the
 *     errorClassifier fix that 403 was terminalized into `banned` /
 *     `isActive:false` and took the whole provider offline; even with the fix
 *     it still burns a request, wastes the latency and forces a combo
 *     fallback on every single preflight.
 *
 * Counting locally removes the upstream call entirely, so no challenge can be
 * triggered from this path. The shape mirrors the OpenAI Responses contract
 * (`object: "response.input_tokens"` plus an `input_tokens` integer), and the
 * counter is the same offline tokenizer `/v1/messages/count_tokens` already
 * falls back to — Codex/`cx` models resolve to `o200k_base` through
 * `tokenizerContextFromBody`.
 *
 * The estimate is deliberately conservative: a client uses this number to
 * decide when to compact, so over-counting is safe (it compacts slightly
 * early) while under-counting risks sending a request past the context
 * window. The public response stays byte-shape compatible with the OpenAI
 * contract: no OmniRoute-only metadata fields are added.
 */

/** Protocol overhead per input item, mirroring Responses message framing. */
const PER_ITEM_OVERHEAD_TOKENS = 4;
/** Fixed Responses framing overhead measured against live Codex usage. */
const BASE_REQUEST_OVERHEAD_TOKENS = 10;
/** Safety margin for tool schemas, whose wire representation can vary by model. */
const SAFETY_MARGIN = 1.05;

export async function OPTIONS() {
  return new Response(null, { headers: CORS_HEADERS });
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function stringify(value: unknown): string {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value) ?? "";
  } catch {
    return "";
  }
}

/**
 * Count one Responses content part. Text-bearing parts are tokenized; image
 * and file parts are not text-estimable from the request alone and are left to
 * the safety margin rather than guessed at.
 */
function countContentPart(part: unknown, ctx: TokenizerContext): number {
  if (typeof part === "string") return countTextTokens(part, ctx);
  const record = asRecord(part);
  if (!record) return 0;

  const type = typeof record.type === "string" ? record.type : "";
  switch (type) {
    case "input_text":
    case "output_text":
    case "summary_text":
    case "text":
      return countTextTokens(stringify(record.text), ctx);
    case "refusal":
      return countTextTokens(stringify(record.refusal), ctx);
    case "input_image":
    case "input_file":
    case "computer_screenshot":
      return 0;
    default:
      // Unknown part types still carry their payload into the prompt.
      return countTextTokens(stringify(record), ctx);
  }
}

/** Count one item of the `input` array (message, tool call, tool output, …). */
function countInputItem(item: unknown, ctx: TokenizerContext): number {
  if (typeof item === "string") return countTextTokens(item, ctx);
  const record = asRecord(item);
  if (!record) return 0;

  let tokens = PER_ITEM_OVERHEAD_TOKENS;
  if (typeof record.role === "string") tokens += countTextTokens(record.role, ctx);

  const content = record.content;
  if (typeof content === "string") {
    tokens += countTextTokens(content, ctx);
  } else if (Array.isArray(content)) {
    for (const part of content) tokens += countContentPart(part, ctx);
  }

  // Function/tool call items carry their payload outside `content`.
  for (const key of ["name", "arguments", "output", "call_id", "text", "summary"]) {
    const value = record[key];
    if (value !== undefined && value !== null && key !== "content") {
      tokens += countTextTokens(stringify(value), ctx);
    }
  }
  return tokens;
}

/** Tool definitions are serialized into the prompt and must be counted. */
function countTools(tools: unknown, ctx: TokenizerContext): number {
  if (!Array.isArray(tools)) return 0;
  let tokens = 0;
  for (const tool of tools)
    tokens += PER_ITEM_OVERHEAD_TOKENS + countTextTokens(stringify(tool), ctx);
  return tokens;
}

async function postHandler(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: { message: "Invalid JSON body", type: "invalid_request_error" } }, 400);
  }

  const record = asRecord(body);
  if (!record) {
    return json(
      { error: { message: "Request body must be a JSON object", type: "invalid_request_error" } },
      400
    );
  }

  // Preserve the same API-key and model-policy boundary as the catch-all
  // Responses route this static route shadows. Token counting is local, but it
  // must not turn into an unauthenticated model-catalog/policy side channel.
  const apiKey = extractApiKey(request);
  if (isRequireApiKeyEnabled() && !apiKey) {
    return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Authentication required");
  }
  if (isRequireApiKeyEnabled() && apiKey && !(await isValidApiKey(apiKey))) {
    return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Invalid API key");
  }

  const model = typeof record.model === "string" ? record.model : "";
  const policy = await enforceApiKeyPolicy(request, model);
  if (policy.rejection) return policy.rejection;

  const ctx = tokenizerContextFromBody(record);
  let tokens = 0;

  if (typeof record.instructions === "string") {
    tokens += countTextTokens(record.instructions, ctx);
  }

  const input = record.input;
  if (typeof input === "string") {
    tokens += countTextTokens(input, ctx);
  } else if (Array.isArray(input)) {
    for (const item of input) tokens += countInputItem(item, ctx);
  }

  const hasTools = Array.isArray(record.tools) && record.tools.length > 0;
  tokens += countTools(record.tools, ctx);

  if (record.tool_choice !== undefined && typeof record.tool_choice !== "string") {
    tokens += countTextTokens(stringify(record.tool_choice), ctx);
  }
  if (record.text !== undefined) tokens += countTextTokens(stringify(record.text), ctx);
  if (record.reasoning !== undefined) tokens += countTextTokens(stringify(record.reasoning), ctx);

  // Live A/B against Codex `usage.input_tokens` showed a stable ~9–10 token
  // request-envelope overhead for requests without tools (short text through
  // long/code inputs). Tool definitions already carry their own framing in
  // `countTools`, so retain the percentage margin there rather than stacking
  // the fixed base and systematically over-counting every tool request.
  const inputTokens =
    tokens === 0
      ? 0
      : hasTools
        ? Math.ceil(tokens * SAFETY_MARGIN)
        : tokens + BASE_REQUEST_OVERHEAD_TOKENS;

  return json({
    object: "response.input_tokens",
    input_tokens: inputTokens,
  });
}

// Preserve the same process-wide body-size / fairness admission boundary as
// the catch-all Responses route this static segment shadows.
export const POST = withChatAdmission(postHandler);
