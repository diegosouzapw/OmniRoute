/**
 * Novita AI video generation — request orchestration.
 *
 * Reuses the stored Novita provider Bearer apiKey (same credential the Novita
 * chat/LLM gateway already uses — no separate credential flow). Submits to the
 * model-specific `/v3/async/<model>` endpoint, polls the shared `task-result`
 * endpoint by `task_id` with backoff, and returns the OpenAI-like response shape.
 */

import { sanitizeErrorMessage } from "../../utils/error.ts";
import {
  buildNovitaPollUrl,
  buildNovitaSubmitBody,
  buildNovitaSubmitUrl,
  normalizeNovitaVideoParams,
  parseNovitaTaskId,
  parseNovitaTaskResult,
} from "./novita.ts";

interface NovitaHandlerArgs {
  model: string;
  provider: string;
  providerConfig: { baseUrl: string; statusUrl?: string };
  body: Record<string, unknown> & { timeout_ms?: unknown; poll_interval_ms?: unknown };
  credentials?: { apiKey?: string; accessToken?: string } | null;
  log?: {
    info?: (scope: string, message: string) => void;
    error?: (scope: string, message: string) => void;
  } | null;
}

const DEFAULT_TIMEOUT_MS = 300_000;
const DEFAULT_POLL_INTERVAL_MS = 2500;

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

type NovitaHandlerResult =
  | { success: true; data: { created: number; data: [{ url: string; format: string }] } }
  | { success: false; status: number; error: string };

/** Submit the async video task; returns the task_id or a ready-to-return error result. */
async function submitNovitaTask(
  submitUrl: string,
  headers: Record<string, string>,
  payload: Record<string, unknown>,
  log: NovitaHandlerArgs["log"]
): Promise<{ taskId: string } | { error: NovitaHandlerResult }> {
  const submitRes = await fetch(submitUrl, { method: "POST", headers, body: JSON.stringify(payload) });
  const submitData = await submitRes.json().catch(() => ({}));
  const taskId = parseNovitaTaskId(submitData);
  if (taskId) return { taskId };

  const errorMessage =
    (submitData as { message?: unknown })?.message || "Novita did not return a task_id";
  log?.error?.("VIDEO", `Novita createTask failed: ${JSON.stringify(submitData)}`);
  return {
    error: {
      success: false,
      status: submitRes.ok ? 502 : submitRes.status,
      error: String(errorMessage),
    },
  };
}

/** Resolve the request timeout + poll interval, falling back to the module defaults. */
function resolveNovitaTiming(body: NovitaHandlerArgs["body"]): {
  timeoutMs: number;
  pollIntervalMs: number;
} {
  const timeoutMs = Number(body.timeout_ms) > 0 ? Number(body.timeout_ms) : DEFAULT_TIMEOUT_MS;
  const pollIntervalMs =
    Number(body.poll_interval_ms) > 0 ? Number(body.poll_interval_ms) : DEFAULT_POLL_INTERVAL_MS;
  return { timeoutMs, pollIntervalMs };
}

/** Poll task-result until terminal (success/failure) or the deadline elapses. */
async function pollNovitaTask(
  pollUrl: string,
  token: string,
  taskId: string,
  deadline: number,
  pollIntervalMs: number
): Promise<NovitaHandlerResult> {
  let lastStatus = "UNKNOWN";

  while (Date.now() < deadline) {
    await sleep(pollIntervalMs);
    const pollRes = await fetch(pollUrl, { headers: { Authorization: `Bearer ${token}` } });
    const pollData = await pollRes.json().catch(() => ({}));
    const result = parseNovitaTaskResult(pollData);
    lastStatus = result.status;

    if (!result.done) continue;

    if (result.videoUrl) {
      return {
        success: true,
        data: { created: Math.floor(Date.now() / 1000), data: [{ url: result.videoUrl, format: "mp4" }] },
      };
    }

    return { success: false, status: 502, error: sanitizeErrorMessage(result.errorMessage) };
  }

  return { success: false, status: 504, error: `Novita task ${taskId} timed out (status: ${lastStatus})` };
}

export async function handleNovitaVideoGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}: NovitaHandlerArgs): Promise<NovitaHandlerResult> {
  const token = credentials?.apiKey || credentials?.accessToken;
  if (!token) {
    return { success: false, status: 401, error: "Novita AI API key is required" };
  }

  const { timeoutMs, pollIntervalMs } = resolveNovitaTiming(body);

  const statusUrl = providerConfig.statusUrl || `${providerConfig.baseUrl}/task-result`;
  const submitUrl = buildNovitaSubmitUrl(providerConfig.baseUrl, model);
  const params = normalizeNovitaVideoParams(body);
  const payload = buildNovitaSubmitBody(params);
  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  log?.info?.("VIDEO", `${provider}/${model} (novita-video) | prompt: "${params.prompt.slice(0, 60)}..."`);

  try {
    const submitted = await submitNovitaTask(submitUrl, headers, payload, log);
    if ("error" in submitted) return submitted.error;

    const pollUrl = buildNovitaPollUrl(statusUrl, submitted.taskId);
    return await pollNovitaTask(pollUrl, token, submitted.taskId, Date.now() + timeoutMs, pollIntervalMs);
  } catch (err) {
    const e = (err ?? {}) as { message?: string; status?: number };
    log?.error?.("VIDEO", `Novita video generation failed: ${e.message}`);
    return {
      success: false,
      status: typeof e.status === "number" ? e.status : 502,
      error: sanitizeErrorMessage(e.message || "Novita video generation failed"),
    };
  }
}
