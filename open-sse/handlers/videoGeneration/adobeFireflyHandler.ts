// Adobe Firefly (unofficial) video-generation handler.
// Family: adobe-firefly-video | Provider: adobe-firefly
//
// Credentials: IMS access_token (JWT) or full Cookie header from
// firefly.adobe.com / new.express.adobe.com.

import { saveCallLog } from "@/lib/usageDb";
import { sanitizeErrorMessage } from "../../utils/error.ts";
import {
  AdobeFireflyError,
  adobeFireflyGenerateVideo,
  resolveAdobeAccessToken,
} from "../../services/adobeFireflyClient.ts";

function normalizePositiveNumber(value: unknown, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export async function handleAdobeFireflyVideoGeneration({
  model,
  provider,
  body,
  credentials,
  log,
  fetchImpl = fetch,
}: {
  model: string;
  provider: string;
  providerConfig?: { baseUrl?: string };
  body: Record<string, unknown>;
  credentials?: { apiKey?: string; accessToken?: string } | null;
  log?: { info?: (...args: unknown[]) => void; error?: (...args: unknown[]) => void };
  fetchImpl?: typeof fetch;
}) {
  const startTime = Date.now();
  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) {
    return {
      success: false,
      status: 400,
      error: "Prompt is required for Adobe Firefly video generation",
    };
  }

  try {
    const accessToken = await resolveAdobeAccessToken(credentials, fetchImpl);
    const timeoutMs = normalizePositiveNumber(body.timeout_ms, 300_000);
    const seed =
      typeof body.seed === "number"
        ? body.seed
        : typeof body.seed === "string" && String(body.seed).trim()
          ? Number(body.seed)
          : undefined;
    // Keep raw paste for Cookie + sherlockToken (x-arp-session-id).
    const psd = (credentials as { providerSpecificData?: { cookie?: string } })?.providerSpecificData;
    const sessionCookie =
      (typeof psd?.cookie === "string" && psd.cookie.trim()) ||
      (typeof credentials?.apiKey === "string" && credentials.apiKey.trim()) ||
      (typeof credentials?.accessToken === "string" && credentials.accessToken.includes(";")
        ? credentials.accessToken
        : undefined);

    log?.info?.(
      "VIDEO",
      `${provider}/${model} (adobe-firefly) | prompt: "${prompt.slice(0, 60)}${prompt.length > 60 ? "..." : ""}"`
    );

    const result = await adobeFireflyGenerateVideo({
      accessToken,
      prompt,
      model,
      size: body.size,
      aspectRatio: body.aspect_ratio ?? body.aspectRatio ?? body.ratio ?? body.size,
      duration: body.duration ?? body.durationSeconds,
      quality: body.quality,
      resolution: body.resolution ?? body.quality,
      seed: Number.isFinite(seed as number) ? (seed as number) : undefined,
      negativePrompt:
        typeof body.negative_prompt === "string"
          ? body.negative_prompt
          : typeof body.negativePrompt === "string"
            ? body.negativePrompt
            : undefined,
      generateAudio: body.generate_audio !== false && body.generateAudio !== false,
      sessionCookie,
      timeoutMs,
      fetchImpl,
      log,
    });

    saveCallLog({
      method: "POST",
      path: "/v1/videos/generations",
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
    }).catch(() => {});

    return {
      success: true,
      data: {
        created: Math.floor(Date.now() / 1000),
        data: [{ url: result.url, format: result.format || "mp4" }],
      },
    };
  } catch (err) {
    if (err instanceof AdobeFireflyError) {
      log?.error?.("VIDEO", `${provider} adobe-firefly error ${err.status}: ${err.message}`);
      saveCallLog({
        method: "POST",
        path: "/v1/videos/generations",
        status: err.status,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: err.message.slice(0, 500),
      }).catch(() => {});
      return { success: false, status: err.status, error: err.message };
    }
    const errorText = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    log?.error?.("VIDEO", `${provider} adobe-firefly exception: ${errorText}`);
    saveCallLog({
      method: "POST",
      path: "/v1/videos/generations",
      status: 500,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: errorText.slice(0, 500),
    }).catch(() => {});
    return { success: false, status: 500, error: errorText };
  }
}
