import { isJsonObject } from "../../utils/kieTask.ts";
import { saveCallLog } from "@/lib/usageDb";
import { sanitizeErrorMessage } from "../../utils/error.ts";

/**
 * Alibaba (DashScope) Wan video generation: create async task → poll → MP4.
 * Targets wan2.7-t2v on the DashScope intl region. Reuses the stored alibaba
 * provider Bearer apiKey — no separate credential flow.
 */
export async function handleDashscopeVideoGeneration({
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
  body: Record<string, unknown> & {
    prompt?: unknown;
    negative_prompt?: unknown;
    size?: unknown;
    aspect_ratio?: unknown;
    duration?: unknown;
    timeout_ms?: unknown;
    poll_interval_ms?: unknown;
  };
  credentials?: { apiKey?: string; accessToken?: string } | null;
  log?: {
    info: (scope: string, message: string) => void;
    error: (scope: string, message: string) => void;
  } | null;
}) {
  const startTime = Date.now();
  const timeoutMs = Number(body.timeout_ms) > 0 ? Number(body.timeout_ms) : 300000;
  const pollIntervalMs = Number(body.poll_interval_ms) > 0 ? Number(body.poll_interval_ms) : 2500;
  const token = credentials?.apiKey || credentials?.accessToken;
  const baseUrl = providerConfig.baseUrl.replace(/\/$/, "");
  const statusUrl = (providerConfig.statusUrl || `${baseUrl}/tasks`).replace(/\/$/, "");
  const prompt = typeof body.prompt === "string" ? body.prompt : String(body.prompt ?? "");

  if (!token) {
    return { success: false, status: 401, error: "Alibaba DashScope API key is required" };
  }

  const sizeParam = normalizeDashscopeSize(body.size, body.aspect_ratio);
  const parameters: Record<string, unknown> = {};
  if (sizeParam) parameters.size = sizeParam;
  if (body.duration != null) parameters.duration = Number(body.duration);

  const payload = {
    model,
    input: {
      prompt,
      ...(typeof body.negative_prompt === "string"
        ? { negative_prompt: body.negative_prompt }
        : {}),
    },
    parameters,
  };

  if (log) {
    log.info(
      "VIDEO",
      `${provider}/${model} (dashscope-video) | prompt: "${prompt.slice(0, 60)}..."`
    );
  }

  try {
    // Step 1: create async task (X-DashScope-Async: enable)
    const createRes = await fetch(`${baseUrl}/services/aigc/video-generation/video-synthesis`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-DashScope-Async": "enable",
      },
      body: JSON.stringify(payload),
    });
    const createData = await createRes.json().catch(() => ({}));
    const taskId = createData?.output?.task_id;
    if (!taskId) {
      const errorMessage =
        createData?.message ||
        createData?.errors?.[0]?.message ||
        "DashScope video generation did not return task_id";
      if (log) {
        log.error("VIDEO", `DashScope createTask failed: ${JSON.stringify(createData)}`);
      }
      return { success: false, status: 502, error: String(errorMessage) };
    }

    // Step 2: poll statusUrl/{task_id} until terminal
    const deadline = startTime + timeoutMs;
    let lastStatus = "PENDING";
    while (Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
      const pollRes = await fetch(`${statusUrl}/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const pollData = await pollRes.json().catch(() => ({}));
      lastStatus = pollData?.output?.task_status || "PENDING";

      if (lastStatus === "SUCCEEDED") {
        const videoUrl = pollData?.output?.video_url;
        if (!videoUrl) {
          return {
            success: false,
            status: 502,
            error: "DashScope task SUCCEEDED but no video_url",
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

      if (lastStatus === "FAILED" || lastStatus === "UNKNOWN_ERROR") {
        const errorMessage =
          pollData?.output?.message ||
          pollData?.output?.errors?.[0]?.message ||
          "DashScope video task FAILED";
        return { success: false, status: 502, error: String(errorMessage) };
      }
      // PENDING / RUNNING → keep polling
    }

    return {
      success: false,
      status: 504,
      error: `DashScope task ${taskId} timed out (status: ${lastStatus})`,
    };
  } catch (err: unknown) {
    return {
      success: false,
      status: isJsonObject(err) && Number.isFinite(Number(err.status)) ? Number(err.status) : 502,
      error: sanitizeErrorMessage(err) || "Video provider error",
    };
  }
}

// Map OmniRoute size/aspect_ratio → Alibaba DashScope "WxH" (1280*720).
// Accepts "1280*720", "1280x720", or a ratio "16:9". Returns undefined if unparseable
// (then omitted from the payload so DashScope applies its own default).
function normalizeDashscopeSize(size: unknown, aspectRatio: unknown): string | undefined {
  if (typeof size === "string") {
    if (/^\d+\*\d+$/.test(size)) return size;
    if (/^\d+x\d+$/.test(size)) return size.replace("x", "*");
  }
  if (typeof aspectRatio === "string") {
    const ratioMap: Record<string, string> = {
      "16:9": "1280*720",
      "9:16": "720*1280",
      "1:1": "960*960",
    };
    return ratioMap[aspectRatio];
  }
  return undefined;
}
