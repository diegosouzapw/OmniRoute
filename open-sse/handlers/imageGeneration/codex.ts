
/**
 * Image Generation Handler
 *
 * Handles POST /v1/images/generations requests.
 * Proxies to upstream image generation providers using OpenAI-compatible format.
 *
 * Request format (OpenAI-compatible):
 * {
 *   "model": "openai/gpt-image-2",
 *   "prompt": "a beautiful sunset over mountains",
 *   "n": 1,
 *   "size": "1024x1024",
 *   "quality": "standard",       // optional: "standard" | "hd"
 *   "response_format": "url"     // optional: "url" | "b64_json"
 * }
 */

import { getImageProvider, parseImageModel } from "../../config/imageRegistry.ts";

import { mapImageSize } from "../../translator/image/sizeMapper.ts";

import { getCodexClientVersion, getCodexUserAgent } from "../../config/codexClient.ts";

import { ChatGptWebExecutor } from "../../executors/chatgpt-web.ts";

import { sanitizeErrorMessage, sanitizeUpstreamDetails } from "../../utils/error.ts";

import { saveImageErrorResult, saveImageSuccessResult } from "./logging.ts";
import { mapLegacyImageQualityToImageTool, extractImageGenerationCalls } from "./utils.ts";



export async function handleCodexImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const prompt = typeof body.prompt === "string" ? body.prompt : "";
  if (!prompt.trim()) {
    return saveImageErrorResult({
      provider,
      model,
      status: 400,
      startTime,
      error: "Prompt is required for Codex image generation",
    });
  }

  const requestedCount =
    Number.isInteger(body.n) && (body.n as number) > 0 ? (body.n as number) : 1;
  if (log && requestedCount > 1) {
    log.warn(
      "IMAGE",
      `Codex hosted image_generation returns one image per call; requested n=${requestedCount} will fan out in parallel`
    );
  }

  const token = credentials?.accessToken || credentials?.apiKey;
  if (!token) {
    return saveImageErrorResult({
      provider,
      model,
      status: 401,
      startTime,
      error: "Codex credentials missing accessToken — reconnect the Codex provider",
    });
  }

  const workspaceId =
    credentials?.providerSpecificData &&
    typeof credentials.providerSpecificData === "object" &&
    !Array.isArray(credentials.providerSpecificData)
      ? (credentials.providerSpecificData as Record<string, unknown>).workspaceId
      : undefined;

  // Forward size/quality from the GPT-Image-style body into the hosted tool so
  // OpenWebUI's size/quality selectors actually take effect. Everything else
  // (model, n, background, moderation, output_compression) is left to the
  // Codex backend's defaults — today that's `gpt-image-2`.
  const toolConfig: Record<string, unknown> = { type: "image_generation", output_format: "png" };
  if (typeof body.size === "string" && body.size.trim()) {
    toolConfig.size = body.size.trim();
  }
  if (typeof body.quality === "string" && body.quality.trim()) {
    toolConfig.quality = mapLegacyImageQualityToImageTool(body.quality.trim());
  }

  const upstreamBody: Record<string, unknown> = {
    model,
    instructions:
      "You must call the image_generation tool exactly once to fulfill the user's request. Do not add narration.",
    input: [
      {
        role: "user",
        content: [{ type: "input_text", text: prompt }],
      },
    ],
    tools: [toolConfig],
    stream: true,
    store: false,
  };

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "text/event-stream",
    Authorization: `Bearer ${token}`,
    Version: getCodexClientVersion(),
    "User-Agent": getCodexUserAgent(),
    originator: "codex_cli_rs",
  };
  if (typeof workspaceId === "string" && workspaceId) {
    headers["chatgpt-account-id"] = workspaceId;
    headers["session_id"] = workspaceId;
  }

  if (log) {
    log.info(
      "IMAGE",
      `${provider}/${model} (codex-responses) | prompt: "${prompt.slice(0, 60)}..."`
    );
  }

  const fetchOneImage = async () => {
    try {
      const response = await fetch(providerConfig.baseUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(upstreamBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (log)
          log.error("IMAGE", `${provider} error ${response.status}: ${errorText.slice(0, 200)}`);
        return {
          ok: false as const,
          error: {
            provider,
            model,
            status: response.status,
            startTime,
            error: errorText,
            requestBody: upstreamBody,
          },
        };
      }

      const rawSSE = await response.text();
      const items = extractImageGenerationCalls(rawSSE);
      if (items.length === 0) {
        return {
          ok: false as const,
          error: {
            provider,
            model,
            status: 502,
            startTime,
            error:
              "Codex completed without producing an image_generation_call — the model may have declined the tool",
            requestBody: upstreamBody,
          },
        };
      }

      return { ok: true as const, items };
    } catch (err) {
      if (log) log.error("IMAGE", `${provider} fetch error: ${(err as Error).message}`);
      return {
        ok: false as const,
        error: {
          provider,
          model,
          status: 502,
          startTime,
          error: `Image provider error: ${(err as Error).message}`,
          requestBody: upstreamBody,
        },
      };
    }
  };

  const imageResults = await Promise.all(
    Array.from({ length: requestedCount }, () => fetchOneImage())
  );

  const collected: Array<{ b64_json: string; revised_prompt?: string }> = [];
  for (const imageResult of imageResults) {
    if (!imageResult.ok) return saveImageErrorResult(imageResult.error);
    for (const item of imageResult.items) {
      collected.push({
        b64_json: item.b64,
        ...(item.revisedPrompt ? { revised_prompt: item.revisedPrompt } : {}),
      });
    }
  }

  const wantsUrl = body.response_format !== "b64_json";
  const data = wantsUrl
    ? collected.map((item) => ({
        url: `data:image/png;base64,${item.b64_json}`,
        ...(item.revised_prompt ? { revised_prompt: item.revised_prompt } : {}),
      }))
    : collected;

  return saveImageSuccessResult({
    provider,
    model,
    startTime,
    requestBody: upstreamBody,
    responseBody: { images_count: data.length },
    images: data,
  });
}

