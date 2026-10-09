import { isJsonObject } from "../../utils/kieTask.ts";
import { saveCallLog } from "@/lib/usageDb";
import { sanitizeErrorMessage } from "../../utils/error.ts";
import { getGrokMediaToken, grokMediaHeaders } from "../grokMedia.ts";

const DEFAULT_TIMEOUT_MS = 300_000;
const MAX_TIMEOUT_MS = 30 * 60_000;
const DEFAULT_POLL_INTERVAL_MS = 2_500;
const MIN_POLL_INTERVAL_MS = 1_000;
const MAX_POLLS = 300;
const MAX_RESPONSE_BYTES = 1024 * 1024;
const RESPONSE_TOO_LARGE = Symbol("responseTooLarge");

interface XaiVideoBody {
  prompt?: unknown;
  image?: unknown;
  duration?: unknown;
  aspect_ratio?: unknown;
  resolution?: unknown;
  timeout_ms?: unknown;
  poll_interval_ms?: unknown;
  max_polls?: unknown;
  [key: string]: unknown;
}

interface XaiJobBody {
  request_id?: unknown;
  status?: string;
  video?: { url?: string };
  error?: { message?: unknown };
  message?: unknown;
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

function xaiVideoErrorMessage(
  data: { error?: { message?: unknown }; message?: unknown } | null,
  fallback: string
) {
  return sanitizeErrorMessage(String(data?.error?.message || data?.message || fallback));
}

// Billable creates must stay non-replayable across transport retries.
function oneShotBody(bytes: Uint8Array): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(bytes);
      controller.close();
    },
  });
}

/** Per-fetch signal: the job deadline, plus the client's disconnect when one is wired. */
function xaiFetchSignal(deadline: number, clientSignal?: AbortSignal | null): AbortSignal {
  const deadlineSignal = AbortSignal.timeout(Math.max(1, deadline - Date.now()));
  return clientSignal ? AbortSignal.any([clientSignal, deadlineSignal]) : deadlineSignal;
}

/** Wait between polls; resolves early (and clears the timer) when the client goes away. */
function waitBeforeNextPoll(ms: number, clientSignal?: AbortSignal | null): Promise<void> {
  return new Promise((resolve) => {
    if (clientSignal?.aborted) return resolve();
    let timer: ReturnType<typeof setTimeout> | undefined;
    const finish = () => {
      if (timer !== undefined) clearTimeout(timer);
      clientSignal?.removeEventListener("abort", finish);
      resolve();
    };
    clientSignal?.addEventListener("abort", finish, { once: true });
    timer = setTimeout(finish, ms);
  });
}

async function readBoundedJson(
  res: Response,
  signal?: AbortSignal | null
): Promise<XaiJobBody | typeof RESPONSE_TOO_LARGE> {
  signal?.throwIfAborted();
  const declared = Number(res.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > MAX_RESPONSE_BYTES) {
    void res.body?.cancel().catch(() => {});
    return RESPONSE_TOO_LARGE;
  }
  if (!res.body) return {};
  const reader = res.body.getReader();
  const cancel = () => void reader.cancel().catch(() => {});
  signal?.addEventListener("abort", cancel, { once: true });
  if (signal?.aborted) cancel();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_RESPONSE_BYTES) {
        cancel();
        return RESPONSE_TOO_LARGE;
      }
      chunks.push(value);
    }
  } catch {
    return {};
  } finally {
    signal?.removeEventListener("abort", cancel);
    reader.releaseLock();
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8")) ?? {};
  } catch {
    return {};
  }
}

/** POST the create-job request; resolves to the request_id or a ready error message. */
async function createXaiVideoJob({
  baseUrl,
  token,
  payload,
  log,
  headers = {},
  deadline,
  signal,
}: {
  baseUrl: string;
  token: string;
  payload: Record<string, unknown>;
  log?: XaiVideoLog | null;
  headers?: Record<string, string>;
  deadline: number;
  signal?: AbortSignal | null;
}): Promise<{ requestId?: string; error?: string; status?: number }> {
  const bodyBytes = new TextEncoder().encode(JSON.stringify(payload));
  const fetchSignal = xaiFetchSignal(deadline, signal);
  let createRes: Response;
  try {
    createRes = await fetch(`${baseUrl}/generations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Content-Length": String(bodyBytes.byteLength),
        ...headers,
      },
      body: oneShotBody(bodyBytes),
      duplex: "half",
      signal: fetchSignal,
      redirect: "error",
    } as RequestInit);
  } catch (err) {
    if (signal?.aborted) throw err;
    if (err instanceof Error && err.name === "TimeoutError") {
      return {
        error: "xAI video create did not respond in time; the job was not resubmitted",
        status: 504,
      };
    }
    throw err;
  }
  const createData = await readBoundedJson(createRes, fetchSignal);
  fetchSignal.throwIfAborted();
  if (createData === RESPONSE_TOO_LARGE) {
    const errorMessage = `xAI video create response exceeded ${MAX_RESPONSE_BYTES} bytes`;
    if (log) log.error("VIDEO", errorMessage);
    return { error: errorMessage, status: 502 };
  }
  const requestId = createData?.request_id;
  if (createRes.ok && typeof requestId === "string" && /^[A-Za-z0-9_-]+$/.test(requestId)) {
    return { requestId };
  }

  const errorMessage = xaiVideoErrorMessage(
    createData,
    "xAI video generation did not return request_id"
  );
  if (log) {
    log.error("VIDEO", `xAI createJob failed (${createRes.status}): ${errorMessage}`);
  }
  return {
    error: errorMessage,
    status: createRes.ok ? 502 : createRes.status,
  };
}

type XaiPollOutcome =
  | { terminal: "done"; videoUrl?: string }
  | { terminal: "failed"; error?: unknown }
  | { terminal: "error"; status: number; error: string }
  | { terminal: "timeout"; lastStatus: string; polls: number; maxPolls: number }
  | { terminal: "aborted" };

async function pollXaiVideoJob({
  statusUrl,
  requestId,
  token,
  deadline,
  pollIntervalMs,
  maxPolls,
  headers = {},
  signal,
}: {
  statusUrl: string;
  requestId: string;
  token: string;
  deadline: number;
  pollIntervalMs: number;
  maxPolls: number;
  headers?: Record<string, string>;
  signal?: AbortSignal | null;
}): Promise<XaiPollOutcome> {
  let lastStatus = "pending";
  let polls = 0;
  while (Date.now() < deadline && polls < maxPolls) {
    await waitBeforeNextPoll(Math.min(pollIntervalMs, Math.max(1, deadline - Date.now())), signal);
    if (signal?.aborted) return { terminal: "aborted" };
    if (Date.now() >= deadline) break;
    polls++;
    const fetchSignal = xaiFetchSignal(deadline, signal);
    const pollRes = await fetch(`${statusUrl}/${requestId}`, {
      headers: { Authorization: `Bearer ${token}`, ...headers },
      signal: fetchSignal,
      redirect: "error",
    });
    const pollData = await readBoundedJson(pollRes, fetchSignal);
    if (signal?.aborted) return { terminal: "aborted" };
    fetchSignal.throwIfAborted();
    if (pollData === RESPONSE_TOO_LARGE) {
      return {
        terminal: "error",
        status: 502,
        error: `xAI video job ${requestId} poll response exceeded ${MAX_RESPONSE_BYTES} bytes`,
      };
    }
    if (!pollRes.ok) {
      return {
        terminal: "error",
        status: pollRes.status,
        error: xaiVideoErrorMessage(pollData, `xAI video job ${requestId} polling failed`),
      };
    }
    lastStatus = pollData?.status || "pending";

    if (lastStatus === "done") return { terminal: "done", videoUrl: pollData?.video?.url };
    if (lastStatus === "failed") return { terminal: "failed", error: pollData?.error };
    // pending / processing → keep polling
  }
  return { terminal: "timeout", lastStatus, polls, maxPolls };
}

/** A client-supplied numeric knob: the default when absent, null when out of range. */
function boundedKnob(value: unknown, fallback: number, min: number, max: number): number | null {
  if (value == null) return fallback;
  const n = Number(value);
  if (!Number.isFinite(n) || n < min || n > max) return null;
  return Math.max(1, Math.floor(n));
}

function resolveXaiVideoOptions(
  body: XaiVideoBody,
  providerConfig: { baseUrl: string; statusUrl?: string },
  credentials?: { apiKey?: string; accessToken?: string } | null
) {
  const baseUrl = providerConfig.baseUrl.replace(/\/$/, "");
  const timeoutMs = boundedKnob(
    body.timeout_ms,
    DEFAULT_TIMEOUT_MS,
    Number.MIN_VALUE,
    MAX_TIMEOUT_MS
  );
  const pollIntervalMs = boundedKnob(
    body.poll_interval_ms,
    DEFAULT_POLL_INTERVAL_MS,
    MIN_POLL_INTERVAL_MS,
    MAX_TIMEOUT_MS
  );
  const clientMaxPolls = boundedKnob(body.max_polls, MAX_POLLS, 1, MAX_POLLS);
  return {
    timeoutMs,
    pollIntervalMs,
    clientMaxPolls,
    maxPolls:
      timeoutMs && pollIntervalMs && clientMaxPolls
        ? Math.min(clientMaxPolls, Math.max(1, Math.ceil(timeoutMs / pollIntervalMs)))
        : 0,
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
    return {
      success: false,
      status: 502,
      error: sanitizeErrorMessage(String(outcome.error || "xAI video job failed")),
    };
  }

  if (outcome.terminal === "error") {
    return { success: false, status: outcome.status, error: outcome.error };
  }

  if (outcome.terminal === "aborted") {
    return { success: false, status: 499, error: "Request aborted" };
  }

  if (outcome.terminal === "timeout") {
    return {
      success: false,
      status: 504,
      error: sanitizeErrorMessage(
        `xAI video job ${requestId} timed out after ${outcome.polls} polls (cap ${outcome.maxPolls}, status: ${outcome.lastStatus})`
      ),
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
  signal = null,
}: {
  model: string;
  provider: string;
  providerConfig: { baseUrl: string; statusUrl?: string };
  body: XaiVideoBody;
  credentials?: { apiKey?: string; accessToken?: string } | null;
  log?: XaiVideoLog | null;
  signal?: AbortSignal | null;
}) {
  const startTime = Date.now();
  const { timeoutMs, pollIntervalMs, clientMaxPolls, maxPolls, token, baseUrl, statusUrl, prompt } =
    resolveXaiVideoOptions(body, providerConfig, credentials);

  if (timeoutMs === null) {
    return {
      success: false,
      status: 400,
      error: `timeout_ms must be a positive number of milliseconds up to ${MAX_TIMEOUT_MS}`,
    };
  }
  if (pollIntervalMs === null) {
    return {
      success: false,
      status: 400,
      error: `poll_interval_ms must be between ${MIN_POLL_INTERVAL_MS} and ${MAX_TIMEOUT_MS}`,
    };
  }
  if (clientMaxPolls === null) {
    return {
      success: false,
      status: 400,
      error: `max_polls must be a number of polls between 1 and ${MAX_POLLS}`,
    };
  }

  if (!token) {
    return { success: false, status: 401, error: "xAI API key is required" };
  }

  if (log) {
    log.info("VIDEO", `${provider}/${model} (xai-video) | prompt: "${prompt.slice(0, 60)}..."`);
  }

  // Cancellation stops local polling; the provider owns the remote job lifetime.
  try {
    const requestToken = provider === "grok-cli" ? await getGrokMediaToken(credentials) : token;
    const headers = provider === "grok-cli" ? grokMediaHeaders(requestToken) : {};
    signal?.throwIfAborted();
    const created = await createXaiVideoJob({
      baseUrl,
      token: requestToken,
      payload: buildXaiVideoPayload(model, prompt, body),
      log,
      headers,
      deadline: startTime + timeoutMs,
      signal,
    });
    if (!created.requestId) {
      return { success: false, status: created.status || 502, error: created.error };
    }

    const outcome = await pollXaiVideoJob({
      statusUrl,
      requestId: created.requestId,
      token: requestToken,
      deadline: startTime + timeoutMs,
      pollIntervalMs,
      maxPolls,
      headers,
      signal,
    });

    return buildXaiVideoResponse({
      outcome,
      requestId: created.requestId,
      provider,
      model,
      startTime,
    });
  } catch (err: unknown) {
    if (signal?.aborted) {
      if (log) log.info("VIDEO", `${provider}/${model} (xai-video) | client aborted`);
      return { success: false, status: 499, error: "Request aborted" };
    }
    if (err instanceof Error && err.name === "TimeoutError") {
      return {
        success: false,
        status: 504,
        error: "xAI video operation deadline exceeded; the job was not resubmitted",
      };
    }
    return {
      success: false,
      status:
        err instanceof Error && ["TimeoutError", "AbortError"].includes(err.name)
          ? 504
          : isJsonObject(err) && Number.isFinite(Number(err.status))
            ? Number(err.status)
            : 502,
      error: sanitizeErrorMessage(err) || "Video provider error",
    };
  }
}
