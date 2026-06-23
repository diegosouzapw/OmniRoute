// Auto-extracted from open-sse/handlers/imageGeneration.ts in PR-#4582-batch
// Family: chatgpt-web | Module: chatgptWeb | Lines: 1102-1282 (181 LOC)
// Ref: see open-sse/handlers/imageGeneration.ts top-of-file comment for split rationale

import { ChatGptWebExecutor } from "../../../executors/chatgpt-web.ts";
import { getChatGptImage } from "../../../services/chatgptImageCache.ts";
import { saveImageErrorResult, saveImageSuccessResult } from "../../imageGeneration.ts";

export const CHATGPT_WEB_IMAGE_MARKDOWN_RE = /!\[[^\]]*\]\(([^)\s]+)\)/g;
export const CHATGPT_WEB_IMAGE_ID_RE =
  /\/v1\/chatgpt-web\/image\/([a-f0-9]{16,64})(?=[?\s"'<>)]|$)/i;

export function extractMarkdownImageUrls(text: string): string[] {
  const urls: string[] = [];
  // String.prototype.matchAll consumes a fresh iterator and ignores the
  // regex's lastIndex, so no manual reset is required.
  for (const match of text.matchAll(CHATGPT_WEB_IMAGE_MARKDOWN_RE)) {
    if (match[1]) urls.push(match[1]);
  }
  return urls;
}

export function buildChatGptWebImagePrompt(body): string {
  const prompt = String(body.prompt || "").trim();
  const details: string[] = [`Create an image for this prompt: ${prompt}`];
  if (typeof body.size === "string" && body.size.trim()) {
    details.push(`Requested size: ${body.size.trim()}.`);
  }
  if (typeof body.quality === "string" && body.quality.trim()) {
    details.push(`Requested quality: ${body.quality.trim()}.`);
  }
  if (typeof body.style === "string" && body.style.trim()) {
    details.push(`Requested style: ${body.style.trim()}.`);
  }
  return details.join("\n");
}

export async function handleChatGptWebImageGeneration({
  model,
  provider,
  body,
  credentials,
  log,
  signal,
  clientHeaders,
}) {
  const startTime = Date.now();
  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) {
    return saveImageErrorResult({
      provider,
      model,
      status: 400,
      startTime,
      error: "Prompt is required for ChatGPT Web image generation",
    });
  }

  if (!credentials?.apiKey) {
    return saveImageErrorResult({
      provider,
      model,
      status: 401,
      startTime,
      error: "ChatGPT Web credentials missing session cookie",
    });
  }

  // Each image is one chatgpt.com chat turn (~30s). Cap at 4 (matches OpenAI's
  // own limit for GPT Image models) so a stray n=1000 doesn't pin the
  // executor for hours before the upstream HTTP timeout fires.
  const CHATGPT_WEB_IMAGE_N_MAX = 4;
  const rawCount = Number.isInteger(body.n) && (body.n as number) > 0 ? (body.n as number) : 1;
  if (rawCount > CHATGPT_WEB_IMAGE_N_MAX) {
    return saveImageErrorResult({
      provider,
      model,
      status: 400,
      startTime,
      error: `ChatGPT Web image generation supports n=1..${CHATGPT_WEB_IMAGE_N_MAX} (got ${rawCount}); each n is a separate ~30s chat turn.`,
    });
  }
  const requestedCount = rawCount;
  if (log && requestedCount > 1) {
    log.warn(
      "IMAGE",
      `ChatGPT Web returns one image per chat turn; requested n=${requestedCount} will run sequentially`
    );
  }

  const wantsBase64 = body.response_format === "b64_json";
  const images: Array<{ url?: string; b64_json?: string }> = [];
  const requestBody = {
    model,
    prompt: prompt.slice(0, 500),
    size: body.size || undefined,
    quality: body.quality || undefined,
  };

  for (let i = 0; i < requestedCount; i++) {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model,
      body: {
        messages: [{ role: "user", content: buildChatGptWebImagePrompt(body) }],
      },
      stream: false,
      credentials,
      signal,
      log,
      clientHeaders,
    });

    const responseText = await result.response.text();
    if (result.response.status >= 400) {
      return saveImageErrorResult({
        provider,
        model,
        status: result.response.status,
        startTime,
        error: responseText,
        requestBody,
      });
    }

    let content = "";
    try {
      const json = JSON.parse(responseText);
      content = String(json?.choices?.[0]?.message?.content || "");
    } catch {
      content = responseText;
    }

    const urls = extractMarkdownImageUrls(content);
    if (urls.length === 0) {
      return saveImageErrorResult({
        provider,
        model,
        status: 502,
        startTime,
        error: `ChatGPT Web completed without returning image markdown: ${content.slice(0, 300)}`,
        requestBody,
      });
    }

    for (const url of urls) {
      if (!wantsBase64) {
        images.push({ url });
        continue;
      }
      const id = url.match(CHATGPT_WEB_IMAGE_ID_RE)?.[1];
      const cached = id ? getChatGptImage(id) : null;
      if (!cached) {
        return saveImageErrorResult({
          provider,
          model,
          status: 502,
          startTime,
          error: "ChatGPT Web image bytes expired before b64_json conversion",
          requestBody,
        });
      }
      images.push({ b64_json: cached.bytes.toString("base64") });
    }
  }

  return saveImageSuccessResult({
    provider,
    model,
    startTime,
    requestBody,
    responseBody: { images_count: images.length },
    images,
  });
}
