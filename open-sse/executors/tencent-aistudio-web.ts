/**
 * TencentAIStudioWebExecutor — Tencent AI Studio (aistudio.tencent.ai) Web Cookie Provider
 *
 * Routes chat requests through Tencent AI Studio web session via cookie authentication.
 */

import {
  BaseExecutor,
  mergeAbortSignals,
  type ExecuteInput,
} from "./base.ts";
import { mergeUpstreamExtraHeaders } from "./base/headers.ts";
import { FETCH_TIMEOUT_MS } from "../config/constants.ts";
import { buildErrorBody } from "../utils/error.ts";
import { stripCookieInputPrefix } from "@/lib/providers/webCookieAuth";

const AISTUDIO_BASE = "https://aistudio.tencent.ai";

const MODEL_MAP: Record<string, string> = {
  "hy3-g": "HunyuanDefault",
  "hunyuan-default": "HunyuanDefault",
  "hunyuan-3d": "Hunyuan3D",
};

type ChatBody = {
  model?: string;
  messages?: Array<{ role: string; content: string }>;
};

export class TencentAIStudioWebExecutor extends BaseExecutor {
  constructor() {
    super("tencent-aistudio-web", { id: "tencent-aistudio-web", baseUrl: AISTUDIO_BASE });
  }

  async execute(input: ExecuteInput): Promise<{
    response: Response;
    url: string;
    headers: Record<string, string>;
    transformedBody: unknown;
  }> {
    const { model, body, credentials, signal } = input;
    const targetModelId = model || "hy3-g";
    const chatUrl = `${AISTUDIO_BASE}/api/chat/${MODEL_MAP[targetModelId] || "HunyuanDefault"}`;

    let cookie = credentials.apiKey || "";
    if (!cookie) {
      return {
        response: new Response(
          JSON.stringify(
            buildErrorBody(
              401,
              "Tencent AI Studio Cookie is required. Log in to aistudio.tencent.ai and paste your Cookie header.",
              null,
              { type: "invalid_request_error", code: "missing_cookie" }
            )
          ),
          { status: 401, headers: { "Content-Type": "application/json" } }
        ),
        url: chatUrl,
        headers: {},
        transformedBody: body,
      };
    }
    cookie = stripCookieInputPrefix(cookie);

    const targetModel = MODEL_MAP[targetModelId] || "HunyuanDefault";
    const chatBody = body as ChatBody;
    const messages = chatBody.messages || [];

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Cookie: cookie,
      Origin: AISTUDIO_BASE,
      Referer: `${AISTUDIO_BASE}/`,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    };
    mergeUpstreamExtraHeaders(headers, input.upstreamExtraHeaders);

    const upstreamBody = JSON.stringify({ model: targetModel, messages });

    const controller = new AbortController();
    const primary = signal ?? new AbortController().signal;
    const mergedSignal = mergeAbortSignals(primary, controller.signal);
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    let upstream: Response;
    try {
      upstream = await fetch(chatUrl, {
        method: "POST",
        headers,
        body: upstreamBody,
        signal: mergedSignal,
      });
    } finally {
      clearTimeout(timeout);
    }

    return {
      response: new Response(upstream.body, {
        status: upstream.status,
        statusText: upstream.statusText,
        headers: upstream.headers,
      }),
      url: chatUrl,
      headers,
      transformedBody: upstreamBody,
    };
  }
}

const tencentAIStudioWebExecutor = new TencentAIStudioWebExecutor();
export default tencentAIStudioWebExecutor;
