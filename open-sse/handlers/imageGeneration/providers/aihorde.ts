import { saveCallLog } from "@/lib/usageDb";
import { fetchRemoteImage } from "@/shared/network/remoteImageFetch";
import { safeOutboundFetch } from "@/shared/network/safeOutboundFetch";
import { sleep } from "../../../utils/sleep.ts";
import { sanitizeErrorMessage } from "../../../utils/error.ts";
import {
  AI_HORDE_ANONYMOUS_KEY,
  AI_HORDE_API_BASE,
  AI_HORDE_CATALOG_FETCH_TIMEOUT_MS,
  AI_HORDE_CLIENT_AGENT,
  aiHordeImageCatalog,
} from "../../../services/aihordeImageCatalog.ts";
import {
  extractHordeSourceB64,
  mapHordeGenerateRequest,
  stripHordeModelPrefix,
} from "./aihordeMapRequest.ts";

const GENERATE_TIMEOUT_MS = 600_000;
// Опрос начинается частым и разряжается по мере ожидания: короткая очередь
// отдаёт картинку за секунды, а длинная иначе стоила бы Horde сотен запросов
// по общему анонимному ключу (600 опросов на один кадр при полном бюджете).
const POLL_INTERVAL_MIN_MS = 1_000;
const POLL_INTERVAL_MAX_MS = 8_000;
// Per-call bound for the Horde API's own submit/check/status/cancel calls
// (a fixed, trusted host — no SSRF guard needed, just a hard timeout so a
// hung upstream cannot stall a request indefinitely). Individual calls are
// additionally capped to whatever remains of the overall generation deadline.
const HORDE_API_CALL_TIMEOUT_MS = 30_000;
// R2 image downloads point at a URL Horde's response supplies, not a fixed
// OmniRoute-controlled host, so they get the SSRF host guard too.
const HORDE_IMAGE_DOWNLOAD_TIMEOUT_MS = 60_000;
const MAX_HORDE_IMAGE_BYTES = 25 * 1024 * 1024;

function hordeHeaders(apiKey: string): Record<string, string> {
  return {
    apikey: apiKey,
    "Client-Agent": AI_HORDE_CLIENT_AGENT,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

/** Bound to whatever is left of the overall request deadline, floored so a
 *  near-expired deadline still gets one last bounded attempt instead of a
 *  zero/negative timeout. */
function boundedTimeoutMs(deadline: number, cap: number): number {
  return Math.max(1_000, Math.min(cap, deadline - Date.now()));
}

function hordeMessage(payload: unknown, fallback: string): string {
  if (payload && typeof payload === "object") {
    const message = (payload as { message?: unknown }).message;
    if (typeof message === "string" && message.trim()) return message;
  }
  return fallback;
}

async function safeJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function mapUpstreamStatus(status: number): number {
  if (
    status === 400 ||
    status === 401 ||
    status === 403 ||
    status === 404 ||
    status === 429 ||
    status === 503
  ) {
    return status;
  }
  return 502;
}

function resolveHordeApiKey(credentials: { apiKey?: unknown } | null | undefined): string {
  const raw = credentials?.apiKey;
  return typeof raw === "string" && raw.trim() ? raw.trim() : AI_HORDE_ANONYMOUS_KEY;
}

async function cancelHordeJob(jobId: string, apiKey: string): Promise<void> {
  try {
    // Best-effort cancel — deliberately not tied to the caller's (already
    // expired/aborted) signal, and given its own short timeout so a hung
    // cancel-DELETE cannot itself hang the cleanup path.
    await safeOutboundFetch(`${AI_HORDE_API_BASE}/v2/generate/status/${jobId}`, {
      method: "DELETE",
      headers: hordeHeaders(apiKey),
      guard: "none",
      timeoutMs: HORDE_API_CALL_TIMEOUT_MS,
    });
  } catch {
    // Best-effort cancel after timeout or client disconnect.
  }
}

async function fetchHordeImageBytes(
  img: string,
  options: { signal?: AbortSignal | null; timeoutMs: number }
): Promise<string> {
  const value = img.trim();
  if (value.startsWith("http://") || value.startsWith("https://")) {
    // Horde's response supplies this URL (a signed R2 storage link), not a
    // fixed OmniRoute-controlled host — route it through the repository's
    // established bounded remote-image fetch (strict public-host validation,
    // streaming byte cap, redirect limit, abort-aware timeout) instead of
    // a bare fetch(). Same helper `imageGeneration.ts` already uses for other
    // providers' remote image URLs.
    const remote = await fetchRemoteImage(value, {
      guard: "public-only",
      timeoutMs: options.timeoutMs,
      signal: options.signal ?? undefined,
      maxBytes: MAX_HORDE_IMAGE_BYTES,
    });
    if (remote.buffer.length === 0) throw new Error("Horde R2 download returned an empty image");
    return remote.buffer.toString("base64");
  }
  return value;
}

/** Числовое поле ответа Horde: отсутствующее или нечисловое читается как «неизвестно». */
function numericField(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

export async function handleAiHordeImageGeneration({
  model,
  provider,
  body,
  credentials,
  log,
  signal = null,
  timeoutMs = GENERATE_TIMEOUT_MS,
}: {
  model: string;
  provider: string;
  providerConfig?: { baseUrl?: string };
  body: Record<string, unknown>;
  credentials?: { apiKey?: unknown } | null;
  log?: {
    info: (scope: string, message: string) => void;
    error: (scope: string, message: string) => void;
  } | null;
  signal?: AbortSignal | null;
  /** Overridable for tests; production callers should rely on the default. */
  timeoutMs?: number;
}) {
  const startTime = Date.now();
  const hordeModel = stripHordeModelPrefix(model);
  const prompt = typeof body.prompt === "string" ? body.prompt : String(body.prompt ?? "");
  const apiKey = resolveHordeApiKey(credentials);
  const logRequestBody = {
    model: hordeModel,
    prompt: prompt.slice(0, 200),
    size: body.size || "1024x1024",
    n: body.n || 1,
  };
  // Deadline covers the FULL request lifecycle — catalog freshness check,
  // job submission, polling, and image download — not just the polling
  // loop. Every bounded fetch below is capped to whatever remains of it.
  const deadline = startTime + timeoutMs;

  if (log) {
    log.info("IMAGE", `${provider}/${hordeModel} (aihorde) | prompt: "${prompt.slice(0, 60)}..."`);
  }

  try {
    await aiHordeImageCatalog.ensureFresh(undefined, {
      signal: signal ?? undefined,
      timeoutMs: boundedTimeoutMs(deadline, AI_HORDE_CATALOG_FETCH_TIMEOUT_MS),
    });
    if (aiHordeImageCatalog.hasSnapshot() && !aiHordeImageCatalog.isServed(hordeModel)) {
      const error = `No Horde workers are currently serving ${hordeModel}`;
      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        status: 400,
        model: `${provider}/${hordeModel}`,
        provider,
        duration: Date.now() - startTime,
        error,
        requestBody: logRequestBody,
      }).catch(() => {});
      return { success: false, status: 400, error };
    }

    const sourceImage = extractHordeSourceB64(body);
    const payload = mapHordeGenerateRequest(body, { sourceImage });
    const submit = await safeOutboundFetch(`${AI_HORDE_API_BASE}/v2/generate/async`, {
      method: "POST",
      headers: hordeHeaders(apiKey),
      body: JSON.stringify(payload),
      signal: signal ?? undefined,
      guard: "none",
      timeoutMs: boundedTimeoutMs(deadline, HORDE_API_CALL_TIMEOUT_MS),
    });
    const submitBody = await safeJson(submit);
    if (submit.status !== 200 && submit.status !== 202) {
      const error = hordeMessage(submitBody, `Horde submit failed (${submit.status})`);
      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        status: mapUpstreamStatus(submit.status),
        model: `${provider}/${hordeModel}`,
        provider,
        duration: Date.now() - startTime,
        error,
        requestBody: logRequestBody,
      }).catch(() => {});
      return { success: false, status: mapUpstreamStatus(submit.status), error };
    }
    const jobId =
      submitBody && typeof submitBody === "object" ? (submitBody as { id?: unknown }).id : null;
    if (typeof jobId !== "string" || !jobId) {
      return { success: false, status: 502, error: "Horde submit did not return a job id" };
    }

    let completed = false;
    let pollDelayMs = POLL_INTERVAL_MIN_MS;
    try {
      while (true) {
        if (signal?.aborted) throw new Error("Horde image generation cancelled");
        if (Date.now() >= deadline) {
          throw Object.assign(new Error("Horde image generation timed out"), { status: 504 });
        }
        await sleep(pollDelayMs);
        const checkRes = await safeOutboundFetch(
          `${AI_HORDE_API_BASE}/v2/generate/check/${jobId}`,
          {
            headers: hordeHeaders(apiKey),
            signal: signal ?? undefined,
            guard: "none",
            timeoutMs: boundedTimeoutMs(deadline, HORDE_API_CALL_TIMEOUT_MS),
          }
        );
        const check = await safeJson(checkRes);
        if (!checkRes.ok || !check || typeof check !== "object") {
          throw Object.assign(
            new Error(hordeMessage(check, `Horde check failed (${checkRes.status})`)),
            { status: mapUpstreamStatus(checkRes.status) }
          );
        }
        const checkObj = check as Record<string, unknown>;
        if (checkObj.faulted) throw new Error("Horde marked the job as faulted");
        if (checkObj.is_possible === false) {
          throw Object.assign(new Error("No Horde workers can currently fulfill this request"), {
            status: 503,
          });
        }
        if (!checkObj.done) {
          // Horde сообщает оценку ожидания в первом же ответе. Если она не
          // помещается в остаток бюджета, ждать нечего: запрос всё равно
          // упал бы по таймауту, только молча и десятью минутами позже.
          // Отказ называет очередь и число воркеров — по ним видно, что
          // выручает не терпение, а модель с большим числом воркеров.
          const waitSeconds = numericField(checkObj.wait_time);
          const remainingMs = deadline - Date.now();
          if (waitSeconds !== null && waitSeconds * 1_000 > remainingMs) {
            const queuePosition = numericField(checkObj.queue_position);
            const workers = numericField(checkObj.eligible_workers);
            const details = [
              `queue wait ~${Math.round(waitSeconds)}s`,
              queuePosition !== null ? `position ${queuePosition}` : null,
              workers !== null ? `${workers} eligible worker(s)` : null,
              `budget ${Math.round(remainingMs / 1_000)}s left`,
            ]
              .filter(Boolean)
              .join(", ");
            throw Object.assign(
              new Error(
                `Horde queue is longer than the request budget (${details}). ` +
                  `Pick a model with more workers or raise the timeout.`
              ),
              { status: 504 }
            );
          }
          // Разрядка опроса: десятая доля оставшегося ожидания, в рамках
          // минимума и максимума. Короткая очередь по-прежнему опрашивается
          // раз в секунду.
          pollDelayMs =
            waitSeconds === null
              ? POLL_INTERVAL_MIN_MS
              : Math.min(
                  POLL_INTERVAL_MAX_MS,
                  Math.max(POLL_INTERVAL_MIN_MS, Math.round((waitSeconds * 1_000) / 10))
                );
          continue;
        }

        const statusRes = await safeOutboundFetch(
          `${AI_HORDE_API_BASE}/v2/generate/status/${jobId}`,
          {
            headers: hordeHeaders(apiKey),
            signal: signal ?? undefined,
            guard: "none",
            timeoutMs: boundedTimeoutMs(deadline, HORDE_API_CALL_TIMEOUT_MS),
          }
        );
        const status = await safeJson(statusRes);
        if (!statusRes.ok || !status || typeof status !== "object") {
          throw Object.assign(
            new Error(hordeMessage(status, `Horde status failed (${statusRes.status})`)),
            { status: mapUpstreamStatus(statusRes.status) }
          );
        }
        const generations = (status as { generations?: unknown }).generations;
        if (!Array.isArray(generations) || generations.length === 0) {
          throw new Error("Horde status contained no generations");
        }
        const images: Array<{ b64_json: string; revised_prompt: string }> = [];
        for (const item of generations) {
          if (!item || typeof item !== "object") continue;
          const img = (item as { img?: unknown }).img;
          if (typeof img !== "string" || !img) continue;
          // The polling loop's deadline check only runs once per iteration
          // before the poll fetches — re-check here so a deadline that
          // expires during (or immediately after) polling still aborts
          // before an unbounded amount of image-download work starts, and
          // so the job gets cancelled via the `finally` below rather than
          // silently completing over-budget.
          if (Date.now() >= deadline) {
            throw Object.assign(new Error("Horde image generation timed out"), { status: 504 });
          }
          images.push({
            b64_json: await fetchHordeImageBytes(img, {
              signal,
              timeoutMs: boundedTimeoutMs(deadline, HORDE_IMAGE_DOWNLOAD_TIMEOUT_MS),
            }),
            revised_prompt: prompt,
          });
        }
        if (images.length === 0) throw new Error("Horde status contained no image payloads");
        completed = true;
        saveCallLog({
          method: "POST",
          path: "/v1/images/generations",
          status: 200,
          model: `${provider}/${hordeModel}`,
          provider,
          duration: Date.now() - startTime,
          requestBody: logRequestBody,
          responseBody: { images_count: images.length },
        }).catch(() => {});
        return {
          success: true,
          data: { created: Math.floor(Date.now() / 1000), data: images },
        };
      }
    } finally {
      if (!completed) await cancelHordeJob(jobId, apiKey);
    }
  } catch (err) {
    const status =
      err &&
      typeof err === "object" &&
      "status" in err &&
      typeof (err as { status: unknown }).status === "number"
        ? (err as { status: number }).status
        : 502;
    const raw = err instanceof Error ? err.message : "Horde image generation failed";
    const error = sanitizeErrorMessage(raw);
    if (log) log.error("IMAGE", `aihorde error: ${String(error).slice(0, 200)}`);
    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status,
      model: `${provider}/${hordeModel}`,
      provider,
      duration: Date.now() - startTime,
      error: String(error).slice(0, 500),
      requestBody: logRequestBody,
    }).catch(() => {});
    return { success: false, status, error };
  }
}
