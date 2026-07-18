/**
 * Novita AI video generation — pure helpers.
 *
 * Novita exposes per-model async endpoints under `/v3/async/<model-slug>` (e.g.
 * `/v3/async/wan-t2v`, `/v3/async/kling-v1.6-t2v`) — unlike DashScope/Kie there is
 * no single shared submit path; the model id IS the path segment. Every model
 * shares one poll endpoint: `GET /v3/async/task-result?task_id=...`, returning
 * `{ task: { status, reason, progress_percent }, videos: [{ video_url }] }`.
 * Confirmed against Novita's published API reference (2026-07-17):
 * https://novita.ai/docs/api-reference/model-apis-wan-t2v
 * https://novita.ai/docs/api-reference/model-apis-kling-v1.6-t2v
 */

export interface NovitaVideoParams {
  prompt: string;
  negativePrompt?: string;
  duration?: number;
  width?: number;
  height?: number;
}

export interface NovitaTaskResult {
  /** true when the task has reached a terminal state (succeeded or failed) */
  done: boolean;
  status: string;
  videoUrl?: string;
  errorMessage?: string;
}

const NOVITA_TERMINAL_SUCCESS = new Set(["TASK_STATUS_SUCCEED", "SUCCEED", "SUCCEEDED"]);
const NOVITA_TERMINAL_FAILURE = new Set(["TASK_STATUS_FAILED", "FAILED", "UNKNOWN_ERROR"]);

/** Build the submit URL for a given Novita model slug: `<baseUrl>/<model>`. */
export function buildNovitaSubmitUrl(baseUrl: string, model: string): string {
  return `${baseUrl.replace(/\/$/, "")}/${model}`;
}

/** Build the poll URL for a task id: `<statusUrl>?task_id=<id>`. */
export function buildNovitaPollUrl(statusUrl: string, taskId: string): string {
  return `${statusUrl.replace(/\/$/, "")}?task_id=${encodeURIComponent(taskId)}`;
}

/**
 * Normalize an OpenAI-style /v1/videos/generations body into Novita params.
 * Accepts both snake_case (OpenAI) and a "WxH"/"WxHxN" style `size` string.
 */
export function normalizeNovitaVideoParams(
  body: Record<string, unknown> | null | undefined
): NovitaVideoParams {
  const b = body ?? {};
  const prompt = typeof b.prompt === "string" ? b.prompt : String(b.prompt ?? "");
  const negativePrompt = typeof b.negative_prompt === "string" ? b.negative_prompt : undefined;

  const durationRaw = typeof b.duration === "number" ? b.duration : undefined;
  const duration =
    typeof durationRaw === "number" && Number.isFinite(durationRaw) && durationRaw > 0
      ? durationRaw
      : undefined;

  let width: number | undefined;
  let height: number | undefined;
  if (typeof b.size === "string") {
    const match = /^(\d+)\s*[x*]\s*(\d+)/.exec(b.size);
    if (match) {
      width = Number(match[1]);
      height = Number(match[2]);
    }
  }

  return { prompt, negativePrompt, duration, width, height };
}

/**
 * Build the Novita submit request body. Only includes optional fields that were
 * actually resolved — Novita applies its own defaults for the rest.
 */
export function buildNovitaSubmitBody(params: NovitaVideoParams): Record<string, unknown> {
  const payload: Record<string, unknown> = { prompt: params.prompt };
  if (params.negativePrompt) payload.negative_prompt = params.negativePrompt;
  if (typeof params.duration === "number") payload.duration = params.duration;
  if (typeof params.width === "number") payload.width = params.width;
  if (typeof params.height === "number") payload.height = params.height;
  return payload;
}

/** Extract the async task id from a submit response. */
export function parseNovitaTaskId(json: unknown): string | null {
  if (!json || typeof json !== "object") return null;
  const taskId = (json as { task_id?: unknown }).task_id;
  return typeof taskId === "string" && taskId.length > 0 ? taskId : null;
}

/**
 * Interpret a `/v3/async/task-result` poll response into a normalized result.
 * `done: false` means still queued/processing — callers should keep polling.
 */
function extractNovitaVideoUrl(json: unknown): string | null {
  const videos = (json as { videos?: unknown })?.videos;
  if (!Array.isArray(videos) || videos.length === 0) return null;
  const first = videos[0];
  if (!first || typeof first !== "object") return null;
  const videoUrl = (first as Record<string, unknown>).video_url;
  return typeof videoUrl === "string" && videoUrl.length > 0 ? videoUrl : null;
}

export function parseNovitaTaskResult(json: unknown): NovitaTaskResult {
  if (!json || typeof json !== "object") {
    return { done: false, status: "UNKNOWN" };
  }

  const task = (json as { task?: unknown }).task;
  const taskRec = task && typeof task === "object" ? (task as Record<string, unknown>) : {};
  const status = typeof taskRec.status === "string" ? taskRec.status : "UNKNOWN";

  if (NOVITA_TERMINAL_FAILURE.has(status)) {
    const reason = typeof taskRec.reason === "string" && taskRec.reason ? taskRec.reason : null;
    return { done: true, status, errorMessage: reason || `Novita video task ${status}` };
  }

  if (!NOVITA_TERMINAL_SUCCESS.has(status)) {
    return { done: false, status };
  }

  const videoUrl = extractNovitaVideoUrl(json);
  if (videoUrl) return { done: true, status, videoUrl };

  return { done: true, status, errorMessage: "Novita task succeeded but returned no video_url" };
}
