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

/** Map the OmniRoute video body onto xAI's create-job payload. */
function buildXaiVideoPayload(model: string, prompt: string, body: XaiVideoBody) {
  const payload: Record<string, unknown> = { model, prompt };
  if (typeof body.image === "string") payload.image = body.image;
  if (body.duration != null) payload.duration = Number(body.duration);
  if (typeof body.aspect_ratio === "string") payload.aspect_ratio = body.aspect_ratio;
  if (typeof body.resolution === "string") payload.resolution = body.resolution;
  return payload;
}

/** POST the create-job request; resolves to the request_id or a ready error message. */
async function createXaiVideoJob({
  baseUrl,
  token,
  payload,
  log,
}: {
  baseUrl: string;
  token: string;
  payload: Record<string, unknown>;
  log?: XaiVideoLog | null;
}): Promise<{ requestId?: string; error?: string }> {
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
  if (requestId) return { requestId: String(requestId) };

  const errorMessage =
    createData?.error?.message ||
    createData?.message ||
    "xAI video generation did not return request_id";
  if (log) {
    log.error("VIDEO", `xAI createJob failed: ${JSON.stringify(createData)}`);
  }
  return { error: String(errorMessage) };
}

type XaiPollOutcome =
  | { terminal: "done"; videoUrl?: string }
  | { terminal: "failed"; error?: unknown }
  | { terminal: "timeout"; lastStatus: string };

/**
 * Poll statusUrl/{request_id} until a terminal status or the deadline.
 * Date.now() is read only in the loop condition, so the caller keeps full
 * control over the timeout budget it computed from its own startTime.
 */
async function pollXaiVideoJob({
  statusUrl,
  requestId,
  token,
  deadline,
  pollIntervalMs,
}: {
  statusUrl: string;
  requestId: string;
  token: string;
  deadline: number;
  pollIntervalMs: number;
}): Promise<XaiPollOutcome> {
  let lastStatus = "pending";
  while (Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
    const pollRes = await fetch(`${statusUrl}/${requestId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const pollData = await pollRes.json().catch(() => ({}));
    lastStatus = pollData?.status || "pending";

    if (lastStatus === "done") return { terminal: "done", videoUrl: pollData?.video?.url };
    if (lastStatus === "failed") return { terminal: "failed", error: pollData?.error };
    // pending / processing → keep polling
  }
  return { terminal: "timeout", lastStatus };
}

/** Resolve the request knobs (timeouts, credential, endpoints, prompt) from the call. */
function resolveXaiVideoOptions(
  body: XaiVideoBody,
  providerConfig: { baseUrl: string; statusUrl?: string },
  credentials?: { apiKey?: string; accessToken?: string } | null
) {
  const baseUrl = providerConfig.baseUrl.replace(/\/$/, "");
  return {
    timeoutMs: Number(body.timeout_ms) > 0 ? Number(body.timeout_ms) : 300000,
    pollIntervalMs: Number(body.poll_interval_ms) > 0 ? Number(body.poll_interval_ms) : 2500,
    token: credentials?.apiKey || credentials?.accessToken,
    baseUrl,
    statusUrl: (providerConfig.statusUrl || baseUrl).replace(/\/$/, ""),
    prompt: typeof body.prompt === "string" ? body.prompt : String(body.prompt ?? ""),
  };
}

/** Map a terminal poll outcome onto the OpenAI-like video response (or an error). */
function buildXaiVideoResponse({
  outcome,
  requestId,
  provider,
  model,
  startTime,
}: {
  outcome: XaiPollOutcome;
  requestId: string;
  provider: string;
  model: string;
  startTime: number;
}) {
  if (outcome.terminal === "failed") {
    return { success: false, status: 502, error: String(outcome.error || "xAI video job failed") };
  }

  if (outcome.terminal === "timeout") {
    return {
      success: false,
      status: 504,
      error: `xAI video job ${requestId} timed out (status: ${outcome.lastStatus})`,
    };
  }

  if (!outcome.videoUrl) {
    return { success: false, status: 502, error: "xAI video job done but no video.url" };
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
      data: [{ url: outcome.videoUrl, format: "mp4" }],
    },
  };
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
  const { timeoutMs, pollIntervalMs, token, baseUrl, statusUrl, prompt } = resolveXaiVideoOptions(
    body,
    providerConfig,
    credentials
  );

  if (!token) {
    return { success: false, status: 401, error: "xAI API key is required" };
  }

  if (log) {
    log.info("VIDEO", `${provider}/${model} (xai-video) | prompt: "${prompt.slice(0, 60)}..."`);
  }

  try {
    const created = await createXaiVideoJob({
      baseUrl,
      token,
      payload: buildXaiVideoPayload(model, prompt, body),
      log,
    });
    if (!created.requestId) {
      return { success: false, status: 502, error: created.error };
    }

    const outcome = await pollXaiVideoJob({
      statusUrl,
      requestId: created.requestId,
      token,
      deadline: startTime + timeoutMs,
      pollIntervalMs,
    });

    return buildXaiVideoResponse({
      outcome,
      requestId: created.requestId,
      provider,
      model,
      startTime,
    });
  } catch (err: unknown) {
    return {
      success: false,
      status: isJsonObject(err) && Number.isFinite(Number(err.status)) ? Number(err.status) : 502,
      error: sanitizeErrorMessage(err) || "Video provider error",
    };
  }
}
