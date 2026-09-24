// Gemini Web image generation handler (#10466).
//
// Exposes the gemini-web session provider through POST /v1/images/generations.
// Follows the chatgpt-web precedent (./chatgptWeb.ts): the web-session chat
// executor is driven with an image-generation prompt, and the generated
// assets are extracted from the response.
//
// Transport: GeminiWebExecutor in image mode (x_gemini_web_image_mode). The
// executor types the prompt into gemini.google.com, captures every
// StreamGenerate frame, and returns generated-image URLs in the custom
// `x_gemini_web_image_urls` field. URLs point at lh3.googleusercontent.com
// with a `=s2048` full-resolution size directive; they are public (no
// cookies needed to fetch them).
//
// Prompting: the web UI only GENERATES images when the prompt uses a
// generation verb ("generate"/"create"/"draw"); otherwise it answers with
// web-search thumbnails. The prompt builder therefore always leads with an
// explicit generation directive (corroborated by gemini-webapi's docs).

import { GeminiWebExecutor } from "../../../executors/gemini-web.ts";
import { fetchRemoteImage } from "@/shared/network/remoteImageFetch";
import { saveImageErrorResult, saveImageSuccessResult } from "../../imageGeneration.ts";
import { sanitizeErrorMessage } from "../../../utils/error.ts";

/** Each image is one gemini.google.com turn (~30-60s). Cap like chatgpt-web. */
const GEMINI_WEB_IMAGE_N_MAX = 4;

export function buildGeminiWebImagePrompt(body: Record<string, unknown>): string {
  const prompt = String(body.prompt || "").trim();
  const details: string[] = [
    `Generate an image for this prompt: ${prompt}`,
    "Use the image generation model. Do not search the web for existing images.",
  ];
  if (typeof body.size === "string" && body.size.trim()) {
    details.push(`Requested aspect/size: ${body.size.trim()}.`);
  }
  if (typeof body.style === "string" && body.style.trim()) {
    details.push(`Requested style: ${body.style.trim()}.`);
  }
  return details.join("\n");
}

/**
 * #10494: the underlying GeminiWebExecutor's browser-automation catch paths
 * classify an expired/blocked Gemini Web session as HTTP 400 ("the session
 * is so expired it lands on a different page" — see gemini-web.ts's
 * Playwright selector/click-timeout branch, #9407) or HTTP 500 (its generic
 * automation-failure catch-all, which covers a blocked/CAPTCHA/login page
 * this handler has no further way to inspect). Both statuses previously
 * passed straight through to executeImageWithCredentialFallback, which only
 * advances to another account on a plain 401 — so an expired/blocked
 * session never triggered account fallback, contrary to #10466's
 * acceptance criteria ("Expired or blocked sessions ... can fall back
 * normally inside an image Combo"). HTTP 503 (missing Playwright browser —
 * a host/config problem, not a per-account issue) is intentionally excluded,
 * as is the local 401 this handler already returns before any account is
 * selected (missing session cookie — handled by the 401 path already).
 */
export function isExpiredOrBlockedGeminiWebSession(status: number): boolean {
  return status === 400 || status === 500;
}

export async function handleGeminiWebImageGeneration({
  model,
  provider,
  body,
  credentials,
  log,
  signal,
  clientHeaders,
  // Injectable so unit tests can drive the handler without a live Gemini
  // session; production uses the real executor.
  executorFactory = () => new GeminiWebExecutor(),
  // Injectable for tests; production fetches the public googleusercontent URL.
  imageFetcher = fetchRemoteImage,
}: {
  model: string;
  provider: string;
  body: Record<string, unknown>;
  credentials: Record<string, unknown> | null | undefined;
  log: {
    info: (scope: string, message: string) => void;
    warn: (scope: string, message: string) => void;
    error: (scope: string, message: string) => void;
  } | null;
  signal?: AbortSignal | null;
  clientHeaders?: Record<string, string> | null;
  executorFactory?: () => {
    execute: (input: Record<string, unknown>) => Promise<{ response: Response }>;
  };
  imageFetcher?: (url: string) => Promise<{ buffer: Buffer; contentType: string }>;
}) {
  const startTime = Date.now();
  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) {
    return saveImageErrorResult({
      provider,
      model,
      status: 400,
      startTime,
      error: "Prompt is required for Gemini Web image generation",
    });
  }

  if (!credentials?.apiKey) {
    return saveImageErrorResult({
      provider,
      model,
      status: 401,
      startTime,
      error: "Gemini Web credentials missing session cookie",
    });
  }

  const rawCount = Number.isInteger(body.n) && (body.n as number) > 0 ? (body.n as number) : 1;
  if (rawCount > GEMINI_WEB_IMAGE_N_MAX) {
    return saveImageErrorResult({
      provider,
      model,
      status: 400,
      startTime,
      error: `Gemini Web image generation supports n=1..${GEMINI_WEB_IMAGE_N_MAX} (got ${rawCount}); each n is a separate ~30-60s web turn.`,
    });
  }
  const requestedCount = rawCount;
  if (log && requestedCount > 1) {
    log.warn(
      "IMAGE",
      `Gemini Web returns image(s) per chat turn; requested n=${requestedCount} will run sequentially`
    );
  }

  const wantsBase64 = body.response_format === "b64_json";
  const images: Array<{ url?: string; b64_json?: string }> = [];
  const requestBody = {
    model,
    prompt: prompt.slice(0, 500),
    size: body.size || undefined,
    n: requestedCount,
  };

  for (let i = 0; i < requestedCount; i++) {
    const executor = executorFactory();
    const result = await executor.execute({
      model,
      body: {
        messages: [{ role: "user", content: buildGeminiWebImagePrompt(body) }],
        x_gemini_web_image_mode: true,
        x_gemini_web_image_b64: wantsBase64,
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
        retryable: isExpiredOrBlockedGeminiWebSession(result.response.status),
      });
    }

    let content = "";
    let urls: string[] = [];
    let b64s: string[] = [];
    try {
      const json = JSON.parse(responseText);
      content = String(json?.choices?.[0]?.message?.content || "");
      urls = Array.isArray(json?.x_gemini_web_image_urls)
        ? (json.x_gemini_web_image_urls as unknown[]).filter(
            (u): u is string => typeof u === "string" && /^https?:\/\//.test(u)
          )
        : [];
      b64s = Array.isArray(json?.x_gemini_web_image_b64)
        ? (json.x_gemini_web_image_b64 as string[])
        : [];
    } catch {
      content = responseText;
    }

    if (urls.length === 0) {
      // Distinguish "refused / no image produced" from a transport failure:
      // the executor returns 200 with an empty URL list when the model
      // answered with text only (e.g. a policy refusal or a web-search
      // answer instead of generation). Surface the assistant text so the
      // caller can see WHY nothing was generated.
      return saveImageErrorResult({
        provider,
        model,
        status: 502,
        startTime,
        error: `Gemini Web completed without generating an image. Assistant text: ${content.slice(0, 300) || "(empty)"}`,
        requestBody,
      });
    }

    for (let j = 0; j < urls.length; j++) {
      const url = urls[j];
      if (!wantsBase64) {
        images.push({ url });
        continue;
      }
      
      if (b64s[j]) {
        images.push({ b64_json: b64s[j] });
        continue;
      }
      
      try {
        const fetched = await imageFetcher(url);
        images.push({ b64_json: fetched.buffer.toString("base64") });
      } catch (err) {
        return saveImageErrorResult({
          provider,
          model,
          status: 502,
          startTime,
          error: `Gemini Web generated an image but OmniRoute could not download it for b64_json conversion: ${sanitizeErrorMessage(err instanceof Error ? err.message : String(err))}`,
          requestBody,
        });
      }
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
