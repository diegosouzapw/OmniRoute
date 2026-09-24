/**
 * SYNTX.ai (unofficial) video generation — POST /api/v1/video/generate.
 */
import { saveCallLog } from "@/lib/usageDb";
import { sanitizeErrorMessage } from "../../utils/error.ts";
import {
  SyntxMediaError,
  fetchSyntxMediaBytes,
  firstMediaUrl,
  mapSyntxVideoRequestSettings,
  resolveSyntxMediaTarget,
  resolveSyntxToken,
  runSyntxVideoGeneration,
  uploadSyntxMediaFile,
} from "../../services/syntxMedia.ts";
import { looksLikeJwt } from "../../services/syntxAuth.ts";

function collectUrls(value: unknown): string[] {
  if (typeof value === "string" && value.trim()) return [value.trim()];
  if (Array.isArray(value)) {
    return value.flatMap((item) => collectUrls(item));
  }
  return [];
}

function decodeDataUrl(dataUrl: string): { bytes: Uint8Array; mime: string; name: string } | null {
  const match = /^data:([^;,]+);base64,(.+)$/i.exec(dataUrl.trim());
  if (!match) return null;
  try {
    const mime = match[1] || "image/png";
    const bytes = Buffer.from(match[2], "base64");
    const ext = mime.startsWith("video/") ? "mp4" : mime.includes("jpeg") ? "jpg" : "png";
    return { bytes, mime, name: `frame.${ext}` };
  } catch {
    return null;
  }
}

export async function handleSyntxVideoGeneration({
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
  credentials: {
    apiKey?: string;
    accessToken?: string;
    providerSpecificData?: unknown;
  };
  log?: { info?: (...args: unknown[]) => void; error?: (...args: unknown[]) => void };
  fetchImpl?: typeof fetch;
}) {
  const startTime = Date.now();
  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) {
    return {
      success: false,
      status: 400,
      error: "Prompt is required for SYNTX video generation",
    };
  }

  const token = resolveSyntxToken({
    apiKey: credentials?.apiKey,
    accessToken: credentials?.accessToken,
    providerSpecificData: credentials?.providerSpecificData,
  });
  if (!looksLikeJwt(token)) {
    return {
      success: false,
      status: 401,
      error: "Missing SYNTX JWT — paste the Authorization Bearer token from syntx.ai",
    };
  }

  try {
    const rawFiles = [
      ...collectUrls(body.image),
      ...collectUrls(body.image_url),
      ...collectUrls(body.image_urls),
      ...collectUrls(body.file_urls),
    ];
    const fileUrls: string[] = [];
    for (const ref of rawFiles) {
      if (ref.startsWith("data:")) {
        const decoded = decodeDataUrl(ref);
        if (!decoded) continue;
        const url = await uploadSyntxMediaFile({
          token,
          bytes: decoded.bytes,
          filename: decoded.name,
          mimeType: decoded.mime,
          fetchImpl,
        });
        if (url) fileUrls.push(url);
      } else if (/^https?:\/\//i.test(ref)) {
        fileUrls.push(ref);
      }
    }

    const { aiName, modelType } = resolveSyntxMediaTarget(model, "video");
    const settings = mapSyntxVideoRequestSettings(aiName, modelType, body);

    const result = await runSyntxVideoGeneration({
      token,
      model,
      prompt,
      settings,
      fileUrls: fileUrls.length > 0 ? fileUrls : undefined,
      audioUrl: typeof body.audio_url === "string" ? body.audio_url : undefined,
      timeoutMs: typeof body.timeout_ms === "number" ? body.timeout_ms : undefined,
      fetchImpl,
    });
    const url = firstMediaUrl(result, "video") || result.media[0]?.url;
    if (!url) {
      return { success: false, status: 502, error: "SYNTX video generation completed without a video URL" };
    }

    const wantsBase64 = String(body.response_format || "").toLowerCase() === "b64_json";
    const item = wantsBase64
      ? { b64_json: (await fetchSyntxMediaBytes(url, fetchImpl)).bytes.toString("base64"), format: "mp4" }
      : { url, format: "mp4" };

    saveCallLog({
      method: "POST",
      path: "/v1/videos/generations",
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
    }).catch(() => {});

    log?.info?.("VIDEO", `SYNTX generated video via ${model}`);
    return {
      success: true,
      data: { created: Math.floor(Date.now() / 1000), data: [item] },
    };
  } catch (error) {
    const status = error instanceof SyntxMediaError ? error.status : 502;
    const message = sanitizeErrorMessage(error instanceof Error ? error.message : error);
    log?.error?.("VIDEO", `SYNTX video generation failed: ${message}`);
    return { success: false, status, error: message || "SYNTX video generation failed" };
  }
}
