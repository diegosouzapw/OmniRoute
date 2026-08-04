/**
 * POST /api/playground/improve-prompt
 *
 * Improves a user-supplied system prompt and/or user prompt by calling
 * /v1/chat/completions internally with a meta-prompt (D8 — uses the model
 * chosen by the user, never forces a cheap model).
 *
 * Request:  ImprovePromptRequestSchema  { system?, prompt?, model, tone? }
 * Response: { improvedSystem?, improvedPrompt?, tokensIn, tokensOut }
 *
 * Auth: optional (mirrors /v1/web/fetch pattern — required only when
 *       REQUIRE_API_KEY=true; always validated when supplied).
 *
 * Hard Rule #12: ALL error paths route through buildErrorBody.
 */

import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { extractApiKey, isValidApiKey } from "@/sse/services/auth";
import {
  ImprovePromptRequestSchema,
  buildImproveChatBody,
  parseImprovedContent,
} from "@/lib/playground/promptImprover";
import { isRequireApiKeyEnabled } from "@/shared/utils/featureFlags";

const CORS_HEADERS = {
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

function errorResp(status: number, message: string, upstreamDetails?: unknown): Response {
  return new Response(
    JSON.stringify(buildErrorBody(status, sanitizeErrorMessage(message), upstreamDetails)),
    {
      status,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    }
  );
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, { headers: CORS_HEADERS });
}

export async function POST(request: Request): Promise<Response> {
  // 1. Parse JSON body
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return errorResp(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  // 2. Validate via Zod (Hard Rule #7)
  const parsed = ImprovePromptRequestSchema.safeParse(rawBody);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    const message = firstIssue
      ? `${firstIssue.path.join(".") || "body"}: ${firstIssue.message}`
      : "Invalid request body";
    return errorResp(HTTP_STATUS.BAD_REQUEST, message);
  }
  const body = parsed.data;

  // 3. Optional auth (mirrors /v1/web/fetch pattern)
  const apiKeyRaw = extractApiKey(request);
  if (isRequireApiKeyEnabled() && !apiKeyRaw) {
    return errorResp(HTTP_STATUS.UNAUTHORIZED, "Authentication required");
  }
  if (apiKeyRaw && !(await isValidApiKey(apiKeyRaw))) {
    return errorResp(HTTP_STATUS.UNAUTHORIZED, "Invalid API key");
  }

  // 4. Build the meta-prompt chat body
  const chatBody = buildImproveChatBody(body);

  // 5. Call /v1/chat/completions on ourselves (D8)
  const port = process.env.PORT ?? "20128";
  const baseUrl = process.env.OMNIROUTE_BASE_URL ?? `http://127.0.0.1:${port}`;
  const upstreamUrl = `${baseUrl}/v1/chat/completions`;

  let upstreamResponse: Response;
  try {
    upstreamResponse = await fetch(upstreamUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKeyRaw ?? ""}`,
      },
      body: JSON.stringify(chatBody),
    });
  } catch (err: unknown) {
    const safeMsg = sanitizeErrorMessage(
      err instanceof Error ? err.message : "Failed to reach upstream"
    );
    return errorResp(HTTP_STATUS.SERVER_ERROR, `Improve-prompt failed: ${safeMsg}`);
  }

  if (!upstreamResponse.ok) {
    let upstreamText = "";
    try {
      upstreamText = await upstreamResponse.text();
    } catch {
      // ignore
    }
    return errorResp(
      upstreamResponse.status >= 400 && upstreamResponse.status < 600
        ? upstreamResponse.status
        : HTTP_STATUS.BAD_GATEWAY,
      "Improve-prompt upstream request failed",
      sanitizeErrorMessage(upstreamText)
    );
  }

  // 6. Parse response
  let data: {
    choices?: Array<{ message?: { content?: string | null } }>;
    usage?: { prompt_tokens?: number; completion_tokens?: number };
  };
  try {
    data = (await upstreamResponse.json()) as typeof data;
  } catch {
    return errorResp(HTTP_STATUS.BAD_GATEWAY, "Invalid JSON from upstream improve-prompt call");
  }

  const content = data.choices?.[0]?.message?.content;
  if (typeof content !== "string") {
    return errorResp(HTTP_STATUS.BAD_GATEWAY, "Empty or missing content from upstream");
  }

  // 7. Parse improved content back into system/prompt parts
  const hadSystem = Boolean(body.system?.trim());
  const hadPrompt = Boolean(body.prompt?.trim());
  const improved = parseImprovedContent(content, hadSystem, hadPrompt);

  const tokensIn = data.usage?.prompt_tokens ?? 0;
  const tokensOut = data.usage?.completion_tokens ?? 0;

  return new Response(
    JSON.stringify({
      ...improved,
      tokensIn,
      tokensOut,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    }
  );
}
