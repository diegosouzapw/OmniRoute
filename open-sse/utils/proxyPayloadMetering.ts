import { Buffer } from "node:buffer";

export type PayloadDelta = {
  attempts?: number;
  uploadBytes?: number;
  downloadBytes?: number;
  knownUploadAttempts?: number;
  completedDownloads?: number;
  failedAttempts?: number;
  cancelledDownloads?: number;
  erroredDownloads?: number;
};

/** Submitted body size, NOT proof that a socket transmitted it. Never consumes a body. */
export function submittedBodyBytes(
  input: unknown,
  options: { body?: unknown } = {}
): number | null {
  const body = options.body;
  if (body == null) {
    if (typeof Request !== "undefined" && input instanceof Request && input.body) return null;
    return 0;
  }
  if (typeof body === "string") return Buffer.byteLength(body, "utf8");
  if (body instanceof URLSearchParams) return Buffer.byteLength(body.toString(), "utf8");
  if (body instanceof ArrayBuffer || ArrayBuffer.isView(body)) return body.byteLength;
  if (typeof Blob !== "undefined" && body instanceof Blob) return body.size;
  return null;
}

/** One raw send; retries call this independently. The recorder must never break transport. */
export async function meterPayloadAttempt(
  send: () => Promise<Response>,
  input: unknown,
  options: { body?: unknown; signal?: AbortSignal | null },
  record: (delta: PayloadDelta) => void,
  adapt?: (response: Response) => Promise<Response>
): Promise<Response> {
  const note = (delta: PayloadDelta) => {
    try {
      record(delta);
    } catch {
      /* The owning recorder reports failures, not payloads. */
    }
  };
  const upload = submittedBodyBytes(input, options);
  note({ attempts: 1, uploadBytes: upload ?? 0, knownUploadAttempts: upload === null ? 0 : 1 });
  let response: Response;
  try {
    const raw = await send();
    response = adapt ? await adapt(raw) : raw;
    if (response !== raw) preservePayloadResponseIdentity(response, raw);
  } catch (error) {
    note({ failedAttempts: 1 });
    throw error;
  }
  const body = response.body;
  if (!body) {
    note({ completedDownloads: 1 });
    return response;
  }
  const signal =
    options.signal ??
    (typeof Request !== "undefined" && input instanceof Request ? input.signal : undefined);
  return trackPayloadResponse(response, body, signal, note);
}

function trackPayloadResponse(
  response: Response,
  body: ReadableStream<Uint8Array>,
  signal: AbortSignal | null | undefined,
  note: (delta: PayloadDelta) => void
): Response {
  let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;
  let settled = false;
  let cancelled = false;
  const finish = (delta: PayloadDelta) => {
    if (settled) return;
    settled = true;
    signal?.removeEventListener("abort", onAbort);
    note(delta);
  };
  const onAbort = () => finish({ cancelledDownloads: 1 });
  signal?.addEventListener("abort", onAbort, { once: true });
  if (signal?.aborted) onAbort();
  const wrapped = new ReadableStream<Uint8Array>(
    {
      async pull(controller) {
        reader ??= body.getReader();
        try {
          const result = await reader.read();
          if (cancelled) return;
          if (result.done) {
            finish({ completedDownloads: 1 });
            reader.releaseLock();
            controller.close();
          } else {
            note({ downloadBytes: result.value.byteLength });
            controller.enqueue(result.value);
          }
        } catch (error) {
          if (cancelled) return;
          finish({ erroredDownloads: 1 });
          reader.releaseLock();
          controller.error(error);
        }
      },
      async cancel(reason) {
        cancelled = true;
        finish({ cancelledDownloads: 1 });
        try {
          if (reader) await reader.cancel(reason);
          else await body.cancel(reason);
        } finally {
          reader?.releaseLock();
        }
      },
    },
    { highWaterMark: 0 }
  );
  const result = new Response(wrapped, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
  preservePayloadResponseIdentity(result, response);
  return result;
}

function preservePayloadResponseIdentity(target: Response, source: Response): void {
  for (const key of ["url", "redirected", "type"] as const) {
    Object.defineProperty(target, key, { value: source[key], configurable: true });
  }
}
