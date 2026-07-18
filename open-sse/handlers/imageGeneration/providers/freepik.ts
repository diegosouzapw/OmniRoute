// Freepik (Magnific Mystic) image generation adapter.
// Async submit->poll flow modeled on leonardo.ts's generationId pattern:
// POST /v1/ai/mystic returns { data: { task_id, status } }, then
// GET /v1/ai/mystic/{task_id} is polled until status is COMPLETED/FAILED.
// Docs: https://docs.magnific.com/api-reference/mystic (Freepik rebranded to
// Magnific in April 2026; both `api.freepik.com` and the newer
// `api.magnific.com` domain/header pair are in circulation during the
// transition, so the base URL and auth header both come from providerConfig
// rather than being hardcoded here).

import { saveCallLog } from "@/lib/usageDb";
import { sleep } from "../../../utils/sleep.ts";
import { sanitizeErrorMessage } from "../../../utils/error.ts";

const DEFAULT_POLL_INTERVAL_MS = 4000;
const DEFAULT_POLL_TIMEOUT_MS = 180000;

function normalizePositiveNumber(value: unknown, fallback: number): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return Math.floor(n);
}

interface FreepikProviderConfig {
  baseUrl: string;
  statusUrl?: string;
  authHeader?: string;
}

interface FreepikCredentials {
  apiKey?: string;
}

interface FreepikGenerationParams {
  model: string;
  provider: string;
  providerConfig: FreepikProviderConfig;
  body: Record<string, unknown>;
  credentials: FreepikCredentials;
  log?: { info: (tag: string, msg: string) => void; error: (tag: string, msg: string) => void };
}

interface FreepikImageResult {
  success: boolean;
  status?: number;
  error?: string;
  data?: { created: number; data: Array<{ b64_json: string }> };
}

function freepikAuthHeader(providerConfig: FreepikProviderConfig, token: string) {
  const headerName = providerConfig.authHeader || "x-freepik-api-key";
  return { [headerName]: token };
}

async function logAndFail(params: {
  provider: string;
  model: string;
  startTime: number;
  status: number;
  error: string;
}): Promise<FreepikImageResult> {
  const { provider, model, startTime, status, error } = params;
  const sanitized = sanitizeErrorMessage(error);
  saveCallLog({
    method: "POST",
    path: "/v1/images/generations",
    status,
    model: `${provider}/${model}`,
    provider,
    duration: Date.now() - startTime,
    error: sanitized.slice(0, 500),
  }).catch(() => {});
  return { success: false, status, error: sanitized };
}

async function submitMysticTask(params: {
  providerConfig: FreepikProviderConfig;
  token: string;
  model: string;
  prompt: string;
  body: Record<string, unknown>;
}) {
  const { providerConfig, token, model, prompt, body } = params;
  return fetch(providerConfig.baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...freepikAuthHeader(providerConfig, token),
    },
    body: JSON.stringify({
      prompt,
      model: model || "realism",
      resolution: typeof body.resolution === "string" ? body.resolution : "1k",
      aspect_ratio: typeof body.aspect_ratio === "string" ? body.aspect_ratio : "square_1_1",
    }),
  });
}

async function pollMysticTask(params: {
  providerConfig: FreepikProviderConfig;
  token: string;
  taskId: string;
}): Promise<{ status: string; imageUrl?: string }> {
  const { providerConfig, token, taskId } = params;
  const statusBase = providerConfig.statusUrl || providerConfig.baseUrl;
  const res = await fetch(`${statusBase}/${taskId}`, {
    headers: { ...freepikAuthHeader(providerConfig, token) },
  });
  const json = await res.json();
  const task = json?.data || json;
  const status = typeof task?.status === "string" ? task.status : "IN_PROGRESS";
  const generated = Array.isArray(task?.generated) ? task.generated : [];
  return { status, imageUrl: typeof generated[0] === "string" ? generated[0] : undefined };
}

async function downloadGeneratedImage(imageUrl: string): Promise<
  { ok: true; b64: string } | { ok: false; status: number; error: string }
> {
  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) {
    return { ok: false, status: imgRes.status, error: `Failed to download image: ${imgRes.status}` };
  }
  const buf = await imgRes.arrayBuffer();
  return { ok: true, b64: Buffer.from(buf).toString("base64") };
}

async function resolveCompletedResult(params: {
  provider: string;
  model: string;
  startTime: number;
  imageUrl?: string;
}): Promise<FreepikImageResult> {
  const { provider, model, startTime, imageUrl } = params;
  if (!imageUrl) {
    return logAndFail({
      provider,
      model,
      startTime,
      status: 502,
      error: "Freepik Mystic completed without a generated image URL",
    });
  }
  const downloaded = await downloadGeneratedImage(imageUrl);
  if (!downloaded.ok) {
    return { success: false, status: downloaded.status, error: downloaded.error };
  }
  saveCallLog({
    method: "POST",
    path: "/v1/images/generations",
    status: 200,
    model: `${provider}/${model}`,
    provider,
    duration: Date.now() - startTime,
  }).catch(() => {});
  return {
    success: true,
    data: { created: Math.floor(Date.now() / 1000), data: [{ b64_json: downloaded.b64 }] },
  };
}

async function pollUntilDone(params: {
  providerConfig: FreepikProviderConfig;
  token: string;
  taskId: string;
  provider: string;
  model: string;
  startTime: number;
  pollIntervalMs: number;
  pollTimeoutMs: number;
}): Promise<FreepikImageResult> {
  const { providerConfig, token, taskId, provider, model, startTime, pollIntervalMs, pollTimeoutMs } =
    params;
  const deadline = Date.now() + pollTimeoutMs;

  while (Date.now() < deadline) {
    await sleep(pollIntervalMs);
    const { status, imageUrl } = await pollMysticTask({ providerConfig, token, taskId });

    if (status === "COMPLETED") {
      return resolveCompletedResult({ provider, model, startTime, imageUrl });
    }
    if (status === "FAILED") {
      return logAndFail({
        provider,
        model,
        startTime,
        status: 502,
        error: "Freepik Mystic image generation failed",
      });
    }
  }

  return logAndFail({
    provider,
    model,
    startTime,
    status: 504,
    error: "Freepik Mystic image generation timed out",
  });
}

async function submitAndGetTaskId(params: {
  providerConfig: FreepikProviderConfig;
  token: string;
  model: string;
  prompt: string;
  body: Record<string, unknown>;
  provider: string;
  startTime: number;
}): Promise<{ taskId: string } | { failed: FreepikImageResult }> {
  const { providerConfig, token, model, prompt, body, provider, startTime } = params;
  const res = await submitMysticTask({ providerConfig, token, model, prompt, body });
  if (!res.ok) {
    const errorText = await res.text();
    return { failed: await logAndFail({ provider, model, startTime, status: res.status, error: errorText }) };
  }

  const submitJson = await res.json();
  const taskId = submitJson?.data?.task_id || submitJson?.task_id;
  if (!taskId) {
    return {
      failed: await logAndFail({
        provider,
        model,
        startTime,
        status: 502,
        error: "Freepik Mystic did not return a task_id",
      }),
    };
  }
  return { taskId };
}

export async function handleFreepikImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}: FreepikGenerationParams): Promise<FreepikImageResult> {
  const startTime = Date.now();
  const token = credentials?.apiKey || "";
  const prompt = typeof body.prompt === "string" ? body.prompt : String(body.prompt ?? "");
  const pollIntervalMs = normalizePositiveNumber(body.poll_interval_ms, DEFAULT_POLL_INTERVAL_MS);
  const pollTimeoutMs = normalizePositiveNumber(body.poll_timeout_ms, DEFAULT_POLL_TIMEOUT_MS);
  if (log) {
    log.info("IMAGE", `${provider}/${model} (freepik-mystic) | prompt: "${prompt.slice(0, 60)}..."`);
  }

  try {
    const submitted = await submitAndGetTaskId({
      providerConfig,
      token,
      model,
      prompt,
      body,
      provider,
      startTime,
    });
    if ("failed" in submitted) return submitted.failed;

    return await pollUntilDone({
      providerConfig,
      token,
      taskId: submitted.taskId,
      provider,
      model,
      startTime,
      pollIntervalMs,
      pollTimeoutMs,
    });
  } catch (err) {
    const message = (err as Error)?.message || String(err);
    if (log) log.error("IMAGE", `${provider} freepik error: ${sanitizeErrorMessage(message)}`);
    return logAndFail({
      provider,
      model,
      startTime,
      status: 502,
      error: `Image provider error: ${message}`,
    });
  }
}
