/**
 * xAI Grok Imagine video generation: create async job → poll → MP4.
 * Reuses the stored xai provider Bearer apiKey (same credential the
 * image-generation "xai" entry in imageRegistry.ts already uses) — no
 * separate credential flow. Mirrors the DashScope create+poll shape in
 * videoGeneration.ts, adapted to xAI's request_id / status
 * ("pending"|"processing"|"done"|"failed") job shape
 * (https://docs.x.ai/developers/rest-api-reference/inference/videos).
 */

import { isJsonObject } from "../../utils/kieTask.ts";
import { saveCallLog } from "@/lib/usageDb";
import { sanitizeErrorMessage } from "../../utils/error.ts";

interface XaiVideoBody {
  prompt?: unknown;
  image?: unknown;
  duration?: unknown;
  aspect_ratio?: unknown;
  resolution?: unknown;
  timeout_ms?: unknown;
  poll_interval_ms?: unknown;
  [key: string]: unknown;
}

interface XaiVideoLog {
  info: (scope: string, message: string) => void;
  error: (scope: string, message: string) => void;
}

export async function handleXaiVideoGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}: {
  model: string;
  provider: string;
  providerConfig: { baseUrl: string; statusUrl?: string };
  body: XaiVideoBody;
  credentials?: { apiKey?: string; accessToken?: string } | null;
  log?: XaiVideoLog | null;
}) {
  const startTime = Date.now();
  const timeoutMs = Number(body.timeout_ms) > 0 ? Number(body.timeout_ms) : 300000;
  const pollIntervalMs = Number(body.poll_interval_ms) > 0 ? Number(body.poll_interval_ms) : 2500;
  const token = credentials?.apiKey || credentials?.accessToken;
  const baseUrl = providerConfig.baseUrl.replace(/\/$/, "");
  const statusUrl = (providerConfig.statusUrl || baseUrl).replace(/\/$/, "");
  const prompt = typeof body.prompt === "string" ? body.prompt : String(body.prompt ?? "");

  if (!token) {
    return { success: false, status: 401, error: "xAI API key is required" };
  }

  const payload: Record<string, unknown> = { model, prompt };
  if (typeof body.image === "string") payload.image = body.image;
  if (body.duration != null) payload.duration = Number(body.duration);
  if (typeof body.aspect_ratio === "string") payload.aspect_ratio = body.aspect_ratio;
  if (typeof body.resolution === "string") payload.resolution = body.resolution;

  if (log) {
    log.info("VIDEO", `${provider}/${model} (xai-video) | prompt: "${prompt.slice(0, 60)}..."`);
  }

  try {
    // Step 1: create async job
    const createRes = await fetch(`${baseUrl}/generations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const createData = await createRes.json().catch(() => ({}));
    const requestId = createData?.request_id;
    if (!requestId) {
      const errorMessage =
        createData?.error?.message ||
        createData?.message ||
        "xAI video generation did not return request_id";
      if (log) {
        log.error("VIDEO", `xAI createJob failed: ${JSON.stringify(createData)}`);
      }
      return { success: false, status: 502, error: String(errorMessage) };
    }

    // Step 2: poll statusUrl/{request_id} until terminal
    const deadline = startTime + timeoutMs;
    let lastStatus = "pending";
    while (Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
      const pollRes = await fetch(`${statusUrl}/${requestId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const pollData = await pollRes.json().catch(() => ({}));
      lastStatus = pollData?.status || "pending";

      if (lastStatus === "done") {
        const videoUrl = pollData?.video?.url;
        if (!videoUrl) {
          return {
            success: false,
            status: 502,
            error: "xAI video job done but no video.url",
          };
        }
        saveCallLog({
          method: "POST",
          path: "/v1/videos/generations",
          status: 200,
          model: `${provider}/${model}`,
          provider,
          duration: Date.now() - startTime,
          responseBody: { videos_count: 1 },
        }).catch(() => {});
        return {
          success: true,
          data: {
            created: Math.floor(Date.now() / 1000),
            data: [{ url: videoUrl, format: "mp4" }],
          },
        };
      }

      if (lastStatus === "failed") {
        const errorMessage = pollData?.error || "xAI video job failed";
        return { success: false, status: 502, error: String(errorMessage) };
      }
      // pending / processing → keep polling
    }

    return {
      success: false,
      status: 504,
      error: `xAI video job ${requestId} timed out (status: ${lastStatus})`,
    };
  } catch (err: unknown) {
    return {
      success: false,
      status: isJsonObject(err) && Number.isFinite(Number(err.status)) ? Number(err.status) : 502,
      error: sanitizeErrorMessage(err) || "Video provider error",
    };
  }
}
